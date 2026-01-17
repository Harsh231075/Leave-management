# Leave Management — Backend (minimal setup)

This folder contains a minimal TypeScript Express server scaffold.

What's included
- `package.json` — dev/start scripts
- `tsconfig.json` — TypeScript config
- `src/index.ts` — minimal server (no routes/models)

Quick start

1. Install dependencies

```bash
cd server
npm install
```

2. Run in development mode

```bash
npm run dev
```

This starts the server on `PORT` (default `4000`).

Notes
- Per request, this is a basic server skeleton without routes or data models. Add routes under `src/` when ready.

## Live Demo / Deployment

- Frontend (live): https://hrms.harshbaghel.me/
- Backend (API): https://apihrms.harshbaghel.me/
- Frontend deployed on Vercel. Backend deployed on DigitalOcean.
