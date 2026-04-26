"use client"

import React, { useEffect, useState } from "react"

// ─── Design Tokens — Strictly Neutral Light Mode ──────────────────────────────
const T = {
  bg: "#F8F9FA",         // page background: cool gray
  white: "#FFFFFF",      // cards
  border: "#E5E7EB",     // gray-200
  borderLight: "#F3F4F6", // gray-100
  text: "#111827",       // gray-900  — primary headings
  textSub: "#6B7280",    // gray-500  — secondary text
  textMuted: "#9CA3AF",  // gray-400  — tertiary / placeholders
  hover: "#F9FAFB",      // gray-50   — hover backgrounds
  activeBg: "#F3F4F6",   // gray-100  — active link bg
  activeText: "#111827", // bold black
  icon: "#374151",       // gray-700  — dark neutral icons
  shadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
  shadowHover: "0 4px 16px rgba(0,0,0,0.10)",
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

// ─── Mock Analytics Table Data ────────────────────────────────────────────────
const analyticsRows = [
  { date: "٢٦ أبريل ٢٠٢٦", ref: "ORD-٢٠٢٦-٠٠١٢", status: "مكتمل", amount: "٣٬٢٥٠ ر.س", statusColor: "#16A34A", statusBg: "#DCFCE7" },
  { date: "٢٥ أبريل ٢٠٢٦", ref: "QUO-٢٠٢٦-٠٠٣٤", status: "معلق",   amount: "٧٬٨٠٠ ر.س", statusColor: "#D97706", statusBg: "#FEF3C7" },
  { date: "٢٤ أبريل ٢٠٢٦", ref: "ORD-٢٠٢٦-٠٠١١", status: "مكتمل", amount: "١٬٥٠٠ ر.س", statusColor: "#16A34A", statusBg: "#DCFCE7" },
  { date: "٢٣ أبريل ٢٠٢٦", ref: "ORD-٢٠٢٦-٠٠١٠", status: "ملغي",   amount: "٢٬١٠٠ ر.س", statusColor: "#DC2626", statusBg: "#FEE2E2" },
  { date: "٢٢ أبريل ٢٠٢٦", ref: "QUO-٢٠٢٦-٠٠٣٣", status: "مكتمل", amount: "٥٬٦٠٠ ر.س", statusColor: "#16A34A", statusBg: "#DCFCE7" },
]

// ─── Shared card wrapper ──────────────────────────────────────────────────────
function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: T.white, borderRadius: "12px", border: `1px solid ${T.border}`, boxShadow: T.shadow, overflow: "hidden", ...style }}>
      {children}
    </div>
  )
}

// ─── KPI Stat Cards ───────────────────────────────────────────────────────────
function StatCard({
  label, value, sub, icon,
}: { label: string; value: string | number; sub: string; icon: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.white,
        borderRadius: "12px",
        border: `1px solid ${hov ? "#D1D5DB" : T.border}`,
        boxShadow: hov ? T.shadowHover : T.shadow,
        padding: "24px",
        direction: "rtl",
        transition: "all 0.2s ease",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div>
          <div style={{ fontSize: "0.75rem", color: T.textSub, fontWeight: 600, marginBottom: "8px", letterSpacing: "0.02em" }}>
            {label}
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: T.text, lineHeight: 1 }}>
            {value}
          </div>
          <div style={{ fontSize: "0.73rem", color: T.textMuted, marginTop: "6px" }}>{sub}</div>
        </div>
        <div style={{
          width: "44px", height: "44px", background: T.borderLight,
          borderRadius: "10px", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "1.3rem", flexShrink: 0,
        }}>
          {icon}
        </div>
      </div>
    </div>
  )
}

