import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    group: "الإدارة",
  },
  auth: true,
  labels: {
    singular: { ar: "مستخدم", en: "User" },
    plural: { ar: "المستخدمون", en: "Users" },
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: { ar: "الاسم", en: "Name" },
    },
    {
      name: "role",
      type: "select",
      label: { ar: "الصلاحية", en: "Role" },
      defaultValue: "editor",
      options: [
        { label: { ar: "مدير عام", en: "Admin" }, value: "admin" },
        { label: { ar: "محرر", en: "Editor" }, value: "editor" },
      ],
      required: true,
    },
  ],
}
