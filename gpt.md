# Personal AI — Project Context

Last updated: 2026-10-31

## How to maintain this file

- At the start of each project task, read `gpt.md` and `README.md` to refresh project context.
- When a decision is made or project behavior changes, update this file in the same task.
- Keep implemented work separate from plans. Only mark something implemented after verifying it in the project.
- Prefer concise, current facts; revise outdated entries rather than letting this file become a duplicate of the README.

## Product direction

Personal AI is intended to be a self-hosted, model-independent personal assistant with a ChatGPT-like web experience, its own conversation history, and long-term personal memory. Users should be able to change AI providers without losing conversations or memories. A mobile application and multi-user SaaS support are future possibilities, not current implementations.

## Decisions recorded in the README

- **Architecture:** Modular monolith.
- **Frontend:** Next.js, React, and TypeScript.
- **Backend:** Java and Spring Boot.
- **Data:** PostgreSQL, with pgvector for semantic/vector retrieval.
- **AI providers:** OpenAI, Google Gemini, and Ollama/local models behind a shared provider abstraction. Embedding generation has a separate provider abstraction.
- **Memory:** Planned categories are profile, preference, episodic, and knowledge memory. Retrieval and extraction should remain independent of the selected chat provider.
- **Future components:** Redis for caching/background work and MinIO/S3 for file storage are listed as future options.

## Implemented and verified

- No application source code, configuration, or tests are present in the workspace yet. The workspace currently contains project documentation: `README.md`, `gpt.md`, and `setup_guide.md`.
- Therefore, no product functionality or roadmap phase is verified as implemented.

## Setup documentation

- `setup_guide.md` lists Windows development prerequisites and clone instructions.
- The guide explicitly notes that the project is documentation-only today and cannot yet be run. Update it with exact environment, database, frontend, and backend commands as those are implemented.

## Planned work

The README's Phase 1 roadmap describes initializing the frontend and backend, connecting them, integrating OpenAI through a provider abstraction, building chat and streaming, configuring PostgreSQL, persisting conversations/messages, and adding history and model configuration. These items remain planned until verified in the project.

## Documentation note

The current `README.md` ends with an incomplete checklist marker (`- [`); its roadmap appears unfinished.