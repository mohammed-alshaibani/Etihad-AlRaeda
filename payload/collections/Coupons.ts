import type { CollectionConfig } from "payload"

export const Coupons: CollectionConfig = {
    slug: "coupons",
    admin: {
        useAsTitle: "code",
        defaultColumns: ["code", "type", "value", "usedCount", "maxUses", "expiresAt", "isActive"],
        group: "المتجر",
    },
    labels: {
        singular: { ar: "كوبون خصم", en: "Coupon" },
        plural: { ar: "كوبونات الخصم", en: "Coupons" },
    },
    access: {
        read: ({ req: { user } }) => !!user,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: "code",
            type: "text",
            required: true,
            unique: true,
            label: { ar: "كود الخصم", en: "Coupon Code" },
            admin: { description: 'مثال: "SUMMER20" — لا مسافات، بالأحرف الكبيرة' },
        },
        {
            name: "description",
            type: "text",
            localized: true,
            label: { ar: "الوصف (داخلي)", en: "Description (internal)" },
        },
        {
            name: "type",
            type: "select",
            required: true,
            defaultValue: "percentage",
            label: { ar: "نوع الخصم", en: "Discount Type" },
            options: [
                { label: { ar: "نسبة مئوية (%)", en: "Percentage (%)" }, value: "percentage" },
                { label: { ar: "مبلغ ثابت (SAR)", en: "Fixed Amount (SAR)" }, value: "fixed" },
            ],
        },
        {
            name: "value",
            type: "number",
            required: true,
            min: 0,
            label: { ar: "قيمة الخصم", en: "Discount Value" },
            admin: { description: "نسبة (0–100) أو مبلغ ثابت بالريال" },
        },
        {
            name: "minOrderAmount",
            type: "number",
            min: 0,
            defaultValue: 0,
            label: { ar: "الحد الأدنى للطلب (SAR)", en: "Minimum Order Amount (SAR)" },
        },
        {
            name: "maxDiscountAmount",
            type: "number",
            min: 0,
            label: { ar: "أقصى قيمة خصم (للنسبة المئوية)", en: "Max Discount Cap (for %" },
        },
        {
            name: "maxUses",
            type: "number",
            min: 0,
            label: { ar: "الحد الأقصى للاستخدام", en: "Max Uses" },
            admin: { description: "اتركه فارغاً لاستخدام غير محدود" },
        },
        {
            name: "usedCount",
            type: "number",
            defaultValue: 0,
            label: { ar: "عدد مرات الاستخدام", en: "Times Used" },
            admin: { readOnly: true },
        },
        {
            name: "expiresAt",
            type: "date",
            label: { ar: "تاريخ الانتهاء", en: "Expiry Date" },
            admin: { date: { pickerAppearance: "dayAndTime" } },
        },
        {
            name: "isActive",
            type: "checkbox",
            defaultValue: true,
            label: { ar: "مفعّل", en: "Active" },
        },
    ],
}
