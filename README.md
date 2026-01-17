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

- [Backend Structure](./doc/backend_structure.txt)
- [Frontend Structure](./doc/frontend_structure.txt)
- [Ai Use & MyContribution](./contributions_ai.md)

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
    *   Create a `.env` file in the `server` directory with the necessary variables (PORT, MONGO_URI, etc.).
    *   Create a `.env` file in the `client` directory if required.

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
