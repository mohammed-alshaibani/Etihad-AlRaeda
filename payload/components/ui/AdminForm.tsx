"use client"

import React, { useState } from "react"

export type FieldType = "text" | "email" | "number" | "textarea" | "select" | "date" | "file" | "checkbox" | "tel"

export interface FormFieldDef {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: { label: string; value: string }[]
  colSpan?: 1 | 2
  defaultValue?: string | number | boolean
  hint?: string
}

export interface AdminFormProps {
  title?: string
  subtitle?: string
  fields: FormFieldDef[]
  defaultValues?: Record<string, any>
  onSubmit: (data: Record<string, any>) => void | Promise<void>
  onCancel?: () => void
  submitLabel?: string
  loading?: boolean
}

const T = {
  white: "#FFFFFF", pageBg: "#F8F9FA", inputBg: "#F3F4F6",
  border: "#E5E7EB", borderLight: "#F3F4F6",
  text: "#111827", textSub: "#6B7280", textMuted: "#9CA3AF",
  font: "'Tajawal', system-ui, sans-serif",
}

function getInputStyle(focused: boolean, hasError: boolean): React.CSSProperties {
  return {
    width: "100%", padding: "10px 14px", borderRadius: "10px",
    border: hasError ? "1.5px solid #EF4444" : focused ? "1.5px solid #111827" : "1.5px solid transparent",
    background: focused ? T.white : T.inputBg,
    boxShadow: focused ? "0 0 0 3px rgba(17,24,39,0.12)" : hasError ? "0 0 0 3px rgba(239,68,68,0.10)" : "none",
    color: T.text, fontSize: "0.9rem", fontFamily: T.font,
    direction: "rtl", textAlign: "right" as const, outline: "none",
    transition: "all 0.18s ease", boxSizing: "border-box" as const, minHeight: "44px",
  }
}

function Field({ field, value, onChange, touched, error }: {
  field: FormFieldDef; value: any; onChange: (val: any) => void; touched: boolean; error?: string
}) {
  const [focused, setFocused] = useState(false)
  const hasError = !!error && touched
  const inputStyle = getInputStyle(focused, hasError)
  const fp = { onFocus: () => setFocused(true), onBlur: () => setFocused(false) }

  if (field.type === "checkbox") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "10px", direction: "rtl", paddingBlockStart: "8px" }}>
        <input type="checkbox" id={field.name} checked={!!value}
          onChange={e => onChange(e.target.checked)}
          style={{ width: "18px", height: "18px", accentColor: T.text, cursor: "pointer" }} />
        <label htmlFor={field.name} style={{ fontSize: "0.9rem", color: T.textSub, fontWeight: 500, cursor: "pointer", fontFamily: T.font }}>
          {field.label}
          {field.required && <span style={{ color: "#EF4444", marginInlineStart: "4px" }}>*</span>}
        </label>
      </div>
    )
  }

  if (field.type === "textarea") {
    return (
      <textarea id={field.name} value={value ?? ""} placeholder={field.placeholder}
        required={field.required} {...fp} onChange={e => onChange(e.target.value)}
        rows={4} style={{ ...inputStyle, resize: "vertical", minHeight: "110px" }} />
    )
  }

  if (field.type === "select") {
    return (
      <select id={field.name} value={value ?? ""} required={field.required}
        {...fp} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
        <option value="">{field.placeholder ?? "اختر..."}</option>
        {field.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    )
  }

  if (field.type === "file") {
    const [dragging, setDragging] = useState(false)
    return (
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); onChange(e.dataTransfer.files[0]) }}
        style={{
          border: `2px dashed ${dragging ? T.text : T.border}`, borderRadius: "12px",
          padding: "28px 16px", textAlign: "center", background: dragging ? "#F0F0F2" : T.inputBg,
          cursor: "pointer", transition: "all 0.2s ease", direction: "rtl",
        }}
      >
        <label htmlFor={field.name} style={{ cursor: "pointer", display: "block" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={T.textMuted}
            strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 12px" }}>
            <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
            <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
          </svg>
          <p style={{ fontWeight: 700, color: T.text, fontSize: "0.9rem", margin: "0 0 4px", fontFamily: T.font }}>
            اسحب وأفلت الملفات هنا
          </p>
          <p style={{ color: T.textSub, fontSize: "0.8rem", margin: 0, fontFamily: T.font }}>
            أو <span style={{ color: T.text, fontWeight: 700, textDecoration: "underline" }}>تصفح</span> من جهازك
          </p>
          <input id={field.name} type="file" style={{ display: "none" }}
            onChange={e => onChange(e.target.files?.[0])} />
        </label>
        {value?.name && (
          <p style={{ marginBlockStart: "12px", fontSize: "0.8rem", color: T.text, fontFamily: T.font }}>✓ {value.name}</p>
        )}
      </div>
    )
  }

  return (
    <input id={field.name} type={field.type} value={value ?? ""} placeholder={field.placeholder}
      required={field.required} {...fp} onChange={e => onChange(e.target.value)} style={inputStyle} />
  )
}

