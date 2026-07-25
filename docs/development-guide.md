# Development Guide

## Prerequisites

- **Node.js** 20.x LTS
- **Python** 3.11+
- **Docker** and **Docker Compose**
- **Git**

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Hackmaass/Ada.git
cd Ada
```

### 2. Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

### 3. Backend Setup

```bash
cd ada-backend
python -m venv .venv
source .venv/bin/activate   # Linux/Mac
.venv\Scripts\activate      # Windows
pip install -r requirements.txt
cp .env.example .env
```

### 4. Infrastructure (Docker)

```bash
docker compose up -d postgres neo4j qdrant redis ollama
```

### 5. Pull AI Models

```bash
docker exec -it ollama ollama pull qwen2.5:7b
docker exec -it ollama ollama pull bge-m3
```

### 6. Start Backend

```bash
cd ada-backend
uvicorn main:app --reload --port 8000
```

Backend runs at `http://localhost:8000`. API docs at `http://localhost:8000/docs`.

---

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Database
POSTGRES_URL=postgresql://user:pass@localhost:5432/talentgraph
NEO4J_URL=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password
QDRANT_URL=http://localhost:6333
REDIS_URL=redis://localhost:6379

# AI
OLLAMA_URL=http://localhost:11434
LLM_MODEL=qwen2.5:7b
EMBEDDING_MODEL=bge-m3

# Auth
JWT_SECRET=your-secret-key
JWT_EXPIRY_MINUTES=60

# GitHub
GITHUB_TOKEN=ghp_your_token_here
```

---

## Code Style

### TypeScript / React

- **Strict TypeScript** — no `any` types unless absolutely necessary.
- **Functional components** — no class components.
- **Named exports** — prefer named exports over default exports for components.
- **Co-location** — keep component-specific styles/types near the component.

```typescript
// Good
export function SkillCard({ skill }: SkillCardProps) { ... }

// Avoid
export default class SkillCard extends React.Component { ... }
```

### Python

- **Type hints everywhere** — all function signatures must have type annotations.
- **Pydantic models** — use Pydantic for all data validation.
- **Async by default** — use `async def` for all API handlers and service methods.
- **Docstrings** — Google-style docstrings for all public functions.

```python
# Good
async def get_digital_twin(candidate_id: str) -> DigitalTwin:
    """Retrieve the Digital Twin for a candidate.
    
    Args:
        candidate_id: The unique identifier of the candidate.
        
    Returns:
        The candidate's Digital Twin with all skill and evidence data.
        
    Raises:
        TwinNotFoundError: If no Twin exists for this candidate.
    """
    ...
```

---

## Git Workflow

### Branch Naming

```
feat/short-description     # New features
fix/short-description      # Bug fixes
docs/short-description     # Documentation changes
refactor/short-description # Code refactoring
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add GitHub evidence processing pipeline
fix: resolve skill deduplication in knowledge graph
docs: add API design documentation
refactor: extract evidence scoring into separate service
```

### Pull Requests

1. Create a feature branch from `main`
2. Make your changes
3. Write/update tests
4. Open a PR with a clear description
5. Request review from at least one team member
6. Squash merge after approval

---

## Testing

### Frontend

```bash
# Run tests (when test suite is set up)
npm run test

# Type checking
npx tsc --noEmit
```

### Backend

```bash
cd ada-backend
pytest tests/ -v

# With coverage
pytest tests/ --cov=. --cov-report=html
```

---

## Common Tasks

### Adding a shadcn/ui Component

```bash
npx shadcn@latest add <component-name>
```

### Adding a Python Dependency

```bash
cd ada-backend
pip install <package>
pip freeze > requirements.txt
```

### Resetting Databases

```bash
docker compose down -v  # Removes all volumes
docker compose up -d postgres neo4j qdrant redis
```

### Viewing Neo4j Browser

Navigate to `http://localhost:7474` in your browser. Default credentials: `neo4j` / `password`.

---

## Troubleshooting

### Ollama Models Not Loading

```bash
# Check if Ollama is running
docker logs ollama

# Pull models manually
docker exec -it ollama ollama pull qwen2.5:7b
```

### Port Conflicts

Default ports: Frontend (3000), Backend (8000), PostgreSQL (5432), Neo4j (7474/7687), Qdrant (6333), Redis (6379), Ollama (11434).

If a port is in use, modify `docker-compose.yml` port mappings.

### Next.js Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```
