import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpLeft, Building2, Calendar, MapPin, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { projects } from "@/lib/sample-data"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const related = projects.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={project.sector}
        title={project.title}
        description={project.summary}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "أعمالنا", href: "/portfolio" },
          { label: project.title },
        ]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-sm">
            <Image src={project.image} alt={project.title} fill sizes="100vw" className="object-cover" priority />
          </div>

          <div className="mb-16 grid gap-6 border-y border-[var(--brand-border)] py-8 md:grid-cols-4">
            <div className="flex items-start gap-3">
              <Building2 className="mt-1 h-5 w-5 text-[var(--brand-gold)]" />
              <div>
                <div className="text-[12px] text-[var(--brand-muted)]">العميل</div>
                <div className="text-[14px] font-semibold text-[var(--brand-navy)]">{project.client}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="mt-1 h-5 w-5 text-[var(--brand-gold)]" />
              <div>
                <div className="text-[12px] text-[var(--brand-muted)]">المدة</div>
                <div className="text-[14px] font-semibold text-[var(--brand-navy)]">{project.duration}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-[var(--brand-gold)]" />
              <div>
                <div className="text-[12px] text-[var(--brand-muted)]">الموقع</div>
                <div className="text-[14px] font-semibold text-[var(--brand-navy)]">{project.location}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="mt-1 h-5 w-5 text-[var(--brand-gold)]" />
              <div>
                <div className="text-[12px] text-[var(--brand-muted)]">السنة</div>
                <div className="text-[14px] font-semibold text-[var(--brand-navy)]">{project.year}</div>
              </div>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <article className="space-y-10">
              <div>
                <h2 className="mb-4 font-serif text-[28px] text-[var(--brand-navy)]">التحدي</h2>
                <p className="text-[16px] leading-[1.9] text-[var(--brand-muted)]">{project.challenge}</p>
              </div>

              <div>
                <h2 className="mb-4 font-serif text-[28px] text-[var(--brand-navy)]">المنهجية</h2>
                <ul className="space-y-3">
                  {project.approach.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-[1.8] text-[var(--brand-muted)]">
                      <span className="mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-[var(--brand-gold)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[var(--brand-border)] pt-10">
                <h2 className="mb-6 font-serif text-[28px] text-[var(--brand-navy)]">النتائج</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {project.outcomes.map((o, i) => (
                    <div key={i} className="border-t-2 border-[var(--brand-gold)] bg-[var(--brand-cream)] p-6">
                      <div className="mb-2 font-serif text-[32px] text-[var(--brand-navy)]">0{i + 1}</div>
                      <p className="text-[14px] leading-[1.7] text-[var(--brand-navy)]">{o}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="border border-[var(--brand-border)] bg-[var(--brand-cream)] p-6">
                <h3 className="mb-4 text-[14px] font-semibold text-[var(--brand-navy)]">نطاق العمل</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span key={t} className="rounded-full bg-white px-3 py-1 text-[12px] text-[var(--brand-navy)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--brand-navy)] p-6 text-white">
                <h3 className="mb-2 text-[17px] font-semibold">مشروع مشابه؟</h3>
                <p className="mb-4 text-[13px] leading-[1.7] text-white/70">
                  نحن على استعداد لمناقشة احتياجات مؤسستك وبناء خارطة طريق ملائمة.
                </p>
                <Button
                  asChild
                  className="h-11 w-full bg-[var(--brand-gold)] text-white hover:bg-[#a88648]"
                >
                  <Link href="/request-quote">اطلب عرض أسعار</Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--brand-border)] bg-[var(--brand-cream)] py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="mb-10 font-serif text-[32px] text-[var(--brand-navy)]">مشاريع ذات صلة</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group overflow-hidden rounded-sm bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={p.image} alt={p.title} fill sizes="33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="mb-1 text-[11px] text-[var(--brand-gold)]">{p.sector}</div>
                  <h3 className="mb-3 text-[16px] font-semibold text-[var(--brand-navy)] group-hover:text-[var(--brand-gold)]">{p.title}</h3>
                  <div className="flex items-center gap-1 text-[13px] font-medium text-[var(--brand-navy)] group-hover:text-[var(--brand-gold)]">
                    اقرأ الحالة <ArrowUpLeft className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
