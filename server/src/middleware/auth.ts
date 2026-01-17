import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }

  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, SECRET as string);
    (req as any).user = payload;
    return next();
  } catch (err: any) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default requireAuth;
