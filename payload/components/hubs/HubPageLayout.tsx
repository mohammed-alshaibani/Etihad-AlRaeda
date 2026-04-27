"use client"

import React from "react"
import { useConfig } from "@payloadcms/ui"

export type HubCardProps = {
    title: string
    description: string
    href: string
    icon: React.ReactNode
}

export const HubCard: React.FC<HubCardProps> = ({ title, description, href, icon }) => {
    return (
        <a
            href={href}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "24px",
                backgroundColor: "#FFFFFF !important",
                background: "#FFFFFF !important",
                borderRadius: "16px",
                border: "1px solid #E5E7EB",
                textDecoration: "none",
                color: "#0F172A !important",
                transition: "all 0.2s ease",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
            className="hub-card-hover"
        >
            <style>{`
        .hub-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border-color: #D1D5DB;
        }
      `}</style>
            <div style={{ color: "#111827 !important", marginBottom: "4px" }}>
                {icon}
            </div>
            <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "4px", color: "#0F172A !important" }}>
                    {title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#475569 !important", lineHeight: "1.5" }}>
                    {description}
                </p>
            </div>
        </a>
    )
}

export const HubPageLayout: React.FC<{
    title: string
    description: string
    children: React.ReactNode
}> = ({ title, description, children }) => {
    return (
        <div
            style={{
                padding: "40px 48px",
                fontFamily: "'Tajawal', system-ui, sans-serif",
                width: "100%",
                minHeight: "100vh",
                backgroundColor: "#F8FAFC",
                color: "#0F172A",
                direction: "rtl",
            }}
        >
            <header style={{ marginBottom: "56px", textAlign: "right", maxWidth: "800px", borderRight: "4px solid #3B82F6", paddingRight: "24px" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#0F172A", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                    {title}
                </h1>
                <p style={{ fontSize: "1.1rem", color: "#64748B", lineHeight: "1.6" }}>
                    {description}
                </p>
            </header>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "24px",
            }}>
                {children}
            </div>
        </div>
    )
}
