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

---

## Database Models

The backend uses MongoDB via Mongoose. Core data models and relationships are summarized below:

- `User` (auth):
  - Fields: `email`, `passwordHash`, `role` (e.g., `Admin` | `Employee`), `createdAt`, `updatedAt`.
  - Purpose: authentication and role-based access. A `User` may be associated with an `Employee` record (for employee accounts).

- `Employee`:
  - Fields: `firstName`, `lastName`, `employeeId` (string or numeric identifier), `email`, `phone`, `department`, `designation`, `managerId` (ObjectId reference to another `Employee`), `joinedAt`, `status`.
  - Purpose: stores HR-specific employee profile data. An `Employee` can have many `LeaveRequest` and `AttendanceRecord` documents.

- `LeaveRequest`:
  - Fields: `employeeId` (ObjectId ref -> `Employee`), `startDate`, `endDate`, `type` (e.g., `Casual`, `Sick`), `status` (e.g., `Pending`, `Approved`, `Rejected`), `reason`, `createdBy` (User/Employee), `approvedBy` (User/Employee), `createdAt`.
  - Purpose: tracks leave applications; references the `Employee` who requested leave and the approver when applicable.

- `AttendanceRecord`:
  - Fields: `employeeId` (ObjectId ref -> `Employee`), `date`, `checkIn`, `checkOut`, `status` (e.g., `Present`, `Absent`, `Half-day`), `notes`.
  - Purpose: per-day attendance entries for reporting and calculation of totals.

Relationships & notes:

- One-to-one / association: a `User` for authentication can be linked to an `Employee` document (useful when employees log in).
- One-to-many: an `Employee` has many `LeaveRequest` and `AttendanceRecord` documents. Implement via `employeeId` ObjectId references.
- Manager relation: `Employee.managerId` is an optional ObjectId referencing another `Employee` to model reporting lines.
- Referential integrity: use Mongoose pre-delete hooks or application-level checks to avoid orphaned records when removing employees (e.g., soft-delete employee and keep historical leave/attendance records).
- Indexing: add indexes on commonly queried fields: `employeeId`, `email`, `startDate`/`date`, and `status` for faster lookups.




