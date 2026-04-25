import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  Check,
  ArrowLeft,
  Briefcase,
  Truck,
  Building2,
  LineChart,
  Scale,
  ShieldCheck,
  Cpu,
  Users,
  BarChart3,
} from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ServiceDef = {
  slug: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  tagline: string
  description: string
  benefits: string[]
  deliverables: string[]
  kpis: Array<{ label: string; value: string }>
  caseStudy: { client: string; sector: string; result: string; summary: string; image: string }
}

const services: Record<string, ServiceDef> = {
  "strategic-consulting": {
    slug: "strategic-consulting",
    icon: Briefcase,
    title: "الاستشارات الاستراتيجية",
    tagline: "خارطة طريق مؤسسية تُحوّل الطموح إلى أثر",
    description:
      "نعمل جنباً إلى جنب مع مجلس إدارتك لصياغة استراتيجية واقعية، قابلة للقياس، مبنية على بيانات السوق المحلي والممارسات العالمية.",
    benefits: [
      "توحيد رؤية القيادة حول أولويات النمو الثلاث الكبرى",
      "خارطة تنفيذ بمبادرات محدّدة ومؤشرات أداء",
      "تقييم موقعك التنافسي بمنهجيات معتمدة",
      "اتخاذ قرارات أسرع بـ 40% بفضل لوحات المتابعة",
    ],
    deliverables: [
      "وثيقة الاستراتيجية التنفيذية",
      "نموذج أعمال مُحدّث (Business Model Canvas)",
      "خطة مبادرات 24 شهراً",
      "لوحة قيادة KPIs مخصّصة",
    ],
    kpis: [
      { label: "متوسط نمو الإيرادات بعد 18 شهراً", value: "+32%" },
      { label: "نسبة تبنّي المبادرات", value: "94%" },
      { label: "تقييم رضا المجالس التنفيذية", value: "4.9/5" },
    ],
    caseStudy: {
      client: "شركة نورا للتقنية",
      sector: "تقنية معلومات",
      result: "نمو إيرادات 2.4× خلال سنتين",
      summary:
        "ساعدنا الشركة على إعادة تركيز محفظتها، إطلاق وحدة جديدة للخدمات السحابية، وتوقيع 3 عقود مؤسسية كبرى.",
      image: "/images/consulting-meeting.jpg",
    },
  },
  "corporate-procurement": {
    slug: "corporate-procurement",
    icon: Truck,
    title: "التوريد المؤسسي",
    tagline: "سلسلة توريد موثوقة وتكلفة محكومة",
    description:
      "نُصمّم ونُدير عقود توريد مؤسسية تضمن جودة المنتج، شفافية التسعير، وتسليماً مؤمّناً باتفاقيات SLA.",
    benefits: [
      "خفض تكاليف المشتريات حتى 28%",
      "اتفاقيات إطارية لمدة تصل إلى 36 شهراً",
      "موردون معتمدون مدققون بعناية",
      "تقارير أداء شهرية شفافة",
    ],
    deliverables: [
      "كتالوج موردين معتمد",
      "عقد إطاري بتسعير ثابت",
      "نظام طلبات رقمي مدمج",
      "تقارير أداء ربعية",
    ],
    kpis: [
      { label: "متوسط توفير التكلفة", value: "28%" },
      { label: "نسبة التسليم في الوقت", value: "99.2%" },
      { label: "عقود إطارية مُدارة", value: "+420" },
    ],
    caseStudy: {
      client: "مجموعة الخليج الصناعية",
      sector: "تصنيع",
      result: "خفض تكاليف التشغيل 28%",
      summary:
        "أعدنا هيكلة سلسلة التوريد للمجموعة، ووحدنا المشتريات عبر 7 مصانع، بتوقيع 14 عقداً إطارياً.",
      image: "/images/project-logistics.jpg",
    },
  },
  "project-management": {
    slug: "project-management",
    icon: Building2,
    title: "إدارة المشاريع",
    tagline: "تنفيذ بامتياز وفق منهجية PMI",
    description:
      "مديرو مشاريع معتمدون PMP و PRINCE2 يقودون مشاريعك المعقّدة بلوحات متابعة لحظية وتقارير منتظمة.",
    benefits: [
      "التزام بالميزانية بنسبة تتجاوز 95%",
      "تسليم في الموعد لأكثر من 93% من المشاريع",
      "إدارة المخاطر بأطر معيارية",
      "شفافية كاملة عبر لوحة تحكم مخصّصة",
    ],
    deliverables: [
      "ميثاق المشروع (Project Charter)",
      "خطة عمل تفصيلية بمسار حرج",
      "لوحة متابعة تفاعلية",
      "تقارير إغلاق ومراجعة Lessons Learned",
    ],
    kpis: [
      { label: "تسليم في الوقت", value: "93%" },
      { label: "التزام بالميزانية", value: "96%" },
      { label: "مديرو مشاريع معتمدون", value: "+45" },
    ],
    caseStudy: {
      client: "مجموعة عقارات الشرق",
      sector: "عقارات وتشييد",
      result: "تسليم برج بالرياض قبل الموعد بـ 45 يوماً",
      summary:
        "أدرنا مشروع إنشاء برج مكتبي من 32 طابقاً بميزانية 450 مليون ريال، وسلّمناه قبل الموعد بـ 45 يوماً.",
      image: "/images/project-tower.jpg",
    },
  },
}

