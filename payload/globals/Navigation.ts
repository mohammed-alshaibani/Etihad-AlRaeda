import type { GlobalConfig } from "payload"

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: { ar: "القائمة والتذييل", en: "Navigation & Footer" },
  admin: { group: "الإعدادات" },
  access: { read: () => true },
  fields: [
    {
      name: "mainMenu",
      type: "array",
      localized: true,
      label: { ar: "القائمة الرئيسية", en: "Main Menu" },
      fields: [
        { name: "label", type: "text", required: true, label: { ar: "النص", en: "Label" } },
        { name: "url", type: "text", required: true, label: { ar: "الرابط", en: "URL" } },
        {
          name: "children",
          type: "array",
          label: { ar: "قائمة فرعية", en: "Submenu" },
          fields: [
            { name: "label", type: "text", required: true },
            { name: "url", type: "text", required: true },
            { name: "description", type: "text", label: { ar: "وصف مختصر", en: "Description" } },
          ],
        },
      ],
    },
    {
      name: "footerColumns",
      type: "array",
      localized: true,
      label: { ar: "أعمدة التذييل", en: "Footer Columns" },
      fields: [
        { name: "title", type: "text", required: true, label: { ar: "عنوان العمود", en: "Column Title" } },
        {
          name: "links",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "url", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "footerBottom",
      type: "group",
      label: { ar: "أسفل التذييل", en: "Footer Bottom" },
      fields: [
        { name: "copyright", type: "text", localized: true, label: { ar: "حقوق النشر", en: "Copyright" } },
        {
          name: "legalLinks",
          type: "array",
          localized: true,
          fields: [
            { name: "label", type: "text", required: true },
            { name: "url", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "announcementBar",
      type: "group",
      label: { ar: "شريط إعلاني علوي", en: "Top Announcement Bar" },
      fields: [
        { name: "enabled", type: "checkbox", defaultValue: false },
        { name: "text", type: "text", localized: true },
        { name: "linkLabel", type: "text", localized: true },
        { name: "linkUrl", type: "text" },
      ],
    },
  ],
}
