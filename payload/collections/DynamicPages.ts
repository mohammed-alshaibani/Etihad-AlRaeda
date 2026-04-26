import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const DynamicPages: CollectionConfig = {
    slug: "dynamic-pages",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "slug", "status", "updatedAt"],
        group: "محتوى الصفحات",
        description: "صفحات يمكن إنشاؤها وتحريرها بالكامل من لوحة التحكم",
        preview: (doc: any) => {
            const slug = doc?.slug || ""
            return `${process.env.SERVER_URL || "http://localhost:3000"}/api/preview?secret=${process.env.PAYLOAD_SECRET}&collection=dynamic-pages&slug=${slug}`
        },
    },
    labels: {
        singular: { ar: "صفحة ديناميكية", en: "Dynamic Page" },
        plural: { ar: "الصفحات الديناميكية", en: "Dynamic Pages" },
    },
    access: { read: () => true },
    versions: {
        drafts: true,
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
            localized: true,
            label: { ar: "عنوان الصفحة", en: "Page Title" },
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            label: { ar: "المعرّف (Slug)", en: "Slug" },
            admin: { description: 'مثال: "privacy-policy" — يُستخدم في رابط الصفحة' },
        },
        {
            name: "status",
            type: "select",
            defaultValue: "draft",
            required: true,
            label: { ar: "الحالة", en: "Status" },
            options: [
                { label: { ar: "مسودة", en: "Draft" }, value: "draft" },
                { label: { ar: "منشور", en: "Published" }, value: "published" },
            ],
        },
        {
            name: "content",
            type: "richText",
            localized: true,
            editor: lexicalEditor({}),
            label: { ar: "محتوى الصفحة", en: "Page Content" },
        },
        {
            name: "showInFooter",
            type: "checkbox",
            defaultValue: false,
            label: { ar: "إظهار في تذييل الصفحة", en: "Show in Footer" },
        },
        {
            name: "seo",
            type: "group",
            label: { ar: "تحسين محركات البحث", en: "SEO" },
            fields: [
                { name: "metaTitle", type: "text", localized: true, label: { ar: "عنوان الصفحة", en: "Meta Title" } },
                { name: "metaDescription", type: "textarea", localized: true, label: { ar: "وصف الصفحة", en: "Meta Description" } },
                { name: "ogImage", type: "upload", relationTo: "media", label: { ar: "صورة المشاركة", en: "OG Image" } },
            ],
        },
    ],
}
