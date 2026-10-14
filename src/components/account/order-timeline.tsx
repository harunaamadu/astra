import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/order";

const steps = [
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
] as const;

export function OrderTimeline({ status }: { status: OrderStatus }) {
  if (status === "cancelled") return <p className="text-sm text-muted-foreground">This order was cancelled.</p>;
  const current = steps.findIndex((s) => s.id === status);

  return (
    <ol className="flex items-center" aria-label="Order progress">
      {steps.map((s, i) => {
        const done = i <= current;
        return (
          <li key={s.id} aria-current={i === current ? "step" : undefined} className={cn("flex items-center", i < steps.length - 1 && "flex-1")}>
            <span className="flex flex-col items-center gap-1.5">
              <span className={cn("grid size-8 place-items-center rounded-full border text-xs", done ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground")}>
                {done ? <Check className="size-4" aria-hidden /> : i + 1}
              </span>
              <span className={cn("text-xs", done ? "font-medium" : "text-muted-foreground")}>{s.label}</span>
            </span>
            {i < steps.length - 1 && <span aria-hidden className={cn("mx-2 mb-5 h-0.5 flex-1", i < current ? "bg-primary" : "bg-border")} />}
          </li>
        );
      })}
    </ol>
  );
}