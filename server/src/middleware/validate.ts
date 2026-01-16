import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: AnyZodObject) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = await schema.parseAsync(req.body);
    return next();
  } catch (err: any) {
    const issues = err?.errors || err?.message || err;
    return res.status(400).json({ error: issues });
  }
};

export default validate;
