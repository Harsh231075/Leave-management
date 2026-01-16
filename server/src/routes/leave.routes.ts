import express from "express";
import { createLeaveRequest, listLeaveRequests } from "../controllers/leave.controller";
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
      // ensure employeeId comes from authenticated user when possible
      if (!(req.body as any).employeeId) (req.body as any).employeeId = (req as any).user?.id;
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

router.get("/mine", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    const docs = await listLeaveRequests(userId as string | undefined);
    return res.json(docs);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || err });
  }
});

export default router;
