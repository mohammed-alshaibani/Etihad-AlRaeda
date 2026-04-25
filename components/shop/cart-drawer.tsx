"use client"

import Link from "next/link"
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import * as Sheet from "@radix-ui/react-dialog"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function formatPrice(amount: number, currency = "SAR") {
  return new Intl.NumberFormat("ar-SA", { style: "currency", currency, minimumFractionDigits: 0 }).format(amount)
}

export function CartDrawer() {
  const { items, isOpen, closeCart, openCart, removeItem, updateQty, subtotal, vat, total, itemCount } = useCart()

  return (
    <>
      {/* Cart Trigger Button — rendered in header */}
      <button
        id="cart-trigger"
        onClick={openCart}
        aria-label={`السلة (${itemCount})`}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:border-primary hover:bg-primary/10"
      >
        <ShoppingCart className="h-5 w-5 text-foreground" />
        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {itemCount}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <Sheet.Root open={isOpen} onOpenChange={(v) => (v ? openCart() : closeCart())}>
        <Sheet.Portal>
          <Sheet.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
          <Sheet.Content
            className={cn(
              "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-background shadow-2xl",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
              "duration-300"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <Sheet.Title className="font-display text-lg font-bold text-foreground">
                  سلة الطلبات
                </Sheet.Title>
                {itemCount > 0 && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[12px] font-bold text-primary">
                    {itemCount}
                  </span>
                )}
              </div>
              <Sheet.Close className="rounded-full p-2 transition hover:bg-muted">
                <X className="h-5 w-5" />
              </Sheet.Close>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
                  <ShoppingCart className="h-10 w-10 text-muted-foreground/40" />
                </div>
                <p className="font-display text-xl font-bold text-foreground">السلة فارغة</p>
                <p className="text-sm text-muted-foreground">أضف باقة من صفحة المتجر لتبدأ طلبك</p>
                <Button asChild className="mt-2" onClick={closeCart}>
                  <Link href="/shop">تصفّح الباقات</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                        {item.coverImage && (
                          <img
                            src={item.coverImage}
                            alt={item.name}
                            className="h-16 w-16 shrink-0 rounded-lg object-cover"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-display text-[13px] font-bold leading-tight text-foreground line-clamp-2">
                                {item.name}
                              </p>
                              <p className="mt-1 text-[11px] text-muted-foreground">
                                {item.billingCycle === "monthly"
                                  ? "/ شهر"
                                  : item.billingCycle === "yearly"
                                  ? "/ سنة"
                                  : "مرة واحدة"}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="shrink-0 rounded-md p-1 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 rounded-lg border border-border">
                              <button
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-muted"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-[1.5rem] text-center text-[13px] font-bold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-muted"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="font-display text-[15px] font-bold text-primary">
                              {formatPrice(item.price * item.quantity, item.currency)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Order Summary */}
                <div className="border-t border-border px-6 pb-8 pt-4">
                  <div className="mb-4 space-y-2 rounded-xl bg-muted/50 p-4">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-muted-foreground">المجموع الفرعي</span>
                      <span className="font-bold text-foreground">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-muted-foreground">ضريبة القيمة المضافة (15%)</span>
                      <span className="font-bold text-foreground">{formatPrice(vat)}</span>
                    </div>
                    <div className="mt-3 flex justify-between border-t border-border pt-3">
                      <span className="font-display text-base font-bold text-foreground">الإجمالي</span>
                      <span className="font-display text-lg font-bold text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>
                  <Button asChild size="lg" className="w-full gap-2 text-base font-bold" onClick={closeCart}>
                    <Link href="/checkout">
                      متابعة إلى الدفع
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="mt-3 w-full text-muted-foreground" onClick={closeCart}>
                    متابعة التسوق
                  </Button>
                </div>
              </>
            )}
          </Sheet.Content>
        </Sheet.Portal>
      </Sheet.Root>
    </>
  )
}
