import { cn } from "@/lib/utils";

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
}

const FormInput = ({ 
  label, 
  type = "text", 
  placeholder, 
  value,
  disabled = false,
  required = false,
  className,
  id
}: FormInputProps) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        disabled={disabled}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          "disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-60",
          "transition-all duration-200"
        )}
      />
    </div>
  );
};

export default FormInput;
