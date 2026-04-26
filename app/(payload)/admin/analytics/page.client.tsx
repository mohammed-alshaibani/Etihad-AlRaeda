"use client"

import React, { useEffect, useState } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────
type StatCard = { title: string; value: string | number; subtitle?: string; color?: string }
type TopProduct = { name: string; orders: number; revenue: number }
type RecentOrder = { orderNumber: string; customerName: string; total: number; status: string; createdAt: string }
type MonthlySales = { month: string; revenue: number; orders: number }

// ─── Helpers ──────────────────────────────────────────────────────────────────
const statusColors: Record<string, string> = {
    pending: "#f59e0b",
    confirmed: "#3b82f6",
    processing: "#8b5cf6",
    shipped: "#06b6d4",
    completed: "#10b981",
    cancelled: "#ef4444",
    refunded: "#6b7280",
}

const formatSAR = (n: number) =>
    new Intl.NumberFormat("ar-SA", { style: "currency", currency: "SAR", maximumFractionDigits: 0 }).format(n)

// ─── Simple inline bar chart (no external dependency) ────────────────────────
function MiniBarChart({ data }: { data: MonthlySales[] }) {
    const max = Math.max(...data.map((d) => d.revenue), 1)
    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "120px", padding: "8px 0" }}>
            {data.map((d) => (
                <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <div
                        title={formatSAR(d.revenue)}
                        style={{
                            width: "100%",
                            height: `${Math.max((d.revenue / max) * 100, 4)}px`,
                            background: "linear-gradient(180deg, #4f46e5, #818cf8)",
                            borderRadius: "4px 4px 0 0",
                            transition: "height 0.4s ease",
                        }}
                    />
                    <span style={{ fontSize: "10px", color: "#9ca3af", whiteSpace: "nowrap" }}>{d.month}</span>
                </div>
            ))}
        </div>
    )
}

