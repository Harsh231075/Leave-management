# Leave Management System

A comprehensive full-stack application for managing employee leaves, attendance, and administrative tasks.

## Live Demo / Deployment

- Frontend (live): https://hrms.harshbaghel.me/
- Backend (API): https://apihrms.harshbaghel.me/
- Frontend deployed on Vercel. Backend deployed on DigitalOcean.


## Project Structure

The project is divided into two main parts:

- **Client (`/client`)**: The frontend application built with React, TypeScript, and Vite. It provides the user interface for administrators and employees.
- **Server (`/server`)**: The backend application built with Node.js, Express, and TypeScript. It handles the business logic, database interactions, and API endpoints.

## Documentation

For detailed information about the directory structure of each part, please refer to the `doc` folder:

- [Backend Structure](./doc/backend_structure.md)
- [Frontend Structure](./doc/frontend_structure.md)
- [Ai Use & MyContribution](./doc/contributions_ai.md)
- [Apis](./doc/API.md)


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn or bun

### Setup

1.  **Clone the repository.**

2.  **Install Dependencies:**

    *   **Backend:**
        ```bash
        cd server
        npm install
        ```
    *   **Frontend:**
        ```bash
        cd client
        npm install
        ```

3.  **Environment Setup:**
        *   Create a `.env` file in the `server` directory with the necessary variables (see below) or copy `server/.env.example`.
        *   Create a `.env` file in the `client` directory if required or copy `client/.env.example`.

        Environment variables used by this project (examples):

        - Server (`server/.env` or `server/.env.example`):
            - `PORT` — port the backend listens on (default `5001`).
            - `MONGODB_URI` — MongoDB connection string (e.g., `mongodb://127.0.0.1:27017/leave-management`).
            - `MONGODB_DB` — optional DB name passed to Mongoose.
            - `JWT_SECRET` — secret used to sign JWT tokens (set a strong secret in production).
            - `JWT_EXPIRES` — JWT expiration (e.g., `7d`).

        - Client (`client/.env` or `client/.env.example`):
            - `VITE_API_URL` — base API URL the client calls (e.g., `http://localhost:5001/api`).

4.  **Run the Application:**

    *   **Backend:**
        ```bash
        cd server
        npm run dev
        ```
    *   **Frontend:**
        ```bash
        cd client
        npm run dev
        ```

## Features

- **Admin Dashboard:** Manage employees, view leave statistics, and approve/reject requests.
- **Employee Portal:** Apply for leave, view leave history, and check statistics.
- **Authentication:** Secure login for both admins and employees.
