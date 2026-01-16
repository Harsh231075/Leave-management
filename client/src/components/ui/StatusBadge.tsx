import { cn } from "@/lib/utils";

type StatusType = "Approved" | "Pending" | "Rejected" | "Present" | "Absent";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  Approved: "bg-success/10 text-success border-success/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Rejected: "bg-destructive/10 text-destructive border-destructive/20",
  Present: "bg-success/10 text-success border-success/20",
  Absent: "bg-destructive/10 text-destructive border-destructive/20",
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
