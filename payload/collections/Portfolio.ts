import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")

export const Portfolio: CollectionConfig = {
  slug: "portfolio",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "client", "sector", "year", "isFeatured"],
    group: "المحتوى",
  },
  labels: {
    singular: { ar: "مشروع", en: "Project" },
    plural: { ar: "أعمالنا", en: "Portfolio" },
  },
  access: { read: () => true },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === "create" && data?.title && !data?.slug) {
          data.slug = toSlug(typeof data.title === "object" ? (data.title.ar || data.title.en || "") : data.title)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      label: { ar: "اسم المشروع", en: "Project Title" },
    },
    { name: "slug", type: "text", required: true, unique: true, label: { ar: "المعرّف", en: "Slug" } },
    {
      name: "client",
      type: "text",
      localized: true,
      label: { ar: "العميل", en: "Client" },
    },
    {
      name: "sector",
      type: "select",
      label: { ar: "القطاع", en: "Sector" },
      options: [
        { label: { ar: "الطاقة", en: "Energy" }, value: "energy" },
        { label: { ar: "المالية", en: "Finance" }, value: "finance" },
        { label: { ar: "العقارات", en: "Real Estate" }, value: "realestate" },
        { label: { ar: "اللوجستيات", en: "Logistics" }, value: "logistics" },
        { label: { ar: "التجزئة", en: "Retail" }, value: "retail" },
        { label: { ar: "الصناعة", en: "Industry" }, value: "industry" },
        { label: { ar: "الحكومي", en: "Government" }, value: "government" },
        { label: { ar: "التقنية", en: "Technology" }, value: "technology" },
      ],
    },
    { name: "year", type: "number", label: { ar: "السنة", en: "Year" } },
    {
      name: "summary",
      type: "textarea",
      localized: true,
      label: { ar: "ملخص", en: "Summary" },
    },
    {
      name: "challenge",
      type: "richText",
      localized: true,
      editor: lexicalEditor({}),
      label: { ar: "التحدي", en: "Challenge" },
    },
    {
      name: "solution",
      type: "richText",
      localized: true,
      editor: lexicalEditor({}),
      label: { ar: "الحل", en: "Solution" },
    },
    {
      name: "results",
      type: "array",
      localized: true,
      label: { ar: "النتائج", en: "Results" },
      fields: [
        { name: "metric", type: "text", required: true, label: { ar: "المؤشر", en: "Metric" } },
        { name: "value", type: "text", required: true, label: { ar: "القيمة", en: "Value" } },
      ],
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: { ar: "الصورة الرئيسية", en: "Cover Image" },
    },
    {
      name: "gallery",
      type: "array",
      label: { ar: "معرض الصور", en: "Gallery" },
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
    {
      name: "services",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      label: { ar: "الخدمات المقدّمة", en: "Services Provided" },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      label: { ar: "مميز", en: "Featured" },
    },
  ],
}
