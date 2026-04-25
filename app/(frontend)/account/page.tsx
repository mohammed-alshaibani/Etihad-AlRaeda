"use client"

import { useState, useTransition } from "react"
import { Search, Loader2, Package, Clock, FileText, ArrowLeft, Building2, ExternalLink } from "lucide-react"
import Link from "next/link"

import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

function formatPrice(amount: number, currency = "SAR") {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

const statusMap: Record<string, { label: string, color: string }> = {
  pending: { label: "قيد المراجعة", color: "bg-amber-100 text-amber-700 border-amber-200" },
  confirmed: { label: "مؤكد", color: "bg-blue-100 text-blue-700 border-blue-200" },
  processing: { label: "قيد التنفيذ", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  completed: { label: "مكتمل", color: "bg-green-100 text-green-700 border-green-200" },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-700 border-red-200" },
}

export default function AccountPage() {
  const [order, setOrder] = useState<any>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  const handleLookup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSearched(true)
    const fd = new FormData(e.currentTarget)
    const orderNumber = fd.get("orderNumber") as string
    const email = fd.get("email") as string

    startTransition(async () => {
      // In a real app, this would be a server action or API call
      // Mocking for now to show the UI
      try {
        const res = await fetch(`/api/orders/lookup?number=${orderNumber}&email=${email}`)
        const data = await res.json()
        if (data.ok) {
          setOrder(data.order)
        } else {
          setError(data.error || "لم يتم العثور على طلب بهذه البيانات.")
        }
      } catch (err) {
        setError("حدث خطأ أثناء البحث. يرجى المحاولة لاحقاً.")
      }
    })
  }

  return (
    <>
      <PageHero
        eyebrow="بوابة العملاء"
        title="متابعة حالة الطلبات والعروض"
        description="استخدم رقم الطلب وبريدك الإلكتروني لمتابعة حالة تنفيذ خدماتك أو تحميل الفواتير."
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "بوابة العملاء" }]}
      />

      <section className="bg-white py-14 md:py-24">
        <div className="mx-auto max-w-4xl container-px">
          {!order ? (
            <div className="rounded-3xl border border-border bg-card p-8 shadow-premium md:p-12">
              <div className="mb-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Search className="h-8 w-8" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">البحث عن طلبك</h2>
                <p className="mt-2 text-muted-foreground">أدخل البيانات المرسلة لبريدك الإلكتروني عند إتمام الطلب.</p>
              </div>

              <form onSubmit={handleLookup} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="orderNumber">رقم الطلب (Order Number) *</Label>
                    <Input id="orderNumber" name="orderNumber" required placeholder="ORD-XXXX-XXXX" dir="ltr" className="h-12" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">البريد الإلكتروني المسجل *</Label>
                    <Input id="email" name="email" type="email" required placeholder="name@company.com" dir="ltr" className="h-12" />
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
                    {error}
                  </div>
                )}

                <Button type="submit" disabled={isPending} className="h-12 w-full text-base font-bold">
                  {isPending ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جاري البحث...
                    </>
                  ) : (
                    "بحث عن الطلب"
                  )}
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Order Header */}
              <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-8 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Package className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground" dir="ltr">{order.orderNumber}</h2>
                    <p className="text-sm text-muted-foreground">تاريخ الطلب: {new Date(order.createdAt).toLocaleDateString('ar-SA')}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                   <div className={cn("inline-flex items-center px-4 py-2 rounded-full border text-sm font-bold", statusMap[order.status]?.color)}>
                      {statusMap[order.status]?.label}
                   </div>
                   <Button variant="outline" onClick={() => setOrder(null)} size="sm">
                      بحث جديد
                   </Button>
                </div>
              </div>

              {/* Order Content */}
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-6">
                  {/* Progress */}
                  <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                    <h3 className="mb-6 font-display text-lg font-bold text-foreground">سجل الحالة</h3>
                    <div className="space-y-6">
                      {[
                        { date: order.createdAt, title: "تم استلام الطلب", desc: "طلبك في انتظار مراجعة مدير الحساب.", active: true },
                        { date: "", title: "تأكيد الدفع", desc: "ننتظر تأكيد التحويل البنكي أو إتمام الدفع الإلكتروني.", active: order.status !== 'pending' },
                        { date: "", title: "بدء التنفيذ", desc: "الفريق المختص بدأ العمل على مخرجاتك.", active: ['processing', 'completed'].includes(order.status) },
                        { date: "", title: "اكتمال الطلب", desc: "تم تسليم كافة المخرجات بنجاح.", active: order.status === 'completed' },
                      ].map((step, i) => (
                        <div key={i} className="relative flex gap-4">
                          {i < 3 && (
                            <div className={cn("absolute right-[11px] top-6 h-full w-[2px]", step.active ? "bg-primary" : "bg-border")} />
                          )}
                          <div className={cn("relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2", step.active ? "bg-primary border-primary text-white" : "bg-card border-border")}>
                            {step.active && <Check className="h-3 w-3" strokeWidth={4} />}
                          </div>
                          <div className="-mt-1">
                            <p className={cn("font-display font-bold", step.active ? "text-foreground" : "text-muted-foreground")}>{step.title}</p>
                            <p className="text-sm text-muted-foreground">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                    <h3 className="mb-4 font-display text-lg font-bold text-foreground">الخدمات المطلوبة</h3>
                    <ul className="divide-y divide-border">
                      {order.items.map((item: any, i: number) => (
                        <li key={i} className="flex items-center justify-between py-4">
                          <div className="flex items-center gap-3">
                             <FileText className="h-5 w-5 text-primary" />
                             <span className="font-bold text-foreground">{item.productName}</span>
                          </div>
                          <span className="font-bold text-primary">{formatPrice(item.subtotal)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 border-t border-border pt-4 flex justify-between items-center">
                       <span className="font-display font-bold text-foreground">الإجمالي النهائي</span>
                       <span className="font-display text-xl font-bold text-primary">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-6">
                  <div className="rounded-2xl border border-border bg-muted/30 p-6">
                     <h3 className="font-display font-bold text-foreground">مدير الحساب</h3>
                     <div className="mt-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                           <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-foreground">قيد التعيين قريباً</p>
                     </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-6">
                     <h3 className="font-display font-bold text-foreground">المستندات</h3>
                     <div className="mt-4 space-y-2">
                        <Button variant="ghost" className="w-full justify-start gap-2 h-10 text-sm" asChild>
                           <Link href={`/invoice/${order.orderNumber}`} target="_blank">
                              <FileText className="h-4 w-4" />
                              الفاتورة الضريبية
                           </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2 h-10 text-sm" disabled>

                           <ExternalLink className="h-4 w-4" />
                           خطة العمل (قريباً)
                        </Button>
                     </div>
                  </div>
                </aside>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
