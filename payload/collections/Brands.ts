import type { CollectionConfig } from "payload"

export const Brands: CollectionConfig = {
    slug: "brands",
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "slug", "updatedAt"],
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
            name: "name",
            type: "text",
            required: true,
            localized: true,
            label: { ar: "اسم العلامة التجارية", en: "Brand Name" },
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            label: { ar: "المعرّف", en: "Slug" },
        },
        {
            name: "logo",
            type: "upload",
            relationTo: "media",
            label: { ar: "الشعار", en: "Logo" },
        },
        {
            name: "description",
            type: "textarea",
            localized: true,
            label: { ar: "وصف مختصر", en: "Description" },
        },
        {
            name: "website",
            type: "text",
            label: { ar: "الموقع الإلكتروني", en: "Website" },
        },
        {
            name: "isActive",
            type: "checkbox",
            defaultValue: true,
            label: { ar: "مفعّل", en: "Active" },
        },
    ],
}
