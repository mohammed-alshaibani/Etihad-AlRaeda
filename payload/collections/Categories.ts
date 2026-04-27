import type { CollectionConfig } from "payload"

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "parent", "updatedAt"],
    group: "المتجر",
  },
  labels: {
    singular: { ar: "تصنيف", en: "Category" },
    plural: { ar: "التصنيفات", en: "Categories" },
  },
    access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      label: { ar: "اسم التصنيف", en: "Category Name" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: { ar: "المعرّف", en: "Slug" },
      admin: { description: "يُستخدم في رابط الصفحة، لا تضع مسافات" },
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      label: { ar: "التصنيف الأب", en: "Parent Category" },
      admin: { description: "اتركه فارغاً إذا كان تصنيفاً رئيسياً" },
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      label: { ar: "الوصف", en: "Description" },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: { ar: "الصورة", en: "Image" },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      label: { ar: "الترتيب", en: "Display Order" },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      label: { ar: "مفعّل", en: "Active" },
    },
    {
      name: "seo",
      type: "group",
      label: { ar: "تحسين محركات البحث", en: "SEO" },
      fields: [
        { name: "metaTitle", type: "text", localized: true },
        { name: "metaDescription", type: "textarea", localized: true },
      ],
    },
  ],
}
