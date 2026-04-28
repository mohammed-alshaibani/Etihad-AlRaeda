"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Loader2, Package, Wrench, Newspaper, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import * as Sheet from "@radix-ui/react-dialog"

export function SearchOverlay() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (query.length < 2) {
            setResults([])
            setLoading(false)
            return
        }

        const timer = setTimeout(async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
                const data = await res.json()
                setResults(data.results)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [query])

    const iconMap: Record<string, any> = {
        product: Package,
        service: Wrench,
        post: Newspaper,
    }

    const typeLabel: Record<string, string> = {
        product: "باقة / منتج",
        service: "خدمة",
        post: "مقالة",
    }

    return (
        <>
            {/* Search Trigger Button */}
            <button
                onClick={() => setIsSheetOpen(true)}
                aria-label="بحث"
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:border-primary hover:bg-primary/10"
            >
                <Search className="h-5 w-5 text-foreground" />
            </button>

            {/* Search Drawer/Overlay */}
            <Sheet.Root open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <Sheet.Portal>
                    <Sheet.Overlay className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" />
                    <Sheet.Content
                        className={cn(
                            "fixed inset-x-0 top-0 z-[60] flex w-full flex-col border-b border-border bg-background shadow-2xl p-6",
                            "data-[state=open]:animate-in data-[state=closed]:animate-out",
                            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
                            "duration-300"
                        )}
                    >
                        <div className="mx-auto w-full max-w-2xl">
                            <div className="sr-only">
                                <Sheet.Title>البحث في الموقع</Sheet.Title>
                                <Sheet.Description>ابحث عن الخدمات والباقات والمقالات المتاحة في اتحاد الريادة.</Sheet.Description>
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-display text-xl font-bold text-foreground">البحث في الموقع</h2>
                                <Sheet.Close asChild>
                                    <button className="rounded-full p-2 transition hover:bg-muted">
                                        <X className="h-5 w-5" />
                                    </button>
                                </Sheet.Close>
                            </div>

                            <div className="relative">
                                <Input
                                    autoFocus
                                    placeholder="ابحث عن خدمة أو باقة أو مقالة..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="h-14 pl-12 pr-6 text-base bg-muted/50 border-border focus-visible:ring-primary rounded-xl"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                                </div>
                            </div>

                            <div className="mt-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                {results.length > 0 ? (
                                    <div className="grid gap-2">
                                        {results.map((result) => {
                                            const Icon = iconMap[result.type] || Package
                                            return (
                                                <Link
                                                    key={`${result.type}-${result.id}`}
                                                    href={result.href}
                                                    onClick={() => {
                                                        setIsSheetOpen(false)
                                                        setQuery("")
                                                    }}
                                                    className="flex items-center gap-4 rounded-xl border border-transparent px-4 py-3 transition hover:border-primary/20 hover:bg-primary/5 group"
                                                >
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-bold text-foreground">{result.title}</p>
                                                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{typeLabel[result.type]}</p>
                                                    </div>
                                                    <ArrowLeft className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                </Link>
                                            )
                                        })}
                                    </div>
                                ) : query.length >= 2 && !loading ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                                        <Search className="h-12 w-12 mb-4 opacity-10" />
                                        <p className="text-base">لا توجد نتائج لـ "{query}"</p>
                                        <p className="text-sm">جرّب كلمات بحث أخرى</p>
                                    </div>
                                ) : query.length > 0 && query.length < 2 ? (
                                    <p className="text-center text-sm text-muted-foreground py-8">اكتب حرفين على الأقل للبدء...</p>
                                ) : null}
                            </div>
                        </div>
                    </Sheet.Content>
                </Sheet.Portal>
            </Sheet.Root>
        </>
    )
}

function ArrowLeft({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
        </svg>
    )
}
