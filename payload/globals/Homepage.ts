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
      type: "tabs",
      tabs: [
        {
          label: { ar: "البداية وعن المؤسسة", en: "Hero & About" },
          fields: [
            {
              name: "heroSlides",
              type: "relationship",
              relationTo: "hero-slides",
              hasMany: true,
              label: { ar: "شرائح العرض الرئيسية", en: "Hero Slides Configuration" },
            },
            {
              name: "about",
              type: "group",
              label: { ar: "قسم نبذة عنا (About Us)", en: "About Us Section" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "eyebrow", type: "text", localized: true, label: { ar: "نص علوي", en: "Eyebrow" }, admin: { width: "50%" } },
                    { name: "title", type: "text", localized: true, label: { ar: "العنوان الرئيسي", en: "Section Title" }, admin: { width: "50%" } },
                  ],
                },
                {
                  name: "description",
                  type: "richText",
                  localized: true,
                  editor: lexicalEditor({}),
                  label: { ar: "النص التفصيلي", en: "Main Narrative" },
                },
                {
                  name: "coreIdea",
                  type: "text",
                  localized: true,
                  label: { ar: "الفكرة الجوهرية (Core Idea)", en: "Core Idea" },
                  admin: {
                    description: 'مثال: "إدارة المرافق بالكامل من جهة واحدة = كفاءة أعلى + تكلفة أقل + راحة بال"',
                  },
                },
                {
                  name: "highlights",
                  type: "array",
                  localized: true,
                  label: { ar: "نقاط القوة / المميزات", en: "Core Highlights" },
                  admin: { initCollapsed: true },
                  fields: [
                    { name: "title", type: "text", required: true, label: { ar: "العنوان", en: "Point Title" } },
                    { name: "description", type: "textarea", label: { ar: "الوصف", en: "Point Description" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { ar: "الخدمات والأعمال", en: "Services & Portfolio" },
          fields: [
            {
              name: "servicesSection",
              type: "group",
              label: { ar: "تهيئة قسم الخدمات", en: "Services Landing Section" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "eyebrow", type: "text", localized: true, label: { ar: "نص علوي", en: "Eyebrow" }, admin: { width: "50%" } },
                    { name: "title", type: "text", localized: true, label: { ar: "عنوان القسم", en: "Title" }, admin: { width: "50%" } },
                  ],
                },
                { name: "description", type: "textarea", localized: true, label: { ar: "وصف موجز", en: "Introduction" } },
              ],
            },
            {
              name: "portfolioSection",
              type: "group",
              label: { ar: "تهيئة قسم معرض الأعمال", en: "Portfolio Showcase Section" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "eyebrow", type: "text", localized: true, label: { ar: "نص علوي", en: "Eyebrow" }, admin: { width: "50%" } },
                    { name: "title", type: "text", localized: true, label: { ar: "عنوان القسم", en: "Title" }, admin: { width: "50%" } },
                  ],
                },
                { name: "description", type: "textarea", localized: true, label: { ar: "وصف موجز", en: "Introduction" } },
              ],
            },
          ],
        },
        {
          label: { ar: "منهجية العمل", en: "Process" },
          fields: [
            {
              name: "processSection",
              type: "group",
              label: { ar: "خطوات العمل (منهجيتنا)", en: "Work Methodology" },
              fields: [
                { name: "title", type: "text", localized: true, label: { ar: "عنوان القسم", en: "Section Title" } },
                { name: "description", type: "textarea", localized: true, label: { ar: "وصف المنهجية", en: "Context" } },
                {
                  name: "steps",
                  type: "array",
                  localized: true,
                  label: { ar: "مراحل العمل", en: "Methodology Steps" },
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        { name: "number", type: "text", label: { ar: "رقم الخطوة", en: "Step Number" }, admin: { width: "30%" } },
                        { name: "title", type: "text", required: true, label: { ar: "اسم الخطوة", en: "Step Title" }, admin: { width: "70%" } },
                      ],
                    },
                    { name: "description", type: "textarea", label: { ar: "شرح الخطوة", en: "Step Detail" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { ar: "خاتمة الصفحة (CTA)", en: "Final Action" },
          fields: [
            {
              name: "finalCta",
              type: "group",
              label: { ar: "قسم الدعوة لاتخاذ إجراء", en: "Closing Call to Action" },
              fields: [
                { name: "title", type: "text", localized: true, label: { ar: "العنوان المشجع", en: "Motivational Title" } },
                { name: "description", type: "textarea", localized: true, label: { ar: "النص الإقناعي", en: "Persuasive Text" } },
                {
                  type: "row",
                  fields: [
                    { name: "ctaLabel", type: "text", localized: true, label: { ar: "نص الزر", en: "Button Label" }, admin: { width: "50%" } },
                    { name: "ctaUrl", type: "text", label: { ar: "رابط الزر", en: "Button Link" }, admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
