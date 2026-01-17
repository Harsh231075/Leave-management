import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useToast } from "@/hooks/use-toast";

const departmentOptions = [
  { value: "Engineering", label: "Engineering" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "HR", label: "Human Resources" },
  { value: "Design", label: "Design" },
];

const AddEmployeeModal = () => {
  const [open, setOpen] = useState(false);
  const { addEmployee, isLoading } = useEmployeeStore();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "Employee",
    dateOfJoining: "",
    leaveBalance: 12, // Default
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEmployee({
        ...form,
        leaveBalance: Number(form.leaveBalance)
      });
      toast({
        title: "Success",
        description: "Employee added successfully",
      });
      setOpen(false);
      setForm({
        name: "",
        email: "",
        department: "",
        role: "Employee",
        dateOfJoining: "",
        leaveBalance: 12,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.error || "Failed to add employee",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gradient-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Enter employee details to create a new record.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Full Name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="jane@company.com"
            />
            <div>
              <FormSelect
                label="Department"
                options={departmentOptions}
                required
                value={form.department}
                onChange={(v) => handleSelectChange("department", v)}
              />
            </div>
            <FormInput
              label="Role"
              name="role"
              required
              value={form.role}
              onChange={handleChange}
              placeholder="Software Engineer"
            />
            <FormInput
              label="Join Date"
              name="dateOfJoining"
              type="date"
              value={form.dateOfJoining}
              onChange={handleChange}
            />
            <FormInput
              label="Leave Balance"
              name="leaveBalance"
              type="number"
              value={String(form.leaveBalance)}
              onChange={handleChange}
            />
            <FormInput
              label="Default Password"
              name="defaultPassword"
              type="text"
              value={"Welcome@123"}
              onChange={() => { }}
              readOnly
            />
          </div>

          <DialogFooter>
            <div className="flex w-full justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)} type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeModal;

