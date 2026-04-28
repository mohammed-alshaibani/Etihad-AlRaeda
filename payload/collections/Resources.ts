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
    {
      type: "tabs",
      tabs: [
        {
          label: { ar: "معلومات الملف", en: "Resource Info" },
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              localized: true,
              label: { ar: "العنوان", en: "Title" },
            },
            {
              name: "summary",
              type: "textarea",
              localized: true,
              label: { ar: "ملخص قصير", en: "Short Summary" },
            },
            {
              type: "row",
              fields: [
                {
                  name: "type",
                  type: "select",
                  label: { ar: "نوع المورد", en: "Resource Type" },
                  admin: { width: "50%" },
                  options: [
                    { label: { ar: "دراسة حالة", en: "Case Study" }, value: "case-study" },
                    { label: { ar: "تقرير", en: "Report" }, value: "report" },
                    { label: { ar: "ورقة بيضاء", en: "Whitepaper" }, value: "whitepaper" },
                    { label: { ar: "دليل إرشادي", en: "Guide" }, value: "guide" },
                    { label: { ar: "عرض تقديمي", en: "Presentation" }, value: "presentation" },
                    { label: { ar: "ندوة مسجلة", en: "Webinar" }, value: "webinar" },
                  ],
                },
                {
                  name: "category",
                  type: "text",
                  localized: true,
                  label: { ar: "التصنيف", en: "Category" },
                  admin: { width: "50%" },
                },
              ],
            },
          ],
        },
        {
          label: { ar: "الملفات والوسائط", en: "Assets" },
          fields: [
            { name: "file", type: "upload", relationTo: "media", required: true, label: { ar: "تحميل الملف", en: "Downloadable File" } },
            { name: "coverImage", type: "upload", relationTo: "media", label: { ar: "صورة الغلاف", en: "Cover Image" } },
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
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "gated",
              type: "checkbox",
              defaultValue: false,
              label: { ar: "تفعيل المحتوى المقيّد (يتطلب تسجيل بيانات)", en: "Gated Content (Lead Gen)" },
              admin: { style: { marginTop: "20px" } },
            },
          ],
        },
      ],
    },
  ],
}
