import Image from "next/image"
import Link from "next/link"
import { ArrowUpLeft, Calendar } from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { news } from "@/lib/sample-data"

export const metadata = {
  title: "الأخبار والفعاليات",
  description: "أحدث أخبار الشركة وفعالياتها وإعلاناتها المؤسسية.",
}

export default function NewsPage() {
  const [first, ...rest] = news
  return (
    <>
      <PageHero
        eyebrow="الأخبار والفعاليات"
        title="ما الجديد في عالمنا"
        description="تابع أحدث أخبارنا، فعالياتنا، شراكاتنا، وإعلاناتنا المؤسسية."
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "الأخبار" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Link href={`/news/${first.slug}`} className="group mb-12 grid gap-6 overflow-hidden rounded-sm bg-[var(--brand-cream)] lg:grid-cols-5">
            <div className="relative aspect-[4/3] lg:col-span-3 lg:aspect-auto">
              <Image src={first.image} alt={first.title} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-8 lg:col-span-2 lg:p-10">
              <div className="mb-3 flex items-center gap-3 text-[12px]">
                <span className="bg-[var(--brand-gold)] px-3 py-1 text-white">عاجل</span>
                <span className="text-[var(--brand-muted)]">{first.category}</span>
              </div>
              <h2 className="mb-4 font-serif text-[28px] leading-[1.3] text-[var(--brand-navy)]">{first.title}</h2>
              <p className="mb-6 text-[15px] leading-[1.8] text-[var(--brand-muted)]">{first.excerpt}</p>
              <div className="flex items-center gap-4 text-[13px] text-[var(--brand-muted)]">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{first.date}</span>
                <span className="mr-auto flex items-center gap-1 font-semibold text-[var(--brand-navy)] group-hover:text-[var(--brand-gold)]">اقرأ المزيد <ArrowUpLeft className="h-3.5 w-3.5" /></span>
              </div>
            </div>
          </Link>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {rest.map((n) => (
              <Link key={n.slug} href={`/news/${n.slug}`} className="group">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-sm">
                  <Image src={n.image} alt={n.title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="mb-2 flex items-center gap-2 text-[12px] text-[var(--brand-gold)]"><span>{n.category}</span></div>
                <h3 className="mb-3 text-[17px] font-semibold leading-[1.4] text-[var(--brand-navy)] group-hover:text-[var(--brand-gold)]">{n.title}</h3>
                <p className="mb-4 line-clamp-2 text-[13px] leading-[1.7] text-[var(--brand-muted)]">{n.excerpt}</p>
                <div className="flex items-center gap-2 border-t border-[var(--brand-border)] pt-3 text-[12px] text-[var(--brand-muted)]">
                  <Calendar className="h-3 w-3" /> {n.date}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
