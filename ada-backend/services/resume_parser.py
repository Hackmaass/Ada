"""Resume parser service.

Extracts raw text from a PDF resume using either pdfplumber (default) or
PyMuPDF (fitz), then sends the text to an OpenAI LLM to extract structured
data about claimed skills, frameworks, and architecture experience.

Configuration via environment variables:
- ``OPENAI_MODEL``: model name (default ``gpt-4o-mini``)
- ``PDF_PARSER``: ``"pdfplumber"`` (default) or ``"fitz"`` (PyMuPDF)
"""

from __future__ import annotations

import io
import json
import logging
import os
from typing import Any, Dict, List

from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

logger = logging.getLogger(__name__)

# ──────────────────────────── Prompts ────────────────────────────────

_SYSTEM_PROMPT = (
    "You are an expert technical recruiter and resume analyst. "
    "You will be given the plain text extracted from a candidate's resume. "
    "Your job is to extract structured information and return it as a single "
    "JSON object with no additional commentary."
)

_USER_PROMPT_TEMPLATE = (
    "From the following resume text, extract a JSON object with these keys:\n"
    '  "skills": a list of claimed technical skills (languages, tools, databases, cloud services)\n'
    '  "frameworks": a list of frameworks and libraries mentioned\n'
    '  "architecture_experience": a list of architecture patterns mentioned '
    "(e.g., microservices, serverless, event-driven, monolith, SOA)\n"
    '  "work_experience": a list of objects with keys "title", "company", "duration", "highlights"\n'
    '  "education": a list of objects with keys "degree", "institution", "year"\n'
    '  "certifications": a list of certification names\n'
    '  "projects": a list of objects with keys "name", "description", "technologies"\n'
    "\n"
    "If a category has no entries, return an empty list. "
    "Return ONLY the JSON object, no markdown fences or explanation.\n\n"
    "---\n{resume_text}\n---"
)


# ──────────────────────────── PDF extraction ─────────────────────────

def _extract_text_pdfplumber(pdf_bytes: bytes) -> str:
    """Extract text using pdfplumber."""
    import pdfplumber

    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        pages = [page.extract_text() or "" for page in pdf.pages]
    return "\n".join(pages)


def _extract_text_fitz(pdf_bytes: bytes) -> str:
    """Extract text using PyMuPDF (fitz)."""
    import fitz  # PyMuPDF

    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    pages = [page.get_text() for page in doc]
    doc.close()
    return "\n".join(pages)


def _extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """Extract plain text from PDF bytes using the configured parser."""
    parser = os.getenv("PDF_PARSER", "pdfplumber").lower()

    try:
        if parser == "fitz":
            return _extract_text_fitz(pdf_bytes)
        else:
            return _extract_text_pdfplumber(pdf_bytes)
    except Exception as exc:
        logger.exception("Failed to parse PDF with %s", parser)
        raise RuntimeError(f"Could not extract text from PDF ({parser}): {exc}") from exc


# ──────────────────────────── LLM extraction ─────────────────────────

async def parse_resume(pdf_bytes: bytes) -> Dict[str, Any]:
    """Parse a resume PDF and return structured data.

    Returns a dict with keys: ``skills``, ``frameworks``,
    ``architecture_experience``, ``work_experience``, ``education``,
    ``certifications``, ``projects``.
    """
    raw_text = _extract_text_from_pdf(pdf_bytes)
    if not raw_text.strip():
        raise RuntimeError("PDF appears to be empty or unreadable")

    model_name = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    llm = ChatOpenAI(model=model_name, temperature=0)

    messages = [
        SystemMessage(content=_SYSTEM_PROMPT),
        HumanMessage(content=_USER_PROMPT_TEMPLATE.format(resume_text=raw_text)),
    ]

    response = await llm.ainvoke(messages)

    # Strip markdown fences if the model wraps its output
    content = response.content.strip()
    if content.startswith("```"):
        content = content.split("\n", 1)[1]  # drop first line
        if content.endswith("```"):
            content = content[:-3]
        content = content.strip()

    try:
        data = json.loads(content)
    except json.JSONDecodeError as exc:
        logger.error("LLM output is not valid JSON: %s", content[:500])
        raise RuntimeError("Failed to parse LLM JSON output") from exc

    # Ensure expected keys exist
    for key in (
        "skills", "frameworks", "architecture_experience",
        "work_experience", "education", "certifications", "projects",
    ):
        data.setdefault(key, [])

    return data
