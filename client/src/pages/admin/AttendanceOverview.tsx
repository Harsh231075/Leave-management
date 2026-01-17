import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Filter, Download, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/DataTable";
import StatusBadge from "@/components/ui/StatusBadge";
import CardContainer from "@/components/ui/CardContainer";
import FormSelect from "@/components/ui/FormSelect";
import { useAttendanceStore } from "@/store/useAttendanceStore";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { format, parseISO } from "date-fns";
import { Attendance } from "@/types";

const AttendanceOverview = () => {
  const { attendanceRecords, fetchAllAttendance, isLoading } = useAttendanceStore();
  const { employees, fetchEmployees } = useEmployeeStore();

  useEffect(() => {
    fetchAllAttendance();
    fetchEmployees();
  }, [fetchAllAttendance, fetchEmployees]);

  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredRecords, setFilteredRecords] = useState<Attendance[]>([]);

  // Initial load
  useEffect(() => {
    if (!isLoading) {
      setFilteredRecords(attendanceRecords);
    }
  }, [attendanceRecords, isLoading]);

  const employeeOptions = [
    { value: "all", label: "All Employees" },
    ...employees.map(e => ({ value: e._id, label: e.name }))
  ];

  const columns = [
    { key: "employeeName", header: "Employee Name" },
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

  const computeStats = (records: Attendance[]) => {
    const presentCount = records.filter(a => a.status === "Present").length;
    const absentCount = records.filter(a => a.status === "Absent").length;
    const attendanceRate = records.length ? Math.round((presentCount / records.length) * 100) : 0;
    return { presentCount, absentCount, attendanceRate };
  };

  const handleApplyFilters = () => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const filtered = attendanceRecords.filter(r => {
      if (selectedEmployee !== "all" && r.employeeId !== selectedEmployee) return false;
      const d = new Date(r.date);
      if (start && d < start) return false;
      if (end && d > end) return false;
      return true;
    });
    setFilteredRecords(filtered);
  };

  const { presentCount, absentCount, attendanceRate } = computeStats(filteredRecords);

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
            value={selectedEmployee}
            onChange={(v) => setSelectedEmployee(v)}
          />
          <div>
            <label className="block text-sm font-medium text-foreground">Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground" />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button size="sm" className="gradient-primary text-primary-foreground" onClick={handleApplyFilters}>
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
            <span>Showing records</span>
          </div>
        }
      >
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <DataTable columns={columns} data={filteredRecords} />
        )}
      </CardContainer>
    </div>
  );
};

export default AttendanceOverview;

