import React from "react"
import { DefaultTemplate } from "@payloadcms/next/templates"
import { HubPageLayout, HubCard } from "./HubPageLayout"

const Ic = ({ d }: { d: string }) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
)

const P = {
    inbox: "M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
    package: "M12 22l-9-5V7l9-5 9 5v10zM12 22V12M3 7l9 5 9-5",
    users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 7a4 4 0 100-8 4 4 0 000 8z",
    dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
    tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01",
}

const CommerceHub = (props: any) => {
    return (
        <DefaultTemplate {...props}>
            <HubPageLayout
                title="إدارة المتجر"
                description="إدارة المنتجات، الطلبات، والعملاء، ومتابعة نمو المبيعات."
            >
                <HubCard
                    title="الطلبات"
                    description="متابعة طلبات العملاء وحالات الشحن والدفع."
                    href="/admin/collections/orders"
                    icon={<Ic d={P.inbox} />}
                />
                <HubCard
                    title="المنتجات"
                    description="إدارة قائمة المنتجات، الأسعار، والمخزون."
                    href="/admin/collections/products"
                    icon={<Ic d={P.package} />}
                />
                <HubCard
                    title="العملاء"
                    description="إدارة قاعدة بيانات العملاء وتعقب النشاط."
                    href="/admin/collections/customers"
                    icon={<Ic d={P.users} />}
                />
                <HubCard
                    title="الأقسام"
                    description="تنظيم المنتجات في تصنيفات لتسهيل التصفح."
                    href="/admin/collections/categories"
                    icon={<Ic d={P.dashboard} />}
                />
                <HubCard
                    title="العلامات التجارية"
                    description="إدارة العلامات التجارية المرتبطة بالمنتجات."
                    href="/admin/collections/brands"
                    icon={<Ic d={P.tag} />}
                />
            </HubPageLayout>
        </DefaultTemplate>
    )
}

export default CommerceHub
