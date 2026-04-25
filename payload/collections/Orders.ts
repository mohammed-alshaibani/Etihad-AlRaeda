import type { CollectionConfig } from "payload"

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "orderNumber",
    defaultColumns: ["orderNumber", "customerName", "customerEmail", "total", "status", "createdAt"],
    group: "المتجر",
  },
  labels: {
    singular: { ar: "طلب شراء", en: "Order" },
    plural: { ar: "الطلبات", en: "Orders" },
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === "create" && data && !data.orderNumber) {
          const timestamp = Date.now().toString(36).toUpperCase()
          const random = Math.random().toString(36).substring(2, 6).toUpperCase()
          data.orderNumber = `ORD-${timestamp}-${random}`
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: "orderNumber",
      type: "text",
      unique: true,
      label: { ar: "رقم الطلب", en: "Order Number" },
      admin: { readOnly: true },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      required: true,
      label: { ar: "الحالة", en: "Status" },
      options: [
        { label: { ar: "قيد المراجعة", en: "Pending" }, value: "pending" },
        { label: { ar: "مؤكد", en: "Confirmed" }, value: "confirmed" },
        { label: { ar: "قيد التنفيذ", en: "Processing" }, value: "processing" },
        { label: { ar: "مكتمل", en: "Completed" }, value: "completed" },
        { label: { ar: "ملغي", en: "Cancelled" }, value: "cancelled" },
        { label: { ar: "مسترد", en: "Refunded" }, value: "refunded" },
      ],
    },
    // Customer Info
    {
      name: "customerName",
      type: "text",
      required: true,
      label: { ar: "اسم العميل", en: "Customer Name" },
    },
    {
      name: "customerEmail",
      type: "email",
      required: true,
      label: { ar: "البريد الإلكتروني", en: "Customer Email" },
    },
    {
      name: "customerPhone",
      type: "text",
      label: { ar: "رقم الجوال", en: "Phone" },
    },
    {
      name: "companyName",
      type: "text",
      label: { ar: "اسم الشركة", en: "Company Name" },
    },
    {
      name: "vatNumber",
      type: "text",
      label: { ar: "الرقم الضريبي", en: "VAT Number" },
    },
    // Order items
    {
      name: "items",
      type: "array",
      required: true,
      label: { ar: "المنتجات المطلوبة", en: "Order Items" },
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
          label: { ar: "اسم المنتج (وقت الشراء)", en: "Product Name (at purchase)" },
        },
        {
          name: "quantity",
          type: "number",
          required: true,
          defaultValue: 1,
          min: 1,
          label: { ar: "الكمية", en: "Quantity" },
        },
        {
          name: "unitPrice",
          type: "number",
          required: true,
          label: { ar: "سعر الوحدة", en: "Unit Price" },
        },
        {
          name: "subtotal",
          type: "number",
          label: { ar: "المجموع الفرعي", en: "Subtotal" },
        },
      ],
    },
    // Financials
    {
      name: "subtotal",
      type: "number",
      label: { ar: "المجموع قبل الضريبة", en: "Subtotal (before VAT)" },
    },
    {
      name: "vatAmount",
      type: "number",
      label: { ar: "ضريبة القيمة المضافة (15%)", en: "VAT Amount (15%)" },
    },
    {
      name: "total",
      type: "number",
      required: true,
      label: { ar: "الإجمالي", en: "Total" },
    },
    {
      name: "currency",
      type: "select",
      defaultValue: "SAR",
      options: ["SAR", "USD", "AED"],
      label: { ar: "العملة", en: "Currency" },
    },
    // Payment
    {
      name: "paymentMethod",
      type: "select",
      label: { ar: "طريقة الدفع", en: "Payment Method" },
      options: [
        { label: "بنك تحويل (Bank Transfer)", value: "bank-transfer" },
        { label: "Moyasar", value: "moyasar" },
        { label: "مدى (Mada)", value: "mada" },
        { label: "Apple Pay", value: "apple-pay" },
      ],
      defaultValue: "bank-transfer",
    },
    {
      name: "paymentReference",
      type: "text",
      label: { ar: "مرجع الدفع / رقم العملية", en: "Payment Reference" },
    },
    {
      name: "notes",
      type: "textarea",
      label: { ar: "ملاحظات العميل", en: "Customer Notes" },
    },
  ],
  timestamps: true,
}
