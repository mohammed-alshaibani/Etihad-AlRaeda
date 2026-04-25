import Link from "next/link"
import { HelpCircle, ArrowLeft } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    q: "كيف أبدأ بشراكة مع مَراسي؟",
    a: "ابدأ بتعبئة نموذج طلب عرض السعر في دقيقتين، وسيتواصل معك مدير حساب خلال 24 ساعة لجدولة جلسة استكشافية مجانية. بعد الجلسة ستحصل على خارطة طريق وعرض سعر مفصّل.",
  },
  {
    q: "ما هي القطاعات التي تغطّيها خبرتكم؟",
    a: "نخدم 14 قطاعاً رئيسياً تشمل: المالية، الطاقة، العقارات، اللوجستيات، التقنية، الرعاية الصحية، التعليم، التصنيع، التجزئة، الضيافة، الحكومي، البنية التحتية، الإعلام، والخدمات المهنية.",
  },
  {
    q: "هل تعملون مع شركات خارج المملكة العربية السعودية؟",
    a: "نعم. لدينا مكاتب في الرياض، جدة، ودبي، ونخدم عملاء في 9 دول بالمنطقة من خلال فرق محلية ناطقة بالعربية والإنجليزية.",
  },
  {
    q: "ما هي نماذج التسعير المتاحة؟",
    a: "نقدّم ثلاثة نماذج: مشروع ثابت السعر، احتجاز شهري (Retainer)، ونموذج مبني على النتائج. سيساعدك مدير الحساب على اختيار النموذج الأنسب بناءً على طبيعة متطلباتك.",
  },
  {
    q: "هل التعاملات والمستندات محمية بسرية تامة؟",
    a: "نعم. نوقّع اتفاقية عدم إفصاح (NDA) قبل أي نقاش تفصيلي، وتُدار جميع البيانات عبر بنية تحتية معتمدة ISO 27001 مع صلاحيات وصول صارمة.",
  },
  {
    q: "هل يمكنني طلب استشارة أولى مجانية؟",
    a: "بالتأكيد. نقدّم جلسة استشارية أولية مجانية مدتها 45 دقيقة لكل شركة جديدة. يمكنك حجزها الآن من صفحة حجز موعد.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 container-px lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            الأسئلة الشائعة
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-balance text-foreground md:text-4xl">
            إجابات واضحة لأهم ما يخطر ببال فرق أعمالك
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-base">
            إن لم تجد إجابتك هنا، فريق العناية بالعملاء جاهز للرد على أي
            استفسار خلال ساعات العمل.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Button
              asChild
              className="bg-background text-foreground hover:bg-muted"
            >
              <Link href="/faq">
                جميع الأسئلة الشائعة
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[var(--brand-navy)]/15 text-foreground"
            >
              <Link href="/contact">
                <HelpCircle className="ml-2 h-4 w-4" />
                اسأل فريق الدعم
              </Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="space-y-3"
          >
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="rounded-2xl border border-border bg-background px-5 shadow-none data-[state=open]:border-primary/40 data-[state=open]:bg-muted"
              >
                <AccordionTrigger className="py-5 text-right font-display text-base font-semibold text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
