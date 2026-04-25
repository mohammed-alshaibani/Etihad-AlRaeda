import Image from "next/image"
import Link from "next/link"
import { Check, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section id="about" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 container-px lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/consulting-meeting.jpg"
              alt="فريق استشاري يعمل على مشروع شركة"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            من نحن
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            نُحوّل تعقيدات الأعمال إلى فرص نمو واضحة
          </h2>
          <p className="mt-6 text-base leading-relaxed text-foreground">
            شركة اتحاد الرائدة لإدارة المرافق هي شركة متخصصة في تقديم حلول متكاملة لإدارة وتشغيل وصيانة المرافق، تساعد الشركات والمؤسسات على تحقيق أعلى كفاءة تشغيلية مع تقليل التكاليف وضمان استمرارية العمل.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground">
            نستهدف الشركات والمكاتب الإدارية، المراكز التجارية، المستشفيات، المصانع، والجهات الحكومية. نحل مشكلة تعدد الموردين وبطء الاستجابة عبر توفير شركة واحدة تدير كل شيء بكفاءة.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            {[
              "منهجية مثبتة مبنية على معايير PMI و ISO",
              "خبراء مصنّفون في كل قطاع رئيسي",
              "تقارير أداء شهرية ولوحات متابعة مباشرة",
              "نموذج تسعير شفاف وقابل للتخصيص",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <p className="text-base font-medium text-foreground">
                  {item}
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
