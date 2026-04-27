import type { GlobalConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: { ar: "صفحة (من نحن)", en: "About Page" },
  admin: { group: "محتوى الصفحات" },
    access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "hero",
      type: "group",
      label: { ar: "القسم الرئيسي", en: "Hero" },
      fields: [
        { name: "eyebrow", type: "text", localized: true },
        { name: "title", type: "text", localized: true },
        { name: "subtitle", type: "textarea", localized: true },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "story",
      type: "group",
      label: { ar: "قصتنا", en: "Our Story" },
      fields: [
        { name: "title", type: "text", localized: true },
        { name: "content", type: "richText", localized: true, editor: lexicalEditor({}) },
      ],
    },
    {
      name: "mission",
      type: "group",
      label: { ar: "الرسالة والرؤية", en: "Mission & Vision" },
      fields: [
        { name: "missionTitle", type: "text", localized: true },
        { name: "missionText", type: "textarea", localized: true },
        { name: "visionTitle", type: "text", localized: true },
        { name: "visionText", type: "textarea", localized: true },
      ],
    },
    {
      name: "values",
      type: "array",
      localized: true,
      label: { ar: "القيم", en: "Core Values" },
      fields: [
        { name: "icon", type: "text", label: { ar: "اسم الأيقونة", en: "Icon Name" } },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
      ],
    },
    {
      name: "timeline",
      type: "array",
      localized: true,
      label: { ar: "المحطات", en: "Timeline" },
      fields: [
        { name: "year", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
      ],
    },
  ],
}
