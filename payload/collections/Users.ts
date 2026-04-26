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
    singular: { ar: "مستخدم", en: "User" },
    plural: { ar: "المستخدمون", en: "Users" },
  },
  access: {
    // Only superadmin can read all users; others only themselves
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === "superadmin") return true
      return { id: { equals: user.id } }
    },
    create: () => true,
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === "superadmin") return true
      return { id: { equals: user.id } }
    },
    delete: ({ req: { user } }) => user?.role === "superadmin",
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
      defaultValue: "content-editor",
      required: true,
      options: [
        { label: { ar: "مدير عام", en: "Superadmin" }, value: "superadmin" },
        { label: { ar: "مدير مبيعات", en: "Sales Manager" }, value: "sales-manager" },
        { label: { ar: "محرر محتوى", en: "Content Editor" }, value: "content-editor" },
      ],
      admin: {
        description: "superadmin: كامل الصلاحيات | sales-manager: الطلبات والعملاء | content-editor: المحتوى فقط",
        // Only superadmin can change roles
        condition: (_, siblingData, { user }: any) => user?.role === "superadmin",
      },
    },
  ],
}
