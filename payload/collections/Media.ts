import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["alt", "filename", "filesize", "updatedAt"],
    group: "المحتوى",
  },
  labels: {
    singular: { ar: "ملف / صورة", en: "Media File" },
    plural: { ar: "مكتبة الوسائط", en: "Media Library" },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
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
      required: true,
      localized: true,
      label: { ar: "النص البديل (للصور)", en: "Alt Text" },
      admin: { description: "يُستخدم لوصف الصورة لمحركات البحث وقوارئ الشاشة" },
    },
    {
      name: "caption",
      type: "textarea",
      localized: true,
      label: { ar: "وصف داخلي / تسمية", en: "Caption / Description" },
    },
  ],
}
