# Frontend Structure — `client/`

This document explains the layout and conventions used in the frontend app and includes quick run/build/test instructions and screenshot guidance for the README.

## High-level layout

- `client/` — Vite + React + TypeScript application using Tailwind CSS.
  - `src/` — application source
    - `pages/` — route pages (landing, auth, admin, employee)
    - `components/` — shared, composable UI components and grouped subfolders (e.g. `layout/`, `admin/`, `ui/`)
    - `hooks/` — reusable React hooks (e.g. `use-mobile.tsx`, `use-toast.ts`)
    - `lib/` — small helpers and utilities (API helpers, formatting, date utils)
    - `data/` — client-side mock or seed data (optional; may be removed for production)
    - `styles/` or `index.css` — Tailwind tokens and global CSS
    - `main.tsx` — app entry, React root, routing mount
    - `App.tsx` — top-level layout and route definitions
  - `public/` — static assets served at root
  - `package.json` — scripts + dependencies
  - `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js` — builder and tooling config

## Key conventions

- Pages: keep pages thin; most UI should live in `components/` and `components/layout/`.
- Components: split into small primitives under `components/ui/` (FormInput, Button, Modal) and higher-level compound components under `components/` (DataTable, CardContainer).
- Services/API: centralize all HTTP calls in `src/services/` (e.g., `authService.ts`, `employeeService.ts`). This keeps controllers/hooks free of fetch logic.
- State: use lightweight stores (e.g., Zustand) for auth and cross-cutting state (`useAuthStore`, `useEmployeeStore`). Keep component-local state in React where appropriate.
- Validation: keep form validation in the consuming component (Zod schemas can be shared from `server/src/validation` if you want strict parity).

## Styling & Theme

- Tailwind tokens are defined in `src/index.css` and `tailwind.config.ts`.
- Global theme primitives (colors, spacing, fonts) should be declared once and used via utility classes or small wrapper components (e.g., `StatCard`, `StatusBadge`).
- Avoid embedding long styles in components; prefer Tailwind utilities and small component classes.

## Testing & Linting

- Tests: run unit tests with `vitest`. Example script in `package.json`:

```bash
cd client
npm run test
```

- Lint: use `eslint` configured in `eslint.config.js`.
- Format: use `prettier` (if configured) before committing.

## Run / Build / Deploy

Development:

```bash
cd client
npm install
npm run dev
```

Production build:

```bash
cd client
npm run build
# serve from the `dist/` folder using your static host or include in fullstack deployment
```

