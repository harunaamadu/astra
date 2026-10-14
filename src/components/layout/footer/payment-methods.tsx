import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { paymentMethods } from "@/lib/constants/footer";
import { cn } from "cn";

export function PaymentMethods() {
  return (
    <ul aria-label="Accepted payment methods" className="flex flex-wrap gap-2">
      {paymentMethods.map((m) => (
        <li
          key={m.label}
          className={cn(
            "rounded-md border bg-background px-2 py-0.75 text-xs text-muted-foreground",
            m.regionalAvailability === false && "opacity-50 cursor-not-allowed",
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <img src={m.imgSrc} alt={m.label} className="h-6 aspect-video object-contain" />
            </TooltipTrigger>
            <TooltipContent>
              {m.regionalAvailability === false ? (
                <p>Not Available in your region</p>
              ) : (
                <p>{m.label}</p>
              )}
            </TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}
