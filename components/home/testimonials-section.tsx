"use client"

import { useState } from "react"
import { Quote, Star, ChevronRight, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote:
      "تعامل مَراسي كان نقلة نوعية. خلال 90 يوماً فقط، أعادوا هيكلة سلسلة التوريد لدينا ووفّروا 28% من التكاليف التشغيلية دون التأثير على جودة الخدمة.",
    author: "م. عبدالله الراشد",
    role: "الرئيس التنفيذي للعمليات",
    company: "مجموعة الخليج الصناعية",
    initials: "ع.ر",
    stars: 5,
  },
  {
    quote:
      "فريق استشاري عميق في القطاع المالي. أعدّوا لنا نموذج حوكمة متكامل ساعدنا في تجاوز تقييم المطابقة التنظيمية للمرة الأولى.",
    author: "أ. نورة السبيعي",
    role: "رئيس قسم المخاطر",
    company: "بنك الأهلية للاستثمار",
    initials: "ن.س",
    stars: 5,
  },
  {
    quote:
      "من أفضل قرارات الاستعانة بمصدر خارجي اتخذناها. الشفافية في التقارير، ولوحات المتابعة المباشرة، ومدير الحساب المخصّص—كل شيء يعمل بسلاسة.",
    author: "د. فهد العتيبي",
    role: "المدير العام",
    company: "شركة نورا للتقنية",
    initials: "ف.ع",
    stars: 5,
  },
]

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const active = testimonials[index]

  const go = (dir: 1 | -1) => {
    setIndex((prev) =>
      (prev + dir + testimonials.length) % testimonials.length
    )
  }

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              آراء العملاء
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-balance text-foreground md:text-4xl">
              ما يقوله شركاؤنا عن تعاملهم مع مَراسي
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-base">
              شهادات حقيقية من أكثر من 350 عميلاً مؤسسياً في 14 قطاعاً. نقيس
              نجاحنا بنتائج أعمالك.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Button
                onClick={() => go(1)}
                variant="outline"
                size="icon"
                className="border-[var(--brand-navy)]/15 text-foreground"
                aria-label="السابق"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => go(-1)}
                variant="outline"
                size="icon"
                className="border-[var(--brand-navy)]/15 text-foreground"
                aria-label="التالي"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="ms-3 font-display text-sm font-semibold text-muted-foreground">
                0{index + 1}
                <span className="mx-1 text-foreground">/</span>
                0{testimonials.length}
              </span>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div className="relative rounded-2xl border border-border bg-muted p-8 md:p-12">
              <Quote
                aria-hidden="true"
                className="absolute -top-5 right-8 h-14 w-14 text-primary"
                fill="currentColor"
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: active.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-primary"
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="mt-5 font-display text-xl font-semibold leading-relaxed text-foreground text-balance md:text-2xl md:leading-[1.5]">
                {active.quote}
              </p>
              <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background font-display text-sm font-bold text-foreground">
                  {active.initials}
                </span>
                <div>
                  <p className="font-display text-base font-bold text-foreground">
                    {active.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {active.role} — {active.company}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`الشهادة رقم ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-[var(--brand-gray)]/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
