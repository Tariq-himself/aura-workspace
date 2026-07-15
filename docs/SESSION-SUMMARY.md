# Aura Workspace — Session Summary

**Date:** 2026-07-16
**Session scope:** Project initialization, architecture lock, Phase 0 foundation, and Phase 1 first vertical slice.

---

## Project Overview

Aura Workspace is a premium, full-stack HR Workspace Hub built to replace fragmented internal HR tools with a centralized, visually engaging, and secure platform.

- **Frontend:** `aura-workspace` — Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + GSAP
- **Backend:** `aura-core` — Laravel 11 + PHP 8.3 + PostgreSQL (production) / SQLite (local)
- **Auth:** Laravel Sanctum token-based authentication
- **Design:** Dark glassmorphic urban aesthetic with amber/orange accents
- **Localization:** English-first UI with RTL-ready logical properties for future Arabic support

---

## Architecture Decisions (Locked)

| Decision | Choice |
|---|---|
| Repository structure | Two repositories: `aura-workspace` (frontend) and `aura-core` (backend) |
| Bilingual strategy | English-first layout with Tailwind logical properties (`ms-`, `me-`, `ps-`, `pe-`, `text-start`) so Arabic RTL is additive later |
| First vertical slice | Today's attendance dashboard |
| Auth (Phase 1) | Email or employee number login via Sanctum tokens |
| Compliance | Baked into every phase + final security audit |
| Design tokens | Locked in `app/globals.css` |

### Design Tokens

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

---

## Repositories

- **Frontend:** https://github.com/Tariq-himself/aura-workspace
- **Backend:** https://github.com/Tariq-himself/aura-core

---

## Phase 0 — Foundation ✅

- Installed PHP 8.3 and Composer on the local machine
- Initialized `aura-workspace` with Next.js 16 + Tailwind + GSAP
- Created `aura-core` repository with Laravel 11 + Sanctum + Breeze API
- Configured GitHub issues and Kanban board
- Updated project documentation and README files

## Phase 1 — Attendance Dashboard Vertical Slice ✅

### Backend (`aura-core`)

- Created migrations:
  - `departments`
  - `employees`
  - `attendance_logs`
- Created models and relationships:
  - `User → Employee`
  - `Employee → Department`
  - `Employee → AttendanceLog`
- Created factories and seeders
- Implemented custom login endpoint accepting **email or employee number**
- Implemented `GET /api/v1/attendance/today` with:
  - Status: `on_time` / `within_flex` / `late` / `absent`
  - Check-in and check-out times
  - Expected checkout (check-in + 9 hours)
  - Hours worked and progress percentage
  - `can_checkout` flag
  - Branch

### Frontend (`aura-workspace`)

- Created API client (`lib/api.ts`) with token storage and response envelope
- Created `AuthProvider` context
- Created `GlassCard` component
- Built login page
- Built attendance dashboard with Bento grid layout and GSAP animations
- Used Tailwind logical properties throughout

### Attendance Rules

- Shift: **9:00 AM – 6:00 PM**
- Flexibility: **1 hour** (on-time window 8:00 AM – 10:00 AM)
- Required daily hours: **9 hours**
- `on_time` if check-in ≤ 9:00 AM
- `within_flex` if 9:00 AM < check-in ≤ 10:00 AM
- `late` if check-in > 10:00 AM

---

## Test Credentials

| Field | Value |
|---|---|
| Email | `test@aura.local` |
| Employee number | `EMP001` |
| Password | `password` |
| Department | Operations |
| Branch | Riyadh Main |
| Seeded check-in | 8:45 AM (on time) |

---

## How to Run Locally

### 1. Backend

```bash
cd C:\Users\Tedoss\Desktop\aura-core
php artisan serve
```

Backend runs at: http://localhost:8000

### 2. Frontend

```bash
cd C:\Users\Tedoss\Desktop\aura-workspace
npm run dev
```

Frontend runs at: http://localhost:3000

### 3. Open in browser

Navigate to http://localhost:3000/login and sign in with the test credentials.

---

## API Endpoints

Base URL: `http://localhost:8000/api/v1`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/health` | No | Health check |
| POST | `/login` | No | Login with email or employee number |
| POST | `/logout` | Yes | Revoke token |
| GET | `/user` | Yes | Current user profile |
| GET | `/attendance/today` | Yes | Today's attendance status |

---

## GitHub Issues Closed

- `aura-workspace#1` — Initialize Next.js Frontend Project ✅
- `aura-workspace#4` — UI Foundation ✅
- `aura-workspace#5` — Attendance Dashboard ✅
- `aura-core#1` — Database Schema ✅
- `aura-core#2` — API Contract ✅
- `aura-core#3` — Initialize Laravel Backend Project ✅

---

## Next Steps (Phase 2)

Employee Self-Service:

1. Leave request workflow
2. Salary certificate request
3. Remote work request
4. Manager approval notifications
5. Profile page

---

## Important Notes

- The local environment uses **SQLite** for Laravel. Production will target **PostgreSQL** in a Saudi region.
- PHP 8.3 and Composer were installed system-wide on this machine.
- All Tailwind classes use logical properties to future-proof RTL Arabic support.
- The GitHub Project board auto-moves closed issues to the Done column.
- `.env.local` is ignored by Git; `.env.example` is tracked.

---

## Key Files

### Frontend

- `app/globals.css` — Design tokens
- `lib/api.ts` — API client
- `components/auth-provider.tsx` — Auth context
- `components/glass-card.tsx` — Reusable card
- `app/login/page.tsx` — Login page
- `app/dashboard/page.tsx` — Attendance dashboard

### Backend

- `app/Models/Employee.php`
- `app/Models/Department.php`
- `app/Models/AttendanceLog.php`
- `app/Http/Controllers/Api/v1/ApiAuthController.php`
- `app/Http/Controllers/Api/v1/AttendanceController.php`
- `database/seeders/DatabaseSeeder.php`
- `docs/API.md`
- `docs/DATABASE.md`

---

*End of session summary.*
