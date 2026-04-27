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

export interface DataCardGridProps {
  items: DataCardProps[]
  loading?: boolean
  emptyMessage?: string
  emptyAction?: { label: string; onClick: () => void; href?: string }
  columns?: 2 | 3
}

// ── Status badge ──────────────────────────────────────────────────────────────
const STATUS_MAP: Record<string, { bg: string; color: string; label: string }> = {
  active: { bg: "bg-green-100", color: "text-green-700", label: "نشط" },
  published: { bg: "bg-green-100", color: "text-green-700", label: "منشور" },
  pending: { bg: "bg-yellow-100", color: "text-yellow-700", label: "معلق" },
  draft: { bg: "bg-gray-100", color: "text-gray-600", label: "مسودة" },
  inactive: { bg: "bg-red-100", color: "text-red-700", label: "غير نشط" },
  cancelled: { bg: "bg-red-100", color: "text-red-700", label: "ملغي" },
}

function StatusBadge({ status, label }: { status?: string; label?: string }) {
  if (!status) return null
  const cfg = STATUS_MAP[status] ?? { bg: "bg-gray-100", color: "text-gray-600", label: status }
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${cfg.bg} ${cfg.color}`}>
      {label ?? cfg.label}
    </span>
  )
}

// ── Table Row Component ───────────────────────────────────────────────────────
export function TableRow({ item }: { item: DataCardProps }) {
  const [showDelete, setShowDelete] = useState(false)
  const [delLoading, setDelLoading] = useState(false)

  const handleDelete = async () => {
    if (!item.onDelete) return
    setDelLoading(true)
    try { await item.onDelete(item.id) } finally { setDelLoading(false); setShowDelete(false) }
  }

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none">
        <td className="px-6 py-4">
          <div className="flex items-center gap-4">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
            )}
            <div>
              <div className="font-bold text-gray-900">{item.title}</div>
              {item.description && (
                <div className="text-gray-500 text-xs mt-1 max-w-[250px] truncate">{item.description}</div>
              )}
            </div>
          </div>
        </td>
        {item.fields?.map((f, idx) => (
          <td key={idx} className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap">
            {f.value ?? "—"}
          </td>
        ))}
        <td className="px-6 py-4 whitespace-nowrap">
          <StatusBadge status={item.status} label={item.statusLabel} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex flex-row-reverse items-center justify-start gap-2">
            {item.onDelete && (
              <button
                onClick={() => setShowDelete(true)}
                className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                title="حذف"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </button>
            )}
            {(item.onEdit || item.editHref) && (
              <a
                href={item.editHref}
                onClick={item.onEdit ? (e) => { e.preventDefault(); item.onEdit!(item.id) } : undefined}
                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex items-center justify-center transition-colors"
                title="تعديل"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </a>
            )}
          </div>
        </td>
      </tr>
      {item.onDelete && (
        <DeleteModal
          isOpen={showDelete}
          onClose={() => setShowDelete(false)}
          onConfirm={handleDelete}
          itemName={item.deleteConfirmName ?? item.title}
          loading={delLoading}
        />
      )}
    </>
  )
}

// ── DataCardGrid (Exported as DataCardGrid to maintain compatibility but renders a Table) ──
export function DataCardGrid({
  items, loading = false, emptyMessage, emptyAction,
}: DataCardGridProps) {

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" dir="rtl">
        <div className="animate-pulse flex flex-col">
          <div className="h-12 bg-gray-50 border-b border-gray-100" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 border-b border-gray-50 last:border-none flex items-center px-6">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-20 bg-white rounded-xl border border-gray-100 shadow-sm" dir="rtl">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">لا توجد نتائج</h3>
        <p className="text-sm text-gray-500 text-center max-w-sm leading-relaxed mb-6">
          {emptyMessage ?? "لا توجد بيانات متاحة حالياً. يمكنك إضافة سجل جديد للبدء."}
        </p>
        {emptyAction && (
          <a
            href={emptyAction.href}
            onClick={emptyAction.href ? undefined : (e) => { e.preventDefault(); emptyAction.onClick() }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
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

  const dynamicCols = items[0]?.fields?.map(f => f.label) || []

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden font-sans" dir="rtl">
      <div className="overflow-x-auto">
        <table className="w-full text-start text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap text-start">الاسم / التفاصيل</th>
              {dynamicCols.map((col, idx) => (
                <th key={idx} className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap text-start">{col}</th>
              ))}
              <th className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap text-start">الحالة</th>
              <th className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap text-end">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-start">
            {items.map(item => <TableRow key={item.id} item={item} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Ensure DataCard is exported just in case other standalone maps use it still
export function DataCard(props: DataCardProps) {
  return null; // Deprecated in favor of the table layout rendered by DataCardGrid
}
