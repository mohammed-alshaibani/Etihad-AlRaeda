"use client"

import React, { useState } from "react"
import { DeleteModal } from "./DeleteModal"

// ── Types ────────────────────────────────────────────────────────────────────
export type CardStatus = "active" | "pending" | "inactive" | "draft" | string

export interface CardField {
  label: string
  value: string | number | React.ReactNode
}

export interface DataCardProps {
  id: string | number
  title: string
  status?: CardStatus
  statusLabel?: string
  description?: string
  fields?: CardField[]
  imageUrl?: string
  onEdit?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  editHref?: string
  deleteConfirmName?: string
}

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  white: "#FFFFFF", pageBg: "#F8F9FA",
  border: "#E5E7EB", borderLight: "#F3F4F6",
  text: "#111827", textSub: "#6B7280", textMuted: "#9CA3AF",
  editBg: "#F9FAFB", editBgHov: "#F3F4F6",
  delBg: "#FEF2F2", delBgHov: "#FEE2E2",
  delText: "#EF4444", delTextHov: "#DC2626",
  font: "'Tajawal', system-ui, sans-serif",
}

// ── Status badge ──────────────────────────────────────────────────────────────
const STATUS_MAP: Record<string, { bg: string; color: string; label: string }> = {
  active:    { bg: "#DCFCE7", color: "#16A34A", label: "نشط" },
  published: { bg: "#DCFCE7", color: "#16A34A", label: "منشور" },
  pending:   { bg: "#FEF9C3", color: "#CA8A04", label: "معلق" },
  draft:     { bg: "#F3F4F6", color: "#6B7280", label: "مسودة" },
  inactive:  { bg: "#FEE2E2", color: "#DC2626", label: "غير نشط" },
  cancelled: { bg: "#FEE2E2", color: "#DC2626", label: "ملغي" },
}

function StatusBadge({ status, label }: { status?: string; label?: string }) {
  if (!status) return null
  const cfg = STATUS_MAP[status] ?? { bg: "#F3F4F6", color: "#6B7280", label: status }
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 10px", borderRadius: "20px",
      background: cfg.bg, color: cfg.color,
      fontSize: "0.72rem", fontWeight: 700, whiteSpace: "nowrap",
    }}>
      {label ?? cfg.label}
    </span>
  )
}

