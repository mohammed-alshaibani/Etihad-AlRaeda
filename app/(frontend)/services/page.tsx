import Link from "next/link"
import {
  Briefcase,
  Truck,
  Building2,
  LineChart,
  Scale,
  ShieldCheck,
  Cpu,
  Users,
  BarChart3,
  ArrowLeft,
} from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "خدماتنا",
  description:
    "استعرض مجموعة خدمات مَراسي المؤسسية: الاستشارات الاستراتيجية، التوريد، إدارة المشاريع، والمزيد.",
}

const services = [
  {
    slug: "strategic-consulting",
    icon: Briefcase,
    title: "الاستشارات الاستراتيجية",
    desc: "خارطة طريق مؤسسية، تخطيط استراتيجي، وإدارة التغيير بفريق يمتلك خبرة في 14 قطاعاً.",
    features: ["تخطيط استراتيجي 3-5 سنوات", "أبحاث سوق مخصّصة", "إدارة التغيير"],
    featured: true,
  },
  {
    slug: "corporate-procurement",
    icon: Truck,
    title: "التوريد المؤسسي",
    desc: "عقود إطارية، أسعار تفضيلية، وإدارة موردين لضمان استدامة سلسلة التوريد.",
    features: ["جملة وبكميات كبيرة", "SLA موثّق", "تسليم مضمون"],
  },
  {
    slug: "project-management",
    icon: Building2,
    title: "إدارة المشاريع",
    desc: "تنفيذ مشاريع متعددة التخصصات وفق PMI بإشراف مديرين معتمدين PMP و PRINCE2.",
    features: ["PMP / Agile", "لوحة متابعة حية", "تقارير أسبوعية"],
  },
  {
    slug: "financial-advisory",
    icon: LineChart,
    title: "الاستشارات المالية",
    desc: "دراسات جدوى، نمذجة مالية، وإعداد ملف الاستثمار لجولات التمويل أو الاستحواذ.",
    features: ["دراسات جدوى", "M&A Advisory", "Due Diligence"],
  },
  {
    slug: "legal-compliance",
    icon: Scale,
    title: "الامتثال والحوكمة",
    desc: "مواءمة الشركة مع الأنظمة المحلية والدولية وإطار حوكمة يحمي أصحاب المصلحة.",
    features: ["GRC", "تقارير تنظيمية", "سياسات مؤسسية"],
  },
  {
    slug: "cybersecurity",
    icon: ShieldCheck,
    title: "الأمن السيبراني",
    desc: "تقييم، مراقبة، واستجابة لحوادث أمن المعلومات بفرق معتمدة SOC2 و ISO 27001.",
    features: ["اختبار اختراق", "مراقبة 24/7", "SOC Management"],
  },
  {
    slug: "digital-transformation",
    icon: Cpu,
    title: "التحوّل الرقمي",
    desc: "تحديث البنية التقنية، أتمتة العمليات، وبناء منصات مخصّصة لتسريع أعمالك.",
    features: ["ERP / CRM", "أتمتة سير العمل", "بناء منصات"],
  },
  {
    slug: "hr-advisory",
    icon: Users,
    title: "استشارات الموارد البشرية",
    desc: "هيكلة تنظيمية، سياسات توظيف، وبرامج تطوير قيادات تبني فرق أعمال عالية الأداء.",
    features: ["هياكل مؤسسية", "تقييم أداء", "برامج قيادية"],
  },
  {
    slug: "market-research",
    icon: BarChart3,
    title: "أبحاث السوق",
    desc: "فهم عميق للسوق والمستهلك عبر منهجيات كمّية ونوعية معتمدة دولياً.",
    features: ["Focus Groups", "استبيانات كمّية", "رصد المنافسين"],
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="خدماتنا"
        title="منظومة حلول مؤسسية متكاملة لنمو أعمالك"
        description="اختر الخدمة التي تحتاجها، أو اطلب حزمة متكاملة مخصّصة لأهدافك الاستراتيجية."
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "خدماتنا" }]}
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

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`group relative flex flex-col rounded-2xl border bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-premium-lg ${
                    service.featured
                      ? "border-[var(--brand-gold)]/40 bg-gradient-to-bl from-[var(--brand-gold)]/5 to-transparent"
                      : "border-border hover:border-[var(--brand-gold)]/40"
                  }`}
                >
                  {service.featured && (
                    <span className="absolute left-7 top-7 rounded-full bg-[var(--brand-gold)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      الأكثر طلباً
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)] transition group-hover:bg-[var(--brand-gold)] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-[12px] font-semibold tracking-wider text-[var(--brand-gray)]">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-[var(--brand-navy)]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    {service.desc}
                  </p>
                  <ul className="mt-5 space-y-1.5">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-[13px] text-[var(--brand-navy)]/80"
                      >
                        <span className="h-1 w-1 rounded-full bg-[var(--brand-gold)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--brand-navy)] transition group-hover:text-[var(--brand-gold)]">
                    اقرأ التفاصيل
                    <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
