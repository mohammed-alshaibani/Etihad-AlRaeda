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
    {
      type: "tabs",
      tabs: [
        {
          label: { ar: "المحتوى", en: "Content" },
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              localized: true,
              label: { ar: "اسم المنتج", en: "Product Name" },
            },
            {
              name: "description",
              type: "richText",
              localized: true,
              editor: lexicalEditor({}),
              label: { ar: "الوصف التفصيلي", en: "Full Description" },
            },
            {
              type: "row",
              fields: [
                {
                  name: "category",
                  type: "relationship",
                  relationTo: "categories",
                  label: { ar: "التصنيف", en: "Category" },
                  admin: { width: "50%" },
                },
                {
                  name: "brand",
                  type: "relationship",
                  relationTo: "brands",
                  label: { ar: "العلامة التجارية", en: "Brand" },
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "relatedService",
              type: "relationship",
              relationTo: "services",
              label: { ar: "الخدمة المرتبطة", en: "Related Service" },
            },
            {
              name: "tags",
              type: "array",
              label: { ar: "الوسوم", en: "Tags" },
              admin: {
                initCollapsed: true,
              },
              fields: [
                { name: "tag", type: "text", required: true, label: { ar: "وسم", en: "Tag" } },
              ],
            },
          ],
        },
        {
          label: { ar: "المخزون والتسعير", en: "Inventory & Pricing" },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "sku",
                  type: "text",
                  unique: true,
                  label: { ar: "رمز المنتج (SKU)", en: "SKU" },
                  admin: { width: "50%" },
                },
                {
                  name: "price",
                  type: "number",
                  required: true,
                  label: { ar: "السعر الحالي (SAR)", en: "Price (SAR)" },
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "compareAtPrice",
                  type: "number",
                  label: { ar: "السعر قبل الخصم (SAR)", en: "Compare At Price (SAR)" },
                  admin: { width: "50%" },
                },
                {
                  name: "inventory",
                  type: "number",
                  label: { ar: "المخزون الكلي", en: "Total Inventory" },
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "hasVariants",
                  type: "checkbox",
                  defaultValue: false,
                  label: { ar: "منتج بأحجام / ألوان متعددة", en: "Has Variants" },
                  admin: { width: "50%" },
                },
                {
                  name: "outOfStock",
                  type: "checkbox",
                  defaultValue: false,
                  label: { ar: "نفذت الكمية", en: "Out of Stock" },
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "variants",
              type: "array",
              label: { ar: "المتغيرات", en: "Variants" },
              admin: {
                condition: (data) => !!data?.hasVariants,
                initCollapsed: true,
              },
              fields: [
                { name: "name", type: "text", localized: true, required: true, label: { ar: "اسم المتغير", en: "Variant Name" } },
                {
                  type: "row",
                  fields: [
                    { name: "sku", type: "text", label: { ar: "رمز المتغير", en: "SKU" }, admin: { width: "50%" } },
                    { name: "price", type: "number", label: { ar: "السعر", en: "Price" }, admin: { width: "50%" } },
                  ],
                },
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  label: { ar: "صورة المتغير", en: "Image" },
                },
              ],
            },
          ],
        },
        {
          label: { ar: "المواصفات", en: "Technical" },
          fields: [
            {
              name: "technicalSpecs",
              type: "array",
              localized: true,
              label: { ar: "المواصفات التقنية", en: "Technical Specifications" },
              admin: {
                initCollapsed: true,
              },
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
              admin: {
                initCollapsed: true,
              },
              fields: [
                { name: "text", type: "text", required: true, label: { ar: "الميزة", en: "Feature" } },
                { name: "included", type: "checkbox", defaultValue: true, label: { ar: "مضمّن", en: "Included" } },
              ],
            },
          ],
        },
        {
          label: { ar: "الوسائط", en: "Media" },
          fields: [
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              required: true,
              label: { ar: "الصورة الرئيسية", en: "Cover Image" },
            },
            {
              name: "gallery",
              type: "array",
              label: { ar: "معرض الصور", en: "Image Gallery" },
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: { ar: "الإعدادات SEO", en: "Settings & SEO" },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "slug",
                  type: "text",
                  required: true,
                  unique: true,
                  label: { ar: "المعرّف", en: "Slug" },
                  admin: { width: "50%" },
                },
                {
                  name: "isActive",
                  type: "checkbox",
                  defaultValue: true,
                  label: { ar: "منشور", en: "Active" },
                  admin: { width: "25%", style: { alignSelf: "center" } },
                },
                {
                  name: "isFeatured",
                  type: "checkbox",
                  defaultValue: false,
                  label: { ar: "مميز", en: "Featured" },
                  admin: { width: "25%", style: { alignSelf: "center" } },
                },
              ],
            },
            {
              name: "seo",
              type: "group",
              label: { ar: "تحسين محركات البحث", en: "SEO" },
              fields: [
                { name: "metaTitle", type: "text", localized: true },
                { name: "metaDescription", type: "textarea", localized: true },
                {
                  name: "ogImage",
                  type: "upload",
                  relationTo: "media",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
