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
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true, localized: true, label: { ar: "العنوان", en: "Title" } },
    { name: "slug", type: "text", required: true, unique: true, label: { ar: "المعرّف", en: "Slug" } },
    {
      name: "type",
      type: "select",
      label: { ar: "النوع", en: "Type" },
      options: [
        { label: { ar: "خبر", en: "News" }, value: "news" },
        { label: { ar: "فعالية", en: "Event" }, value: "event" },
        { label: { ar: "إعلان", en: "Announcement" }, value: "announcement" },
        { label: { ar: "إصدار صحفي", en: "Press Release" }, value: "press" },
      ],
      defaultValue: "news",
    },
    { name: "excerpt", type: "textarea", localized: true, label: { ar: "مقتطف", en: "Excerpt" } },
    {
      name: "content",
      type: "richText",
      localized: true,
      editor: lexicalEditor({}),
      label: { ar: "المحتوى", en: "Content" },
    },
    { name: "coverImage", type: "upload", relationTo: "media", label: { ar: "الصورة", en: "Image" } },
    { name: "eventDate", type: "date", label: { ar: "تاريخ الفعالية", en: "Event Date" } },
    { name: "eventLocation", type: "text", localized: true, label: { ar: "موقع الفعالية", en: "Event Location" } },
    { name: "publishedAt", type: "date", label: { ar: "تاريخ النشر", en: "Published At" } },
  ],
}
