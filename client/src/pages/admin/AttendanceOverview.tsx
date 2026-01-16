import { Link } from "react-router-dom";
import { ArrowLeft, Filter, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/DataTable";
import StatusBadge from "@/components/ui/StatusBadge";
import CardContainer from "@/components/ui/CardContainer";
import FormSelect from "@/components/ui/FormSelect";
import FormInput from "@/components/ui/FormInput";
import { attendanceRecords, employees } from "@/data/dummyData";

const AttendanceOverview = () => {
  const employeeOptions = [
    { value: "all", label: "All Employees" },
    ...employees.map(e => ({ value: e.id.toString(), label: e.name }))
  ];

  const columns = [
    { key: "employeeName", header: "Employee Name" },
    { key: "date", header: "Date" },
    { 
      key: "status", 
      header: "Status",
      render: (item: typeof attendanceRecords[0]) => (
        <StatusBadge status={item.status as "Present" | "Absent"} />
      )
    },
  ];

  const presentCount = attendanceRecords.filter(a => a.status === "Present").length;
  const absentCount = attendanceRecords.filter(a => a.status === "Absent").length;
  const attendanceRate = Math.round((presentCount / attendanceRecords.length) * 100);

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
            <h2 className="text-2xl font-bold text-foreground">Attendance Overview</h2>
            <p className="text-muted-foreground mt-1">Monitor employee attendance records</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-success/10 border border-success/20">
          <p className="text-sm text-success font-medium">Present</p>
          <p className="text-2xl font-bold text-success mt-1">{presentCount}</p>
        </div>
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive font-medium">Absent</p>
          <p className="text-2xl font-bold text-destructive mt-1">{absentCount}</p>
        </div>
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
          <p className="text-sm text-primary font-medium">Attendance Rate</p>
          <p className="text-2xl font-bold text-primary mt-1">{attendanceRate}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-xl bg-card border border-border mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filters</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormSelect
            label="Employee"
            options={employeeOptions}
            placeholder="Select employee"
          />
          <FormInput
            label="Start Date"
            type="date"
          />
          <FormInput
            label="End Date"
            type="date"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button size="sm" className="gradient-primary text-primary-foreground">
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <CardContainer 
        title="Attendance Records"
        headerAction={
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Showing all records</span>
          </div>
        }
      >
        <DataTable columns={columns} data={attendanceRecords} />
      </CardContainer>
    </div>
  );
};

export default AttendanceOverview;
