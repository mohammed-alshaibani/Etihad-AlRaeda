import type { CollectionConfig } from "payload"

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "author",
    defaultColumns: ["author", "company", "rating", "isFeatured"],
    group: "المحتوى",
  },
  labels: {
    singular: { ar: "شهادة عميل", en: "Testimonial" },
    plural: { ar: "شهادات العملاء", en: "Testimonials" },
  },
  access: { read: () => true },
  fields: [
    { name: "author", type: "text", required: true, localized: true, label: { ar: "الاسم", en: "Author" } },
    { name: "role", type: "text", localized: true, label: { ar: "المنصب", en: "Role" } },
    { name: "company", type: "text", localized: true, label: { ar: "الشركة", en: "Company" } },
    { name: "quote", type: "textarea", required: true, localized: true, label: { ar: "الشهادة", en: "Quote" } },
    { name: "photo", type: "upload", relationTo: "media", label: { ar: "صورة", en: "Photo" } },
    { name: "rating", type: "number", min: 1, max: 5, defaultValue: 5, label: { ar: "التقييم", en: "Rating" } },
    { name: "isFeatured", type: "checkbox", defaultValue: false, label: { ar: "مميز", en: "Featured" } },
  ],
}
