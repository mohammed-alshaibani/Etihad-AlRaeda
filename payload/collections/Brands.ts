import type { CollectionConfig } from "payload"

export const Brands: CollectionConfig = {
    slug: "brands",
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "slug", "isActive", "updatedAt"],
        group: "المتجر",
    },
    labels: {
        singular: { ar: "علامة تجارية", en: "Brand" },
        plural: { ar: "العلامات التجارية", en: "Brands" },
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: { ar: "المعلومات", en: "Info" },
                    fields: [
                        {
                            name: "name",
                            type: "text",
                            required: true,
                            localized: true,
                            label: { ar: "اسم العلامة التجارية", en: "Brand Name" },
                        },
                        {
                            name: "description",
                            type: "textarea",
                            localized: true,
                            label: { ar: "الوصف", en: "Description" },
                        },
                        {
                            name: "logo",
                            type: "upload",
                            relationTo: "media",
                            label: { ar: "الشعار", en: "Logo" },
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
                                    label: { ar: "المعرّف", en: "Slug" },
                                    admin: { width: "50%" },
                                },
                                {
                                    name: "website",
                                    type: "text",
                                    label: { ar: "الموقع الإلكتروني", en: "Website" },
                                    admin: { width: "50%" },
                                },
                            ],
                        },
                        {
                            name: "isActive",
                            type: "checkbox",
                            defaultValue: true,
                            label: { ar: "مفعّل", en: "Active Status" },
                            admin: { style: { marginTop: "20px" } },
                        },
                    ],
                },
            ],
        },
    ],
}
