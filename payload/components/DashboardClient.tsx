"use client"

import React, { useEffect, useState } from "react"

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const C = {
  navy: "#172946",
  gold: "#B9995A",
  goldLight: "rgba(185,153,90,0.1)",
  gray: "#AFAFB0",
  bg: "#F8F9FA",
  white: "#FFFFFF",
  border: "#E9ECEF",
  muted: "#6B7280",
}

// ─── Types ────────────────────────────────────────────────────────────────────
type StatsType = {
  orders: number; revenue: number; pending: number
  quotes: number; leads: number; appointments: number
  messages: number; applications: number
}
type SectionItem = { label: string; sub: string; href: string }

const fmtSAR = (n: number) =>
  new Intl.NumberFormat("ar-SA", { style: "currency", currency: "SAR", maximumFractionDigits: 0 }).format(n)

// ─── Item Row ─────────────────────────────────────────────────────────────────
function ItemRow({ label, sub, href, isLast }: SectionItem & { isLast: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 20px",
        direction: "rtl",
        textDecoration: "none",
        borderBottom: isLast ? "none" : `1px solid ${C.border}`,
        background: hovered ? C.bg : "transparent",
        transition: "background 0.15s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: "0.875rem", color: C.navy }}>{label}</div>
        <div style={{ fontSize: "0.73rem", color: C.gray, marginTop: "2px" }}>{sub}</div>
      </div>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "22px",
          height: "22px",
          background: hovered ? C.gold : C.goldLight,
          color: hovered ? C.white : C.gold,
          borderRadius: "6px",
          fontSize: "15px",
          fontWeight: 700,
          flexShrink: 0,
          transition: "all 0.15s ease",
        }}
      >
        +
      </span>
    </a>
  )
}

// ─── KPI Mini Tile ─────────────────────────────────────────────────────────────
function KpiTile({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div style={{ background: C.white, padding: "14px 16px", direction: "rtl", textAlign: "right" }}>
      <div style={{ fontSize: "1.5rem", fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: "0.7rem", color: C.gray, marginTop: "4px", fontWeight: 600 }}>{label}</div>
    </div>
  )
}

