import type { CollectionConfig } from "payload"

export const Workflow: CollectionConfig = {
    slug: "workflow",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "order", "updatedAt"],
        group: "المحتوى",
    },
    labels: {
        singular: { ar: "خطوة عمل", en: "Workflow Step" },
        plural: { ar: "منهجية العمل", en: "Workflow Steps" },
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
            localized: true,
            label: { ar: "اسم الخطوة", en: "Step Title" },
        },
        {
            name: "description",
            type: "textarea",
            localized: true,
            label: { ar: "الوصف", en: "Description" },
        },
        {
            name: "order",
            type: "number",
            required: true,
            label: { ar: "الترتيب", en: "Order" },
            admin: {
                description: "ترتيب ظهور الخطوة في الموقع",
            },
        },
        {
            name: "icon",
            type: "select",
            label: { ar: "الأيقونة", en: "Icon" },
            options: [
                "Search", "Layout", "FileText", "Settings", "Activity", "Briefcase"
            ],
            defaultValue: "Briefcase",
        },
    ],
}
