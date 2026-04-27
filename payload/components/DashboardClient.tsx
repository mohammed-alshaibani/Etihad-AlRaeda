"use client"

import React, { useEffect, useState } from "react"

// ─── Design Tokens — SaaS Neutral Light Mode ──────────────────────────────────
const T = {
  bg: "#F9FAFB",         // bg-gray-50
  white: "#FFFFFF",      // cards
  border: "#E5E7EB",     // gray-200
  borderLight: "#F3F4F6", // gray-100
  text: "#0F172A",       // slate-900
  textSub: "#64748B",    // slate-500
  textMuted: "#94A3B8",  // slate-400
  hover: "#F8FAFC",      // slate-50
  activeBg: "#F1F5F9",   // slate-100
  activeText: "#0F172A",
  icon: "#475569",       // slate-600
  shadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  shadowHover: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
}

type StatsType = {
  orders: number; revenue: number; pending: number; quotes: number; leads: number; appointments: number; messages: number; applications: number
}
type SectionItem = { label: string; sub: string; href: string }

const fmtSAR = (n: number) =>
  new Intl.NumberFormat("ar-SA", { style: "currency", currency: "SAR", maximumFractionDigits: 0 }).format(n)

const analyticsRows = [
  { date: "٢٦ أبريل ٢٠٢٦", ref: "ORD-٢٠٢٦-٠٠١٢", status: "مكتمل", amount: "٣٬٢٥٠ ر.س", statusColor: "#16A34A", statusBg: "#DCFCE7" },
  { date: "٢٥ أبريل ٢٠٢٦", ref: "QUO-٢٠٢٦-٠٠٣٤", status: "معلق", amount: "٧٬٨٠٠ ر.س", statusColor: "#D97706", statusBg: "#FEF3C7" },
  { date: "٢٤ أبريل ٢٠٢٦", ref: "ORD-٢٠٢٦-٠٠١١", status: "مكتمل", amount: "١٬٥٠٠ ر.س", statusColor: "#16A34A", statusBg: "#DCFCE7" },
  { date: "٢٣ أبريل ٢٠٢٦", ref: "ORD-٢٠٢٦-٠٠١٠", status: "ملغي", amount: "٢٬١٠٠ ر.س", statusColor: "#DC2626", statusBg: "#FEE2E2" },
  { date: "٢٢ أبريل ٢٠٢٦", ref: "QUO-٢٠٢٦-٠٠٣٣", status: "مكتمل", amount: "٥٬٦٠٠ ر.س", statusColor: "#16A34A", statusBg: "#DCFCE7" },
]

function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: T.white, borderRadius: "16px", border: `1px solid ${T.border}`, boxShadow: T.shadow, overflow: "hidden", ...style }}>
      {children}
    </div>
  )
}

function ItemRow({ label, sub, href, isLast }: SectionItem & { isLast: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "14px 20px", direction: "rtl", textDecoration: "none",
        borderBottom: isLast ? "none" : `1px solid ${T.borderLight}`,
        background: hov ? T.hover : "transparent",
        transition: "all 0.15s ease",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: "0.88rem", color: T.text }}>{label}</div>
        <div style={{ fontSize: "0.72rem", color: T.textSub, marginTop: "2px" }}>{sub}</div>
      </div>
      <span style={{
        fontSize: "16px", color: hov ? T.text : T.textMuted,
        transform: hov ? "translateX(-3px)" : "none", transition: "all 0.2s",
      }}>←</span>
    </a>
  )
}

function SectionCard({ title, emoji, items, columns = 2 }: { title: string; emoji: string; items: SectionItem[]; columns?: number }) {
  const perCol = Math.ceil(items.length / columns)
  const cols = Array.from({ length: columns }, (_, i) => items.slice(i * perCol, (i + 1) * perCol))

  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "18px 24px", borderBottom: `1px solid ${T.border}`, direction: "rtl" }}>
        <span style={{ fontSize: "1.2rem" }}>{emoji}</span>
        <span style={{ fontWeight: 800, fontSize: "1rem", color: T.text }}>{title}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {cols.map((col, ci) => (
          <div key={ci} style={{ borderInlineStart: ci > 0 ? `1px solid ${T.borderLight}` : "none" }}>
            {col.map((item, i) => (
              <ItemRow key={item.href} {...item} isLast={i === col.length - 1} />
            ))}
          </div>
        ))}
      </div>
    </Card>
  )
}

