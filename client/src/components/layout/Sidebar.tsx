import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  CalendarCheck, 
  User, 
  LogOut,
  Users,
  ClipboardList,
  X,
  Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  role: "employee" | "admin";
  isOpen?: boolean;
  onClose?: () => void;
}

const employeeLinks = [
  { path: "/employee", label: "Dashboard", icon: LayoutDashboard },
  { path: "/employee/apply-leave", label: "Apply Leave", icon: FileText },
  { path: "/employee/leave-history", label: "Leave History", icon: Clock },
  { path: "/employee/attendance", label: "Attendance", icon: CalendarCheck },
  { path: "/employee/profile", label: "Profile", icon: User },
];

const adminLinks = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/leave-requests", label: "Leave Requests", icon: ClipboardList },
  { path: "/admin/attendance", label: "Attendance Overview", icon: CalendarCheck },
  { path: "/admin/employees", label: "Employees", icon: Users },
];

const Sidebar = ({ role, isOpen = true, onClose }: SidebarProps) => {
  const location = useLocation();
  const links = role === "admin" ? adminLinks : employeeLinks;
  
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50",
          "flex flex-col transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">HR Portal</span>
          </Link>
          <button 
            className="lg:hidden p-1 rounded hover:bg-muted transition-colors"
            onClick={onClose}
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn("sidebar-link", isActive && "active")}
                onClick={onClose}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <Link
            to="/login"
            className="sidebar-link text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
