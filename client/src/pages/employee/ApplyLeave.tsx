import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, FileText, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import FormTextarea from "@/components/ui/FormTextarea";
import CardContainer from "@/components/ui/CardContainer";
import { useLeaveStore } from "@/store/useLeaveStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/hooks/use-toast";
import { differenceInBusinessDays, parseISO } from "date-fns";

const ApplyLeave = () => {
  const navigate = useNavigate();
  const { requestLeave, isLoading } = useLeaveStore();
  const { user } = useAuthStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [totalDays, setTotalDays] = useState(0);

  const leaveTypeOptions = [
    { value: "Casual Leave", label: "Casual Leave" },
    { value: "Sick Leave", label: "Sick Leave" },
    { value: "Paid Leave", label: "Paid Leave" },
  ];

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = parseISO(formData.startDate);
      const end = parseISO(formData.endDate);
      if (start <= end) {

        const diff = differenceInBusinessDays(end, start) + 1;
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setTotalDays(diffDays);
      } else {
        setTotalDays(0);
      }
    }
  }, [formData.startDate, formData.endDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (!formData.startDate || !formData.endDate) return;
      const start = parseISO(formData.startDate);
      const end = parseISO(formData.endDate);
      if (end < start || totalDays <= 0) {
        toast({
          variant: "destructive",
          title: "Invalid dates",
          description: "End date must be on or after start date.",
        });
        return;
      }
      await requestLeave({
        ...formData,
        employeeId: user._id,
        employeeName: user.name,
        totalDays,
      });
      toast({
        title: "Leave Requested",
        description: "Your leave request has been submitted successfully.",
      });
      navigate("/employee");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: error.response?.data?.error || "Could not submit leave request",
      });
    }
  };

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
          <h2 className="text-2xl font-bold text-foreground">Apply for Leave</h2>
          <p className="text-muted-foreground mt-1">Submit a new leave request</p>
        </div>
      </div>

      <div className="w-full">
        <CardContainer>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Leave Type */}
            <FormSelect
              label="Leave Type"
              options={leaveTypeOptions}
              placeholder="Select leave type"
              value={formData.leaveType}
              onChange={(val) => handleSelectChange("leaveType", val)}
              required
            />

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
              <FormInput
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Total Days - Read Only */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Total Days</span>
                </div>
                <span className="text-2xl font-bold text-primary">{totalDays}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Calculated automatically based on your selected dates
              </p>
            </div>

            {/* Reason */}
            <FormTextarea
              label="Reason for Leave"
              name="reason"
              placeholder="Please provide a brief description of why you need this leave..."
              rows={4}
              value={formData.reason}
              onChange={handleChange}
              required
            />

            {/* Leave Balance Info */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Your Leave Balance</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You have <span className="font-semibold text-primary">{user?.leaveBalance || 0} days</span> of leave remaining this year
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
              <Link to="/employee" className="flex-1 sm:flex-none">
                <Button variant="outline" type="button" className="w-full sm:w-auto">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="flex-1 sm:flex-none gradient-primary text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                Submit Request
              </Button>
            </div>
          </form>
        </CardContainer>
      </div>
    </div>
  );
};

export default ApplyLeave;

