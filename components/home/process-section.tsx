import { ClipboardList, Workflow, Rocket, LineChart } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "زيارة الموقع والمعاينة",
    desc: "نقوم بزيارة ميدانية لمنشأتك لفهم المتطلبات والوضع الحالي بدقة.",
  },
  {
    icon: Workflow,
    title: "تحليل الاحتياجات",
    desc: "دراسة شاملة للمتطلبات وتحديد أفضل الحلول التي تضمن الكفاءة والفعالية.",
  },
  {
    icon: Rocket,
    title: "إعداد العرض الفني والمالي",
    desc: "تقديم مقترح متكامل يوضح خطة العمل، التكلفة، والجدول الزمني بوضوح.",
  },
  {
    icon: LineChart,
    title: "التنفيذ والتشغيل",
    desc: "البدء الفوري في التنفيذ عبر فريق متخصص مع ضمان الالتزام بأعلى معايير الجودة.",
  },
  {
    icon: ClipboardList,
    title: "المتابعة والصيانة المستمرة",
    desc: "دعم مستمر وصيانة دورية لضمان استمرارية التشغيل بكفاءة عالية وبدون انقطاع.",
  },
]

export function ProcessSection() {
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
            إطار عمل موثّق في أربع مراحل
          </h2>
          <p className="mt-4 text-lg font-normal text-foreground/70 leading-relaxed">
            نعتمد منهجية مستوحاة من أفضل الممارسات الدولية، مصمّمة خصيصاً
            لضمان تسليم مشاريعك بأعلى جودة وأقل مخاطر ممكنة.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <li key={step.title} className="relative">
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute right-6 top-6 hidden h-px w-[calc(100%-1.5rem)] -translate-y-px bg-gradient-to-l from-transparent via-white/20 to-transparent lg:block"
                  />
                )}
                <div className="flex items-center gap-4">
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-4xl font-extrabold text-foreground/10">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-base font-normal leading-relaxed text-foreground/70">
                  {step.desc}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
