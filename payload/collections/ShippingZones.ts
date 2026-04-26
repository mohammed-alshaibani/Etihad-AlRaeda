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
            name: "name",
            type: "text",
            required: true,
            localized: true,
            label: { ar: "اسم منطقة الشحن", en: "Zone Name" },
        },
        {
            name: "carrier",
            type: "select",
            required: true,
            defaultValue: "aramex",
            label: { ar: "شركة الشحن", en: "Carrier" },
            options: [
                { label: "Aramex", value: "aramex" },
                { label: "SMSA Express", value: "smsa" },
                { label: { ar: "شحن ذاتي", en: "Self Delivery" }, value: "self" },
                { label: { ar: "أخرى", en: "Other" }, value: "other" },
            ],
        },
        {
            name: "regions",
            type: "select",
            hasMany: true,
            label: { ar: "المناطق المشمولة", en: "Covered Regions" },
            options: [
                "الرياض", "مكة المكرمة", "المدينة المنورة", "القصيم", "المنطقة الشرقية",
                "عسير", "تبوك", "حائل", "الحدود الشمالية", "جازان", "نجران", "الباحة", "الجوف",
            ],
        },
        {
            name: "rates",
            type: "array",
            required: true,
            label: { ar: "أسعار الشحن", en: "Shipping Rates" },
            fields: [
                { name: "label", type: "text", localized: true, label: { ar: "الوصف (مثال: شحن عادي)", en: "Label" } },
                { name: "minWeight", type: "number", defaultValue: 0, label: { ar: "الوزن الأدنى (كغ)", en: "Min Weight (kg)" } },
                { name: "maxWeight", type: "number", label: { ar: "الوزن الأقصى (كغ)", en: "Max Weight (kg)" }, admin: { description: "اتركه فارغاً لعدم التحديد" } },
                { name: "price", type: "number", required: true, label: { ar: "السعر (SAR)", en: "Price (SAR)" } },
                { name: "estimatedDays", type: "text", label: { ar: "المدة المتوقعة", en: "Estimated Days" }, admin: { description: 'مثال: "2–3 أيام عمل"' } },
            ],
        },
        {
            name: "freeShippingThreshold",
            type: "number",
            min: 0,
            label: { ar: "حد الشحن المجاني (SAR)", en: "Free Shipping Threshold (SAR)" },
            admin: { description: "اتركه فارغاً لعدم تفعيل الشحن المجاني" },
        },
        {
            name: "isActive",
            type: "checkbox",
            defaultValue: true,
            label: { ar: "مفعّل", en: "Active" },
        },
    ],
}
