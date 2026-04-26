import type { Metadata } from "next"
import AnalyticsDashboard from "./page.client"

export const metadata: Metadata = {
    title: "التحليلات والأداء — لوحة التحكم",
}

export default function AnalyticsPage() {
    return <AnalyticsDashboard />
}
