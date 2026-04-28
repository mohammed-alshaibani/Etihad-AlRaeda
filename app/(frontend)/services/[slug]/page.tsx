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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: "products",
      where: { slug: { equals: slug } },
      limit: 1,
    })

    const service = result.docs[0]
    if (!service) return { title: "Service Not Found | Etihad AlRaeda" }

    return {
      title: `${service.name} | Etihad AlRaeda Services`,
      description: service.description || "",
    }
  } catch (error) {
    console.error("Error in generateMetadata (services):", error)
    return { title: "Services | Etihad AlRaeda" }
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const services = await payload.find({
      collection: "products",
      limit: 100,
      select: {
        slug: true,
      },
    })

    return services.docs.map((doc) => ({
      slug: doc.slug,
    }))
  } catch (error) {
    console.error("Error in generateStaticParams (services):", error)
    return []
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let service: any = null

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: "products",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })
    service = result.docs[0]
  } catch (error) {
    console.error("Error fetching service detail:", error)
  }

  if (!service) notFound()

  // Dynamic icon based on category (1: FM, 2: Tech, 3: Security)
  const categoryId = typeof service.category === 'object' ? service.category.id : service.category
  let Icon = Building2
  if (categoryId === 2) Icon = Zap
  if (categoryId === 3) Icon = Shield

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHero
        eyebrow="خدماتنا"
        title={service.name}
        description={service.description || "منظومة حلول متكاملة لكل مرحلة في رحلة أعمالك"}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "خدماتنا", href: "/#services" },
          { label: service.name },
        ]}
        actions={
          <Button
            asChild
            className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-premium"
          >
            <Link href="/request-quote">
              طلب عرض سعر
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        }
      />

      {/* Main Content Area */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        {/* Subtle Background pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Content Area - Full Width since sidebar is removed */}
            <div className="lg:col-span-12">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-premium-lg">
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-primary">تفاصيل الخدمة</span>
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white mt-1 leading-tight">{service.name}</h2>
                </div>
              </div>

              {/* Rich Text Description */}
              {service.description && (
                <div className="prose prose-lg prose-invert max-w-none mb-20 text-foreground/80 leading-relaxed font-normal">
                  {service.description}
                </div>
              )}

              {/* Official Sub-Services (Tags) */}
              <div className="mb-20">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-10 relative inline-block">
                  الخدمات والحلول المتاحة
                  <span className="absolute -bottom-3 right-0 w-16 h-1 rounded-full bg-primary"></span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {(service.tags || []).map((t: any, idx: number) => (
                    <div key={idx} className="group p-8 rounded-3xl border border-border/50 bg-card/20 hover:border-primary/30 transition-all duration-500 hover:bg-card/40 backdrop-blur-sm">
                      <div className="flex items-center gap-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <Check className="h-5 w-5" strokeWidth={3} />
                        </div>
                        <h4 className="font-bold text-white text-lg group-hover:text-primary transition-colors">
                          {typeof t === 'string' ? t : (t.tag || "")}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-navy-900 py-24 md:py-32 relative overflow-hidden border-t border-border/50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight">هل أنت جاهز لبدء التحوّل؟</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto mb-12 text-lg md:text-xl font-normal leading-relaxed">نحن هنا لمساعدتكم في تحقيق أهدافكم المؤسسية عبر حلول مبتكرة ومخصصة تلبي تطلعاتكم.</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 px-12 h-16 text-lg font-bold rounded-2xl shadow-premium">
              <Link href="/request-quote">ابدأ الآن</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border text-white hover:bg-white/5 px-12 h-16 text-lg font-bold rounded-2xl">
              <Link href="/#services">عرض الخدمات الأخرى</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

