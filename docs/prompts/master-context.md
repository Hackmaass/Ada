# Master Context Prompt

> This document is the canonical context prompt for TalentGraph AI. Use it to ground all AI interactions, development decisions, and feature discussions.

---

## Project Identity

**TalentGraph AI** is an evidence-driven talent intelligence platform.

**ADA** (Adaptive Decision Assistant) is the intelligence layer powering the platform.

**Tagline**: "Hire the engineer, not the resume."

---

## Core Philosophy

Everything begins with evidence.

```
Evidence → Knowledge Graph → Professional Digital Twin → ADA → Explainable Intelligence → Hiring Decisions
```

1. Never trust self-reported data without verification.
2. Every recommendation must be explainable.
3. Professional models must evolve continuously.
4. Bias reduction is more important than speed.
5. Candidates should always understand how they are evaluated.

---

## What We Build

An AI-native operating system for technical hiring where:

- Candidates receive a **Professional Digital Twin** — a living model of their capabilities
- Recruiters use **ADA** to discover, evaluate, and compare candidates using natural language
- Every recommendation is **explainable** and traceable to specific evidence

---

## What We Are NOT

- Not an ATS (Applicant Tracking System)
- Not a resume builder
- Not a chatbot wrapper around an LLM
- Not a skills assessment platform

---

## Evidence Sources

| Source | Analysis | Output |
|--------|----------|--------|
| GitHub | AST parsing, commit analysis, code quality | Technology proficiency, architecture skills |
| Resume | OCR, NLP extraction, cross-verification | Claimed skills with verification status |
| Projects | Complexity analysis, tech detection | Project portfolio with quality metrics |
| Hackathons | Submission analysis | Speed, creativity, collaboration |
| Interviews | Whisper transcription, LLM evaluation | Technical depth, communication |
| Certifications | Verification | Formal validation |
| Community | Contribution analysis | Mentorship, open source impact |

---

## ADA Agents

| Agent | Responsibility |
|-------|---------------|
| Orchestrator | Route requests, manage state, synthesize responses |
| Repository Analyst | Analyze GitHub repos for engineering intelligence |
| Resume Verifier | Cross-verify resume claims against evidence |
| Profile Builder | Construct and maintain Digital Twins |
| Career Coach | Guide candidates on skill development |
| Hiring Copilot | Help recruiters discover and evaluate candidates |
| Explainer | Generate traceable explanations for all recommendations |

---

## Tech Stack Summary

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion |
| Backend | FastAPI, LangGraph, Pydantic |
| AI | Ollama, Qwen, DeepSeek, Whisper, PaddleOCR, BGE-M3 |
| Databases | PostgreSQL, Neo4j, Qdrant, Redis |
| Deployment | Docker Compose |

---

## Design Language

The UI should feel like a mix of Apple, OpenAI, Linear, Vercel, and Stripe.

- Premium and minimal
- Dark-first
- Excellent typography (Inter for body, Outfit for headings)
- Smooth animations (Framer Motion)
- Glassmorphism where appropriate
- Responsive and accessible

---

## Key Questions ADA Should Answer

### For Candidates
- "Am I ready for a Senior Backend Engineer role?"
- "What should I learn next?"
- "Why was I ranked below another candidate?"
- "What happens if I contribute to Kubernetes for 3 months?"
- "Which companies best match my profile?"

### For Recruiters
- "Find me a backend engineer with distributed systems experience"
- "Why was Candidate A ranked higher than Candidate B?"
- "What are Candidate C's strengths and weaknesses?"
- "Generate interview questions for this candidate"
- "Show me candidates who grew the fastest in the last year"

---

## Non-Negotiables

1. **No hallucination.** Every claim backed by evidence.
2. **No black boxes.** Every score has a traceable explanation.
3. **No data leaks.** Candidates control their own data.
4. **No bias amplification.** Active monitoring for discriminatory patterns.
5. **Local-first AI.** All models run locally via Ollama.
