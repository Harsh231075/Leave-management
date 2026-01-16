import { Link } from "react-router-dom";
import { Building2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";

const Signup = () => {
  const departmentOptions = [
    { value: "engineering", label: "Engineering" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "hr", label: "Human Resources" },
    { value: "design", label: "Design" },
    { value: "finance", label: "Finance" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="auth-card animate-fade-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-1">Join your company's HR Portal</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <FormInput 
            label="Full Name" 
            type="text" 
            placeholder="John Smith"
            required
          />
          
          <FormInput 
            label="Email Address" 
            type="email" 
            placeholder="john@company.com"
            required
          />
          
          <FormInput 
            label="Password" 
            type="password" 
            placeholder="Create a strong password"
            required
          />

          <FormInput 
            label="Date of Joining" 
            type="date" 
            required
          />
          
          <FormSelect 
            label="Department" 
            options={departmentOptions}
            placeholder="Select your department"
            required
          />

          <div className="pt-2">
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-input mt-1" />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </span>
            </label>
          </div>

          <Button className="w-full h-11 gradient-primary text-primary-foreground font-medium">
            Create Account
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
