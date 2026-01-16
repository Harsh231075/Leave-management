import { Users, Clock, CalendarCheck, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "@/components/ui/StatCard";
import DataTable from "@/components/ui/DataTable";
import CardContainer from "@/components/ui/CardContainer";
import StatusBadge from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { dashboardStats, leaveRequests, attendanceRecords, employees } from "@/data/dummyData";

const AdminDashboard = () => {
  const pendingLeaves = leaveRequests.filter(r => r.status === "Pending");
  const todayAttendance = attendanceRecords.filter(r => r.date === "2024-01-15");

  const leaveColumns = [
    { key: "employeeName", header: "Employee" },
    { key: "leaveType", header: "Type" },
    { 
      key: "dateRange", 
      header: "Date Range",
      render: (item: typeof pendingLeaves[0]) => (
        <span className="text-sm">{item.startDate} — {item.endDate}</span>
      )
    },
    { key: "totalDays", header: "Days" },
    { 
      key: "status", 
      header: "Status",
      render: (item: typeof pendingLeaves[0]) => (
        <StatusBadge status={item.status as "Approved" | "Pending" | "Rejected"} />
      )
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex gap-2">
          <Button size="sm" className="h-7 text-xs bg-success hover:bg-success/90 text-success-foreground">
            Approve
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-xs border-destructive text-destructive hover:bg-destructive/10">
            Reject
          </Button>
        </div>
      )
    },
  ];

  const attendanceColumns = [
    { key: "employeeName", header: "Employee" },
    { key: "date", header: "Date" },
    { 
      key: "status", 
      header: "Status",
      render: (item: typeof todayAttendance[0]) => (
        <StatusBadge status={item.status as "Present" | "Absent"} />
      )
    },
  ];

  return (
    <div className="page-container animate-fade-up">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Admin Dashboard</h2>
        <p className="text-muted-foreground mt-1">Manage employees, leaves, and attendance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Employees"
          value={dashboardStats.admin.totalEmployees}
          icon={Users}
          description="Active employees"
        />
        <StatCard
          title="Pending Requests"
          value={dashboardStats.admin.pendingLeaveRequests}
          icon={Clock}
          description="Awaiting your approval"
        />
        <StatCard
          title="Today's Attendance"
          value={`${dashboardStats.admin.todayAttendance}/${employees.length}`}
          icon={CalendarCheck}
          description="Employees present today"
        />
      </div>

      {/* Recent Leave Requests */}
      <CardContainer 
        title="Pending Leave Requests" 
        description="Review and manage leave applications"
        className="mb-8"
        headerAction={
          <Link to="/admin/leave-requests">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        }
      >
        <DataTable columns={leaveColumns} data={pendingLeaves.slice(0, 4)} />
      </CardContainer>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardContainer 
          title="Today's Attendance" 
          description="Employee attendance for today"
          headerAction={
            <Link to="/admin/attendance">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          }
        >
          <DataTable columns={attendanceColumns} data={todayAttendance.slice(0, 5)} />
        </CardContainer>

        {/* Quick Stats */}
        <CardContainer title="Quick Overview" description="Key metrics at a glance">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-sm font-medium text-foreground">Attendance Rate</span>
              </div>
              <span className="text-lg font-bold text-success">
                {Math.round((dashboardStats.admin.todayAttendance / employees.length) * 100)}%
              </span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium text-foreground">Pending Approvals</span>
              </div>
              <span className="text-lg font-bold text-warning">{pendingLeaves.length}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">On Leave Today</span>
              </div>
              <span className="text-lg font-bold text-primary">2</span>
            </div>
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
