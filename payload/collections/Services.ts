import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "order", "isFeatured", "updatedAt"],
    group: "المحتوى",
  },
  labels: {
    singular: { ar: "خدمة", en: "Service" },
    plural: { ar: "الخدمات", en: "Services" },
  },
  access: { read: () => true },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === "create" && data?.title && !data?.slug) {
          data.slug = toSlug(typeof data.title === "object" ? (data.title.ar || data.title.en || "") : data.title)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      label: { ar: "اسم الخدمة", en: "Service Name" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: { ar: "المعرّف (Slug)", en: "Slug" },
      admin: { description: "يستخدم في رابط الصفحة" },
    },
    {
      name: "icon",
      type: "select",
      label: { ar: "الأيقونة", en: "Icon" },
      options: [
        "Briefcase",
        "TrendingUp",
        "Shield",
        "Users",
        "Target",
        "Building2",
        "LineChart",
        "Scale",
        "Layers",
        "Zap",
      ],
      defaultValue: "Briefcase",
    },
    {
      name: "shortDescription",
      type: "textarea",
      localized: true,
      label: { ar: "وصف مختصر", en: "Short Description" },
    },
    {
      name: "description",
      type: "richText",
      localized: true,
      editor: lexicalEditor({}),
      label: { ar: "الوصف التفصيلي", en: "Full Description" },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: { ar: "الصورة الرئيسية", en: "Cover Image" },
    },
    {
      name: "benefits",
      type: "array",
      localized: true,
      label: { ar: "الفوائد", en: "Benefits" },
      fields: [
        { name: "title", type: "text", required: true, label: { ar: "العنوان", en: "Title" } },
        { name: "description", type: "textarea", label: { ar: "الوصف", en: "Description" } },
      ],
    },
    {
      name: "deliverables",
      type: "array",
      localized: true,
      label: { ar: "المخرجات", en: "Deliverables" },
      fields: [{ name: "item", type: "text", required: true, label: { ar: "العنصر", en: "Item" } }],
    },
    {
      name: "process",
      type: "array",
      localized: true,
      label: { ar: "مراحل العمل", en: "Process Steps" },
      fields: [
        { name: "title", type: "text", required: true, label: { ar: "المرحلة", en: "Step" } },
        { name: "description", type: "textarea", label: { ar: "الوصف", en: "Description" } },
      ],
    },
    {
      name: "startingPrice",
      type: "text",
      label: { ar: "السعر يبدأ من", en: "Starting Price" },
      admin: { description: 'مثال: "15,000 ر.س"' },
    },
    {
      name: "inventory",
      type: "number",
      label: { ar: "المخزون / السعة المتاحة", en: "Inventory / Capacity" },
      admin: { description: "اتركه فارغاً للسعة غير المحدودة" },
    },
    {
      name: "outOfStock",
      type: "checkbox",
      defaultValue: false,
      label: { ar: "نفذت الكمية", en: "Out of Stock" },
    },
    {
      name: "gallery",
      type: "array",
      label: { ar: "معرض الصور", en: "Image Gallery" },
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
    {
      name: "duration",

      type: "text",
      localized: true,
      label: { ar: "المدة المتوقعة", en: "Duration" },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      label: { ar: "الترتيب", en: "Order" },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      label: { ar: "مميز في الصفحة الرئيسية", en: "Featured on Homepage" },
    },
    {
      name: "seo",
      type: "group",
      label: { ar: "تحسين محركات البحث", en: "SEO" },
      fields: [
        { name: "metaTitle", type: "text", localized: true, label: { ar: "عنوان الصفحة", en: "Meta Title" } },
        {
          name: "metaDescription",
          type: "textarea",
          localized: true,
          label: { ar: "وصف الصفحة", en: "Meta Description" },
        },
      ],
    },
  ],
}
