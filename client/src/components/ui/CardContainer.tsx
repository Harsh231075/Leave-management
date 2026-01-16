import { cn } from "@/lib/utils";

interface CardContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  headerAction?: React.ReactNode;
}

const CardContainer = ({ 
  children, 
  title, 
  description, 
  className,
  headerAction 
}: CardContainerProps) => {
  return (
    <div className={cn("bg-card rounded-xl border border-border overflow-hidden", className)}>
      {(title || headerAction) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
          </div>
          {headerAction}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default CardContainer;
