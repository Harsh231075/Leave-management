import { Calendar, CheckCircle, Clock, TrendingUp } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import DataTable from "@/components/ui/DataTable";
import CardContainer from "@/components/ui/CardContainer";
import StatusBadge from "@/components/ui/StatusBadge";
import { dashboardStats, leaveRequests, attendanceRecords } from "@/data/dummyData";

const EmployeeDashboard = () => {
  const recentLeaves = leaveRequests.filter(r => r.employeeId === 1).slice(0, 4);
  const recentAttendance = attendanceRecords.filter(r => r.employeeId === 1).slice(0, 5);

  const leaveColumns = [
    { key: "leaveType", header: "Type" },
    { key: "startDate", header: "Start Date" },
    { key: "endDate", header: "End Date" },
    { key: "totalDays", header: "Days" },
    { 
      key: "status", 
      header: "Status",
      render: (item: typeof recentLeaves[0]) => (
        <StatusBadge status={item.status as "Approved" | "Pending" | "Rejected"} />
      )
    },
  ];

  const attendanceColumns = [
    { key: "date", header: "Date" },
    { 
      key: "status", 
      header: "Status",
      render: (item: typeof recentAttendance[0]) => (
        <StatusBadge status={item.status as "Present" | "Absent"} />
      )
    },
  ];

  return (
    <div className="page-container animate-fade-up">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Good morning, John! 👋</h2>
        <p className="text-muted-foreground mt-1">Here's your leave and attendance overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Leave Balance"
          value={dashboardStats.employee.leaveBalance}
          icon={Calendar}
          description="Days remaining this year"
        />
        <StatCard
          title="Approved Leaves"
          value={dashboardStats.employee.approvedLeaves}
          icon={CheckCircle}
          description="Leaves taken this year"
        />
        <StatCard
          title="Pending Requests"
          value={dashboardStats.employee.pendingRequests}
          icon={Clock}
          description="Awaiting approval"
        />
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardContainer title="Recent Leave Requests" description="Your latest leave applications">
          <DataTable columns={leaveColumns} data={recentLeaves} />
        </CardContainer>

        <CardContainer title="Recent Attendance" description="Your attendance this week">
          <DataTable columns={attendanceColumns} data={recentAttendance} />
        </CardContainer>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Need time off?</h3>
              <p className="text-sm text-muted-foreground">Submit a leave request in just a few clicks</p>
            </div>
          </div>
          <a 
            href="/employee/apply-leave"
            className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Apply for Leave
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
