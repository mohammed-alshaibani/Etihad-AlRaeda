import type { CollectionConfig } from "payload"

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "company", "resource", "createdAt"],
    group: "المبيعات",
  },
  labels: {
    singular: { ar: "عميل محتمل", en: "Lead" },
    plural: { ar: "قائمة العملاء المحتملين", en: "Leads" },
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: { ar: "بيانات العميل", en: "Contact Details" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "name", type: "text", required: true, label: { ar: "الاسم الكامل", en: "Full Name" }, admin: { width: "50%" } },
                { name: "email", type: "email", required: true, label: { ar: "البريد الإلكتروني", en: "Email Address" }, admin: { width: "50%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "company", type: "text", label: { ar: "الشركة", en: "Company / organization" }, admin: { width: "50%" } },
                { name: "jobTitle", type: "text", label: { ar: "المسمى الوظيفي", en: "Position" }, admin: { width: "50%" } },
              ],
            },
          ],
        },
        {
          label: { ar: "سياق التحميل", en: "Context" },
          fields: [
            {
              name: "resource",
              type: "relationship",
              relationTo: "resources",
              required: true,
              label: { ar: "المورد الذي تم تحميله", en: "Gated Resource" },
            },
            {
              name: "source",
              type: "select",
              options: [
                { label: "Resource Library", value: "library" },
                { label: "Other", value: "other" },
              ],
              defaultValue: "library",
              label: { ar: "المصدر", en: "Lead Source" },
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
