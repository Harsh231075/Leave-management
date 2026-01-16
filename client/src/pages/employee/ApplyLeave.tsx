import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import FormTextarea from "@/components/ui/FormTextarea";
import CardContainer from "@/components/ui/CardContainer";

const ApplyLeave = () => {
  const leaveTypeOptions = [
    { value: "casual", label: "Casual Leave" },
    { value: "sick", label: "Sick Leave" },
    { value: "paid", label: "Paid Leave" },
  ];

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

      <div className="max-w-2xl">
        <CardContainer>
          <div className="space-y-6">
            {/* Leave Type */}
            <FormSelect
              label="Leave Type"
              options={leaveTypeOptions}
              placeholder="Select leave type"
              required
            />

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Start Date"
                type="date"
                required
              />
              <FormInput
                label="End Date"
                type="date"
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
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Calculated automatically based on your selected dates
              </p>
            </div>

            {/* Reason */}
            <FormTextarea
              label="Reason for Leave"
              placeholder="Please provide a brief description of why you need this leave..."
              rows={4}
              required
            />

            {/* Leave Balance Info */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Your Leave Balance</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You have <span className="font-semibold text-primary">12 days</span> of leave remaining this year
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
              <Link to="/employee" className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full sm:w-auto">
                  Cancel
                </Button>
              </Link>
              <Button className="flex-1 sm:flex-none gradient-primary text-primary-foreground">
                <Send className="h-4 w-4 mr-2" />
                Submit Request
              </Button>
            </div>
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default ApplyLeave;
