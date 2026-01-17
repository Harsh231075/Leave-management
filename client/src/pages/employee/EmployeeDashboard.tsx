import { useEffect } from "react";
import { Calendar, CheckCircle, Clock, TrendingUp, Loader2 } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import DataTable from "@/components/ui/DataTable";
import CardContainer from "@/components/ui/CardContainer";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAuthStore } from "@/store/useAuthStore";
import { useLeaveStore } from "@/store/useLeaveStore";
import { useAttendanceStore } from "@/store/useAttendanceStore";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { LeaveRequest, Attendance } from "@/types";

const EmployeeDashboard = () => {
  const { user } = useAuthStore();
  const { myLeaves, fetchMyLeaves, isLoading: leavesLoading } = useLeaveStore();
  const { myAttendance, fetchMyAttendance, isLoading: attendanceLoading } = useAttendanceStore();

  useEffect(() => {
    fetchMyLeaves();
    fetchMyAttendance();
  }, [fetchMyLeaves, fetchMyAttendance]);

  const recentLeaves = myLeaves.slice(0, 4);
  const recentAttendance = myAttendance.slice(0, 5);

  const approvedLeavesCount = myLeaves
    .filter(l => l.status === "Approved")
    .reduce((acc, curr) => acc + curr.totalDays, 0);

  const pendingRequestsCount = myLeaves.filter(l => l.status === "Pending").length;

  const leaveColumns = [
    { key: "leaveType", header: "Type" },
    {
      key: "startDate",
      header: "Start Date",
      render: (item: LeaveRequest) => <span>{format(parseISO(item.startDate as string), 'MMM dd')}</span>
    },
    {
      key: "endDate",
      header: "End Date",
      render: (item: LeaveRequest) => <span>{format(parseISO(item.endDate as string), 'MMM dd')}</span>
    },
    { key: "totalDays", header: "Days" },
    {
      key: "status",
      header: "Status",
      render: (item: LeaveRequest) => (
        <StatusBadge status={item.status as "Approved" | "Pending" | "Rejected"} />
      )
    },
  ];

  const attendanceColumns = [
    {
      key: "date",
      header: "Date",
      render: (item: Attendance) => <span>{format(parseISO(item.date), 'MMM dd, yyyy')}</span>
    },
    {
      key: "status",
      header: "Status",
      render: (item: Attendance) => (
        <StatusBadge status={item.status as "Present" | "Absent"} />
      )
    },
  ];

  const isLoading = leavesLoading || attendanceLoading;

  if (isLoading && myLeaves.length === 0 && myAttendance.length === 0) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-up">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Good morning, {user?.name?.split(' ')[0] || 'Employee'}! 👋</h2>
        <p className="text-muted-foreground mt-1">Here's your leave and attendance overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Leave Balance"
          value={user?.leaveBalance || 0}
          icon={Calendar}
          description="Days remaining this year"
        />
        <StatCard
          title="Approved Leaves"
          value={approvedLeavesCount}
          icon={CheckCircle}
          description="Days taken this year"
        />
        <StatCard
          title="Pending Requests"
          value={pendingRequestsCount}
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
          <Link
            to="/employee/apply-leave"
            className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Apply for Leave
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

