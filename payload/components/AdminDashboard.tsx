import React from 'react'
import DashboardClient from './DashboardClient'

// This is a Server Component. 
// We ignore the props (locale, config, etc.) that Payload passes 
// because they contain non-serializable functions that crash Next.js hydration.
const AdminDashboard: React.FC = () => {
    return <DashboardClient />
}

export default AdminDashboard
