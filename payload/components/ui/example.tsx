"use client"

/**
 * USAGE EXAMPLE — RTL Arabic CRUD Components
 * ============================================
 * Demonstrates DataCardGrid + AdminForm + DeleteModal
 * working together as a complete Arabic admin section.
 *
 * Usage in a custom Payload view or Next.js page:
 *   import { CrudExample } from "@/payload/components/ui/example"
 */

import React, { useState } from "react"
import { DataCardGrid, AdminForm, DeleteModal } from "./index"
import type { DataCardProps, FormFieldDef } from "./index"

// ── Sample data ───────────────────────────────────────────────────────────────
const INITIAL_ITEMS: DataCardProps[] = [
  {
    id: 1, title: "خدمة الاستشارات التقنية",
    status: "active",
    description: "تقديم استشارات متخصصة في مجال التقنية وتحول الأعمال الرقمي.",
    fields: [
      { label: "التصنيف", value: "تقنية" },
      { label: "السعر", value: "١٢٠٠ ريال" },
      { label: "المدة", value: "٣ أشهر" },
      { label: "العملاء", value: "٤٨ عميل" },
    ],
    onEdit: () => {},
    onDelete: async () => {},
    deleteConfirmName: "خدمة الاستشارات التقنية",
  },
  {
    id: 2, title: "برنامج إدارة المشاريع",
    status: "pending",
    description: "منصة متكاملة لإدارة المشاريع وتتبع المهام وتحليل الأداء.",
    fields: [
      { label: "التصنيف", value: "برمجيات" },
      { label: "السعر", value: "٨٥٠ ريال" },
    ],
    onEdit: () => {},
    onDelete: async () => {},
  },
  {
    id: 3, title: "حل الأمن السيبراني",
    status: "inactive",
    description: "حماية متكاملة للبنية التحتية الرقمية من التهديدات الإلكترونية.",
    fields: [
      { label: "التصنيف", value: "أمن معلومات" },
      { label: "السعر", value: "٣٢٠٠ ريال" },
    ],
    onEdit: () => {},
    onDelete: async () => {},
  },
]

// ── Form field definitions ────────────────────────────────────────────────────
const SERVICE_FIELDS: FormFieldDef[] = [
  {
    name: "title", label: "اسم الخدمة", type: "text",
    required: true, placeholder: "أدخل اسم الخدمة...", colSpan: 2,
  },
  {
    name: "category", label: "التصنيف", type: "select",
    required: true,
    options: [
      { label: "تقنية", value: "tech" },
      { label: "برمجيات", value: "software" },
      { label: "أمن معلومات", value: "security" },
      { label: "استشارات", value: "consulting" },
    ],
  },
  {
    name: "price", label: "السعر (ريال)", type: "number",
    required: true, placeholder: "٠٫٠٠",
  },
  {
    name: "duration", label: "المدة", type: "text", placeholder: "مثال: ٣ أشهر",
  },
  {
    name: "status", label: "الحالة", type: "select",
    options: [
      { label: "نشط", value: "active" },
      { label: "معلق", value: "pending" },
      { label: "غير نشط", value: "inactive" },
    ],
  },
  {
    name: "description", label: "وصف الخدمة", type: "textarea",
    placeholder: "اكتب وصفاً تفصيلياً للخدمة...", colSpan: 2,
    required: true,
  },
  {
    name: "image", label: "صورة الخدمة", type: "file", colSpan: 2,
    hint: "PNG, JPG أو WEBP — الحد الأقصى ٢ ميجابايت",
  },
  {
    name: "featured", label: "خدمة مميزة", type: "checkbox",
    defaultValue: false,
  },
]

// ── Full example component ────────────────────────────────────────────────────
export function CrudExample() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [view, setView] = useState<"grid" | "create" | "edit">("grid")
  const [loading, setLoading] = useState(false)
  const [editDefaults, setEditDefaults] = useState<Record<string, any>>({})
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id?: string | number; name?: string }>({ open: false })

  const handleCreate = async (data: Record<string, any>) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const newItem: DataCardProps = {
      id: Date.now(), title: data.title,
      status: data.status || "pending",
      description: data.description,
      fields: [
        { label: "التصنيف", value: data.category },
        { label: "السعر", value: `${data.price} ريال` },
      ],
      onEdit: (id) => { setEditDefaults(data); setView("edit") },
      onDelete: async (id) => setDeleteModal({ open: true, id, name: data.title }),
    }
    setItems(prev => [newItem, ...prev])
    setLoading(false)
    setView("grid")
  }

  const handleDelete = async () => {
    await new Promise(r => setTimeout(r, 600))
    setItems(prev => prev.filter(i => i.id !== deleteModal.id))
    setDeleteModal({ open: false })
  }

  const wiredItems = items.map(item => ({
    ...item,
    onEdit: (id: string | number) => {
      setEditDefaults({ title: item.title, description: item.description, status: item.status })
      setView("edit")
    },
    onDelete: (id: string | number) => setDeleteModal({ open: true, id, name: item.title }),
  }))

  return (
    <div style={{
      padding: "32px", minHeight: "100vh", background: "#F8F9FA",
      direction: "rtl", fontFamily: "'Tajawal', system-ui, sans-serif",
    }}>
      {/* Page header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: "28px", flexWrap: "wrap", gap: "12px",
      }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#111827", margin: "0 0 4px" }}>
            {view === "grid" ? "إدارة الخدمات" : view === "create" ? "إضافة خدمة جديدة" : "تعديل الخدمة"}
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#6B7280", margin: 0 }}>
            {items.length} خدمة مسجلة
          </p>
        </div>
        {view === "grid" ? (
          <button
            onClick={() => setView("create")}
            style={{
              background: "#111827", color: "#FFFFFF", border: "none",
              borderRadius: "10px", padding: "10px 22px",
              fontWeight: 700, fontSize: "0.875rem",
              fontFamily: "'Tajawal', system-ui, sans-serif",
              cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            إضافة خدمة
          </button>
        ) : (
          <button
            onClick={() => setView("grid")}
            style={{
              background: "#FFFFFF", color: "#374151",
              border: "1px solid #E5E7EB", borderRadius: "10px",
              padding: "10px 20px", fontWeight: 600,
              fontFamily: "'Tajawal', system-ui, sans-serif",
              cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            عودة للقائمة
          </button>
        )}
      </div>

      {/* Views */}
      {view === "grid" && (
        <DataCardGrid
          items={wiredItems}
          columns={3}
          emptyAction={{ label: "إضافة خدمة جديدة", onClick: () => setView("create") }}
        />
      )}

      {(view === "create" || view === "edit") && (
        <AdminForm
          title={view === "create" ? "إضافة خدمة جديدة" : "تعديل الخدمة"}
          subtitle="أدخل تفاصيل الخدمة بدقة. الحقول المعلّمة بـ * إلزامية."
          fields={SERVICE_FIELDS}
          defaultValues={view === "edit" ? editDefaults : {}}
          onSubmit={handleCreate}
          onCancel={() => setView("grid")}
          submitLabel={view === "create" ? "إنشاء الخدمة" : "حفظ التغييرات"}
          loading={loading}
        />
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false })}
        onConfirm={handleDelete}
        itemName={deleteModal.name}
      />
    </div>
  )
}