// Fallback generator for services not defined in detail
function buildFallback(slug: string): ServiceDef {
  const fallbackMap: Record<string, { title: string; icon: ServiceDef["icon"] }> = {
    "financial-advisory": { title: "الاستشارات المالية", icon: LineChart },
    "legal-compliance": { title: "الامتثال والحوكمة", icon: Scale },
    cybersecurity: { title: "الأمن السيبراني", icon: ShieldCheck },
    "digital-transformation": { title: "التحوّل الرقمي", icon: Cpu },
    "hr-advisory": { title: "استشارات الموارد البشرية", icon: Users },
    "market-research": { title: "أبحاث السوق", icon: BarChart3 },
  }
  const meta = fallbackMap[slug]
  if (!meta) return services["strategic-consulting"]
  return {
    slug,
    icon: meta.icon,
    title: meta.title,
    tagline: "حلول متخصّصة بأعلى المعايير",
    description:
      "نقدّم خدمة متكاملة بفريق خبراء متخصّص، مبنية على أفضل الممارسات العالمية ومخصّصة لاحتياجات قطاعك.",
    benefits: [
      "منهجية مثبتة ومخصّصة لكل عميل",
      "فريق متخصّص معتمد دولياً",
      "شفافية كاملة في التكلفة والجدول الزمني",
      "تقارير أداء دورية ولوحات متابعة",
    ],
    deliverables: [
      "تقرير تشخيص مبدئي",
      "خطة تنفيذ مفصّلة",
      "تسليم مرحلي موثّق",
      "تقرير ختامي وتوصيات",
    ],
    kpis: [
      { label: "رضا العملاء", value: "4.9/5" },
      { label: "مشاريع منجزة", value: "+120" },
      { label: "خبراء متخصّصون", value: "+30" },
    ],
    caseStudy: {
      client: "عميل مؤسسي",
      sector: "متعدد القطاعات",
      result: "نتائج قياسية",
      summary:
        "قصة نجاح قيد النشر. تواصل معنا للاطلاع على دراسات حالة تفصيلية في هذه الخدمة.",
      image: "/images/project-finance.jpg",
    },
  }
}

