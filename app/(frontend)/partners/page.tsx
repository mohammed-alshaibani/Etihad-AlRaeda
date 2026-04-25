import { PageHero } from "@/components/page-hero"
import { getPayloadClient } from "@/lib/payload"
import { ShieldCheck, Trophy, Globe, Users } from "lucide-react"

export const metadata = {
  title: "شركاء النجاح",
  description: "نفتخر بشراكاتنا الاستراتيجية مع كبرى الجهات الحكومية والخاصة في المملكة والمنطقة.",
}

export default async function PartnersPage() {
  const payload = await getPayloadClient()

  const { docs: partners } = await payload.find({
    collection: "partners",
    sort: "order",
    limit: 100,
  })

  return (
    <>
      <PageHero
        eyebrow="شبكة شركائنا"
        title="ننمو معاً في رحلة التميز"
        description="نفتخر بكوننا شريكاً موثوقاً لأكثر من 150 كياناً مؤسسياً عبر مختلف القطاعات الحيوية."
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "الشركاء" }]}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid gap-16">
            {/* Value Props */}
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { icon: ShieldCheck, title: "ثقة مؤسسية", desc: "نعمل مع كبرى الهيئات الحكومية والوزارات." },
                { icon: Trophy, title: "جودة معتمدة", desc: "نطبق أعلى معايير الجودة العالمية في خدماتنا." },
                { icon: Globe, title: "حضور إقليمي", desc: "شراكات تمتد عبر دول مجلس التعاون الخليجي." },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--brand-navy)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Partners Grid */}
            <div className="rounded-[40px] border border-border bg-muted/30 p-10 md:p-20">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 items-center">
                {partners.map((partner) => (
                  <div 
                    key={partner.id} 
                    className="group relative flex aspect-square items-center justify-center rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-premium hover:-translate-y-1"
                  >
                    {partner.logo && typeof partner.logo === 'object' && 'url' in partner.logo && (
                      <img 
                        src={partner.logo.url as string} 
                        alt={partner.name} 
                        className="max-h-full max-w-full object-contain filter grayscale opacity-60 transition group-hover:grayscale-0 group-hover:opacity-100" 
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action */}
            <div className="flex flex-col items-center justify-center rounded-3xl bg-[var(--brand-navy)] p-12 text-center text-white">
              <Users className="mb-6 h-12 w-12 text-[var(--brand-gold)]" />
              <h2 className="font-display text-3xl font-bold">كن جزءاً من قصة نجاحنا</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
                نحن دائماً منفتحون على الشراكات الاستراتيجية التي تخلق قيمة مضافة للسوق السعودي.
              </p>
              <div className="mt-10 flex gap-4">
                 <a href="/contact" className="rounded-full bg-[var(--brand-gold)] px-8 py-4 font-bold text-white transition hover:bg-[#a88648]">تواصل للشراكة</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
