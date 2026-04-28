import type { CollectionConfig } from "payload"

export const Partners: CollectionConfig = {
  slug: "partners",
  admin: { useAsTitle: "name", group: "المحتوى" },
  labels: {
    singular: { ar: "شريك / عميل", en: "Partner" },
    plural: { ar: "الشركاء والعملاء", en: "Partners & Clients" },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: { ar: "بيانات الشريك", en: "Partner Info" },
          fields: [
            { name: "name", type: "text", required: true, localized: true, label: { ar: "اسم الشركة", en: "Company Name" } },
            { name: "logo", type: "upload", relationTo: "media", required: true, label: { ar: "شعار الشريك", en: "Official Logo" } },
          ],
        },
        {
          label: { ar: "الإعدادات", en: "Settings" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "website", type: "text", label: { ar: "رابط الموقع", en: "Website URL" }, admin: { width: "50%" } },
                { name: "order", type: "number", defaultValue: 0, label: { ar: "ترتيب العرض", en: "Display Order" }, admin: { width: "50%" } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
