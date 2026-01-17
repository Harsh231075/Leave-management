import EmployeeModel from "../models/Schemas/Employee.model";
import UserModel from "../models/Schemas/User.model";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { EmployeeCreateInput } from "../validation/schemas";

export async function createEmployee(input: EmployeeCreateInput) {
  const role = input.role || "Employee";

  let userId: any = undefined;
  if (role === "Employee") {
    const existingUser = await UserModel.findOne({ email: input.email });
    if (existingUser) {
      userId = (existingUser as any)._id;
    } else {
      const rawPassword = process.env.DEFAULT_EMPLOYEE_PASSWORD || randomBytes(6).toString("hex");
      const hashed = await bcrypt.hash(rawPassword, 10);
      try {
        const userDoc = await UserModel.create({
          name: input.name,
          email: input.email,
          password: hashed,
          role: "Employee",
        } as any);
        userId = (userDoc as any)._id;
      } catch (e) {
        const fallback = await UserModel.findOne({ email: input.email });
        if (!fallback) throw e;
        userId = (fallback as any)._id;
      }
    }
  }

  const payload: any = {
    name: input.name,
    email: input.email,
    role,
    dateOfJoining: input.dateOfJoining || undefined,
    leaveBalance: input.leaveBalance || 0,
    department: input.department || "",
    avatar: input.avatar || null,
  };

  if (typeof userId !== 'undefined' && userId) payload.userId = userId;

  const doc = await EmployeeModel.create(payload);
  return doc.toObject();
}

export async function listEmployees() {
  const docs = await EmployeeModel.find().lean();
  return docs;
}

export async function getEmployeeById(id: string) {
  const doc = await EmployeeModel.findById(id).lean();
  return doc;
}

export async function getEmployeeByEmail(email: string) {
  const doc = await EmployeeModel.findOne({ email }).lean();
  return doc;
}

export async function getEmployeeByUserId(userId: string) {
  const doc = await EmployeeModel.findOne({ userId }).lean();
  return doc;
}

export async function updateEmployee(id: string, input: Partial<EmployeeCreateInput>) {
  const doc = await EmployeeModel.findByIdAndUpdate(id, input, { new: true }).lean();
  return doc;
}

export async function deleteEmployee(id: string) {
  const doc = await EmployeeModel.findByIdAndDelete(id).lean();
  return doc;
}
