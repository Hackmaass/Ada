# ─── Ada Backend Dockerfile ───────────────────────────────
# Multi-stage build for a lean production image.

# ---------- Stage 1: Builder ----------
FROM python:3.12-slim AS builder
WORKDIR /build

# System deps for pdfplumber / PyMuPDF
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ---------- Stage 2: Runtime ----------
FROM python:3.12-slim
WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /install /usr/local

# Copy application source
COPY . .

# Expose the default port
EXPOSE 8000

# Run with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
