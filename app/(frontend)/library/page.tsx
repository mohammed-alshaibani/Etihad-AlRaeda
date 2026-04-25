import { BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { ResourceCard } from "@/components/library/resource-card"
import { getPayloadClient } from "@/lib/payload"

export const metadata = {
  title: "مكتبة الموارد | تقارير وأدلة تنفيذية",
  description: "تقارير وأدلة عملية وأوراق بحثية للقيادات التنفيذية.",
}

export default async function LibraryPage() {
  const payload = await getPayloadClient()
  
  const { docs: resources } = await payload.find({
    collection: "resources",
    sort: "-publishedAt",
    limit: 100,
  })

  // Group types for filter
  const types = Array.from(new Set(resources.map((r) => r.type)))

  return (
    <>
      <PageHero
        eyebrow="مكتبة الموارد"
        title="مرجعك التنفيذي لصياغة القرار"
        description="اطّلع على تقاريرنا التنفيذية، أدلتنا العملية، وأوراقنا البحثية المستخلصة من عملنا مع كبار العملاء."
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "مكتبة الموارد" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl container-px">
          {/* Filters - Simplified for now, can add interactive filtering later */}
          <div className="mb-10 flex flex-wrap gap-2">
            <button className="rounded-full border border-[var(--brand-navy)] bg-[var(--brand-navy)] px-5 py-2 text-[13px] font-bold text-white transition-all">
              جميع الموارد
            </button>
            {types.map((t) => (
              <button key={t} className="rounded-full border border-border bg-white px-5 py-2 text-[13px] font-bold text-muted-foreground transition-all hover:border-primary hover:text-primary">
                {t}
              </button>
            ))}
          </div>

          {resources.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((r) => (
                <ResourceCard key={r.id} resource={r as any} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-border py-20 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
              <p className="text-lg font-medium text-muted-foreground">لا توجد موارد متاحة حالياً.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 container-px lg:flex-row lg:items-center">
          <div className="flex-1 rounded-2xl border border-border bg-background p-8 shadow-sm md:p-12">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-7 w-7" />
            </div>
            <h3 className="mb-4 font-display text-3xl font-bold leading-tight text-foreground">
              اشترك في نشرتنا الشهرية
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              تصلك كل شهر أبرز رؤانا التنفيذية وتقاريرنا الحديثة قبل نشرها للعموم. انضم لأكثر من 5,000 قيادي تنفيذي.
            </p>
            <form className="flex flex-col gap-3 sm:flex-row" action="/api/subscribe">
              <input
                type="email"
                name="email"
                required
                placeholder="بريدك الإلكتروني المؤسسي"
                dir="ltr"
                className="h-12 flex-1 rounded-lg border border-border bg-background px-4 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
              <Button type="submit" size="lg" className="h-12 px-8 text-base font-bold">
                اشترك الآن
              </Button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">
              نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
