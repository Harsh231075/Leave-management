import { useState } from "react";
import { Plus } from "lucide-react";
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

const departmentOptions = [
  { value: "Engineering", label: "Engineering" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "HR", label: "Human Resources" },
  { value: "Design", label: "Design" },
];

const AddEmployeeModal = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((s) => ({ ...s, [key]: value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    // TODO: wire up to backend or state management
    console.log("Add employee:", form);
    setOpen(false);
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
              required
              value={form.name}
              id="emp-name"
              placeholder="Jane Doe"
            />
            <FormInput
              label="Email"
              type="email"
              required
              value={form.email}
              id="emp-email"
              placeholder="jane@company.com"
            />
            <div>
              <FormSelect
                label="Department"
                options={departmentOptions}
                required
                id="emp-dept"
                value={form.department}
                onChange={(v) => handleChange("department", v)}
              />
            </div>
            <FormInput
              label="Role"
              required
              id="emp-role"
              placeholder="Software Engineer"
            />
          </div>

          <DialogFooter>
            <div className="flex w-full justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)} type="button">
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeModal;
