import type { CollectionConfig } from "payload"

export const Resources: CollectionConfig = {
  slug: "resources",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "category"],
    group: "المحتوى",
  },
  labels: {
    singular: { ar: "مورد / ملف", en: "Resource" },
    plural: { ar: "المكتبة", en: "Library" },
  },
    access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true, label: { ar: "العنوان", en: "Title" } },
    { name: "slug", type: "text", required: true, unique: true, label: { ar: "المعرّف", en: "Slug" } },
    { name: "summary", type: "textarea", localized: true, label: { ar: "ملخص", en: "Summary" } },
    {
      name: "type",
      type: "select",
      label: { ar: "النوع", en: "Type" },
      options: [
        { label: { ar: "دراسة حالة", en: "Case Study" }, value: "case-study" },
        { label: { ar: "تقرير", en: "Report" }, value: "report" },
        { label: { ar: "ورقة بيضاء", en: "Whitepaper" }, value: "whitepaper" },
        { label: { ar: "دليل", en: "Guide" }, value: "guide" },
        { label: { ar: "عرض تقديمي", en: "Presentation" }, value: "presentation" },
        { label: { ar: "ندوة مسجلة", en: "Webinar" }, value: "webinar" },
      ],
    },
    { name: "category", type: "text", localized: true, label: { ar: "التصنيف", en: "Category" } },
    { name: "coverImage", type: "upload", relationTo: "media", label: { ar: "الصورة", en: "Cover" } },
    { name: "file", type: "upload", relationTo: "media", label: { ar: "الملف", en: "File" } },
    {
      name: "gated",
      type: "checkbox",
      defaultValue: false,
      label: { ar: "يتطلب بيانات للتحميل", en: "Require form to download" },
    },
    { name: "publishedAt", type: "date", label: { ar: "تاريخ النشر", en: "Published At" } },
  ],
}
