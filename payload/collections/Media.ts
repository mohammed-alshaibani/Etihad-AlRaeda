import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    hidden: true, // Hide from sidebar
  },
  labels: {
    singular: { ar: "وسائط", en: "Media" },
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
  fields: [], // No extra fields (alt, name, etc.)
}
