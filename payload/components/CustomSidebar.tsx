"use client"

import React, { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@payloadcms/ui"

// ── Thin-outline SVG icon renderer ──────────────────────────────────────────
const Ic = ({ d, size = 18 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0 }}>
    <path d={d} />
  </svg>
)

// ── Icon paths (Lucide-compatible) ───────────────────────────────────────────
const P = {
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  bag: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0",
  globe: "M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  menu: "M3 12h18M3 6h18M3 18h18",
}

// ── Nav items ─────────────────────────────────────────────────────────────
type Link = { label: string; href: string; icon: keyof typeof P }

const NAV_ITEMS: Link[] = [
  { label: "لوحة التحكم", href: "/admin", icon: "dashboard" },
  { label: "إدارة المتجر", href: "/admin/commerce", icon: "bag" },
  { label: "إدارة الموقع", href: "/admin/website", icon: "globe" },
  { label: "إدارة النظام", href: "/admin/system", icon: "settings" },
]

// ── Design tokens ───────────────────────────────────────────────────────────
const T = {
  white: "#FFFFFF",
  bg: "#F8F9FA",
  border: "#E5E7EB",
  activeBg: "#FFF7ED", // Soft Amber/Slate established previously
  activeText: "#9A3412",
  text: "#334155",
  textSub: "#64748B",
  textMuted: "#94A3B8",
  hoverBg: "#F1F5F9",
  red: "#EF4444",
  redHover: "#FEF2F2",
}

// ── Nav sidebar ─────────────────────────────────────────────────────────────
export default function CustomSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [logoutHov, setLogoutHov] = useState(false)
  const pathname = usePathname() ?? ""
  const { logOut, user } = useAuth() as any
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      if (response.ok) {
        if (typeof logOut === "function") await logOut()
        router.push("/admin/login")
        router.refresh()
      }
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const initials = (user?.name || user?.email || "A")
    .split(" ").slice(0, 2).map((w: string) => w[0].toUpperCase()).join("")

  return (
    <div
      dir="rtl"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: collapsed ? "72px" : "260px",
        minHeight: "100vh",
        height: "100%",
        background: T.white,
        borderLeft: `1px solid ${T.border}`,
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        fontFamily: "'Tajawal', system-ui, sans-serif",
        flexShrink: 0,
      }}
    >
      {/* ── Logo + toggle ─────────────────────────────────────── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        padding: "20px 16px",
        borderBottom: `1px solid ${T.border}`,
      }}>
        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "8px",
              background: "#0F172A", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.75rem", fontWeight: 800,
            }}>ER</div>
            <span style={{ fontWeight: 800, fontSize: "1rem", color: "#0F172A" }}>الريادة</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "none", border: "none", cursor: "pointer", color: T.textMuted,
            padding: "4px", borderRadius: "6px", display: "flex", alignItems: "center",
          }}
        >
          <Ic d={P.menu} size={18} />
        </button>
      </div>

      {/* ── Navigation Links ──────────────────────────────────── */}
      <nav style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
          return (
            <a
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: collapsed ? "12px 0" : "10px 14px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: "10px",
                textDecoration: "none",
                background: isActive ? T.activeBg : "transparent",
                color: isActive ? T.activeText : T.text,
                fontWeight: isActive ? 700 : 500,
                fontSize: "0.9rem",
                transition: "all 0.15s ease",
              }}
            >
              <Ic d={P[item.icon]} size={18} />
              {!collapsed && <span>{item.label}</span>}
            </a>
          )
        })}
      </nav>

      {/* ── Bottom: Logout ───────────────────────────────────── */}
      <div style={{ padding: "12px", borderTop: `1px solid ${T.border}` }}>
        <button
          onClick={handleLogout}
          onMouseEnter={() => setLogoutHov(true)}
          onMouseLeave={() => setLogoutHov(false)}
          style={{
            display: "flex", alignItems: "center", gap: "12px", width: "100%",
            padding: "10px 14px", borderRadius: "10px", border: "none",
            background: logoutHov ? T.redHover : "transparent",
            color: T.red, cursor: "pointer", fontWeight: 600, fontSize: "0.9rem",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <Ic d={P.logout} size={18} />
          {!collapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>
    </div>
  )
}
