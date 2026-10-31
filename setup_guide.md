# Personal AI Setup Guide

This guide covers preparing a Windows development machine and cloning the repository. It also explains the current project status so you do not mistake planned setup steps for working commands.

## Current project status

The repository is currently at the planning/documentation stage. It does not yet contain a Next.js app, a Spring Boot app, a database configuration, Docker Compose file, or environment-variable template. As a result, you can clone and inspect the repository, but you cannot start the application yet.

This guide will need to be updated as those components are added. Follow the setup files and scripts committed to the repository at that time.

## 1. Install prerequisites

Install the following:

- **Git for Windows** — clone and manage the repository.
- **Node.js LTS** — includes npm and will be used by the planned Next.js frontend.
- **JDK 21** — recommended starting point for the planned Java/Spring Boot backend. Use the Java version specified by the backend build configuration once it exists.
- **Docker Desktop** — recommended for running PostgreSQL with pgvector locally. Enable the WSL 2 backend if prompted.
- **Visual Studio Code** (optional) — recommended editor. The Extension Pack for Java and TypeScript/JavaScript support are useful.

You do not need to install PostgreSQL, Redis, or MinIO separately at this stage. PostgreSQL with pgvector is planned; Redis and MinIO/S3 are future options. A database startup configuration has not been added yet.

### Verify the tools

Open PowerShell and run:

```powershell
git --version
node --version
npm --version
java -version
docker --version
docker compose version
```

Each command should print a version. If a command is not recognized, install that tool and open a new PowerShell window.

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

## 3. Check out the current files

```powershell
Get-ChildItem
```

At the current planning stage, the repository contains project documentation only. There are no app-specific install or run commands yet. In particular, do not run `npm install` or try to start Spring Boot until the corresponding frontend/backend project files have been added.

## 4. AI provider credentials

No API key is required to clone or read the project. When a cloud provider is integrated, its credentials should be configured using the project's documented environment-variable mechanism.

- Never put API keys directly in source code or commit them to Git.
- Use a committed example file (such as `.env.example`) only as a template; put real credentials in the corresponding ignored local environment file.
- Ollama is optional and will only be needed if/when local-model support is implemented.

## 5. Starting the application

The application cannot be started from the current repository state because its frontend, backend, and runtime configuration have not been created.

Once those are added, this guide should provide the exact commands to:

1. Configure local environment variables.
2. Start PostgreSQL with the required pgvector extension.
3. Run database migrations or initialize the schema.
4. Install frontend dependencies and start Next.js.
5. Run the Spring Boot backend using the project's checked-in build wrapper.
6. Configure and test the selected AI provider.

Until then, use the development roadmap in [README.md](./README.md) to track the planned implementation.
