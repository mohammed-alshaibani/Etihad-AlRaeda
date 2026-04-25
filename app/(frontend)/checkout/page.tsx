"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, Loader2, ShoppingBag, AlertCircle, CreditCard, Building, ArrowLeft } from "lucide-react"


import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { placeOrder } from "@/app/actions/orders"
import { cn } from "@/lib/utils"

function formatPrice(amount: number, currency = "SAR") {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

const paymentMethods = [
  {
    value: "bank-transfer",
    label: "تحويل بنكي",
    desc: "سنرسل لك تفاصيل الحساب البنكي عبر البريد الإلكتروني",
    icon: Building,
  },
  {
    value: "moyasar",
    label: "Moyasar (مدى / Visa / Mastercard)",
    desc: "دفع إلكتروني فوري عبر بوابة موياسر المعتمدة",
    icon: CreditCard,
  },
  {
    value: "apple-pay",
    label: "Apple Pay",
    desc: "متاح على أجهزة Apple المدعومة",
    icon: CreditCard,
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, vat, total, clearCart } = useCart()

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await placeOrder({
        customerName: fd.get("customerName") as string,
        customerEmail: fd.get("customerEmail") as string,
        customerPhone: fd.get("customerPhone") as string,
        companyName: fd.get("companyName") as string,
        vatNumber: (fd.get("vatNumber") as string) || undefined,
        notes: (fd.get("notes") as string) || undefined,
        paymentMethod,
        items: items.map((i) => ({
          productId: i.id,
          productName: i.name,
          quantity: i.quantity,
          unitPrice: i.price,
        })),
        subtotal,
        vatAmount: vat,
        total,
        currency: items[0]?.currency || "SAR",
      })

      if (result.ok) {
        clearCart()
        router.push(`/checkout/success?orderNumber=${result.orderNumber}`)
      } else {
        setError(result.error)
      }

    })
  }

  // Success Screen
  if (orderNumber) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-10 text-center shadow-premium-lg">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-10 w-10 text-primary" strokeWidth={2.5} />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">تم استلام طلبك!</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            سيتواصل معك فريقنا خلال <strong className="text-foreground">24 ساعة عمل</strong> لتأكيد الطلب وإرسال تفاصيل الدفع.
          </p>
          <div className="mt-6 rounded-xl bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground">رقم طلبك</p>
            <p className="mt-1 font-display text-2xl font-bold tracking-wider text-primary" dir="ltr">
              {orderNumber}
            </p>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">احتفظ بهذا الرقم للمتابعة</p>
          <div className="mt-8 flex flex-col gap-3">
            <Button asChild size="lg" className="w-full">
              <Link href="/shop">مواصلة التسوق</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/">العودة للرئيسية</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">السلة فارغة</h1>
          <p className="mt-2 text-muted-foreground">أضف باقة من متجرنا للمتابعة</p>
        </div>
        <Button asChild>
          <Link href="/shop">تصفّح الباقات</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl container-px">
        {/* Page Title */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">الدفع والتأكيد</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-foreground">إتمام الطلب</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left: Form */}
            <div className="space-y-8 lg:col-span-7">
              {/* Company Info */}
              <fieldset className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <legend className="mb-6 font-display text-lg font-bold text-foreground">
                  بيانات الشركة والمشتري
                </legend>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="customerName">الاسم الكامل *</Label>
                    <Input id="customerName" name="customerName" required placeholder="الاسم الثلاثي" className="h-11" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="companyName">اسم الشركة *</Label>
                    <Input id="companyName" name="companyName" required placeholder="شركة المثال" className="h-11" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="customerEmail">البريد الإلكتروني *</Label>
                    <Input
                      id="customerEmail"
                      name="customerEmail"
                      type="email"
                      required
                      placeholder="name@company.com"
                      dir="ltr"
                      className="h-11"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="customerPhone">رقم الجوال *</Label>
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      required
                      placeholder="+966 5x xxx xxxx"
                      dir="ltr"
                      className="h-11"
                    />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="vatNumber">الرقم الضريبي (اختياري)</Label>
                    <Input
                      id="vatNumber"
                      name="vatNumber"
                      placeholder="300xxxxxxxxxx"
                      dir="ltr"
                      className="h-11"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Payment Method */}
              <fieldset className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <legend className="mb-6 font-display text-lg font-bold text-foreground">
                  طريقة الدفع
                </legend>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <label
                        key={method.value}
                        htmlFor={`pay-${method.value}`}
                        className={cn(
                          "flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition",
                          paymentMethod === method.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40"
                        )}
                      >
                        <RadioGroupItem value={method.value} id={`pay-${method.value}`} className="mt-0.5" />
                        <div className="flex items-start gap-3">
                          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <div>
                            <p className="font-semibold text-foreground">{method.label}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{method.desc}</p>
                          </div>
                        </div>
                      </label>
                    )
                  })}
                </RadioGroup>
              </fieldset>

              {/* Notes */}
              <fieldset className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <legend className="mb-4 font-display text-lg font-bold text-foreground">
                  ملاحظات (اختياري)
                </legend>
                <Textarea
                  name="notes"
                  rows={4}
                  placeholder="أي متطلبات خاصة أو تعليمات للفريق..."
                />
              </fieldset>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                  <h2 className="mb-6 font-display text-lg font-bold text-foreground">
                    ملخص الطلب
                  </h2>

                  <ul className="divide-y divide-border">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-[13px] font-bold text-foreground leading-snug line-clamp-2">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[11px] text-muted-foreground">الكمية: {item.quantity}</p>
                        </div>
                        <p className="shrink-0 font-bold text-foreground">
                          {formatPrice(item.price * item.quantity, item.currency)}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">المجموع الفرعي</span>
                      <span className="font-bold text-foreground">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ضريبة القيمة المضافة (15%)</span>
                      <span className="font-bold text-foreground">{formatPrice(vat)}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-3">
                      <span className="font-display text-base font-bold text-foreground">الإجمالي</span>
                      <span className="font-display text-xl font-bold text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {error && (
                    <div className="mt-5 flex items-start gap-3 rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isPending}
                    className="mt-6 w-full gap-2 text-base font-bold"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        جاري تأكيد الطلب...
                      </>
                    ) : (
                      <>
                        تأكيد الطلب
                        <ArrowLeft className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
                    بالضغط على "تأكيد الطلب" أنت توافق على{" "}
                    <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                      الشروط والأحكام
                    </Link>
                  </p>
                </div>

                {/* Security badges */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  {["دفع آمن 🔒", "بيانات محمية 🛡️", "NDA مُوقّع ✍️"].map((b) => (
                    <div key={b} className="rounded-lg border border-border bg-card p-3">
                      <p className="text-[11px] font-semibold text-muted-foreground">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
