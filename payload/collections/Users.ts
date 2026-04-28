import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    group: "الإدارة",
    defaultColumns: ["email", "name", "role", "createdAt"],
  },
  auth: true,
  labels: {
    singular: { ar: "مستخدم نظام", en: "Admin User" },
    plural: { ar: "مشرفي النظام", en: "Administrators" },
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.role === "admin",
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: { ar: "الاسم الكامل", en: "Full Name" },
    },
    {
      name: "role",
      type: "select",
      defaultValue: "editor",
      options: [
        { label: "Admin (Full Access)", value: "admin" },
        { label: "Editor (Limited Content)", value: "editor" },
      ],
      required: true,
      saveToJWT: true,
      label: { ar: "صلاحية الدخول", en: "System Role" },
    },
  ],
}
