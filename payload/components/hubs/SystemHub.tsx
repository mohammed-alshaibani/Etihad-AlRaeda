import React from "react"
import { DefaultTemplate } from "@payloadcms/next/templates"
import { HubPageLayout, HubCard } from "./HubPageLayout"

const Ic = ({ d }: { d: string }) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
)

const P = {
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
    image: "M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-3h4l2 3h4a2 2 0 012 2zM12 15a4 4 0 100-8 4 4 0 000 8z",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
}

const SystemHub = (props: any) => {
    return (
        <DefaultTemplate {...props}>
            <HubPageLayout
                title="إدارة النظام"
                description="إدارة المستخدمين والوسائط والوصول إلى إعدادات النظام الأساسية."
            >
                <HubCard
                    title="المستخدمون"
                    description="إدارة حسابات المسؤولين وتوزيع الصلاحيات."
                    href="/admin/collections/users"
                    icon={<Ic d={P.user} />}
                />
                <HubCard
                    title="مكتبة الوسائط"
                    description="إدارة جميع الصور والملفات المرفوعة على الموقع."
                    href="/admin/collections/media"
                    icon={<Ic d={P.image} />}
                />
                <HubCard
                    title="إعدادات الموقع"
                    description="التحكم في العناوين والروابط وإعدادات التواصل الأساسية."
                    href="/admin/globals/site-settings"
                    icon={<Ic d={P.settings} />}
                />
            </HubPageLayout>
        </DefaultTemplate>
    )
}

export default SystemHub
