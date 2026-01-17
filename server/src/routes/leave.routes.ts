import express from "express";
import { createLeaveRequest, listLeaveRequests, listLeaveRequestsByEmployeeIds, updateLeaveRequest } from "../controllers/leave.controller";
import { getEmployeeByUserId } from "../controllers/employee.controller";
import { LeaveRequestCreateSchema } from "../validation/schemas";
import validate from "../middleware/validate";
import requireAuth from "../middleware/auth";
import requireRole from "../middleware/roles";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  requireRole("Employee", "Admin"),
  validate(LeaveRequestCreateSchema),
  async (req, res) => {
    try {
      const user = (req as any).user || {};
      const role = (user.role || "").toLowerCase();
      if (role === "employee") {
        const emp = await getEmployeeByUserId(user.id);
        const empDoc = Array.isArray(emp) ? (emp[0] as any) : (emp as any);
        (req.body as any).employeeId = empDoc?._id?.toString?.() || user.id;
      } else {
        if (!(req.body as any).employeeId) {
          const emp = await getEmployeeByUserId(user.id);
          const empDoc = Array.isArray(emp) ? (emp[0] as any) : (emp as any);
          (req.body as any).employeeId = empDoc?._id?.toString?.() || user.id;
        }
      }
      const doc = await createLeaveRequest(req.body);
      return res.status(201).json(doc);
    } catch (err: any) {
      return res.status(500).json({ error: err.message || err });
    }
  }
);

router.get("/", requireAuth, requireRole("Admin"), async (_req, res) => {
  try {
    const docs = await listLeaveRequests();
    return res.json(docs);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || err });
  }
});

router.put("/:id", requireAuth, requireRole("Admin"), async (req, res) => {
  try {
    const doc = await updateLeaveRequest(req.params.id, req.body);
    if (!doc) return res.status(404).json({ error: "Not found" });
    return res.json(doc);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || err });
  }
});

router.get("/mine", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    const emp = await getEmployeeByUserId(userId);
    const employeeDocId = (emp as any)?._id?.toString?.();
    const ids = [employeeDocId, userId].filter(Boolean) as string[];
    const docs = ids.length > 1
      ? await listLeaveRequestsByEmployeeIds(ids)
      : await listLeaveRequests(ids[0]);
    return res.json(docs);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || err });
  }
});

export default router;
