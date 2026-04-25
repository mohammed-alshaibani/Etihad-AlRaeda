import Image from "next/image"
import Link from "next/link"
import { Compass, Target, Globe, Users2, Award, TrendingUp, ArrowLeft } from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "من نحن",
  description:
    "تعرّف على قصة مَراسي، رؤيتنا ورسالتنا، فريق الخبراء، والقيم التي توجّه عملنا مع الشركات منذ 2008.",
}

const values = [
  {
    icon: Compass,
    title: "الموثوقية",
    desc: "نلتزم بما نعد به، وننفّذ بأعلى معايير الجودة والشفافية.",
  },
  {
    icon: Target,
    title: "التميّز",
    desc: "نطوّر أنفسنا باستمرار وفق أحدث المعايير العالمية.",
  },
  {
    icon: Users2,
    title: "الشراكة",
    desc: "ننجح بنجاح عملائنا، ونبني علاقات طويلة الأمد مبنية على الثقة.",
  },
  {
    icon: Globe,
    title: "الأثر",
    desc: "نقيس نجاحنا بالنتائج الملموسة في أعمال شركائنا والمجتمع.",
  },
]

const milestones = [
  { year: "2008", title: "التأسيس في الرياض", desc: "بدأنا بفريق من 5 استشاريين وأول 12 عميلاً." },
  { year: "2013", title: "افتتاح مكتب جدة", desc: "توسع في منطقة غرب المملكة وضم متخصّصين للقطاع الصحي." },
  { year: "2017", title: "اعتماد ISO 9001 و ISO 27001", desc: "ترسيخ منظومة الجودة والأمن المعلوماتي." },
  { year: "2021", title: "افتتاح مكتب دبي", desc: "إطلاق خدمات الاستشارات المالية الإقليمية." },
  { year: "2024", title: "إطلاق منصة مَراسي الرقمية", desc: "منصة تعاون عملاء تقدّم لوحات متابعة ومحتوى حصري." },
  { year: "2026", title: "تجاوز الـ 350 عميل", desc: "تجاوزنا 1,200 مشروع منجز في 14 قطاعاً." },
]

const leadership = [
  { name: "م. خالد الزهراني", role: "الرئيس التنفيذي والمؤسس", initials: "خ.ز" },
  { name: "د. ريم الفهد", role: "رئيس الاستشارات الاستراتيجية", initials: "ر.ف" },
  { name: "أ. ياسر الحربي", role: "المدير المالي CFO", initials: "ي.ح" },
  { name: "م. هدى القحطاني", role: "رئيس المشاريع والعمليات", initials: "ه.ق" },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="من نحن"
        title="17 عاماً من الشراكة الموثوقة مع رواد الأعمال"
        description="نبني جسوراً بين الطموح والتنفيذ، ونحوّل تعقيدات السوق إلى قرارات استراتيجية واضحة."
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "من نحن" }]}
      />

      {/* Vision & Mission */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 container-px lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-premium-lg">
              <Image
                src="/images/team-collaboration.jpg"
                alt="فريق مَراسي في جلسة عمل"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)]">
              الرؤية والرسالة
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-balance text-[var(--brand-navy)] md:text-4xl">
              نُمكّن الشركات الطموحة لتصبح قياسية
            </h2>

            <div className="mt-8 space-y-5">
              <div className="rounded-2xl border border-border bg-[var(--brand-gray-soft)] p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-gold)] text-white">
                    <Target className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-[var(--brand-navy)]">
                    رؤيتنا
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  أن نكون الشريك الاستراتيجي الأول لكل شركة ناشئة أو راسخة
                  تسعى للريادة الإقليمية والدولية.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-[var(--brand-gray-soft)] p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-navy)] text-white">
                    <Compass className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-[var(--brand-navy)]">
                    رسالتنا
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  تقديم حلول أعمال متكاملة بجودة عالمية، مبنية على فهم عميق
                  لخصوصية السوق المحلي، تُسرّع نمو عملائنا بشكل مستدام.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--brand-gray-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl container-px">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)]">
              القيم
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-balance text-[var(--brand-navy)] md:text-4xl">
              أربع قيم توجّه كل قرار نتخذه
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="rounded-2xl border border-border bg-white p-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-navy)] text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-[var(--brand-navy)]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    {v.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl container-px">
          <div className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)]">
              قصّتنا
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-balance text-[var(--brand-navy)] md:text-4xl">
              محطات في رحلتنا منذ 2008
            </h2>
          </div>

          <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {milestones.map((m) => (
              <li
                key={m.year}
                className="relative rounded-2xl border border-border bg-white p-7"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-navy)] px-3 py-1 text-[12px] font-bold text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]" />
                  {m.year}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-[var(--brand-navy)]">
                  {m.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {m.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--brand-navy)] py-14 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-8 container-px md:grid-cols-4">
          {[
            { v: "+350", l: "عميل مؤسسي", i: Users2 },
            { v: "+1,200", l: "مشروع منجز", i: TrendingUp },
            { v: "120", l: "خبير متخصّص", i: Users2 },
            { v: "14", l: "قطاعاً نخدمه", i: Award },
          ].map((stat) => {
            const Icon = stat.i
            return (
              <div key={stat.l} className="text-center md:text-right">
                <Icon className="mx-auto h-6 w-6 text-[var(--brand-gold)] md:mx-0" />
                <p className="mt-3 font-display text-4xl font-extrabold text-white md:text-5xl">
                  {stat.v}
                </p>
                <p className="mt-1 text-[13px] text-white/60">{stat.l}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl container-px">
          <div className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)]">
              القيادة
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-balance text-[var(--brand-navy)] md:text-4xl">
              فريق قيادي يجمع بين الخبرة والشغف
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="group rounded-2xl border border-border bg-white p-6 text-center transition hover:border-[var(--brand-gold)]/40 hover:shadow-premium"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--brand-navy)] font-display text-xl font-bold text-white transition group-hover:bg-[var(--brand-gold)]">
                  {person.initials}
                </div>
                <p className="mt-5 font-display text-[15px] font-bold text-[var(--brand-navy)]">
                  {person.name}
                </p>
                <p className="mt-1 text-[12px] text-muted-foreground">
                  {person.role}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              className="bg-[var(--brand-gold)] text-white hover:bg-[#a88648]"
            >
              <Link href="/request-quote">
                طلب عرض سعر
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[var(--brand-navy)]/15 text-[var(--brand-navy)]"
            >
              <Link href="/careers">انضم إلى فريقنا</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
