# Personal AI — Project Context

Last updated: 2026-10-31

## How to maintain this file

- At the start of each project task, read `gpt.md` and `README.md` to refresh project context.
- When a decision is made or project behavior changes, update this file in the same task.
- Keep implemented work separate from plans. Only mark something implemented after verifying it in the project.
- Prefer concise, current facts; revise outdated entries rather than letting this file become a duplicate of the README.

## Product direction

Personal AI is intended to be a self-hosted, model-independent personal assistant with a ChatGPT-like web experience, its own conversation history, and long-term personal memory. Users should be able to change AI providers without losing conversations or memories. A mobile application and multi-user SaaS support are future possibilities, not current implementations.

## Current development focus

- Frontend completion is still in progress. At the user's request, backend foundation work has started in parallel.
- Keep LLM API integration deferred until the frontend is complete.
- During the frontend phase, prioritize the Next.js/React/TypeScript user experience. Use mocked or local UI state where needed; do not imply that chat responses are connected to a real model.

## Decisions recorded in the README

- **Architecture:** Modular monolith.
- **Frontend:** Next.js, React, and TypeScript.
- **Backend:** Java and Spring Boot.
- **Data:** PostgreSQL, with pgvector for semantic/vector retrieval.
- **AI providers:** OpenAI, Google Gemini, and Ollama/local models behind a shared provider abstraction. Embedding generation has a separate provider abstraction.
- **Memory:** Planned categories are profile, preference, episodic, and knowledge memory. Retrieval and extraction should remain independent of the selected chat provider.
- **Future components:** Redis for caching/background work and MinIO/S3 for file storage are listed as future options.

## Work completed to date

### Project decisions

- The frontend is still in progress. The user has now asked to begin backend development before frontend completion.
- LLM API integration remains deferred until the frontend is complete.
- Use local UI state/mocks as needed during frontend development and make it clear that no real model is connected.
- Use the conventional project directory name `frontend`.

### Frontend implementation

- Scaffolded `frontend/` as a Next.js App Router app with TypeScript, React, and ESLint. Current scaffold versions include Next.js 16.4.3 and React 19.3.0.
- Replaced the generated starter screen with a responsive Personal AI chat preview:
  - workspace sidebar, chat navigation, preview indicator, and disabled model selector;
  - welcome screen with suggestion cards that populate the composer;
  - message composer with Enter-to-send and Shift+Enter for a newline;
  - local message display and new-chat reset.
- Messages are held only in React state: they disappear on refresh, are not saved, and are not sent to any AI. The UI explicitly communicates this.
- Set app title/description and removed the generated starter styling and remote Google font dependency.
- Updated the root README with frontend status and marked frontend initialization complete.

### Backend foundation

- Scaffolded `backend/` as a Java 21 Maven project using Spring Boot 4.1.2, Spring MVC, and Actuator.
- Included the Maven Wrapper so contributors do not need a global Maven installation.
- Configured the service name and exposed only the Actuator health endpoint over HTTP.
- Added an integration test that starts the application on a random port and checks `/actuator/health` returns HTTP 200 with status `UP`.
- No application API, authentication, frontend connection, or LLM integration has been added.

### Database setup

- Added root `docker-compose.yml` for PostgreSQL 17 with pgvector, persistent named storage, and a readiness health check.
- Added `.env.example` with local-only development defaults and a root `.gitignore` that excludes real `.env` files.
- Configured Spring JDBC/PostgreSQL and Flyway; the first migration enables the `vector` extension. No application tables exist yet.
- Spring loads the root `.env` when started from `backend/`, so the database settings are shared with Compose.
- Docker Compose configuration validation and backend tests pass, but the live database, pgvector migration, and DB health indicator are not yet runtime-verified because no Docker Engine is currently reachable.

### Setup documentation and local tooling

- Added clone, install, run, lint, and build instructions for the frontend, backend, and PostgreSQL setup in `setup_guide.md`.
- The owner reports these tools installed locally: Git 2.56.0.windows.4, Node.js 26.13.0, npm 11.20.0, Java 22.0.2, Docker 29.9.2, and Docker Compose v5.6.1.
- On the owner's Windows PowerShell, invoke npm as `npm.cmd` to avoid PowerShell execution-policy blocking `npm.ps1`.

### Verification

- `npm.cmd run lint`: passes.
- `npm.cmd run build`: passes.
- Started the dev server and verified the landing screen, suggestion-to-composer behavior, and local message submission in a browser.
- `.\mvnw.cmd test` in `backend/`: passes; 1 test verifies the health endpoint and the test-profile H2 datasource health indicator.
- The backend health endpoint was also checked at runtime and returned `{"status":"UP"}`.
- `docker compose config`: passes. The root `.env` is ignored by Git; `.env.example` remains tracked.
- Starting PostgreSQL and verifying the pgvector migration against a live container is blocked because Docker Engine is not reachable in this environment.
- `npm audit --omit=dev`: zero production dependency vulnerabilities.
- Full `npm audit`: reports 16 moderate vulnerabilities in the development ESLint/minimatch dependency chain. The suggested `npm audit fix --force` would downgrade ESLint and was not applied.

### Not implemented / remaining

- Frontend completion is still in progress; current chat is only a UI preview.
- No application schema/data persistence, authentication, persistent conversations, memory management, frontend-backend connection, real model selection, streaming, or LLM API integration exists yet.
- Continue frontend implementation and backend foundation work. Defer LLM integration until the frontend is complete.

## Setup documentation

- `setup_guide.md` lists Windows prerequisites and clone instructions, frontend commands, and backend test/run commands.
- Expand the guide with database and LLM instructions after those components are implemented.
- The project owner reports Git 2.56.0.windows.4, Node.js 26.13.0, npm 11.20.0, Java 22.0.2, Docker 29.9.2, and Docker Compose v5.6.1 installed. These are local machine versions, not project-wide requirements; confirm frontend/backend compatibility when choosing framework versions.

## Planned work

Continue frontend work and expand the backend with application API, database persistence, and frontend connectivity. Add LLM provider integration after the frontend is complete.

## Documentation note

The current `README.md` ends with an incomplete checklist marker (`- [`); its roadmap appears unfinished.