import {
  Clock, CookingPot, Footprints, Gamepad2, Gift, Headphones, Home, Laptop, Monitor,
  Package, Plug, Shirt, Sparkles, Speaker, Truck, Wind, type LucideProps,
} from "lucide-react";
import type { IconKey } from "@/types";

const iconMap = {
  headphones: Headphones, laptop: Laptop, home: Home, shirt: Shirt, gamepad: Gamepad2,
  sparkles: Sparkles, monitor: Monitor, footprints: Footprints, "cooking-pot": CookingPot,
  plug: Plug, wind: Wind, gift: Gift, truck: Truck, package: Package, clock: Clock, speaker: Speaker,
} satisfies Record<IconKey, React.ComponentType<LucideProps>>;

export function AppIcon({ name, ...props }: { name: IconKey } & LucideProps) {
  const Icon = iconMap[name];
  return <Icon {...props} />;
}
