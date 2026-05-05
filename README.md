# 🏥 Doctor Appointment — Frontend

A production-grade **React + Vite** frontend for managing doctor appointments. Features sortable/paginated appointment tables, clinician/date-based grouping, and a scalable feature-based architecture designed for enterprise teams.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Architecture Decisions](#-architecture-decisions)
- [API Layer](#-api-layer)
- [Deployment](#-deployment)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 🚀 Features

- 📅 **Appointments Table** — sortable and paginated view of all appointments
- 👨‍⚕️ **Group by Clinician** — organize appointments per doctor
- 🗓️ **Group by Start Date** — timeline-based appointment grouping
- ➕ **Create Appointment** — form to schedule new appointments
- 💾 **Local Persistence** — data preserved via `localStorage`
- 🔴 **Highlight Rule** — appointments with `1 < duration < 10` are visually flagged
- 🛡️ **Global Error Boundary** — prevents white screens; graceful crash recovery
- ⚡ **API-ready** — TanStack Query and Axios wired up for real backend integration

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Build Tool | Vite 5 |
| Language | TypeScript (strict) |
| Routing | React Router DOM v7 |
| Data Fetching | TanStack Query (React Query) |
| HTTP Client | Axios |
| Error Handling | React Error Boundary |
| Linting | ESLint (flat config) |
| Formatting | Prettier |
| Git Hooks | Husky + lint-staged + commitlint |

---

## 📁 Project Structure

```
ReactJS_Demo/
├── .husky/                    # Git hooks (pre-commit, commit-msg)
├── dist/                      # Production build output
├── public/                    # Static public assets
├── src/
│   ├── assets/                # Static data / images / icons
│   ├── component/             # Legacy UI (being migrated gradually)
│   │   ├── Appointments.js    # Main appointments view
│   │   ├── DataTableStyle.css # Table styles
│   │   ├── GroupbyClinician.js# Clinician grouping view
│   │   ├── GroupbyStartDate.js# Date grouping view
│   │   └── MainTable.js       # Shared table component
│   ├── App.css                # Global app styles
│   ├── App.js                 # Root component
│   ├── App.test.js            # Root-level tests
│   ├── index.css              # Base / reset styles
│   ├── index.js               # Application entry point
│   ├── reportWebVitals.js     # Web Vitals reporting
│   └── setupTests.js          # Test environment configuration
├── .env.example               # Environment variable template
├── .gitignore
├── .lintstagedrc.cjs          # lint-staged configuration
├── commitlint.config.cjs      # Commitlint rules
├── eslint.config.js           # ESLint flat config
├── index.html                 # HTML entry point
├── package.json
├── prettier.config.cjs        # Prettier configuration
├── vite.config.ts             # Vite configuration
├── yarn.lock
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | >= 18.x |
| npm / yarn | Latest stable |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ReactJS_Demo.git

# 2. Navigate into the project
cd ReactJS_Demo

# 3. Install dependencies
npm install
# or
yarn install

# 4. Set up environment variables
cp .env.example .env
```

### Start Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure the values:

```env
# API base URL for backend integration
VITE_API_BASE_URL=http://localhost:5000

# Auth token storage key
VITE_AUTH_TOKEN_STORAGE_KEY=auth_token
```

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_BASE_URL` | ✅ | Backend API base URL |
| `VITE_AUTH_TOKEN_STORAGE_KEY` | ❌ | Key used to store the auth token in storage |

> All Vite environment variables must be prefixed with `VITE_` to be accessible in the browser.

---

## ▶️ Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev Server | `npm run dev` | Start local dev server at `http://localhost:3000` |
| Build | `npm run build` | Typecheck + optimized production build → `dist/` |
| Preview | `npm run preview` | Serve the production build locally for testing |
| Typecheck | `npm run typecheck` | Run TypeScript compiler checks without emitting |
| Lint | `npm run lint` | Lint the entire codebase using ESLint flat config |
| Format | `npm run format` | Auto-format all files using Prettier |

---

## 🏗️ Architecture Decisions

### Feature-based Module Structure
Components and logic are organized by domain feature (`appointments`, `doctors`, etc.) rather than by file type. This prevents import spaghetti as the codebase scales across multiple teams.

### Centralized Infrastructure Layers
Cross-cutting concerns like HTTP, storage, and environment config are isolated in `src/lib`, `src/services`, and `src/config` — keeping them out of UI components entirely.

### Global Error Boundary
A root-level React Error Boundary prevents full white-screen crashes in production and enables a recoverable UX with fallback UI.

### TanStack Query Provider
Wired globally at the app root, providing enterprise-grade caching, background refetching, and retry logic — ready to plug into a real API without restructuring existing components.

### Git Hooks & Code Quality
Husky enforces linting and formatting on every commit via lint-staged. Commitlint ensures consistent commit message format (Conventional Commits), keeping changelogs and release notes automated-friendly.

---

## 🌐 API Layer

### HTTP Client — `src/lib/http/httpClient.ts`

- Axios instance with base URL from `VITE_API_BASE_URL`
- Request interceptor: auto-injects auth token from storage
- Response interceptor: normalizes all API errors into a single `ApiError` shape for consistent error handling across the app

### Token Management — `src/services/authToken.ts`

- Reads/writes the auth token using the key from `VITE_AUTH_TOKEN_STORAGE_KEY`
- Configurable storage backend (localStorage by default)

---

## 🚢 Deployment

```bash
npm run build
```

Deploy the generated `dist/` folder to any static hosting provider:

| Provider | Guide |
|----------|-------|
| Vercel | Drop `dist/` or connect Git repo |
| Netlify | Set build command `npm run build`, publish dir `dist` |
| AWS S3 + CloudFront | Upload `dist/` to S3, invalidate CloudFront |
| GitHub Pages | Use `gh-pages` package to publish `dist/` |

> Make sure to configure your hosting provider to redirect all routes to `index.html` for client-side routing to work correctly.

---

## 🔭 Future Improvements

- [ ] Migrate `src/component/*` legacy JS components into typed TypeScript feature modules
- [ ] Add `react-hook-form` + `zod` for validated appointment form (preserves current UX)
- [ ] Integrate real backend API using TanStack Query hooks
- [ ] Add toast notifications for create/delete actions (feature-flagged)
- [ ] Expand test coverage with React Testing Library for all feature components
- [ ] Add CI/CD pipeline (GitHub Actions) for automated lint, test, and build checks

---

## 👨‍💻 Author

Built with ❤️ by **Bansi Borad**

---

<div align="center">
  <strong>⭐ Star this repository if you found it helpful!</strong>
</div>