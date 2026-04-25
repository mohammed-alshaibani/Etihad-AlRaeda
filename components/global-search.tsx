"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Loader2, Package, Wrench, Newspaper, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function GlobalSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
    <div ref={containerRef} className="relative w-full max-w-[280px]">
      <div className="relative">
        <Input
          placeholder="ابحث عن خدمة أو باقة..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="h-10 pl-10 pr-4 text-[13px] bg-muted/50 border-border focus-visible:ring-primary"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </div>
      </div>

      {isOpen && (query.length >= 2 || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 max-h-[400px] overflow-y-auto rounded-xl border border-border bg-background shadow-premium-lg z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((result) => {
                const Icon = iconMap[result.type] || Package
                return (
                  <Link
                    key={`${result.type}-${result.id}`}
                    href={result.href}
                    onClick={() => {
                      setIsOpen(false)
                      setQuery("")
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-muted"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-bold text-foreground">{result.title}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{typeLabel[result.type]}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : !loading && query.length >= 2 ? (
            <div className="p-8 text-center">
               <p className="text-sm text-muted-foreground">لا توجد نتائج لـ "{query}"</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
