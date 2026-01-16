import express from "express";
import { validate } from "../middleware/validate";
import { AuthRegisterSchema, AuthLoginSchema } from "../validation/schemas";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", validate(AuthRegisterSchema), async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json(user);
  } catch (err: any) {
    return res.status(400).json({ error: err.message || err });
  }
});

router.post("/login", validate(AuthLoginSchema), async (req, res) => {
  try {
    const out = await loginUser(req.body);
    return res.json(out);
  } catch (err: any) {
    return res.status(400).json({ error: err.message || err });
  }
});

export default router;
