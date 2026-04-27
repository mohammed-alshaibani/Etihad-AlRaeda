import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    group: "الإدارة",
    defaultColumns: ["email", "name", "role", "createdAt"],
    hidden: true,
  },
  auth: true,
  labels: {
    singular: { ar: "مستخدم", en: "User" },
    plural: { ar: "المستخدمين", en: "Users" },
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
      label: { ar: "الاسم", en: "Name" },
    },
    {
      name: "role",
      type: "select",
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      required: true,
      saveToJWT: true,
      label: { ar: "الصلاحية", en: "Role" },
    },
  ],
}
