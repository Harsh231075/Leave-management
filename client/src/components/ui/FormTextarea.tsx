import { cn } from "@/lib/utils";

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  className?: string;
  id?: string;
}

const FormTextarea = ({ 
  label, 
  placeholder, 
  value,
  disabled = false,
  required = false,
  rows = 4,
  className,
  id
}: FormTextareaProps) => {
  const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={textareaId} className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <textarea
        id={textareaId}
        placeholder={placeholder}
        defaultValue={value}
        disabled={disabled}
        rows={rows}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground resize-none",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          "disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-60",
          "transition-all duration-200"
        )}
      />
    </div>
  );
};

export default FormTextarea;
