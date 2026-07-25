# API Design

## Overview

The TalentGraph AI API is a RESTful API built with FastAPI, providing endpoints for evidence management, Digital Twin operations, ADA interactions, and recruiter operations.

**Base URL**: `http://localhost:8000/api/v1`

---

## Design Principles

1. **Resource-oriented**: URLs represent resources, not actions.
2. **Consistent naming**: `snake_case` for JSON fields, plural nouns for collections.
3. **Pagination**: Cursor-based pagination for all list endpoints.
4. **Error format**: Consistent error response schema across all endpoints.
5. **Versioned**: API version in URL path (`/api/v1/`).
6. **Documented**: Auto-generated OpenAPI spec via FastAPI.

---

## Authentication

All endpoints (except `/auth/*`) require a Bearer token.

```
Authorization: Bearer <jwt_token>
```

### Auth Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new account |
| POST | `/auth/login` | Login and receive JWT tokens |
| POST | `/auth/refresh` | Refresh an expired access token |
| POST | `/auth/logout` | Invalidate refresh token |

---

## Candidate Endpoints

### Digital Twin

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/candidates/me/twin` | Get own Digital Twin summary |
| GET | `/candidates/me/twin/skills` | Get skill graph |
| GET | `/candidates/me/twin/projects` | Get project portfolio |
| GET | `/candidates/me/twin/trajectory` | Get career trajectory |
| GET | `/candidates/me/twin/readiness/:roleId` | Get role readiness score |

### Evidence

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/candidates/me/evidence` | List all evidence artifacts |
| POST | `/candidates/me/evidence/github` | Connect a GitHub profile |
| POST | `/candidates/me/evidence/resume` | Upload a resume |
| POST | `/candidates/me/evidence/project` | Add a project link |
| GET | `/candidates/me/evidence/:id` | Get specific evidence artifact |
| DELETE | `/candidates/me/evidence/:id` | Remove evidence source |
| POST | `/candidates/me/evidence/:id/reprocess` | Trigger re-processing |

### Career

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/candidates/me/gaps/:roleId` | Get skill gaps for a role |
| GET | `/candidates/me/recommendations` | Get learning recommendations |
| POST | `/candidates/me/simulate` | Run a "what-if" career simulation |

---

## Recruiter Endpoints

### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/recruiter/search` | Natural language candidate search |
| GET | `/recruiter/candidates/:id/report` | Get candidate evaluation report |
| POST | `/recruiter/compare` | Compare multiple candidates |

### Pipeline

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/recruiter/pipeline` | Get hiring pipeline |
| POST | `/recruiter/pipeline/candidates` | Add candidate to pipeline |
| PATCH | `/recruiter/pipeline/candidates/:id` | Update candidate stage |
| DELETE | `/recruiter/pipeline/candidates/:id` | Remove candidate from pipeline |

### Roles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/recruiter/roles` | List role definitions |
| POST | `/recruiter/roles` | Create a role definition |
| GET | `/recruiter/roles/:id` | Get role details |
| PUT | `/recruiter/roles/:id` | Update role definition |
| DELETE | `/recruiter/roles/:id` | Delete role definition |

---

## ADA Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ada/chat` | Send a message to ADA |
| GET | `/ada/conversations` | List past conversations |
| GET | `/ada/conversations/:id` | Get conversation history |
| DELETE | `/ada/conversations/:id` | Delete a conversation |
| WebSocket | `/ada/ws` | Real-time ADA chat stream |

### Chat Request

```json
{
  "message": "Am I ready for a Senior Backend Engineer role?",
  "conversation_id": "conv_abc123",  // Optional, creates new if omitted
  "context": {
    "role_id": "role_xyz789"  // Optional, for role-specific queries
  }
}
```

### Chat Response

```json
{
  "id": "msg_def456",
  "conversation_id": "conv_abc123",
  "role": "assistant",
  "content": "Based on your Digital Twin, here's your readiness assessment...",
  "citations": [
    {
      "evidence_id": "ev_001",
      "source": "GITHUB",
      "description": "go-microservice-template repository",
      "relevance": "Demonstrates Go microservice architecture"
    }
  ],
  "reasoning_chain": [
    "Retrieved skill graph for Senior Backend Engineer requirements",
    "Matched 8 of 12 required skills above threshold",
    "Identified 2 critical gaps: distributed systems, system design"
  ],
  "confidence": 0.82,
  "created_at": "2025-07-25T17:30:00Z"
}
```

---

## Common Response Schemas

### Success Response

```json
{
  "status": "success",
  "data": { ... },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2025-07-25T17:30:00Z"
  }
}
```

### Error Response

```json
{
  "status": "error",
  "error": {
    "code": "EVIDENCE_NOT_FOUND",
    "message": "The requested evidence artifact does not exist.",
    "details": {}
  },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2025-07-25T17:30:00Z"
  }
}
```

### Paginated Response

```json
{
  "status": "success",
  "data": [ ... ],
  "pagination": {
    "cursor": "cur_next_page_token",
    "has_more": true,
    "total": 42
  }
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `AUTH_REQUIRED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 422 | Request validation failed |
| `RATE_LIMITED` | 429 | Too many requests |
| `PROCESSING` | 202 | Evidence is still being processed |
| `EVIDENCE_NOT_FOUND` | 404 | Evidence artifact not found |
| `TWIN_NOT_READY` | 503 | Digital Twin is still being built |
| `ADA_UNAVAILABLE` | 503 | ADA service temporarily unavailable |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

---

## Rate Limits

| Endpoint Group | Rate Limit |
|---------------|-----------|
| Auth | 10 requests / minute |
| Evidence upload | 5 requests / minute |
| ADA chat | 20 requests / minute |
| Search | 30 requests / minute |
| Read operations | 100 requests / minute |

---

## WebSocket Protocol (ADA Real-time)

```
ws://localhost:8000/api/v1/ada/ws

// Client → Server
{ "type": "message", "content": "What skills should I learn?" }

// Server → Client (streaming)
{ "type": "token", "content": "Based" }
{ "type": "token", "content": " on" }
{ "type": "token", "content": " your" }
...
{ "type": "done", "message_id": "msg_xyz", "citations": [...] }

// Server → Client (error)
{ "type": "error", "code": "ADA_UNAVAILABLE", "message": "..." }
```
