"use client"

import React from 'react'
import Link from 'next/link'
import { useConfig } from '@payloadcms/ui'

const AnalyticsNavLink: React.FC = () => {
    const { config: { routes: { admin } } } = useConfig()

    return (
        <div className="nav__link">
            <Link href={`${admin}/analytics`} style={{ textDecoration: 'none', color: '#currentColor' }}>
                <div style={{ padding: '8px 0', borderTop: '1px solid var(--theme-elevation-150)', marginTop: '16px' }}>
                    📊 الإحصائيات (Analytics)
                </div>
            </Link>
        </div>
    )
}

export default AnalyticsNavLink
