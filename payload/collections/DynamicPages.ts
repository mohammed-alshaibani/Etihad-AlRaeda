import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const DynamicPages: CollectionConfig = {
    slug: "dynamic-pages",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "slug", "status", "updatedAt"],
        group: "محتوى الصفحات",
    },
    labels: {
        singular: { ar: "صفحة ديناميكية", en: "Dynamic Page" },
        plural: { ar: "الصفحات الديناميكية", en: "Dynamic Pages" },
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
    },
    versions: {
        drafts: true,
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: { ar: "المحتوى", en: "Content" },
                    fields: [
                        {
                            name: "title",
                            type: "text",
                            required: true,
                            localized: true,
                            label: { ar: "عنوان الصفحة", en: "Page Title" },
                        },
                        {
                            name: "content",
                            type: "richText",
                            localized: true,
                            editor: lexicalEditor({}),
                            label: { ar: "محتوى الصفحة", en: "Full Content (Lexical)" },
                        },
                    ],
                },
                {
                    label: { ar: "الإعدادات", en: "Settings" },
                    fields: [
                        {
                            type: "row",
                            fields: [
                                {
                                    name: "slug",
                                    type: "text",
                                    required: true,
                                    unique: true,
                                    label: { ar: "المعرّف (Slug)", en: "URL Slug" },
                                    admin: { width: "50%" },
                                },
                                {
                                    name: "status",
                                    type: "select",
                                    defaultValue: "draft",
                                    required: true,
                                    label: { ar: "حالة النشر", en: "Status" },
                                    admin: { width: "50%" },
                                    options: [
                                        { label: { ar: "مسودة", en: "Draft" }, value: "draft" },
                                        { label: { ar: "منشور", en: "Published" }, value: "published" },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "showInFooter",
                            type: "checkbox",
                            defaultValue: false,
                            label: { ar: "إظهار الرابط في تذييل الصفحة", en: "Display in Footer Navigation" },
                            admin: { style: { marginTop: "20px" } },
                        },
                    ],
                },
                {
                    label: { ar: "SEO", en: "SEO" },
                    fields: [
                        {
                            name: "seo",
                            type: "group",
                            label: { ar: "تحسين محركات البحث", en: "SEO Settings" },
                            fields: [
                                { name: "metaTitle", type: "text", localized: true, label: { ar: "عنوان الميتا", en: "Meta Title" } },
                                { name: "metaDescription", type: "textarea", localized: true, label: { ar: "وصف الميتا", en: "Meta Description" } },
                                { name: "ogImage", type: "upload", relationTo: "media", label: { ar: "صورة المشاركة", en: "Social Share Image" } },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
