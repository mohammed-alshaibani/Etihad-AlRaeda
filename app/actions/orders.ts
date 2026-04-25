"use server"

import { getPayloadClient } from "@/lib/payload"

export interface OrderPayload {
  customerName: string
  customerEmail: string
  customerPhone: string
  companyName: string
  vatNumber?: string
  notes?: string
  paymentMethod: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    unitPrice: number
  }>
  subtotal: number
  vatAmount: number
  total: number
  currency: string
}

export async function placeOrder(data: OrderPayload) {
  try {
    const payload = await getPayloadClient()

    const orderItems = data.items.map((item) => ({
      product: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.unitPrice * item.quantity,
    }))

    const order = await payload.create({
      collection: "orders",
      data: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        companyName: data.companyName,
        vatNumber: data.vatNumber,
        notes: data.notes,
        paymentMethod: data.paymentMethod,
        items: orderItems,
        subtotal: data.subtotal,
        vatAmount: data.vatAmount,
        total: data.total,
        currency: data.currency,
        status: "pending",
      } as any,
    })

    return { ok: true as const, orderNumber: (order as any).orderNumber }
  } catch (err) {
    console.error("[placeOrder] error:", err)
    return { ok: false as const, error: "حدث خطأ أثناء تنفيذ الطلب. يرجى المحاولة مرة أخرى." }
  }
}
