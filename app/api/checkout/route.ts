import { NextResponse } from "next/server"
import { getPayloadClient } from "@/lib/payload"

export async function POST(req: Request) {
    try {
        const payload = await getPayloadClient()
        const body = await req.json()

        const {
            customerName,
            customerEmail,
            customerPhone,
            companyName,
            vatNumber,
            notes,
            paymentMethod, // requested method from client ("bank-transfer", "moyasar")
            items,
            subtotal,
            vatAmount,
            total,
            currency,
        } = body

        // 1. Fetch Dynamic Payment Gateway Settings from Payload
        const paymentSettings = await payload.findGlobal({
            slug: "payment-gateways",
        })

        const activeGateway = paymentSettings.activeGateway

        // If the system's active gateway is "bank-transfer" but user requests Moyasar... 
        // We strictly follow the *System's Active Gateway* or fail if disabled!
        if (paymentMethod !== "bank-transfer" && paymentMethod !== activeGateway && activeGateway !== "bank-transfer") {
            // Only allow bank transfers or the active digital gateway
            if (paymentMethod !== activeGateway) {
                return NextResponse.json({ error: "بوابة الدفع المطلوبة غير مفعلة حالياً." }, { status: 400 })
            }
        }

        // 2. Process Order creation in DB explicitly
        // In actual system, we would first create an unpaid order and then initiate Payment Intent.
        // For now we map it directly:
        const newOrder = await payload.create({
            collection: "orders",
            data: {
                orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
                status: "pending",
                paymentStatus: paymentMethod === "bank-transfer" ? "unpaid" : "pending",
                customerName,
                customerEmail,
                customerPhone,
                companyName,
                vatNumber,
                notes,
                subtotal,
                vatAmount,
                total,
                currency: currency || "SAR",
                items: items.map((i: any) => ({
                    product: typeof i.productId === "string" ? i.productId : i.productId.id || i.productId,
                    quantity: i.quantity,
                    price: i.unitPrice,
                }))
            }
        })

        // 3. Initiate Real Gateway (Moyasar / Stripe)
        if (paymentMethod === "moyasar" && activeGateway === "moyasar") {
            const publishableKey = paymentSettings.moyasar?.publishableKey
            if (!publishableKey) {
                return NextResponse.json({ error: "بوابة الدفع قيد الإعداد خطأ 500" }, { status: 500 })
            }

            // Here usually you return the Moyasar Payment Intent or URL.
            // For this dynamic integration, we will return the "publishableKey" securely so the client UI can trigger the Moyasar iFrame!
            return NextResponse.json({
                ok: true,
                orderNumber: newOrder.orderNumber,
                gateway: "moyasar",
                clientSecret: publishableKey, // The client SDK uses the publishable key, not the secret!
                amount: Math.round(total * 100), // Moyasar uses halalas/cents
            })
        }

        if (paymentMethod === "stripe" && activeGateway === "stripe") {
            // Similar Stripe intent logic returning client_secret
            return NextResponse.json({
                ok: true,
                orderNumber: newOrder.orderNumber,
                gateway: "stripe"
            })
        }

        // Fallback: Bank Transfer or Default
        return NextResponse.json({
            ok: true,
            orderNumber: newOrder.orderNumber,
            gateway: "bank-transfer",
            bankDetails: paymentSettings.bankTransfer
        })

    } catch (err: any) {
        console.error("أمر الدفع فشل:", err)
        return NextResponse.json({ error: err.message || "حدث خطأ غير متوقع" }, { status: 500 })
    }
}
