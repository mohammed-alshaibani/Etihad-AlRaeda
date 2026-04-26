import Link from "next/link"
import { Linkedin, Twitter, Facebook, Youtube, MapPin, Mail, Phone, ArrowLeft } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { footerNav } from "@/lib/navigation"

export function SiteFooter({ navigation, settings }: { navigation?: any, settings?: any }) {
  return (
    <footer className="bg-background text-foreground">
      {/* CTA banner */}
      <div className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 container-px py-10 md:flex-row md:items-center md:py-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              جاهزون لبدء شراكتنا؟
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl">
              احصل على عرض سعر مؤسسي مخصص خلال 24 ساعة
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/quote">
                طلب عرض سعر
                <ArrowLeft className="mr-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-foreground/20 bg-transparent text-foreground hover:bg-foreground/10 hover:text-foreground"
            >
              <Link href="/book-appointment">حجز موعد استشارة</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 container-px py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <BrandLogo tone="white" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/70">
            شركة اتحاد الرائدة لإدارة المرافق، شريكك الموثوق لإدارة وتشغيل وصيانة المرافق بأعلى كفاءة لضمان استمرارية أعمالك بنجاح.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-foreground/75">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{settings?.contact?.address || "طريق الملك فهد، حي العليا، الرياض 12214، المملكة العربية السعودية"}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <a href={`tel:${settings?.contact?.phone || "+966110000000"}`} className="hover:text-foreground" dir="ltr">
                {settings?.contact?.phone || "+966 11 000 0000"}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <a href={`mailto:${settings?.contact?.email || "info@etihad.sa"}`} className="hover:text-foreground">
                {settings?.contact?.email || "info@etihad.sa"}
              </a>
            </li>
          </ul>
        </div>

        {(navigation?.footerColumns || footerNav).map((group: any, idx: number) => (
          <nav
            key={group.title || group.label || idx}
            aria-label={group.title || group.label}
            className="md:col-span-2"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {group.title || group.label}
            </p>
            <ul className="mt-4 space-y-2.5">
              {(group.links || group.items)?.map((item: any) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 transition hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Newsletter */}
      <div className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 container-px py-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-base font-semibold text-foreground">
              اشترك في نشرتنا المؤسسية
            </p>
            <p className="mt-1 text-sm text-foreground/60">
              أحدث تحليلات قطاع الأعمال والعروض الحصرية للشركاء.
            </p>
          </div>
          <form
            className="flex w-full max-w-md items-center gap-2"
            action="/api/newsletter"
            method="post"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              البريد الإلكتروني للعمل
            </label>
            <Input
              id="newsletter-email"
              type="email"
              name="email"
              required
              placeholder="بريدك الإلكتروني للعمل"
              className="h-11 border-foreground/20 bg-foreground/5 text-foreground placeholder:text-foreground/50 focus-visible:border-primary focus-visible:ring-0"
            />
            <Button
              type="submit"
              className="h-11 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              اشتراك
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 container-px py-6 md:flex-row md:items-center">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} شركة اتحاد الرائدة لإدارة المرافق. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/60">
            {navigation?.footerBottom?.legalLinks?.map((link: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4">
                <Link href={link.url} className="hover:text-foreground">
                  {link.label}
                </Link>
                {idx < (navigation.footerBottom.legalLinks.length - 1) && (
                  <span className="text-foreground/20">·</span>
                )}
              </div>
            )) || (
                <>
                  <Link href="/privacy" className="hover:text-foreground">
                    سياسة الخصوصية
                  </Link>
                  <span className="text-foreground/20">·</span>
                  <Link href="/terms" className="hover:text-foreground">
                    الشروط والأحكام
                  </Link>
                </>
              )}
            <span className="text-foreground/20 hidden md:block">·</span>
            <div className="flex items-center gap-3">
              {settings?.social?.linkedin && (
                <a href={settings.social.linkedin} aria-label="لينكد إن" className="text-foreground/60 transition hover:text-primary">
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {settings?.social?.twitter && (
                <a href={settings.social.twitter} aria-label="تويتر" className="text-foreground/60 transition hover:text-primary">
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {settings?.social?.facebook && (
                <a href={settings.social.facebook} aria-label="فيسبوك" className="text-foreground/60 transition hover:text-primary">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {settings?.social?.youtube && (
                <a href={settings.social.youtube} aria-label="يوتيوب" className="text-foreground/60 transition hover:text-primary">
                  <Youtube className="h-4 w-4" />
                </a>
              )}
              {settings?.social?.instagram && (
                <a href={settings.social.instagram} aria-label="انستجرام" className="text-foreground/60 transition hover:text-primary">
                  <Linkedin className="h-4 w-4" /> {/* Fallback icon */}
                </a>
              )}
              {(!settings?.social || Object.keys(settings.social).length === 0) && (
                <>
                  <a href="#" aria-label="لينكد إن" className="text-foreground/60 transition hover:text-primary">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href="#" aria-label="تويتر" className="text-foreground/60 transition hover:text-primary">
                    <Twitter className="h-4 w-4" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
