import Link from "next/link"
import { Check, ArrowLeft, Building, Mail, Phone, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getPayloadClient } from "@/lib/payload"
import { notFound } from "next/navigation"

interface InvoicePageProps {
  params: Promise<{ orderNumber: string }>
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { orderNumber } = await params

  if (!orderNumber) {
    notFound()
  }

  const payload = await getPayloadClient()
  const { docs: orders } = await payload.find({
    collection: "orders",
    where: { orderNumber: { equals: orderNumber } },
    limit: 1,
  })

  const order = orders[0]

  if (!order) {
    notFound()
  }

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl container-px text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-12 w-12 text-primary" strokeWidth={3} />
        </div>

        <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">تم استلام طلبك بنجاح!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          شكراً لثقتك بـ "مَراسي". تم تسجيل طلبك في نظامنا وسيتواصل معك فريقنا قريباً.
        </p>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-premium">
          <div className="border-b border-border bg-muted/50 px-6 py-4 text-sm font-bold text-muted-foreground uppercase tracking-widest">
            تفاصيل الطلب
          </div>
          <div className="p-8 text-right">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="text-xs font-bold text-primary uppercase">رقم الطلب</p>
                <p className="mt-1 font-display text-2xl font-bold text-foreground" dir="ltr">{order.orderNumber}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-primary uppercase">التاريخ</p>
                <p className="mt-1 font-display text-xl font-bold text-foreground">
                  {new Date(order.createdAt).toLocaleDateString('ar-SA', { dateStyle: 'long' })}
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-border pt-8">
              <h3 className="mb-4 font-display text-lg font-bold text-foreground">معلومات التواصل</h3>
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-3 justify-end text-muted-foreground">
                  {order.customerName}
                  <span className="h-5 w-5 flex items-center justify-center rounded bg-primary/10 text-primary">
                    <Building className="h-3 w-3" />
                  </span>
                </p>
                <p className="flex items-center gap-3 justify-end text-muted-foreground">
                  {order.customerEmail}
                  <span className="h-5 w-5 flex items-center justify-center rounded bg-primary/10 text-primary">
                    <Mail className="h-3 w-3" />
                  </span>
                </p>
                <p className="flex items-center gap-3 justify-end text-muted-foreground" dir="ltr">
                  <span className="h-5 w-5 flex items-center justify-center rounded bg-primary/10 text-primary">
                    <Phone className="h-3 w-3" />
                  </span>
                  {order.customerPhone}
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-xl bg-primary/5 p-6 text-sm text-primary border border-primary/10">
              <p className="font-bold">ماذا يحدث الآن؟</p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 justify-end">
                  ستصلك رسالة تأكيد عبر البريد الإلكتروني خلال دقائق.
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                </li>
                <li className="flex items-start gap-2 justify-end">
                  سيقوم مدير حساب مخصص بمراجعة طلبك والتواصل معك لتنسيق البدء.
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                </li>
                <li className="flex items-start gap-2 justify-end">
                  في حال اختيار "التحويل البنكي"، يرجى إرفاق صورة التحويل عند تواصلنا معك.
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="min-w-[200px] gap-2 font-bold">
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4" />
              العودة للمتجر
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[200px] font-bold">
            <Link href="/">الصفحة الرئيسية</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