function AnalyticsTable() {
  return (
    <Card>
      <div style={{ padding: "24px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", direction: "rtl" }}>
        <div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: T.text }}>تحليل الأداء</h2>
          <p style={{ fontSize: "0.85rem", color: T.textSub, marginTop: "4px" }}>آخر العمليات والنشاطات في المؤسسة</p>
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: T.bg, borderBottom: `1px solid ${T.border}` }}>
              <th style={{ padding: "16px 24px", textAlign: "right", color: T.textSub, fontSize: "0.75rem", fontWeight: 700 }}>التاريخ</th>
              <th style={{ padding: "16px 24px", textAlign: "right", color: T.textSub, fontSize: "0.75rem", fontWeight: 700 }}>المرجع</th>
              <th style={{ padding: "16px 24px", textAlign: "right", color: T.textSub, fontSize: "0.75rem", fontWeight: 700 }}>الحالة</th>
              <th style={{ padding: "16px 24px", textAlign: "right", color: T.textSub, fontSize: "0.75rem", fontWeight: 700 }}>المبلغ</th>
            </tr>
          </thead>
          <tbody>
            {analyticsRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${T.borderLight}` }}>
                <td style={{ padding: "16px 24px", color: T.textSub, fontSize: "0.85rem" }}>{row.date}</td>
                <td style={{ padding: "16px 24px", color: T.text, fontWeight: 600, fontSize: "0.85rem" }}>{row.ref}</td>
                <td style={{ padding: "16px 24px" }}>
                  <span style={{ padding: "4px 12px", borderRadius: "99px", background: row.statusBg, color: row.statusColor, fontSize: "0.75rem", fontWeight: 700 }}>
                    {row.status}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", color: T.text, fontWeight: 700, fontSize: "0.85rem" }}>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default function DashboardClient() {
  const [stats, setStats] = useState<StatsType>({ orders: 0, revenue: 0, pending: 0, quotes: 0, leads: 0, appointments: 0, messages: 0, applications: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ; (async () => {
      try {
        const [ordersRes, quotesRes, msgRes, jobRes] = await Promise.all([
          fetch("/api/orders?limit=200"),
          fetch("/api/quote-requests?limit=0"),
          fetch("/api/contact-messages?limit=0"),
          fetch("/api/job-applications?limit=0"),
        ])
        const orders = ordersRes.ok ? (await ordersRes.json()).docs ?? [] : []
        const quotes = quotesRes.ok ? (await quotesRes.json()).totalDocs ?? 0 : 0
        const messages = msgRes.ok ? (await msgRes.json()).totalDocs ?? 0 : 0
        const applications = jobRes.ok ? (await jobRes.json()).totalDocs ?? 0 : 0

        const revenue = orders.filter((o: any) => o.paymentStatus === "paid").reduce((s: number, o: any) => s + (o.total || 0), 0)

        setStats(prev => ({
          ...prev,
          orders: orders.length,
          revenue,
          quotes,
          messages,
          applications,
        }))
      } catch { /* silent */ } finally { setLoading(false) }
    })()
  }, [])

  const pageContentItems: SectionItem[] = [
    { label: "الصفحة الرئيسية", sub: "محتوى الواجهة الرئيسية", href: "/admin/globals/homepage" },
    { label: "عن المؤسسة", sub: "بيانات من نحن وتاريخنا", href: "/admin/globals/about-page" },
    { label: "الشرائح المميزة", sub: "إدارة البانر العلوي", href: "/admin/collections/hero-slides" },
    { label: "صفحات مخصصة", sub: "بناء صفحات ديناميكية", href: "/admin/collections/dynamic-pages" },
  ]

  const generalContentItems: SectionItem[] = [
    { label: "الخدمات", sub: "قائمة الخدمات والحلول", href: "/admin/collections/services" },
    { label: "الأعمال", sub: "معرض المشاريع والمنجزات", href: "/admin/collections/portfolio" },
    { label: "المدونة", sub: "المقالات والمحتوى المعرفي", href: "/admin/collections/posts" },
  ]

  const commerceItems: SectionItem[] = [
    { label: "الطلبات", sub: `${stats.orders} طلب مسجل`, href: "/admin/collections/orders" },
    { label: "المنتجات", sub: "إدارة المخزن والأسعار", href: "/admin/collections/products" },
    { label: "العملاء", sub: "قاعدة بيانات العملاء", href: "/admin/collections/customers" },
    { label: "عروض الأسعار", sub: `${stats.quotes} عرض نشط`, href: "/admin/collections/quote-requests" },
    { label: "رسائل التواصل", sub: `${stats.messages} رسالة`, href: "/admin/collections/contact-messages" },
    { label: "التوظيف", sub: `${stats.applications} طلب وظيفي`, href: "/admin/collections/job-applications" },
  ]

  return (
    <div style={{ padding: "40px", minHeight: "100vh", background: T.bg, direction: "rtl", fontFamily: "'Tajawal', sans-serif" }}>
      <header style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p style={{ fontSize: "0.85rem", color: T.textSub, marginBottom: "8px" }}>مرحباً بك في لوحة تحكم إتحاد الريادة</p>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: T.text }}>نظرة عامة</h1>
        </div>
      </header>

      {/* TOP SECTION: Navigation Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px", marginBottom: "48px" }}>
        <SectionCard title="محتوى الصفحات" emoji="📄" items={pageContentItems} columns={2} />
        <SectionCard title="المحتوى" emoji="✍️" items={generalContentItems} columns={1} />
        <SectionCard title="إدارة المتجر والعملاء" emoji="🛒" items={commerceItems} columns={2} />
      </div>

      {/* BOTTOM SECTION: Analytics */}
      <div>
        <AnalyticsTable />
      </div>

      <footer style={{ marginTop: "64px", borderTop: `1px solid ${T.border}`, paddingTop: "24px", textAlign: "center", color: T.textMuted, fontSize: "0.8rem" }}>
        إتحاد الريادة &copy; {new Date().getFullYear()} — كافة الحقوق محفوظة
      </footer>
    </div>
  )
}
