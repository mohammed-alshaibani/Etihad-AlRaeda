import type { CollectionConfig } from "payload"

export const Coupons: CollectionConfig = {
    slug: "coupons",
    admin: {
        useAsTitle: "code",
        defaultColumns: ["code", "type", "value", "usedCount", "maxUses", "isActive"],
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
            type: "tabs",
            tabs: [
                {
                    label: { ar: "بيانات الكوبون", en: "Coupon Details" },
                    fields: [
                        {
                            type: "row",
                            fields: [
                                {
                                    name: "code",
                                    type: "text",
                                    required: true,
                                    unique: true,
                                    label: { ar: "كود الخصم", en: "Code" },
                                    admin: { width: "50%", description: "أحرف كبيرة بدون مسافات (مثال: SAVE10)" },
                                },
                                {
                                    name: "type",
                                    type: "select",
                                    required: true,
                                    defaultValue: "percentage",
                                    label: { ar: "نوع الخصم", en: "Type" },
                                    admin: { width: "50%" },
                                    options: [
                                        { label: { ar: "نسبة مئوية (%)", en: "Percentage (%)" }, value: "percentage" },
                                        { label: { ar: "مبلغ ثابت (SAR)", en: "Fixed Amount (SAR)" }, value: "fixed" },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            min: 0,
                            label: { ar: "قيمة الخصم", en: "Discount Value" },
                        },
                        {
                            name: "description",
                            type: "text",
                            localized: true,
                            label: { ar: "وصف داخلي", en: "Internal Description" },
                        },
                    ],
                },
                {
                    label: { ar: "قيود الاستخدام", en: "Usage Constraints" },
                    fields: [
                        {
                            type: "row",
                            fields: [
                                {
                                    name: "minOrderAmount",
                                    type: "number",
                                    min: 0,
                                    defaultValue: 0,
                                    label: { ar: "الحد الأدنى للطلب (SAR)", en: "Min Order" },
                                    admin: { width: "50%" },
                                },
                                {
                                    name: "maxDiscountAmount",
                                    type: "number",
                                    min: 0,
                                    label: { ar: "سقف الخصم (للنسبة)", en: "Max Discount Cap" },
                                    admin: { width: "50%" },
                                },
                            ],
                        },
                        {
                            type: "row",
                            fields: [
                                {
                                    name: "maxUses",
                                    type: "number",
                                    min: 0,
                                    label: { ar: "الحد الأقصى للاستخدام", en: "Max Total Uses" },
                                    admin: { width: "50%" },
                                },
                                {
                                    name: "expiresAt",
                                    type: "date",
                                    label: { ar: "تاريخ الانتهاء", en: "Expiry Date" },
                                    admin: { width: "50%", date: { pickerAppearance: "dayAndTime" } },
                                },
                            ],
                        },
                        {
                            name: "usedCount",
                            type: "number",
                            defaultValue: 0,
                            label: { ar: "عدد مرات الاستخدام الحالية", en: "Current Usage" },
                            admin: { readOnly: true },
                        },
                        {
                            name: "isActive",
                            type: "checkbox",
                            defaultValue: true,
                            label: { ar: "مفعّل الآن", en: "Active Status" },
                            admin: { style: { marginTop: "20px" } },
                        },
                    ],
                },
            ],
        },
    ],
}
