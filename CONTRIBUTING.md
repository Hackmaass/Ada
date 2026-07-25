# Contributing to TalentGraph AI

Thank you for your interest in contributing to TalentGraph AI. This document provides guidelines to help you get started.

---

## Code of Conduct

Be respectful, constructive, and inclusive. We are building something meaningful — let's do it together with integrity.

---

## How to Contribute

### Reporting Issues

1. Check existing issues to avoid duplicates.
2. Use a clear, descriptive title.
3. Include steps to reproduce the issue.
4. Include expected vs. actual behavior.
5. Include relevant logs, screenshots, or error messages.

### Suggesting Features

1. Open a feature request issue.
2. Describe the problem the feature solves.
3. Describe your proposed solution.
4. Consider how it fits with the project's [vision](./docs/vision.md).

### Submitting Code

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Make your changes following the coding standards below.
4. Write or update tests as needed.
5. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add skill gap visualization
   fix: resolve duplicate skills in knowledge graph
   docs: update API design for twin endpoints
   ```
6. Push and open a Pull Request against `main`.
7. Fill in the PR template with a clear description.

---

## Development Setup

See the [Development Guide](./docs/development-guide.md) for full setup instructions.

---

## Coding Standards

### TypeScript / React

- Use **strict TypeScript** — avoid `any`.
- Use **functional components** with hooks.
- Use **named exports** for components.
- Keep components **focused and reusable**.
- Co-locate component-specific styles and types.

### Python

- **Type hints** on all function signatures.
- **Pydantic models** for data validation.
- **Async by default** for API handlers and services.
- **Google-style docstrings** for all public functions.
- Follow **PEP 8** (enforced by Ruff).

### CSS

- Use **Tailwind CSS** utility classes as the primary styling approach.
- Use **vanilla CSS** in `globals.css` for global styles and complex components.
- Follow the existing design system: `#5B73AE` accent, Inter/Outfit typography, dark-first.

### General

- **No placeholder content** — every addition should be functional.
- **No duplicate code** — extract shared logic into utilities or components.
- **Meaningful naming** — variables, functions, and files should be self-documenting.
- **Preserve existing comments and documentation** unless they are directly related to your change.

---

## Architecture Decisions

Before making significant architectural changes:

1. Read the [Architecture](./docs/architecture.md) documentation.
2. Discuss your proposal in an issue first.
3. Consider backward compatibility.
4. Update documentation to reflect your changes.

---

## Review Process

1. All PRs require at least one review.
2. Address all review comments before merging.
3. Squash merge to keep history clean.
4. Delete feature branches after merge.

---

## Questions?

Open an issue or reach out to the maintainers. We're happy to help.
