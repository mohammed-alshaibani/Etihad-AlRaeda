import type { CollectionConfig } from "payload"

const toSlug = (str: string) =>
  str
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-\u0600-\u06FF-]/gi, "")
    .toLowerCase()

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "parent", "updatedAt"],
    group: "المتجر",
  },
  labels: {
    singular: { ar: "تصنيف", en: "Category" },
    plural: { ar: "التصنيفات", en: "Categories" },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === "create" && data?.name && !data?.slug) {
          data.slug = toSlug(typeof data.name === "object" ? (data.name.ar || data.name.en || "") : (data.name || ""))
        }
        return data
      },
    ],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: { ar: "المحتوى", en: "Content" },
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              localized: true,
              label: { ar: "اسم التصنيف", en: "Category Name" },
            },
            {
              name: "description",
              type: "textarea",
              localized: true,
              label: { ar: "الوصف", en: "Description" },
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: { ar: "صورة التصنيف", en: "Category Cover Image" },
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
                  name: "parent",
                  type: "relationship",
                  relationTo: "categories",
                  label: { ar: "التصنيف الأب", en: "Parent" },
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "order",
                  type: "number",
                  defaultValue: 0,
                  label: { ar: "الترتيب", en: "Display Order" },
                  admin: { width: "50%" },
                },
                {
                  name: "isActive",
                  type: "checkbox",
                  defaultValue: true,
                  label: { ar: "مفعّل", en: "Active" },
                  admin: { width: "50%" },
                },
              ],
            },
          ],
        },
        {
          label: { ar: "SEO", en: "SEO" },
          fields: [
            {
              name: "seo",
              type: "group",
              label: { ar: "تحسين محركات البحث", en: "SEO" },
              fields: [
                { name: "metaTitle", type: "text", localized: true },
                { name: "metaDescription", type: "textarea", localized: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
