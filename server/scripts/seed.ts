import dotenv from "dotenv";
dotenv.config();

import { connectToMongo } from "../src/lib/mongoose";
import mongoose from "../src/lib/mongoose";
import bcrypt from "bcryptjs";

import UserModel from "../src/models/Schemas/User.model";
import EmployeeModel from "../src/models/Schemas/Employee.model";
import LeaveRequestModel from "../src/models/Schemas/LeaveRequest.model";
import AttendanceModel from "../src/models/Schemas/Attendance.model";

async function seed() {
  await connectToMongo();

  console.log("Clearing existing collections...");
  await Promise.all([
    UserModel.deleteMany({}),
    EmployeeModel.deleteMany({}),
    LeaveRequestModel.deleteMany({}),
    AttendanceModel.deleteMany({}),
  ]);

  const names = [
    "Aarav Sharma",
    "Vivaan Singh",
    "Vihaan Patel",
    "Arjun Kumar",
    "Aryan Gupta",
    "Ishaan Reddy",
    "Kabir Mehta",
    "Rohan Khan",
    "Siddharth Joshi",
    "Kunal Iyer",
  ];

  const departments = ["Engineering", "HR", "Sales", "Finance", "Support"];

  const users: Array<any> = [];
  const employees: Array<any> = [];

  // create 10 employees
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const email = `${name.split(" ").join(".").toLowerCase()}@example.com`;
    const passwordRaw = process.env.JWT_SECRET || "password123";
    const passwordHash = await bcrypt.hash(passwordRaw, 10);

    const userDoc = await UserModel.create({
      name,
      email,
      password: passwordHash,
      role: "Employee",
    } as any);

    users.push(userDoc.toObject());

    const emp = await EmployeeModel.create({
      name,
      email,
      role: "Employee",
      dateOfJoining: new Date(Date.now() - (1000 * 60 * 60 * 24 * 30 * (i + 1))),
      leaveBalance: 12 - (i % 5),
      department: departments[i % departments.length],
      avatar: null,
    } as any);

    employees.push(emp.toObject());
  }

  // create 1 HR user (Admin)
  const hrName = "Priya Reddy";
  const hrEmail = "priya.reddy@example.com";
  const hrPasswordRaw = process.env.JWT_SECRET || "hrpassword";
  const hrHash = await bcrypt.hash(hrPasswordRaw, 10);
  const hrUser = await UserModel.create({ name: hrName, email: hrEmail, password: hrHash, role: "Admin" } as any);
  const hrEmp = await EmployeeModel.create({
    name: hrName,
    email: hrEmail,
    role: "Admin",
    dateOfJoining: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365),
    leaveBalance: 30,
    department: "HR",
    avatar: null,
  } as any);

  users.push(hrUser.toObject());
  employees.push(hrEmp.toObject());

  console.log("Creating sample leave requests and attendance...");

  // For each employee, create 1 leave request and 3 attendance records
  for (let i = 0; i < employees.length; i++) {
    const empId = (employees[i] as any)._id; // use ObjectId from created employee
    const empName = employees[i].name;

    // leave request (some pending, some approved)
    const start = new Date();
    const end = new Date(Date.now() + 1000 * 60 * 60 * 24 * (2 + (i % 3)));
    await LeaveRequestModel.create({
      employeeId: empId,
      employeeName: empName,
      leaveType: i % 2 === 0 ? "Casual" : "Sick",
      startDate: start,
      endDate: end,
      totalDays: Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1,
      reason: "Routine leave",
      status: i % 3 === 0 ? "Approved" : "Pending",
    } as any);

    // 3 attendance entries (yesterday, two days ago, three days ago)
    for (let d = 1; d <= 3; d++) {
      const date = new Date(Date.now() - 1000 * 60 * 60 * 24 * d);
      const status = d === 2 && i % 5 === 0 ? "Absent" : "Present";
      await AttendanceModel.create({
        employeeId: empId,
        employeeName: empName,
        date,
        status,
      } as any);
    }
  }

  console.log("Seed complete.");
  console.log(`Users created: ${users.length + 0} (10 employees + 1 admin)`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
