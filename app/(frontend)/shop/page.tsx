import Link from "next/link"
import { ShoppingBag, ArrowLeft } from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { ShopGrid } from "@/components/shop/shop-grid"
import { Button } from "@/components/ui/button"
import { getPayloadClient } from "@/lib/payload"

export const metadata = {
  title: "متجر الباقات والخدمات",
  description: "اختر الباقة المناسبة لشركتك وابدأ العمل فوراً. باقات احترافية مصممة لمتطلبات الشركات.",
}

export const revalidate = 3600 // Revalidate the shop every hour

export default async function ShopPage() {
  const payload = await getPayloadClient()

  const { docs: products } = await payload.find({
    collection: "products",
    where: { isActive: { equals: true } },
    sort: "-isFeatured",
    limit: 100,
  })

  const { docs: categories } = await payload.find({
    collection: "categories",
    limit: 50,
  })

  const { docs: brands } = await payload.find({
    collection: "brands",
    limit: 50,
  })

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

      <ShopGrid
        initialProducts={products}
        categories={categories}
        brands={brands}
      />

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
