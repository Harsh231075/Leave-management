import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Briefcase, Calendar, Award, Building } from "lucide-react";
import CardContainer from "@/components/ui/CardContainer";
import { useAuthStore } from "@/store/useAuthStore";
import { useLeaveStore } from "@/store/useLeaveStore";
import { format, parseISO } from "date-fns";
import { useEffect } from "react";

const Profile = () => {
  const { user } = useAuthStore();
  const { myLeaves, fetchMyLeaves } = useLeaveStore();

  useEffect(() => {
    fetchMyLeaves();
  }, [fetchMyLeaves]);

  const leavesUsed = myLeaves
    .filter(l => l.status === "Approved")
    .reduce((acc, curr) => acc + curr.totalDays, 0);

  const totalLeaves = 18; // Assuming 18 leaves per year ? Or from user model if available. Using static or user.leaveBalance + used?
  // Let's assume user.leaveBalance is remaining.
  const remaining = user?.leaveBalance || 0;
  const totalYear = remaining + leavesUsed;

  // Format joining date if exists
  const joiningDate = user?.dateOfJoining
    ? format(parseISO(user.dateOfJoining), "MMM dd, yyyy")
    : "Not available";

  const profileFields = [
    { icon: Mail, label: "Email Address", value: user?.email },
    { icon: Briefcase, label: "Role", value: user?.role },
    { icon: Building, label: "Department", value: user?.department || "N/A" },
    { icon: Calendar, label: "Date of Joining", value: joiningDate },
    { icon: Award, label: "Leave Balance", value: `${remaining} days` },
  ];

  if (!user) return null;

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
          <h2 className="text-2xl font-bold text-foreground">My Profile</h2>
          <p className="text-muted-foreground mt-1">View your profile information</p>
        </div>
      </div>

      <div className="w-full">
        <CardContainer>
          {/* Avatar and Name */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border">
            <div className="h-24 w-24 rounded-2xl gradient-primary flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-foreground">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-foreground">{user.name}</h3>
              <p className="text-muted-foreground mt-1">{user.department} • {user.role}</p>
              <div className="mt-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                  Active Employee
                </span>
              </div>
            </div>
          </div>

          {/* Profile Fields */}
          <div className="pt-6 space-y-4">
            {profileFields.map((field) => (
              <div
                key={field.label}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <field.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{field.label}</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">{field.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Leave Summary */}
          <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <h4 className="text-sm font-semibold text-foreground mb-3">Leave Summary</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{remaining}</p>
                <p className="text-xs text-muted-foreground">Remaining</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{leavesUsed}</p>
                <p className="text-xs text-muted-foreground">Used</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-muted-foreground">{totalYear}</p>
                <p className="text-xs text-muted-foreground">Total/Year</p>
              </div>
            </div>
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default Profile;

