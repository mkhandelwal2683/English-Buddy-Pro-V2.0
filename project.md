# English Buddy Pro – AI English Teacher

## Product Vision
Build a production-quality AI-powered English learning platform that helps learners improve speaking, grammar, vocabulary, pronunciation, and confidence through personalized AI coaching.

## Current Version
v2.2.1 Stable AI Backend (In Progress)

## Sprint Goal
Deliver a stable, secure, and scalable AI backend using:
- GitHub Pages
- Cloudflare Workers
- OpenRouter

## Technology Stack
Frontend:
- HTML
- CSS
- JavaScript

Backend:
- Cloudflare Workers

AI Provider:
- OpenRouter

Future Providers:
- Gemini
- OpenAI

## Repository Structure
/docs
/src
/worker
/tests
/assets

## Development Workflow
1. One complete file at a time
2. Test every file
3. No partial implementations
4. Version-based releases
5. Update documentation after every sprint

## Version Roadmap
v2.2.1 – Stable AI Backend
v2.3 – AI English Teacher
v2.4 – Speaking Coach
v2.5 – Smart Learning
v3.0 – Play Store Release

## Current Known Issue
Frontend communicates with the Cloudflare Worker successfully.
The remaining task is to finalize reliable production communication between the Worker and OpenRouter.

## Definition of Done (v2.2.1)
- Frontend → Worker
- Worker → OpenRouter
- OpenRouter → AI
- AI → Frontend
- Error handling
- Loading state
- Production testing
