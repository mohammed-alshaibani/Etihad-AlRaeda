import Link from "next/link"
import { ArrowLeft, CalendarDays, CheckCircle2, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"

export function FinalCta({ data }: { data?: any }) {
  const title = data?.title || "لنصمّم معاً خارطة طريق أعمالك للعام القادم"

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl container-px">
        {/* Main Wrapper with Gold Background */}
        <div className="relative overflow-hidden rounded-[3rem] bg-primary p-8 md:p-16 lg:p-20 shadow-premium-lg">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[400px] h-[400px] bg-black/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center mb-16">
            <h2 className="font-display text-4xl font-black text-primary-foreground md:text-5xl lg:text-6xl leading-[1.1]">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl font-medium text-primary-foreground/80">
              اختر المسار الذي يناسبك اليوم وابدأ رحلة التحول مع خبراء إتحاد الريادة
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Card 1: Free Inspection */}
            <div className="group flex flex-col rounded-[2rem] bg-brand-navy p-10 shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                <CalendarDays className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-black text-white mb-6">حجز معاينة مجانية</h3>
              <ul className="flex flex-col gap-4 mb-10">
                {[
                  "معاينة ميدانية خلال 24 ساعة",
                  "بدون أي التزام مسبق",
                  "تقرير مبدئي للحالة التشغيلية",
                  "توصيات فورية لتحسين الكفاءة"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-brand-gray">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className="mt-auto h-14 bg-primary text-primary-foreground font-black text-lg rounded-2xl hover:bg-white hover:text-brand-navy transition-all duration-300"
              >
                <Link href="https://forms.gle/iyP7WQyRGWBEGnep6">
                  احجز موعد المعاينة الآن
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Card 2: Request Quote */}
            <div className="group flex flex-col rounded-[2rem] bg-[#172946] p-10 shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-primary/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                <FileText className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-black text-white mb-6">طلب عرض سعر</h3>
              <ul className="flex flex-col gap-4 mb-10">
                {[
                  "عرض سعر فني ومالي مفصل",
                  "تحليل دقيق للتكاليف الحالية",
                  "جدول زمني محكم للتنفيذ",
                  "خيارات دفع مرنة للمؤسسات"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-brand-gray">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 transition-colors" />
                    <span className="font-medium text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className="mt-auto h-14 bg-primary text-primary-foreground font-black text-lg rounded-2xl hover:bg-white hover:text-brand-navy transition-all duration-300"
              >
                <Link href="/request-quote">
                  اطلب عرض السعر
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

