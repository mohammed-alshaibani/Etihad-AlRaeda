import type { GlobalConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: { ar: "الصفحة الرئيسية", en: "Homepage" },
  admin: { group: "محتوى الصفحات" },
    access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "heroSlides",
      type: "relationship",
      relationTo: "hero-slides",
      hasMany: true,
      label: { ar: "شرائح القسم الرئيسي", en: "Hero Slides" },
    },
    {
      name: "about",
      type: "group",
      label: { ar: "قسم (من نحن)", en: "About Section" },
      fields: [
        { name: "eyebrow", type: "text", localized: true, label: { ar: "علوي", en: "Eyebrow" } },
        { name: "title", type: "text", localized: true, label: { ar: "العنوان", en: "Title" } },
        {
          name: "description",
          type: "richText",
          localized: true,
          editor: lexicalEditor({}),
          label: { ar: "الوصف", en: "Description" },
        },
        { name: "image", type: "upload", relationTo: "media", label: { ar: "الصورة", en: "Image" } },
        {
          name: "highlights",
          type: "array",
          localized: true,
          label: { ar: "نقاط بارزة", en: "Highlights" },
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea" },
          ],
        },
      ],
    },
    {
      name: "servicesSection",
      type: "group",
      label: { ar: "قسم الخدمات", en: "Services Section" },
      fields: [
        { name: "eyebrow", type: "text", localized: true, label: { ar: "علوي", en: "Eyebrow" } },
        { name: "title", type: "text", localized: true, label: { ar: "العنوان", en: "Title" } },
        { name: "description", type: "textarea", localized: true, label: { ar: "الوصف", en: "Description" } },
      ],
    },
    {
      name: "portfolioSection",
      type: "group",
      label: { ar: "قسم الأعمال", en: "Portfolio Section" },
      fields: [
        { name: "eyebrow", type: "text", localized: true, label: { ar: "علوي", en: "Eyebrow" } },
        { name: "title", type: "text", localized: true, label: { ar: "العنوان", en: "Title" } },
        { name: "description", type: "textarea", localized: true, label: { ar: "الوصف", en: "Description" } },
      ],
    },
    {
      name: "processSection",
      type: "group",
      label: { ar: "قسم منهجية العمل", en: "Process Section" },
      fields: [
        { name: "title", type: "text", localized: true, label: { ar: "العنوان", en: "Title" } },
        { name: "description", type: "textarea", localized: true, label: { ar: "الوصف", en: "Description" } },
        {
          name: "steps",
          type: "array",
          localized: true,
          fields: [
            { name: "number", type: "text", label: { ar: "الرقم", en: "Number" } },
            { name: "title", type: "text", required: true, label: { ar: "العنوان", en: "Title" } },
            { name: "description", type: "textarea", label: { ar: "الوصف", en: "Description" } },
          ],
        },
      ],
    },
    {
      name: "finalCta",
      type: "group",
      label: { ar: "قسم الدعوة النهائية", en: "Final CTA" },
      fields: [
        { name: "title", type: "text", localized: true, label: { ar: "العنوان", en: "Title" } },
        { name: "description", type: "textarea", localized: true, label: { ar: "الوصف", en: "Description" } },
        { name: "ctaLabel", type: "text", localized: true, label: { ar: "نص الزر", en: "CTA Label" } },
        { name: "ctaUrl", type: "text", label: { ar: "رابط الزر", en: "CTA URL" } },
      ],
    },
  ],
}
