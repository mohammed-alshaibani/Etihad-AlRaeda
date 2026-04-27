import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const Offers: CollectionConfig = {
  slug: "offers",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "discount", "validUntil", "isActive"],
    group: "المحتوى",
  },
  labels: {
    singular: { ar: "عرض", en: "Offer" },
    plural: { ar: "العروض والباقات", en: "Offers & Packages" },
  },
    access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true, label: { ar: "عنوان العرض", en: "Title" } },
    { name: "slug", type: "text", required: true, unique: true, label: { ar: "المعرّف", en: "Slug" } },
    { name: "headline", type: "text", localized: true, label: { ar: "العنوان الرئيسي", en: "Headline" } },
    {
      name: "description",
      type: "richText",
      localized: true,
      editor: lexicalEditor({}),
      label: { ar: "الوصف", en: "Description" },
    },
    { name: "discount", type: "text", label: { ar: "نسبة الخصم / القيمة", en: "Discount" } },
    { name: "originalPrice", type: "text", label: { ar: "السعر الأصلي", en: "Original Price" } },
    { name: "newPrice", type: "text", label: { ar: "السعر بعد الخصم", en: "New Price" } },
    {
      name: "includes",
      type: "array",
      localized: true,
      label: { ar: "ما يشمله العرض", en: "Includes" },
      fields: [{ name: "item", type: "text", required: true }],
    },
    { name: "validUntil", type: "date", label: { ar: "صالح حتى", en: "Valid Until" } },
    { name: "coverImage", type: "upload", relationTo: "media", label: { ar: "الصورة", en: "Image" } },
    { name: "isActive", type: "checkbox", defaultValue: true, label: { ar: "مفعّل", en: "Active" } },
    { name: "showOnHome", type: "checkbox", defaultValue: false, label: { ar: "عرض في الرئيسية", en: "Show on Home" } },
  ],
}
