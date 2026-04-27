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

function Field({ field, value, onChange, touched, error }: {
  field: FormFieldDef; value: any; onChange: (val: any) => void; touched: boolean; error?: string
}) {
  const hasError = !!error && touched
  const baseClass = `w-full px-3 py-2 rounded-lg bg-gray-50 border ${hasError ? 'border-red-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm font-medium transition-all text-start`

  if (field.type === "checkbox") {
    return (
      <div className="flex items-center gap-2.5 pt-2">
        <input type="checkbox" id={field.name} checked={!!value}
          onChange={e => onChange(e.target.checked)}
          className="w-5 h-5 accent-slate-900 cursor-pointer" />
        <label htmlFor={field.name} className="text-sm text-gray-600 font-bold cursor-pointer">
          {field.label}
          {field.required && <span className="text-red-500 ms-1">*</span>}
        </label>
      </div>
    )
  }

  if (field.type === "textarea") {
    return (
      <textarea id={field.name} value={value ?? ""} placeholder={field.placeholder}
        required={field.required} onChange={e => onChange(e.target.value)}
        rows={4} className={`${baseClass} min-h-[110px] resize-y`} />
    )
  }

  if (field.type === "select") {
    return (
      <select id={field.name} value={value ?? ""} required={field.required}
        onChange={e => onChange(e.target.value)} className={`${baseClass} h-11 cursor-pointer appearance-none`}>
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
        className={`border-2 border-dashed rounded-xl p-7 text-center cursor-pointer transition-all ${dragging ? "border-slate-800 bg-gray-100" : "border-gray-200 bg-gray-50 hover:bg-gray-100"}`}
      >
        <label htmlFor={field.name} className="cursor-pointer block">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF"
            strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3">
            <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
            <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
          </svg>
          <p className="font-bold text-gray-900 text-sm mb-1">اسحب وأفلت الملفات هنا</p>
          <p className="text-gray-500 text-xs">أو <span className="text-gray-900 font-bold underline">تصفح</span> من جهازك</p>
          <input id={field.name} type="file" className="hidden"
            onChange={e => onChange(e.target.files?.[0])} />
        </label>
        {value?.name && (
          <p className="mt-3 text-sm font-bold text-gray-900">✓ {value.name}</p>
        )}
      </div>
    )
  }

  return (
    <input id={field.name} type={field.type} value={value ?? ""} placeholder={field.placeholder}
      required={field.required} onChange={e => onChange(e.target.value)} className={`${baseClass} h-11`} />
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
    <div dir="rtl" className="bg-white rounded-xl shadow-sm p-6 md:p-8 font-sans">
      {(title || subtitle) && (
        <div className="mb-6 pb-5 border-b border-gray-100 text-start">
          {title && <h2 className="text-xl font-bold text-gray-900 mb-1.5">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-500 m-0">{subtitle}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map(field => {
            const error = getError(field)
            const isLocalized = field.name.endsWith('.ar') || field.name.endsWith('.en')
            const colSpanClass = field.colSpan === 2 || !isLocalized ? "col-span-full" : "col-span-1"

            return (
              <div key={field.name} className={`flex flex-col gap-1.5 ${colSpanClass}`}>
                {field.type !== "checkbox" && (
                  <label htmlFor={field.name} className="text-start font-bold text-sm text-gray-900">
                    {field.label}
                    {field.required && <span className="text-red-500 ms-1">*</span>}
                  </label>
                )}

                <Field
                  field={field} value={values[field.name]}
                  onChange={val => setValues(prev => ({ ...prev, [field.name]: val }))}
                  touched={!!touched[field.name]} error={error}
                />

                {error ? (
                  <span className="text-xs font-semibold text-red-500 text-start">{error}</span>
                ) : field.hint ? (
                  <span className="text-xs text-gray-500 text-start">{field.hint}</span>
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="h-px bg-gray-100 my-6" />

        <div className="flex gap-3 justify-start flex-row-reverse">
          <button type="submit" disabled={isLoading} className={`flex items-center justify-center gap-2 px-6 h-11 rounded-lg font-bold text-sm text-white transition-colors duration-200 ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800'}`}>
            {isLoading ? (
              <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {isLoading ? "جار الحفظ..." : submitLabel}
          </button>

          {onCancel && (
            <button type="button" onClick={onCancel} disabled={isLoading} className="px-6 h-11 rounded-lg font-bold text-sm text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
              إلغاء
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
