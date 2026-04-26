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
    // ─── Contact Info ──────────────────────────────────────────────────────
    { name: "companyName", type: "text", required: true, label: { ar: "اسم الشركة", en: "Company" } },
    { name: "contactName", type: "text", required: true, label: { ar: "اسم جهة الاتصال", en: "Contact Name" } },
    { name: "jobTitle", type: "text", label: { ar: "المنصب", en: "Job Title" } },
    { name: "email", type: "email", required: true, label: { ar: "البريد الإلكتروني", en: "Email" } },
    { name: "phone", type: "text", label: { ar: "الهاتف", en: "Phone" } },
    { name: "industry", type: "text", label: { ar: "القطاع", en: "Industry" } },
    { name: "companySize", type: "text", label: { ar: "حجم الشركة", en: "Company Size" } },
    // ─── Services Requested ───────────────────────────────────────────────
    {
      name: "services",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      label: { ar: "الخدمات المطلوبة", en: "Services Requested" },
    },
    // ─── Product Items (Add to Quote) ─────────────────────────────────────
    {
      name: "items",
      type: "array",
      label: { ar: "المنتجات المضافة للعرض", en: "Products Added to Quote" },
      admin: { description: "المنتجات التي أضافها العميل عبر زر 'إضافة للعرض'" },
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
          required: true,
          label: { ar: "المنتج", en: "Product" },
        },
        {
          name: "productName",
          type: "text",
          label: { ar: "اسم المنتج (وقت الطلب)", en: "Product Name (at request)" },
        },
        {
          name: "quantity",
          type: "number",
          required: true,
          defaultValue: 1,
          min: 1,
          label: { ar: "الكمية المطلوبة", en: "Requested Quantity" },
        },
        {
          name: "notes",
          type: "text",
          label: { ar: "ملاحظات خاصة بهذا المنتج", en: "Item Notes" },
        },
      ],
    },
    // ─── File Attachments ─────────────────────────────────────────────────
    {
      name: "attachments",
      type: "array",
      label: { ar: "المرفقات (PDF / Excel)", en: "Attachments (PDF / Excel)" },
      admin: { description: "يمكن للعميل رفع ملفات PDF أو Excel توضّح متطلباته" },
      fields: [
        {
          name: "file",
          type: "upload",
          relationTo: "media",
          required: true,
          label: { ar: "الملف", en: "File" },
        },
        {
          name: "label",
          type: "text",
          label: { ar: "تسمية الملف", en: "File Label" },
        },
      ],
    },
    { name: "budget", type: "text", label: { ar: "الميزانية", en: "Budget" } },
    { name: "timeline", type: "text", label: { ar: "الإطار الزمني", en: "Timeline" } },
    { name: "message", type: "textarea", label: { ar: "تفاصيل المشروع", en: "Project Details" } },
    // ─── Quote Response (Admin fills) ─────────────────────────────────────
    {
      name: "quotedAmount",
      type: "number",
      label: { ar: "المبلغ المُقتَرح (SAR)", en: "Quoted Amount (SAR)" },
      admin: { description: "يُعبّأ من قِبل فريق المبيعات بعد دراسة الطلب" },
    },
    {
      name: "quotePdf",
      type: "upload",
      relationTo: "media",
      label: { ar: "ملف عرض السعر (PDF)", en: "Quote PDF Document" },
      admin: { description: "يُرفع من قِبل الإدارة ويُرسل للعميل" },
    },
    {
      name: "validUntil",
      type: "date",
      label: { ar: "صلاحية العرض حتى", en: "Valid Until" },
    },
    // ─── Status & Workflow ────────────────────────────────────────────────
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      required: true,
      label: { ar: "الحالة", en: "Status" },
      options: [
        { label: { ar: "جديد", en: "New" }, value: "new" },
        { label: { ar: "قيد المراجعة", en: "Under Review" }, value: "under-review" },
        { label: { ar: "تم إرسال العرض", en: "Quote Sent" }, value: "sent" },
        { label: { ar: "مقبول", en: "Accepted" }, value: "accepted" },
        { label: { ar: "مرفوض", en: "Rejected" }, value: "rejected" },
        // Legacy statuses for backward compatibility
        { label: { ar: "تم التواصل", en: "Contacted" }, value: "contacted" },
        { label: { ar: "مؤهل", en: "Qualified" }, value: "qualified" },
        { label: { ar: "مكسوب", en: "Won" }, value: "won" },
        { label: { ar: "خسارة", en: "Lost" }, value: "lost" },
      ],
    },
    {
      name: "statusHistory",
      type: "array",
      label: { ar: "سجل تغييرات الحالة", en: "Status History" },
      admin: { readOnly: true, description: "يُحدَّث تلقائياً عند تغيير الحالة" },
      fields: [
        { name: "status", type: "text", label: { ar: "الحالة", en: "Status" } },
        { name: "changedAt", type: "date", label: { ar: "تاريخ التغيير", en: "Changed At" }, admin: { date: { pickerAppearance: "dayAndTime" } } },
        { name: "changedBy", type: "text", label: { ar: "بواسطة", en: "Changed By" } },
        { name: "note", type: "text", label: { ar: "ملاحظة", en: "Note" } },
      ],
    },
    // ─── Conversion ───────────────────────────────────────────────────────
    {
      name: "convertedOrder",
      type: "relationship",
      relationTo: "orders",
      label: { ar: "الطلب المُحوَّل إليه", en: "Converted to Order" },
      admin: {
        description: "يُملأ عند تحويل عرض مقبول إلى طلب شراء",
        readOnly: true,
      },
    },
    { name: "internalNotes", type: "textarea", label: { ar: "ملاحظات داخلية", en: "Internal Notes" } },
  ],
}
