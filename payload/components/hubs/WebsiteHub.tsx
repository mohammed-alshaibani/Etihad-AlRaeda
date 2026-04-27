import React from "react"
import { DefaultTemplate } from "@payloadcms/next/templates"
import { HubPageLayout, HubCard } from "./HubPageLayout"

const Ic = ({ d }: { d: string }) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
)

const P = {
    file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
    briefcase: "M20 7H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
    layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
    image: "M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-3h4l2 3h4a2 2 0 012 2zM12 15a4 4 0 100-8 4 4 0 000 8z",
}

const WebsiteHub = (props: any) => {
    return (
        <DefaultTemplate {...props}>
            <HubPageLayout
                title="إدارة الموقع"
                description="تحكم في محتوى الصفحات والخدمات ومعرض الأعمال والمدونة."
            >
                <HubCard
                    title="الصفحات"
                    description="إدارة محتوى الصفحات التعريفية والديناميكية للموقع."
                    href="/admin/collections/dynamic-pages"
                    icon={<Ic d={P.file} />}
                />
                <HubCard
                    title="الخدمات"
                    description="إدارة قائمة الخدمات التقنية والاستشارية التي تقدمها المؤسسة."
                    href="/admin/collections/services"
                    icon={<Ic d={P.briefcase} />}
                />
                <HubCard
                    title="معرض الأعمال"
                    description="استعراض وإدارة المشاريع المنجزة وقصص النجاح."
                    href="/admin/collections/portfolio"
                    icon={<Ic d={P.layers} />}
                />
                <HubCard
                    title="المدونة"
                    description="نشر المقالات والأخبار والمحتوى المعرفي."
                    href="/admin/collections/posts"
                    icon={<Ic d={P.edit} />}
                />
                <HubCard
                    title="الشرائح (Hero)"
                    description="تحديث الصور والعروض الترويجية في واجهة الموقع."
                    href="/admin/collections/hero-slides"
                    icon={<Ic d={P.image} />}
                />
            </HubPageLayout>
        </DefaultTemplate>
    )
}

export default WebsiteHub
