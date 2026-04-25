import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { cn } from "@/lib/utils"

type Crumb = { label: string; href?: string }

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: Crumb[]
  actions?: React.ReactNode
  variant?: "navy" | "light"
  className?: string
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  variant = "navy",
  className,
}: PageHeroProps) {
  const isNavy = variant === "navy"
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        isNavy
          ? "bg-background text-foreground"
          : "bg-muted text-foreground",
        className
      )}
    >
      {isNavy && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          />
        </>
      )}
      <div className="relative mx-auto max-w-7xl container-px py-16 md:py-24">
        {breadcrumbs && (
          <nav aria-label="مسار التنقل" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1
                return (
                  <li key={idx} className="flex items-center gap-1.5">
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className={cn(
                          "font-medium",
                          isNavy
                            ? "text-foreground/60 hover:text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          "font-semibold",
                          isNavy
                            ? "text-primary"
                            : "text-primary"
                        )}
                      >
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && (
                      <ChevronLeft
                        className={cn(
                          "h-3.5 w-3.5",
                          isNavy ? "text-foreground/30" : "text-foreground"
                        )}
                      />
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
        )}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1
              className={cn(
                "mt-3 font-display text-4xl font-extrabold leading-tight text-balance md:text-5xl",
                isNavy ? "text-foreground" : "text-foreground"
              )}
            >
              {title}
            </h1>
            {description && (
              <p
                className={cn(
                  "mt-4 max-w-2xl text-base md:text-base",
                  isNavy ? "text-foreground/75" : "text-muted-foreground"
                )}
              >
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
      </div>
    </section>
  )
}
