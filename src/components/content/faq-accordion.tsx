import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FaqAccordion({ faq }: { faq: { question: string; answer: string }[] }) {
  return (
    <Accordion type="single" collapsible className="max-w-3xl">
      {faq.map((f, i) => (
        <AccordionItem key={f.question} value={`faq-${i}`}>
          <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
