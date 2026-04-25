import Link from "next/link"
import { ShoppingBag, ArrowLeft } from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { ProductCard } from "@/components/shop/product-card"
import { Button } from "@/components/ui/button"
import { getPayloadClient } from "@/lib/payload"

export const metadata = {
  title: "متجر الباقات والخدمات",
  description: "اختر الباقة المناسبة لشركتك وابدأ العمل فوراً. باقات احترافية مصممة لمتطلبات الشركات.",
}

const categoryLabels: Record<string, string> = {
  consulting: "استشارات",
  procurement: "توريد",
  training: "تدريب",
  technology: "تقنية",
  legal: "قانوني",
  other: "أخرى",
}

export default async function ShopPage() {
  const payload = await getPayloadClient()

  const { docs: products } = await payload.find({
    collection: "products",
    where: { isActive: { equals: true } },
    sort: "-isFeatured",
    limit: 50,
  })

  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)))

  return (
    <>
      <PageHero
        eyebrow="متجر الباقات"
        title="باقات مؤسسية جاهزة للشراء والتنفيذ"
        description="اختر الباقة التي تناسب احتياجات شركتك، أضفها للسلة، وابدأ رحلة النمو فوراً. جميع الأسعار شاملة لضريبة القيمة المضافة."
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "المتجر" }]}
        actions={
          <Button asChild variant="outline" className="gap-2 border-border">
            <Link href="/request-quote">
              <ArrowLeft className="h-4 w-4" />
              طلب عرض سعر مخصّص
            </Link>
          </Button>
        }
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl container-px">
          {/* Category Filters */}
          {categories.length > 1 && (
            <div className="mb-12 flex flex-wrap gap-2">
              <button className="rounded-full border border-primary bg-primary px-5 py-2 text-[13px] font-bold text-primary-foreground transition-all">
                الكل
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="rounded-full border border-border bg-card px-5 py-2 text-[13px] font-bold text-muted-foreground transition-all hover:border-primary hover:text-primary"
                >
                  {categoryLabels[cat as string] ?? cat}
                </button>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    tagline: product.tagline ?? undefined,
                    price: product.price,
                    currency: product.currency ?? "SAR",
                    billingCycle: product.billingCycle ?? "one-time",
                    badge: product.badge ?? undefined,
                    isFeatured: product.isFeatured ?? false,
                    features: (product.features as any) ?? [],
                    coverImage: typeof product.coverImage === "object" && product.coverImage
                      ? { url: (product.coverImage as any).url }
                      : null,
                    category: product.category ?? undefined,
                    deliveryDays: product.deliveryDays ?? undefined,
                  }}
                />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="rounded-2xl border-2 border-dashed border-border py-24 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
                <ShoppingBag className="h-10 w-10 text-muted-foreground/30" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">لا توجد باقات متاحة حالياً</p>
              <p className="mt-3 text-muted-foreground">يمكنك طلب عرض سعر مخصّص لاحتياجاتك.</p>
              <Button asChild className="mt-8">
                <Link href="/request-quote">طلب عرض سعر</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl container-px">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { label: "ضمان الجودة", sub: "أو استرداد المبلغ" },
              { label: "دعم مخصص", sub: "مدير حساب واحد" },
              { label: "سرية تامة", sub: "NDA مُوقّع افتراضياً" },
              { label: "دفع آمن", sub: "بوابات معتمدة" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-border bg-card p-5">
                <p className="font-display text-[15px] font-bold text-foreground">{item.label}</p>
                <p className="mt-1 text-[12px] text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
