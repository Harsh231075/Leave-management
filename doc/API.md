# API Reference

Base URL: `/api`

All protected endpoints require the header `Authorization: Bearer <token>`.

Auth tokens are issued by `POST /api/auth/login` and include `{ id, email, role }` in the payload.

----

## Endpoints (tabular)

### Auth

| Method | Path | Auth | Body | Success Response |
| --- | --- | --- | --- | --- |
| POST | /auth/register | No | `name`, `email`, `password`, `role?` | 201 Created — created user (password omitted) |
| POST | /auth/login | No | `email`, `password` | 200 OK — `{ token, user }` |

### Employees (Admin only)

| Method | Path | Auth | Body | Success Response |
| --- | --- | --- | --- | --- |
| POST | /employees | Admin | `name`, `email`, `role?`, `dateOfJoining?`, `leaveBalance?`, `department?`, `avatar?` | 201 Created — employee doc |
| GET | /employees | Admin | — | 200 OK — [employee] |
| GET | /employees/:id | Admin | — | 200 OK — employee |
| PUT | /employees/:id | Admin | partial employee fields | 200 OK — updated employee |
| DELETE | /employees/:id | Admin | — | 200 OK — `{ success: true, deleted: <doc> }` |

### Leave Requests

| Method | Path | Auth | Body | Success Response |
| --- | --- | --- | --- | --- |
| POST | /leaves | Employee, Admin | `employeeId?`, `employeeName`, `leaveType`, `startDate`, `endDate`, `totalDays`, `reason?`, `status?` | 201 Created — leave request |
| GET | /leaves | Admin | — | 200 OK — [leave requests] |
| GET | /leaves/mine | Authenticated | — | 200 OK — [user's leave requests] |
| PUT | /leaves/:id | Admin | partial leave fields (e.g., `status`) | 200 OK — updated leave request |

### Attendance

| Method | Path | Auth | Body | Success Response |
| --- | --- | --- | --- | --- |
| POST | /attendance | Employee, Admin | `employeeId?`, `employeeName`, `date`, `status` | 201 Created — attendance record |
| GET | /attendance | Admin | — | 200 OK — [attendance records] |
| GET | /attendance/mine | Authenticated | — | 200 OK — [user's attendance] |

----

## Validation & Middleware

- Request bodies validated via Zod schemas in `src/validation/schemas.ts`.
- Auth middleware: `src/middleware/auth.ts` — parses JWT from `Authorization` and sets `req.user`.
- Role middleware: `src/middleware/roles.ts` — `requireRole("Admin")` or `requireRole("Employee","Admin")` for route protection.

----

## Notes

- All responses are JSON. Common status codes: `200`, `201`, `400`, `401`, `403`, `404`, `500`.
- `employeeId` in `LeaveRequest` and `Attendance` is stored as an ObjectId referencing `Employee`.
- Use the JWT from `/auth/login` in the `Authorization` header for protected endpoints.

If you want example cURL commands or an OpenAPI spec, tell me which endpoints you'd like examples for.
- Auth: required (Admin)

