import type { CollectionConfig } from "payload"

export const Appointments: CollectionConfig = {
  slug: "appointments",
  admin: {
    useAsTitle: "contactName",
    defaultColumns: ["contactName", "company", "preferredDate", "meetingType", "status"],
    group: "الطلبات والعملاء المحتملون",
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
    {
      type: "tabs",
      tabs: [
        {
          label: { ar: "بيانات التواصل", en: "Contact Info" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "contactName", type: "text", required: true, label: { ar: "إسم المتصل", en: "Full Name" }, admin: { width: "50%" } },
                { name: "email", type: "email", required: true, label: { ar: "البريد الإلكتروني", en: "Email" }, admin: { width: "50%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "phone", type: "text", label: { ar: "رقم الجوال", en: "Phone" }, admin: { width: "50%" } },
                { name: "company", type: "text", label: { ar: "الشركة / الجهة", en: "Organization" }, admin: { width: "50%" } },
              ],
            },
          ],
        },
        {
          label: { ar: "تفاصيل الموعد", en: "Meeting Details" },
          fields: [
            { name: "topic", type: "text", label: { ar: "موضوع الاجتماع", en: "Topic / Agenda" } },
            {
              type: "row",
              fields: [
                {
                  name: "meetingType",
                  type: "select",
                  label: { ar: "نوع المقابلة", en: "Meeting Style" },
                  admin: { width: "50%" },
                  options: [
                    { label: { ar: "مكالمة فيديو (أونلاين)", en: "Video Conference" }, value: "video" },
                    { label: { ar: "مكالمة هاتفية", en: "Standard Phone Call" }, value: "phone" },
                    { label: { ar: "حضوري في المقر", en: "In-Office Meeting" }, value: "inperson" },
                  ],
                  defaultValue: "video",
                },
                {
                  name: "status",
                  type: "select",
                  defaultValue: "pending",
                  label: { ar: "حالة الموعد", en: "Status" },
                  admin: { width: "50%" },
                  options: [
                    { label: { ar: "بانتظار المراجعة", en: "Pending Approval" }, value: "pending" },
                    { label: { ar: "تم التأكيد", en: "Confirmed" }, value: "confirmed" },
                    { label: { ar: "تمت المقابلة", en: "Completed" }, value: "completed" },
                    { label: { ar: "ملغى / معتذر", en: "Cancelled" }, value: "cancelled" },
                  ],
                },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "preferredDate", type: "date", label: { ar: "التاريخ المقترح", en: "Proposed Date" }, admin: { width: "50%" } },
                { name: "preferredTime", type: "text", label: { ar: "الوقت المقترح", en: "Proposed Time" }, admin: { width: "50%" } },
              ],
            },
            { name: "notes", type: "textarea", label: { ar: "ملاحظات إضافية", en: "Additional Notes" } },
          ],
        },
      ],
    },
  ],
}
