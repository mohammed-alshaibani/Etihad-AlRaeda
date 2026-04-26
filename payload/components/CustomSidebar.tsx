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
  dashboard:  "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  user:       "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  users:      "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 7a4 4 0 100-8 4 4 0 000 8z",
  image:      "M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-3h4l2 3h4a2 2 0 012 2zM12 15a4 4 0 100-8 4 4 0 000 8z",
  file:       "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  home:       "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10",
  edit:       "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  layers:     "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  shield:     "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  briefcase:  "M20 7H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
  package:    "M12 22l-9-5V7l9-5 9 5v10zM12 22V12M3 7l9 5 9-5",
  tag:        "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01",
  inbox:      "M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
  mail:       "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  calendar:   "M3 4h18v16H3V4zM16 2v4M8 2v4M3 10h18",
  msg:        "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  trending:   "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  settings:   "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  chart:      "M18 20V10M12 20V4M6 20v-6",
  card:       "M1 4h22v16H1V4zM1 10h22",
  globe:      "M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  bag:        "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0",
  logout:     "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  chevD:      "M6 9l6 6 6-6",
  chevU:      "M18 15l-6-6-6 6",
  menu:       "M3 12h18M3 6h18M3 18h18",
}

// ── Nav structure ────────────────────────────────────────────────────────────
type Link = { label: string; href: string; icon: keyof typeof P }
type Group = { title: string; icon: keyof typeof P; links: Link[] }

const GROUPS: Group[] = [
  {
    title: "الإدارة", icon: "shield",
    links: [
      { label: "المستخدمون",     href: "/admin/collections/users",   icon: "user"  },
      { label: "مكتبة الوسائط",  href: "/admin/collections/media",   icon: "image" },
    ],
  },
  {
    title: "محتوى الصفحات", icon: "file",
    links: [
      { label: "الصفحة الرئيسية",  href: "/admin/globals/homepage",             icon: "home"      },
      { label: "عن المؤسسة",       href: "/admin/globals/about-page",            icon: "briefcase" },
      { label: "الشرائح (Hero)",   href: "/admin/collections/hero-slides",       icon: "layers"    },
      { label: "الصفحات الحرة",    href: "/admin/collections/dynamic-pages",     icon: "file"      },
    ],
  },
  {
    title: "المحتوى", icon: "edit",
    links: [
      { label: "الخدمات",          href: "/admin/collections/services",      icon: "briefcase" },
      { label: "الأعمال",          href: "/admin/collections/portfolio",     icon: "layers"    },
      { label: "المدونة",          href: "/admin/collections/posts",         icon: "edit"      },
      { label: "أعضاء الفريق",     href: "/admin/collections/team",          icon: "users"     },
      { label: "شهادات العملاء",   href: "/admin/collections/testimonials",  icon: "msg"       },
      { label: "الشركاء والعملاء", href: "/admin/collections/partners",     icon: "globe"     },
      { label: "الأسئلة الشائعة",  href: "/admin/collections/f-a-qs",       icon: "msg"       },
      { label: "الوظائف",          href: "/admin/collections/careers",       icon: "briefcase" },
      { label: "العروض والحزم",    href: "/admin/collections/offers",        icon: "tag"       },
      { label: "أخبار وفعاليات",   href: "/admin/collections/news",          icon: "globe"     },
      { label: "المكتبة",          href: "/admin/collections/resources",     icon: "file"      },
    ],
  },
  {
    title: "المتجر الإلكتروني", icon: "bag",
    links: [
      { label: "التصنيفات",      href: "/admin/collections/categories",      icon: "dashboard" },
      { label: "العلامات التجارية", href: "/admin/collections/brands",       icon: "tag"       },
      { label: "المنتجات",       href: "/admin/collections/products",        icon: "package"   },
      { label: "الكوبونات",      href: "/admin/collections/coupons",         icon: "tag"       },
      { label: "الطلبات",        href: "/admin/collections/orders",          icon: "inbox"     },
      { label: "مناطق الشحن",    href: "/admin/collections/shipping-zones",  icon: "globe"     },
    ],
  },
  {
    title: "الطلبات والعملاء", icon: "inbox",
    links: [
      { label: "طلبات عروض الأسعار", href: "/admin/collections/quote-requests",    icon: "mail"      },
      { label: "العملاء",             href: "/admin/collections/customers",          icon: "users"     },
      { label: "المواعيد",            href: "/admin/collections/appointments",       icon: "calendar"  },
      { label: "رسائل التواصل",       href: "/admin/collections/contact-messages",   icon: "msg"       },
      { label: "طلبات التوظيف",       href: "/admin/collections/job-applications",   icon: "briefcase" },
    ],
  },
  {
    title: "المبيعات", icon: "trending",
    links: [
      { label: "العملاء المحتملون", href: "/admin/collections/leads", icon: "user" },
    ],
  },
  {
    title: "الإعدادات", icon: "settings",
    links: [
      { label: "إعدادات الموقع",   href: "/admin/globals/site-settings",      icon: "settings" },
      { label: "القائمة والتذييل", href: "/admin/globals/navigation",          icon: "layers"   },
      { label: "بوابات الدفع",     href: "/admin/globals/payment-gateways",   icon: "card"     },
    ],
  },
  {
    title: "الإحصائيات", icon: "chart",
    links: [
      { label: "التقارير والإحصائيات", href: "/admin/analytics", icon: "chart" },
    ],
  },
]

