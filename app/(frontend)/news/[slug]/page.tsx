import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpLeft, Calendar } from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { news } from "@/lib/sample-data"

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }))
}

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = news.find((n) => n.slug === slug)
  if (!item) notFound()

  const more = news.filter((n) => n.slug !== slug).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={item.category}
        title={item.title}
        description={item.excerpt}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الأخبار", href: "/news" },
          { label: item.title.slice(0, 30) + "…" },
        ]}
      />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-8 flex items-center gap-4 border-y border-[var(--brand-border)] py-4 text-[13px] text-[var(--brand-muted)]">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{item.date}</span>
            <span className="mx-2 h-4 w-px bg-[var(--brand-border)]" />
            <span>{item.category}</span>
          </div>

          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-sm">
            <Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" priority />
          </div>

          <article className="space-y-5 text-[17px] leading-[1.9] text-[var(--brand-ink)]">
            <p className="text-[18px] font-medium text-[var(--brand-navy)]">{item.excerpt}</p>
            <p>
              يأتي هذا الإعلان في إطار التزامنا المستمر ببناء شراكات استراتيجية ذات قيمة مضافة لعملائنا وفرقنا، وضمن استراتيجية النمو الإقليمية للسنوات الخمس القادمة.
            </p>
            <p>
              نعمل على توسيع قدراتنا في القطاعات ذات الأولوية، وعلى تطوير منصات معرفية جديدة تدعم عمل فرقنا الاستشارية في المنطقة والعالم.
            </p>
            <p>
              وشهدت هذه الفعالية حضوراً لافتاً من قيادات القطاعين العام والخاص، وجرى خلالها استعراض أبرز الاتجاهات الإدارية والاستثمارية في المنطقة.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-[var(--brand-border)] bg-[var(--brand-cream)] py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="mb-10 font-serif text-[30px] text-[var(--brand-navy)]">أخبار أخرى</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {more.map((n) => (
              <Link key={n.slug} href={`/news/${n.slug}`} className="group">
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-sm">
                  <Image src={n.image} alt={n.title} fill sizes="33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="mb-2 text-[11px] text-[var(--brand-gold)]">{n.category}</div>
                <h3 className="mb-3 text-[17px] font-semibold text-[var(--brand-navy)] group-hover:text-[var(--brand-gold)]">{n.title}</h3>
                <div className="flex items-center gap-1 text-[13px] font-medium text-[var(--brand-navy)] group-hover:text-[var(--brand-gold)]">
                  اقرأ الخبر <ArrowUpLeft className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
