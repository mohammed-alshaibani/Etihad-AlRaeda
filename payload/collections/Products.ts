import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "sku", "price", "category", "brand", "isActive", "isFeatured"],
    group: "المتجر",
  },
  labels: {
    singular: { ar: "منتج", en: "Product" },
    plural: { ar: "المنتجات", en: "Products" },
  },
    access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    // ─── Core Info ────────────────────────────────────────────────────────
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      label: { ar: "اسم المنتج", en: "Product Name" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: { ar: "المعرّف", en: "Slug" },
    },
    {
      name: "sku",
      type: "text",
      unique: true,
      label: { ar: "رمز المنتج (SKU)", en: "SKU" },
      admin: { description: "رقم تعريف فريد لكل منتج في المخزون" },
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
    // ─── Classification ───────────────────────────────────────────────────
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: { ar: "التصنيف", en: "Category" },
      admin: { description: "اختر من تصنيفات المنتجات المُدارة" },
    },
    {
      name: "brand",
      type: "relationship",
      relationTo: "brands",
      label: { ar: "العلامة التجارية", en: "Brand" },
    },
    {
      name: "tags",
      type: "array",
      label: { ar: "الوسوم", en: "Tags" },
      fields: [
        { name: "tag", type: "text", required: true, label: { ar: "وسم", en: "Tag" } },
      ],
    },
    // ─── Pricing ──────────────────────────────────────────────────────────
    {
      name: "price",
      type: "number",
      required: true,
      label: { ar: "السعر الحالي (SAR)", en: "Price (SAR)" },
    },
    {
      name: "compareAtPrice",
      type: "number",
      label: { ar: "السعر قبل الخصم (SAR)", en: "Compare At Price (SAR)" },
      admin: { description: "يُستخدم لإظهار شريط 'خصم' على المنتج، يجب أن يكون أكبر من السعر الحالي" },
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
    // ─── Variants ─────────────────────────────────────────────────────────
    {
      name: "hasVariants",
      type: "checkbox",
      defaultValue: false,
      label: { ar: "منتج بأحجام / ألوان متعددة", en: "Has Variants" },
    },
    {
      name: "variants",
      type: "array",
      label: { ar: "المتغيرات (اللون، المقاس، الوزن...)", en: "Variants" },
      admin: {
        condition: (data) => !!data?.hasVariants,
        description: "أضف متغيرات المنتج مثل الألوان والمقاسات",
      },
      fields: [
        { name: "name", type: "text", localized: true, required: true, label: { ar: "اسم المتغير (مثال: أبيض L)", en: "Variant Name" } },
        { name: "sku", type: "text", label: { ar: "رمز المتغير (SKU)", en: "Variant SKU" } },
        { name: "price", type: "number", label: { ar: "سعر المتغير (إذا اختلف)", en: "Variant Price (if different)" } },
        { name: "inventory", type: "number", defaultValue: 0, label: { ar: "المخزون", en: "Inventory" } },
        { name: "image", type: "upload", relationTo: "media", label: { ar: "صورة المتغير", en: "Variant Image" } },
        {
          name: "attributes",
          type: "array",
          label: { ar: "الخصائص", en: "Attributes" },
          fields: [
            { name: "key", type: "text", required: true, label: { ar: "الخاصية (مثال: اللون)", en: "Key (e.g. Color)" } },
            { name: "value", type: "text", required: true, label: { ar: "القيمة (مثال: أحمر)", en: "Value (e.g. Red)" } },
          ],
        },
      ],
    },
    // ─── Technical Specs ──────────────────────────────────────────────────
    {
      name: "technicalSpecs",
      type: "array",
      localized: true,
      label: { ar: "المواصفات التقنية", en: "Technical Specifications" },
      fields: [
        { name: "key", type: "text", required: true, label: { ar: "الخاصية", en: "Spec Name" } },
        { name: "value", type: "text", required: true, label: { ar: "القيمة", en: "Spec Value" } },
      ],
    },
    {
      name: "features",
      type: "array",
      localized: true,
      label: { ar: "مميزات المنتج", en: "Product Features" },
      fields: [
        { name: "text", type: "text", required: true, label: { ar: "الميزة", en: "Feature" } },
        { name: "included", type: "checkbox", defaultValue: true, label: { ar: "مضمّن", en: "Included" } },
      ],
    },
    // ─── Media ────────────────────────────────────────────────────────────
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: { ar: "الصورة الرئيسية", en: "Cover Image" },
    },
    {
      name: "gallery",
      type: "array",
      label: { ar: "معرض الصور", en: "Image Gallery" },
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
    // ─── Inventory ────────────────────────────────────────────────────────
    {
      name: "inventory",
      type: "number",
      label: { ar: "المخزون الكلي", en: "Total Inventory" },
      admin: { description: "اتركه فارغاً للكمية غير المحدودة (للخدمات)" },
    },
    {
      name: "outOfStock",
      type: "checkbox",
      defaultValue: false,
      label: { ar: "نفذت الكمية", en: "Out of Stock" },
    },
    // ─── Logistics ────────────────────────────────────────────────────────
    {
      name: "weight",
      type: "number",
      label: { ar: "الوزن (كغ)", en: "Weight (kg)" },
      admin: { description: "يُستخدم لحساب تكلفة الشحن" },
    },
    {
      name: "dimensions",
      type: "group",
      label: { ar: "الأبعاد (سم)", en: "Dimensions (cm)" },
      fields: [
        { name: "length", type: "number", label: { ar: "الطول", en: "Length" } },
        { name: "width", type: "number", label: { ar: "العرض", en: "Width" } },
        { name: "height", type: "number", label: { ar: "الارتفاع", en: "Height" } },
      ],
    },
    {
      name: "deliveryDays",
      type: "number",
      label: { ar: "مدة التسليم (بالأيام)", en: "Delivery Days" },
    },
    // ─── Badges & Status ──────────────────────────────────────────────────
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
      label: { ar: "مميز في الصفحة الرئيسية", en: "Featured on Homepage" },
    },
    {
      name: "relatedService",
      type: "relationship",
      relationTo: "services",
      label: { ar: "الخدمة المرتبطة", en: "Related Service" },
    },
    // ─── SEO ──────────────────────────────────────────────────────────────
    {
      name: "seo",
      type: "group",
      label: { ar: "تحسين محركات البحث", en: "SEO" },
      fields: [
        { name: "metaTitle", type: "text", localized: true },
        { name: "metaDescription", type: "textarea", localized: true },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
  ],
}
