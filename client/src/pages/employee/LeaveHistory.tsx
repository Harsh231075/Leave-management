import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/DataTable";
import StatusBadge from "@/components/ui/StatusBadge";
import CardContainer from "@/components/ui/CardContainer";
import { leaveRequests } from "@/data/dummyData";

const LeaveHistory = () => {
  const employeeLeaves = leaveRequests.filter(r => r.employeeId === 1);

  const columns = [
    { key: "leaveType", header: "Leave Type" },
    { 
      key: "dateRange", 
      header: "Date Range",
      render: (item: typeof employeeLeaves[0]) => (
        <span>{item.startDate} — {item.endDate}</span>
      )
    },
    { key: "totalDays", header: "Total Days" },
    { key: "reason", header: "Reason" },
    { 
      key: "status", 
      header: "Status",
      render: (item: typeof employeeLeaves[0]) => (
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
          <Button variant="outline" size="sm">
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
            {employeeLeaves.filter(l => l.status === "Approved").length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
          <p className="text-sm text-warning font-medium">Pending</p>
          <p className="text-2xl font-bold text-warning mt-1">
            {employeeLeaves.filter(l => l.status === "Pending").length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive font-medium">Rejected</p>
          <p className="text-2xl font-bold text-destructive mt-1">
            {employeeLeaves.filter(l => l.status === "Rejected").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <CardContainer title="All Leave Requests" description="Complete history of your leave applications">
        <DataTable columns={columns} data={employeeLeaves} />
      </CardContainer>
    </div>
  );
};

export default LeaveHistory;
