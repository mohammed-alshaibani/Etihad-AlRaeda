import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "isFeatured"],
    group: "المحتوى",
  },
  labels: {
    singular: { ar: "مقالة", en: "Post" },
    plural: { ar: "المدوّنة", en: "Blog" },
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true, localized: true, label: { ar: "العنوان", en: "Title" } },
    { name: "slug", type: "text", required: true, unique: true, label: { ar: "المعرّف", en: "Slug" } },
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
      label: { ar: "مقتطف", en: "Excerpt" },
    },
    {
      name: "content",
      type: "richText",
      localized: true,
      editor: lexicalEditor({}),
      label: { ar: "المحتوى", en: "Content" },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: { ar: "الصورة الرئيسية", en: "Cover Image" },
    },
    {
      name: "category",
      type: "select",
      label: { ar: "التصنيف", en: "Category" },
      options: [
        { label: { ar: "استراتيجية", en: "Strategy" }, value: "strategy" },
        { label: { ar: "تحول رقمي", en: "Digital Transformation" }, value: "digital" },
        { label: { ar: "حوكمة", en: "Governance" }, value: "governance" },
        { label: { ar: "تمويل واستثمار", en: "Finance & Investment" }, value: "finance" },
        { label: { ar: "تسويق", en: "Marketing" }, value: "marketing" },
        { label: { ar: "قيادة", en: "Leadership" }, value: "leadership" },
      ],
    },
    {
      name: "readingTime",
      type: "number",
      label: { ar: "مدة القراءة (دقائق)", en: "Reading Time (min)" },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "team",
      label: { ar: "الكاتب", en: "Author" },
    },
    {
      name: "publishedAt",
      type: "date",
      label: { ar: "تاريخ النشر", en: "Published At" },
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    { name: "isFeatured", type: "checkbox", defaultValue: false, label: { ar: "مميز", en: "Featured" } },
  ],
}
