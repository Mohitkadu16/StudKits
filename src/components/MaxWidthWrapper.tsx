// src/components/MaxWidthWrapper.tsx
import { cn } from "@/lib/utils";

export default function MaxWidthWrapper({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("container mx-auto", className)}>
      {children}
    </div>
  );
}
