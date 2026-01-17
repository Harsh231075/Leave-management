import { Request, Response, NextFunction } from "express";

export function requireRole(...allowed: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !user.role) return res.status(403).json({ error: "Missing user role" });
    const userRole = user.role.toLowerCase();
    const allowedLower = allowed.map((r) => r.toLowerCase());
    if (!allowedLower.includes(userRole)) return res.status(403).json({ error: "Forbidden" });
    return next();
  };
}

export default requireRole;
