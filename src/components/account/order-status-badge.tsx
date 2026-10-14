import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/types/order";

const labels: Record<OrderStatus, string> = {
  processing: "Processing", shipped: "Shipped", delivered: "Delivered", cancelled: "Cancelled",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge variant={status === "delivered" ? "default" : status === "cancelled" ? "outline" : "secondary"}>
      {labels[status]}
    </Badge>
  );
}