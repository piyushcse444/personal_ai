# Personal AI Setup Guide

This guide covers preparing a Windows development machine and cloning the repository. It also explains the current project status so you do not mistake planned setup steps for working commands.

## Current project status

The Next.js frontend is scaffolded in `frontend/` and includes an interactive chat UI preview. Messages exist only in browser memory and disappear when the page is refreshed. The Spring Boot backend is scaffolded in `backend/` and exposes an operational health endpoint. Database persistence, authentication, frontend integration, and LLM integration do not exist yet, so the interface does not generate AI answers.

Frontend work remains in progress, and backend foundation work has started in parallel. LLM integration is still deferred until the frontend is complete.

## 1. Install prerequisites

For frontend and backend development, install:

- **Git for Windows** — clone and manage the repository.
- **Node.js** — use the version supported by the frontend's Next.js release. Next.js 16 requires Node.js 20.9 or newer.
- **JDK 21 or newer** — needed to run the Spring Boot backend. The backend targets Java 21; a newer JDK such as Java 22 can compile and run it.
- **Visual Studio Code** (optional) — recommended editor. The Extension Pack for Java and TypeScript/JavaScript support are useful.

Docker Engine is needed to run PostgreSQL locally. PostgreSQL 17 with pgvector is configured through the repository's Docker Compose file. Redis and MinIO/S3 remain future options.

### Verify the tools

Open PowerShell and run:

```powershell
git --version
node --version
npm.cmd --version
java -version
docker --version
docker compose version
```

Git, Node.js, npm, and Java are needed for current frontend/backend work. Docker will be used later for the database. Each installed tool should print a version. If a command is not recognized, install that tool and open a new PowerShell window.

### Current development machine

The project owner has verified these tools are installed:

| Tool | Installed version |
|---|---|
| Git | 2.56.0.windows.4 |
| Node.js | 26.13.0 |
| npm | 11.20.0 |
| Java | 22.0.2 |
| Docker | 29.9.2 |
| Docker Compose | v5.6.1 |

These are the machine's current versions, not requirements for every contributor. Follow the versions declared by each project's configuration. The frontend uses Next.js 16, which requires Node.js 20.9 or newer. The backend targets Java 21 and uses Spring Boot 4.

## 2. Clone the repository

Replace the URL below with the repository's actual GitHub URL:

```powershell
git clone <repository-url>
Set-Location <repository-folder>
```

For example, if the clone creates a folder named `personal_ai`:

```powershell
Set-Location .\personal_ai
```

## 3. Install and run the frontend

```powershell
Set-Location .\frontend
npm.cmd ci
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Leave the development server running in that terminal; press `Ctrl+C` to stop it.

Useful frontend checks:

```powershell
npm.cmd run lint
npm.cmd run build
```

Run these commands from the `frontend` directory. The chat composer and suggested prompts work locally, but do not call an API or persist data.

## 4. Run the backend

From the repository root, run:

```powershell
Set-Location .\backend
.\mvnw.cmd test
.\mvnw.cmd spring-boot:run
```

The Maven Wrapper downloads its configured Maven version and dependencies on the first run, so an internet connection is needed. Open [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health); a healthy service responds with JSON containing `"status":"UP"`. Stop the server with `Ctrl+C`.

The backend currently provides only the standard Actuator health endpoint. The PostgreSQL connection is configured below; application API endpoints, authentication, and frontend connection are not implemented yet.

## 5. AI provider credentials

No API key is required to clone or read the project. When a cloud provider is integrated, its credentials should be configured using the project's documented environment-variable mechanism.

- Never put API keys directly in source code or commit them to Git.
- Use a committed example file (such as `.env.example`) only as a template; put real credentials in the corresponding ignored local environment file.
- Ollama is optional and will only be needed if/when local-model support is implemented.

## 6. Start the database

Start Docker Desktop, then from the repository root create your local environment file and start PostgreSQL:

```powershell
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
docker compose up -d
docker compose ps
```

The compose service uses PostgreSQL 17 with pgvector and stores data in a named Docker volume. `.env` contains local-only development credentials and is ignored by Git. The backend imports this file when started from the `backend` directory. The defaults are for local development only; do not use them in a deployed environment.

The backend connects to the database using `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD`; defaults match the values in `.env.example`. On startup, Flyway runs the migration that enables the PostgreSQL `vector` extension. No application tables have been created yet.

Verify database and backend health after starting the database:

```powershell
Set-Location .\backend
.\mvnw.cmd spring-boot:run
```

Open [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health). The health status should be `UP`, including the database indicator. Stop the backend with `Ctrl+C`. Stop PostgreSQL from the repository root with `docker compose down`; the named volume preserves database data.

The database container has been configured but may not yet have been verified on every machine. If Docker reports that it cannot connect to the Docker engine, start Docker Desktop and retry.

## 7. AI provider setup (not available yet)

No AI provider integration exists. Do not configure API credentials at this stage. When providers are implemented, add local credentials through ignored environment files and never commit secrets.

Until then, use the development roadmap in [README.md](./README.md) to track the planned implementation.
