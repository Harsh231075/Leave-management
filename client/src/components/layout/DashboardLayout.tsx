import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  role: "employee" | "admin";
  title?: string;
}

const DashboardLayout = ({ role, title }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar role={role} isOpen={true} />
      <div className="flex-1 flex flex-col lg:ml-0">
        <Navbar title={title} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
