import Image from "next/image"
import Link from "next/link"
import { Check, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export function AboutSection({ data }: { data?: any }) {
  const eyebrow = data?.eyebrow || "من نحن"
  const title = data?.title || "نُحوّل تعقيدات الأعمال إلى فرص نمو واضحة"

  // Handing lexical richText
  const hasRichDescription = data?.description?.root?.children?.length > 0;

  const highlights = data?.highlights?.length > 0 ? data.highlights : [
    { title: "منهجية مثبتة مبنية على معايير PMI و ISO" },
    { title: "خبراء مصنّفون في كل قطاع رئيسي" },
    { title: "تقارير أداء شهرية ولوحات متابعة مباشرة" },
    { title: "نموذج تسعير شفاف وقابل للتخصيص" },
  ]

  const imageUrl = data?.image?.url || "/images/consulting-meeting.jpg"

  return (
    <section id="about" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 container-px lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src={imageUrl}
              alt={data?.image?.alt || "فريق استشاري"}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {title}
          </h2>

          {hasRichDescription ? (
            <div className="prose prose-invert mt-6 text-foreground leading-relaxed">
              {/* Note: Requires a custom Lexical renderer to be robust in production */}
              {data.description.root.children.map((p: any, i: number) => {
                return p.type === "paragraph" ? (
                  <p key={i} className="mt-4">{(p.children?.map((c: any) => c.text) || []).join("")}</p>
                ) : null
              })}
            </div>
          ) : (
            <>
              <p className="mt-6 text-base leading-relaxed text-foreground">
                شركة اتحاد الرائدة لإدارة المرافق هي شركة متخصصة في تقديم حلول متكاملة لإدارة وتشغيل وصيانة المرافق، تساعد الشركات والمؤسسات على تحقيق أعلى كفاءة تشغيلية مع تقليل التكاليف وضمان استمرارية العمل.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground">
                نستهدف الشركات والمكاتب الإدارية، المراكز التجارية، المستشفيات، المصانع، والجهات الحكومية. نحل مشكلة تعدد الموردين وبطء الاستجابة عبر توفير شركة واحدة تدير كل شيء بكفاءة.
              </p>
            </>
          )}

          <div className="mt-10 flex flex-col gap-4">
            {highlights.map((item: any, i: number) => (
              <div key={item.title || i} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <p className="text-base font-medium text-foreground">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-4">
            <Button
              asChild
              className="h-12 bg-primary px-6 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              <Link href="/about">
                تعرّف على قصّتنا
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