// ─── Analytics Data Table ─────────────────────────────────────────────────────
function AnalyticsTable() {
  const cols = [
    { key: "date",   label: "التاريخ" },
    { key: "ref",    label: "المرجع" },
    { key: "status", label: "الحالة" },
    { key: "amount", label: "المبلغ" },
  ]
  return (
    <Card>
      <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", direction: "rtl" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: "1rem", color: T.text }}>تحليل الأداء</div>
          <div style={{ fontSize: "0.75rem", color: T.textSub, marginTop: "2px" }}>آخر ٥ معاملات</div>
        </div>
        <a href="/admin/collections/orders" style={{ fontSize: "0.78rem", color: T.textSub, textDecoration: "none", fontWeight: 600, padding: "6px 14px", border: `1px solid ${T.border}`, borderRadius: "8px", background: T.white, transition: "all 0.15s" }}>
          عرض الكل
        </a>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.84rem" }}>
          <thead>
            <tr style={{ background: T.hover }}>
              {cols.map(col => (
                <th key={col.key} style={{
                  padding: "12px 24px", textAlign: "right", color: T.textSub,
                  fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.05em",
                  borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap",
                }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {analyticsRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: i < analyticsRows.length - 1 ? `1px solid ${T.borderLight}` : "none" }}>
                <td style={{ padding: "14px 24px", color: T.textSub, whiteSpace: "nowrap" }}>{row.date}</td>
                <td style={{ padding: "14px 24px", color: T.text, fontWeight: 600, fontFamily: "monospace", fontSize: "0.8rem" }}>{row.ref}</td>
                <td style={{ padding: "14px 24px" }}>
                  <span style={{
                    display: "inline-block", padding: "3px 10px", borderRadius: "20px",
                    fontSize: "0.72rem", fontWeight: 700, background: row.statusBg, color: row.statusColor,
                  }}>
                    {row.status}
                  </span>
                </td>
                <td style={{ padding: "14px 24px", color: T.text, fontWeight: 700, direction: "rtl" }}>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

// ─── Item Row inside a Section Card ──────────────────────────────────────────
function ItemRow({ label, sub, href, isLast }: SectionItem & { isLast: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "13px 20px", direction: "rtl", textDecoration: "none",
        borderBottom: isLast ? "none" : `1px solid ${T.borderLight}`,
        background: hov ? T.hover : "transparent",
        transition: "background 0.15s ease",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: "0.86rem", color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {label}
        </div>
        <div style={{ fontSize: "0.71rem", color: T.textMuted, marginTop: "2px" }}>{sub}</div>
      </div>
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: "24px", height: "24px", flexShrink: 0,
        background: hov ? T.activeBg : T.borderLight,
        color: hov ? T.activeText : T.icon,
        borderRadius: "7px", fontSize: "16px", fontWeight: 700,
        transition: "all 0.15s ease",
      }}>
        +
      </span>
    </a>
  )
}

// ─── Section Card Header ──────────────────────────────────────────────────────
function SectionCard({
  title, emoji, items, children, columns = 2,
}: {
  title: string; emoji: string; items?: SectionItem[]
  children?: React.ReactNode; columns?: number
}) {
  const cols: SectionItem[][] = []
  if (items) {
    const perCol = Math.ceil(items.length / columns)
    for (let c = 0; c < columns; c++) {
      cols.push(items.slice(c * perCol, (c + 1) * perCol))
    }
  }

  return (
    <Card>
      {/* Card Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "16px 20px", borderBottom: `1px solid ${T.border}`, direction: "rtl",
      }}>
        <div style={{
          width: "36px", height: "36px", background: T.borderLight, borderRadius: "9px",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0,
        }}>
          {emoji}
        </div>
        <span style={{ fontWeight: 700, fontSize: "0.95rem", color: T.text }}>{title}</span>
      </div>

      {/* Optional KPI mini bar */}
      {children}

      {/* Item columns */}
      {items && (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {cols.map((col, ci) => (
            <div key={ci} style={{ borderInlineEnd: ci > 0 ? `1px solid ${T.borderLight}` : "none" }}>
              {col.map((item, i) => (
                <ItemRow key={item.href} {...item} isLast={i === col.length - 1} />
              ))}
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

// ─── Mini KPI inline strip ────────────────────────────────────────────────────
function MiniKpiStrip({ items }: { items: { label: string; value: string | number }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${items.length}, 1fr)`, borderBottom: `1px solid ${T.border}` }}>
      {items.map((k, i) => (
        <div key={i} style={{
          padding: "14px 16px", direction: "rtl", textAlign: "right",
          borderInlineEnd: i > 0 ? `1px solid ${T.borderLight}` : "none",
        }}>
          <div style={{ fontSize: "1.35rem", fontWeight: 800, color: T.text, lineHeight: 1 }}>{k.value}</div>
          <div style={{ fontSize: "0.69rem", color: T.textSub, marginTop: "4px", fontWeight: 600 }}>{k.label}</div>
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
    ;(async () => {
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

  // ── Section data ─────────────────────────────────────────────────────────
  const adminItems: SectionItem[] = [
    { label: "المستخدمون", sub: "الأدوار والصلاحيات", href: "/admin/collections/users" },
    { label: "مكتبة الوسائط", sub: "الصور والملفات المرفوعة", href: "/admin/collections/media" },
  ]

  const pageContentItems: SectionItem[] = [
    { label: "الصفحة الرئيسية",  sub: "محتوى الصفحة الرئيسية",    href: "/admin/globals/homepage" },
    { label: "عن المؤسسة",       sub: "صفحة التعريف بالمؤسسة",    href: "/admin/globals/about-page" },
    { label: "الشرائح (Hero)",   sub: "شرائح الصدر التفاعلية",    href: "/admin/collections/hero-slides" },
    { label: "الصفحات الحرة",    sub: "صفحات مخصصة قابلة للبناء", href: "/admin/collections/dynamic-pages" },
  ]

  const contentItems: SectionItem[] = [
    { label: "الخدمات",          sub: "تفاصيل الخدمات المقدمة",   href: "/admin/collections/services" },
    { label: "الأعمال",          sub: "معرض الأعمال والمشاريع",   href: "/admin/collections/portfolio" },
    { label: "المدونة",          sub: "المقالات والتدوينات",       href: "/admin/collections/posts" },
    { label: "أعضاء الفريق",     sub: "ملفات أعضاء الفريق",       href: "/admin/collections/team" },
    { label: "آراء العملاء",     sub: "شهادات وتقييمات العملاء",  href: "/admin/collections/testimonials" },
    { label: "الشركاء والعملاء", sub: "العلامات التجارية الشريكة", href: "/admin/collections/partners" },
    { label: "الأسئلة الشائعة",  sub: "أسئلة يطرحها العملاء",     href: "/admin/collections/f-a-qs" },
    { label: "الوظائف",          sub: "الوظائف المتاحة",           href: "/admin/collections/careers" },
    { label: "العروض والحزم",    sub: "عروض الأسعار والحزم",       href: "/admin/collections/offers" },
    { label: "أخبار وفعاليات",   sub: "المستجدات والإعلانات",      href: "/admin/collections/news" },
    { label: "المكتبة",          sub: "الموارد والملفات القابلة للتحميل", href: "/admin/collections/resources" },
  ]

  const crmItems: SectionItem[] = [
    { label: "طلبات عروض السعر", sub: `${stats.quotes} طلب نشط`,           href: "/admin/collections/quote-requests" },
    { label: "المواعيد",          sub: `${stats.appointments} موعد مؤكد`,    href: "/admin/collections/appointments" },
    { label: "رسائل التواصل",    sub: `${stats.messages} رسالة واردة`,       href: "/admin/collections/contact-messages" },
    { label: "طلبات التوظيف",    sub: `${stats.applications} طلب للمراجعة`, href: "/admin/collections/job-applications" },
  ]

  const storeItems: SectionItem[] = [
    { label: "الفئات",         sub: "تصنيفات المنتجات",       href: "/admin/collections/categories" },
    { label: "الماركات",       sub: "العلامات التجارية",      href: "/admin/collections/brands" },
    { label: "المنتجات",       sub: "كتالوج المنتجات",        href: "/admin/collections/products" },
    { label: "الكوبونات",      sub: "أكواد الخصم والعروض",    href: "/admin/collections/coupons" },
    { label: "الطلبات",        sub: `${stats.orders} طلب كلي`, href: "/admin/collections/orders" },
    { label: "مناطق الشحن",    sub: "مناطق ورسوم التوصيل",    href: "/admin/collections/shipping-zones" },
  ]

  const settingsItems: SectionItem[] = [
    { label: "إعدادات الموقع",   sub: "الإعدادات العامة للموقع",   href: "/admin/globals/site-settings" },
    { label: "القائمة والتذييل", sub: "روابط التنقل والتذييل",      href: "/admin/globals/navigation" },
    { label: "بوابات الدفع",     sub: "موياسر / سترايب / بنكي",    href: "/admin/globals/payment-gateways" },
  ]

  const now = new Date()
  const dateAr = now.toLocaleDateString("ar-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

  return (
    <div style={{
      padding: "32px 36px",
      fontFamily: "'Tajawal', system-ui, sans-serif",
      direction: "rtl",
      background: T.bg,
      minHeight: "100vh",
    }}>

      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div style={{ marginBottom: "28px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <div style={{ fontSize: "0.72rem", color: T.textMuted, marginBottom: "6px", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px" }}>
            <span>الصفحة الرئيسية</span>
            <span style={{ fontSize: "0.65rem" }}>›</span>
            <span>لوحة التحكم</span>
          </div>
          <h1 style={{ fontSize: "1.65rem", fontWeight: 900, color: T.text, margin: 0, letterSpacing: "-0.025em" }}>
            لوحة التحكم
          </h1>
        </div>
        <div style={{
          background: T.white, border: `1px solid ${T.border}`, borderRadius: "10px",
          padding: "8px 16px", fontSize: "0.75rem", color: T.textSub, fontWeight: 500,
        }}>
          {dateAr}
        </div>
      </div>

      {/* ── KPI Stat Cards ────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px", marginBottom: "24px" }}>
        <StatCard label="إجمالي الطلبات"    value={stats.orders}    sub="كل الطلبات المسجلة"             icon="📦" />
        <StatCard label="الإيرادات (SAR)"   value={loading ? "—" : fmtSAR(stats.revenue)} sub="الطلبات المدفوعة فقط"   icon="💰" />
        <StatCard label="قيد الانتظار"      value={stats.pending}   sub="تحتاج إلى مراجعة"               icon="⏳" />
        <StatCard label="عروض الأسعار"      value={stats.quotes}    sub="طلبات نشطة"                     icon="📋" />
      </div>

      {/* ── Analytics Data Table ──────────────────────────────────────── */}
      <div style={{ marginBottom: "32px" }}>
        <AnalyticsTable />
      </div>

      {/* ── Divider ───────────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", direction: "rtl" }}>
        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: T.textSub, whiteSpace: "nowrap" }}>إدارة المحتوى</div>
        <div style={{ flex: 1, height: "1px", background: T.border }} />
      </div>

      {/* ── CMS Collections Grid ─────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 500px), 1fr))", gap: "20px" }}>

        {/* 1 — الإدارة */}
        <SectionCard title="الإدارة" emoji="🔐" items={adminItems} columns={2} />

        {/* 2 — محتوى الصفحات */}
        <SectionCard title="محتوى الصفحات" emoji="📄" items={pageContentItems} columns={2} />

        {/* 3 — المحتوى (wide, 3 cols) */}
        <div style={{ gridColumn: "1 / -1" }}>
          <SectionCard title="المحتوى" emoji="✍️" items={contentItems} columns={3} />
        </div>

        {/* 4 — الطلبات والعملاء */}
        <SectionCard title="الطلبات والعملاء المحتملون" emoji="🎯" items={crmItems} columns={2}>
          <MiniKpiStrip items={[
            { label: "عروض أسعار",    value: stats.quotes },
            { label: "مواعيد",        value: stats.appointments },
            { label: "رسائل",         value: stats.messages },
            { label: "طلبات توظيف",  value: stats.applications },
          ]} />
        </SectionCard>

        {/* 5 — المتجر الإلكتروني */}
        <SectionCard title="المتجر الإلكتروني" emoji="🛒" items={storeItems} columns={2}>
          <MiniKpiStrip items={[
            { label: "طلبات",  value: stats.orders },
            { label: "إيرادات", value: loading ? "—" : fmtSAR(stats.revenue) },
            { label: "معلقة",  value: stats.pending },
          ]} />
        </SectionCard>

        {/* 6 — الإعدادات */}
        <SectionCard title="الإعدادات والنظام" emoji="⚙️" items={settingsItems} columns={2} />

      </div>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", color: T.textMuted, fontSize: "0.72rem", marginTop: "3.5rem", paddingBottom: "1rem" }}>
        إتحاد الريادة &copy; {new Date().getFullYear()} — لوحة التحكم الإدارية
      </div>
    </div>
  )
}
