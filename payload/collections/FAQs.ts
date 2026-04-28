import type { CollectionConfig } from "payload"

export const FAQs: CollectionConfig = {
  slug: "faqs",
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "category", "order"],
    group: "المحتوى"
  },
  labels: {
    singular: { ar: "سؤال شائع", en: "FAQ" },
    plural: { ar: "الأسئلة الشائعة", en: "FAQs" },
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
              name: "question",
              type: "text",
              required: true,
              localized: true,
              label: { ar: "السؤال", en: "Question" },
            },
            {
              name: "answer",
              type: "textarea",
              required: true,
              localized: true,
              label: { ar: "الإجابة", en: "Answer" },
            },
          ],
        },
        {
          label: { ar: "الإعدادات", en: "Settings" },
          fields: [
            {
              name: "category",
              type: "select",
              label: { ar: "التصنيف", en: "Category" },
              options: [
                { label: { ar: "عام", en: "General" }, value: "general" },
                { label: { ar: "التسعير", en: "Pricing" }, value: "pricing" },
                { label: { ar: "الخدمات", en: "Services" }, value: "services" },
                { label: { ar: "الدفع والفوترة", en: "Payments" }, value: "payments" },
                { label: { ar: "الدعم", en: "Support" }, value: "support" },
              ],
              defaultValue: "general",
            },
            {
              type: "row",
              fields: [
                {
                  name: "order",
                  type: "number",
                  defaultValue: 0,
                  label: { ar: "الترتيب", en: "Display Order" },
                  admin: { width: "50%" },
                },
                {
                  name: "showOnHome",
                  type: "checkbox",
                  defaultValue: false,
                  label: { ar: "عرض في الرئيسية", en: "Pin to Home" },
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
