import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpLeft, Briefcase, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { careers } from "@/lib/sample-data"

export function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }))
}

export default async function CareerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = careers.find((c) => c.slug === slug)
  if (!job) notFound()

  return (
    <>
      <PageHero
        eyebrow={job.department}
        title={job.title}
        description={job.summary}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الوظائف", href: "/careers" },
          { label: job.title },
        ]}
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="mb-10 grid gap-5 border-y border-[var(--brand-border)] py-6 md:grid-cols-3">
            <div className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-[var(--brand-gold)]" /><span className="text-[14px] text-[var(--brand-navy)]">{job.location}</span></div>
            <div className="flex items-center gap-2.5"><Briefcase className="h-4 w-4 text-[var(--brand-gold)]" /><span className="text-[14px] text-[var(--brand-navy)]">{job.type}</span></div>
            <div className="flex items-center gap-2.5"><Clock className="h-4 w-4 text-[var(--brand-gold)]" /><span className="text-[14px] text-[var(--brand-navy)]">خبرة {job.experience}</span></div>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="mb-4 font-serif text-[26px] text-[var(--brand-navy)]">المهام والمسؤوليات</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-[1.8] text-[var(--brand-ink)]">
                    <span className="mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-[var(--brand-gold)]" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 font-serif text-[26px] text-[var(--brand-navy)]">المتطلبات</h2>
              <ul className="space-y-3">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-[1.8] text-[var(--brand-ink)]">
                    <span className="mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-[var(--brand-gold)]" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-sm bg-[var(--brand-cream)] p-6">
            <div>
              <div className="mb-1 text-[12px] text-[var(--brand-gold)]">جاهز للتقدم؟</div>
              <div className="text-[17px] font-semibold text-[var(--brand-navy)]">أرسل طلبك وسيتواصل فريق الموارد البشرية معك.</div>
            </div>
            <Button asChild className="h-12 bg-[var(--brand-navy)] px-6 text-white hover:bg-[var(--brand-navy-soft)]">
              <Link href="/contact" className="flex items-center gap-2">
                قدّم الآن <ArrowUpLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
