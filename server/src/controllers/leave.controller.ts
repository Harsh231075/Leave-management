import LeaveRequestModel from "../models/Schemas/LeaveRequest.model";
import { LeaveRequestCreateInput } from "../validation/schemas";

export async function createLeaveRequest(input: LeaveRequestCreateInput) {
  const payload = {
    employeeId: input.employeeId,
    employeeName: input.employeeName,
    leaveType: input.leaveType,
    startDate: input.startDate,
    endDate: input.endDate,
    totalDays: input.totalDays,
    reason: input.reason || "",
    status: input.status || "Pending",
  } as any;

  const doc = await LeaveRequestModel.create(payload);
  return doc.toObject();
}

export async function listLeaveRequests(employeeId?: string) {
  if (employeeId) return await LeaveRequestModel.find({ employeeId }).lean();
  return await LeaveRequestModel.find().lean();
}
