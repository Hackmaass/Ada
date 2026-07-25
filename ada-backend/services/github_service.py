"""GitHub service for fetching public repositories and related data.

Supports two modes:
- **Authenticated** (GraphQL): when ``GITHUB_TOKEN`` is set, the service uses
  the GitHub GraphQL API for richer data (descriptions, languages, commit counts).
- **Unauthenticated** (REST): when ``GITHUB_TOKEN`` is absent, the service
  falls back to the public REST API with lower rate limits (60 req/h).
"""

from __future__ import annotations

import os
import logging
from typing import Any, Dict, List

import httpx

logger = logging.getLogger(__name__)

# ──────────────────────────── Constants ──────────────────────────────

_GRAPHQL_URL = "https://api.github.com/graphql"
_REST_BASE = "https://api.github.com"

_GRAPHQL_QUERY = """
query($login: String!) {
  user(login: $login) {
    name
    bio
    avatarUrl
    url
    repositories(first: 100, privacy: PUBLIC, isFork: false, orderBy: {field: UPDATED_AT, direction: DESC}) {
      totalCount
      nodes {
        name
        description
        url
        stargazerCount
        primaryLanguage { name }
        languages(first: 10) { nodes { name } }
        repositoryTopics(first: 10) { nodes { topic { name } } }
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 0) { totalCount }
            }
          }
        }
      }
    }
  }
}
"""


# ──────────────────────────── Helpers ────────────────────────────────

def _get_token() -> str | None:
    """Return the GitHub token if set, else ``None``."""
    return os.getenv("GITHUB_TOKEN")


def _common_headers(token: str | None = None) -> Dict[str, str]:
    headers = {"Accept": "application/vnd.github+json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers


# ──────────────────────────── GraphQL path ───────────────────────────

async def _fetch_via_graphql(username: str, token: str) -> Dict[str, Any]:
    """Fetch rich profile + repo data using the GitHub GraphQL API."""
    payload = {"query": _GRAPHQL_QUERY, "variables": {"login": username}}
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            _GRAPHQL_URL, json=payload, headers=_common_headers(token)
        )
        resp.raise_for_status()
        body = resp.json()

    if "errors" in body:
        logger.error("GitHub GraphQL errors: %s", body["errors"])
        raise RuntimeError(f"GitHub GraphQL errors: {body['errors']}")

    user = body.get("data", {}).get("user")
    if not user:
        raise RuntimeError(f"GitHub user '{username}' not found")

    repos: List[Dict[str, Any]] = []
    for node in user.get("repositories", {}).get("nodes", []):
        branch = node.get("defaultBranchRef") or {}
        target = branch.get("target") or {}
        commit_count = (target.get("history") or {}).get("totalCount", 0)
        languages = [l["name"] for l in (node.get("languages", {}).get("nodes") or [])]
        topics = [t["topic"]["name"] for t in (node.get("repositoryTopics", {}).get("nodes") or [])]

        repos.append({
            "name": node.get("name"),
            "description": node.get("description"),
            "url": node.get("url"),
            "stars": node.get("stargazerCount", 0),
            "primary_language": (node.get("primaryLanguage") or {}).get("name"),
            "languages": languages,
            "topics": topics,
            "commit_count": commit_count,
        })

    return {
        "name": user.get("name"),
        "bio": user.get("bio"),
        "avatar_url": user.get("avatarUrl"),
        "profile_url": user.get("url"),
        "public_repos": user.get("repositories", {}).get("totalCount", 0),
        "repositories": repos,
    }


# ──────────────────────────── REST fallback ──────────────────────────

async def _fetch_via_rest(username: str) -> Dict[str, Any]:
    """Fetch profile + repo data using the public REST API (no token needed)."""
    logger.warning(
        "GITHUB_TOKEN not set – falling back to unauthenticated REST API "
        "(rate limit: 60 requests/hour)."
    )
    async with httpx.AsyncClient(timeout=30) as client:
        headers = _common_headers()

        # 1. User profile
        profile_resp = await client.get(
            f"{_REST_BASE}/users/{username}", headers=headers
        )
        if profile_resp.status_code == 404:
            raise RuntimeError(f"GitHub user '{username}' not found")
        profile_resp.raise_for_status()
        profile = profile_resp.json()

        # 2. Repos (up to 100, sorted by last push)
        repos_resp = await client.get(
            f"{_REST_BASE}/users/{username}/repos",
            params={"per_page": 100, "sort": "pushed", "type": "owner"},
            headers=headers,
        )
        repos_resp.raise_for_status()
        raw_repos = repos_resp.json()

    repos: List[Dict[str, Any]] = []
    for r in raw_repos:
        if r.get("fork"):
            continue
        repos.append({
            "name": r.get("name"),
            "description": r.get("description"),
            "url": r.get("html_url"),
            "stars": r.get("stargazers_count", 0),
            "primary_language": r.get("language"),
            "languages": [r["language"]] if r.get("language") else [],
            "topics": r.get("topics", []),
            "commit_count": 0,  # not available without auth
        })

    return {
        "name": profile.get("name"),
        "bio": profile.get("bio"),
        "avatar_url": profile.get("avatar_url"),
        "profile_url": profile.get("html_url"),
        "public_repos": profile.get("public_repos", 0),
        "repositories": repos,
    }


# ──────────────────────────── Public API ─────────────────────────────

async def fetch_github_data(username: str) -> Dict[str, Any]:
    """Fetch public profile and repository data for a GitHub user.

    Uses the GraphQL API when ``GITHUB_TOKEN`` is available; otherwise
    falls back to the unauthenticated REST API.

    Returns a dict with keys: ``name``, ``bio``, ``avatar_url``,
    ``profile_url``, ``public_repos``, ``repositories``.
    """
    token = _get_token()
    if token:
        return await _fetch_via_graphql(username, token)
    return await _fetch_via_rest(username)
