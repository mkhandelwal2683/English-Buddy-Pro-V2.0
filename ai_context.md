# AI Context

## Purpose

This document defines the engineering principles, development workflow, coding standards, and architectural guidelines for English Buddy Pro.

The goal is to ensure every contribution remains consistent, scalable, maintainable, and production-ready.

---

# Product Philosophy

English Buddy Pro is not a chatbot.

It is an AI-powered English learning platform focused on helping users improve their English through personalized learning.

Every feature should support learning, engagement, and measurable progress.

---

# Engineering Principles

Always prefer:

- Readable code
- Modular architecture
- Reusable components
- Performance
- Scalability
- Security
- Mobile-first design
- Accessibility

Avoid unnecessary complexity.

---

# Development Workflow

Every implementation follows this order:

1. Define Sprint
2. Define Goal
3. Update project.md
4. Implement one complete file
5. Test
6. Fix bugs
7. Release
8. Update changelog.md

Never implement multiple unfinished features together.

---

# Coding Standards

JavaScript

- ES6+
- Async/Await
- Avoid global variables
- Small reusable functions
- Clear naming

HTML

- Semantic HTML
- Accessibility first

CSS

- Mobile-first
- Responsive
- Reusable classes

---

# Architecture

UI

↓

Services

↓

AI Layer

↓

Provider Manager

↓

Cloudflare Worker

↓

AI Provider

The UI should never communicate directly with an AI provider.

---

# AI Provider Strategy

Primary

- OpenRouter

Future

- Gemini
- OpenAI

The provider manager should allow switching providers with minimal changes.

---

# File Naming

Files

lowercase

Folders

lowercase

JavaScript

camelCase

CSS

lowercase

---

# Testing Strategy

Every sprint must verify:

- Navigation
- AI responses
- Error handling
- Mobile responsiveness
- Performance
- Console free of errors

No sprint is complete until all tests pass.

---

# Documentation

Always keep updated:

- project.md
- changelog.md
- decisions.md

Documentation is part of the product.

---

# Long-Term Goal

Build English Buddy Pro into a production-quality AI English learning platform suitable for public release on the Google Play Store.
