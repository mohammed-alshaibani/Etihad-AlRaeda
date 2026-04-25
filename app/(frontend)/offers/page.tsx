import Link from "next/link"
import { ArrowUpLeft, Check, Clock, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { offers } from "@/lib/sample-data"

export const metadata = {
  title: "العروض والباقات",
  description: "باقات استشارية محددة المدة والنطاق للقيادات التنفيذية.",
}

export default function OffersPage() {
  return (
    <>
      <PageHero
        eyebrow="عروض وباقات"
        title="باقات استشارية مصمّمة لاحتياجاتك"
        description="باقات محددة المدة والنطاق تُمكّنك من اختبار منهجيتنا قبل الالتزام بمشاريع أكبر."
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "العروض" }]}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {offers.map((o, i) => (
              <div
                key={o.slug}
                className={`relative flex flex-col rounded-sm border-2 p-8 transition ${
                  i === 0
                    ? "border-[var(--brand-gold)] bg-[var(--brand-navy)] text-white"
                    : "border-[var(--brand-border)] bg-white"
                }`}
              >
                <div className={`absolute -top-3 right-8 rounded-full px-3 py-1 text-[11px] font-semibold ${
                  i === 0 ? "bg-[var(--brand-gold)] text-white" : "bg-[var(--brand-navy)] text-white"
                }`}>
                  <Sparkles className="ml-1 inline h-3 w-3" /> {o.badge}
                </div>

                <div className="mb-6 pt-2">
                  <h3 className={`mb-2 font-serif text-[26px] leading-[1.3] ${i === 0 ? "text-white" : "text-[var(--brand-navy)]"}`}>{o.title}</h3>
                  <p className={`text-[14px] leading-[1.7] ${i === 0 ? "text-white/80" : "text-[var(--brand-muted)]"}`}>{o.tagline}</p>
                </div>

                <p className={`mb-6 text-[14px] leading-[1.9] ${i === 0 ? "text-white/85" : "text-[var(--brand-ink)]"}`}>{o.description}</p>

                <div className="mb-6 flex-1">
                  <div className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${i === 0 ? "text-[var(--brand-gold)]" : "text-[var(--brand-gold)]"}`}>
                    ما تتضمنه الباقة
                  </div>
                  <ul className="space-y-3">
                    {o.features.map((f, j) => (
                      <li key={j} className={`flex gap-2.5 text-[14px] leading-[1.7] ${i === 0 ? "text-white/90" : "text-[var(--brand-ink)]"}`}>
                        <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${i === 0 ? "text-[var(--brand-gold)]" : "text-[var(--brand-gold)]"}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`mb-5 flex items-center gap-2 border-t pt-4 text-[12px] ${
                  i === 0 ? "border-white/15 text-white/60" : "border-[var(--brand-border)] text-[var(--brand-muted)]"
                }`}>
                  <Clock className="h-3.5 w-3.5" /> صالح حتى {o.validUntil} • {o.audience}
                </div>

                <Button
                  asChild
                  className={`h-12 w-full ${
                    i === 0
                      ? "bg-[var(--brand-gold)] text-white hover:bg-[#a88648]"
                      : "bg-[var(--brand-navy)] text-white hover:bg-[var(--brand-navy-soft)]"
                  }`}
                >
                  <Link href={`/request-quote?package=${o.slug}`} className="flex items-center justify-center gap-2">
                    اطلب الباقة <ArrowUpLeft className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--brand-border)] bg-[var(--brand-cream)] py-20">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <h2 className="mb-4 font-serif text-[34px] text-[var(--brand-navy)]">تحتاج باقة مخصصة؟</h2>
          <p className="mb-8 text-[16px] leading-[1.9] text-[var(--brand-muted)]">
            نصمّم باقات استشارية على قياس احتياج مؤسستك وميزانيتك. تواصل معنا لنبني معاً الحلّ المناسب.
          </p>
          <Button asChild className="h-12 bg-[var(--brand-navy)] px-7 text-white hover:bg-[var(--brand-navy-soft)]">
            <Link href="/contact">تواصل مع فريق المبيعات</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
