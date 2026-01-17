Backend Directory Structure - Leave Management System
=====================================================

This document explains the structure of the backend (server) directory.

Directory: /server

Core Structure
--------------
src/
├── controllers/    # Contains the logic for handling API requests. Each file typically corresponds to a resource (e.g., auth, leave, employee).
├── models/         # Database models (Schema definitions). Defines the structure of data stored in the database.
├── routes/         # API Route definitions. Maps HTTP routes (GET, POST, etc.) to controller functions.
├── middleware/     # Custom middleware functions (e.g., authentication checks, error handling, request validation).
├── lib/            # Utility libraries and configurations (e.g., database connection setup).
├── validation/     # Validation schemas (e.g., Zod schemas) to validate incoming request data.
└── index.ts        # The entry point of the application. Sets up the express server and connects to the database.

Root Files
----------
.env                # Environment variables (Database URI, Secrets, Port).
package.json        # Project metadata, dependencies, and scripts.
tsconfig.json       # TypeScript configuration settings.

Key Functionalities
-------------------
- Authentication: Secure login/register flow.
- Employee Management: CRUD operations for employee data.
- Leave Management: Logic for applying, approving, and rejecting leaves.
