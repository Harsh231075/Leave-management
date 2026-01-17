import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormInput = ({
  label,
  className,
  id,
  ...props
}: FormInputProps) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
        {label}
        {props.required && <span className="text-destructive ml-1">*</span>}
      </label>
      <input
        id={inputId}
        aria-required={props.required}
        className={cn(
          "w-full px-4 py-3 rounded-xl border bg-card text-foreground text-sm",
          "border-border placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary",
          "disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-60",
          "transition-all duration-200"
        )}
        {...props}
      />
    </div>
  );
};

export default FormInput;

