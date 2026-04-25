import type { CollectionConfig } from "payload"

export const Partners: CollectionConfig = {
  slug: "partners",
  admin: { useAsTitle: "name", group: "المحتوى" },
  labels: {
    singular: { ar: "شريك / عميل", en: "Partner" },
    plural: { ar: "الشركاء والعملاء", en: "Partners & Clients" },
  },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, localized: true, label: { ar: "الاسم", en: "Name" } },
    { name: "logo", type: "upload", relationTo: "media", label: { ar: "الشعار", en: "Logo" } },
    { name: "website", type: "text", label: { ar: "الموقع", en: "Website" } },
    { name: "order", type: "number", defaultValue: 0, label: { ar: "الترتيب", en: "Order" } },
  ],
}
