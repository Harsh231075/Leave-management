import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/DataTable";
import StatusBadge from "@/components/ui/StatusBadge";
import CardContainer from "@/components/ui/CardContainer";
import FormSelect from "@/components/ui/FormSelect";
import { useLeaveStore } from "@/store/useLeaveStore";
import { format, parseISO } from "date-fns";
import { LeaveRequest } from "@/types";

const LeaveHistory = () => {
  const { myLeaves, fetchMyLeaves, isLoading } = useLeaveStore();

  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchMyLeaves();
  }, [fetchMyLeaves]);

  const filteredLeaves = myLeaves.filter(l => statusFilter === "all" ? true : l.status === statusFilter);

  const columns = [
    { key: "leaveType", header: "Leave Type" },
    {
      key: "dateRange",
      header: "Date Range",
      render: (item: LeaveRequest) => (
        <span>{format(parseISO(item.startDate as string), 'MMM dd, yyyy')} — {format(parseISO(item.endDate as string), 'MMM dd, yyyy')}</span>
      )
    },
    { key: "totalDays", header: "Total Days" },
    { key: "reason", header: "Reason" },
    {
      key: "status",
      header: "Status",
      render: (item: LeaveRequest) => (
        <StatusBadge status={item.status as "Approved" | "Pending" | "Rejected"} />
      )
    },
  ];

  return (
    <div className="page-container animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            to="/employee"
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Leave History</h2>
            <p className="text-muted-foreground mt-1">View all your leave requests</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(s => !s)}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Link to="/employee/apply-leave">
            <Button size="sm" className="gradient-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-success/10 border border-success/20">
          <p className="text-sm text-success font-medium">Approved</p>
          <p className="text-2xl font-bold text-success mt-1">
            {myLeaves.filter(l => l.status === "Approved").length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
          <p className="text-sm text-warning font-medium">Pending</p>
          <p className="text-2xl font-bold text-warning mt-1">
            {myLeaves.filter(l => l.status === "Pending").length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive font-medium">Rejected</p>
          <p className="text-2xl font-bold text-destructive mt-1">
            {myLeaves.filter(l => l.status === "Rejected").length}
          </p>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="p-4 rounded-xl bg-card border border-border mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormSelect
              label="Status"
              options={[{ value: 'all', label: 'All' }, { value: 'Approved', label: 'Approved' }, { value: 'Pending', label: 'Pending' }, { value: 'Rejected', label: 'Rejected' }]}
              value={statusFilter}
              onChange={(v) => setStatusFilter(v)}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <CardContainer title="All Leave Requests" description="Complete history of your leave applications">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <DataTable columns={columns} data={filteredLeaves} />
        )}
      </CardContainer>
    </div>
  );
};

export default LeaveHistory;

