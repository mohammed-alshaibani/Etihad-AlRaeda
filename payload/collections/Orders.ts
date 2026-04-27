import type { CollectionConfig } from "payload"

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "orderNumber",
    defaultColumns: ["orderNumber", "customerName", "total", "paymentStatus", "status", "createdAt"],
    group: "المتجر",
  },
  labels: {
    singular: { ar: "طلب شراء", en: "Order" },
    plural: { ar: "الطلبات", en: "Orders" },
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
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
    beforeChange: [
      ({ data }) => {
        // Auto-calculate totals
        if (data?.items && Array.isArray(data.items)) {
          let subtotal = 0
          data.items = data.items.map((item: any) => {
            const itemSubtotal = (item.unitPrice || 0) * (item.quantity || 1)
            item.subtotal = itemSubtotal
            subtotal += itemSubtotal
            return item
          })
          const discount = data.discountAmount || 0
          const shipping = data.shippingCost || 0
          data.subtotal = subtotal
          data.vatAmount = Math.round((subtotal - discount) * 0.15 * 100) / 100
          data.total = Math.round((subtotal - discount + shipping + data.vatAmount) * 100) / 100
        }
        return data
      },
    ],
  },
  fields: [
    // ─── Order Identity ────────────────────────────────────────────────────
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
      label: { ar: "حالة الطلب", en: "Order Status" },
      options: [
        { label: { ar: "قيد المراجعة", en: "Pending" }, value: "pending" },
        { label: { ar: "مؤكد", en: "Confirmed" }, value: "confirmed" },
        { label: { ar: "قيد التنفيذ", en: "Processing" }, value: "processing" },
        { label: { ar: "تم الشحن", en: "Shipped" }, value: "shipped" },
        { label: { ar: "مكتمل", en: "Completed" }, value: "completed" },
        { label: { ar: "ملغي", en: "Cancelled" }, value: "cancelled" },
        { label: { ar: "مسترد", en: "Refunded" }, value: "refunded" },
      ],
    },
    {
      name: "paymentStatus",
      type: "select",
      defaultValue: "unpaid",
      required: true,
      label: { ar: "حالة الدفع", en: "Payment Status" },
      options: [
        { label: { ar: "غير مدفوع", en: "Unpaid" }, value: "unpaid" },
        { label: { ar: "مدفوع", en: "Paid" }, value: "paid" },
        { label: { ar: "مسترد جزئياً", en: "Partially Refunded" }, value: "partially_refunded" },
        { label: { ar: "مسترد بالكامل", en: "Refunded" }, value: "refunded" },
      ],
    },
    // ─── Customer ──────────────────────────────────────────────────────────
    {
      name: "customer",
      type: "relationship",
      relationTo: "customers",
      label: { ar: "حساب العميل", en: "Customer Account" },
      admin: { description: "فارغ للطلبات بدون تسجيل (Guest Checkout)" },
    },
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
    // ─── Addresses ────────────────────────────────────────────────────────
    {
      name: "shippingAddress",
      type: "group",
      label: { ar: "عنوان الشحن", en: "Shipping Address" },
      fields: [
        { name: "street", type: "text", label: { ar: "الشارع", en: "Street" } },
        { name: "district", type: "text", label: { ar: "الحي", en: "District" } },
        { name: "city", type: "text", label: { ar: "المدينة", en: "City" } },
        {
          name: "region",
          type: "select",
          label: { ar: "المنطقة", en: "Region" },
          options: [
            "الرياض", "مكة المكرمة", "المدينة المنورة", "القصيم", "المنطقة الشرقية",
            "عسير", "تبوك", "حائل", "الحدود الشمالية", "جازان", "نجران", "الباحة", "الجوف",
          ],
        },
        { name: "zipCode", type: "text", label: { ar: "الرمز البريدي", en: "Zip Code" } },
        { name: "country", type: "text", defaultValue: "Saudi Arabia", label: { ar: "الدولة", en: "Country" } },
      ],
    },
    {
      name: "billingAddress",
      type: "group",
      label: { ar: "عنوان الفوترة", en: "Billing Address" },
      fields: [
        { name: "sameAsShipping", type: "checkbox", defaultValue: true, label: { ar: "نفس عنوان الشحن", en: "Same as Shipping" } },
        { name: "street", type: "text", label: { ar: "الشارع", en: "Street" }, admin: { condition: (data) => !data?.billingAddress?.sameAsShipping } },
        { name: "city", type: "text", label: { ar: "المدينة", en: "City" }, admin: { condition: (data) => !data?.billingAddress?.sameAsShipping } },
        { name: "country", type: "text", label: { ar: "الدولة", en: "Country" }, admin: { condition: (data) => !data?.billingAddress?.sameAsShipping } },
      ],
    },
    // ─── Order Items ───────────────────────────────────────────────────────
    {
      name: "items",
      type: "array",
      required: true,
      label: { ar: "المنتجات المطلوبة", en: "Order Items" },
      fields: [
        { name: "product", type: "relationship", relationTo: "products", required: true, label: { ar: "المنتج", en: "Product" } },
        { name: "productName", type: "text", label: { ar: "اسم المنتج (وقت الشراء)", en: "Product Name (at purchase)" } },
        { name: "variantLabel", type: "text", label: { ar: "المتغير المختار (مثال: أحمر / L)", en: "Selected Variant" } },
        { name: "quantity", type: "number", required: true, defaultValue: 1, min: 1, label: { ar: "الكمية", en: "Quantity" } },
        { name: "unitPrice", type: "number", required: true, label: { ar: "سعر الوحدة", en: "Unit Price" } },
        { name: "subtotal", type: "number", label: { ar: "المجموع الفرعي", en: "Subtotal" }, admin: { readOnly: true } },
      ],
    },
    // ─── Financials ───────────────────────────────────────────────────────
    {
      name: "coupon",
      type: "relationship",
      relationTo: "coupons",
      label: { ar: "كوبون الخصم", en: "Coupon Applied" },
    },
    {
      name: "discountAmount",
      type: "number",
      defaultValue: 0,
      label: { ar: "قيمة الخصم (SAR)", en: "Discount Amount (SAR)" },
    },
    {
      name: "shippingCost",
      type: "number",
      defaultValue: 0,
      label: { ar: "تكلفة الشحن (SAR)", en: "Shipping Cost (SAR)" },
    },
    {
      name: "subtotal",
      type: "number",
      label: { ar: "المجموع قبل الضريبة", en: "Subtotal (before VAT)" },
      admin: { readOnly: true },
    },
    {
      name: "vatAmount",
      type: "number",
      label: { ar: "ضريبة القيمة المضافة (15%)", en: "VAT Amount (15%)" },
      admin: { readOnly: true },
    },
    {
      name: "total",
      type: "number",
      required: true,
      label: { ar: "الإجمالي الكلي", en: "Grand Total" },
      admin: { readOnly: true },
    },
    {
      name: "currency",
      type: "select",
      defaultValue: "SAR",
      options: ["SAR", "USD", "AED"],
      label: { ar: "العملة", en: "Currency" },
    },
    // ─── Payment ──────────────────────────────────────────────────────────
    {
      name: "paymentMethod",
      type: "select",
      label: { ar: "طريقة الدفع", en: "Payment Method" },
      options: [
        { label: "تحويل بنكي (Bank Transfer)", value: "bank-transfer" },
        { label: "Moyasar", value: "moyasar" },
        { label: "مدى (Mada)", value: "mada" },
        { label: "Visa / Mastercard", value: "card" },
        { label: "Apple Pay", value: "apple-pay" },
        { label: "STC Pay", value: "stc-pay" },
      ],
      defaultValue: "bank-transfer",
    },
    {
      name: "paymentGatewayId",
      type: "text",
      label: { ar: "معرّف عملية الدفع", en: "Payment Gateway Transaction ID" },
      admin: { readOnly: true, description: "يُعبّأ تلقائياً من Moyasar Webhook" },
    },
    {
      name: "paymentReference",
      type: "text",
      label: { ar: "مرجع الدفع (تحويل بنكي)", en: "Payment Reference" },
    },
    {
      name: "paidAt",
      type: "date",
      label: { ar: "تاريخ الدفع", en: "Paid At" },
      admin: { readOnly: true },
    },
    // ─── Shipping ─────────────────────────────────────────────────────────
    {
      name: "shippingCarrier",
      type: "select",
      label: { ar: "شركة الشحن", en: "Shipping Carrier" },
      options: [
        { label: "Aramex", value: "aramex" },
        { label: "SMSA Express", value: "smsa" },
        { label: { ar: "توصيل ذاتي", en: "Self Delivery" }, value: "self" },
      ],
    },
    {
      name: "trackingNumber",
      type: "text",
      label: { ar: "رقم التتبع", en: "Tracking Number" },
    },
    {
      name: "awbDocument",
      type: "upload",
      relationTo: "media",
      label: { ar: "وثيقة الشحن (AWB)", en: "AWB Document" },
    },
    // ─── Returns ──────────────────────────────────────────────────────────
    {
      name: "returnStatus",
      type: "select",
      defaultValue: "none",
      label: { ar: "حالة الإرجاع", en: "Return Status" },
      options: [
        { label: { ar: "لا يوجد", en: "None" }, value: "none" },
        { label: { ar: "طلب إرجاع", en: "Return Requested" }, value: "requested" },
        { label: { ar: "موافقة على الإرجاع", en: "Return Approved" }, value: "approved" },
        { label: { ar: "تم الإرجاع", en: "Returned" }, value: "returned" },
        { label: { ar: "مرفوض", en: "Rejected" }, value: "rejected" },
      ],
    },
    {
      name: "notes",
      type: "textarea",
      label: { ar: "ملاحظات العميل", en: "Customer Notes" },
    },
    {
      name: "adminNotes",
      type: "textarea",
      label: { ar: "ملاحظات داخلية", en: "Internal Notes" },
    },
  ],
  timestamps: true,
}
