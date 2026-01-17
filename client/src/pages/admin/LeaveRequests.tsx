import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Filter, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/DataTable";
import StatusBadge from "@/components/ui/StatusBadge";
import CardContainer from "@/components/ui/CardContainer";
import FormSelect from "@/components/ui/FormSelect";
import { useLeaveStore } from "@/store/useLeaveStore";
import { format, parseISO } from "date-fns";
import { LeaveRequest } from "@/types";
import { useToast } from "@/hooks/use-toast";

const LeaveRequests = () => {
  const { leaves, fetchAllLeaves, updateLeaveStatus, isLoading } = useLeaveStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchAllLeaves();
  }, [fetchAllLeaves]);

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
  ];

  const [selectedStatus, setSelectedStatus] = useState("all");

  const filtered = leaves.filter(l => selectedStatus === "all" ? true : l.status.toLowerCase() === selectedStatus.toLowerCase());

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateLeaveStatus(id, status);
      toast({
        title: "Success",
        description: `Leave request ${status.toLowerCase()}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status",
      });
    }
  };

  const columns = [
    { key: "employeeName", header: "Employee Name" },
    { key: "leaveType", header: "Leave Type" },
    {
      key: "dateRange",
      header: "Date Range",
      render: (item: LeaveRequest) => (
        <span>{format(parseISO(item.startDate as string), 'MMM dd')} — {format(parseISO(item.endDate as string), 'MMM dd, yyyy')}</span>
      )
    },
    { key: "totalDays", header: "Total Days" },
    {
      key: "reason",
      header: "Reason",
      render: (item: LeaveRequest) => (
        <span className="max-w-[200px] truncate block" title={item.reason}>
          {item.reason}
        </span>
      )
    },
    {
      key: "status",
      header: "Status",
      render: (item: LeaveRequest) => (
        <StatusBadge status={item.status as "Approved" | "Pending" | "Rejected"} />
      )
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: LeaveRequest) => (
        item.status === "Pending" ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="h-7 text-xs bg-success hover:bg-success/90 text-success-foreground"
              onClick={() => handleStatusUpdate(item._id, "Approved")}
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs border-destructive text-destructive hover:bg-destructive/10"
              onClick={() => handleStatusUpdate(item._id, "Rejected")}
            >
              Reject
            </Button>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )
      )
    },
  ];

  const pendingCount = filtered.filter(l => l.status === "Pending").length;
  const approvedCount = filtered.filter(l => l.status === "Approved").length;
  const rejectedCount = filtered.filter(l => l.status === "Rejected").length;

  return (
    <div className="page-container animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            to="/admin"
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Leave Requests</h2>
            <p className="text-muted-foreground mt-1">Review and manage all leave applications</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
          <p className="text-sm text-warning font-medium">Pending</p>
          <p className="text-2xl font-bold text-warning mt-1">{pendingCount}</p>
        </div>
        <div className="p-4 rounded-xl bg-success/10 border border-success/20">
          <p className="text-sm text-success font-medium">Approved</p>
          <p className="text-2xl font-bold text-success mt-1">{approvedCount}</p>
        </div>
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive font-medium">Rejected</p>
          <p className="text-2xl font-bold text-destructive mt-1">{rejectedCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="w-full sm:w-48">
          <FormSelect
            label=""
            options={statusOptions}
            placeholder="Filter by status"
            value={selectedStatus}
            onChange={(v) => setSelectedStatus(v)}
          />
        </div>
        <Button variant="outline" className="sm:self-end">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Table */}
      <CardContainer>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <DataTable columns={columns} data={filtered} />
        )}
      </CardContainer>
    </div>
  );
};

export default LeaveRequests;

