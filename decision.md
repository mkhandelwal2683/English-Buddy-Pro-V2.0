# Architecture Decisions

This document records important technical and architectural decisions made during the development of English Buddy Pro.

---

## ADR-001: Version-Based Development

**Status:** Approved

### Decision
The project will follow version-based releases with clearly defined sprint goals.

### Reason
- Better planning
- Easier testing
- Predictable releases
- Clear progress tracking

---

## ADR-002: Cloudflare Workers

**Status:** Approved

### Decision
Cloudflare Workers will be used as the backend API layer.

### Reason
- Global edge deployment
- Low latency
- Secure secret management
- Easy deployment
- Scalable architecture

---

## ADR-003: AI Provider Abstraction

**Status:** Approved

### Decision
The application will communicate through a provider manager rather than directly with a single AI provider.

### Reason
- Future support for OpenRouter, Gemini, and OpenAI
- Easy provider switching
- Reduced vendor lock-in

---

## ADR-004: Documentation-First Development

**Status:** Approved

### Decision
Major architectural changes will be documented before implementation.

### Reason
- Better maintainability
- Easier onboarding
- Clear engineering history

---

## ADR-005: One Complete File at a Time

**Status:** Approved

### Decision
Implement and test one complete file before moving to the next.

### Reason
- Easier debugging
- Better quality
- Stable incremental progress
