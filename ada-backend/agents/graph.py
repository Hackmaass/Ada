"""LangGraph workflow for Ada – AI Technical Reputation Engine.

The graph processes a candidate through four sequential nodes:
1. **resume_agent**  – parses the uploaded PDF resume into structured claims
2. **github_agent**  – fetches public GitHub profile and repository data
3. **skill_verifier** – cross-examines resume claims against GitHub evidence
4. **report_generator** – produces an executive due-diligence report
"""

import json
import os
from typing import Any, TypedDict

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import END, START, StateGraph
from pydantic import BaseModel, Field

from services.github_service import fetch_github_data
from services.resume_parser import parse_resume


# ──────────────────────────── State ──────────────────────────────────

class CandidateState(TypedDict, total=False):
    github_username: str
    resume_bytes: bytes
    parsed_claims: dict[str, Any]
    github_data: dict[str, Any]
    verification_result: dict[str, Any]
    final_report: dict[str, Any]
    error: str | None


# ──────────────────────────── Pydantic models ────────────────────────

class SkillVerificationResult(BaseModel):
    evidence_confidence_score: int = Field(
        ge=0,
        le=100,
        description="Overall confidence that resume claims are supported by GitHub evidence (0-100)",
    )
    verified_skills: list[str] = Field(
        description="Skills/frameworks/architecture claims supported by repository evidence"
    )
    unverified_skills: list[str] = Field(
        description="Skills/frameworks/architecture claims lacking sufficient GitHub evidence"
    )
    strengths: list[str] = Field(
        description="Notable technical strengths evidenced in repositories and commits"
    )
    weaknesses: list[str] = Field(
        description="Gaps, inconsistencies, or areas of concern"
    )
    evidence_notes: list[str] = Field(
        default_factory=list,
        description="Specific evidence citations linking claims to repositories or commits",
    )


class ExecutiveReport(BaseModel):
    executive_summary: str = Field(
        description="Concise executive summary for hiring leadership"
    )
    recommendation: str = Field(
        description="Hire / Proceed with Caution / Do Not Proceed with rationale"
    )
    evidence_confidence_score: int = Field(ge=0, le=100)
    verified_skills: list[str]
    unverified_skills: list[str]
    strengths: list[str]
    weaknesses: list[str]
    repository_highlights: list[str] = Field(
        default_factory=list,
        description="Most relevant repositories supporting the assessment",
    )
    risk_flags: list[str] = Field(
        default_factory=list,
        description="Material risks or red flags identified during due diligence",
    )


# ──────────────────────────── Helper ─────────────────────────────────

def _get_model() -> str:
    return os.getenv("OPENAI_MODEL", "gpt-4o-mini")


# ──────────────────────────── Nodes ──────────────────────────────────

async def resume_agent_node(state: CandidateState) -> dict[str, Any]:
    """Parse the uploaded resume PDF into structured claims."""
    try:
        parsed_claims = await parse_resume(state["resume_bytes"])
        return {
            "parsed_claims": parsed_claims,
            "error": None,
        }
    except Exception as exc:
        return {"error": f"Resume parsing failed: {exc}"}


async def github_agent_node(state: CandidateState) -> dict[str, Any]:
    """Fetch GitHub profile and repository data."""
    if state.get("error"):
        return {}

    try:
        github_data = await fetch_github_data(state["github_username"])
        return {"github_data": github_data, "error": None}
    except Exception as exc:
        return {"error": f"GitHub data fetch failed: {exc}"}


async def skill_verifier_node(state: CandidateState) -> dict[str, Any]:
    """Cross-examine resume claims against GitHub evidence."""
    if state.get("error"):
        return {}

    try:
        llm = ChatOpenAI(model=_get_model(), temperature=0)
        structured_llm = llm.with_structured_output(SkillVerificationResult)

        verification: SkillVerificationResult = await structured_llm.ainvoke(
            [
                SystemMessage(
                    content=(
                        "You are a senior technical due diligence analyst. Cross-examine resume "
                        "claims against GitHub repository metadata, languages, topics, descriptions, "
                        "and commit messages. Only mark a skill as verified when there is direct or "
                        "strong indirect evidence. Be conservative and cite specific repositories "
                        "or commit themes in evidence_notes."
                    )
                ),
                HumanMessage(
                    content=(
                        "Resume claims:\n"
                        f"{json.dumps(state.get('parsed_claims', {}), indent=2)}\n\n"
                        "GitHub evidence:\n"
                        f"{json.dumps(state.get('github_data', {}), indent=2)}"
                    )
                ),
            ]
        )

        return {"verification_result": verification.model_dump(), "error": None}
    except Exception as exc:
        return {"error": f"Skill verification failed: {exc}"}


async def report_generator_node(state: CandidateState) -> dict[str, Any]:
    """Generate the final executive due-diligence report."""
    if state.get("error"):
        return {
            "final_report": {
                "status": "error",
                "message": state["error"],
                "github_username": state.get("github_username"),
            }
        }

    try:
        verification = state.get("verification_result", {})
        github_data = state.get("github_data", {})
        parsed_claims = state.get("parsed_claims", {})

        llm = ChatOpenAI(model=_get_model(), temperature=0)
        structured_llm = llm.with_structured_output(ExecutiveReport)

        report: ExecutiveReport = await structured_llm.ainvoke(
            [
                SystemMessage(
                    content=(
                        "You are preparing an Executive Technical Due Diligence report for "
                        "hiring leadership. Synthesize resume claims, GitHub evidence, and "
                        "verification results into a clear, decision-ready report. "
                        "Keep the executive summary under 200 words."
                    )
                ),
                HumanMessage(
                    content=(
                        f"GitHub username: {state.get('github_username')}\n\n"
                        "Parsed resume claims:\n"
                        f"{json.dumps(parsed_claims, indent=2)}\n\n"
                        "GitHub profile evidence:\n"
                        f"{json.dumps(github_data, indent=2)}\n\n"
                        "Verification results:\n"
                        f"{json.dumps(verification, indent=2)}"
                    )
                ),
            ]
        )

        final_report = report.model_dump()
        final_report["github_username"] = state.get("github_username")
        final_report["candidate_name"] = github_data.get("name")
        final_report["github_profile_url"] = github_data.get("profile_url")
        final_report["parsed_claims"] = parsed_claims
        final_report["evidence_notes"] = verification.get("evidence_notes", [])
        final_report["status"] = "completed"

        return {"final_report": final_report}
    except Exception as exc:
        return {
            "final_report": {
                "status": "error",
                "message": f"Report generation failed: {exc}",
                "github_username": state.get("github_username"),
            }
        }


# ──────────────────────────── Graph assembly ─────────────────────────

def build_workflow():
    graph = StateGraph(CandidateState)

    graph.add_node("resume_agent", resume_agent_node)
    graph.add_node("github_agent", github_agent_node)
    graph.add_node("skill_verifier", skill_verifier_node)
    graph.add_node("report_generator", report_generator_node)

    graph.add_edge(START, "resume_agent")
    graph.add_edge("resume_agent", "github_agent")
    graph.add_edge("github_agent", "skill_verifier")
    graph.add_edge("skill_verifier", "report_generator")
    graph.add_edge("report_generator", END)

    return graph.compile()


workflow = build_workflow()