// ── Design tokens ───────────────────────────────────────────────────────────
const T = {
  white:      "#FFFFFF",
  bg:         "#F8F9FA",
  border:     "#E5E7EB",
  activeBg:   "#F3F4F6",
  text:       "#111827",
  textSub:    "#6B7280",
  textMuted:  "#9CA3AF",
  hoverBg:    "#F9FAFB",
  red:        "#EF4444",
  redHover:   "#FEF2F2",
}

// ── Single nav link ──────────────────────────────────────────────────────────
function NavLink({ link, collapsed, active }: { link: Link; collapsed: boolean; active: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={link.href}
      title={collapsed ? link.label : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "row",          // icon RIGHT, text LEFT in RTL
        alignItems: "center",
        gap: "10px",
        padding: collapsed ? "10px 0" : "9px 14px",
        justifyContent: collapsed ? "center" : "flex-end",  // RTL flush-right
        borderRadius: "12px",
        margin: "1px 0",
        textDecoration: "none",
        background: active ? T.activeBg : hov ? T.hoverBg : "transparent",
        color: active ? T.text : T.textSub,
        fontWeight: active ? 700 : 500,
        fontSize: "0.855rem",
        transition: "all 0.15s ease",
        direction: "rtl",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      {/* Text (appears to the LEFT of icon in RTL) */}
      {!collapsed && (
        <span style={{ flex: 1, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis" }}>
          {link.label}
        </span>
      )}
      {/* Icon stays on the RIGHT */}
      <span style={{ color: active ? T.text : T.textMuted, flexShrink: 0 }}>
        <Ic d={P[link.icon]} size={17} />
      </span>
    </a>
  )
}

// ── Collapsible group ────────────────────────────────────────────────────────
function NavGroup({ group, collapsed, pathname }: { group: Group; collapsed: boolean; pathname: string }) {
  const hasActive = group.links.some(l => pathname.startsWith(l.href))
  const [open, setOpen] = useState(true)

  return (
    <div style={{ marginBottom: "4px" }}>
      {/* Group header */}
      {!collapsed ? (
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            display: "flex", flexDirection: "row", alignItems: "center",
            justifyContent: "space-between",
            width: "100%", padding: "7px 14px 5px",
            background: "none", border: "none", cursor: "pointer",
            direction: "rtl",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px", direction: "rtl" }}>
            <span style={{ color: hasActive ? T.text : T.textMuted }}>
              <Ic d={P[group.icon]} size={15} />
            </span>
            <span style={{
              fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", color: hasActive ? T.text : T.textMuted,
            }}>
              {group.title}
            </span>
          </span>
          <span style={{ color: T.textMuted }}>
            <Ic d={open ? P.chevU : P.chevD} size={12} />
          </span>
        </button>
      ) : (
        // Collapsed: just show group icon centered as divider
        <div style={{
          display: "flex", justifyContent: "center", padding: "8px 0",
          color: hasActive ? T.text : T.textMuted,
          borderTop: "1px solid #F3F4F6", marginTop: "4px",
        }}>
          <Ic d={P[group.icon]} size={16} />
        </div>
      )}

      {/* Links — hidden when group collapsed or sidebar collapsed shows only icons */}
      {(open || collapsed) && (
        <div style={{ paddingRight: collapsed ? 0 : "4px" }}>
          {group.links.map(link => (
            <NavLink
              key={link.href}
              link={link}
              collapsed={collapsed}
              active={pathname.startsWith(link.href)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main sidebar ─────────────────────────────────────────────────────────────
export default function CustomSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [logoutHov, setLogoutHov] = useState(false)
  const [toggleHov, setToggleHov] = useState(false)
  const pathname = usePathname() ?? ""
  const { logOut, user } = useAuth() as any
  const router = useRouter()

  const handleLogout = async () => {
    if (typeof logOut === "function") await logOut()
    else await fetch("/api/users/logout", { method: "POST" })
    router.push("/admin/login")
  }

  // Initials avatar
  const initials = (user?.name || user?.email || "A")
    .split(" ").slice(0, 2).map((w: string) => w[0].toUpperCase()).join("")

  return (
    <div
      dir="rtl"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: collapsed ? "72px" : "264px",
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        padding: collapsed ? "18px 0" : "18px 16px",
        borderBottom: `1px solid ${T.border}`,
        gap: "10px",
      }}>
        {!collapsed && (
          <a href="/admin" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "10px",
              background: "#111827", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.8rem", fontWeight: 800, flexShrink: 0,
            }}>
              إتحاد
            </div>
            <span style={{ fontWeight: 800, fontSize: "0.95rem", color: T.text, whiteSpace: "nowrap" }}>
              الريادة
            </span>
          </a>
        )}
        {collapsed && (
          <a href="/admin" style={{
            width: "34px", height: "34px", borderRadius: "10px", background: "#111827",
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.65rem", fontWeight: 800, textDecoration: "none",
          }}>
            إ
          </a>
        )}
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(c => !c)}
          onMouseEnter={() => setToggleHov(true)}
          onMouseLeave={() => setToggleHov(false)}
          title={collapsed ? "توسيع القائمة" : "طي القائمة"}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "28px", height: "28px", borderRadius: "8px", border: "none",
            background: toggleHov ? T.activeBg : "transparent",
            cursor: "pointer", color: T.textMuted, transition: "all 0.15s",
            flexShrink: 0,
          }}
        >
          <Ic d={P.menu} size={15} />
        </button>
      </div>

      {/* ── Dashboard link ────────────────────────────────────── */}
      <div style={{ padding: collapsed ? "12px 6px 4px" : "12px 12px 4px" }}>
        <NavLink
          link={{ label: "لوحة التحكم", href: "/admin", icon: "dashboard" }}
          collapsed={collapsed}
          active={pathname === "/admin"}
        />
      </div>

      {/* ── Scrollable nav groups ─────────────────────────────── */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        padding: collapsed ? "4px 6px" : "4px 12px",
        scrollbarWidth: "thin",
        scrollbarColor: "#E5E7EB transparent",
      }}>
        {GROUPS.map(group => (
          <NavGroup
            key={group.title}
            group={group}
            collapsed={collapsed}
            pathname={pathname}
          />
        ))}
      </div>

      {/* ── Bottom: user + logout ─────────────────────────────── */}
      <div style={{
        borderTop: `1px solid ${T.border}`,
        padding: collapsed ? "12px 6px" : "12px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}>
        {/* User info */}
        {!collapsed && user && (
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            direction: "rtl", padding: "8px 6px 4px",
          }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: T.activeBg, color: T.text,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.75rem", fontWeight: 700, flexShrink: 0,
            }}>
              {initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.name || user?.email?.split("@")[0]}
              </div>
              <div style={{ fontSize: "0.68rem", color: T.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.email}
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          onMouseEnter={() => setLogoutHov(true)}
          onMouseLeave={() => setLogoutHov(false)}
          title="تسجيل الخروج"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            padding: collapsed ? "10px 0" : "9px 14px",
            justifyContent: collapsed ? "center" : "flex-end",
            borderRadius: "12px",
            border: "none",
            background: logoutHov ? T.redHover : "transparent",
            color: T.red,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.855rem",
            fontFamily: "'Tajawal', system-ui, sans-serif",
            direction: "rtl",
            width: "100%",
            transition: "all 0.15s ease",
          }}
        >
          {!collapsed && <span style={{ flex: 1, textAlign: "right" }}>تسجيل الخروج</span>}
          <Ic d={P.logout} size={17} />
        </button>
      </div>
    </div>
  )
}
