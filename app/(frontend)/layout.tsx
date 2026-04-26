import type { Metadata, Viewport } from "next"
import { Tajawal, Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "../globals.css"

import { getPayload } from "payload"
import config from "@payload-config"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "مَراسي | حلول أعمال متكاملة للشركات",
    template: "%s | مَراسي",
  },
  description:
    "مَراسي — شريك الأعمال الموثوق لتقديم الخدمات الاستشارية، التوريد المؤسسي، وإدارة المشاريع للشركات في المنطقة. اطلب عرض سعر أو احجز استشارتك اليوم.",
  generator: "v0.app",
  keywords: [
    "خدمات الشركات",
    "استشارات أعمال",
    "حلول B2B",
    "طلب عرض سعر",
    "حجز استشارة",
    "مَراسي",
  ],
  openGraph: {
    title: "مَراسي | حلول أعمال متكاملة للشركات",
    description:
      "شريك أعمالك الموثوق — استشارات، توريد مؤسسي، وإدارة مشاريع لقطاعات الشركات.",
    locale: "ar_SA",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#172946",
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const payload = await getPayload({ config })

  const navigation = await payload.findGlobal({
    slug: "navigation",
  }).catch(() => null)

  const siteSettings = await payload.findGlobal({
    slug: "site-settings",
  }).catch(() => null)

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${cairo.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased text-foreground bg-background">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:rounded-md focus:bg-[var(--brand-navy)] focus:px-4 focus:py-2 focus:text-white"
        >
          تخطي إلى المحتوى الرئيسي
        </a>
        <SiteHeader navigation={navigation} />
        <main id="main" className="min-h-[70vh]">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
        <SiteFooter navigation={navigation} settings={siteSettings} />        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
