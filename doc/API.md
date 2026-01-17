# API Reference

Base URL: `/api`

All protected endpoints require an Authorization header:

- `Authorization: Bearer <token>`

Auth tokens are issued by `POST /api/auth/login` and contain `{ id, email, role }` in the payload.

----

## Auth

### POST /api/auth/register
- Description: Register a new user (Employee or Admin).
- Body (JSON):
  - `name` (string, min 2)
  - `email` (string, email)
  - `password` (string, min 6)
  - `role` (string, optional) — e.g. `Employee` or `Admin`
- Response: 201 Created — returns the created user object (password omitted).
- Errors: 400 — validation or duplicate email.

### POST /api/auth/login
- Description: Log in with email and password.
- Body (JSON):
  - `email` (string)
  - `password` (string)
- Response: 200 OK — `{ token: string, user: { ... } }` (token = JWT).
- Errors: 400 — invalid credentials or validation.

----

## Employees

> Note: Employee management endpoints are Admin-only.

### POST /api/employees
- Auth: required (Admin)
- Body (JSON):
  - `name` (string)
  - `email` (string)
  - `role` (string, optional)
  - `dateOfJoining` (ISO date or string, optional)
  - `leaveBalance` (number, optional)
  - `department` (string, optional)
  - `avatar` (string | null, optional)
- Response: 201 Created — created employee document.

### GET /api/employees
- Auth: required (Admin)
- Response: 200 OK — array of employee documents.

### GET /api/employees/:id
- Auth: required (Admin)
- Response: 200 OK — single employee document, or 404 if not found.

### PUT /api/employees/:id
- Auth: required (Admin)
- Body: same as POST allowed fields — updates employee.
- Response: 200 OK — updated employee, or 404 if not found.

### DELETE /api/employees/:id
- Auth: required (Admin)
- Response: 200 OK — `{ success: true, deleted: <doc> }` or 404.

----

## Leave Requests

### POST /api/leaves
- Auth: required (Employee or Admin)
- Behavior: if `employeeId` is not provided, the server will set it from the authenticated token (`req.user.id`).
- Body (JSON):
  - `employeeId` (string | number) — optional if caller is authenticated
  - `employeeName` (string)
  - `leaveType` (string)
  - `startDate` (ISO date)
  - `endDate` (ISO date)
  - `totalDays` (number)
  - `reason` (string, optional)
  - `status` (string, optional)
- Response: 201 Created — created leave request document.

### GET /api/leaves
- Auth: required (Admin)
- Response: 200 OK — all leave requests.

### GET /api/leaves/mine
- Auth: required
- Response: 200 OK — leave requests filtered to the authenticated user.

### PUT /api/leaves/:id
- Auth: required (Admin)
- Body: fields to update (e.g., `status` to Approve/Reject)
- Response: 200 OK — updated leave request, or 404.

----

## Attendance

### POST /api/attendance
- Auth: required (Employee or Admin)
- Behavior: if `employeeId` is not provided, the server will set it from the authenticated token.
- Body (JSON):
  - `employeeId` (string | number) — optional if caller is authenticated
  - `employeeName` (string)
  - `date` (ISO date)
  - `status` (string) — e.g., `Present`, `Absent`
- Response: 201 Created — created attendance record.

### GET /api/attendance
- Auth: required (Admin)
- Response: 200 OK — all attendance records.

### GET /api/attendance/mine
- Auth: required
- Response: 200 OK — attendance records filtered to the authenticated user.

----

## Middleware & Validation

- Request bodies are validated using Zod schemas found in `src/validation/schemas.ts`:
  - `EmployeeCreateSchema`, `LeaveRequestCreateSchema`, `AttendanceCreateSchema`, `AuthRegisterSchema`, `AuthLoginSchema`.
- Auth middleware: `src/middleware/auth.ts` — expects `Authorization: Bearer <token>` and attaches `req.user` with token payload.
- Role middleware: `src/middleware/roles.ts` — `requireRole("Admin")` or `requireRole("Employee","Admin")` used on routes.

----

## Notes

- All endpoints return JSON and standard HTTP status codes (200, 201, 400, 401, 403, 404, 500).
- `employeeId` fields in `LeaveRequest` and `Attendance` are stored as MongoDB ObjectId references to `Employee`.
- Use the `POST /api/auth/login` response token in `Authorization` header for protected calls.

If you want, I can: add example cURL commands for each endpoint, include sample responses, or generate an OpenAPI spec. Which would you like next?
