import { ClipboardList, Workflow, Rocket, LineChart } from "lucide-react"

export function ProcessSection({ data }: { data?: any }) {
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
  const iconMap = [ClipboardList, Workflow, Rocket, LineChart, ClipboardList];

  return (
    <section className="relative bg-background py-20 text-foreground md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-7xl container-px">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            منهجية العمل
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-balance text-foreground md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg font-normal text-foreground/70 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-8 lg:flex-row lg:overflow-x-auto lg:pb-12 lg:snap-x lg:scrollbar-hide">
          {stepsData.map((step: any, idx: number) => {
            const Icon = iconMap[idx % iconMap.length]
            return (
              <div key={step.title || idx} className="w-full shrink-0 lg:w-[320px] lg:snap-center">
                <div className="group relative h-full rounded-2xl border border-border bg-card/50 p-8 transition-all duration-500 hover:border-primary/50 backdrop-blur-sm">
                  {/* Connector line (desktop only) */}
                  {idx < stepsData.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute left-0 top-12 hidden h-px w-full bg-gradient-to-r from-primary/30 to-transparent lg:block translate-x-1/2 z-0"
                    />
                  )}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-display text-3xl font-extrabold text-foreground/10 transition-colors duration-500 group-hover:text-primary/20">
                        {step.number || `0${idx + 1}`}
                      </span>
                    </div>
                    <h3 className="mt-8 font-display text-xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm font-normal leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

