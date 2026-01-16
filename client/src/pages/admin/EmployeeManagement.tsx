import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddEmployeeModal from "@/components/admin/AddEmployeeModal";
import DataTable from "@/components/ui/DataTable";
import CardContainer from "@/components/ui/CardContainer";
import FormSelect from "@/components/ui/FormSelect";
import { employees } from "@/data/dummyData";
import EmployeeActions from "@/components/admin/EmployeeActions";

const EmployeeManagement = () => {
  const departmentOptions = [
    { value: "all", label: "All Departments" },
    { value: "engineering", label: "Engineering" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "hr", label: "Human Resources" },
    { value: "design", label: "Design" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");

  const columns = [
    {
      key: "name",
      header: "Employee",
      render: (item: typeof employees[0]) => (
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
    { key: "dateOfJoining", header: "Joined" },
    {
      key: "leaveBalance",
      header: "Leave Balance",
      render: (item: typeof employees[0]) => (
        <span className="font-medium text-primary">{item.leaveBalance} days</span>
      )
    },
    {
      key: "actions",
      header: "",
      render: (item: typeof employees[0]) => (
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
            {employees.filter(e => !["Engineering", "Marketing"].includes(e.department)).length}
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
        <DataTable
          columns={columns}
          data={employees.filter((e) => {
            const matchesDept = selectedDept === "all" || e.department.toLowerCase() === selectedDept.toLowerCase();
            const q = searchTerm.trim().toLowerCase();
            const matchesSearch = !q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q);
            return matchesDept && matchesSearch;
          })}
        />
      </CardContainer>
    </div>
  );
};

export default EmployeeManagement;
