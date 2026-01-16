import mongoose, { Schema } from "mongoose";
import { LeaveRequest as ILeaveRequest } from "../types/LeaveRequest";

export type LeaveRequestDoc = mongoose.HydratedDocument<Omit<ILeaveRequest, 'id'>>;

const LeaveRequestSchema = new Schema<Omit<ILeaveRequest, 'id'>>(
  {
    employeeId: { type: Number, required: true },
    employeeName: { type: String, required: true },
    leaveType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: Number, required: true },
    reason: { type: String },
    status: { type: String, required: true, default: "Pending" },
  },
  { timestamps: true }
);

const LeaveRequestModel = mongoose.models.LeaveRequest || mongoose.model<LeaveRequestDoc>("LeaveRequest", LeaveRequestSchema as any);

export default LeaveRequestModel;
