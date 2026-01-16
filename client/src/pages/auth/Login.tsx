import { Link } from "react-router-dom";
import { Building2, Mail, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";

const Login = () => {
  const roleOptions = [
    { value: "employee", label: "Employee" },
    { value: "admin", label: "Admin" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="auth-card animate-fade-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-1">Sign in to your HR Portal account</p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div className="relative">
            <FormInput 
              label="Email Address" 
              type="email" 
              placeholder="john@company.com"
              required
            />
            <Mail className="absolute right-3 top-[38px] h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="relative">
            <FormInput 
              label="Password" 
              type="password" 
              placeholder="••••••••"
              required
            />
            <Lock className="absolute right-3 top-[38px] h-5 w-5 text-muted-foreground" />
          </div>
          
          <FormSelect 
            label="Login as" 
            options={roleOptions}
            placeholder="Select your role"
            required
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-input" />
              <span className="text-muted-foreground">Remember me</span>
            </label>
            <a href="#" className="text-primary hover:underline">Forgot password?</a>
          </div>

          <Button className="w-full h-11 gradient-primary text-primary-foreground font-medium">
            Sign In
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Demo Links */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center mb-3">Quick Demo Access</p>
          <div className="flex gap-2">
            <Link to="/employee" className="flex-1">
              <Button variant="outline" className="w-full text-sm h-9">
                Employee Portal
              </Button>
            </Link>
            <Link to="/admin" className="flex-1">
              <Button variant="outline" className="w-full text-sm h-9">
                Admin Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
