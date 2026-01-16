import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/DataTable";
import StatusBadge from "@/components/ui/StatusBadge";
import CardContainer from "@/components/ui/CardContainer";
import { attendanceRecords } from "@/data/dummyData";

const Attendance = () => {
  const employeeAttendance = attendanceRecords.filter(r => r.employeeId === 1);
  const today = "2024-01-16";

  const columns = [
    { key: "date", header: "Date" },
    { 
      key: "status", 
      header: "Status",
      render: (item: typeof employeeAttendance[0]) => (
        <StatusBadge status={item.status as "Present" | "Absent"} />
      )
    },
  ];

  const presentDays = employeeAttendance.filter(a => a.status === "Present").length;
  const absentDays = employeeAttendance.filter(a => a.status === "Absent").length;

  return (
    <div className="page-container animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          to="/employee"
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Attendance</h2>
          <p className="text-muted-foreground mt-1">Mark and view your attendance</p>
        </div>
      </div>

      {/* Mark Attendance Card */}
      <CardContainer 
        title="Mark Today's Attendance" 
        description={`Date: ${today}`}
        className="mb-8 max-w-2xl"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">Today</p>
              <p className="text-sm text-muted-foreground">Mark your attendance for today</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              size="lg" 
              className="bg-success hover:bg-success/90 text-success-foreground"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Present
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10"
            >
              <XCircle className="h-5 w-5 mr-2" />
              Absent
            </Button>
          </div>
        </div>
      </CardContainer>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-2xl">
        <div className="p-4 rounded-xl bg-success/10 border border-success/20">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-success" />
            <div>
              <p className="text-sm text-success font-medium">Present Days</p>
              <p className="text-2xl font-bold text-success">{presentDays}</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <div className="flex items-center gap-3">
            <XCircle className="h-5 w-5 text-destructive" />
            <div>
              <p className="text-sm text-destructive font-medium">Absent Days</p>
              <p className="text-2xl font-bold text-destructive">{absentDays}</p>
            </div>
          </div>
        </div>
      </div>

      {/* History Table */}
      <CardContainer 
        title="Attendance History" 
        description="Your attendance records"
        className="max-w-2xl"
      >
        <DataTable columns={columns} data={employeeAttendance} />
      </CardContainer>
    </div>
  );
};

export default Attendance;
