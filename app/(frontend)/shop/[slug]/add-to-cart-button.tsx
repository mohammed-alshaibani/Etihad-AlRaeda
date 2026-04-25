"use client"

import { useState } from "react"
import { ShoppingCart, Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart, type CartItem } from "@/hooks/use-cart"
import { cn } from "@/lib/utils"

interface AddToCartButtonProps {
  product: {
    id: string
    slug: string
    name: string
    price: number
    currency: string
    billingCycle: string
    coverImage?: string
  }
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem, items, openCart } = useCart()
  const [adding, setAdding] = useState(false)
  
  const inCart = items.some((i) => i.id === product.id)

  const handleAdd = () => {
    if (inCart) {
      openCart()
      return
    }

    setAdding(true)
    // Simulate a bit of lag for "premium" feel
    setTimeout(() => {
      addItem({
        ...product,
        quantity: 1
      })
      setAdding(false)
    }, 600)
  }

  return (
    <Button 
      onClick={handleAdd}
      size="lg"
      className={cn(
        "w-full h-14 text-lg font-bold transition-all duration-300",
        inCart ? "bg-green-600 hover:bg-green-700 text-white" : "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      )}
    >
      {adding ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : inCart ? (
        <>
          <Check className="ml-2 h-5 w-5" strokeWidth={3} />
          عرض السلة
        </>
      ) : (
        <>
          <ShoppingCart className="ml-2 h-5 w-5" />
          إضافة للسلة
        </>
      )}
    </Button>
  )
}
