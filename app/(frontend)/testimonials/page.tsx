import { PageHero } from "@/components/page-hero"
import { getPayloadClient } from "@/lib/payload"
import { Quote, Star } from "lucide-react"

export const metadata = {
  title: "آراء العملاء",
  description: "ماذا يقول شركاؤنا عن تجربة العمل مع مَراسي.",
}

export default async function TestimonialsPage() {
  const payload = await getPayloadClient()

  const { docs: testimonials } = await payload.find({
    collection: "testimonials",
    sort: "-createdAt",
    limit: 100,
  })

  return (
    <>
      <PageHero
        eyebrow="قالوا عنا"
        title="شهادات نعتز بها من شركاء النجاح"
        description="ثقة عملائنا هي الوقود الذي يحركنا لتقديم الأفضل دائماً."
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "آراء العملاء" }]}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl container-px">
          <div className="columns-1 gap-8 md:columns-2 lg:columns-3 space-y-8">
            {testimonials.map((t) => (
              <div 
                key={t.id} 
                className="break-inside-avoid rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:shadow-premium"
              >
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--brand-gold)] text-[var(--brand-gold)]" />
                  ))}
                </div>
                
                <Quote className="mb-4 h-10 w-10 text-primary opacity-10" />
                
                <p className="relative z-10 text-[16px] font-medium leading-[1.8] text-[var(--brand-navy)]">
                  "{t.content}"
                </p>
                
                <div className="mt-8 flex items-center gap-4">
                  {t.avatar && typeof t.avatar === 'object' && 'url' in t.avatar ? (
                    <img 
                      src={t.avatar.url as string} 
                      alt={t.name} 
                      className="h-14 w-14 rounded-full object-cover border-2 border-primary/20" 
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-display font-bold text-[var(--brand-navy)]">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.jobTitle}</p>
                    <p className="mt-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 rounded-3xl border border-primary/20 bg-primary/5 p-12 text-center">
             <h3 className="font-display text-2xl font-bold text-[var(--brand-navy)]">هل تريد البدء في قصة نجاحك الخاصة؟</h3>
             <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                نحن هنا لنساعدك على تحقيق أهدافك المؤسسية عبر حلولنا المتكاملة.
             </p>
             <div className="mt-8">
                <a href="/request-quote" className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-white transition hover:bg-primary/90">
                   ابدأ الآن
                </a>
             </div>
          </div>
        </div>
      </section>
    </>
  )
}
