import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Search, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddEmployeeModal from "@/components/admin/AddEmployeeModal";
import DataTable from "@/components/ui/DataTable";
import CardContainer from "@/components/ui/CardContainer";
import FormSelect from "@/components/ui/FormSelect";
import EmployeeActions from "@/components/admin/EmployeeActions";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { User } from "@/types";
import { format, parseISO } from "date-fns";

const EmployeeManagement = () => {
  const { employees, fetchEmployees, isLoading } = useEmployeeStore();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const departmentOptions = [
    { value: "all", label: "All Departments" },
    { value: "Engineering", label: "Engineering" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
    { value: "HR", label: "Human Resources" },
    { value: "Design", label: "Design" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");

  const filteredEmployees = employees.filter((e) => {
    const matchesDept = selectedDept === "all" || e.department?.toLowerCase() === selectedDept.toLowerCase();
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch = !q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q);
    return matchesDept && matchesSearch;
  });

  const columns = [
    {
      key: "name",
      header: "Employee",
      render: (item: User) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {item.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-medium text-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        </div>
      )
    },
    { key: "department", header: "Department" },
    { key: "role", header: "Role" },
    {
      key: "dateOfJoining",
      header: "Joined",
      render: (item: User) => item.dateOfJoining ? format(parseISO(item.dateOfJoining), 'MMM dd, yyyy') : '-'
    },
    {
      key: "leaveBalance",
      header: "Leave Balance",
      render: (item: User) => (
        <span className="font-medium text-primary">{item.leaveBalance || 0} days</span>
      )
    },
    {
      key: "actions",
      header: "",
      render: (item: User) => (
        <div className="flex items-center">
          <EmployeeActions employee={item} />
        </div>
      )
    },
  ];

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
            <h2 className="text-2xl font-bold text-foreground">Employee Management</h2>
            <p className="text-muted-foreground mt-1">Manage all employees in your organization</p>
          </div>
        </div>
        <AddEmployeeModal />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-card border border-border">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-bold text-foreground mt-1">{employees.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <p className="text-sm text-muted-foreground">Engineering</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {employees.filter(e => e.department === "Engineering").length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <p className="text-sm text-muted-foreground">Marketing</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {employees.filter(e => e.department === "Marketing").length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <p className="text-sm text-muted-foreground">Other</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {employees.filter(e => !["Engineering", "Marketing"].includes(e.department || "")).length}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="w-full sm:w-48">
          <FormSelect
            label=""
            options={departmentOptions}
            placeholder="Filter by department"
            value={selectedDept}
            onChange={(v) => setSelectedDept(v)}
          />
        </div>
        <Button variant="outline" className="sm:self-end">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Table */}
      <CardContainer>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredEmployees}
          />
        )}
      </CardContainer>
    </div>
  );
};

export default EmployeeManagement;

