import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  Check,
  ArrowLeft,
  Briefcase,
  TrendingUp,
  Shield,
  Users,
  Target,
  Building2,
  LineChart,
  Scale,
  Layers,
  Zap,
} from "lucide-react"

import { getPayloadClient } from "@/lib/payload"
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

const iconMap: Record<string, any> = {
  Briefcase,
  TrendingUp,
  Shield,
  Users,
  Target,
  Building2,
  LineChart,
  Scale,
  Layers,
  Zap,
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const services = await payload.find({
    collection: "services",
    limit: 100,
    select: {
      slug: true,
    },
  })

  return services.docs.map((doc) => ({
    slug: doc.slug,
  }))
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: "services",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const service = result.docs[0]

  if (!service) notFound()

  const Icon = iconMap[service.icon as string] || Briefcase

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <PageHero
        eyebrow="الخدمات"
        title={service.title}
        description={service.shortDescription || ""}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "خدماتنا", href: "/services" },
          { label: service.title },
        ]}
        actions={
          <Button
            asChild
            className="bg-[#b9995a] text-white hover:bg-[#a88648] transition-all duration-300 shadow-lg shadow-gold/20"
          >
            <Link href="/request-quote">
              طلب عرض سعر
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        }
      />

      {/* Main Content Area */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Sidebar (Appears on left in RTL) */}
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <div className="sticky top-28 space-y-8">
                
                {/* Quick Contact Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl shadow-gray-100/50">
                  <div className="mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#b9995a]">تواصل مباشر</span>
                    <h3 className="mt-2 font-display text-2xl font-bold text-[#172946]">طلب استشارة سريعة</h3>
                  </div>

                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="s-name" className="text-[#172946]/70">الاسم بالكامل</Label>
                      <Input id="s-name" placeholder="محمد أحمد" className="border-gray-200 focus:border-[#b9995a] focus:ring-[#b9995a]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="s-email" className="text-[#172946]/70">البريد الإلكتروني</Label>
                      <Input id="s-email" type="email" placeholder="name@company.com" dir="ltr" className="border-gray-200 focus:border-[#b9995a] focus:ring-[#b9995a]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="s-company" className="text-[#172946]/70">الشركة / الجهة</Label>
                      <Input id="s-company" placeholder="اسم الشركة" className="border-gray-200 focus:border-[#b9995a] focus:ring-[#b9995a]" />
                    </div>
                    <Button className="w-full h-12 bg-[#172946] text-white hover:bg-[#1e3458] transition-colors">
                      إرسال الطلب
                    </Button>
                  </form>
                </div>

                {/* Service Specs Card */}
                <div className="rounded-2xl bg-[#172946] p-8 text-white">
                  <h4 className="font-display text-xl font-bold text-[#b9995a] mb-6">تفاصيل الخدمة</h4>
                  <ul className="space-y-5">
                    <li className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-gray-400 text-sm">السعر التقديري</span>
                      <span className="font-bold">{service.startingPrice || "حسب المتطلبات"}</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-gray-400 text-sm">المدة المتوقعة</span>
                      <span className="font-bold">{service.duration || "مرنة"}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">نوع التعاقد</span>
                      <span className="font-bold">مؤسسي / سنوي</span>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Content Area (Appears on right in RTL) */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#b9995a]/10 text-[#b9995a]">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-widest text-[#b9995a]">نظرة عامة على الخدمة</span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-[#172946] mt-1">تطوير الأعمال بذكاء</h2>
                </div>
              </div>

              {/* Rich Text Description */}
              <div className="prose prose-lg prose-slate max-w-none mb-16 text-[#172946]/80 leading-relaxed">
                {/* Fallback description if rich text is complex, we can use a renderer here */}
                {typeof service.description === 'string' ? service.description : "نقدّم حلولاً متكاملة تضمن لشركتكم التميّز والريادة في السوق المحلي، عبر منهجيات علمية وخبرات واقعية."}
              </div>

              {/* Benefits Grid */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="mb-16">
                  <h3 className="text-2xl font-display font-bold text-[#172946] mb-8 relative inline-block">
                    الفوائد الاستراتيجية
                    <span className="absolute -bottom-2 right-0 w-12 h-1 bg-[#b9995a]"></span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.benefits.map((benefit: any, idx: number) => (
                      <div key={idx} className="group p-6 rounded-2xl border border-gray-100 bg-white hover:border-[#b9995a]/30 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#b9995a]/20 text-[#b9995a]">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#172946] mb-2">{benefit.title}</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deliverables / Process */}
              {service.process && service.process.length > 0 && (
                <div className="rounded-3xl bg-gray-50 p-8 md:p-12 border border-gray-100">
                  <h3 className="text-2xl font-display font-bold text-[#172946] mb-10">منهجية العمل والخطوات</h3>
                  <div className="space-y-8">
                    {service.process.map((step: any, idx: number) => (
                      <div key={idx} className="flex gap-6 relative">
                        {idx !== service.process.length - 1 && (
                          <div className="absolute top-10 right-[15px] w-[2px] h-full bg-gray-200"></div>
                        )}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#172946] text-[#b9995a] font-display font-bold text-sm z-10">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#172946] text-lg mb-2">{step.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#172946] py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#b9995a]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">هل أنت جاهز لبدء التحوّل؟</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">نحن هنا لمساعدتكم في تحقيق أهدافكم المؤسسية عبر حلول مبتكرة ومخصصة.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#b9995a] text-white hover:bg-[#a88648] px-10 h-14 text-lg">
              ابدأ الآن
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-10 h-14 text-lg">
              عرض الخدمات الأخرى
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

