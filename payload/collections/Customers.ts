import type { CollectionConfig } from "payload"

export const Customers: CollectionConfig = {
    slug: "customers",
    auth: true,
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
        create: () => true,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: { ar: "الملف الشخصي", en: "Profile" },
                    fields: [
                        {
                            type: "row",
                            fields: [
                                { name: "firstName", type: "text", label: { ar: "الاسم الأول", en: "First Name" }, admin: { width: "50%" } },
                                { name: "lastName", type: "text", label: { ar: "اسم العائلة", en: "Last Name" }, admin: { width: "50%" } },
                            ],
                        },
                        {
                            type: "row",
                            fields: [
                                { name: "phone", type: "text", label: { ar: "رقم الجوال", en: "Phone" }, admin: { width: "50%" } },
                                { name: "dateOfBirth", type: "date", label: { ar: "تاريخ الميلاد", en: "Date of Birth" }, admin: { width: "50%" } },
                            ],
                        },
                        {
                            type: "row",
                            fields: [
                                { name: "companyName", type: "text", label: { ar: "اسم الشركة", en: "Company" }, admin: { width: "50%" } },
                                { name: "vatNumber", type: "text", label: { ar: "الرقم الضريبي", en: "VAT Number" }, admin: { width: "50%" } },
                            ],
                        },
                    ],
                },
                {
                    label: { ar: "العناوين", en: "Addresses" },
                    fields: [
                        {
                            name: "addresses",
                            type: "array",
                            label: { ar: "العناوين المحفوظة", en: "Saved Addresses" },
                            admin: {
                                initCollapsed: true,
                            },
                            fields: [
                                {
                                    type: "row",
                                    fields: [
                                        { name: "label", type: "text", label: { ar: "تسمية العنوان", en: "Label" }, defaultValue: "Home", admin: { width: "50%" } },
                                        { name: "street", type: "text", label: { ar: "الشارع", en: "Street" }, admin: { width: "50%" } },
                                    ],
                                },
                                {
                                    type: "row",
                                    fields: [
                                        { name: "city", type: "text", label: { ar: "المدينة", en: "City" }, admin: { width: "50%" } },
                                        { name: "country", type: "text", defaultValue: "Saudi Arabia", label: { ar: "الدولة", en: "Country" }, admin: { width: "50%" } },
                                    ],
                                },
                                { name: "isDefault", type: "checkbox", defaultValue: false, label: { ar: "العنوان الافتراضي", en: "Default Address" } },
                            ],
                        },
                    ],
                },
                {
                    label: { ar: "التفضيلات", en: "Preferences" },
                    fields: [
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
                },
            ],
        },
    ],
}
