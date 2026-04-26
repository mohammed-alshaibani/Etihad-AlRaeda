import type { GlobalConfig } from "payload"

export const PaymentGateways: GlobalConfig = {
    slug: "payment-gateways",
    label: {
        en: "Payment Gateways",
        ar: "بوابات الدفع",
    },
    access: {
        read: () => true,
        update: ({ req: { user } }) => Boolean(user && user.role === "superadmin"),
    },
    fields: [
        {
            name: "activeGateway",
            type: "select",
            label: {
                en: "Active Payment Gateway",
                ar: "بوابة الدفع المفعلة",
            },
            options: [
                { label: "Bank Transfer Only (تحويل بنكي)", value: "bank-transfer" },
                { label: "Moyasar (مُيسّر)", value: "moyasar" },
                { label: "Stripe (سترايب)", value: "stripe" },
            ],
            defaultValue: "bank-transfer",
            required: true,
        },
        {
            name: "moyasar",
            label: "Moyasar API Keys",
            type: "group",
            admin: {
                condition: (_, siblingData) => siblingData.activeGateway === "moyasar",
            },
            fields: [
                {
                    name: "publishableKey",
                    type: "text",
                    required: true,
                },
                {
                    name: "secretKey",
                    type: "text",
                    required: true,
                },
            ],
        },
        {
            name: "stripe",
            label: "Stripe API Keys",
            type: "group",
            admin: {
                condition: (_, siblingData) => siblingData.activeGateway === "stripe",
            },
            fields: [
                {
                    name: "publishableKey",
                    type: "text",
                    required: true,
                },
                {
                    name: "secretKey",
                    type: "text",
                    required: true,
                },
            ],
        },
        {
            name: "bankTransfer",
            label: "Bank Transfer Details (تفاصيل الحساب البنكي)",
            type: "group",
            fields: [
                {
                    name: "bankName",
                    type: "text",
                    required: true,
                    defaultValue: "Bank Al Rajhi",
                },
                {
                    name: "accountName",
                    type: "text",
                    required: true,
                },
                {
                    name: "iban",
                    type: "text",
                    required: true,
                },
            ],
        },
    ],
}
