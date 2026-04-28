"use client"

import React, { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@payloadcms/ui"

// ── Icons ──────────────────────────────────────────────────────────────────
const Ic = ({ d, size = 18, rotate = 0 }: { d: string; size?: number; rotate?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0, transform: `rotate(${rotate}deg)`, transition: "transform 0.3s ease" }}>
    <path d={d} />
  </svg>
)

const P = {
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  bag: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0",
  globe: "M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  menu: "M3 12h18M3 6h18M3 18h18",
  chevron: "M6 9l6 6 6-6",
}

// ── Data ───────────────────────────────────────────────────────────────────
type Link = { label: string; href: string; icon?: string }
type Group = { label: string; id: string; icon: keyof typeof P; children: Link[] }

const NAV_GROUPS: Group[] = [
  {
    label: "إدارة الموقع",
    id: "site",
    icon: "globe",
    children: [
      { label: "رئيسية الموقع", href: "/admin/website" },
      { label: "الصفحات", href: "/admin/collections/dynamic-pages" },
      { label: "المدونة", href: "/admin/collections/posts" },
      { label: "معرض الأعمال", href: "/admin/collections/portfolio" },
    ]
  },
  {
    label: "إدارة النظام",
    id: "system",
    icon: "settings",
    children: [
      { label: "المستخدمون", href: "/admin/collections/users" },
      { label: "إعدادات الموقع", href: "/admin/globals/site-settings" },
      { label: "الوسائط", href: "/admin/collections/media" },
    ]
  },
  {
    label: "إدارة المتجر",
    id: "store",
    icon: "bag",
    children: [
      { label: "رئيسية المتجر", href: "/admin/commerce" },
      { label: "المنتجات", href: "/admin/collections/products" },
      { label: "التصنيفات", href: "/admin/collections/categories" },
      { label: "الطلبات", href: "/admin/collections/orders" },
      { label: "العملاء", href: "/admin/collections/customers" },
    ]
  }
]

// ── Components ─────────────────────────────────────────────────────────────

function NavLink({ label, href, isNested, isActive }: Link & { isNested?: boolean; isActive: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 16px",
        paddingRight: isNested ? "48px" : "16px",
        textDecoration: "none",
        color: isActive ? "#111827" : hov ? "#374151" : "#6B7280",
        background: isActive ? "#F3F4F6" : hov ? "#F9FAFB" : "transparent",
        borderRadius: "8px",
        fontSize: "0.95rem",
        fontWeight: isActive ? 700 : 500,
        transition: "all 0.2s ease",
        marginBottom: "2px",
      }}
    >
      {label}
    </a>
  )
}

function NavGroup({ group, isOpen, onToggle, pathname, collapsed }: { group: Group; isOpen: boolean; onToggle: () => void; pathname: string; collapsed: boolean }) {
  const [hov, setHov] = useState(false)
  const hasActiveChild = group.children.some(c => pathname.startsWith(c.href))

  return (
    <div style={{ marginBottom: "4px" }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "12px 16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          borderRadius: "10px",
          color: (isOpen || hasActiveChild) ? "#111827" : "#4B5563",
          fontWeight: (isOpen || hasActiveChild) ? 800 : 600,
          transition: "all 0.2s ease",
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Ic d={P[group.icon]} size={20} />
          {!collapsed && <span>{group.label}</span>}
        </div>
        {!collapsed && <Ic d={P.chevron} size={16} rotate={isOpen ? 180 : 0} />}
      </button>

      {isOpen && !collapsed && (
        <div style={{ margin: "4px 0" }}>
          {group.children.map(child => (
            <NavLink
              key={child.href}
              {...child}
              isNested
              isActive={pathname === child.href}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main Sidebar ────────────────────────────────────────────────────────────

export default function CustomSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [openGroupId, setOpenGroupId] = useState<string | null>("store")
  const pathname = usePathname() ?? ""
  const { logOut, user } = useAuth() as any
  const router = useRouter()

  // Auto-expand group containing active link
  useEffect(() => {
    const activeGroup = NAV_GROUPS.find(g => g.children.some(c => pathname.startsWith(c.href)))
    if (activeGroup) setOpenGroupId(activeGroup.id)
  }, [pathname])

  const handleLogout = async () => {
    const response = await fetch("/api/users/logout", { method: "POST" })
    if (response.ok) {
      if (typeof logOut === "function") await logOut()
      router.push("/admin/login")
      router.refresh()
    }
  }

  return (
    <div
      dir="rtl"
      style={{
        display: "flex",
        flexDirection: "column",
        width: collapsed ? "80px" : "280px",
        minHeight: "100vh",
        background: "#F9FAFB", // Crisp Light Mode (Gray-50)
        borderLeft: "1px solid #E5E7EB",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        fontFamily: "'Cairo', sans-serif",
        flexShrink: 0,
        zIndex: 100,
      }}
    >
      {/* Header */}
      <div style={{
        padding: "24px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        borderBottom: "1px solid #F3F4F6",
        marginBottom: "12px",
      }}>
        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "#111827", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.9rem", fontWeight: 900
            }}>ER</div>
            <span style={{ fontWeight: 900, fontSize: "1.1rem", color: "#111827" }}>الريادة</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: "4px" }}
        >
          <Ic d={P.menu} size={20} />
        </button>
      </div>

      {/* Static Dashboard Link */}
      <div style={{ padding: "0 12px", marginBottom: "8px" }}>
        <a href="/admin" style={{
          display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px",
          textDecoration: "none", borderRadius: "10px",
          background: pathname === "/admin" ? "#F3F4F6" : "transparent",
          color: pathname === "/admin" ? "#111827" : "#4B5563",
          fontWeight: pathname === "/admin" ? 800 : 600,
          justifyContent: collapsed ? "center" : "flex-start",
        }}>
          <Ic d={P.dashboard} size={20} />
          {!collapsed && <span>لوحة التحكم</span>}
        </a>
      </div>

      {/* Accordion Groups */}
      <nav style={{ flex: 1, padding: "0 12px", overflowY: "auto" }}>
        {NAV_GROUPS.map(group => (
          <NavGroup
            key={group.id}
            group={group}
            collapsed={collapsed}
            isOpen={openGroupId === group.id}
            onToggle={() => setOpenGroupId(openGroupId === group.id ? null : group.id)}
            pathname={pathname}
          />
        ))}
      </nav>

      {/* User / Logout */}
      <div style={{ padding: "16px", borderTop: "1px solid #E5E7EB" }}>
        <a href="/admin/account" style={{
          display: "flex", alignItems: "center", gap: "12px", width: "100%",
          padding: "12px 14px", borderRadius: "10px", textDecoration: "none",
          background: pathname === "/admin/account" ? "#F3F4F6" : "transparent",
          color: "#4B5563", cursor: "pointer",
          fontWeight: 700, justifyContent: collapsed ? "center" : "flex-start",
          marginBottom: "4px"
        }}>
          <Ic d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" size={20} />
          {!collapsed && <span>الملف الشخصي</span>}
        </a>
        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: "12px", width: "100%",
          padding: "12px 14px", borderRadius: "10px", border: "none",
          background: "transparent", color: "#EF4444", cursor: "pointer",
          fontWeight: 700, justifyContent: collapsed ? "center" : "flex-start",
        }}>
          <Ic d={P.logout} size={20} />
          {!collapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>
    </div>
  )
}