// ─── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({
  title, icon, items, children, columns = 2,
}: {
  title: string; icon: string; items?: SectionItem[]
  children?: React.ReactNode; columns?: number
}) {
  const [hovered, setHovered] = useState(false)

  // Build columns
  const cols: SectionItem[][] = []
  if (items) {
    const perCol = Math.ceil(items.length / columns)
    for (let c = 0; c < columns; c++) {
      cols.push(items.slice(c * perCol, (c + 1) * perCol))
    }
  }

  return (
    <div
      style={{
        background: C.white,
        border: `1px solid ${hovered ? C.gold : C.border}`,
        borderRadius: "16px",
        boxShadow: hovered ? "0 8px 24px rgba(23,41,70,0.1)" : "0 1px 4px rgba(0,0,0,0.06)",
        overflow: "hidden",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "18px 24px 16px", borderBottom: `1px solid ${C.border}`, direction: "rtl" }}>
        <div style={{ width: "4px", height: "20px", background: C.gold, borderRadius: "2px", flexShrink: 0 }} />
        <span style={{ fontSize: "1rem" }}>{icon}</span>
        <span style={{ fontWeight: 800, fontSize: "0.975rem", color: C.navy }}>{title}</span>
      </div>

      {/* Slot for KPIs */}
      {children}

      {/* Item columns */}
      {items && (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, borderTop: children ? `1px solid ${C.border}` : "none" }}>
          {cols.map((col, ci) => (
            <div key={ci} style={{ borderLeft: ci > 0 ? `1px solid ${C.border}` : "none" }}>
              {col.map((item, i) => (
                <ItemRow key={item.href + item.label} {...item} isLast={i === col.length - 1} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── KPI Summary Bar ──────────────────────────────────────────────────────────
function SummaryBar({ stats, loading }: { stats: StatsType; loading: boolean }) {
  const items = [
    { label: "إجمالي الطلبات", value: stats.orders, color: C.navy, bg: "rgba(23,41,70,0.06)" },
    { label: "الإيرادات", value: loading ? "..." : fmtSAR(stats.revenue), color: C.gold, bg: "rgba(185,153,90,0.08)" },
    { label: "قيد الانتظار", value: stats.pending, color: "#EF4444", bg: "rgba(239,68,68,0.07)" },
    { label: "عروض الأسعار", value: stats.quotes, color: "#8B5CF6", bg: "rgba(139,92,246,0.07)" },
    { label: "العملاء المحتملون", value: stats.leads, color: "#F59E0B", bg: "rgba(245,158,11,0.07)" },
    { label: "المواعيد", value: stats.appointments, color: "#10B981", bg: "rgba(16,185,129,0.07)" },
  ]
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            background: item.bg,
            borderRadius: "12px",
            padding: "16px 18px",
            direction: "rtl",
            border: `1px solid ${C.border}`,
            cursor: "default",
          }}
        >
          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: item.color, lineHeight: 1 }}>{item.value}</div>
          <div style={{ fontSize: "0.72rem", color: C.muted, marginTop: "5px", fontWeight: 600 }}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function DashboardClient() {
  const [stats, setStats] = useState<StatsType>({ orders: 0, revenue: 0, pending: 0, quotes: 0, leads: 0, appointments: 0, messages: 0, applications: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ; (async () => {
      try {
        const [ordersRes, quotesRes, leadsRes, apptRes, msgRes, jobRes] = await Promise.all([
          fetch("/api/orders?limit=200"),
          fetch("/api/quote-requests?limit=0"),
          fetch("/api/leads?limit=0"),
          fetch("/api/appointments?limit=0"),
          fetch("/api/contact-messages?limit=0"),
          fetch("/api/job-applications?limit=0"),
        ])
        const orders = ordersRes.ok ? (await ordersRes.json()).docs ?? [] : []
        const revenue = orders.filter((o: any) => o.paymentStatus === "paid").reduce((s: number, o: any) => s + (o.total || 0), 0)
        const pending = orders.filter((o: any) => o.status === "pending").length
        setStats({
          orders: orders.length,
          revenue,
          pending,
          quotes: quotesRes.ok ? (await quotesRes.json()).totalDocs ?? 0 : 0,
          leads: leadsRes.ok ? (await leadsRes.json()).totalDocs ?? 0 : 0,
          appointments: apptRes.ok ? (await apptRes.json()).totalDocs ?? 0 : 0,
          messages: msgRes.ok ? (await msgRes.json()).totalDocs ?? 0 : 0,
          applications: jobRes.ok ? (await jobRes.json()).totalDocs ?? 0 : 0,
        })
      } catch { /* silent */ } finally { setLoading(false) }
    })()
  }, [])

  // ── Section definitions ───────────────────────────────────────────────────
  const adminItems: SectionItem[] = [
    { label: "المستخدمون", sub: "الأدوار والصلاحيات", href: "/admin/collections/users" },
    { label: "مكتبة الوسائط", sub: "الصور والملفات المرفوعة", href: "/admin/collections/media" },
  ]

  const pageContentItems: SectionItem[] = [
    { label: "الصفحة الرئيسية", sub: "Homepage Global", href: "/admin/globals/homepage" },
    { label: "عن المؤسسة", sub: "About Page Global", href: "/admin/globals/about-page" },
    { label: "الشرائح (Hero)", sub: "Hero Slides", href: "/admin/collections/hero-slides" },
    { label: "الصفحات الحرة", sub: "Dynamic Pages", href: "/admin/collections/dynamic-pages" },
  ]

  const contentItems: SectionItem[] = [
    { label: "الخدمات", sub: "تفاصيل خدماتنا", href: "/admin/collections/services" },
    { label: "الأعمال", sub: "Portfolio", href: "/admin/collections/portfolio" },
    { label: "المدونة", sub: "Blog Posts", href: "/admin/collections/posts" },
    { label: "أعضاء الفريق", sub: "Team Members", href: "/admin/collections/team" },
    { label: "آراء العملاء", sub: "Testimonials", href: "/admin/collections/testimonials" },
    { label: "الشركاء والعملاء", sub: "Partners & Clients", href: "/admin/collections/partners" },
    { label: "الأسئلة الشائعة", sub: "FAQs", href: "/admin/collections/f-a-qs" },
    { label: "الوظائف", sub: "Careers Listings", href: "/admin/collections/careers" },
    { label: "العروض والحزم", sub: "Offers & Packages", href: "/admin/collections/offers" },
    { label: "أخبار وفعاليات", sub: "News & Events", href: "/admin/collections/news" },
    { label: "المكتبة", sub: "Resources Library", href: "/admin/collections/resources" },
  ]

  const crmItems: SectionItem[] = [
    { label: "طلبات عروض السعر", sub: `${stats.quotes} طلب نشط`, href: "/admin/collections/quote-requests" },
    { label: "المواعيد", sub: `${stats.appointments} موعد مؤكد`, href: "/admin/collections/appointments" },
    { label: "رسائل التواصل", sub: `${stats.messages} رسالة واردة`, href: "/admin/collections/contact-messages" },
    { label: "طلبات التوظيف", sub: `${stats.applications} طلب للمراجعة`, href: "/admin/collections/job-applications" },
  ]

  const storeItems: SectionItem[] = [
    { label: "الفئات والماركات", sub: "Categories & Brands", href: "/admin/collections/categories" },
    { label: "المنتجات", sub: "Product Catalog", href: "/admin/collections/products" },
    { label: "الكوبونات", sub: "Discount Codes", href: "/admin/collections/coupons" },
    { label: "الطلبات", sub: `${stats.orders} طلب كلي`, href: "/admin/collections/orders" },
    { label: "مناطق الشحن", sub: "Shipping Zones", href: "/admin/collections/shipping-zones" },
  ]

  const settingsItems: SectionItem[] = [
    { label: "إعدادات الموقع", sub: "SiteSettings Global", href: "/admin/globals/site-settings" },
    { label: "القائمة الجانبية والتذييل", sub: "Navigation Global", href: "/admin/globals/navigation" },
    { label: "بوابات الدفع", sub: "Moyasar / Stripe / بنكي", href: "/admin/globals/payment-gateways" },
  ]

  const now = new Date()
  const dateAr = now.toLocaleDateString("ar-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

  return (
    <div style={{ padding: "32px", fontFamily: "'Tajawal', system-ui, sans-serif", direction: "rtl", background: C.bg, minHeight: "100vh" }}>

      {/* ── Page Header ─────────────────────────────────────────── */}
      <div style={{ marginBottom: "2rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ fontSize: "0.75rem", color: C.gray, marginBottom: "5px", fontWeight: 500 }}>
            الصفحة الرئيسية &rsaquo; لوحة التحكم
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: C.navy, margin: 0, letterSpacing: "-0.02em" }}>
            لوحة التحكم
          </h1>
        </div>
        <div style={{ fontSize: "0.75rem", color: C.gray }}>{dateAr}</div>
      </div>

      {/* ── KPI Bar ─────────────────────────────────────────────── */}
      <SummaryBar stats={stats} loading={loading} />

      {/* ── Section Cards ───────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 520px), 1fr))", gap: "1.5rem" }}>

        {/* 1 — الإدارة */}
        <SectionCard title="الإدارة" icon="🔐" items={adminItems} columns={2} />

        {/* 2 — محتوى الصفحات */}
        <SectionCard title="محتوى الصفحات" icon="📄" items={pageContentItems} columns={2} />

        {/* 3 — المحتوى (3 columns for large list) */}
        <SectionCard title="المحتوى" icon="✍️" items={contentItems} columns={3} />

        {/* 4 — الطلبات والعملاء المحتملون  */}
        <SectionCard title="الطلبات والعملاء المحتملون" icon="🎯" items={crmItems} columns={2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: C.border }}>
            <KpiTile label="عروض أسعار" value={stats.quotes} color="#8B5CF6" />
            <KpiTile label="مواعيد" value={stats.appointments} color="#10B981" />
            <KpiTile label="رسائل" value={stats.messages} color="#3B82F6" />
            <KpiTile label="طلبات توظيف" value={stats.applications} color={C.gold} />
          </div>
        </SectionCard>

        {/* 5 — المتجر الإلكتروني */}
        <SectionCard title="المتجر الإلكتروني" icon="🛒" items={storeItems} columns={2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: C.border }}>
            <KpiTile label="طلبات" value={stats.orders} color={C.navy} />
            <KpiTile label="إيرادات" value={loading ? "..." : fmtSAR(stats.revenue)} color={C.gold} />
            <KpiTile label="معلقة" value={stats.pending} color="#EF4444" />
          </div>
        </SectionCard>

        {/* 6 — الإعدادات */}
        <SectionCard title="الإعدادات" icon="⚙️" items={settingsItems} columns={2} />

      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", color: C.gray, fontSize: "0.72rem", marginTop: "3rem", opacity: 0.5 }}>
        إتحاد الريادة &copy; {new Date().getFullYear()} — جميع الحقوق محفوظة
      </div>
    </div>
  )
}
