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
                description="تحكم في محتوى الصفحات والخدمات ومعرض الأعمال والمدونة بلمسات فنية متطورة."
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
                    description="تعديل الصور والعروض الترويجية في واجهة الموقع."
                    href="/admin/collections/hero-slides"
                    icon={<Ic d={P.image} />}
                />
                <HubCard
                    title="فريق العمل"
                    description="إدارة أعضاء الفريق والمناصب والخبرات."
                    href="/admin/collections/team"
                    icon={<Ic d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />}
                />
                <HubCard
                    title="آراء العملاء"
                    description="إدارة شهادات وآراء العملاء عن الخدمات المقدمة."
                    href="/admin/collections/testimonials"
                    icon={<Ic d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />}
                />
                <HubCard
                    title="شركاء النجاح"
                    description="إدارة شعارات الشركاء والمؤسسات المتعاونة."
                    href="/admin/collections/partners"
                    icon={<Ic d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
                />
                <HubCard
                    title="الأسئلة الشائعة"
                    description="إدارة قائمة الأسئلة المتكررة وإجاباتها."
                    href="/admin/collections/faqs"
                    icon={<Ic d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.1 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                />
                <HubCard
                    title="الأخبار"
                    description="نشر وإدارة آخر الأخبار والبيانات الصحفية."
                    href="/admin/collections/news"
                    icon={<Ic d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 2v6h6M8 13h8M8 17h8" />}
                />
                <HubCard
                    title="الوظائف"
                    description="إدارة الشواغر الوظيفية المتاحة في المؤسسة."
                    href="/admin/collections/careers"
                    icon={<Ic d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                />
                <HubCard
                    title="القائمة والتذييل"
                    description="إدارة روابط القائمة الرئيسية وشريط الإعلانات والتذييل."
                    href="/admin/globals/navigation"
                    icon={<Ic d="M4 6h16M4 12h16M4 18h16" />}
                />
                <HubCard
                    title="الصفحة الرئيسية"
                    description="تعديل محتوى الصفحة الرئيسية والشرائح والعروض."
                    href="/admin/globals/homepage"
                    icon={<Ic d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
                />
                <HubCard
                    title="من نحن"
                    description="تعديل محتوى صفحة تعريف المؤسسة وفريق العمل."
                    href="/admin/globals/about-page"
                    icon={<Ic d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />}
                />
            </HubPageLayout>
        </DefaultTemplate>
    )
}

export default WebsiteHub
