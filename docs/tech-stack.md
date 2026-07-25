# Tech Stack

## Overview

TalentGraph AI uses a purpose-selected technology stack optimized for AI-native development, local-first AI inference, and multi-paradigm data storage.

---

## Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.x (App Router) | Full-stack React framework with SSR/RSC |
| **TypeScript** | 5.x | Type safety across the frontend |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **shadcn/ui** | Latest | Accessible, customizable component library |
| **Framer Motion** | 12.x | Animation library for premium micro-interactions |
| **Lucide React** | Latest | Icon library |
| **Three.js** | 0.185.x | 3D WebGL rendering (landing page) |
| **GSAP** | 3.x | Advanced scroll-driven animations |
| **OGL** | 1.x | Lightweight WebGL for shader effects |
| **Lenis** | 1.x | Smooth scroll library |

### Frontend Architecture Decisions

- **App Router**: Server Components by default, Client Components only where interactivity is needed.
- **Tailwind CSS 4**: Native CSS variables, no configuration file needed.
- **shadcn/ui**: Components are copied into the project (not a dependency), giving full control.
- **No state management library**: React Server Components + URL state + local state cover our needs.

---

## Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **FastAPI** | 0.115.x | High-performance async Python API framework |
| **LangGraph** | Latest | Multi-agent orchestration with state management |
| **LangChain** | Latest | LLM tooling, chains, and document processing |
| **Pydantic** | 2.x | Data validation and serialization |
| **SQLAlchemy** | 2.x | PostgreSQL ORM |
| **neo4j** (Python driver) | Latest | Neo4j database interaction |
| **qdrant-client** | Latest | Qdrant vector store interaction |
| **redis** (Python) | Latest | Redis cache interaction |
| **httpx** | Latest | Async HTTP client for external APIs |

### Backend Architecture Decisions

- **FastAPI**: Async-first, automatic OpenAPI documentation, excellent Pydantic integration.
- **LangGraph over raw LangChain**: Provides deterministic agent routing and state persistence — critical for multi-agent ADA.
- **Pydantic V2**: Rust-powered validation for performance.
- **SQLAlchemy 2.x**: Modern async support with type-safe ORM.

---

## AI / ML

| Technology | Purpose | Deployment |
|-----------|---------|-----------|
| **Ollama** | Local LLM runtime | Docker container |
| **Qwen 2.5** (72B / 7B) | Primary reasoning model | Via Ollama |
| **DeepSeek Coder V2** | Code analysis and understanding | Via Ollama |
| **BGE-M3** | Multilingual embedding generation | Via Ollama |
| **Whisper Large V3** | Speech-to-text for interviews | Local Python |
| **PaddleOCR** | Resume/document text extraction | Local Python |
| **Tree-sitter** | AST parsing for code analysis | Python bindings |

### AI Architecture Decisions

- **Local-first inference**: All models run locally via Ollama. No data leaves the deployment environment. No external API costs.
- **Quantized models**: Use Q4/Q8 quantized models for development, full-precision for production with GPU.
- **Embedding model choice**: BGE-M3 supports multilingual embeddings and mixed retrieval (dense + sparse).
- **Tree-sitter**: Language-agnostic AST parsing supports 100+ languages without custom parsers.

---

## Databases

| Database | Purpose | Key Features Used |
|----------|---------|-------------------|
| **PostgreSQL 16** | Primary relational store | Users, evidence artifacts, audit logs, job definitions, sessions |
| **Neo4j 5** | Knowledge Graph | Skill graphs, Digital Twins, technology relationships, role requirements |
| **Qdrant** | Vector store | Evidence embeddings, semantic search, similarity matching |
| **Redis 7** | Cache and ephemeral state | Sessions, rate limits, real-time ADA state, query result caching |

### Database Architecture Decisions

- **Multi-paradigm storage**: Each database handles what it does best — no forcing relational queries on graph data or vice versa.
- **PostgreSQL**: Source of truth for all transactional data. ACID compliance for user accounts and evidence metadata.
- **Neo4j Community Edition**: Free, sufficient for our graph query patterns. No need for Enterprise features at MVP.
- **Qdrant**: Purpose-built vector database with filtering, payload storage, and high-performance HNSW indexing.
- **Redis**: Sub-millisecond access for hot data. Used as a session store and cache layer, not as a primary database.

---

## Deployment

| Tool | Purpose |
|------|---------|
| **Docker** | Containerization for all services |
| **Docker Compose** | Multi-container orchestration for development and MVP deployment |
| **GitHub Actions** | CI/CD pipeline (future) |

### Deployment Architecture

```yaml
# Simplified docker-compose structure
services:
  frontend:     # Next.js (port 3000)
  backend:      # FastAPI (port 8000)
  ollama:       # LLM Runtime (port 11434)
  postgres:     # PostgreSQL (port 5432)
  neo4j:        # Neo4j (ports 7474, 7687)
  qdrant:       # Qdrant (ports 6333, 6334)
  redis:        # Redis (port 6379)
```

---

## Development Tools

| Tool | Purpose |
|------|---------|
| **pnpm** | Frontend package management |
| **uv** | Python package management (fast Rust-based) |
| **ESLint** | JavaScript/TypeScript linting |
| **Ruff** | Python linting and formatting |
| **Prettier** | Code formatting (JS/TS/CSS) |

---

## Version Compatibility Matrix

| Component | Minimum Version | Tested With |
|-----------|----------------|------------|
| Node.js | 20.x | 20.x LTS |
| Python | 3.11 | 3.12 |
| Docker | 24.x | 27.x |
| Docker Compose | 2.20+ | 2.30+ |
| PostgreSQL | 15 | 16 |
| Neo4j | 5.x | 5.x Community |
| Redis | 7.x | 7.x |
