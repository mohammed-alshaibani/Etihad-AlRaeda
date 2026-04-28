"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "تطوير برج تجاري بالرياض",
    client: "مجموعة عقارات الشرق",
    sector: "عقارات وتشييد",
    img: "/images/project-tower.jpg",
    result: "تسليم قبل الموعد بـ 45 يوماً",
    href: "/portfolio/riyadh-tower",
  },
  {
    title: "تحوّل رقمي لمنظومة لوجستية",
    client: "شركة النقل الخليجي",
    sector: "لوجستيات وسلاسل إمداد",
    img: "/images/project-logistics.jpg",
    result: "خفض التكاليف التشغيلية 28%",
    href: "/portfolio/gulf-logistics",
  },
  {
    title: "نظام امتثال مالي متكامل",
    client: "بنك الأهلية للاستثمار",
    sector: "خدمات مالية",
    img: "/images/project-finance.jpg",
    result: "مطابقة تنظيمية 100%",
    href: "/portfolio/finance-compliance",
  },
]

export function PortfolioSection({ data }: { data?: any }) {
  const eyebrow = data?.eyebrow || "أعمالنا ومشاريعنا"
  const title = data?.title || "نتائج حقيقية لشركات قياسية"

  return (
    <section id="portfolio" className="bg-background py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl container-px">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-balance text-foreground md:text-4xl">
              {title}
            </h2>
          </div>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/portfolio">
              استعرض كل المشاريع
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16 xl:gap-24">
          {projects.map((project, idx) => (
            <div
              key={project.href}
              className={`h-full ${idx === 0 ? "md:col-span-2" : ""}`}
            >
              <Link
                href={project.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-background text-foreground shadow-premium transition duration-500 hover:-translate-y-2 hover:shadow-premium-xl"
              >
                <div
                  className={`relative ${idx === 0 ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/3]"
                    }`}
                >
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy)] via-[var(--brand-navy)]/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {project.sector}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-base text-foreground/70">
                    {project.client}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-foreground/10 pt-5">
                    <span className="text-sm font-semibold text-primary">
                      {project.result}
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 transition duration-300 group-hover:border-primary group-hover:bg-primary">
                      <ArrowLeft className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

