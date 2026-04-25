import Link from "next/link"
import { ArrowLeft, Calendar, Newspaper, FileText, Tag } from "lucide-react"

const articles = [
  {
    tag: "رؤى قطاعية",
    date: "12 أبريل 2026",
    title: "خمس منهجيات مثبتة لتسريع التحوّل الرقمي في الشركات العائلية",
    href: "/blog/digital-transformation",
    icon: Tag,
  },
  {
    tag: "أخبار الشركة",
    date: "5 أبريل 2026",
    title: "مَراسي تفتتح مكتباً إقليمياً جديداً في دبي لتعزيز حضورها الخليجي",
    href: "/news/dubai-office",
    icon: Newspaper,
  },
  {
    tag: "تقرير سنوي",
    date: "1 مارس 2026",
    title: "تقرير 2026: خارطة النمو للشركات المتوسطة في المنطقة العربية",
    href: "/library/growth-report-2026",
    icon: FileText,
  },
]

export function InsightsSection() {
  return (
    <section className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-7xl container-px">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              رؤى، أخبار، ومقالات
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-balance text-foreground md:text-4xl">
              محتوى يُثري قرارات أعمالك
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="rounded-full border border-[var(--brand-navy)]/15 bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-background hover:text-foreground"
            >
              المدونة
            </Link>
            <Link
              href="/news"
              className="rounded-full border border-[var(--brand-navy)]/15 bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-background hover:text-foreground"
            >
              أخبار الشركة
            </Link>
            <Link
              href="/library"
              className="rounded-full border border-[var(--brand-navy)]/15 bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-background hover:text-foreground"
            >
              مكتبة الملفات
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((article) => {
            const Icon = article.icon
            return (
              <Link
                key={article.href}
                href={article.href}
                className="group flex flex-col rounded-2xl border border-border bg-background p-7 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-premium"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    <Icon className="h-3 w-3" />
                    {article.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {article.date}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold leading-snug text-foreground text-balance">
                  {article.title}
                </h3>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-foreground transition group-hover:text-primary">
                  اقرأ المقال
                  <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
