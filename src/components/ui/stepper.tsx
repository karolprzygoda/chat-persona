import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  steps?: string[];
  currentStep: number;
  className?: string;
}

export default function Stepper({
  steps = [],
  currentStep,
  className,
}: StepperProps) {
  console.log("Stepper props:", { steps, currentStep, className });

  if (!steps || steps.length === 0) {
    console.log("No steps provided");
    return <div>No steps provided</div>;
  }

  return (
    <div className={cn("w-full", className)}>
      <ol className="flex w-full items-center">
        {steps.map((step, index) => (
          <li
            key={index}
            className={cn(
              "flex items-center",
              index < steps.length - 1 ? "w-full" : "",
              index < currentStep ? "text-primary" : "text-muted-foreground",
            )}
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300",
                  index < currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : index === currentStep
                      ? "border-primary"
                      : "border-muted",
                )}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-full transition-colors duration-300",
                  index < currentStep ? "bg-primary" : "bg-muted",
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
