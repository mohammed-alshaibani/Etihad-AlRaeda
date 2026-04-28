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
    {
      type: "tabs",
      tabs: [
        {
          label: { ar: "بيانات المرسل", en: "Sender" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "name", type: "text", required: true, label: { ar: "الاسم", en: "Name" }, admin: { width: "50%" } },
                { name: "email", type: "email", required: true, label: { ar: "البريد الإلكتروني", en: "Email" }, admin: { width: "50%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "phone", type: "text", label: { ar: "رقم الهاتف", en: "Phone" }, admin: { width: "50%" } },
                { name: "company", type: "text", label: { ar: "اسم الشركة", en: "Company" }, admin: { width: "50%" } },
              ],
            },
          ],
        },
        {
          label: { ar: "تفاصيل الرسالة", en: "Message" },
          fields: [
            { name: "subject", type: "text", label: { ar: "الموضوع", en: "Subject" } },
            { name: "message", type: "textarea", required: true, label: { ar: "نص الرسالة", en: "Message Content" } },
            {
              name: "status",
              type: "select",
              defaultValue: "new",
              label: { ar: "حالة الرسالة", en: "Status" },
              options: [
                { label: { ar: "رسالة جديدة", en: "New" }, value: "new" },
                { label: { ar: "تم الرد عليها", en: "Replied" }, value: "replied" },
                { label: { ar: "مغلقة", en: "Closed" }, value: "closed" },
              ],
            },
          ],
        },
      ],
    },
  ],
}
