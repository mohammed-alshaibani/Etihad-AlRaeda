import Image from "next/image"
import Link from "next/link"
import { ArrowUpLeft, Award, Briefcase, Heart, MapPin, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { careers } from "@/lib/sample-data"

export const metadata = {
  title: "الوظائف | انضم إلى فريقنا",
  description: "فرص وظيفية لكوادر متميزة تبحث عن مسار مهني في بيئة استشارية إقليمية.",
}

const benefits = [
  { icon: TrendingUp, title: "مسار مهني واضح", desc: "مسارات مهنية محددة مع مراجعات نصف سنوية للأداء والنمو." },
  { icon: Award, title: "تدريب مستمر", desc: "استثمار سنوي لا يقل عن 80 ساعة تدريب متخصص لكل عضو فريق." },
  { icon: Heart, title: "تأمين شامل", desc: "تأمين صحي للموظف والعائلة مع تغطية للخارج." },
  { icon: Users, title: "ثقافة التعاون", desc: "بيئة عمل تشجّع التعلّم المتبادل والعمل الجماعي." },
]

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="الوظائف"
        title="انضم إلى فريق يصنع تحولات حقيقية"
        description="نبحث عن أصحاب الكفاءات الذين يشاركوننا شغف بناء مؤسسات قوية ومستدامة."
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "الوظائف" }]}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 text-[12px] font-medium uppercase tracking-[0.24em] text-[var(--brand-gold)]">لماذا نحن؟</div>
              <h2 className="mb-6 font-serif text-[38px] leading-[1.2] text-[var(--brand-navy)]">
                مكان يصنع قادة المستقبل، لا مجرد موظفين
              </h2>
              <p className="mb-6 text-[17px] leading-[1.9] text-[var(--brand-muted)]">
                نؤمن أن جودة الاستشارات تعتمد أولاً على جودة الأشخاص. لذلك نستثمر في تطوير كل عضو من فريقنا ونتيح له العمل في أكثر مشاريع المنطقة طموحاً.
              </p>
              <p className="text-[17px] leading-[1.9] text-[var(--brand-muted)]">
                لدينا اليوم أكثر من 220 استشارياً في 3 مكاتب إقليمية، ونعمل مع كبار العملاء في القطاعات المالية، الطاقة، الحكومة، والصناعات التحويلية.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image src="/images/careers-office.jpg" alt="بيئة العمل" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-cream)] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="mb-12 text-center font-serif text-[32px] text-[var(--brand-navy)]">ما نقدّمه لفريقنا</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => {
              const Icon = b.icon
              return (
                <div key={b.title} className="border-t-2 border-[var(--brand-gold)] bg-white p-7">
                  <Icon className="mb-4 h-7 w-7 text-[var(--brand-gold)]" />
                  <h3 className="mb-2 text-[17px] font-semibold text-[var(--brand-navy)]">{b.title}</h3>
                  <p className="text-[14px] leading-[1.8] text-[var(--brand-muted)]">{b.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-12 flex items-end justify-between gap-6 border-b border-[var(--brand-border)] pb-6">
            <div>
              <div className="mb-2 text-[12px] font-medium uppercase tracking-[0.24em] text-[var(--brand-gold)]">الشواغر الحالية</div>
              <h2 className="font-serif text-[34px] text-[var(--brand-navy)]">{careers.length} شاغر مفتوح</h2>
            </div>
            <div className="text-[13px] text-[var(--brand-muted)]">آخر تحديث: 22 أبريل 2026</div>
          </div>

          <div className="divide-y divide-[var(--brand-border)] border-y border-[var(--brand-border)]">
            {careers.map((c) => (
              <Link
                key={c.slug}
                href={`/careers/${c.slug}`}
                className="group flex flex-col gap-4 py-6 transition hover:bg-[var(--brand-cream)] md:flex-row md:items-center md:gap-6 md:px-4"
              >
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3 text-[12px] text-[var(--brand-muted)]">
                    <span className="rounded-full bg-[var(--brand-cream)] px-3 py-1 text-[var(--brand-navy)]">{c.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{c.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{c.type}</span>
                    <span>• {c.experience}</span>
                  </div>
                  <h3 className="mb-2 text-[19px] font-semibold text-[var(--brand-navy)] group-hover:text-[var(--brand-gold)]">{c.title}</h3>
                  <p className="line-clamp-2 text-[14px] leading-[1.7] text-[var(--brand-muted)]">{c.summary}</p>
                </div>
                <div className="flex items-center gap-2 text-[14px] font-semibold text-[var(--brand-navy)] group-hover:text-[var(--brand-gold)]">
                  قدّم الآن <ArrowUpLeft className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-sm bg-[var(--brand-navy)] p-8 text-center text-white md:p-12">
            <h3 className="mb-3 font-serif text-[26px]">لم تجد الدور المناسب؟</h3>
            <p className="mx-auto mb-6 max-w-xl text-[15px] leading-[1.8] text-white/75">
              إن كنت ترى في نفسك إضافة حقيقية لفريقنا، أرسل لنا سيرتك الذاتية وسنتواصل معك عند توفّر فرصة تناسبك.
            </p>
            <Button asChild className="h-12 bg-[var(--brand-gold)] px-6 text-white hover:bg-[#a88648]">
              <Link href="/contact">أرسل سيرتك الذاتية</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
