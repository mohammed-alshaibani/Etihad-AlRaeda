import Image from "next/image"
import Link from "next/link"
import { ArrowUpLeft } from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { projects } from "@/lib/sample-data"

export const metadata = {
  title: "أعمالنا | مشاريع استشارية بارزة",
  description: "اطلع على مختارات من مشاريعنا الاستشارية في القطاعات المختلفة.",
}

const sectors = ["الكل", "العقارات التجارية", "الخدمات المالية", "الطاقة المتجددة", "التعليم والتدريب", "النقل والخدمات اللوجستية", "تجزئة فاخرة"]

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="أعمالنا"
        title="مشاريع تصنع أثراً قابلاً للقياس"
        description="أكثر من 340 مشروعاً في 12 قطاعاً، نختار هنا مختارات تعكس عمق عملنا مع القيادات التنفيذية."
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "أعمالنا" }]}
      />

      <section className="bg-[var(--brand-cream)] py-12">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {sectors.map((s, i) => (
              <button
                key={s}
                className={`rounded-full border px-4 py-2 text-[13px] font-medium transition ${
                  i === 0
                    ? "border-[var(--brand-navy)] bg-[var(--brand-navy)] text-white"
                    : "border-[var(--brand-border)] bg-white text-[var(--brand-navy)] hover:border-[var(--brand-navy)]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-cream)] pb-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group block overflow-hidden rounded-sm bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--brand-gray-soft)]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium text-[var(--brand-navy)]">
                    {p.sector}
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2 text-[12px] text-[var(--brand-gold)]">{p.year} • {p.client}</div>
                  <h3 className="mb-3 text-[18px] font-semibold leading-[1.4] text-[var(--brand-navy)] group-hover:text-[var(--brand-gold)]">
                    {p.title}
                  </h3>
                  <p className="mb-5 line-clamp-2 text-[14px] leading-[1.7] text-[var(--brand-muted)]">{p.summary}</p>
                  <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--brand-navy)] group-hover:text-[var(--brand-gold)]">
                    <span>استعرض الحالة</span>
                    <ArrowUpLeft className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
