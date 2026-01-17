import mongoose, { Schema } from "mongoose";
import { AttendanceRecord as IAttendance } from "../types/AttendanceRecord";

export type AttendanceDoc = mongoose.HydratedDocument<Omit<IAttendance, 'id'>>;

const AttendanceSchema = new Schema<Omit<IAttendance, 'id'>>(
  {
    employeeId: { type: Schema.Types.ObjectId as any, ref: 'Employee', required: true },
    employeeName: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const AttendanceModel = mongoose.models.Attendance || mongoose.model<AttendanceDoc>("Attendance", AttendanceSchema as any);

export default AttendanceModel;
