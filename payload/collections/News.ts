import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const News: CollectionConfig = {
  slug: "news",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "publishedAt"],
    group: "المحتوى",
  },
  labels: {
    singular: { ar: "خبر / فعالية", en: "News / Event" },
    plural: { ar: "الأخبار والفعاليات", en: "News & Events" },
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
          label: { ar: "المحتوى", en: "Article Content" },
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              localized: true,
              label: { ar: "العنوان", en: "Title" },
            },
            {
              name: "excerpt",
              type: "textarea",
              localized: true,
              label: { ar: "مقتطف سريع", en: "Short Excerpt" },
            },
            {
              name: "content",
              type: "richText",
              localized: true,
              editor: lexicalEditor({}),
              label: { ar: "المحتوى الكامل", en: "Full Content" },
            },
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              label: { ar: "الصورة الرئيسية", en: "Cover Image" },
            },
          ],
        },
        {
          label: { ar: "تفاصيل الفعالية", en: "Event Info" },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "eventDate",
                  type: "date",
                  label: { ar: "تاريخ الفعالية", en: "Event Date" },
                  admin: { width: "50%" },
                },
                {
                  name: "eventLocation",
                  type: "text",
                  localized: true,
                  label: { ar: "الموقع", en: "Location" },
                  admin: { width: "50%" },
                },
              ],
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
                  name: "type",
                  type: "select",
                  required: true,
                  defaultValue: "news",
                  label: { ar: "نوع المنشور", en: "Post Type" },
                  admin: { width: "50%" },
                  options: [
                    { label: { ar: "خبر", en: "News" }, value: "news" },
                    { label: { ar: "فعالية", en: "Event" }, value: "event" },
                    { label: { ar: "إعلان", en: "Announcement" }, value: "announcement" },
                    { label: { ar: "إصدار صحفي", en: "Press Release" }, value: "press" },
                  ],
                },
              ],
            },
            {
              name: "publishedAt",
              type: "date",
              label: { ar: "تاريخ النشر", en: "Published Date" },
              admin: { description: "اتركه فارغاً للنشر الفوري" },
            },
          ],
        },
      ],
    },
  ],
}
