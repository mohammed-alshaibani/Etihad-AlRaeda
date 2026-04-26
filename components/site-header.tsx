"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, ChevronDown, Phone, ArrowLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BrandLogo } from "@/components/brand-logo"
import { mainNav } from "@/lib/navigation"
import { CartDrawer } from "@/components/shop/cart-drawer"
import { GlobalSearch } from "@/components/global-search"



export function SiteHeader({ navigation }: { navigation?: any }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href)

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden w-full border-b border-border bg-background/95 text-foreground/80 md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between container-px text-xs">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span dir="ltr">+966 11 000 0000</span>
            </span>
            <span className="text-foreground/40">|</span>
            <span>الأحد - الخميس، 8:30 ص - 5:30 م</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-foreground">
              من نحن
            </Link>
            <Link href="/support" className="hover:text-foreground">
              الدعم
            </Link>
            <Link href="/careers" className="hover:text-foreground">
              الوظائف
            </Link>
          </div>
        </div>
      </div>

      {/* Main sticky header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          "bg-background text-foreground border-b border-border",
          scrolled
            ? "shadow-[0_8px_30px_rgba(15,29,51,0.25)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(23,41,70,0.92)]"
            : ""
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 container-px md:h-20">
          <Link href="/" className="shrink-0">
            <BrandLogo tone="white" />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden items-center gap-1 lg:flex"
          >
            {(navigation?.mainMenu || mainNav).map((item: any) => {
              if (item.items) {
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 outline-none transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4 opacity-70" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      sideOffset={10}
                      className="w-72 border border-border bg-background p-2 text-foreground"
                    >
                      <DropdownMenuLabel className="px-2 text-xs font-semibold uppercase tracking-wider text-primary">
                        {item.label}
                      </DropdownMenuLabel>
                      {item.items?.map((subItem: any) => (
                        <DropdownMenuItem key={subItem.href} asChild>
                          <Link
                            href={subItem.href || "#"}
                            className="flex flex-col items-start gap-0.5 rounded-md px-2 py-2"
                          >
                            <span className="text-sm font-semibold">
                              {subItem.label}
                            </span>
                            {subItem.description && (
                              <span className="text-xs text-muted-foreground">
                                {subItem.description}
                              </span>
                            )}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href || "#"}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground",
                    item.href && isActive(item.href) && "text-foreground"
                  )}
                >
                  {item.label}
                  {item.href && isActive(item.href) && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA cluster */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block mr-2">
              <GlobalSearch />
            </div>
            <Button

              asChild
              variant="ghost"
              className="hidden text-foreground hover:bg-foreground/10 hover:text-foreground md:inline-flex"
            >
              <Link href="/request-quote">طلب عرض سعر</Link>
            </Button>
            <Button
              asChild
              className="hidden bg-primary text-primary-foreground shadow-premium hover:bg-primary/90 md:inline-flex"
            >
              <Link href="/shop">
                متجرنا
                <ArrowLeft className="mr-1.5 h-4 w-4" />
              </Link>
            </Button>
            <CartDrawer />

            {/* Mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-foreground/10 hover:text-foreground lg:hidden"
                  aria-label="فتح القائمة"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[88%] max-w-sm overflow-y-auto bg-background p-0"
              >
                <SheetHeader className="border-b border-border p-5 text-right">
                  <SheetTitle asChild>
                    <BrandLogo tone="navy" />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-5">
                  <nav className="flex flex-col space-y-2">
                    {(navigation?.mainMenu || mainNav).map((item: any) => {
                      if (item.items) {
                        return (
                          <div key={item.label} className="mt-2 space-y-1">
                            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-primary">
                              {item.label}
                            </p>
                            <div className="flex flex-col">
                              {item.items?.map((subItem: any) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href || "#"}
                                  className="rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )
                      }
                      return (
                        <Link
                          key={item.href}
                          href={item.href || "#"}
                          className={cn(
                            "flex items-center justify-between rounded-md px-3 py-3 text-base font-semibold text-foreground hover:bg-foreground/5",
                            item.href && isActive(item.href) && "text-primary"
                          )}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </nav>

                  <div className="flex flex-col gap-2 pt-2">
                    <Button
                      asChild
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Link href="/shop">متجرنا</Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="border-foreground/15 text-foreground hover:bg-foreground/5"
                    >
                      <Link href="/quote">طلب عرض سعر</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}
