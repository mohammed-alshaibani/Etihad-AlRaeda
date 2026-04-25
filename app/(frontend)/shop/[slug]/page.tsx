import { notFound } from "next/navigation"
import { Check, ShieldCheck, Truck, Clock, ArrowRight, ShoppingCart, Zap, Star } from "lucide-react"
import Link from "next/link"

import { getPayloadClient } from "@/lib/payload"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { AddToCartButton } from "./add-to-cart-button"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

function formatPrice(amount: number, currency = "SAR") {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

const billingLabel: Record<string, string> = {
  "one-time": "مرة واحدة",
  monthly: "/ شهر",
  yearly: "/ سنة",
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs: products } = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const product = products[0]

  if (!product) {
    notFound()
  }

  const gallery = (product.gallery as any[]) || []
  const features = (product.features as any[]) || []

  return (
    <>
      <PageHero
        eyebrow={product.category || "باقة مؤسسية"}
        title={product.name}
        description={product.tagline || ""}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المتجر", href: "/shop" },
          { label: product.name },
        ]}
      />

      <section className="bg-white py-14 md:py-24">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left: Content */}
            <div className="lg:col-span-7">
              <div className="prose prose-lg prose-slate max-w-none text-right">
                <h2 className="font-display text-3xl font-bold text-[var(--brand-navy)]">تفاصيل الباقة</h2>
                <div className="mt-6 text-[17px] leading-[1.8] text-muted-foreground">
                   {/* This would normally be rendered rich text, using a placeholder for now if description is complex */}
                   <div dangerouslySetInnerHTML={{ __html: product.description ? "الوصف التفصيلي للباقة وما تشمله من خدمات ومعايير تنفيذ عالية الجودة." : "" }} />
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-muted/30 p-6">
                    <Clock className="h-8 w-8 text-[var(--brand-gold)]" />
                    <h3 className="mt-4 font-display text-lg font-bold">مدة التنفيذ</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      يتم البدء خلال 48 ساعة من تأكيد الطلب. مدة التسليم المتوقعة: {product.deliveryDays || 5} أيام عمل.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/30 p-6">
                    <ShieldCheck className="h-8 w-8 text-[var(--brand-gold)]" />
                    <h3 className="mt-4 font-display text-lg font-bold">ضمان مَراسي</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      نلتزم بأعلى معايير الجودة العالمية في التنفيذ مع دعم فني متواصل طوال مدة العقد.
                    </p>
                  </div>
                </div>

                <div className="mt-16">
                  <h3 className="font-display text-2xl font-bold text-[var(--brand-navy)]">ما الذي ستحصل عليه؟</h3>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {features.map((f, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl border border-border p-4">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--brand-gold)]" strokeWidth={3} />
                        <span className="text-[15px] font-medium text-[var(--brand-navy)]">{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {gallery.length > 0 && (
                <div className="mt-20">
                  <h3 className="font-display text-2xl font-bold text-[var(--brand-navy)] mb-8">معرض الصور</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {gallery.map((item, i) => (
                      <div key={i} className="aspect-video overflow-hidden rounded-2xl border border-border">
                        <img 
                          src={item.image.url} 
                          alt={`${product.name} gallery ${i}`} 
                          className="h-full w-full object-cover transition hover:scale-105" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Pricing Sidebar */}
            <aside className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-3xl border border-border bg-card p-8 shadow-premium-lg">
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--brand-gold)]">
                    <Star className="h-4 w-4 fill-[var(--brand-gold)]" />
                    باقة معتمدة من مَراسي
                  </div>
                  
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-5xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-lg text-muted-foreground font-medium">
                      {billingLabel[product.billingCycle as string] || "مرة واحدة"}
                    </span>
                  </div>
                  
                  <p className="mt-4 text-[14px] text-muted-foreground">
                    * جميع الأسعار تشمل ضريبة القيمة المضافة بنسبة 15%.
                  </p>

                  <div className="mt-8 space-y-4">
                    <AddToCartButton 
                      product={{
                        id: product.id,
                        slug: product.slug,
                        name: product.name,
                        price: product.price,
                        currency: product.currency as string,
                        billingCycle: product.billingCycle as string,
                        coverImage: (product.coverImage as any)?.url
                      }} 
                    />
                    
                    <Button variant="outline" size="lg" className="w-full border-border h-14" asChild>
                      <Link href="/request-quote">طلب تخصيص للباقة</Link>
                    </Button>
                  </div>

                  <div className="mt-8 border-t border-border pt-8 space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Zap className="h-5 w-5 text-[var(--brand-gold)]" />
                      <span className="font-medium text-foreground">تفعيل فوري للخدمة</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Truck className="h-5 w-5 text-[var(--brand-gold)]" />
                      <span className="font-medium text-foreground">تسليم المستندات رقمياً</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--brand-gold)]/20 bg-[var(--brand-gold)]/5 p-6">
                  <h4 className="font-display font-bold text-[var(--brand-navy)]">تحتاج مساعدة؟</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    فريق المبيعات جاهز للرد على استفساراتك حول هذه الباقة.
                  </p>
                  <Button variant="link" className="mt-2 p-0 text-[var(--brand-gold)] h-auto font-bold" asChild>
                    <Link href="/contact">تحدث مع استشاري</Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
