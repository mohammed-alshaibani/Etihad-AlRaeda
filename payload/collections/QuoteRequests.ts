import type { CollectionConfig } from "payload"

export const QuoteRequests: CollectionConfig = {
  slug: "quote-requests",
  admin: {
    useAsTitle: "companyName",
    defaultColumns: ["companyName", "contactName", "email", "status", "createdAt"],
    group: "الطلبات والعملاء المحتملون",
  },
  labels: {
    singular: { ar: "طلب عرض سعر", en: "Quote Request" },
    plural: { ar: "طلبات عروض الأسعار", en: "Quote Requests" },
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: "companyName", type: "text", required: true, label: { ar: "اسم الشركة", en: "Company" } },
    { name: "contactName", type: "text", required: true, label: { ar: "اسم جهة الاتصال", en: "Contact Name" } },
    { name: "jobTitle", type: "text", label: { ar: "المنصب", en: "Job Title" } },
    { name: "email", type: "email", required: true, label: { ar: "البريد الإلكتروني", en: "Email" } },
    { name: "phone", type: "text", label: { ar: "الهاتف", en: "Phone" } },
    { name: "industry", type: "text", label: { ar: "القطاع", en: "Industry" } },
    { name: "companySize", type: "text", label: { ar: "حجم الشركة", en: "Company Size" } },
    {
      name: "services",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      label: { ar: "الخدمات المطلوبة", en: "Services" },
    },
    { name: "budget", type: "text", label: { ar: "الميزانية", en: "Budget" } },
    { name: "timeline", type: "text", label: { ar: "الإطار الزمني", en: "Timeline" } },
    { name: "message", type: "textarea", label: { ar: "تفاصيل المشروع", en: "Project Details" } },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      label: { ar: "الحالة", en: "Status" },
      options: [
        { label: { ar: "جديد", en: "New" }, value: "new" },
        { label: { ar: "قيد المراجعة", en: "Reviewing" }, value: "reviewing" },
        { label: { ar: "تم التواصل", en: "Contacted" }, value: "contacted" },
        { label: { ar: "مؤهل", en: "Qualified" }, value: "qualified" },
        { label: { ar: "مكسوب", en: "Won" }, value: "won" },
        { label: { ar: "مرفوض", en: "Lost" }, value: "lost" },
      ],
    },
    { name: "internalNotes", type: "textarea", label: { ar: "ملاحظات داخلية", en: "Internal Notes" } },
  ],
}
