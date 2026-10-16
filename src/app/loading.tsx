/**
 * App-level loading state, shown while a route segment streams in.
 * One motion only: a star circling the Astra mark. The whole thing waits 200ms before fading in,
 * so fast navigations never flash it, and reduced-motion users get the static mark immediately.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[70vh] flex-1 flex-col items-center justify-center gap-5 motion-safe:animate-[astra-loading-in_300ms_ease-out_200ms_both]"
    >
      <span className="sr-only">Loading</span>

      <div className="relative size-28" aria-hidden="true">
        <div className="absolute inset-0 rounded-full border border-foreground/15" />

        <div className="absolute inset-0 motion-safe:animate-[astra-orbit_2.4s_linear_infinite]">
          <svg
            viewBox="0 0 24 24"
            className="absolute left-1/2 top-0 size-5 -translate-x-1/2 -translate-y-1/2 text-primary drop-shadow-sm"
          >
            <path
              fill="currentColor"
              d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z"
            />
          </svg>
        </div>

        <svg viewBox="0 0 32 32" className="absolute inset-0 m-auto size-14">
          <rect width={32} height={32} rx={7} className="fill-primary" />
          <text
            x="16"
            y="17"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-primary-foreground font-heading text-[26px] font-bold"
          >
            a
          </text>
        </svg>
      </div>

      <span className="font-heading text-xl font-bold tracking-tight">astra</span>
    </div>
  );
}
