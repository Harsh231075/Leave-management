import React, { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface Props {
  employee: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EditEmployeeModal = ({ employee, open, onOpenChange }: Props) => {
  const [form, setForm] = useState({ name: "", email: "", department: "", role: "", leaveBalance: 0 });
  const { updateEmployee, isLoading } = useEmployeeStore();
  const { toast } = useToast();

  useEffect(() => {
    if (employee) setForm({
      name: employee.name || "",
      email: employee.email || "",
      department: employee.department || "",
      role: employee.role || "",
      leaveBalance: employee.leaveBalance || 0
    });
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      await updateEmployee(employee._id, {
        ...form,
        leaveBalance: Number(form.leaveBalance)
      });
      toast({ title: "Success", description: "Employee updated successfully" });
      onOpenChange && onOpenChange(false);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.response?.data?.error || "Failed to update" });
    }
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <></>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>Edit details for {employee.name}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput label="Full Name" name="name" required value={form.name} onChange={handleChange} />
            <FormInput label="Email" name="email" required value={form.email} onChange={handleChange} />
            <div>
              <FormSelect
                label="Department"
                options={[
                  { value: 'Engineering', label: 'Engineering' },
                  { value: 'Marketing', label: 'Marketing' },
                  { value: 'Sales', label: 'Sales' },
                  { value: 'HR', label: 'Human Resources' }
                ]}
                value={form.department}
                onChange={(v) => setForm(s => ({ ...s, department: v }))}
              />
            </div>
            <FormInput label="Role" name="role" required value={form.role} onChange={handleChange} />
            <FormInput label="Leave Balance" name="leaveBalance" type="number" value={String(form.leaveBalance)} onChange={handleChange} />
          </div>

          <DialogFooter>
            <div className="flex w-full justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange && onOpenChange(false)} type="button">Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeModal;
