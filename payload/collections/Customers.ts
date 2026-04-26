import type { CollectionConfig } from "payload"

export const Customers: CollectionConfig = {
    slug: "customers",
    auth: true, // Enables Payload built-in authentication for this collection
    admin: {
        useAsTitle: "email",
        defaultColumns: ["email", "firstName", "lastName", "phone", "createdAt"],
        group: "الطلبات والعملاء المحتملون",
    },
    labels: {
        singular: { ar: "عميل", en: "Customer" },
        plural: { ar: "العملاء", en: "Customers" },
    },
    access: {
        read: ({ req: { user } }) => !!user,
        create: () => true, // Allow public registration
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: "firstName",
            type: "text",
            label: { ar: "الاسم الأول", en: "First Name" },
        },
        {
            name: "lastName",
            type: "text",
            label: { ar: "اسم العائلة", en: "Last Name" },
        },
        {
            name: "phone",
            type: "text",
            label: { ar: "رقم الجوال", en: "Phone" },
        },
        {
            name: "dateOfBirth",
            type: "date",
            label: { ar: "تاريخ الميلاد", en: "Date of Birth" },
        },
        {
            name: "companyName",
            type: "text",
            label: { ar: "اسم الشركة", en: "Company Name" },
            admin: { description: "للعملاء من الشركات (B2B)" },
        },
        {
            name: "vatNumber",
            type: "text",
            label: { ar: "الرقم الضريبي", en: "VAT Number" },
        },
        // ─── Saved Addresses ──────────────────────────────────────────────────
        {
            name: "addresses",
            type: "array",
            label: { ar: "العناوين المحفوظة", en: "Saved Addresses" },
            fields: [
                { name: "label", type: "text", label: { ar: "تسمية العنوان (منزل، عمل...)", en: "Label" }, defaultValue: "Home" },
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
                { name: "isDefault", type: "checkbox", defaultValue: false, label: { ar: "العنوان الافتراضي", en: "Default Address" } },
            ],
        },
        // ─── Preferences ─────────────────────────────────────────────────────
        {
            name: "preferredLanguage",
            type: "select",
            defaultValue: "ar",
            label: { ar: "اللغة المفضلة", en: "Preferred Language" },
            options: [
                { label: "العربية", value: "ar" },
                { label: "English", value: "en" },
            ],
        },
        {
            name: "marketingOptIn",
            type: "checkbox",
            defaultValue: false,
            label: { ar: "القبول باستلام العروض التسويقية", en: "Marketing Opt-In" },
        },
    ],
}
