import React, { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";

interface Props {
  employee: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EditEmployeeModal = ({ employee, open, onOpenChange }: Props) => {
  const [form, setForm] = useState({ name: "", email: "", department: "", role: "" });

  useEffect(() => {
    if (employee) setForm({ name: employee.name, email: employee.email, department: employee.department, role: employee.role });
  }, [employee]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log("Edited employee:", form);
    onOpenChange && onOpenChange(false);
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
            <FormInput label="Full Name" required value={form.name} id="edit-name" />
            <FormInput label="Email" required value={form.email} id="edit-email" />
            <div>
              <FormSelect
                label="Department"
                options={[
                  { value: 'Engineering', label: 'Engineering' },
                  { value: 'Marketing', label: 'Marketing' },
                  { value: 'Sales', label: 'Sales' },
                  { value: 'HR', label: 'Human Resources' }
                ]}
                id="edit-dept"
                value={form.department}
                onChange={(v) => setForm(s => ({ ...s, department: v }))}
              />
            </div>
            <FormInput label="Role" required value={form.role} id="edit-role" />
          </div>

          <DialogFooter>
            <div className="flex w-full justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange && onOpenChange(false)} type="button">Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeModal;
