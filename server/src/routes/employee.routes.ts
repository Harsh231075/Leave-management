import express from "express";
import { createEmployee, listEmployees, getEmployeeById } from "../controllers/employee.controller";
import { EmployeeCreateSchema } from "../validation/schemas";
import validate from "../middleware/validate";
import requireAuth from "../middleware/auth";
import requireRole from "../middleware/roles";

const router = express.Router();

router.post("/", requireAuth, requireRole("Admin"), validate(EmployeeCreateSchema), async (req, res) => {
  try {
    const doc = await createEmployee(req.body);
    return res.status(201).json(doc);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || err });
  }
});

router.get("/", requireAuth, requireRole("Admin"), async (_req, res) => {
  try {
    const docs = await listEmployees();
    return res.json(docs);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || err });
  }
});

router.get("/:id", requireAuth, requireRole("Admin"), async (req, res) => {
  try {
    const doc = await getEmployeeById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    return res.json(doc);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || err });
  }
});

export default router;
