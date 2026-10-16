export { cn } from "cn"

export function formatPrice(cents: number, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(cents / 100);
}

const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

export function formatDate(dateString: unknown): string {
  if (!dateString || typeof dateString !== "string" && typeof dateString !== "number" && !(dateString instanceof Date)) {
    return "";
  }
  
  const date = new Date(dateString);
  
  // Check if the date is invalid (NaN time)
  if (isNaN(date.getTime())) {
    return ""; // Or return String(dateString) if you want to display the raw value
  }
  
  return fmt.format(date);
}