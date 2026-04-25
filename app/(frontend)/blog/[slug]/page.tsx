import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpLeft, Clock, Share2 } from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { posts } from "@/lib/sample-data"

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = posts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3)
  const fallback = posts.filter((p) => p.slug !== slug).slice(0, 3)
  const suggestions = related.length ? related : fallback

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المدونة", href: "/blog" },
          { label: post.title.slice(0, 40) + "…" },
        ]}
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-[var(--brand-border)] py-5 text-[13px]">
            <span className="font-semibold text-[var(--brand-navy)]">{post.author}</span>
            <span className="text-[var(--brand-muted)]">— {post.authorRole}</span>
            <span className="mx-2 h-4 w-px bg-[var(--brand-border)]" />
            <span className="text-[var(--brand-muted)]">{post.date}</span>
            <span className="mx-2 h-4 w-px bg-[var(--brand-border)]" />
            <span className="flex items-center gap-1.5 text-[var(--brand-muted)]"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
            <span className="mr-auto flex items-center gap-1.5 text-[var(--brand-navy)]"><Share2 className="h-3.5 w-3.5" /> مشاركة</span>
          </div>

          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-sm">
            <Image src={post.image} alt={post.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" priority />
          </div>

          <article className="space-y-6 text-[17px] leading-[1.9] text-[var(--brand-ink)]">
            {post.content.map((p, i) => (
              <p key={i} className={i === 0 ? "text-[18px] font-medium text-[var(--brand-navy)]" : ""}>{p}</p>
            ))}
          </article>

          <div className="mt-14 border-t border-[var(--brand-border)] pt-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-navy)] font-serif text-[18px] text-white">
                {post.author.split(" ")[0][0]}
              </div>
              <div>
                <div className="text-[15px] font-semibold text-[var(--brand-navy)]">{post.author}</div>
                <div className="text-[13px] text-[var(--brand-muted)]">{post.authorRole}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--brand-border)] bg-[var(--brand-cream)] py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="mb-10 font-serif text-[32px] text-[var(--brand-navy)]">مقالات ذات صلة</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {suggestions.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-sm">
                  <Image src={p.image} alt={p.title} fill sizes="33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="mb-2 text-[12px] text-[var(--brand-gold)]">{p.category}</div>
                <h3 className="mb-3 text-[17px] font-semibold text-[var(--brand-navy)] group-hover:text-[var(--brand-gold)]">{p.title}</h3>
                <div className="flex items-center gap-1 text-[13px] font-medium text-[var(--brand-navy)] group-hover:text-[var(--brand-gold)]">
                  اقرأ المقال <ArrowUpLeft className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
