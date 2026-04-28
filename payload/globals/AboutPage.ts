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
      type: "tabs",
      tabs: [
        {
          label: { ar: "واجهة الصفحة", en: "Hero" },
          fields: [
            {
              name: "hero",
              type: "group",
              label: { ar: "القسم التعريفي الرئيسي", en: "Main Introduction" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "eyebrow", type: "text", localized: true, label: { ar: "نص علوي", en: "Eyebrow" }, admin: { width: "50%" } },
                    { name: "title", type: "text", localized: true, label: { ar: "العنوان الرئيسي", en: "Page Title" }, admin: { width: "50%" } },
                  ],
                },
                { name: "subtitle", type: "textarea", localized: true, label: { ar: "عنوان فرعي / مقدمة", en: "Subtitle Intro" } },
                { name: "image", type: "upload", relationTo: "media", label: { ar: "الصورة الرئيسية", en: "Featured Image" } },
              ],
            },
          ],
        },
        {
          label: { ar: "قصتنا وأهدافنا", en: "Story & Vision" },
          fields: [
            {
              name: "story",
              type: "group",
              label: { ar: "قصة التأسيس", en: "Our Background" },
              fields: [
                { name: "title", type: "text", localized: true, label: { ar: "عنوان القسم", en: "Section Heading" } },
                { name: "content", type: "richText", localized: true, editor: lexicalEditor({}), label: { ar: "المحتوى السردي", en: "Narrative Content" } },
              ],
            },
            {
              name: "mission",
              type: "group",
              label: { ar: "الرؤية والرسالة", en: "Mission & Vision" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "missionTitle", type: "text", localized: true, label: { ar: "عنوان الرسالة", en: "Mission Title" }, admin: { width: "50%" } },
                    { name: "missionText", type: "textarea", localized: true, label: { ar: "نص الرسالة", en: "Mission Body" }, admin: { width: "50%" } },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    { name: "visionTitle", type: "text", localized: true, label: { ar: "عنوان الرؤية", en: "Vision Title" }, admin: { width: "50%" } },
                    { name: "visionText", type: "textarea", localized: true, label: { ar: "نص الرؤية", en: "Vision Body" }, admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { ar: "القيم والمحطات", en: "Values & Timeline" },
          fields: [
            {
              name: "values",
              type: "array",
              localized: true,
              label: { ar: "قيمنا الجوهرية", en: "Company Values" },
              admin: { initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "icon", type: "text", label: { ar: "اسم الأيقونة (Lucide)", en: "Icon Name" }, admin: { width: "30%" } },
                    { name: "title", type: "text", required: true, label: { ar: "القيمة", en: "Value Title" }, admin: { width: "70%" } },
                  ],
                },
                { name: "description", type: "textarea", label: { ar: "وصف القيمة", en: "Description" } },
              ],
            },
            {
              name: "timeline",
              type: "array",
              localized: true,
              label: { ar: "المحطات التاريخية / المسيرة", en: "Journey Milestones" },
              admin: { initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "year", type: "text", required: true, label: { ar: "السنة", en: "Year" }, admin: { width: "30%" } },
                    { name: "title", type: "text", required: true, label: { ar: "المناسبة / الحدث", en: "Event Title" }, admin: { width: "70%" } },
                  ],
                },
                { name: "description", type: "textarea", label: { ar: "تفاصيل المحطة", en: "Detailed Highlight" } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
