import LeaveRequestModel from "../models/Schemas/LeaveRequest.model";
import { LeaveRequestCreateInput } from "../validation/schemas";

export async function createLeaveRequest(input: LeaveRequestCreateInput) {
  const start = new Date(input.startDate as any);
  const end = new Date(input.endDate as any);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid startDate or endDate");
  }
  if (end < start) {
    throw new Error("endDate must be on or after startDate");
  }

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

export async function updateLeaveRequest(id: string, updates: Partial<LeaveRequestCreateInput>) {
  const doc = await LeaveRequestModel.findByIdAndUpdate(id, updates, { new: true }).lean();
  return doc;
}

export async function listLeaveRequestsByEmployeeIds(ids: Array<string>) {
  const valid = (ids || []).filter(Boolean);
  if (valid.length === 0) return [] as any[];
  return await LeaveRequestModel.find({ employeeId: { $in: valid } }).lean();
}
