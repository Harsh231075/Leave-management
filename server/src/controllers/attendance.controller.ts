import AttendanceModel from "../models/Schemas/Attendance.model";
import { AttendanceCreateInput } from "../validation/schemas";

export async function createAttendance(input: AttendanceCreateInput) {
  const payload = {
    employeeId: input.employeeId,
    employeeName: input.employeeName,
    date: input.date,
    status: input.status,
  } as any;

  const doc = await AttendanceModel.create(payload);
  return doc.toObject();
}

export async function listAttendance(employeeId?: string) {
  if (employeeId) return await AttendanceModel.find({ employeeId }).lean();
  return await AttendanceModel.find().lean();
}