export function generateStaticParams() {
  return [
    "strategic-consulting",
    "corporate-procurement",
    "project-management",
    "financial-advisory",
    "legal-compliance",
    "cybersecurity",
    "digital-transformation",
    "hr-advisory",
    "market-research",
  ].map((slug) => ({ slug }))
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = services[slug] ?? buildFallback(slug)
  if (!service) notFound()

  const Icon = service.icon

  return (
    <>
      <PageHero
        eyebrow="الخدمات"
        title={service.title}
        description={service.tagline}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "خدماتنا", href: "/services" },
          { label: service.title },
        ]}
        actions={
          <Button
            asChild
            className="bg-[var(--brand-gold)] text-white hover:bg-[#a88648]"
          >
            <Link href="/request-quote">
              طلب عرض سعر
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        }
      />

      {/* Overview + Benefits */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 container-px lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)]">
                نظرة عامة
              </p>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance text-[var(--brand-navy)] md:text-4xl">
              لماذا تختار {service.title}؟
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
              {service.description}
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-xl border border-border bg-white p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand-gold)]/15 text-[var(--brand-gold)]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-[14px] font-medium text-[var(--brand-navy)]">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-border bg-[var(--brand-gray-soft)] p-6 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)]">
                ماذا تحصل عليه
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-[var(--brand-navy)]">
                مخرجات واضحة قابلة للقياس
              </h3>
              <ul className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2">
                {service.deliverables.map((d, i) => (
                  <li
                    key={d}
                    className="flex items-center gap-3 rounded-xl bg-white p-3 text-[14px] font-medium text-[var(--brand-navy)]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand-navy)] font-display text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky inline inquiry form */}
          <aside className="lg:col-span-5">
            <div className="sticky top-28 rounded-2xl border border-border bg-white p-6 shadow-premium md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)]">
                استفسار سريع
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-[var(--brand-navy)]">
                تحدّث مع خبير مختص
              </h3>
              <p className="mt-1 text-[13px] text-muted-foreground">
                نرد خلال ساعات العمل.
              </p>

              <form className="mt-6 grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="s-name">الاسم</Label>
                  <Input id="s-name" className="h-11" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="s-email">البريد الإلكتروني</Label>
                  <Input id="s-email" type="email" className="h-11" dir="ltr" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="s-company">الشركة</Label>
                  <Input id="s-company" className="h-11" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="s-size">حجم المشروع</Label>
                  <Select>
                    <SelectTrigger id="s-size" className="h-11">
                      <SelectValue placeholder="اختر شريحة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">أقل من 100 ألف ريال</SelectItem>
                      <SelectItem value="md">100 - 500 ألف ريال</SelectItem>
                      <SelectItem value="lg">500 ألف - 2 مليون</SelectItem>
                      <SelectItem value="xl">+2 مليون</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="s-msg">وصف مختصر</Label>
                  <Textarea id="s-msg" rows={3} />
                </div>
                <Button className="h-11 bg-[var(--brand-gold)] text-white hover:bg-[#a88648]">
                  إرسال الاستفسار
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 border-[var(--brand-navy)]/15 text-[var(--brand-navy)]"
                >
                  <Link href="/book-appointment">أو احجز استشارة</Link>
                </Button>
              </form>
            </div>
          </aside>
        </div>
      </section>

      {/* KPIs */}
      <section className="bg-[var(--brand-navy)] py-14 text-white md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 container-px md:grid-cols-3">
          {service.kpis.map((kpi) => (
            <div key={kpi.label} className="border-r border-white/10 pr-6 first:border-r-0 md:first:border-r">
              <p className="font-display text-4xl font-extrabold text-[var(--brand-gold)] md:text-5xl">
                {kpi.value}
              </p>
              <p className="mt-2 text-[13px] text-white/70">{kpi.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case study */}
      <section className="bg-[var(--brand-gray-soft)] py-14 md:py-20">
        <div className="mx-auto max-w-7xl container-px">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-premium">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative aspect-[4/3] lg:col-span-5 lg:aspect-auto">
                <Image
                  src={service.caseStudy.image}
                  alt={service.caseStudy.client}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-12 lg:col-span-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)]">
                  دراسة حالة
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-[var(--brand-navy)] md:text-3xl">
                  {service.caseStudy.client}
                </h3>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {service.caseStudy.sector}
                </p>
                <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
                  {service.caseStudy.summary}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--brand-gold)]/10 px-4 py-2 text-[13px] font-bold text-[var(--brand-gold)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]" />
                  {service.caseStudy.result}
                </div>
                <div className="mt-8">
                  <Button
                    asChild
                    variant="outline"
                    className="border-[var(--brand-navy)]/15 text-[var(--brand-navy)]"
                  >
                    <Link href="/portfolio">
                      استعرض جميع دراسات الحالة
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
