import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "الإدارة",
  },
  labels: {
    singular: { ar: "وسائط", en: "Media" },
    plural: { ar: "مكتبة الوسائط", en: "Media Library" },
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*", "application/pdf", "video/*"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 800, height: 600, position: "centre" },
      { name: "hero", width: 1920, height: 1080, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: { ar: "النص البديل", en: "Alt Text" },
      required: false,
      localized: true,
    },
    {
      name: "caption",
      type: "text",
      label: { ar: "التسمية التوضيحية", en: "Caption" },
      localized: true,
    },
  ],
}