// ── Single DataCard ───────────────────────────────────────────────────────────
export function DataCard({
  id, title, status, statusLabel, description, fields = [],
  imageUrl, onEdit, onDelete, editHref, deleteConfirmName,
}: DataCardProps) {
  const [hov, setHov] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [delLoading, setDelLoading] = useState(false)
  const [editHov, setEditHov] = useState(false)
  const [delBtnHov, setDelBtnHov] = useState(false)

  const handleDelete = async () => {
    if (!onDelete) return
    setDelLoading(true)
    try { await onDelete(id) } finally { setDelLoading(false); setShowDelete(false) }
  }

  return (
    <>
      {/* ── Card ──────────────────────────────────────────────────────── */}
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: T.white, borderRadius: "16px",
          border: `1px solid ${hov ? "#D1D5DB" : T.border}`,
          boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.10)" : "0 1px 3px rgba(0,0,0,0.07)",
          transition: "all 0.2s ease",
          transform: hov ? "translateY(-2px)" : "translateY(0)",
          overflow: "hidden", direction: "rtl",
          display: "flex", flexDirection: "column",
          fontFamily: T.font,
        }}
      >
        {/* Optional image — responsive aspect ratio */}
        {imageUrl && (
          <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
            <img src={imageUrl} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        {/* Card body */}
        <div style={{ padding: "20px 20px 16px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>

          {/* Title row + badge */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
            {/* Badge sits on the logical-end (left in RTL) */}
            <StatusBadge status={status} label={statusLabel} />
            <h3 style={{
              fontWeight: 800, fontSize: "1rem", color: T.text,
              margin: 0, lineHeight: 1.4, textAlign: "start", flex: 1,
            }}>
              {title}
            </h3>
          </div>

          {/* Description — 2-line clamp */}
          {description && (
            <p style={{
              fontSize: "0.84rem", color: T.textSub, lineHeight: 1.6,
              margin: 0, textAlign: "start",
              display: "-webkit-box", WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
              {description}
            </p>
          )}

          {/* Key-value fields grid */}
          {fields.length > 0 && (
            <div style={{
              display: "grid",
              gridTemplateColumns: fields.length > 2 ? "1fr 1fr" : "1fr",
              gap: "8px 16px",
            }}>
              {fields.map((f, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={{
                    fontSize: "0.67rem", color: T.textMuted, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>
                    {f.label}
                  </span>
                  <span style={{ fontSize: "0.84rem", color: "#374151", fontWeight: 600 }}>
                    {f.value ?? "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Action row — in RTL the logical-start is the right side, 
              actions "start from left" = justify flex-start (the far side in RTL) ── */}
        <div style={{
          borderTop: `1px solid ${T.borderLight}`,
          padding: "12px 20px",
          display: "flex",
          gap: "8px",
          justifyContent: "flex-start",
        }}>
          {/* Danger — Soft red per spec: bg-red-50 text-red-600 hover:bg-red-100 */}
          {onDelete && (
            <button
              onClick={() => setShowDelete(true)}
              onMouseEnter={() => setDelBtnHov(true)}
              onMouseLeave={() => setDelBtnHov(false)}
              title="حذف"
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "7px 14px", borderRadius: "9px", border: "none",
                background: delBtnHov ? T.delBgHov : T.delBg,
                color: delBtnHov ? T.delTextHov : T.delText,
                cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
                fontFamily: T.font, transition: "all 0.15s ease", minHeight: "36px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
              حذف
            </button>
          )}

          {/* Edit */}
          {(onEdit || editHref) && (
            <a
              href={editHref}
              onClick={onEdit ? (e) => { e.preventDefault(); onEdit(id) } : undefined}
              onMouseEnter={() => setEditHov(true)}
              onMouseLeave={() => setEditHov(false)}
              title="تعديل"
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "7px 14px", borderRadius: "9px",
                background: editHov ? T.editBgHov : T.editBg,
                color: editHov ? T.text : "#374151",
                cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
                fontFamily: T.font, transition: "all 0.15s ease",
                textDecoration: "none", minHeight: "36px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              تعديل
            </a>
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        itemName={deleteConfirmName ?? title}
        loading={delLoading}
      />
    </>
  )
}

// ── DataCardGrid ──────────────────────────────────────────────────────────────
export interface DataCardGridProps {
  items: DataCardProps[]
  loading?: boolean
  emptyMessage?: string
  emptyAction?: { label: string; onClick: () => void; href?: string }
  columns?: 2 | 3
}

export function DataCardGrid({
  items, loading = false, emptyMessage, emptyAction, columns = 3,
}: DataCardGridProps) {
  const minWidth = columns === 3 ? "280px" : "340px"

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
        gap: "24px", direction: "rtl",
      }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            background: T.white, borderRadius: "16px", border: `1px solid ${T.border}`,
            height: "200px", animation: "skeletonPulse 1.5s ease-in-out infinite",
          }} />
        ))}
        <style>{`@keyframes skeletonPulse { 0%,100%{opacity:1} 50%{opacity:.45} }`}</style>
      </div>
    )
  }

  // ── Empty state ───────────────────────────────────────────────────────────
  if (!items.length) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "72px 24px",
        background: T.white, borderRadius: "16px", border: `1px solid ${T.border}`,
        direction: "rtl",
      }}>
        <div style={{
          width: "64px", height: "64px", borderRadius: "50%", background: "#F3F4F6",
          display: "flex", alignItems: "center", justifyContent: "center", marginBlockEnd: "20px",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: T.text, margin: "0 0 8px" }}>لا توجد نتائج</h3>
        <p style={{
          fontSize: "0.875rem", color: T.textSub, textAlign: "center",
          maxWidth: "360px", lineHeight: 1.6, margin: "0 0 24px",
        }}>
          {emptyMessage ?? "لا توجد بيانات متاحة حالياً. يمكنك إضافة سجل جديد للبدء."}
        </p>
        {emptyAction && (
          <a
            href={emptyAction.href}
            onClick={emptyAction.href ? undefined : (e) => { e.preventDefault(); emptyAction.onClick() }}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 24px", borderRadius: "10px",
              background: T.text, color: "#FFFFFF", fontWeight: 700,
              fontSize: "0.875rem", textDecoration: "none",
              fontFamily: T.font,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {emptyAction.label}
          </a>
        )}
      </div>
    )
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
      gap: "24px", direction: "rtl",
    }}>
      {items.map(card => <DataCard key={card.id} {...card} />)}
    </div>
  )
}
