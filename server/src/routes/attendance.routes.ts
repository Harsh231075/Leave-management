import express from "express";
import { createAttendance, listAttendance } from "../controllers/attendance.controller";
import { AttendanceCreateSchema } from "../validation/schemas";
import validate from "../middleware/validate";
import requireAuth from "../middleware/auth";
import requireRole from "../middleware/roles";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  requireRole("Employee", "Admin"),
  validate(AttendanceCreateSchema),
  async (req, res) => {
    try {
      if (!(req.body as any).employeeId) (req.body as any).employeeId = (req as any).user?.id;
      const doc = await createAttendance(req.body);
      return res.status(201).json(doc);
    } catch (err: any) {
      return res.status(500).json({ error: err.message || err });
    }
  }
);

router.get("/", requireAuth, requireRole("Admin"), async (_req, res) => {
  try {
    const docs = await listAttendance();
    return res.json(docs);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || err });
  }
});

router.get("/mine", requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    const docs = await listAttendance(userId as string | undefined);
    return res.json(docs);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || err });
  }
});

export default router;
