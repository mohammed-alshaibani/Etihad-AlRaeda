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
    {
      type: "tabs",
      tabs: [
        {
          label: { ar: "بيانات العميل", en: "Client Profile" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "companyName", type: "text", required: true, label: { ar: "اسم الشركة / المؤسسة", en: "Company Name" }, admin: { width: "50%" } },
                { name: "contactName", type: "text", required: true, label: { ar: "اسم ممثل الجهة", en: "Contact Person" }, admin: { width: "50%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "email", type: "email", required: true, label: { ar: "البريد الإلكتروني", en: "Email Address" }, admin: { width: "50%" } },
                { name: "phone", type: "text", label: { ar: "رقم الجوال", en: "Phone Number" }, admin: { width: "50%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "jobTitle", type: "text", label: { ar: "المسمى الوظيفي", en: "Position" }, admin: { width: "33%" } },
                { name: "industry", type: "text", label: { ar: "النشاط التجاري", en: "Industry" }, admin: { width: "33%" } },
                { name: "companySize", type: "text", label: { ar: "حجم الشركة", en: "Scale" }, admin: { width: "34%" } },
              ],
            },
          ],
        },
        {
          label: { ar: "تفاصيل المشروع", en: "Project Scope" },
          fields: [
            {
              name: "services",
              type: "relationship",
              relationTo: "services",
              hasMany: true,
              label: { ar: "الخدمات المهتم بها", en: "Interested Services" },
            },
            {
              type: "row",
              fields: [
                { name: "budget", type: "text", label: { ar: "الميزانية المرصودة", en: "Budget Range" }, admin: { width: "50%" } },
                { name: "timeline", type: "text", label: { ar: "الجدول الزمني المتوقع", en: "Timeline" }, admin: { width: "50%" } },
              ],
            },
            { name: "message", type: "textarea", label: { ar: "تفاصيل ومتطلبات إضافية", en: "Additional Requirements" } },
          ],
        },
        {
          label: { ar: "المنتجات والمرفقات", en: "Items & Assets" },
          fields: [
            {
              name: "items",
              type: "array",
              label: { ar: "قائمة المنتجات المختارة", en: "Requested Products" },
              admin: { initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "product", type: "relationship", relationTo: "products", required: true, label: { ar: "المنتج", en: "Product" }, admin: { width: "50%" } },
                    { name: "quantity", type: "number", required: true, defaultValue: 1, min: 1, label: { ar: "الكمية", en: "Qty" }, admin: { width: "50%" } },
                  ],
                },
                { name: "notes", type: "text", label: { ar: "ملاحظات جانبية للمنتج", en: "Specific Item Notes" } },
              ],
            },
            {
              name: "attachments",
              type: "array",
              label: { ar: "الملفات المرفقة", en: "Supporting Documents" },
              admin: { initCollapsed: true },
              fields: [
                { name: "file", type: "upload", relationTo: "media", required: true, label: { ar: "تحميل الملف", en: "Upload File" } },
                { name: "label", type: "text", label: { ar: "تسمية للملف", en: "Document Label" } },
              ],
            },
          ],
        },
        {
          label: { ar: "الرد المالي والتقني", en: "Quotation & Workflow" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "quotedAmount", type: "number", label: { ar: "المبلغ التقريبي المعروض (SAR)", en: "Quoted Value" }, admin: { width: "50%" } },
                { name: "validUntil", type: "date", label: { ar: "تاريخ انتهاء صلاحية العرض", en: "Quote Valid Until" }, admin: { width: "50%" } },
              ],
            },
            { name: "quotePdf", type: "upload", relationTo: "media", label: { ar: "ملف عرض السعر الرسمي (PDF)", en: "Official Quote PDF" } },
            {
              name: "status",
              type: "select",
              defaultValue: "new",
              required: true,
              label: { ar: "حالة الطلب الحالية", en: "Workflow Status" },
              options: [
                { label: { ar: "بانتظار المراجعة", en: "New / Pending" }, value: "new" },
                { label: { ar: "جاري دراسة الطلب", en: "Reviewing" }, value: "under-review" },
                { label: { ar: "تم إرسال العرض", en: "Quote Sent" }, value: "sent" },
                { label: { ar: "تم القبول", en: "Order Accepted" }, value: "accepted" },
                { label: { ar: "تم الرفض", en: "Request Rejected" }, value: "rejected" },
              ],
            },
            {
              name: "convertedOrder",
              type: "relationship",
              relationTo: "orders",
              label: { ar: "الطلب المرتبط نتاج التحويل", en: "Linked Conversion Order" },
              admin: { readOnly: true },
            },
            { name: "internalNotes", type: "textarea", label: { ar: "سجل العمل الداخلي / ملاحظات", en: "Internal Admin Notes" } },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
