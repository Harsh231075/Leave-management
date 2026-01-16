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
  onChange?: (value: string) => void;
}

const FormSelect = ({
  label,
  options,
  placeholder = "Select an option",
  value,
  disabled = false,
  required = false,
  onChange,
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
        value={value || ""}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={cn(
          "w-full px-4 py-2.5 pr-10 rounded-lg border border-input bg-background text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          "disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-60",
          "transition-all duration-200 appearance-none -webkit-appearance-none -moz-appearance-none cursor-pointer",
          "bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>')]",
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
