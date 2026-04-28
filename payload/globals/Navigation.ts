import type { GlobalConfig } from "payload"

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: { ar: "القائم والتذييل", en: "Navigation & Footer" },
  admin: { group: "الإعدادات" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: { ar: "رأس الصفحة", en: "Header" },
          fields: [
            {
              name: "secondaryMenu",
              type: "array",
              localized: true,
              label: { ar: "القائمة العلوية الفرعية (تظهر بالأعلى)", en: "Navbar Top (Secondary)" },
              admin: { initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", required: true, label: { ar: "النص", en: "Label" }, admin: { width: "50%" } },
                    { name: "url", type: "text", required: true, label: { ar: "الرابط (URL)", en: "URI" }, admin: { width: "50%" } },
                  ],
                },
              ],
            },
            {
              name: "mainMenu",
              type: "array",
              localized: true,
              label: { ar: "القائمة العلوية الرئيسية", en: "Primary Navigation" },
              admin: { initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", required: true, label: { ar: "نص الرابط", en: "Label" }, admin: { width: "50%" } },
                    { name: "url", type: "text", required: true, label: { ar: "الرابط (URL)", en: "URI" }, admin: { width: "50%" } },
                  ],
                },
                {
                  name: "children",
                  type: "array",
                  label: { ar: "روابط منبثقة فرعية", en: "Mega Menu / Dropdown" },
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        { name: "label", type: "text", required: true, label: { ar: "نص الفرعي", en: "Sub-Label" }, admin: { width: "50%" } },
                        { name: "url", type: "text", required: true, label: { ar: "الرابط الفرعي", en: "Sub-URI" }, admin: { width: "50%" } },
                      ],
                    },
                    { name: "description", type: "text", label: { ar: "وصف توضيحي للخدمة", en: "Brief Description" } },
                  ],
                },
              ],
            },
            {
              name: "announcementBar",
              type: "group",
              label: { ar: "شريط التنبيهات العلوي", en: "Announcement Bar" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "enabled", type: "checkbox", defaultValue: false, label: { ar: "تفعيل الشريط", en: "Show Bar" }, admin: { width: "20%" } },
                    { name: "text", type: "text", localized: true, label: { ar: "نص التنبيه", en: "Content" }, admin: { width: "80%" } },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    { name: "linkLabel", type: "text", localized: true, label: { ar: "نص الزر", en: "Button Label" }, admin: { width: "50%" } },
                    { name: "linkUrl", type: "text", label: { ar: "رابط الإجراء", en: "Button URL" }, admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { ar: "تذييل الصفحة", en: "Footer" },
          fields: [
            {
              name: "footerColumns",
              type: "array",
              localized: true,
              label: { ar: "أعمدة الروابط السريعة", en: "Footer Link Groups" },
              admin: { initCollapsed: true },
              fields: [
                { name: "title", type: "text", required: true, label: { ar: "عنوان المجموعة", en: "Column Title" } },
                {
                  name: "links",
                  type: "array",
                  label: { ar: "قائمة الروابط", en: "Link List" },
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        { name: "label", type: "text", required: true, label: { ar: "النص", en: "Text" }, admin: { width: "50%" } },
                        { name: "url", type: "text", required: true, label: { ar: "الرابط", en: "URL" }, admin: { width: "50%" } },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "footerBottom",
              type: "group",
              label: { ar: "الجزء السفلي من التذييل", en: "Legal & Copyrights" },
              fields: [
                { name: "copyright", type: "text", localized: true, label: { ar: "نص حقوق الملكية", en: "Copyright Statement" } },
                {
                  name: "legalLinks",
                  type: "array",
                  localized: true,
                  label: { ar: "روابط قانونية (سياسة الخصوصية ...)", en: "Legal Quick Links" },
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        { name: "label", type: "text", required: true, label: { ar: "الاسم", en: "Policy Name" }, admin: { width: "50%" } },
                        { name: "url", type: "text", required: true, label: { ar: "الرابط", en: "URL" }, admin: { width: "50%" } },
                      ],
                    },
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
