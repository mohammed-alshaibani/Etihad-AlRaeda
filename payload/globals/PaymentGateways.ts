import type { GlobalConfig } from "payload"

export const PaymentGateways: GlobalConfig = {
    slug: "payment-gateways",
    label: { ar: "بوابات الدفع", en: "Payment Gateways" },
    admin: { group: "الإعدادات" },
    access: {
        read: () => true,
        update: ({ req: { user } }) => Boolean(user && (user.role === "admin" || user.role === "superadmin")),
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: { ar: "خيار الدفع النشط", en: "Gateway Config" },
                    fields: [
                        {
                            name: "activeGateway",
                            type: "select",
                            required: true,
                            defaultValue: "bank-transfer",
                            label: { ar: "بوابة الدفع المفعلة حالياً", en: "Active Gateway" },
                            options: [
                                { label: "Bank Transfer Only (تحويل بنكي فقط)", value: "bank-transfer" },
                                { label: "Moyasar (مُيسّر - محلي)", value: "moyasar" },
                                { label: "Stripe (سترايب - دولي)", value: "stripe" },
                            ],
                        },
                    ],
                },
                {
                    label: { ar: "مفاتيح الربط آليا", en: "Digital Keys (Moyasar/Stripe)" },
                    fields: [
                        {
                            name: "moyasar",
                            label: "Moyasar API Keys (SA)",
                            type: "group",
                            admin: { condition: (_, siblingData) => siblingData.activeGateway === "moyasar" },
                            fields: [
                                { name: "publishableKey", type: "text", required: true },
                                { name: "secretKey", type: "text", required: true },
                            ],
                        },
                        {
                            name: "stripe",
                            label: "Stripe API Keys (Global)",
                            type: "group",
                            admin: { condition: (_, siblingData) => siblingData.activeGateway === "stripe" },
                            fields: [
                                { name: "publishableKey", type: "text", required: true },
                                { name: "secretKey", type: "text", required: true },
                            ],
                        },
                    ],
                },
                {
                    label: { ar: "التحويل البنكي", en: "Bank Transfer" },
                    fields: [
                        {
                            name: "bankTransfer",
                            label: { ar: "بيانات الحساب البنكي الرسمي", en: "Official Bank Account Details" },
                            type: "group",
                            fields: [
                                {
                                    type: "row",
                                    fields: [
                                        { name: "bankName", type: "text", required: true, defaultValue: "Bank Al Rajhi", label: { ar: "اسم البنك", en: "Bank Name" }, admin: { width: "50%" } },
                                        { name: "accountName", type: "text", required: true, label: { ar: "اسم صاحب الحساب", en: "Account Holder" }, admin: { width: "50%" } },
                                    ],
                                },
                                { name: "iban", type: "text", required: true, label: { ar: "رقم الآيبان (IBAN)", en: "IBAN Number" } },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
