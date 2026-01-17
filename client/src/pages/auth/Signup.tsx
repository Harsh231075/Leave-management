import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfJoining: "",
    department: "",
    role: "Employee", // Default role
  });

  const departmentOptions = [
    { value: "Engineering", label: "Engineering" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
    { value: "HR", label: "Human Resources" },
    { value: "Design", label: "Design" },
    { value: "Finance", label: "Finance" },
  ];

  const roleOptions = [
    { value: "Employee", label: "Employee" },
    { value: "Admin", label: "Admin (HR)" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      toast({
        title: "Account created!",
        description: "Welcome to the portal.",
      });
      // After registration redirect user to login
      navigate("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.response?.data?.error || "Could not create account",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="auth-card animate-fade-up my-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-1">Join your company's HR Portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Full Name"
            name="name"
            type="text"
            placeholder="John Smith"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="john@company.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Date of Joining"
            name="dateOfJoining"
            type="date"
            value={formData.dateOfJoining}
            onChange={handleChange}
          // required - backend might strict it, but schema says optional? checked schema: dateOfJoining is optional
          />

          <FormSelect
            label="Department"
            options={departmentOptions}
            placeholder="Select your department"
            value={formData.department}
            onChange={(val) => handleSelectChange("department", val)}
            required
          />

          <FormSelect
            label="Role"
            options={roleOptions}
            placeholder="Select your role"
            value={formData.role}
            onChange={(val) => handleSelectChange("role", val)}
            required
          />

          <div className="pt-2">
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" required className="rounded border-input mt-1" />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </span>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-11 gradient-primary text-primary-foreground font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Create Account
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </form>

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

