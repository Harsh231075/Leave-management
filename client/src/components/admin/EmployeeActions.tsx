import { useState } from "react";
import { MoreHorizontal, Eye, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ViewEmployeeModal from "./ViewEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useToast } from "@/hooks/use-toast";

interface Props {
  employee: any;
}

const EmployeeActions = ({ employee }: Props) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const { removeEmployee } = useEmployeeStore();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await removeEmployee(employee._id);
      toast({ title: "Deleted", description: "Employee deleted successfully" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.response?.data?.error || "Failed to delete" });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setViewOpen(true)}>
            <Eye className="h-4 w-4 mr-2" /> View
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>
            <Edit className="h-4 w-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setDelOpen(true)} className="text-destructive">
            <Trash className="h-4 w-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewEmployeeModal employee={employee} open={viewOpen} onOpenChange={setViewOpen} />
      <EditEmployeeModal employee={employee} open={editOpen} onOpenChange={setEditOpen} />
      <ConfirmDeleteModal employee={employee} open={delOpen} onOpenChange={setDelOpen} onConfirm={handleDelete} />
    </>
  );
};

export default EmployeeActions;
