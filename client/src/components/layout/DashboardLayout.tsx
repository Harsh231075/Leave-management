import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  role: "employee" | "admin";
  title?: string;
}

const DashboardLayout = ({ role, title }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({ title: "Signed out", description: "You have been signed out. Please login to continue." });
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate, toast]);
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
