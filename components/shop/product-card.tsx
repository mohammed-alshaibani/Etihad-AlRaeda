"use client"

import { useState } from "react"
import { Check, ShoppingCart, Zap } from "lucide-react"
import Link from "next/link"

import { useCart, type CartItem } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function formatPrice(amount: number, currency = "SAR") {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

const billingLabel: Record<string, string> = {
  "one-time": "مرة واحدة",
  monthly: "/ شهر",
  yearly: "/ سنة",
}

interface ProductCardProps {
  product: {
    id: string
    slug: string
    name: string
    tagline?: string
    price: number
    currency?: string
    billingCycle?: string
    badge?: string
    isFeatured?: boolean
    features?: Array<{ text: string; included?: boolean }>
    coverImage?: { url: string } | null
    category?: string
    deliveryDays?: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart()
  const [added, setAdded] = useState(false)

  const currency = product.currency || "SAR"
  const billingCycle = product.billingCycle || "one-time"
  const inCart = items.some((i) => i.id === product.id)

  const handleAdd = () => {
    if (inCart) return
    const cartItem: CartItem = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency,
      billingCycle,
      quantity: 1,
      coverImage: product.coverImage?.url,
    }
    addItem(cartItem)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border bg-card transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-premium-lg",
        product.isFeatured
          ? "border-primary/50 bg-gradient-to-b from-primary/5 to-card shadow-premium"
          : "border-border"
      )}
    >
      {/* Featured / Badge ribbon */}
      {product.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-md">
            {product.badge}
          </span>
        </div>
      )}

      {/* Cover Image */}
      {product.coverImage?.url && (
        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
          <img
            src={product.coverImage.url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 md:p-8">
        {/* Category tag */}
        {product.category && (
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            <Zap className="h-3 w-3" />
            {product.category}
          </span>
        )}

        <h3 className="font-display text-xl font-bold leading-tight text-foreground">
          {product.name}
        </h3>
        {product.tagline && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.tagline}</p>
        )}

        {/* Price */}
        <div className="my-6 flex items-end gap-2">
          <span className="font-display text-4xl font-bold text-primary">
            {formatPrice(product.price, currency)}
          </span>
          <span className="mb-1.5 text-sm text-muted-foreground">{billingLabel[billingCycle]}</span>
        </div>

        {/* Features list */}
        {product.features && product.features.length > 0 && (
          <ul className="mb-8 space-y-2.5">
            {product.features.map((f, i) => (
              <li
                key={i}
                className={cn(
                  "flex items-start gap-3 text-[13px]",
                  f.included === false ? "text-muted-foreground/40 line-through" : "text-foreground"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    f.included === false ? "bg-muted" : "bg-primary/15 text-primary"
                  )}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {f.text}
              </li>
            ))}
          </ul>
        )}

        {/* Delivery */}
        {product.deliveryDays && (
          <p className="mb-6 text-[12px] text-muted-foreground">
            ⏱ مدة التسليم المتوقعة: <strong>{product.deliveryDays} يوم عمل</strong>
          </p>
        )}

        <div className="mt-auto flex flex-col gap-2.5">
          <Button
            onClick={handleAdd}
            disabled={inCart}
            size="lg"
            className={cn(
              "w-full gap-2 font-bold transition-all",
              inCart && "bg-green-600/80 hover:bg-green-600/80"
            )}
          >
            {inCart ? (
              <>
                <Check className="h-4 w-4" strokeWidth={3} />
                تمت الإضافة
              </>
            ) : added ? (
              <>
                <Check className="h-4 w-4" strokeWidth={3} />
                أُضيف للسلة!
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                إضافة للسلة
              </>
            )}
          </Button>
          <Button variant="outline" size="lg" asChild className="w-full">
            <Link href={`/shop/${product.slug}`}>عرض التفاصيل</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
