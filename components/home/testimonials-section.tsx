"use client"

import React, { useCallback } from "react"
import { Quote, Star, ChevronRight, ChevronLeft } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote:
      "تعامل إتحاد الريادة كان نقلة نوعية. خلال 90 يوماً فقط، أعادوا هيكلة صيانة مرافقنا ووفّروا 28% من التكاليف التشغيلية دون التأثير على جودة الخدمة.",
    author: "م. عبدالله الراشد",
    role: "مدير العمليات",
    company: "مجموعة الخليج اللوجستية",
    initials: "ع.ر",
    stars: 5,
  },
  {
    quote:
      "فريق احترافي ومتفهم لمتطلبات السوق السعودي. أعدّوا لنا خطة تشغيلية متكاملة ساعدتنا في رفع كفاءة المباني الإدارية بنسبة 40% خلال السنة الأولى.",
    author: "أ. نورة السبيعي",
    role: "رئيس المرافق",
    company: "تراست العقارية",
    initials: "ن.س",
    stars: 5,
  },
  {
    quote:
      "من أفضل قرارات التعاقد التي اتخذناها. الشفافية في التقارير، وسرعة الاستجابة في حالات الطوارئ، وفريق عمل مخلص—كل شيء يسير بمنتهى الاحترافية.",
    author: "د. فهر العتيبي",
    role: "المدير العام",
    company: "مستشفى الرعاية",
    initials: "ف.ع",
    stars: 5,
  },
]

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: "rtl",
  })

  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  return (
    <section id="testimonials" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              آراء العملاء
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
              ثقة نعتز بها من شركاء النجاح
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              نفخر بخدمة أكثر من 350 عميلاً في مختلف القطاعات. نجاحنا يُقاس برضاكم واستدامة مرافقكم.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <Button
                onClick={scrollNext}
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-border bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              <Button
                onClick={scrollPrev}
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-border bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <div className="ms-4 flex items-center gap-2">
                <span className="text-2xl font-black text-primary">0{selectedIndex + 1}</span>
                <span className="h-px w-8 bg-border" />
                <span className="text-sm font-bold text-muted-foreground">0{testimonials.length}</span>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((item, i) => (
                  <div key={i} className="flex-[0_0_100%] min-w-0 pl-4">
                    <div className="relative rounded-3xl border border-border bg-card/50 p-10 md:p-14 backdrop-blur-md shadow-premium transition-all duration-500">
                      <Quote
                        aria-hidden="true"
                        className="absolute -top-6 left-12 h-16 w-16 text-primary/10 fill-primary/10"
                      />
                      <div className="flex items-center gap-1.5 mb-8">
                        {Array.from({ length: item.stars }).map((_, si) => (
                          <Star key={si} className="h-5 w-5 text-primary fill-primary" />
                        ))}
                      </div>
                      <p className="font-display text-2xl font-bold leading-relaxed text-foreground md:text-3xl md:leading-[1.4]">
                        "{item.quote}"
                      </p>
                      <div className="mt-12 flex items-center gap-5 border-t border-border/50 pt-10">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-display text-lg font-black shadow-lg">
                          {item.initials}
                        </div>
                        <div>
                          <p className="font-display text-xl font-black text-foreground">
                            {item.author}
                          </p>
                          <p className="text-base font-medium text-primary">
                            {item.role} — {item.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -z-10 -bottom-6 -left-6 h-full w-full rounded-3xl border border-primary/10 bg-primary/5" />
          </div>
        </div>
      </div>
    </section>
  )
}
