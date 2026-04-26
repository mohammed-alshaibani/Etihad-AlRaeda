"use client"

import { useState } from "react"
import { ShoppingCart, Check, Loader2, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useQuoteCart } from "@/hooks/use-quote-cart"
import { cn } from "@/lib/utils"

interface ProductActionsProps {
    product: {
        id: string
        slug: string
        name: string
        price: number
        currency: string
        billingCycle: string
        coverImage?: string
        hasVariants?: boolean | null
        variants?: any[] | null
    }
}

export function ProductActions({ product }: ProductActionsProps) {
    const { addItem: addCartItem, items: cartItems, openCart } = useCart()
    const { addItem: addQuoteItem, items: quoteItems, openQuote } = useQuoteCart()

    const [addingToCart, setAddingToCart] = useState(false)
    const [addingToQuote, setAddingToQuote] = useState(false)

    // Variant Configuration
    const [selectedVariant, setSelectedVariant] = useState<any>(
        product.hasVariants && product.variants?.length ? product.variants[0] : null
    )

    const finalId = selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id
    const finalPrice = selectedVariant?.price ?? product.price
    const finalName = selectedVariant ? `${product.name} - ${selectedVariant.name}` : product.name
    const finalImage = selectedVariant?.image?.url ?? product.coverImage

    const inCart = cartItems.some((i) => i.id === finalId)
    const inQuote = quoteItems.some((i) => i.id === finalId)

    const handleAddToCart = () => {
        if (inCart) {
            openCart()
            return
        }
        setAddingToCart(true)
        setTimeout(() => {
            addCartItem({
                id: finalId,
                slug: product.slug,
                name: finalName,
                price: finalPrice,
                currency: product.currency,
                billingCycle: product.billingCycle,
                coverImage: finalImage,
                quantity: 1,
            })
            setAddingToCart(false)
        }, 400)
    }

    const handleAddToQuote = () => {
        if (inQuote) {
            openQuote()
            return
        }
        setAddingToQuote(true)
        setTimeout(() => {
            addQuoteItem({
                id: finalId,
                slug: product.slug,
                name: finalName,
                coverImage: finalImage,
                quantity: 1,
            })
            setAddingToQuote(false)
        }, 400)
    }

    return (
        <div className="space-y-6">
            {/* Variant Selector */}
            {product.hasVariants && product.variants && product.variants.length > 0 && (
                <div className="space-y-3">
                    <label className="text-sm font-bold text-foreground">الخيارات المتاحة:</label>
                    <div className="flex flex-wrap gap-2">
                        {product.variants.map((v) => (
                            <Button
                                key={v.id}
                                variant={selectedVariant?.id === v.id ? "default" : "outline"}
                                onClick={() => setSelectedVariant(v)}
                                className="h-10 text-[13px] font-bold"
                            >
                                {v.name}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* Dynamic Price Display Updates Based on Variant */}
            {selectedVariant && selectedVariant.price !== product.price && (
                <div className="text-lg font-bold text-primary mb-2">
                    سعر المتغير: {selectedVariant.price} {product.currency}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
                {/* Main Purchase Button */}
                <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className={cn(
                        "w-full h-14 text-lg font-bold transition-all duration-300",
                        inCart
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    )}
                >
                    {addingToCart ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : inCart ? (
                        <>
                            <Check className="ml-2 h-5 w-5" strokeWidth={3} />
                            إنهاء الطلب
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="ml-2 h-5 w-5" />
                            شراء الباقة
                        </>
                    )}
                </Button>

                {/* B2B Quote Button */}
                <Button
                    onClick={handleAddToQuote}
                    size="lg"
                    variant="outline"
                    className={cn(
                        "w-full h-14 text-[15px] font-bold transition-all border-border",
                        inQuote && "border-primary text-primary bg-primary/5"
                    )}
                >
                    {addingToQuote ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : inQuote ? (
                        <>
                            <Check className="ml-2 h-5 w-5" strokeWidth={3} />
                            انتقل لإنشاء مسودة عرض السعر
                        </>
                    ) : (
                        <>
                            <FileText className="ml-2 h-5 w-5" />
                            أضف إلى عرض سعر (RFQ)
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
