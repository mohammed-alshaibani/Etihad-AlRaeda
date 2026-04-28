"use client"

import React, { useEffect, useState } from "react"

const T = {
  bg: "#F0F2F5",
  text: "#0F172A",
  textSub: "#475569",
  accent: "#3B82F6",
  success: "#10B981",
}

// ── Components ──────────────────────────────────────────────────────────────

const Sparkline = ({ color = T.accent, data = [10, 40, 30, 70, 50, 90] }) => (
  <svg width="100" height="40" viewBox="0 0 100 40" style={{ overflow: "visible" }}>
    <path
      d={`M ${data.map((v, i) => `${i * 20} ${40 - v * 0.4}`).join(" L ")}`}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="sparkline-path"
    />
  </svg>
)

const KPIWidget = ({ title, value, sub, color, data }: { title: string; value: string; sub: string; color: string; data?: number[] }) => (
  <div className="n-card n-card-hover" style={{ padding: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>
      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: T.textSub, marginBottom: "8px" }}>{title}</p>
      <h3 style={{ fontSize: "2.4rem", fontWeight: 900, color: T.text }}>{value}</h3>
      <p style={{ fontSize: "0.85rem", color: color, fontWeight: 700, marginTop: "4px" }}>{sub}</p>
    </div>
    <div style={{ marginRight: "24px", opacity: 0.8 }}>
      <Sparkline color={color} data={data} />
    </div>
  </div>
)

const BentoGridItem = ({ label, sub, href, icon: Icon }: { label: string; sub: string; href: string; icon: any }) => (
  <a href={href} className="n-card n-card-hover" style={{
    padding: "24px", textDecoration: "none", display: "flex", flexDirection: "column", gap: "16px",
    background: "linear-gradient(145deg, #ffffff, #f0f2f5)"
  }}>
    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: T.accent }}>
      {Icon}
    </div>
    <div>
      <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: T.text, marginBottom: "4px" }}>{label}</h4>
      <p style={{ fontSize: "0.85rem", color: T.textSub, lineHeight: "1.4" }}>{sub}</p>
    </div>
  </a>
)

const AnalyticsTable = () => (
  <div className="n-card" style={{ padding: "32px", overflow: "hidden" }}>
    <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: T.text }}>تحليل الأداء</h2>
      <div className="n-card-in" style={{ padding: "8px 16px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: 700 }}>آخر ٣٠ يوم</div>
    </div>
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 12px" }}>
        <thead>
          <tr>
            {["التاريخ", "المرجع", "الحالة", "المبلغ"].map(h => (
              <th key={h} style={{ textAlign: "right", padding: "0 16px", color: T.textSub, fontSize: "0.8rem", fontWeight: 800 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { date: "٢٨ أبريل", ref: "ORD-9981", status: "مكتمل", amount: "١٬٤٩٠ ر.س", color: T.success },
            { date: "٢٧ أبريل", ref: "QUO-4421", status: "معلق", amount: "٥٬٢٠٠ ر.س", color: "#F59E0B" },
            { date: "٢٦ أبريل", ref: "ORD-9980", status: "مرفوض", amount: "٨٥٠ ر.س", color: "#EF4444" },
          ].map((row, i) => (
            <tr key={i} className="n-card-in" style={{ borderRadius: "12px" }}>
              <td style={{ padding: "16px", fontSize: "0.9rem", color: T.textSub }}>{row.date}</td>
              <td style={{ padding: "16px", fontSize: "0.9rem", fontWeight: 700 }}>{row.ref}</td>
              <td style={{ padding: "16px" }}>
                <span className="badge" style={{ background: row.color + "22", color: row.color }}>{row.status}</span>
              </td>
              <td style={{ padding: "16px", fontSize: "1rem", fontWeight: 900 }}>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

// ── Main Page ─────────────────────────────────────────────────────────────

export default function DashboardClient() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, quotes: 0 })
  const [hov, setHov] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/orders?limit=0").then(r => r.json()).then(d => setStats(s => ({ ...s, orders: d.totalDocs || 0 })))
    fetch("/api/quote-requests?limit=0").then(r => r.json()).then(d => setStats(s => ({ ...s, quotes: d.totalDocs || 12 })))
  }, [])

  return (
    <div style={{ padding: "60px", minHeight: "100vh", position: "relative" }}>
      {/* Dynamic Header */}
      <header style={{ marginBottom: "60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: T.text, marginBottom: "8px" }}>نظرة عامة</h1>
          <p style={{ fontSize: "1.1rem", color: T.textSub }}>أهلاً بك في الجيل الجديد من إدارة "إتحاد الريادة"</p>
        </div>
      </header>

      {/* KPI Section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "60px" }}>
        <KPIWidget title="إجمالي الطلبات" value={stats.orders.toString()} sub="+١٢٪ هذا الأسبوع" color={T.success} data={[20, 50, 40, 80, 60, 95]} />
        <KPIWidget title="عروض الأسعار" value={stats.quotes.toString()} sub="نشط الآن" color={T.accent} data={[40, 30, 50, 45, 70, 65]} />
      </div>


      {/* Bento Bento Grid */}
      <div style={{ marginBottom: "60px" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: T.text, marginBottom: "32px", borderRight: `6px solid ${T.accent}`, paddingRight: "20px" }}>
          إدارة النظام والمحتوى
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
          <BentoGridItem label="إدارة المتجر" sub="المنتجات والطلبات والعملاء" href="/admin/commerce" icon={<span>🛒</span>} />
          <BentoGridItem label="المحتوى العالمي" href="/admin/website" sub="الإعدادات والقوائم" icon={<span>🌐</span>} />
          <BentoGridItem label="الصفحات" href="/admin/collections/dynamic-pages" sub="بناء الصفحات الديناميكية" icon={<span>📄</span>} />
          <BentoGridItem label="المدونة" href="/admin/collections/posts" sub="المقالات والأخبار" icon={<span>✍️</span>} />
        </div>
      </div>

      <AnalyticsTable />
    </div>
  )
}
