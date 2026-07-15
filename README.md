# Aura Workspace — Frontend

A premium, full-stack HR Workspace Hub. This repository contains the **Next.js frontend** — the employee-facing workspace hub with glassmorphic UI, GSAP micro-interactions, and RTL-ready layouts.

The backend API and database live in a separate repository: [`aura-core`](https://github.com/Tariq-himself/aura-core).

---

## What This Project Solves

Internal HR tools are usually clunky, text-heavy, and fragmented across Slack, email, and spreadsheets. Aura Workspace centralizes the employee experience into a single, visually engaging portal that people actually want to use.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS with RTL-ready logical properties |
| Animations | GSAP + ScrollTrigger |
| State | React Server Components + Server Actions |
| Auth | Laravel Sanctum tokens (managed by `aura-core`) |

---

## Design System

Premium urban glassmorphic aesthetic with locked color tokens:

| Token | Value |
|---|---|
| `--color-base` | `#0A0A0A` |
| `--color-surface` | `rgba(255, 255, 255, 0.05)` |
| `--color-surface-hover` | `rgba(255, 255, 255, 0.08)` |
| `--color-border` | `rgba(255, 255, 255, 0.1)` |
| `--color-accent-primary` | `#F2A900` |
| `--color-accent-secondary` | `#FC8310` |
| `--color-text-primary` | `#FFFFFF` |
| `--color-text-muted` | `#A1A1AA` |
| `--color-success` | `#22C55E` |
| `--color-error` | `#EF4444` |

These values are mapped into `tailwind.config.ts` as CSS variables.

---

## Repository Architecture

```
app/              → Next.js App Router pages and layouts
components/       → Shared React components
lib/              → Utilities, hooks, API clients
styles/           → Global CSS and Tailwind config
public/           → Static assets
```


---

## Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev
```

---

## Related Repositories

- [`aura-core`](https://github.com/Tariq-himself/aura-core) — Laravel backend, database, and API

---

## Project Plan

See `AURA-PLAN.md` in this repository for the full project plan, architecture decisions, and phase breakdown.
