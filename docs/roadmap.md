# Roadmap

## Overview

TalentGraph AI development is organized into four phases, progressing from a hackathon MVP to a full production platform.

---

## Phase 1: Foundation (Hackathon MVP)

**Goal**: Demonstrate the core value proposition — evidence-driven hiring intelligence.

**Duration**: 2–4 weeks

### Deliverables

#### Landing Page ✅
- [x] Three.js hero with scroll-driven animation
- [x] Feature showcase with Galaxy Cards
- [x] Brand CTA section
- [x] Responsive navbar and footer
- [x] Smooth scroll (Lenis)

#### Evidence Ingestion
- [ ] GitHub repository analysis (clone, parse, extract skills)
- [ ] Resume upload and parsing (PaddleOCR + structured extraction)
- [ ] Basic evidence artifact storage (PostgreSQL)

#### Professional Digital Twin (Basic)
- [ ] Skill extraction from GitHub evidence
- [ ] Skill extraction from resume evidence
- [ ] Knowledge Graph population (Neo4j)
- [ ] Basic skill graph visualization

#### ADA (Basic)
- [ ] Single-agent conversation interface
- [ ] Basic question answering over Digital Twin data
- [ ] Evidence-grounded responses (no hallucination)

#### Dashboard
- [ ] Candidate onboarding flow
- [ ] GitHub connection
- [ ] Resume upload
- [ ] Basic Digital Twin view
- [ ] ADA chat interface

#### Infrastructure
- [ ] Docker Compose setup for all services
- [ ] Local Ollama with Qwen 7B
- [ ] PostgreSQL + Neo4j + Qdrant initialized
- [ ] Basic API endpoints (FastAPI)

---

## Phase 2: Intelligence (Post-Hackathon)

**Goal**: Deepen ADA's reasoning capabilities and add recruiter features.

**Duration**: 4–8 weeks

### Deliverables

#### Multi-Agent ADA
- [ ] Orchestrator agent with intent routing
- [ ] Repository Analyst agent
- [ ] Resume Verifier agent (cross-verification)
- [ ] Career Coach agent
- [ ] LangGraph state machine implementation

#### Enhanced Evidence Processing
- [ ] AST parsing with Tree-sitter
- [ ] Code quality metrics extraction
- [ ] Commit history analysis
- [ ] Evidence confidence scoring
- [ ] Cross-source verification pipeline

#### Recruiter MVP
- [ ] Recruiter dashboard
- [ ] Natural language candidate search
- [ ] Basic candidate reports
- [ ] Candidate comparison view

#### Digital Twin Enhancements
- [ ] Role readiness scoring
- [ ] Growth velocity calculation
- [ ] Skill gap analysis
- [ ] Career trajectory modeling

#### GraphRAG
- [ ] Vector embeddings for evidence (BGE-M3)
- [ ] Hybrid retrieval (graph + vector)
- [ ] Context-aware ADA responses

---

## Phase 3: Scale (Production)

**Goal**: Production readiness, security, and advanced features.

**Duration**: 8–16 weeks

### Deliverables

#### Production Infrastructure
- [ ] Authentication (JWT + refresh tokens)
- [ ] Role-based access control
- [ ] API rate limiting
- [ ] Error monitoring and alerting
- [ ] Structured logging with correlation IDs
- [ ] Database migrations strategy

#### Advanced ADA Agents
- [ ] Interview Agent (Whisper transcription + evaluation)
- [ ] Hiring Copilot agent
- [ ] Explainer agent (audit-ready explanations)
- [ ] Multi-agent collaboration workflows

#### Candidate Features
- [ ] AI Resume Builder
- [ ] Portfolio Generator
- [ ] AI Interview Preparation
- [ ] Talent Analytics Dashboard
- [ ] "What-if" career simulations

#### Recruiter Features
- [ ] Explainable AI reports
- [ ] Hiring pipeline management
- [ ] Hiring analytics
- [ ] Bias detection reports

#### Performance
- [ ] Query optimization (Neo4j + Qdrant)
- [ ] Redis caching strategy
- [ ] Batch evidence processing
- [ ] API response time < 200ms (p95)

---

## Phase 4: Vision (Future)

**Goal**: Platform expansion and ecosystem development.

### Ideas (not committed)

- Real-time GitHub activity monitoring
- Multi-modal evidence (video presentations, conference talks)
- Team composition analysis
- Organization-level engineering capability mapping
- Candidate-recruiter matching marketplace
- Federated learning across organizations
- SDK for third-party evidence source plugins
- Mobile application
- Browser extension for GitHub/LinkedIn augmentation

---

## Success Metrics

### Phase 1 (MVP)
- Can ingest a GitHub profile and generate a basic Digital Twin
- ADA can answer 3 core questions about a candidate
- End-to-end demo flow works in < 2 minutes

### Phase 2 (Intelligence)
- Multi-agent ADA handles 80% of queries without fallback
- Cross-verification catches 90% of resume inconsistencies
- Recruiter can find relevant candidates via natural language in < 10 seconds

### Phase 3 (Production)
- < 200ms p95 API response time
- Zero data leaks between candidate profiles
- ADA explanations pass human audit 95% of the time
- System handles 1,000 concurrent users
