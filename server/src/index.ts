import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToMongo } from "./lib/mongoose";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

(async () => {
  try {
    await connectToMongo();
  } catch (err) {
    console.error("Mongo connection failed - starting without DB");
  }

  try {
    const employeeRoutes = (await import("./routes/employee.routes")).default;
    const leaveRoutes = (await import("./routes/leave.routes")).default;
    const attendanceRoutes = (await import("./routes/attendance.routes")).default;
    const authRoutes = (await import("./routes/auth.routes")).default;

    app.use("/api/employees", employeeRoutes);
    app.use("/api/leaves", leaveRoutes);
    app.use("/api/attendance", attendanceRoutes);
    app.use("/api/auth", authRoutes);
  } catch (err) {
    console.warn("Could not mount routes:", err);
  }

  const server = app.listen(PORT, () => {
    console.log(`Backend server started on http://localhost:${PORT}`);
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Server stopped");
      process.exit(0);
    });
  });
})();
