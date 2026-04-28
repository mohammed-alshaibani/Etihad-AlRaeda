import type { CollectionConfig } from "payload"

export const ShippingZones: CollectionConfig = {
    slug: "shipping-zones",
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "carrier", "isActive", "updatedAt"],
        group: "المتجر",
    },
    labels: {
        singular: { ar: "منطقة شحن", en: "Shipping Zone" },
        plural: { ar: "مناطق الشحن", en: "Shipping Zones" },
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: { ar: "تكوين المنطقة", en: "Zone Config" },
                    fields: [
                        {
                            name: "name",
                            type: "text",
                            required: true,
                            localized: true,
                            label: { ar: "اسم المنطقة", en: "Zone Name" },
                        },
                        {
                            type: "row",
                            fields: [
                                {
                                    name: "carrier",
                                    type: "select",
                                    required: true,
                                    defaultValue: "aramex",
                                    label: { ar: "شركة الشحن", en: "Carrier" },
                                    admin: { width: "50%" },
                                    options: [
                                        { label: "Aramex", value: "aramex" },
                                        { label: "SMSA Express", value: "smsa" },
                                        { label: { ar: "توصيل خاص", en: "Private Delivery" }, value: "self" },
                                        { label: { ar: "أخرى", en: "Other" }, value: "other" },
                                    ],
                                },
                                {
                                    name: "regions",
                                    type: "select",
                                    hasMany: true,
                                    label: { ar: "المناطق المدعومة", en: "Covered Regions" },
                                    admin: { width: "50%" },
                                    options: [
                                        "الرياض", "مكة المكرمة", "المدينة المنورة", "القصيم", "المنطقة الشرقية",
                                        "عسير", "تبوك", "حائل", "الحدود الشمالية", "جازان", "نجران", "الباحة", "الجوف",
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: { ar: "التسعير", en: "Pricing" },
                    fields: [
                        {
                            name: "rates",
                            type: "array",
                            required: true,
                            label: { ar: "خطة الأسعار", en: "Pricing Plan" },
                            admin: { initCollapsed: true },
                            fields: [
                                {
                                    type: "row",
                                    fields: [
                                        { name: "label", type: "text", localized: true, label: { ar: "عنوان الخطة (مثال: سريع)", en: "Rate Label" }, admin: { width: "50%" } },
                                        { name: "price", type: "number", required: true, label: { ar: "سعر الشحن (SAR)", en: "Price" }, admin: { width: "50%" } },
                                    ],
                                },
                                { name: "estimatedDays", type: "text", label: { ar: "المدة التقديرية", en: "Estimated delivery time" } },
                            ],
                        },
                        {
                            name: "freeShippingThreshold",
                            type: "number",
                            min: 0,
                            label: { ar: "حد الشحن المجاني (SAR)", en: "Free Shipping Milestone" },
                            admin: { description: "اتركه فارغاً لتعطيل الميزة" },
                        },
                    ],
                },
                {
                    label: { ar: "الإعدادات", en: "Settings" },
                    fields: [
                        {
                            name: "isActive",
                            type: "checkbox",
                            defaultValue: true,
                            label: { ar: "تنشيط هذه المنطقة", en: "Enable Zone" },
                            admin: { style: { marginTop: "20px" } },
                        },
                    ],
                },
            ],
        },
    ],
}
