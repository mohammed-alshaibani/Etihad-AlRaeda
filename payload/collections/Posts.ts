import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedAt", "isFeatured"],
    group: "المحتوى",
    preview: (doc: any) => {
      const slug = doc?.slug || ""
      return `${process.env.SERVER_URL || "http://localhost:3000"}/api/preview?secret=${process.env.PAYLOAD_SECRET}&collection=posts&slug=${slug}`
    },
  },
  labels: {
    singular: { ar: "مقالة", en: "Post" },
    plural: { ar: "المدوّنة", en: "Blog" },
  },
  access: { read: () => true },
  versions: {
    drafts: true,
  },
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
      label: { ar: "العنوان", en: "Title" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: { ar: "المعرّف", en: "Slug" },
    },
    // ─── Status ────────────────────────────────────────────────────────────
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
    // ─── Tags ──────────────────────────────────────────────────────────────
    {
      name: "tags",
      type: "array",
      label: { ar: "الوسوم", en: "Tags" },
      admin: { description: "أضف وسوماً للمساعدة في التصفية والبحث" },
      fields: [
        { name: "tag", type: "text", required: true, label: { ar: "وسم", en: "Tag" } },
      ],
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
      name: "relatedPosts",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      label: { ar: "مقالات ذات صلة", en: "Related Posts" },
    },
    {
      name: "publishedAt",
      type: "date",
      label: { ar: "تاريخ النشر", en: "Published At" },
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      label: { ar: "مميز", en: "Featured" },
    },
    // ─── SEO ───────────────────────────────────────────────────────────────
    {
      name: "seo",
      type: "group",
      label: { ar: "تحسين محركات البحث", en: "SEO" },
      fields: [
        { name: "metaTitle", type: "text", localized: true, label: { ar: "عنوان الصفحة", en: "Meta Title" } },
        { name: "metaDescription", type: "textarea", localized: true, label: { ar: "وصف الصفحة", en: "Meta Description" } },
        { name: "ogImage", type: "upload", relationTo: "media", label: { ar: "صورة المشاركة (OG)", en: "OG Image" } },
      ],
    },
  ],
}
