"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/shop/product-card"
import { ShoppingBag, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ShopGridProps {
    initialProducts: any[]
    categories: any[]
    brands: any[]
}

export function ShopGrid({ initialProducts, categories, brands }: ShopGridProps) {
    const [activeCategory, setActiveCategory] = useState<string>("all")
    const [activeBrand, setActiveBrand] = useState<string>("all")
    const [inStockOnly, setInStockOnly] = useState(false)
    const [maxPrice, setMaxPrice] = useState<number | "">("")

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

    // Reactive CSR filtering
    const filteredProducts = useMemo(() => {
        return initialProducts.filter((product) => {
            // Category Match
            const catMatch =
                activeCategory === "all" ||
                (product.category && typeof product.category === "object"
                    ? product.category.id === activeCategory
                    : product.category === activeCategory)

            // Brand Match
            const brandMatch =
                activeBrand === "all" ||
                (product.brand && typeof product.brand === "object"
                    ? product.brand.id === activeBrand
                    : product.brand === activeBrand)

            // Stock Match
            const stockMatch = inStockOnly ? !product.outOfStock : true

            // Price Match
            const priceMatch = maxPrice === "" || product.price <= maxPrice

            return catMatch && brandMatch && stockMatch && priceMatch
        })
    }, [initialProducts, activeCategory, activeBrand, inStockOnly, maxPrice])

    return (
        <section className="py-12 md:py-20 bg-background">
            <div className="mx-auto max-w-7xl container-px">
                {/* Mobile Filter Toggle */}
                <div className="mb-6 flex items-center justify-between lg:hidden">
                    <p className="font-bold text-foreground">المنتجات ({filteredProducts.length})</p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        className="gap-2"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        التصفية
                    </Button>
                </div>

                <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
                    {/* Sidebar Filters */}
                    <aside
                        className={`flex-shrink-0 lg:w-64 space-y-8 ${isMobileFiltersOpen ? "block" : "hidden lg:block"
                            }`}
                    >
                        {/* Categories */}
                        <div>
                            <h3 className="mb-4 font-display text-[15px] font-bold text-foreground">
                                التصنيفات
                            </h3>
                            <div className="flex flex-col gap-2">
                                <Button
                                    variant={activeCategory === "all" ? "default" : "ghost"}
                                    onClick={() => setActiveCategory("all")}
                                    className="justify-start px-3 h-9"
                                >
                                    الكل
                                </Button>
                                {categories.map((cat) => (
                                    <Button
                                        key={cat.id}
                                        variant={activeCategory === cat.id ? "default" : "ghost"}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className="justify-start px-3 h-9"
                                    >
                                        {cat.title}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Brands */}
                        {brands.length > 0 && (
                            <div>
                                <h3 className="mb-4 font-display text-[15px] font-bold text-foreground">
                                    العلامات التجارية
                                </h3>
                                <div className="flex flex-col gap-2">
                                    <Button
                                        variant={activeBrand === "all" ? "secondary" : "ghost"}
                                        onClick={() => setActiveBrand("all")}
                                        className="justify-start px-3 h-9"
                                    >
                                        الكل
                                    </Button>
                                    {brands.map((brand) => (
                                        <Button
                                            key={brand.id}
                                            variant={activeBrand === brand.id ? "secondary" : "ghost"}
                                            onClick={() => setActiveBrand(brand.id)}
                                            className="justify-start px-3 h-9"
                                        >
                                            {brand.name}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Price Range */}
                        <div>
                            <h3 className="mb-4 font-display text-[15px] font-bold text-foreground">
                                نطاق السعر
                            </h3>
                            <div className="flex items-center gap-3">
                                <Input
                                    type="number"
                                    placeholder="الحد الأقصى (SAR)"
                                    value={maxPrice}
                                    onChange={(e) =>
                                        setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
                                    }
                                    className="bg-card"
                                />
                            </div>
                        </div>

                        {/* Stock Toggle */}
                        <div className="flex items-center space-x-2 space-x-reverse pt-2">
                            <Checkbox
                                id="stock"
                                checked={inStockOnly}
                                onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                            />
                            <Label
                                htmlFor="stock"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                المنتجات المتوفرة فقط
                            </Label>
                        </div>

                        {(activeCategory !== "all" || activeBrand !== "all" || inStockOnly || maxPrice !== "") && (
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setActiveCategory("all")
                                    setActiveBrand("all")
                                    setInStockOnly(false)
                                    setMaxPrice("")
                                }}
                                className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive gap-2"
                            >
                                <X className="h-4 w-4" />
                                إلغاء التصفية
                            </Button>
                        )}
                    </aside>

                    {/* Grid Area */}
                    <div className="flex-1">
                        <div className="mb-6 hidden items-center justify-between lg:flex">
                            <p className="text-sm text-muted-foreground">
                                إظهار {filteredProducts.length} من أصل {initialProducts.length} منتج
                            </p>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={{
                                            id: product.id,
                                            slug: product.slug,
                                            name: product.name,
                                            tagline: product.tagline,
                                            price: product.price,
                                            currency: product.currency || "SAR",
                                            billingCycle: product.billingCycle || "one-time",
                                            badge: product.badge,
                                            isFeatured: product.isFeatured || false,
                                            features: product.features || [],
                                            coverImage:
                                                typeof product.coverImage === "object" && product.coverImage
                                                    ? { url: product.coverImage.url }
                                                    : null,
                                            category: product.category,
                                            deliveryDays: product.deliveryDays,
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-border py-24 text-center bg-card/50">
                                <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-muted">
                                    <ShoppingBag className="h-8 w-8 text-muted-foreground/30" />
                                </div>
                                <p className="font-display text-xl font-bold text-foreground">
                                    لا توجد نتائج مطابقة
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    حاول تغيير إعدادات الفلترة للحصول على نتائج أكثر.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setActiveCategory("all")
                                        setActiveBrand("all")
                                        setInStockOnly(false)
                                        setMaxPrice("")
                                    }}
                                    className="mt-6"
                                >
                                    إلغاء التصفية
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
