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
    {
      type: "tabs",
      tabs: [
        {
          label: { ar: "ملخص الطلب", en: "Summary" },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "orderNumber",
                  type: "text",
                  unique: true,
                  label: { ar: "رقم الطلب", en: "Order Number" },
                  admin: { readOnly: true, width: "33%" },
                },
                {
                  name: "status",
                  type: "select",
                  defaultValue: "pending",
                  required: true,
                  label: { ar: "حالة الطلب", en: "Order Status" },
                  admin: { width: "33%" },
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
                  admin: { width: "33%" },
                  options: [
                    { label: { ar: "غير مدفوع", en: "Unpaid" }, value: "unpaid" },
                    { label: { ar: "مدفوع", en: "Paid" }, value: "paid" },
                    { label: { ar: "مسترد جزئياً", en: "Partially Refunded" }, value: "partially_refunded" },
                    { label: { ar: "مسترد بالكامل", en: "Refunded" }, value: "refunded" },
                  ],
                },
              ],
            },
            {
              type: "group",
              name: "customerInfo",
              label: { ar: "بيانات العميل", en: "Customer Details" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "customerName", type: "text", required: true, label: { ar: "اسم العميل", en: "Name" }, admin: { width: "50%" } },
                    { name: "customerEmail", type: "email", required: true, label: { ar: "البريد الإلكتروني", en: "Email" }, admin: { width: "50%" } },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    { name: "customerPhone", type: "text", label: { ar: "رقم الجوال", en: "Phone" }, admin: { width: "50%" } },
                    { name: "companyName", type: "text", label: { ar: "الشركة", en: "Company" }, admin: { width: "50%" } },
                  ],
                },
              ],
            },
            {
              name: "customer",
              type: "relationship",
              relationTo: "customers",
              label: { ar: "الحساب المرتبط", en: "Linked Account" },
              admin: { description: "يُربط تلقائياً إذا كان العميل مسجلاً" },
            },
          ],
        },
        {
          label: { ar: "المنتجات", en: "Order Items" },
          fields: [
            {
              name: "items",
              type: "array",
              required: true,
              label: { ar: "قائمة المنتجات", en: "Product List" },
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "product", type: "relationship", relationTo: "products", required: true, label: { ar: "المنتج", en: "Product" }, admin: { width: "50%" } },
                    { name: "quantity", type: "number", required: true, defaultValue: 1, min: 1, label: { ar: "الكمية", en: "Qty" }, admin: { width: "50%" } },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    { name: "unitPrice", type: "number", required: true, label: { ar: "سعر الوحدة", en: "Price" }, admin: { width: "50%" } },
                    { name: "subtotal", type: "number", label: { ar: "المجموع", en: "Subtotal" }, admin: { readOnly: true, width: "50%" } },
                  ],
                },
                { name: "variantLabel", type: "text", label: { ar: "المتغير المختار", en: "Variant" } },
              ],
            },
          ],
        },
        {
          label: { ar: "البيانات المالية", en: "Financials" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "subtotal", type: "number", label: { ar: "المجموع الفرعي", en: "Subtotal" }, admin: { readOnly: true, width: "50%" } },
                { name: "vatAmount", type: "number", label: { ar: "الضريبة (15%)", en: "VAT (15%)" }, admin: { readOnly: true, width: "50%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "discountAmount", type: "number", defaultValue: 0, label: { ar: "الخصم", en: "Discount" }, admin: { width: "33%" } },
                { name: "shippingCost", type: "number", defaultValue: 0, label: { ar: "الشحن", en: "Shipping" }, admin: { width: "33%" } },
                { name: "total", type: "number", required: true, label: { ar: "الإجمالي النهائي", en: "Grand Total" }, admin: { readOnly: true, width: "33%" } },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "paymentMethod",
                  type: "select",
                  label: { ar: "طريقة الدفع", en: "Method" },
                  admin: { width: "50%" },
                  options: [
                    { label: "Bank Transfer", value: "bank-transfer" },
                    { label: "Moyasar", value: "moyasar" },
                    { label: "Apple Pay", value: "apple-pay" },
                  ],
                  defaultValue: "bank-transfer",
                },
                { name: "paidAt", type: "date", label: { ar: "تاريخ الدفع", en: "Paid At" }, admin: { readOnly: true, width: "50%" } },
              ],
            },
            { name: "paymentGatewayId", type: "text", label: { ar: "معرّف العملية", en: "Gateway ID" }, admin: { readOnly: true } },
          ],
        },
        {
          label: { ar: "العناوين", en: "Addresses" },
          fields: [
            {
              name: "shippingAddress",
              type: "group",
              label: { ar: "عنوان التوصيل", en: "Shipping Address" },
              fields: [
                { name: "street", type: "text", label: { ar: "الشارع", en: "Street" } },
                { name: "city", type: "text", label: { ar: "المدينة", en: "City" } },
                { name: "country", type: "text", defaultValue: "Saudi Arabia", label: { ar: "الدولة", en: "Country" } },
              ],
            },
          ],
        },
        {
          label: { ar: "الشحن والملاحظات", en: "Logistics & Notes" },
          fields: [
            { name: "shippingCarrier", type: "select", label: { ar: "شركة الشحن", en: "Carrier" }, options: ["aramex", "smsa", "self"] },
            { name: "trackingNumber", type: "text", label: { ar: "رقم التتبع", en: "Tracking #" } },
            { name: "notes", type: "textarea", label: { ar: "ملاحظات العميل", en: "Customer Notes" } },
            { name: "adminNotes", type: "textarea", label: { ar: "ملاحظات الإدارة", en: "Admin Notes" } },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
