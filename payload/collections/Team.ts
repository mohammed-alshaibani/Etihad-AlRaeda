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
          label: { ar: "الملف الشخصي", en: "Profile" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "name", type: "text", required: true, localized: true, label: { ar: "الاسم", en: "Full Name" }, admin: { width: "50%" } },
                { name: "role", type: "text", localized: true, label: { ar: "المنصب", en: "Role / Job Title" }, admin: { width: "50%" } },
              ],
            },
            {
              name: "bio",
              type: "textarea",
              localized: true,
              label: { ar: "نبذة تعريفية", en: "Short Bio" },
            },
            {
              name: "photo",
              type: "upload",
              relationTo: "media",
              label: { ar: "الصورة الرسمية", en: "Professional Photo" },
            },
          ],
        },
        {
          label: { ar: "التواصل والإعدادات", en: "Socials & Settings" },
          fields: [
            {
              name: "socials",
              type: "group",
              label: { ar: "روابط التواصل الاجتماعي", en: "Social Media Links" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "linkedin", type: "text", label: "LinkedIn URL", admin: { width: "50%" } },
                    { name: "twitter", type: "text", label: "Twitter / X URL", admin: { width: "50%" } },
                  ],
                },
                { name: "email", type: "email", label: { ar: "البريد الإلكتروني للعمل", en: "Public Email" } },
              ],
            },
            {
              name: "order",
              type: "number",
              defaultValue: 0,
              label: { ar: "ترتيب العرض", en: "Display Order" },
              admin: { description: "الأرقام الأصغر تظهر أولاً" },
            },
          ],
        },
      ],
    },
  ],
}
