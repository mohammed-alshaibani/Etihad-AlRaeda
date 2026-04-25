import type { CollectionConfig } from "payload"

export const ContactMessages: CollectionConfig = {
  slug: "contact-messages",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "subject", "status", "createdAt"],
    group: "الطلبات والعملاء المحتملون",
  },
  labels: {
    singular: { ar: "رسالة", en: "Message" },
    plural: { ar: "رسائل التواصل", en: "Contact Messages" },
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: "name", type: "text", required: true, label: { ar: "الاسم", en: "Name" } },
    { name: "email", type: "email", required: true, label: { ar: "البريد الإلكتروني", en: "Email" } },
    { name: "phone", type: "text", label: { ar: "الهاتف", en: "Phone" } },
    { name: "company", type: "text", label: { ar: "الشركة", en: "Company" } },
    { name: "subject", type: "text", label: { ar: "الموضوع", en: "Subject" } },
    { name: "message", type: "textarea", required: true, label: { ar: "الرسالة", en: "Message" } },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      label: { ar: "الحالة", en: "Status" },
      options: [
        { label: { ar: "جديد", en: "New" }, value: "new" },
        { label: { ar: "تم الرد", en: "Replied" }, value: "replied" },
        { label: { ar: "مغلق", en: "Closed" }, value: "closed" },
      ],
    },
  ],
}
