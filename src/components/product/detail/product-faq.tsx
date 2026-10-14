import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { ProductDetail } from "@/types/product";

export function ProductFaq({ faq }: { faq: ProductDetail["faq"] }) {
  return (
    <Accordion type="single" collapsible className="max-w-3xl">
      {faq.map((item, i) => (
        <AccordionItem key={item.question} value={`faq-${i}`}>
          <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
