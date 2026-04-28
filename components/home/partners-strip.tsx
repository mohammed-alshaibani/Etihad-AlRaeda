"use client"

import { motion } from "framer-motion"

const defaultPartners = [
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

export function PartnersStrip({ data }: { data?: any[] }) {
  const partners = data && data.length > 0 ? data.map(b => b.name) : defaultPartners;

  // Triplicate the array for a seamless loop
  const marqueePartners = [...partners, ...partners, ...partners];

  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="relative overflow-hidden border-y border-border bg-muted/30 py-12"
    >
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 container-px md:flex-row md:items-center">
        <div className="shrink-0 z-10 bg-muted/5 pr-8 backdrop-blur-sm">
          <p
            id="partners-heading"
            className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary"
          >
            يثق بنا قادة الصناعة
          </p>
          <p className="mt-2 text-sm font-medium text-muted-foreground">
            أكثر من 350 شركة مؤسسية في 14 قطاعاً
          </p>
        </div>

        {/* Premium Infinite Marquee */}
        <div className="relative flex-1 overflow-hidden">
          {/* Gradient masks for smooth fading */}
          <div className="absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-muted/30 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-muted/30 to-transparent pointer-events-none" />

          <motion.div
            className="flex items-center gap-16 whitespace-nowrap"
            animate={{
              x: ["0%", "-33.333%"]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
            style={{
              display: "flex",
              flexDirection: "row-reverse" // RTL flow
            }}
          >
            {marqueePartners.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-xl font-black tracking-widest text-foreground/40 transition-colors duration-500 hover:text-primary"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