// ─── Dashboard Component ───────────────────────────────────────────────────────
export default function AnalyticsDashboard() {
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState<StatCard[]>([])
    const [topProducts, setTopProducts] = useState<TopProduct[]>([])
    const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
    const [monthlySales, setMonthlySales] = useState<MonthlySales[]>([])
    const [rfqStats, setRfqStats] = useState({ total: 0, won: 0, conversionRate: 0, totalQuotedValue: 0 })

    useEffect(() => {
        async function fetchData() {
            try {
                const [ordersRes, quotesRes] = await Promise.all([
                    fetch("/api/orders?limit=200&sort=-createdAt"),
                    fetch("/api/quote-requests?limit=200"),
                ])
                const ordersData = ordersRes.ok ? await ordersRes.json() : { docs: [] }
                const quotesData = quotesRes.ok ? await quotesRes.json() : { docs: [] }

                const orders: any[] = ordersData.docs || []
                const quotes: any[] = quotesData.docs || []

                // ── Stats ────────────────────────────────────────────────────────────
                const totalRevenue = orders.filter(o => o.paymentStatus === "paid").reduce((sum: number, o: any) => sum + (o.total || 0), 0)
                const totalOrders = orders.length
                const pendingOrders = orders.filter(o => o.status === "pending").length
                const completedOrders = orders.filter(o => o.status === "completed").length

                // ── RFQ ──────────────────────────────────────────────────────────────
                const wonQuotes = quotes.filter(q => q.status === "accepted" || q.status === "won").length
                const quotedValue = quotes.reduce((sum: number, q: any) => sum + (q.quotedAmount || 0), 0)
                const convRate = quotes.length > 0 ? Math.round((wonQuotes / quotes.length) * 100) : 0

                setRfqStats({ total: quotes.length, won: wonQuotes, conversionRate: convRate, totalQuotedValue: quotedValue })

                setStats([
                    { title: "إجمالي الإيرادات", value: formatSAR(totalRevenue), subtitle: "المدفوعة فقط", color: "#10b981" },
                    { title: "إجمالي الطلبات", value: totalOrders, subtitle: `${pendingOrders} قيد الانتظار`, color: "#3b82f6" },
                    { title: "طلبات مكتملة", value: completedOrders, subtitle: `${totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0}% من الإجمالي`, color: "#8b5cf6" },
                    { title: "طلبات عروض الأسعار", value: quotes.length, subtitle: `${wonQuotes} تم تحويله`, color: "#f59e0b" },
                ])

                // ── Top Products ──────────────────────────────────────────────────────
                const productMap: Record<string, { name: string; orders: number; revenue: number }> = {}
                orders.forEach((order: any) => {
                    ; (order.items || []).forEach((item: any) => {
                        const name = item.productName || "منتج غير معروف"
                        const id = (item.product?.id || item.product || name) as string
                        if (!productMap[id]) productMap[id] = { name, orders: 0, revenue: 0 }
                        productMap[id].orders += item.quantity || 1
                        productMap[id].revenue += item.subtotal || 0
                    })
                })
                const sorted = Object.values(productMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5)
                setTopProducts(sorted)

                // ── Monthly Sales (last 6 months) ─────────────────────────────────────
                const monthMap: Record<string, MonthlySales> = {}
                const monthNames = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
                const now = new Date()
                for (let i = 5; i >= 0; i--) {
                    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
                    const key = `${d.getFullYear()}-${d.getMonth()}`
                    monthMap[key] = { month: monthNames[d.getMonth()], revenue: 0, orders: 0 }
                }
                orders.forEach((order: any) => {
                    const d = new Date(order.createdAt)
                    const key = `${d.getFullYear()}-${d.getMonth()}`
                    if (monthMap[key]) {
                        monthMap[key].revenue += order.paymentStatus === "paid" ? order.total || 0 : 0
                        monthMap[key].orders++
                    }
                })
                setMonthlySales(Object.values(monthMap))

                // ── Recent Orders ──────────────────────────────────────────────────────
                setRecentOrders(orders.slice(0, 8).map((o: any) => ({
                    orderNumber: o.orderNumber || "-",
                    customerName: o.customerName || "-",
                    total: o.total || 0,
                    status: o.status || "pending",
                    createdAt: new Date(o.createdAt).toLocaleDateString("ar-SA"),
                })))
            } catch (err) {
                console.error("Analytics fetch error:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // ─── Styles ──────────────────────────────────────────────────────────────────
    const card: React.CSSProperties = {
        background: "var(--theme-elevation-100, #1a1a2e)",
        border: "1px solid var(--theme-elevation-200, #2a2a4a)",
        borderRadius: "12px",
        padding: "20px",
    }
    const grid4: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }
    const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }

    if (loading) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px", color: "#9ca3af" }}>
            <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>📊</div>
                <div>جاري تحميل البيانات...</div>
            </div>
        </div>
    )

    return (
        <div style={{ padding: "24px", direction: "rtl", fontFamily: "inherit" }}>
            <h1 style={{ margin: "0 0 24px", fontSize: "24px", fontWeight: "700", color: "var(--theme-text)" }}>
                📊 لوحة التحليلات والأداء
            </h1>

            {/* ── Stat Cards ── */}
            <div style={{ ...grid4, marginBottom: "24px" }}>
                {stats.map((s) => (
                    <div key={s.title} style={{ ...card, borderTop: `3px solid ${s.color}` }}>
                        <div style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "6px" }}>{s.title}</div>
                        <div style={{ fontSize: "26px", fontWeight: "700", color: s.color }}>{s.value}</div>
                        {s.subtitle && <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>{s.subtitle}</div>}
                    </div>
                ))}
            </div>

            {/* ── Sales Chart + RFQ Stats ── */}
            <div style={{ ...grid2, marginBottom: "24px" }}>
                <div style={card}>
                    <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "var(--theme-text)" }}>
                        📈 الإيرادات — آخر 6 أشهر
                    </div>
                    <MiniBarChart data={monthlySales} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                        {monthlySales.map(d => (
                            <div key={d.month} style={{ textAlign: "center", fontSize: "10px", color: "#6b7280" }}>
                                <div style={{ color: "#818cf8", fontWeight: "600" }}>{d.orders}</div>
                                <div>طلب</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={card}>
                    <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "16px", color: "var(--theme-text)" }}>
                        📋 إحصائيات عروض الأسعار (RFQ)
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        {[
                            { label: "إجمالي الطلبات", value: rfqStats.total, color: "#3b82f6" },
                            { label: "تم التحويل", value: rfqStats.won, color: "#10b981" },
                            { label: "معدل التحويل", value: `${rfqStats.conversionRate}%`, color: rfqStats.conversionRate >= 30 ? "#10b981" : "#f59e0b" },
                            { label: "قيمة العروض", value: formatSAR(rfqStats.totalQuotedValue), color: "#8b5cf6" },
                        ].map(item => (
                            <div key={item.label} style={{ background: "var(--theme-elevation-200, #1e1e3f)", borderRadius: "8px", padding: "12px" }}>
                                <div style={{ fontSize: "11px", color: "#9ca3af" }}>{item.label}</div>
                                <div style={{ fontSize: "20px", fontWeight: "700", color: item.color }}>{item.value}</div>
                            </div>
                        ))}
                    </div>
                    {/* Conversion Bar */}
                    <div style={{ marginTop: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#9ca3af", marginBottom: "6px" }}>
                            <span>معدل التحويل</span><span>{rfqStats.conversionRate}%</span>
                        </div>
                        <div style={{ background: "#1e1e3f", borderRadius: "99px", height: "8px", overflow: "hidden" }}>
                            <div style={{ width: `${rfqStats.conversionRate}%`, height: "100%", background: "linear-gradient(90deg, #10b981, #34d399)", borderRadius: "99px", transition: "width 0.6s ease" }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Top Products + Recent Orders ── */}
            <div style={{ ...grid2 }}>
                <div style={card}>
                    <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "var(--theme-text)" }}>
                        🏆 أعلى المنتجات مبيعاً
                    </div>
                    {topProducts.length === 0 ? (
                        <div style={{ color: "#6b7280", fontSize: "13px", textAlign: "center", padding: "20px" }}>لا توجد بيانات بعد</div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {topProducts.map((p, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", background: "var(--theme-elevation-200, #1e1e3f)", borderRadius: "8px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"][i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", color: "#fff" }}>{i + 1}</div>
                                        <div style={{ fontSize: "13px", color: "var(--theme-text)" }}>{p.name}</div>
                                    </div>
                                    <div style={{ textAlign: "end" }}>
                                        <div style={{ fontSize: "13px", fontWeight: "600", color: "#10b981" }}>{formatSAR(p.revenue)}</div>
                                        <div style={{ fontSize: "11px", color: "#6b7280" }}>{p.orders} وحدة</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={card}>
                    <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "var(--theme-text)" }}>
                        🧾 آخر الطلبات
                    </div>
                    {recentOrders.length === 0 ? (
                        <div style={{ color: "#6b7280", fontSize: "13px", textAlign: "center", padding: "20px" }}>لا توجد طلبات بعد</div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {recentOrders.map((o, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "var(--theme-elevation-200, #1e1e3f)", borderRadius: "8px", fontSize: "12px" }}>
                                    <div>
                                        <div style={{ color: "var(--theme-text)", fontWeight: "600" }}>{o.orderNumber}</div>
                                        <div style={{ color: "#9ca3af" }}>{o.customerName}</div>
                                    </div>
                                    <div style={{ textAlign: "end" }}>
                                        <div style={{ color: "#10b981", fontWeight: "600" }}>{formatSAR(o.total)}</div>
                                        <div style={{ display: "inline-block", background: `${statusColors[o.status]}22`, color: statusColors[o.status], borderRadius: "4px", padding: "2px 6px", fontSize: "10px" }}>{o.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginTop: "16px", color: "#4b5563", fontSize: "11px", textAlign: "center" }}>
                البيانات مُحدَّثة في الوقت الفعلي من Payload CMS
            </div>
        </div>
    )
}
