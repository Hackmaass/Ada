"""Ada – AI Technical Reputation Engine – FastAPI backend.

Endpoints (all under ``/api/v1``):
- ``GET  /api/v1/health``            – health check
- ``POST /api/v1/parse-resume``      – upload a PDF and get structured resume data
- ``GET  /api/v1/github/{username}`` – fetch GitHub profile + repos
- ``POST /api/v1/analyze``           – full pipeline: resume + GitHub → executive report
"""

import os

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from agents.graph import workflow
from services.github_service import fetch_github_data
from services.resume_parser import parse_resume

load_dotenv()

app = FastAPI(
    title="Ada – AI Technical Reputation Engine",
    description="Executive technical due diligence via resume parsing and GitHub verification",
    version="1.0.0",
    docs_url="/api/v1/docs",
    openapi_url="/api/v1/openapi.json",
)

# ──────────────────────────── CORS ───────────────────────────────────

_ALLOWED_ORIGINS = os.getenv(
    "CORS_ORIGINS", "http://localhost:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ──────────────────────────── Health ─────────────────────────────────

@app.get("/api/v1/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


# ──────────────────────────── Parse Resume ───────────────────────────

@app.post("/api/v1/parse-resume")
async def parse_resume_endpoint(
    file: UploadFile = File(...),
) -> dict:
    """Upload a PDF resume and receive structured data (skills, frameworks, etc.)."""
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File must be a PDF.")

    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY is not configured.")

    pdf_bytes = await file.read()
    if not pdf_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    try:
        result = await parse_resume(pdf_bytes)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Resume parsing failed: {exc}") from exc

    return result


# ──────────────────────────── GitHub ─────────────────────────────────

@app.get("/api/v1/github/{username}")
async def github_profile_endpoint(username: str) -> dict:
    """Fetch public GitHub profile and repository data for a user."""
    username = username.strip()
    if not username:
        raise HTTPException(status_code=400, detail="username is required.")

    try:
        data = await fetch_github_data(username)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"GitHub fetch failed: {exc}") from exc

    return data


# ──────────────────────────── Full Analysis ──────────────────────────

@app.post("/api/v1/analyze")
async def analyze_candidate(
    github_username: str = Form(...),
    resume_file: UploadFile = File(...),
) -> dict:
    """Run the full Ada pipeline: parse resume → fetch GitHub → verify → report."""
    username = github_username.strip()
    if not username:
        raise HTTPException(status_code=400, detail="github_username is required.")

    if not resume_file.filename or not resume_file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="resume_file must be a PDF.")

    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY is not configured.")

    resume_bytes = await resume_file.read()
    if not resume_bytes:
        raise HTTPException(status_code=400, detail="Uploaded resume file is empty.")

    initial_state = {
        "github_username": username,
        "resume_bytes": resume_bytes,
        "parsed_claims": {},
        "github_data": {},
        "verification_result": {},
        "final_report": {},
        "error": None,
    }

    try:
        result = await workflow.ainvoke(initial_state)
    except Exception as exc:
        raise HTTPException(
            status_code=500, detail=f"Analysis pipeline failed: {exc}"
        ) from exc

    final_report = result.get("final_report")

    if not final_report:
        raise HTTPException(
            status_code=500, detail="Analysis pipeline did not produce a report."
        )

    if final_report.get("status") == "error":
        raise HTTPException(
            status_code=422,
            detail=final_report.get("message", "Analysis failed."),
        )

    return final_report


# ──────────────────────────── Entrypoint ─────────────────────────────

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