export function AdminForm({
  title, subtitle, fields, defaultValues = {}, onSubmit, onCancel,
  submitLabel = "حفظ", loading = false,
}: AdminFormProps) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {}
    fields.forEach(f => { init[f.name] = defaultValues[f.name] ?? f.defaultValue ?? "" })
    return init
  })
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitLoading, setSubmitLoading] = useState(false)

  const getError = (field: FormFieldDef): string | undefined => {
    if (!touched[field.name]) return undefined
    if (field.required && !values[field.name]) return "هذا الحقل مطلوب"
    if (field.type === "email" && values[field.name] && !/\S+@\S+\.\S+/.test(values[field.name]))
      return "البريد الإلكتروني غير صالح"
    return undefined
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const allTouched: Record<string, boolean> = {}
    fields.forEach(f => { allTouched[f.name] = true })
    setTouched(allTouched)
    if (fields.some(f => f.required && !values[f.name])) return
    setSubmitLoading(true)
    try { await onSubmit(values) } finally { setSubmitLoading(false) }
  }

  const isLoading = loading || submitLoading

  return (
    <div style={{
      background: T.white, borderRadius: "20px", border: `1px solid ${T.border}`,
      boxShadow: "0 1px 3px rgba(0,0,0,0.07)", padding: "32px",
      fontFamily: T.font, direction: "rtl",
    }}>
      {(title || subtitle) && (
        <div style={{ marginBlockEnd: "28px", paddingBlockEnd: "20px", borderBottom: `1px solid ${T.borderLight}` }}>
          {title && <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: T.text, margin: "0 0 6px", textAlign: "start" }}>{title}</h2>}
          {subtitle && <p style={{ fontSize: "0.875rem", color: T.textSub, margin: 0 }}>{subtitle}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* 1 col on mobile → 2 cols on desktop */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
          gap: "20px 28px",
        }}>
          {fields.map(field => {
            const error = getError(field)
            return (
              <div key={field.name} style={{
                gridColumn: field.colSpan === 2 ? "1 / -1" : undefined,
                display: "flex", flexDirection: "column", gap: "6px",
              }}>
                {field.type !== "checkbox" && (
                  <label htmlFor={field.name} style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "flex-end",   // right side in RTL = text-start
                    gap: "4px", fontWeight: 700, fontSize: "0.82rem", color: T.text,
                  }}>
                    {/* * sits on the logical far side (left in RTL) */}
                    {field.required && <span style={{ color: "#EF4444", fontSize: "0.9rem", order: -1 }}>*</span>}
                    {field.label}
                  </label>
                )}

                <Field
                  field={field} value={values[field.name]}
                  onChange={val => setValues(prev => ({ ...prev, [field.name]: val }))}
                  touched={!!touched[field.name]} error={error}
                />

                {error
                  ? <span style={{ fontSize: "0.75rem", color: "#EF4444", textAlign: "end" }}>{error}</span>
                  : field.hint
                    ? <span style={{ fontSize: "0.75rem", color: T.textMuted, textAlign: "end" }}>{field.hint}</span>
                    : null}
              </div>
            )
          })}
        </div>

        <div style={{ height: "1px", background: T.borderLight, margin: "28px 0 20px" }} />

        {/* Action row — logical direction, submit on inline-end */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-start", flexDirection: "row-reverse" }}>
          {/* Primary: bg-slate-900 text-white */}
          <button type="submit" disabled={isLoading} style={{
            background: isLoading ? "#374151" : T.text, color: "#FFFFFF", border: "none",
            borderRadius: "10px", padding: "10px 28px", fontWeight: 700, fontSize: "0.9rem",
            fontFamily: T.font, cursor: isLoading ? "not-allowed" : "pointer",
            transition: "background 0.18s ease", display: "flex", alignItems: "center",
            gap: "8px", minHeight: "44px",
          }}>
            {isLoading
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth={2} style={{ animation: "adminSpin 1s linear infinite" }}>
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>}
            {isLoading ? "جار الحفظ..." : submitLabel}
          </button>

          {/* Secondary: outline */}
          {onCancel && (
            <button type="button" onClick={onCancel} disabled={isLoading} style={{
              background: T.white, color: "#374151", border: `1px solid ${T.border}`,
              borderRadius: "10px", padding: "10px 24px", fontWeight: 600, fontSize: "0.9rem",
              fontFamily: T.font, cursor: "pointer", transition: "background 0.18s ease", minHeight: "44px",
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = T.pageBg)}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = T.white)}
            >
              إلغاء
            </button>
          )}
        </div>
      </form>

      <style>{`@keyframes adminSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
