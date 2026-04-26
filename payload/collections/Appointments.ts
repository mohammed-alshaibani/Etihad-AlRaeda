import type { CollectionConfig } from "payload"

export const Appointments: CollectionConfig = {
  slug: "appointments",
  admin: {
    useAsTitle: "contactName",
    defaultColumns: ["contactName", "company", "preferredDate", "meetingType", "status"],
    group: "الطلبات والعملاء المحتملون",
    components: {
      views: {
        list: { Component: "@/payload/components/CollectionListView" },
      },
    },
  },
  labels: {
    singular: { ar: "موعد", en: "Appointment" },
    plural: { ar: "المواعيد والاجتماعات", en: "Appointments" },
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: "contactName", type: "text", required: true, label: { ar: "الاسم", en: "Name" } },
    { name: "company", type: "text", label: { ar: "الشركة", en: "Company" } },
    { name: "email", type: "email", required: true, label: { ar: "البريد الإلكتروني", en: "Email" } },
    { name: "phone", type: "text", label: { ar: "الهاتف", en: "Phone" } },
    {
      name: "meetingType",
      type: "select",
      label: { ar: "نوع الاجتماع", en: "Meeting Type" },
      options: [
        { label: { ar: "مكالمة فيديو", en: "Video Call" }, value: "video" },
        { label: { ar: "مكالمة هاتفية", en: "Phone Call" }, value: "phone" },
        { label: { ar: "اجتماع في المقر", en: "In-person" }, value: "inperson" },
      ],
      defaultValue: "video",
    },
    { name: "topic", type: "text", label: { ar: "موضوع الاجتماع", en: "Topic" } },
    { name: "preferredDate", type: "date", label: { ar: "التاريخ المفضّل", en: "Preferred Date" } },
    { name: "preferredTime", type: "text", label: { ar: "الوقت المفضّل", en: "Preferred Time" } },
    { name: "notes", type: "textarea", label: { ar: "ملاحظات", en: "Notes" } },
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      label: { ar: "الحالة", en: "Status" },
      options: [
        { label: { ar: "بانتظار التأكيد", en: "Pending" }, value: "pending" },
        { label: { ar: "مؤكّد", en: "Confirmed" }, value: "confirmed" },
        { label: { ar: "مكتمل", en: "Completed" }, value: "completed" },
        { label: { ar: "ملغى", en: "Cancelled" }, value: "cancelled" },
      ],
    },
  ],
}
