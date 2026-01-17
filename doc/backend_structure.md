# Project Structure — Frontend & Backend

This document describes the high-level folder layout for the frontend (`client/`) and backend (`server/`) and how to add screenshots for the repository README.

---

## Frontend (client)

Top-level files & folders:

- `client/` — React + TypeScript app (Vite + Tailwind)
  - `src/` — application source
    - `pages/` — route pages (landing, auth, admin, employee)
    - `components/` — shared UI components and layout
    - `services/` — API wrappers (authService, employeeService, leaveService, attendanceService)
    - `store/` — zustand stores (`useAuthStore`, `useEmployeeStore`, `useLeaveStore`, `useAttendanceStore`)
    - `data/` — small seed/dummy client-side data (may be removed)
    - `App.tsx`, `main.tsx` — app entry and routing
  - `package.json`, `vite.config.ts`, `tailwind.config.ts` — build tooling and config

How to run (development):

```bash
cd client
npm install
npm run dev
```

Notes:
- Theme and UI tokens live in `src/index.css` and `tailwind.config.ts`.
- Screenshots used in README should be stored under `doc/assets/screenshots/client/`.

---

## Backend (server)

Top-level files & folders:

- `server/` — Node + TypeScript + Express API
  - `src/` — server source
    - `routes/` — route modules (`auth.routes.ts`, `employee.routes.ts`, `leave.routes.ts`, `attendance.routes.ts`)
    - `controllers/` — controller logic for endpoints
    - `models/` — Mongoose schemas & types
    - `validation/` — Zod schemas for request validation
    - `middleware/` — `auth.ts` (JWT), `roles.ts` (RBAC), `validate.ts` (Zod middleware)
    - `lib/` — helpers (Mongo connection)
    - `scripts/` — utility script(s) such as `seed.ts` to populate DB with demo data
  - `.env` — environment (MONGODB_URI, PORT, JWT_SECRET)
  - `package.json`, `tsconfig.json` — build tooling and config

How to run (development):

```bash
cd server
npm install
npm run dev
```

Notes:
- Routes are mounted under `/api` (e.g. `/api/auth/login`).
- Auth uses JWT stored in `Authorization: Bearer <token>`.
- The project includes `scripts/seed.ts` to populate demo users/employees/leaves/attendance.
- Screenshots used in README should be stored under `doc/assets/screenshots/server/`.

---

## Adding screenshots for README / GitHub

1. Create the asset folders:

```bash
mkdir -p doc/assets/screenshots/client
mkdir -p doc/assets/screenshots/server
```

2. Take screenshots (PNG preferred) and save them in the appropriate folder with short filenames, e.g.:

- `doc/assets/screenshots/client/landing.png`
- `doc/assets/screenshots/client/admin-dashboard.png`
- `doc/assets/screenshots/server/api-docs.png`

3. Reference images in `README.md` using relative links:

```markdown
![Landing](/doc/assets/screenshots/client/landing.png)
```

4. Commit the screenshot files to the repository (keep sizes reasonable — compress if needed).

---

