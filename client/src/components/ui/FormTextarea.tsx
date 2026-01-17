import { cn } from "@/lib/utils";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const FormTextarea = ({
  label,
  className,
  id,
  ...props
}: FormTextareaProps) => {
  const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={textareaId} className="block text-sm font-medium text-foreground">
        {label}
        {props.required && <span className="text-destructive ml-1">*</span>}
      </label>
      <textarea
        id={textareaId}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground resize-none",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          "disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-60",
          "transition-all duration-200"
        )}
        {...props}
      />
    </div>
  );
};

export default FormTextarea;

