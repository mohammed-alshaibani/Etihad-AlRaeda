import type { CollectionConfig } from "payload"

export const FAQs: CollectionConfig = {
  slug: "faqs",
  admin: { useAsTitle: "question", defaultColumns: ["question", "category", "order"], group: "المحتوى" },
  labels: {
    singular: { ar: "سؤال شائع", en: "FAQ" },
    plural: { ar: "الأسئلة الشائعة", en: "FAQs" },
  },
  access: { read: () => true },
  fields: [
    { name: "question", type: "text", required: true, localized: true, label: { ar: "السؤال", en: "Question" } },
    { name: "answer", type: "textarea", required: true, localized: true, label: { ar: "الإجابة", en: "Answer" } },
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
    { name: "order", type: "number", defaultValue: 0, label: { ar: "الترتيب", en: "Order" } },
    { name: "showOnHome", type: "checkbox", defaultValue: false, label: { ar: "عرض في الرئيسية", en: "Show on Home" } },
  ],
}
