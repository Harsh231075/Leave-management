import UserModel from "../models/Schemas/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthRegisterInput, AuthLoginInput } from "../validation/schemas";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";

export async function registerUser(input: AuthRegisterInput) {
  const existing = await UserModel.findOne({ email: input.email }).lean();
  if (existing) throw new Error("Email already registered");

  const hashed = await bcrypt.hash(input.password, 10);
  const doc = await UserModel.create({
    name: input.name,
    email: input.email,
    password: hashed,
    role: input.role || "Employee",
  } as any);

  const user = doc.toObject();
  delete (user as any).password;
  return user;
}

export async function loginUser(input: AuthLoginInput) {
  const user = await UserModel.findOne({ email: input.email }).lean();
  if (!user) throw new Error("Invalid credentials");

  const userDoc = await UserModel.findOne({ email: input.email });
  if (!userDoc) throw new Error("Invalid credentials");

  const ok = await bcrypt.compare(input.password, (userDoc as any).password);
  if (!ok) throw new Error("Invalid credentials");

  const payload = { id: (userDoc as any)._id.toString(), email: (userDoc as any).email, role: (userDoc as any).role };
  const token = jwt.sign(payload as any, JWT_SECRET as any, { expiresIn: JWT_EXPIRES } as any);

  const outUser = { ...user } as any;
  delete outUser.password;

  return { token, user: outUser };
}

export default { registerUser, loginUser };
