import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedAt", "isFeatured"],
    group: "المحتوى",
  },
  labels: {
    singular: { ar: "مقالة", en: "Post" },
    plural: { ar: "المدوّنة", en: "Blog" },
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
          label: { ar: "المحتوى", en: "Article" },
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              localized: true,
              label: { ar: "عنوان المقالة", en: "Post Title" },
            },
            {
              name: "excerpt",
              type: "textarea",
              localized: true,
              label: { ar: "مقتطف قصير", en: "Short Excerpt" },
            },
            {
              name: "content",
              type: "richText",
              localized: true,
              editor: lexicalEditor({}),
              label: { ar: "نص المقالة الكامل", en: "Body Content" },
            },
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              label: { ar: "الصورة البارزة", en: "Featured Image" },
            },
          ],
        },
        {
          label: { ar: "بيانات إضافية", en: "Metadata" },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "category",
                  type: "select",
                  label: { ar: "التصنيف", en: "Category" },
                  admin: { width: "50%" },
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
                  name: "author",
                  type: "relationship",
                  relationTo: "team",
                  label: { ar: "الكاتب", en: "Author" },
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "readingTime",
                  type: "number",
                  label: { ar: "مدة القراءة (دقائق)", en: "Reading Time" },
                  admin: { width: "50%" },
                },
                {
                  name: "isFeatured",
                  type: "checkbox",
                  defaultValue: false,
                  label: { ar: "تمييز المقالة", en: "Featured Post" },
                  admin: { width: "50%", style: { alignSelf: "center" } },
                },
              ],
            },
            {
              name: "tags",
              type: "array",
              label: { ar: "الوسوم", en: "Tags" },
              admin: { initCollapsed: true },
              fields: [{ name: "tag", type: "text", required: true, label: { ar: "الوسم", en: "Tag Name" } }],
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
                  name: "publishedAt",
                  type: "date",
                  label: { ar: "تاريخ النشر", en: "Published Date" },
                  admin: { width: "50%", date: { pickerAppearance: "dayAndTime" } },
                },
              ],
            },
            {
              name: "status",
              type: "select",
              defaultValue: "draft",
              required: true,
              label: { ar: "حالة النشر", en: "Status" },
              options: [
                { label: { ar: "مسودة", en: "Draft" }, value: "draft" },
                { label: { ar: "منشور", en: "Published" }, value: "published" },
              ],
            },
            {
              name: "relatedPosts",
              type: "relationship",
              relationTo: "posts",
              hasMany: true,
              label: { ar: "مقالات ذات صلة", en: "Related Articles" },
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
                { name: "metaTitle", type: "text", localized: true, label: { ar: "عنوان الصفحة", en: "Meta Title" } },
                { name: "metaDescription", type: "textarea", localized: true, label: { ar: "وصف الصفحة", en: "Meta Description" } },
                {
                  name: "ogImage",
                  type: "upload",
                  relationTo: "media",
                  label: { ar: "صورة المشاركة", en: "Sharing Image" },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
