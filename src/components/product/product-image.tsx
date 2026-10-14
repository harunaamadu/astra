import Image from "next/image";
import { AppIcon } from "@/lib/constants/icons";
import { cn } from "@/lib/utils";
import type { IconKey } from "@/types";

type Props = {
  src?: string;
  alt: string;
  icon?: IconKey;
  className?: string;
  iconClassName?: string;
  sizes?: string;
  priority?: boolean;
};

/** Shows the product photo, or an icon placeholder until real images are uploaded. */
export function ProductImage({ src, alt, icon = "sparkles", className, iconClassName, sizes, priority }: Props) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes ?? "(min-width: 1024px) 20vw, 50vw"} priority={priority} className="object-contain p-4" />
      ) : (
        <div role="img" aria-label={alt} className="grid size-full place-items-center text-muted-foreground/50">
          <AppIcon name={icon} className={cn("size-14", iconClassName)} strokeWidth={1.25} aria-hidden />
        </div>
      )}
    </div>
  );
}
