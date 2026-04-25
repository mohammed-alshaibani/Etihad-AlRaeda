import { BookOpen, Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { resources } from "@/lib/sample-data"

export const metadata = {
  title: "مكتبة الموارد | تقارير وأدلة تنفيذية",
  description: "تقارير وأدلة عملية وأوراق بحثية للقيادات التنفيذية.",
}

const types = Array.from(new Set(resources.map((r) => r.type)))

export default function LibraryPage() {
  return (
    <>
      <PageHero
        eyebrow="مكتبة الموارد"
        title="مرجعك التنفيذي لصياغة القرار"
        description="اطّلع على تقاريرنا التنفيذية، أدلتنا العملية، وأوراقنا البحثية المستخلصة من عملنا مع كبار العملاء."
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "مكتبة الموارد" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 flex flex-wrap gap-2">
            <button className="rounded-full border border-[var(--brand-navy)] bg-[var(--brand-navy)] px-4 py-2 text-[13px] font-medium text-white">جميع الموارد</button>
            {types.map((t) => (
              <button key={t} className="rounded-full border border-[var(--brand-border)] bg-white px-4 py-2 text-[13px] font-medium text-[var(--brand-navy)] hover:border-[var(--brand-navy)]">
                {t}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <div key={r.slug} className="group flex h-full flex-col border border-[var(--brand-border)] bg-white p-6 transition hover:border-[var(--brand-gold)] hover:shadow-md">
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[var(--brand-cream)] text-[var(--brand-navy)]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-[var(--brand-cream)] px-3 py-1 text-[11px] font-medium text-[var(--brand-navy)]">{r.type}</span>
                </div>
                <div className="mb-2 flex items-center gap-2 text-[12px] text-[var(--brand-gold)]">
                  <span>{r.category}</span>
                  <span>•</span>
                  <span>{r.year}</span>
                </div>
                <h3 className="mb-3 text-[18px] font-semibold leading-[1.4] text-[var(--brand-navy)]">{r.title}</h3>
                <p className="mb-5 flex-1 text-[14px] leading-[1.7] text-[var(--brand-muted)]">{r.description}</p>
                <div className="mb-4 text-[12px] text-[var(--brand-muted)]">{r.format}</div>
                <Button className="h-11 w-full bg-[var(--brand-navy)] text-white hover:bg-[var(--brand-navy-soft)]">
                  <Download className="ml-1.5 h-4 w-4" /> تنزيل المورد
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--brand-border)] bg-[var(--brand-cream)] py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-5 md:px-8 lg:flex-row lg:items-stretch">
          <div className="flex-1 rounded-sm bg-white p-8 shadow-sm md:p-10">
            <BookOpen className="mb-5 h-10 w-10 text-[var(--brand-gold)]" />
            <h3 className="mb-3 font-serif text-[26px] leading-[1.3] text-[var(--brand-navy)]">اشترك في نشرتنا الشهرية</h3>
            <p className="mb-6 text-[15px] leading-[1.8] text-[var(--brand-muted)]">
              تصلك كل شهر أبرز رؤانا التنفيذية وتقاريرنا الحديثة قبل نشرها للعموم.
            </p>
            <form className="flex gap-2" action="/api/subscribe">
              <input
                type="email"
                name="email"
                required
                placeholder="بريدك المؤسسي"
                dir="ltr"
                className="h-12 flex-1 rounded-sm border border-[var(--brand-border)] bg-white px-4 text-[14px] text-[var(--brand-navy)] placeholder:text-[var(--brand-muted)] focus:border-[var(--brand-navy)] focus:outline-none"
              />
              <Button type="submit" className="h-12 bg-[var(--brand-gold)] px-5 text-white hover:bg-[#a88648]">اشترك</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
