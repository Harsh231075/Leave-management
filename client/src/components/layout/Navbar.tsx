import { Bell, Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  title?: string;
  onMenuClick?: () => void;
}

const Navbar = ({ title = "Dashboard", onMenuClick }: NavbarProps) => {
  return (
    <header className="nav-container shadow-nav">
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5 text-muted-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent text-sm outline-none w-40 placeholder:text-muted-foreground"
          />
        </div>
        
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full" />
        </button>
        
        {/* User Avatar */}
        <Link to="/employee/profile" className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">JS</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground">John Smith</p>
            <p className="text-xs text-muted-foreground">Employee</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
