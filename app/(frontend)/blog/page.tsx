import Image from "next/image"
import Link from "next/link"
import { ArrowUpLeft, Clock } from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { posts } from "@/lib/sample-data"

export const metadata = {
  title: "المدونة | رؤى وتحليلات تنفيذية",
  description: "مقالات وتحليلات تنفيذية حول الاستراتيجية، التحول الرقمي، والقيادة المؤسسية.",
}

const categories = ["الكل", "استراتيجية", "تحول رقمي", "رأس المال البشري", "حوكمة", "عمليات", "تجربة عملاء"]

export default function BlogPage() {
  const [featured, ...rest] = posts

  return (
    <>
      <PageHero
        eyebrow="المدونة والرؤى"
        title="تحليلات تنفيذية وأفكار تصنع الفارق"
        description="نشارك خلاصة عملنا مع كبار العملاء في المنطقة، ومستجدات الفكر الإداري العالمي."
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "المدونة" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-16 grid gap-8 overflow-hidden rounded-sm bg-[var(--brand-cream)] lg:grid-cols-2"
          >
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Image src={featured.image} alt={featured.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="mb-4 flex items-center gap-3 text-[12px]">
                <span className="bg-[var(--brand-gold)] px-3 py-1 text-white">مقال مميّز</span>
                <span className="text-[var(--brand-muted)]">{featured.category}</span>
              </div>
              <h2 className="mb-4 font-serif text-[30px] leading-[1.3] text-[var(--brand-navy)] md:text-[36px]">{featured.title}</h2>
              <p className="mb-6 text-[16px] leading-[1.8] text-[var(--brand-muted)]">{featured.excerpt}</p>
              <div className="mb-6 flex items-center gap-4 text-[13px] text-[var(--brand-muted)]">
                <span className="font-semibold text-[var(--brand-navy)]">{featured.author}</span>
                <span>•</span>
                <span>{featured.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[var(--brand-navy)] group-hover:text-[var(--brand-gold)]">
                اقرأ المقال كاملاً <ArrowUpLeft className="h-4 w-4" />
              </div>
            </div>
          </Link>

          <div className="mb-12 flex flex-wrap gap-2">
            {categories.map((c, i) => (
              <button
                key={c}
                className={`rounded-full border px-4 py-2 text-[13px] font-medium transition ${
                  i === 0
                    ? "border-[var(--brand-navy)] bg-[var(--brand-navy)] text-white"
                    : "border-[var(--brand-border)] bg-white text-[var(--brand-navy)] hover:border-[var(--brand-navy)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-sm bg-[var(--brand-gray-soft)]">
                  <Image src={p.image} alt={p.title} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="mb-3 flex items-center gap-2 text-[12px]">
                  <span className="text-[var(--brand-gold)]">{p.category}</span>
                  <span className="text-[var(--brand-muted)]">•</span>
                  <span className="text-[var(--brand-muted)]">{p.readTime}</span>
                </div>
                <h3 className="mb-3 text-[19px] font-semibold leading-[1.4] text-[var(--brand-navy)] group-hover:text-[var(--brand-gold)]">
                  {p.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-[14px] leading-[1.7] text-[var(--brand-muted)]">{p.excerpt}</p>
                <div className="flex items-center justify-between border-t border-[var(--brand-border)] pt-4 text-[12px] text-[var(--brand-muted)]">
                  <span className="font-medium text-[var(--brand-navy)]">{p.author}</span>
                  <span>{p.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
