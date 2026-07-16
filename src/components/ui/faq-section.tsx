'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  description?: string;
  faqs: FaqItem[];
}

export function FaqSection({ title = "Frequently Asked Questions", description = "Find answers to common questions about our working projects.", faqs }: FaqSectionProps) {
  return (
    <section className="py-16 bg-background relative">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="mx-auto max-w-3xl px-2 sm:px-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-border/50 rounded-2xl bg-card/40 shadow-sm hover:bg-card/60 transition-colors data-[state=open]:bg-card/80 data-[state=open]:border-primary/20 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-semibold text-base sm:text-lg hover:text-primary transition-colors hover:no-underline [&[data-state=open]]:text-primary py-5 px-6 sm:px-8">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-base pb-6 px-6 sm:px-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
