import type { CollectionConfig } from "payload"

export const Team: CollectionConfig = {
  slug: "team",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
    group: "المحتوى",
  },
  labels: {
    singular: { ar: "عضو فريق", en: "Team Member" },
    plural: { ar: "فريق العمل", en: "Team Members" },
  },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, localized: true, label: { ar: "الاسم", en: "Name" } },
    { name: "role", type: "text", localized: true, label: { ar: "المنصب", en: "Role" } },
    { name: "bio", type: "textarea", localized: true, label: { ar: "نبذة", en: "Bio" } },
    { name: "photo", type: "upload", relationTo: "media", label: { ar: "الصورة", en: "Photo" } },
    {
      name: "socials",
      type: "group",
      label: { ar: "روابط التواصل", en: "Social Links" },
      fields: [
        { name: "linkedin", type: "text", label: "LinkedIn" },
        { name: "twitter", type: "text", label: "Twitter / X" },
        { name: "email", type: "email", label: { ar: "البريد الإلكتروني", en: "Email" } },
      ],
    },
    { name: "order", type: "number", defaultValue: 0, label: { ar: "الترتيب", en: "Order" } },
  ],
}
