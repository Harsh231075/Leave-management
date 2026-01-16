import mongoose, { Schema } from "mongoose";
import { Employee as IEmployee } from "../types/Employee";

export type EmployeeDoc = mongoose.HydratedDocument<Omit<IEmployee, 'id'>>;

const EmployeeSchema = new Schema<Omit<IEmployee, 'id'>>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, required: true, default: "Employee" },
    dateOfJoining: { type: Date },
    leaveBalance: { type: Number, default: 0 },
    department: { type: String, default: "" },
    avatar: { type: String, default: null },
  },
  { timestamps: true }
);

const EmployeeModel = mongoose.models.Employee || mongoose.model<EmployeeDoc>("Employee", EmployeeSchema as any);

export default EmployeeModel;
