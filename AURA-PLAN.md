# Aura Workspace — Project Plan

## Overview

Aura Workspace is a premium, full-stack HR Workspace Hub built to replace fragmented internal HR tools with a centralized, visually engaging, and secure platform.

**Project goals:**
- Real internal HR tool for the organization
- Professional full-stack portfolio showcase
- Responsive PWA accessible on desktop and mobile
- Bilingual support: English and Arabic (RTL)

---

## Architecture Decisions

| Decision | Recommendation | Rationale |
|---|---|---|
| **Repo structure** | Two repositories | `aura-workspace` for Next.js frontend, `aura-core` for Laravel backend. Different runtimes and deployment targets stay independent. |
| **Bilingual strategy** | English-first layout with RTL-ready logical properties | Build English UI first in Phase 1, but use Tailwind logical properties (`ms-`, `me-`, `ps-`, `pe-`, `text-start`) from day one so Arabic RTL is additive, not a rewrite. |
| **First vertical slice** | Today's attendance dashboard | Small enough to ship fast, big enough to prove the full stack end-to-end. |
| **Auth (first slice)** | Email/password via Laravel Breeze/Sanctum | Faster to implement than SSO. SSO can be swapped in during Phase 2 without breaking the architecture. |
| **Compliance** | Baked into every phase + final security audit | HR data in Saudi Arabia cannot be retrofitted safely. Every feature considers RBAC, encryption, audit logs, and data residency. |

---

## Repository Structure

### `aura-workspace` (Frontend)

```
app/              → Next.js App Router pages and layouts
components/       → Shared React components
lib/              → Utilities, hooks, API clients
styles/           → Global CSS and Tailwind config
public/           → Static assets
```

### `aura-core` (Backend)

```
app/
  Http/
    Controllers/Api/v1/
  Models/
  Services/         → Biometric integration service
  Policies/         → Authorization rules
database/
  migrations/
routes/
  api.php
```

---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router), React, TypeScript |
| Styling | Tailwind CSS with RTL-ready logical properties |
| Animations | GSAP + ScrollTrigger |
| State | React Server Components + Server Actions where possible |
| Backend | Laravel 11 + Sanctum |
| Database | PostgreSQL |
| Auth | Laravel Breeze (admin) + Sanctum tokens (API) |
| Deployment | Vercel (frontend), VPS with Laravel Forge (backend), Saudi region preferred |
| Biometric integration | Laravel service class wrapping the biometric API |

---

## Design System

Locked color palette for the premium urban glassmorphic aesthetic:

| Token | Value | Usage |
|---|---|---|
| `--color-base` | `#0A0A0A` | Primary dark background |
| `--color-surface` | `rgba(255, 255, 255, 0.05)` | Frosted glass surfaces |
| `--color-surface-hover` | `rgba(255, 255, 255, 0.08)` | Hover states on glass |
| `--color-border` | `rgba(255, 255, 255, 0.1)` | Subtle borders and dividers |
| `--color-accent-primary` | `#F2A900` | Primary action buttons, key data highlights |
| `--color-accent-secondary` | `#FC8310` | Secondary highlights, notifications, badges |
| `--color-text-primary` | `#FFFFFF` | Headings and primary text |
| `--color-text-muted` | `#A1A1AA` | Secondary and helper text |
| `--color-success` | `#22C55E` | Success states |
| `--color-error` | `#EF4444` | Error states |

These values must be mapped directly into `tailwind.config.ts` as CSS variables during Phase 1 frontend setup.

---

## Phase Plan

### Phase 0 — Foundation

- Create `aura-workspace` and `aura-core` repositories
- Set up GitHub Projects board with tickets mapped to each phase
- Define branch strategy, commit conventions, and CI skeleton
- Decide on hosting region/provider for backend
- Document API versioning strategy (`/api/v1/...`)

### Phase 1 — First Vertical Slice: Attendance Dashboard

**Goal:** An authenticated employee can log in and see today's attendance status.

Backend (`aura-core`):
- Set up Laravel project, Docker local setup, PostgreSQL
- Migrations: `users`, `departments`, `employees`, `attendance_logs`
- Models and relationships
- Seeder for test employee + department
- Biometric log sync service — Phase 1 starts with simple manual CSV import or basic scheduled pull to populate an agnostic `attendance_logs` table
- API endpoint: `GET /api/v1/attendance/today`
- Sanctum auth: login + token refresh
- Policy: employees only see their own attendance

Frontend (`aura-workspace`):
- Next.js project setup with Tailwind + GSAP registry
- English-first layout with RTL-ready logical properties (`ms-`, `me-`, `ps-`, `pe-`, `text-start`)
- Lock design tokens into `tailwind.config.ts` (base, surface, accent, text colors)
- Login page
- Dashboard page with Bento grid layout
- Fetch `/api/v1/attendance/today` from Laravel
- GSAP entrance animations on data load
- Error and loading states
- Deploy both to staging

### Phase 2 — Employee Self-Service

- Leave request workflow
- Salary certificate request
- Remote work request
- Manager approval notifications
- Profile page

### Phase 3 — HR Operations

- Policy playbook pages
- Interactive org chart
- HR admin panel
- Employee directory

### Phase 4 — Security, Compliance & PWA

- Full RBAC review
- Audit log review
- PWA manifest and offline basics
- NDMO/PDPL checklist verification
- Arabic language integration and RTL stress-test (UI foundation already RTL-ready from Phase 1)

---

## Open Items Before Execution

1. **GitHub verification** — Verify that the repo `Tariq-himself/aura-workspace` exists and that the project board is correctly configured. Create new repos if needed.

2. **Biometric system details** — Gather API documentation, export format, or database access details for the existing biometric system. This determines how the sync service is built.

3. **Hosting preference** — Confirm preferred Saudi-region provider (AWS Riyadh, STC Cloud, Sahara Cloud, etc.) or choose based on Laravel deployment ease.

4. **Team size / roles** — Confirm whether this is a solo build or a team effort. This affects branch strategy and code review flow.

---

## Next Step

Execute Phase 0: set up repositories, project board, and development environment, then begin Phase 1 with the database schema.
