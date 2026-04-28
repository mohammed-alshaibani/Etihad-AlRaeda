import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

const toSlug = (str: string) =>
  str
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-\u0600-\u06FF-]/gi, "")
    .toLowerCase()

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "order", "isFeatured", "updatedAt"],
    group: "المحتوى",
    hideAPIURL: true,
  },
  labels: {
    singular: { ar: "خدمة", en: "Service" },
    plural: { ar: "الخدمات", en: "Services" },
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
        if (operation === "create" && data?.title && !data?.slug) {
          data.slug = toSlug(typeof data.title === "object" ? (data.title.ar || data.title.en || "") : (data.title || ""))
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
              name: "title",
              type: "text",
              required: true,
              localized: true,
              label: { ar: "اسم الخدمة", en: "Service Name" },
            },
            {
              name: "shortDescription",
              type: "textarea",
              localized: true,
              label: { ar: "وصف مختصر", en: "Short Description" },
            },
            {
              name: "description",
              type: "richText",
              localized: true,
              editor: lexicalEditor({}),
              label: { ar: "الوصف التفصيلي", en: "Full Description" },
            },
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              label: { ar: "الصورة الرئيسية", en: "Cover Image" },
            },
            {
              name: "icon",
              type: "select",
              label: { ar: "الأيقونة", en: "Icon" },
              options: [
                "Briefcase", "TrendingUp", "Shield", "Users", "Target",
                "Building2", "LineChart", "Scale", "Layers", "Zap"
              ],
              defaultValue: "Briefcase",
            },
          ],
        },
        {
          label: { ar: "التفاصيل", en: "Details" },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "startingPrice",
                  type: "text",
                  label: { ar: "السعر يبدأ من", en: "Starting Price" },
                  admin: { width: "50%", description: 'مثال: "15,000 ر.س"' },
                },
                {
                  name: "category",
                  type: "relationship",
                  relationTo: "categories",
                  label: { ar: "التصنيف", en: "Category" },
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "duration",
                  type: "text",
                  localized: true,
                  label: { ar: "المدة المتوقعة", en: "Duration" },
                  admin: { width: "100%" },
                },
              ],
            },
          ],
        },
        {
          label: { ar: "الإعدادات", en: "Settings" },
          fields: [
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              label: { ar: "المعرّف (Slug)", en: "Slug" },
              admin: { description: "يستخدم في رابط الصفحة" },
            },
            {
              type: "row",
              fields: [
                {
                  name: "order",
                  type: "number",
                  defaultValue: 0,
                  label: { ar: "الترتيب", en: "Order" },
                  admin: { width: "50%" },
                },
                {
                  name: "isFeatured",
                  type: "checkbox",
                  defaultValue: false,
                  label: { ar: "مميز", en: "Featured" },
                  admin: { width: "50%", style: { alignSelf: "center" } },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
