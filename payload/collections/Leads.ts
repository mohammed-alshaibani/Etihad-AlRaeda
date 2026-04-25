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
      name: "email",
      type: "email",
      required: true,
      label: { ar: "البريد الإلكتروني", en: "Email" },
    },
    {
      name: "name",
      type: "text",
      required: true,
      label: { ar: "الاسم", en: "Name" },
    },
    {
      name: "company",
      type: "text",
      label: { ar: "الشركة", en: "Company" },
    },
    {
      name: "jobTitle",
      type: "text",
      label: { ar: "المسمى الوظيفي", en: "Job Title" },
    },
    {
      name: "resource",
      type: "relationship",
      relationTo: "resources",
      required: true,
      label: { ar: "المورد المحمّل", en: "Downloaded Resource" },
    },
    {
      name: "source",
      type: "select",
      options: [
        { label: "Library", value: "library" },
        { label: "Other", value: "other" },
      ],
      defaultValue: "library",
      label: { ar: "المصدر", en: "Source" },
    },
  ],
  timestamps: true,
}
