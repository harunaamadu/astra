"use client";

import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Pause, Play } from "lucide-react";
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi,
} from "@/components/ui/carousel";
import { HeroSlide } from "./hero-slide";
import { cn } from "@/lib/utils";
import type { HeroSlide as HeroSlideType } from "@/types";

export function HeroCarousel({ slides }: { slides: HeroSlideType[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);
  const autoplay = useRef(Autoplay({ delay: 6500, stopOnInteraction: true, stopOnMouseEnter: true }));

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    // Respect reduced motion: never auto-advance.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoplay.current.stop();
      setPlaying(false);
    }
    const onStop = () => setPlaying(false);
    api.on("autoplay:stop", onStop);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
      api.off("autoplay:stop", onStop);
    };
  }, [api]);

  function togglePlay() {
    if (playing) {
      autoplay.current.stop();
      setPlaying(false);
    } else {
      autoplay.current.play();
      setPlaying(true);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pt-4" aria-label="Featured offers">
      <Carousel setApi={setApi} opts={{ loop: true }} plugins={[autoplay.current]} aria-label="Featured offers">
        <CarouselContent className="-ml-0">
          {slides.map((slide, i) => (
            <CarouselItem key={slide.id} className="pl-0" aria-label={`${i + 1} of ${slides.length}`}>
              <HeroSlide slide={slide} active={i === selected} priority={i === 0} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3 hidden bg-background/90 md:inline-flex" />
        <CarouselNext className="right-3 hidden bg-background/90 md:inline-flex" />

        <div className="absolute bottom-5 left-6 z-10 flex items-center gap-3 rounded-full bg-background/90 px-3 py-2 text-foreground shadow-sm backdrop-blur md:left-12">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause automatic slide changes" : "Resume automatic slide changes"}
            className="grid size-5 place-items-center rounded-full"
          >
            {playing ? <Pause className="size-3.5" aria-hidden /> : <Play className="size-3.5" aria-hidden />}
          </button>
          <div className="flex items-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === selected}
                className={cn("h-1.5 rounded-full bg-foreground transition-all", i === selected ? "w-7" : "w-3 opacity-30 hover:opacity-60")}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </section>
  );
}
