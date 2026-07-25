<div align="center">

# TalentGraph AI

### Hire the engineer, not the resume.

An evidence-driven talent intelligence platform powered by **ADA** — the Adaptive Decision Assistant.

[Documentation](./docs/) · [Roadmap](./docs/roadmap.md) · [Contributing](./CONTRIBUTING.md)

</div>

---

## What is TalentGraph AI?

TalentGraph AI replaces resume-based hiring with **evidence-driven hiring**.

Instead of scanning resumes for keywords, TalentGraph AI:

1. **Collects evidence** from GitHub, projects, interviews, certifications, and more
2. **Builds a Professional Digital Twin** — a living model of every candidate's capabilities
3. **Powers ADA** — an AI intelligence layer that reasons over evidence to provide explainable hiring recommendations

Every recommendation is traceable. Every score is explainable. No black boxes.

---

## Meet ADA

**ADA** (Adaptive Decision Assistant) is the intelligence layer of the platform.

ADA is not a chatbot. ADA is a multi-agent AI system that:

- Builds and maintains Professional Digital Twins
- Reasons over structured evidence
- Provides explainable hiring recommendations
- Guides candidates through career development
- Helps recruiters discover talent through natural language

```
Evidence → Knowledge Graph → Professional Digital Twin → ADA → Explainable Intelligence
```

---

## For Candidates

- **Professional Digital Twin** — a living model of your capabilities
- **AI Career Coach** — personalized skill gap analysis and growth recommendations
- **Portfolio Generator** — auto-generated from your verified work
- **Interview Prep** — AI-powered practice tailored to your profile

## For Recruiters

- **AI Hiring Copilot** — describe the engineer you need in plain English
- **Explainable Reports** — evidence-backed candidate evaluations
- **Candidate Comparison** — side-by-side analysis with rationale
- **Natural Language Search** — find talent by describing what you need

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion |
| **Backend** | FastAPI · LangGraph · Pydantic |
| **AI** | Ollama · Qwen · DeepSeek · Whisper · PaddleOCR |
| **Databases** | PostgreSQL · Neo4j · Qdrant · Redis |
| **Deployment** | Docker Compose |

All AI models run **locally** via Ollama. No data leaves your environment.

---

## Quick Start

### Prerequisites

- Node.js 20+
- Python 3.11+
- Docker & Docker Compose

### Setup

```bash
# Clone
git clone https://github.com/Hackmaass/Ada.git
cd Ada

# Frontend
npm install
npm run dev

# Infrastructure
docker compose up -d postgres neo4j qdrant redis ollama

# Backend
cd ada-backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

See the full [Development Guide](./docs/development-guide.md) for detailed setup instructions.

---

## Documentation

| Document | Description |
|----------|-------------|
| [Vision](./docs/vision.md) | Project vision, philosophy, and design principles |
| [Architecture](./docs/architecture.md) | System architecture with diagrams |
| [ADA](./docs/ada.md) | Adaptive Decision Assistant — agent system design |
| [Digital Twin](./docs/digital-twin.md) | Professional Digital Twin specification |
| [Evidence Engine](./docs/evidence-engine.md) | Evidence collection and processing pipeline |
| [Knowledge Graph](./docs/knowledge-graph.md) | Neo4j schema and GraphRAG integration |
| [Features](./docs/features.md) | Complete feature catalog |
| [Roadmap](./docs/roadmap.md) | Development phases and milestones |
| [Tech Stack](./docs/tech-stack.md) | Technology choices and rationale |
| [API Design](./docs/api-design.md) | REST API specification |
| [Development Guide](./docs/development-guide.md) | Setup, coding standards, and workflows |
| [Folder Structure](./docs/folder-structure.md) | Project organization |

---

## Contributing

We welcome contributions. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## License

MIT — see [LICENSE](./LICENSE) for details.

---

<div align="center">

**Built with evidence. Powered by ADA.**

</div>
