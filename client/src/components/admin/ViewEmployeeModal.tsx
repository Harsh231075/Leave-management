import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  employee: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ViewEmployeeModal = ({ employee, open, onOpenChange }: Props) => {
  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {/* trigger is handled by parent */}
        <></>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Employee</DialogTitle>
          <DialogDescription>Details for {employee.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium text-foreground">{employee.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium text-foreground">{employee.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Department</p>
            <p className="font-medium text-foreground">{employee.department}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-medium text-foreground">{employee.role}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Joined</p>
            <p className="font-medium text-foreground">{employee.dateOfJoining}</p>
          </div>
        </div>

        <DialogFooter>
          <div className="w-full flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange && onOpenChange(false)}>Close</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewEmployeeModal;
