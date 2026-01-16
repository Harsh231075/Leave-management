import { cn } from "@/lib/utils";

interface FormSelectProps {
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
}

const FormSelect = ({ 
  label, 
  options, 
  placeholder = "Select an option",
  value,
  disabled = false,
  required = false,
  className,
  id
}: FormSelectProps) => {
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={selectId} className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <select
        id={selectId}
        defaultValue={value || ""}
        disabled={disabled}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          "disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-60",
          "transition-all duration-200 appearance-none cursor-pointer",
          "bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]",
          "bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]"
        )}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
