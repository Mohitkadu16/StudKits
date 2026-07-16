import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { CheckCircle2 } from "lucide-react";

interface StepItem {
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  title?: string;
  description?: string;
  steps: StepItem[];
}

export function HowItWorksSection({ 
  title = "How It Works", 
  description = "A simple process to get your full-fledged working project.", 
  steps 
}: HowItWorksSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-muted/30 relative overflow-hidden border-t border-border/50">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        
        <div className="relative mx-auto max-w-5xl px-2 sm:px-6">
          {/* Connecting Line */}
          <div className="absolute left-[39px] sm:left-[43px] md:left-1/2 top-4 bottom-4 w-0.5 bg-border md:-translate-x-1/2" />
          
          <div className="space-y-12 md:space-y-0 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-row items-start md:items-center w-full md:min-h-[160px] ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Spacer for desktop */}
                <div className="hidden md:block flex-1"></div>
                
                {/* Step Circle */}
                <div className="flex-shrink-0 mx-4 md:mx-8 relative z-10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-lg shadow-primary/20 transition-transform hover:scale-110 duration-300">
                    <span className="text-primary-foreground font-bold text-lg">{index + 1}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className={`flex-1 text-left ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} py-2 md:py-6 group`}>
                  <div className={`inline-block w-full max-w-md ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
