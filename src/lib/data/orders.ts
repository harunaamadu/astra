import type { Order } from "@/types/order";

/**
 * IN-MEMORY DEMO STORE. Orders vanish on server restart and are not shared between serverless
 * instances. Step 6 replaces this file with Prisma (Order, OrderItem, Address tables).
 */
const g = globalThis as unknown as { __astraOrders?: Map<string, Order> };
const store = (g.__astraOrders ??= new Map<string, Order>());

const sampleAddress = {
  fullName: "Haruna Amadu", phone: "+233 24 858 4525", line1: "123 Accra Street",
  city: "Springfield", region: "IL", postalCode: "00233", country: "GH",
};

const samples: Order[] = [
  {
    id: "AST-4F8A21C9", userId: "demo-user", createdAt: "2026-09-28T14:12:00Z", status: "delivered",
    email: "harunaamadu@gmail.com", address: sampleAddress, shippingMethod: "standard", paymentMethod: "card",
    items: [{ productId: "p-jbl750", variantId: "black", variantLabel: "Black", vendorId: "astra", slug: "jbl-tune-750btnc", title: "JBL Tune 750BTNC Wireless Over-Ear Headphones with Noise Cancellation", image: "", icon: "headphones", price: 12500, quantity: 1 }],
    totals: { subtotal: 12500, discount: 0, shipping: 0, total: 12500 },
  },
  {
    id: "AST-9B2D70E3", userId: "demo-user", createdAt: "2026-10-09T09:40:00Z", status: "shipped",
    email: "harunaamadu@gmail.com", address: sampleAddress, shippingMethod: "express", paymentMethod: "paypal",
    items: [
      { productId: "p-instantpot", vendorId: "astra", slug: "instant-pot-duo-7-in-1", title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker", image: "", icon: "cooking-pot", price: 7900, quantity: 1 },
      { productId: "p-cable", vendorId: "astra", slug: "astra-essentials-lightning-usb", title: "Astra Essentials Lightning to USB Cable", image: "", icon: "plug", price: 599, quantity: 2 },
    ],
    totals: { subtotal: 9098, discount: 0, shipping: 1200, total: 10298 },
  },
];

export async function createOrder(input: Omit<Order, "id" | "createdAt" | "status">): Promise<Order> {
  const id = `AST-${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;
  const order: Order = { ...input, id, createdAt: new Date().toISOString(), status: "processing" };
  store.set(id, order);
  return order;
}

export async function getOrder(id: string): Promise<Order | null> {
  return store.get(id) ?? samples.find((o) => o.id === id) ?? null;
}

export async function getOrdersForUser(userId: string): Promise<Order[]> {
  return [...samples, ...store.values()]
    .filter((o) => o.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}