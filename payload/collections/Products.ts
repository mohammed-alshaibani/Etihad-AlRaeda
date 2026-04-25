import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "price", "currency", "category", "isActive", "isFeatured"],
    group: "المتجر",
  },
  labels: {
    singular: { ar: "منتج / باقة", en: "Product / Package" },
    plural: { ar: "المنتجات والباقات", en: "Products & Packages" },
  },
  access: { read: () => true },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      label: { ar: "اسم الباقة", en: "Package Name" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: { ar: "المعرّف", en: "Slug" },
    },
    {
      name: "tagline",
      type: "text",
      localized: true,
      label: { ar: "شعار مختصر", en: "Tagline" },
    },
    {
      name: "description",
      type: "richText",
      localized: true,
      editor: lexicalEditor({}),
      label: { ar: "الوصف التفصيلي", en: "Full Description" },
    },
    {
      name: "category",
      type: "select",
      label: { ar: "الفئة", en: "Category" },
      options: [
        { label: { ar: "استشارات", en: "Consulting" }, value: "consulting" },
        { label: { ar: "توريد", en: "Procurement" }, value: "procurement" },
        { label: { ar: "تدريب", en: "Training" }, value: "training" },
        { label: { ar: "تقنية", en: "Technology" }, value: "technology" },
        { label: { ar: "قانوني", en: "Legal" }, value: "legal" },
        { label: { ar: "أخرى", en: "Other" }, value: "other" },
      ],
    },
    {
      name: "price",
      type: "number",
      required: true,
      label: { ar: "السعر", en: "Price" },
      admin: { description: "بالريال السعودي" },
    },
    {
      name: "currency",
      type: "select",
      defaultValue: "SAR",
      options: ["SAR", "USD", "AED"],
      label: { ar: "العملة", en: "Currency" },
    },
    {
      name: "billingCycle",
      type: "select",
      label: { ar: "دورة الفوترة", en: "Billing Cycle" },
      options: [
        { label: { ar: "مرة واحدة", en: "One-time" }, value: "one-time" },
        { label: { ar: "شهري", en: "Monthly" }, value: "monthly" },
        { label: { ar: "سنوي", en: "Yearly" }, value: "yearly" },
      ],
      defaultValue: "one-time",
    },
    {
      name: "features",
      type: "array",
      localized: true,
      label: { ar: "مميزات الباقة", en: "Package Features" },
      fields: [
        { name: "text", type: "text", required: true, label: { ar: "الميزة", en: "Feature" } },
        {
          name: "included",
          type: "checkbox",
          defaultValue: true,
          label: { ar: "مضمّن", en: "Included" },
        },
      ],
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: { ar: "الصورة الرئيسية", en: "Cover Image" },
    },
    {
      name: "badge",
      type: "text",
      localized: true,
      label: { ar: "شارة (مثال: الأكثر طلباً)", en: "Badge (e.g. Most Popular)" },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      label: { ar: "منشور", en: "Active" },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      label: { ar: "مميز", en: "Featured" },
    },
    {
      name: "relatedService",
      type: "relationship",
      relationTo: "services",
      label: { ar: "الخدمة المرتبطة", en: "Related Service" },
    },
    {
      name: "deliveryDays",
      type: "number",
      label: { ar: "مدة التسليم (بالأيام)", en: "Delivery Days" },
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
