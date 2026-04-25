import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-background py-20 text-foreground md:py-28">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/team-collaboration.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-l from-[var(--brand-navy-900)] via-[var(--brand-navy)] to-[var(--brand-navy)]/90"
      />

      <div className="relative mx-auto max-w-7xl container-px text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          جاهزون للخطوة التالية؟
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight text-balance text-foreground md:text-5xl">
          لنصمّم معاً خارطة طريق أعمالك للعام القادم
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-foreground/75 md:text-base">
          جلسة استكشافية مجانية لمدة 45 دقيقة مع أحد كبار استشاريينا، ستحصل
          بنهايتها على 3 توصيات قابلة للتنفيذ فوراً.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="h-12 bg-primary px-7 text-base font-semibold text-foreground shadow-premium-lg hover:bg-primary/90"
          >
            <Link href="/request-quote">
              طلب عرض سعر
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-foreground/25 bg-foreground/5 px-7 text-base font-semibold text-foreground backdrop-blur hover:bg-foreground/10 hover:text-foreground"
          >
            <Link href="/book-appointment">
              <CalendarDays className="ml-2 h-4 w-4" />
              حجز استشارة مجانية
            </Link>
          </Button>
        </div>

        <ul className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-foreground/60">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            بدون التزام مسبق
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            تقرير توصيات مفصّل
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            اتفاقية سرية (NDA)
          </li>
        </ul>
      </div>
    </section>
  )
}
