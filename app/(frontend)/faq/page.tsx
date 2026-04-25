import Link from "next/link"
import { HelpCircle, MessageSquare, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageHero } from "@/components/page-hero"
import { faqs } from "@/lib/sample-data"

export const metadata = {
  title: "الأسئلة الشائعة",
  description: "إجابات على أكثر الأسئلة التي يطرحها عملاؤنا قبل بدء التعاون.",
}

const categories = Array.from(new Set(faqs.map((f) => f.category)))

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="الأسئلة الشائعة"
        title="كل ما تودّ معرفته قبل التعاون"
        description="جمعنا هنا الأسئلة الأكثر تكراراً من القيادات التنفيذية التي تفكّر في التعاون معنا."
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "الأسئلة الشائعة" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="space-y-10">
            {categories.map((cat) => (
              <div key={cat}>
                <div className="mb-5 flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-[var(--brand-gold)]" />
                  <h2 className="font-serif text-[24px] text-[var(--brand-navy)]">{cat}</h2>
                </div>
                <Accordion type="single" collapsible className="divide-y divide-[var(--brand-border)] border-y border-[var(--brand-border)]">
                  {faqs.filter((f) => f.category === cat).map((f, i) => (
                    <AccordionItem key={i} value={`${cat}-${i}`} className="border-b-0">
                      <AccordionTrigger className="py-5 text-right text-[16px] font-semibold text-[var(--brand-navy)] hover:text-[var(--brand-gold)] hover:no-underline">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-[15px] leading-[1.9] text-[var(--brand-muted)]">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--brand-border)] bg-[var(--brand-cream)] py-20">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <h2 className="mb-4 font-serif text-[34px] text-[var(--brand-navy)]">لم تجد إجابة سؤالك؟</h2>
          <p className="mb-8 text-[16px] leading-[1.9] text-[var(--brand-muted)]">
            فرقنا الاستشارية جاهزة للإجابة على استفساراتك المتخصصة خلال ساعات العمل الرسمية.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-12 bg-[var(--brand-navy)] px-6 text-white hover:bg-[var(--brand-navy-soft)]">
              <Link href="/contact" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> تواصل معنا
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 border-[var(--brand-navy)] bg-white px-6 text-[var(--brand-navy)] hover:bg-[var(--brand-navy)] hover:text-white">
              <a href="tel:+966112345678" className="flex items-center gap-2" dir="ltr">
                <Phone className="h-4 w-4" /> +966 11 234 5678
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
