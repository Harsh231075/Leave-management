import mongoose from "mongoose";
import { User as IUser } from "../types/User";

export type UserDoc = mongoose.HydratedDocument<Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>>;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: "Employee" },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model<UserDoc>("User", UserSchema as any);

export default UserModel;
