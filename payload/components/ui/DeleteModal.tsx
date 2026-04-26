"use client"

import React, { useEffect } from "react"

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  itemName?: string
  loading?: boolean
}

export function DeleteModal({
  isOpen, onClose, onConfirm, title = "تأكيد الحذف", itemName, loading = false,
}: DeleteModalProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  if (!isOpen) return null

  const font = "'Tajawal', system-ui, sans-serif"

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.40)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#FFFFFF", borderRadius: "20px",
          padding: "32px", maxWidth: "440px", width: "100%",
          boxShadow: "0 24px 48px rgba(0,0,0,0.16)",
          direction: "rtl", textAlign: "right",
          animation: "modalIn 0.2s ease",
        }}
      >
        {/* Warning icon — soft red circle */}
        <div style={{
          width: "52px", height: "52px", borderRadius: "50%",
          background: "#FEF2F2",                      // red-50
          display: "flex", alignItems: "center",
          justifyContent: "center", marginBlockEnd: "20px",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="#DC2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#111827", marginBottom: "10px" }}>
          {title}
        </h2>

        {/* Body */}
        <p style={{ fontSize: "0.9rem", color: "#6B7280", lineHeight: 1.65, marginBottom: "28px" }}>
          {itemName
            ? <><span>هل أنت متأكد من حذف </span><strong style={{ color: "#111827" }}>"{itemName}"</strong><span>؟</span><br /></>
            : null}
          هذا الإجراء لا يمكن التراجع عنه وسيحذف السجل نهائيًا.
        </p>

        <div style={{ height: "1px", background: "#F3F4F6", marginBottom: "20px" }} />

        {/* Buttons — logical direction */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-start", flexDirection: "row-reverse" }}>
          {/* Danger: soft red per spec — bg-red-50 text-red-600 hover:bg-red-100 */}
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              background: "#FEF2F2",          // red-50
              color: "#DC2626",               // red-600
              border: "1px solid #FECACA",   // red-200 outline
              borderRadius: "10px",
              padding: "10px 24px", fontWeight: 700, fontSize: "0.9rem",
              fontFamily: font,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.18s ease",
              display: "flex", alignItems: "center", gap: "8px",
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={e => !loading && ((e.currentTarget as HTMLButtonElement).style.background = "#FEE2E2")}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#FEF2F2")}
          >
            {loading
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth={2} style={{ animation: "modalSpin 1s linear infinite" }}>
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>}
            {loading ? "جار الحذف..." : "حذف نهائي"}
          </button>

          {/* Cancel: outline */}
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              background: "#FFFFFF", color: "#374151",
              border: "1px solid #E5E7EB", borderRadius: "10px",
              padding: "10px 24px", fontWeight: 600, fontSize: "0.9rem",
              fontFamily: font, cursor: "pointer", transition: "background 0.18s ease",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#F9FAFB")}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#FFFFFF")}
          >
            إلغاء
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
        @keyframes modalSpin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
