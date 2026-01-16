import EmployeeModel from "../models/Schemas/Employee.model";
import { EmployeeCreateInput } from "../validation/schemas";

export async function createEmployee(input: EmployeeCreateInput) {
  const payload = {
    name: input.name,
    email: input.email,
    role: input.role || "Employee",
    dateOfJoining: input.dateOfJoining || undefined,
    leaveBalance: input.leaveBalance || 0,
    department: input.department || "",
    avatar: input.avatar || null,
  } as any;

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
