import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const navigate = useNavigate();
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
          "fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-50",
          "flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo (centered image, occupies 25% of sidebar height) */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">
              {role === "admin" ? "HR Dashboard" : "Employee Dashboard"}
            </span>
          </Link>
          <button
            className="lg:hidden p-1 rounded hover:bg-muted transition-colors"
            onClick={onClose}
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-2">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn("sidebar-link py-3", isActive && "active")}
                  onClick={onClose}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <Dialog>
            <DialogTrigger asChild>
              <button className="sidebar-link text-destructive hover:bg-destructive/10 hover:text-destructive w-full text-left">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogDescription>Are you sure you want to logout?</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <div className="flex w-full justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button className="text-destructive" onClick={() => { navigate('/login'); }}>Logout</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
