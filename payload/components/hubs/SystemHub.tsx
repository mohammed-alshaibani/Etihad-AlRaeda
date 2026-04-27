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
                    title="إعدادات الموقع"
                    description="التحكم في العناوين والروابط وإعدادات التواصل الأساسية."
                    href="/admin/globals/site-settings"
                    icon={<Ic d={P.settings} />}
                />
                <HubCard
                    title="طلبات عروض الأسعار"
                    description="إدارة طلبات عروض الأسعار الواردة من العملاء."
                    href="/admin/collections/quote-requests"
                    icon={<Ic d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                />
                <HubCard
                    title="المواعيد"
                    description="إدارة وحجز المواعيد مع العملاء والشركاء."
                    href="/admin/collections/appointments"
                    icon={<Ic d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                />
                <HubCard
                    title="العروض والخصومات"
                    description="إدارة العروض الترويجية والخصومات الخاصة."
                    href="/admin/collections/offers"
                    icon={<Ic d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />}
                />
                <HubCard
                    title="رسائل التواصل"
                    description="عرض والرد على الرسائل المستلمة عبر نموذج الاتصال."
                    href="/admin/collections/contact-messages"
                    icon={<Ic d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                />
                <HubCard
                    title="طلبات التوظيف"
                    description="إدارة السير الذاتية وطلبات الانضمام للفريق."
                    href="/admin/collections/job-applications"
                    icon={<Ic d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                />
                <HubCard
                    title="العملاء المحتملون"
                    description="تعقب وإدارة بيانات العملاء والفرص البيعية الجديدة."
                    href="/admin/collections/leads"
                    icon={<Ic d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8z" />}
                />
            </HubPageLayout>
        </DefaultTemplate>
    )
}

export default SystemHub
