import Link from "next/link"

const partners = [
  "ARAMCO",
  "STC",
  "SABIC",
  "MAADEN",
  "NEOM",
  "PIF",
  "ALINMA",
  "RIYAD BANK",
  "ACWA",
  "ROSHN",
]

export function PartnersStrip() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="overflow-hidden border-y border-border bg-muted"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 container-px py-10 md:flex-row md:items-center md:justify-between">
        <div className="shrink-0">
          <p
            id="partners-heading"
            className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-foreground"
          >
            يثق بنا قادة الصناعة
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            أكثر من 350 شركة مؤسسية في 14 قطاعاً
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative flex w-full overflow-hidden mask-horizontal">
          <div className="flex w-max animate-marquee items-center gap-12 py-4">
            {/* Double the array to ensure continuous looping */}
            {[...partners, ...partners].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-base font-bold tracking-[0.15em] text-foreground transition-colors duration-300 hover:text-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
