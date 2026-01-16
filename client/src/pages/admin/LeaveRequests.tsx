import { Link } from "react-router-dom";
import { ArrowLeft, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/DataTable";
import StatusBadge from "@/components/ui/StatusBadge";
import CardContainer from "@/components/ui/CardContainer";
import FormSelect from "@/components/ui/FormSelect";
import { leaveRequests } from "@/data/dummyData";

const LeaveRequests = () => {
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const columns = [
    { key: "employeeName", header: "Employee Name" },
    { key: "leaveType", header: "Leave Type" },
    { 
      key: "dateRange", 
      header: "Date Range",
      render: (item: typeof leaveRequests[0]) => (
        <span>{item.startDate} — {item.endDate}</span>
      )
    },
    { key: "totalDays", header: "Total Days" },
    { 
      key: "reason", 
      header: "Reason",
      render: (item: typeof leaveRequests[0]) => (
        <span className="max-w-[200px] truncate block" title={item.reason}>
          {item.reason}
        </span>
      )
    },
    { 
      key: "status", 
      header: "Status",
      render: (item: typeof leaveRequests[0]) => (
        <StatusBadge status={item.status as "Approved" | "Pending" | "Rejected"} />
      )
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: typeof leaveRequests[0]) => (
        item.status === "Pending" ? (
          <div className="flex gap-2">
            <Button size="sm" className="h-7 text-xs bg-success hover:bg-success/90 text-success-foreground">
              Approve
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs border-destructive text-destructive hover:bg-destructive/10">
              Reject
            </Button>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )
      )
    },
  ];

  const pendingCount = leaveRequests.filter(l => l.status === "Pending").length;
  const approvedCount = leaveRequests.filter(l => l.status === "Approved").length;
  const rejectedCount = leaveRequests.filter(l => l.status === "Rejected").length;

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
          />
        </div>
        <Button variant="outline" className="sm:self-end">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Table */}
      <CardContainer>
        <DataTable columns={columns} data={leaveRequests} />
      </CardContainer>
    </div>
  );
};

export default LeaveRequests;
