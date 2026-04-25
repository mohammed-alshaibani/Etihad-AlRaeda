import { Clock, ShieldCheck, UserCheck, PhoneCall } from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { QuoteForm } from "@/components/forms/quote-form"

export const metadata = {
  title: "طلب عرض سعر",
  description:
    "نموذج B2B لطلب عرض سعر مؤسسي مخصّص من مَراسي. ستحصل على رد خلال 24 ساعة عمل.",
}

const highlights = [
  {
    icon: Clock,
    title: "رد خلال 24 ساعة",
    desc: "فريق مختص يراجع طلبك ويتواصل معك في يوم العمل التالي.",
  },
  {
    icon: UserCheck,
    title: "مدير حساب مخصّص",
    desc: "نقطة اتصال واحدة تدير جميع تفاصيل الشراكة من بدايتها.",
  },
  {
    icon: ShieldCheck,
    title: "سرية موقّعة",
    desc: "اتفاقية NDA افتراضية تحمي بياناتك ومتطلباتك.",
  },
  {
    icon: PhoneCall,
    title: "دعم متواصل",
    desc: "خط مباشر لكبار العملاء متاح طوال أيام العمل.",
  },
]

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="طلب عرض سعر"
        title="احصل على عرض سعر مؤسسي مخصّص لمتطلبات شركتك"
        description="نموذج من 4 خطوات مصمّم لفهم احتياجاتك بدقة. لن يستغرق الأمر أكثر من 3 دقائق."
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "طلب عرض سعر" },
        ]}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 container-px lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border bg-white p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="font-display text-[15px] font-bold text-[var(--brand-navy)]">
                        {item.title}
                      </p>
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                )
              })}

              <div className="rounded-2xl border border-[var(--brand-navy)] bg-[var(--brand-navy)] p-6 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)]">
                  تفضّل الهاتف؟
                </p>
                <p className="mt-2 font-display text-lg font-bold">
                  خط العناية المؤسسية
                </p>
                <a
                  dir="ltr"
                  href="tel:+966110000000"
                  className="mt-3 block font-display text-2xl font-bold text-[var(--brand-gold)]"
                >
                  +966 11 000 0000
                </a>
                <p className="mt-1 text-[12px] text-white/60">
                  الأحد - الخميس، 8:30 ص - 5:30 م
                </p>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  )
}
