# Folder Structure

## Project Root

```
talentgraph-ai/
├── docs/                          # Project documentation
│   ├── vision.md
│   ├── architecture.md
│   ├── ada.md
│   ├── digital-twin.md
│   ├── evidence-engine.md
│   ├── knowledge-graph.md
│   ├── features.md
│   ├── roadmap.md
│   ├── tech-stack.md
│   ├── development-guide.md
│   ├── api-design.md
│   ├── folder-structure.md
│   └── prompts/
│       └── master-context.md
│
├── src/                           # Next.js frontend source
│   ├── app/                       # App Router pages
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Landing page
│   │   ├── globals.css            # Global styles
│   │   ├── dashboard/             # Dashboard pages
│   │   │   ├── page.tsx           # Dashboard home
│   │   │   ├── twin/              # Digital Twin views
│   │   │   ├── evidence/          # Evidence management
│   │   │   ├── career/            # Career tools
│   │   │   └── settings/          # Account settings
│   │   └── (auth)/                # Auth route group
│   │       ├── login/
│   │       └── register/
│   │
│   ├── components/                # React components
│   │   ├── ui/                    # Base UI components (shadcn/ui + custom)
│   │   │   ├── button.tsx
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   └── ...
│   │   ├── dashboard/             # Dashboard-specific components
│   │   │   ├── twin-view.tsx
│   │   │   ├── skill-graph.tsx
│   │   │   ├── evidence-card.tsx
│   │   │   └── ...
│   │   ├── ada/                   # ADA chat components
│   │   │   ├── chat-interface.tsx
│   │   │   ├── message-bubble.tsx
│   │   │   ├── citation-card.tsx
│   │   │   └── ...
│   │   └── landing/               # Landing page components
│   │       ├── hero-section.tsx
│   │       ├── feature-cards.tsx
│   │       └── ...
│   │
│   ├── lib/                       # Shared utilities
│   │   ├── utils.ts               # General utilities (cn, etc.)
│   │   ├── api.ts                 # API client
│   │   └── constants.ts           # App-wide constants
│   │
│   └── hooks/                     # Custom React hooks
│       ├── use-ada.ts             # ADA chat hook
│       ├── use-twin.ts            # Digital Twin data hook
│       └── use-evidence.ts        # Evidence management hook
│
├── ada-backend/                   # FastAPI backend
│   ├── main.py                    # FastAPI app entry point
│   ├── requirements.txt           # Python dependencies
│   ├── Dockerfile                 # Backend container
│   ├── .env.example               # Environment variable template
│   │
│   ├── api/                       # API layer
│   │   ├── __init__.py
│   │   ├── routes/                # Route handlers
│   │   │   ├── auth.py
│   │   │   ├── candidates.py
│   │   │   ├── evidence.py
│   │   │   ├── ada.py
│   │   │   └── recruiter.py
│   │   ├── middleware/            # Request middleware
│   │   │   ├── auth.py
│   │   │   └── rate_limit.py
│   │   └── schemas/               # Pydantic request/response models
│   │       ├── auth.py
│   │       ├── evidence.py
│   │       ├── twin.py
│   │       └── ada.py
│   │
│   ├── agents/                    # ADA multi-agent system
│   │   ├── __init__.py
│   │   ├── graph.py               # LangGraph state machine
│   │   ├── orchestrator.py        # Orchestrator agent
│   │   ├── repository_analyst.py  # GitHub analysis agent
│   │   ├── resume_verifier.py     # Resume verification agent
│   │   ├── profile_builder.py     # Digital Twin builder agent
│   │   ├── career_coach.py        # Career guidance agent
│   │   ├── hiring_copilot.py      # Recruiter assistant agent
│   │   └── explainer.py           # Explanation generation agent
│   │
│   ├── services/                  # Business logic services
│   │   ├── __init__.py
│   │   ├── github_service.py      # GitHub API integration
│   │   ├── resume_parser.py       # Resume parsing (PaddleOCR)
│   │   ├── evidence_processor.py  # Evidence processing pipeline
│   │   ├── twin_service.py        # Digital Twin CRUD
│   │   ├── graph_service.py       # Neo4j Knowledge Graph operations
│   │   ├── vector_service.py      # Qdrant vector operations
│   │   └── search_service.py      # Semantic search
│   │
│   ├── models/                    # Database models
│   │   ├── __init__.py
│   │   ├── user.py                # User model (SQLAlchemy)
│   │   ├── evidence.py            # Evidence artifact model
│   │   └── conversation.py        # ADA conversation model
│   │
│   ├── core/                      # Core utilities
│   │   ├── __init__.py
│   │   ├── config.py              # Settings and configuration
│   │   ├── database.py            # Database connections
│   │   ├── security.py            # JWT, hashing utilities
│   │   └── logging.py             # Structured logging setup
│   │
│   └── tests/                     # Backend tests
│       ├── conftest.py
│       ├── test_evidence.py
│       ├── test_twin.py
│       └── test_ada.py
│
├── docker-compose.yml             # Multi-container orchestration
├── package.json                   # Frontend dependencies
├── tsconfig.json                  # TypeScript configuration
├── next.config.ts                 # Next.js configuration
├── components.json                # shadcn/ui configuration
├── postcss.config.mjs             # PostCSS configuration
├── eslint.config.mjs              # ESLint configuration
├── .gitignore                     # Git ignore rules
├── .env.example                   # Root environment template
├── README.md                      # Project README
├── CONTRIBUTING.md                # Contribution guidelines
├── CHANGELOG.md                   # Version changelog
└── LICENSE                        # MIT License
```

---

## Conventions

### File Naming

| Context | Convention | Example |
|---------|-----------|---------|
| React components | `kebab-case.tsx` | `hero-section.tsx` |
| React hooks | `use-kebab-case.ts` | `use-ada.ts` |
| Python modules | `snake_case.py` | `github_service.py` |
| Documentation | `kebab-case.md` | `digital-twin.md` |
| CSS | `kebab-case.css` or co-located | `ElectricBorder.css` |

### Directory Ownership

| Directory | Owner | Purpose |
|-----------|-------|---------|
| `src/components/ui/` | Design system | Reusable, design-system-level components |
| `src/components/dashboard/` | Dashboard feature | Dashboard-specific composed components |
| `src/components/ada/` | ADA feature | ADA chat interface components |
| `ada-backend/agents/` | AI team | ADA agent implementations |
| `ada-backend/services/` | Backend team | Business logic and external integrations |
| `ada-backend/api/` | Backend team | HTTP layer (thin — delegates to services) |
