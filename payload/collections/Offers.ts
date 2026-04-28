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
    {
      type: "tabs",
      tabs: [
        {
          label: { ar: "تفاصيل العرض", en: "Offer Details" },
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              localized: true,
              label: { ar: "عنوان العرض", en: "Internal Title" },
            },
            {
              name: "headline",
              type: "text",
              localized: true,
              label: { ar: "العنوان التسويقي الرئيسي", en: "Display Headline" },
            },
            {
              name: "description",
              type: "richText",
              localized: true,
              editor: lexicalEditor({}),
              label: { ar: "وصف العرض / الباقة", en: "Full Description" },
            },
            {
              name: "includes",
              type: "array",
              localized: true,
              label: { ar: "ماذا يشمل هذا العرض؟", en: "What's Included?" },
              admin: { initCollapsed: true },
              fields: [{ name: "item", type: "text", required: true, label: { ar: "البند", en: "Feature / Item" } }],
            },
          ],
        },
        {
          label: { ar: "التسعير والوسائط", en: "Pricing & Media" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "originalPrice", type: "text", label: { ar: "السعر قبل", en: "Original Price" }, admin: { width: "33%" } },
                { name: "newPrice", type: "text", label: { ar: "السعر بعد", en: "Offer Price" }, admin: { width: "33%" } },
                { name: "discount", type: "text", label: { ar: "قيمة الخصم", en: "Discount Label" }, admin: { width: "34%" } },
              ],
            },
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              label: { ar: "صورة العرض الرئيسية", en: "Main Offer Image" },
            },
          ],
        },
        {
          label: { ar: "الإعدادات", en: "Settings" },
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
                  name: "validUntil",
                  type: "date",
                  label: { ar: "تاريخ انتهاء العرض", en: "Expiry Date" },
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "isActive",
                  type: "checkbox",
                  defaultValue: true,
                  label: { ar: "مفعّل الآن", en: "Is Active" },
                  admin: { width: "50%" },
                },
                {
                  name: "showOnHome",
                  type: "checkbox",
                  defaultValue: false,
                  label: { ar: "تثبيت في الرئيسية", en: "Pin to Home" },
                  admin: { width: "50%" },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
