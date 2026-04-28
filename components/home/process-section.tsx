"use client"

import React, { useCallback } from "react"
import { ClipboardList, Workflow, Rocket, LineChart, ChevronRight, ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"

export function ProcessSection({ data }: { data?: any }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    direction: "rtl",
    align: "start",
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

  const title = data?.title || "إطار عمل موثّق في أربع مراحل"
  const description = data?.description || "نعتمد منهجية مستوحاة من أفضل الممارسات الدولية، مصمّمة خصيصاً لضمان تسليم مشاريعك بأعلى جودة وأقل مخاطر ممكنة."

  const stepsData = data?.steps?.length > 0 ? data.steps : [
    {
      title: "زيارة الموقع والمعاينة",
      description: "نقوم بزيارة ميدانية لمنشأتك لفهم المتطلبات والوضع الحالي بدقة.",
    },
    {
      title: "تحليل الاحتياجات",
      description: "دراسة شاملة للمتطلبات وتحديد أفضل الحلول التي تضمن الكفاءة والفعالية.",
    },
    {
      title: "إعداد العرض الفني والمالي",
      description: "تقديم مقترح متكامل يوضح خطة العمل، التكلفة، والجدول الزمني بوضوح.",
    },
    {
      title: "التنفيذ والتشغيل",
      description: "البدء الفوري في التنفيذ عبر فريق متخصص مع ضمان الالتزام بأعلى معايير الجودة.",
    },
  ]

  // Map icons
  const iconMap = [ClipboardList, Workflow, Rocket, LineChart];

  return (
    <section className="relative overflow-hidden bg-background py-24 text-foreground md:py-32">
      {/* Background Grids */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl container-px mb-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-[0.2em] text-primary"
            >
              منهجية العمل
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 font-display text-4xl font-extrabold text-balance text-foreground md:text-5xl"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-xl font-normal text-muted-foreground leading-relaxed"
            >
              {description}
            </motion.p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 md:flex me-4">
              <span className="text-2xl font-black text-primary">0{selectedIndex + 1}</span>
              <span className="h-px w-8 bg-border" />
              <span className="text-sm font-bold text-muted-foreground">0{stepsData.length}</span>
            </div>

            <div className="flex items-center gap-2">
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
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden px-4 md:px-8" ref={emblaRef}>
        <div className="flex gap-8 pb-12 pt-4">
          {stepsData.map((step: any, idx: number) => {
            const Icon = iconMap[idx % iconMap.length]
            return (
              <div
                key={`${step.title}-${idx}`}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_45%] lg:flex-[0_0_400px]"
              >
                <div className="group/card relative h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 transition-all duration-500 hover:border-primary/50 hover:bg-white/[0.07] backdrop-blur-md">
                  <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover/card:scale-110 group-hover/card:bg-primary group-hover/card:text-primary-foreground shadow-lg shadow-primary/5">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-display text-4xl font-black text-foreground/10 transition-colors duration-500 group-hover/card:text-primary/20">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="mt-10 font-display text-2xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-5 whitespace-normal text-base font-normal leading-relaxed text-muted-foreground group-hover/card:text-foreground/80 transition-colors duration-300">
                      {step.description}
                    </p>

                    <div className="mt-8 flex items-center gap-2 text-sm font-bold text-primary opacity-0 -translate-x-4 transition-all duration-500 group-hover/card:opacity-100 group-hover/card:translate-x-0">
                      <span>اكتشف المزيد</span>
                      <ChevronRight className="h-4 w-4 rotate-180" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl container-px mt-16 text-center">
        <p className="text-sm text-muted-foreground/60 italic">
          * نلتزم بالدقة والشفافية في كل خطوة لضمان نجاح مشروعك.
        </p>
      </div>
    </section>
  )
}
