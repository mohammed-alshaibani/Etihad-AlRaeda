"use client"

import React from 'react'
import Link from 'next/link'
import { useConfig } from '@payloadcms/ui'

const AnalyticsNavLink: React.FC = () => {
    const { config: { routes: { admin } } } = useConfig()

    return (
        <div className="nav__link" dir="rtl">
            <Link
                href={`${admin}/analytics`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
                <div style={{
                    padding: '10px 20px',
                    borderTop: '1px solid var(--sl-border, #E5E7EB)',
                    marginTop: '12px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'var(--sl-text-sub, #6B7280)',
                    direction: 'rtl',
                    textAlign: 'right',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '8px',
                }}>
                    <span>الإحصائيات والتقارير</span>
                    <span>📊</span>
                </div>
            </Link>
        </div>
    )
}

export default AnalyticsNavLink
