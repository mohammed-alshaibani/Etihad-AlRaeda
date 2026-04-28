import type { CollectionConfig } from "payload"

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "author",
    defaultColumns: ["author", "company", "rating", "isFeatured"],
    group: "المحتوى",
  },
  labels: {
    singular: { ar: "شهادة عميل", en: "Testimonial" },
    plural: { ar: "شهادات العملاء", en: "Testimonials" },
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
          label: { ar: "بيانات العميل", en: "Author Info" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "author", type: "text", required: true, localized: true, label: { ar: "اسم العميل", en: "Name" }, admin: { width: "50%" } },
                { name: "role", type: "text", localized: true, label: { ar: "المنصب", en: "Role" }, admin: { width: "50%" } },
              ],
            },
            {
              name: "company",
              type: "text",
              localized: true,
              label: { ar: "الشركة", en: "Company" },
            },
            {
              name: "photo",
              type: "upload",
              relationTo: "media",
              label: { ar: "الصورة الرسمية", en: "Photo" },
            },
          ],
        },
        {
          label: { ar: "الشهادة", en: "Testimonial" },
          fields: [
            {
              name: "quote",
              type: "textarea",
              required: true,
              localized: true,
              label: { ar: "نص الشهادة", en: "Quote" },
            },
            {
              type: "row",
              fields: [
                {
                  name: "rating",
                  type: "number",
                  min: 1,
                  max: 5,
                  defaultValue: 5,
                  label: { ar: "التقييم (1-5)", en: "Rating" },
                  admin: { width: "50%" },
                },
                {
                  name: "isFeatured",
                  type: "checkbox",
                  defaultValue: false,
                  label: { ar: "مميز في الصفحة الرئيسية", en: "Featured" },
                  admin: { width: "50%", style: { alignSelf: "center" } },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
