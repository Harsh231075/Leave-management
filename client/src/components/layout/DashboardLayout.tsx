import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  role: "employee" | "admin";
  title?: string;
}

const DashboardLayout = ({ role, title }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar role={role} isOpen={true} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
