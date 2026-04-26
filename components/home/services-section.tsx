"use client"

import Link from "next/link"
import { Building2, ArrowLeft, Layers } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ServicesSection({ data, services }: { data?: any; services?: any[] }) {
  // Use homepage global data if available, fallback to default text
  const eyebrow = data?.eyebrow || "خدماتنا"
  const title = data?.title || "منظومة حلول متكاملة لكل مرحلة في رحلة أعمالك"
  const description = data?.description || ""

  const displayServices = services && services.length > 0 ? services : [
    {
      slug: "placeholder",
      title: "اسم الخدمة",
      description: "وصف الخدمة...",
      tags: [],
    }
  ]

  return (
    <section id="services" className="bg-background py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl container-px">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-balance text-foreground md:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-xl">
                {description}
              </p>
            )}
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-foreground hover:bg-muted"
          >
            <Link href="/services">
              عرض جميع الخدمات
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {displayServices.map((service: any, idx: number) => {
            // Dynamic icons would typically come from an image or an icon mapping, using a fallback Building2 here
            const Icon = idx % 2 === 0 ? Building2 : Layers;
            return (
              <div key={service.slug || idx} className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col rounded-3xl border border-border bg-background p-10 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-premium-xl md:p-12"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-10 top-0 h-[2px] origin-right scale-x-0 bg-primary transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  <div className="flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-foreground">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="font-display text-base font-bold tracking-wider text-foreground/50 transition-colors duration-500 group-hover:text-primary">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-lg font-normal leading-relaxed text-muted-foreground line-clamp-3">
                    {service.description || service.desc || "تفاصيل الخدمة"}
                  </p>
                  {service.tags && Array.isArray(service.tags) && service.tags.length > 0 && (
                    <ul className="mt-8 flex flex-wrap gap-2.5">
                      {service.tags.slice(0, 4).map((tag: string) => (
                        <li
                          key={tag}
                          className="rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-foreground/70 transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-10 inline-flex items-center gap-2 text-base font-semibold text-foreground transition-all duration-300 group-hover:text-primary">
                    اقرأ التفاصيل
                    <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-2" />
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
