# AI & Tools Used — Contribution Statement

## Frontend

- Used **Lovable** as a UI acceleration tool for rapid scaffolding and initial component structure.
- Independently refined layouts, spacing, and interaction flow to ensure a consistent and usable dashboard experience.
- Deployed the frontend on **Vercel** with proper environment configuration and routing.
  **Live:** https://hrms.harshbaghel.me/

## Backend

- Used **ChatGPT** as a development assistant for:
  - API design discussions
  - Validation logic ideas
  - Reference code patterns (used for reference only, not copy-paste)
- Referred to selected **GitHub repositories** only for understanding implementation approaches and best practices.
- Deployed and configured the backend on **DigitalOcean**, including process management and reverse proxy setup.
  **Live API:** https://apihrms.harshbaghel.me/

## My Technical Contributions (Detailed)

### Architecture & System Design

- Designed the **complete client–server architecture**, clearly separating frontend, backend, and API responsibilities.
- Defined **authentication and authorization flow**, including role-based access handling and protected routes.
- Structured backend routing (`/api/*`) independently from static root views for clarity and scalability.

### Frontend Engineering

- Refactored authentication state handling using a centralized store (`useAuthStore`) to improve reliability and maintainability.
- Implemented **route protection logic** (`ProtectedRoute`) to prevent unauthorized access across the application.
- Improved overall **UI/UX consistency** by refining dashboard layouts, navigation behavior, and view-level structure beyond initial scaffolding.

### Backend Engineering

- Organized backend modules into a clean, scalable structure (controllers, routes, middleware, validation).
- Implemented and verified **API route mounting**, request validation, and error handling.
- Added a **root welcome / health page** (`views/root.html`) to clearly indicate backend availability and deployment status.
- Ensured backend stability using process management, environment-based configuration, and production-safe build steps.

### Deployment & DevOps

- Set up **production deployment on DigitalOcean**, including:
  - Environment variable management
  - Process lifecycle handling (PM2 or equivalent)
  - Reverse proxy and HTTPS configuration
- Verified live API routing and ensured frontend–backend integration works reliably in production.

### Documentation & Maintenance

- Updated and structured project **README files** with:
  - Live deployment URLs
  - Setup and usage instructions
- Added supporting notes and references in the `doc` directory for clarity and future maintenance.
- Ensured documentation accurately reflects the real architecture and deployment setup.

# Implementation Time

The total implementation time for the project scope completed during the current development effort.

- Total elapsed implementation time: **12 hours** (approx.).

Recorded: 2026-01-17


## Notes on AI Usage

- AI tools (ChatGPT, Lovable) were used strictly as **assistive tools** for ideation, examples, and productivity.
- All final code, architectural decisions, refactoring, and deployments were **manually reviewed, implemented, and owned** by me.
- Any external references were adapted to fit the project’s specific requirements and standards.
