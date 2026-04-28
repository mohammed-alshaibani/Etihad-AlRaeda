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
            className="n-card n-card-hover"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "32px",
                textDecoration: "none",
                background: "linear-gradient(145deg, #ffffff, #f0f2f5)",
                color: "var(--text-main) !important",
            }}
        >
            <div style={{
                width: "64px", height: "64px", borderRadius: "18px",
                background: "var(--n-bg)", display: "flex", alignItems: "center",
                justifyContent: "center", color: "var(--accent)",
                boxShadow: "inset 4px 4px 8px var(--n-shadow-dark), inset -4px -4px 8px var(--n-shadow-light)"
            }}>
                {icon}
            </div>
            <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: "8px", color: "var(--text-main) !important", fontFamily: "'Cairo', sans-serif" }}>
                    {title}
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-sub) !important", lineHeight: "1.6" }}>
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
            <header style={{ marginBottom: "64px", textAlign: "right", maxWidth: "900px", borderRight: "8px solid var(--accent)", paddingRight: "32px" }}>
                <h1 style={{ fontSize: "3.2rem", fontWeight: 900, color: "var(--text-main)", marginBottom: "16px", letterSpacing: "-0.04em", fontFamily: "'Cairo', sans-serif" }}>
                    {title}
                </h1>
                <p style={{ fontSize: "1.2rem", color: "var(--text-sub)", lineHeight: "1.8", maxWidth: "700px" }}>
                    {description}
                </p>
            </header>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                gap: "32px",
            }}>
                {children}
            </div>
        </div>
    )
}
