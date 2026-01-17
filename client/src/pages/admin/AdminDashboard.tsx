import { useEffect } from "react";
import { Users, Clock, CalendarCheck, TrendingUp, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "@/components/ui/StatCard";
import DataTable from "@/components/ui/DataTable";
import CardContainer from "@/components/ui/CardContainer";
import StatusBadge from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useLeaveStore } from "@/store/useLeaveStore";
import { useAttendanceStore } from "@/store/useAttendanceStore";
import { format, parseISO } from "date-fns";
import { LeaveRequest, Attendance } from "@/types";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { employees, fetchEmployees, isLoading: employeesLoading } = useEmployeeStore();
  const { leaves, fetchAllLeaves, updateLeaveStatus, isLoading: leavesLoading } = useLeaveStore();
  const { attendanceRecords, fetchAllAttendance, isLoading: attendanceLoading } = useAttendanceStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchEmployees();
    fetchAllLeaves();
    fetchAllAttendance();
  }, [fetchEmployees, fetchAllLeaves, fetchAllAttendance]);

  const pendingLeaves = leaves.filter(r => r.status === "Pending");
  const today = format(new Date(), "yyyy-MM-dd");
  const todayAttendance = attendanceRecords.filter(r => format(parseISO(r.date), "yyyy-MM-dd") === today);
  const presentToday = todayAttendance.filter(r => r.status === "Present").length;

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

  const leaveColumns = [
    { key: "employeeName", header: "Employee" },
    { key: "leaveType", header: "Type" },
    {
      key: "dateRange",
      header: "Date Range",
      render: (item: LeaveRequest) => (
        <span className="text-sm">{format(parseISO(item.startDate as string), 'MMM dd')} — {format(parseISO(item.endDate as string), 'MMM dd')}</span>
      )
    },
    { key: "totalDays", header: "Days" },
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
      )
    },
  ];

  const attendanceColumns = [
    { key: "employeeName", header: "Employee" },
    {
      key: "date",
      header: "Date",
      render: (item: Attendance) => <span>{format(parseISO(item.date), 'MMM dd')}</span>
    },
    {
      key: "status",
      header: "Status",
      render: (item: Attendance) => (
        <StatusBadge status={item.status as "Present" | "Absent"} />
      )
    },
  ];

  const isLoading = employeesLoading || leavesLoading || attendanceLoading;

  if (isLoading && employees.length === 0) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const attendanceRate = employees.length ? Math.round((presentToday / employees.length) * 100) : 0;
  // Approximation of people on leave today
  const onLeaveToday = leaves.filter(l => {
    if (l.status !== 'Approved') return false;
    const start = parseISO(l.startDate as string);
    const end = parseISO(l.endDate as string);
    const now = new Date();
    return now >= start && now <= end;
  }).length;

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
          value={employees.length}
          icon={Users}
          description="Active employees"
        />
        <StatCard
          title="Pending Requests"
          value={pendingLeaves.length}
          icon={Clock}
          description="Awaiting your approval"
        />
        <StatCard
          title="Today's Attendance"
          value={`${presentToday}/${employees.length}`}
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
                {attendanceRate}%
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
              <span className="text-lg font-bold text-primary">{onLeaveToday}</span>
            </div>
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;

