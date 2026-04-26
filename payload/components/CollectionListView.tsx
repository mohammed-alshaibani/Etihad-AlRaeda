"use client"

/**
 * CollectionListView — Generic Payload CMS 3.x Custom List View
 * ═══════════════════════════════════════════════════════════════
 * Replaces Payload's default table list with a premium Arabic RTL
 * DataCard grid. Register per-collection in payload.config.ts:
 *
 *   admin: {
 *     components: {
 *       views: {
 *         list: { Component: "@/payload/components/CollectionListView" }
 *       }
 *     }
 *   }
 */

import React, { useEffect, useState, useCallback } from "react"
import { useConfig, useRouteCache } from "@payloadcms/ui"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { DataCardGrid, DeleteModal } from "./ui"
import type { DataCardProps } from "./ui"

// ── Config: which field to use for title/description/status per slug ─────────
const COLLECTION_MAP: Record<string, {
  titleField: string
  descriptionField?: string
  statusField?: string
  statusMap?: Record<string, string>       // value → "active"|"pending"|"inactive"
  extraFields?: { label: string; field: string }[]
}> = {
  "job-applications": {
    titleField: "applicantName",
    descriptionField: "coverLetter",
    statusField: "status",
    statusMap: { new: "active", reviewing: "pending", interview: "pending", offer: "active", rejected: "inactive", hired: "active" },
    extraFields: [
      { label: "البريد", field: "email" },
      { label: "الهاتف", field: "phone" },
    ],
  },
  "quote-requests": {
    titleField: "companyName",
    descriptionField: "message",
    statusField: "status",
    statusMap: { new: "active", "under-review": "pending", sent: "pending", accepted: "active", rejected: "inactive" },
    extraFields: [
      { label: "جهة التواصل", field: "contactName" },
      { label: "البريد", field: "email" },
    ],
  },
  "contact-messages": {
    titleField: "name",
    descriptionField: "message",
    statusField: "status",
    statusMap: { new: "active", replied: "active", closed: "inactive" },
    extraFields: [
      { label: "الموضوع", field: "subject" },
      { label: "البريد", field: "email" },
    ],
  },
  appointments: {
    titleField: "contactName",
    descriptionField: "topic",
    statusField: "status",
    statusMap: { pending: "pending", confirmed: "active", completed: "active", cancelled: "inactive" },
    extraFields: [
      { label: "الشركة", field: "company" },
      { label: "التاريخ", field: "preferredDate" },
    ],
  },
  leads: {
    titleField: "email",
    statusField: undefined,
    extraFields: [
      { label: "الاسم", field: "name" },
      { label: "الشركة", field: "company" },
    ],
  },
  services: {
    titleField: "title",
    descriptionField: "shortDescription",
    statusField: "_status",
    statusMap: { published: "active", draft: "pending" },
    extraFields: [{ label: "المرتبة", field: "order" }],
  },
  products: {
    titleField: "name",
    descriptionField: "description",
    statusField: "_status",
    statusMap: { published: "active", draft: "pending" },
    extraFields: [
      { label: "السعر", field: "price" },
      { label: "المخزون", field: "stock" },
    ],
  },
  orders: {
    titleField: "orderNumber",
    statusField: "status",
    statusMap: { pending: "pending", confirmed: "active", delivered: "active", cancelled: "inactive" },
    extraFields: [
      { label: "المبلغ", field: "total" },
      { label: "تاريخ الطلب", field: "createdAt" },
    ],
  },
  customers: {
    titleField: "email",
    statusField: undefined,
    extraFields: [
      { label: "الاسم", field: "firstName" },
      { label: "الهاتف", field: "phone" },
    ],
  },
  team: {
    titleField: "name",
    descriptionField: "bio",
    statusField: undefined,
    extraFields: [{ label: "المنصب", field: "role" }],
  },
  posts: {
    titleField: "title",
    descriptionField: "excerpt",
    statusField: "_status",
    statusMap: { published: "active", draft: "pending" },
    extraFields: [{ label: "الفئة", field: "category" }],
  },
  portfolio: {
    titleField: "title",
    descriptionField: "summary",
    statusField: "_status",
    statusMap: { published: "active", draft: "pending" },
    extraFields: [{ label: "العميل", field: "client" }],
  },
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function get(obj: any, field?: string): string {
  if (!field || !obj) return ""
  const val = obj[field]
  if (!val) return ""
  if (typeof val === "object" && val.ar) return val.ar
  if (typeof val === "object" && val.en) return val.en
  if (val instanceof Date || (typeof val === "string" && val.match(/^\d{4}-/)))
    return new Date(val).toLocaleDateString("ar-SA")
  return String(val)
}

function mapStatus(cfg: typeof COLLECTION_MAP[string], doc: any): string | undefined {
  if (!cfg.statusField) return undefined
  const raw = get(doc, cfg.statusField)
  return cfg.statusMap?.[raw] ?? raw ?? undefined
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function CollectionListView() {
  const { config } = useConfig()
  const router = useRouter()
  const pathname = usePathname() ?? ""
  const searchParams = useSearchParams()

  // Derive collection slug from URL: /admin/collections/<slug>
  const slug = pathname.replace(/^\/admin\/collections\//, "").split("/")[0] ?? ""
  const cfg = COLLECTION_MAP[slug]

  const adminRoute = config.routes?.admin ?? "/admin"
  const apiRoute = config.routes?.api ?? "/api"

  // ── State ─────────────────────────────────────────────────────────────────
  const [docs, setDocs] = useState<any[]>([])
  const [totalDocs, setTotalDocs] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [deleteState, setDeleteState] = useState<{ open: boolean; id?: string; name?: string; deleting?: boolean }>({ open: false })
  const [searchInput, setSearchInput] = useState("")

  const limit = 12

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchDocs = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        limit: String(limit),
        page: String(page),
        depth: "1",
        ...(search ? { where: JSON.stringify({ or: [
          { [cfg?.titleField ?? "id"]: { like: search } },
        ]}) } : {}),
      })
      const res = await fetch(`${apiRoute}/${slug}?${params}`, { credentials: "include" })
      if (!res.ok) throw new Error()
      const json = await res.json()
      setDocs(json.docs ?? [])
      setTotalDocs(json.totalDocs ?? 0)
    } catch {
      setDocs([])
    } finally {
      setLoading(false)
    }
  }, [slug, page, search, apiRoute, cfg?.titleField])

  useEffect(() => { fetchDocs() }, [fetchDocs])

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteState.id) return
    setDeleteState(s => ({ ...s, deleting: true }))
    try {
      await fetch(`${apiRoute}/${slug}/${deleteState.id}`, {
        method: "DELETE", credentials: "include",
      })
      setDeleteState({ open: false })
      fetchDocs()
    } catch {
      setDeleteState(s => ({ ...s, deleting: false }))
    }
  }

  // ── Map docs → DataCardProps ──────────────────────────────────────────────
  const cards: DataCardProps[] = docs.map(doc => ({
    id: doc.id,
    title: get(doc, cfg?.titleField) || `#${doc.id}`,
    description: get(doc, cfg?.descriptionField),
    status: cfg ? mapStatus(cfg, doc) : undefined,
    fields: (cfg?.extraFields ?? []).map(f => ({
      label: f.label,
      value: get(doc, f.field) || "—",
    })),
    editHref: `${adminRoute}/collections/${slug}/${doc.id}`,
    onDelete: (id) => setDeleteState({
      open: true,
      id: String(id),
      name: get(doc, cfg?.titleField) || String(id),
    }),
  }))

  // ── Search debounce ───────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(1) }, 500)
    return () => clearTimeout(t)
  }, [searchInput])

  // ── Derive collection label ────────────────────────────────────────────────
  const collectionLabel = config.collections?.find(c => c.slug === slug)?.labels?.plural
  const label = typeof collectionLabel === "object"
    ? (collectionLabel as any).ar ?? (collectionLabel as any).en ?? slug
    : collectionLabel ?? slug

  return (
    <div dir="rtl" style={{
      padding: "32px", minHeight: "100vh", background: "#F8F9FA",
      fontFamily: "'Tajawal', system-ui, sans-serif",
    }}>
      {/* ── Page header ──────────────────────────────────────── */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBlockEnd: "24px", flexWrap: "wrap", gap: "12px",
      }}>
        <div>
          <h1 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#111827", margin: "0 0 4px" }}>
            {label}
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: 0 }}>
            {loading ? "جار التحميل..." : `${totalDocs} سجل`}
          </p>
        </div>

        {/* Add new button */}
        <a
          href={`${adminRoute}/collections/${slug}/create`}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "#111827", color: "#FFFFFF", borderRadius: "10px",
            padding: "10px 22px", fontWeight: 700, fontSize: "0.875rem",
            textDecoration: "none", fontFamily: "'Tajawal', system-ui, sans-serif",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          إضافة جديد
        </a>
      </div>

      {/* ── Search bar ───────────────────────────────────────── */}
      <div style={{
        background: "#FFFFFF", borderRadius: "12px",
        border: "1px solid #E5E7EB", padding: "12px 16px",
        marginBlockEnd: "24px", display: "flex", alignItems: "center", gap: "10px",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="البحث..."
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            fontSize: "0.9rem", color: "#111827",
            fontFamily: "'Tajawal', system-ui, sans-serif",
            direction: "rtl", textAlign: "right",
          }}
        />
        {searchInput && (
          <button onClick={() => setSearchInput("")}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 0 }}>
            ✕
          </button>
        )}
      </div>

      {/* ── Card grid ─────────────────────────────────────────── */}
      <div style={{ overflowX: "auto" }}>
      <DataCardGrid
        items={cards}
        loading={loading}
        columns={3}
        emptyMessage={search ? `لا توجد نتائج لـ "${search}"` : "لا توجد سجلات بعد. أضف أول سجل الآن."}
        emptyAction={{ label: "إضافة جديد", href: `${adminRoute}/collections/${slug}/create`, onClick: () => {} }}
      />
      </div>

      {/* ── Pagination ────────────────────────────────────────── */}
      {totalDocs > limit && (
        <div style={{
          display: "flex", justifyContent: "center", gap: "8px",
          marginBlockStart: "32px", direction: "rtl",
        }}>
          {Array.from({ length: Math.ceil(totalDocs / limit) }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                width: "36px", height: "36px", borderRadius: "8px",
                border: p === page ? "none" : "1px solid #E5E7EB",
                background: p === page ? "#111827" : "#FFFFFF",
                color: p === page ? "#FFFFFF" : "#374151",
                fontWeight: p === page ? 700 : 500, fontSize: "0.875rem",
                cursor: "pointer", fontFamily: "'Tajawal', system-ui, sans-serif",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* ── Delete modal ──────────────────────────────────────── */}
      <DeleteModal
        isOpen={deleteState.open}
        onClose={() => setDeleteState({ open: false })}
        onConfirm={handleDelete}
        itemName={deleteState.name}
        loading={deleteState.deleting}
      />
    </div>
  )
}
