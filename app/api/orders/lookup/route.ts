import { NextResponse } from "next/server"
import { getPayloadClient } from "@/lib/payload"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const orderNumber = searchParams.get("number")
  const email = searchParams.get("email")

  if (!orderNumber || !email) {
    return NextResponse.json({ ok: false, error: "بيانات ناقصة." }, { status: 400 })
  }

  try {
    const payload = await getPayloadClient()
    const { docs: orders } = await payload.find({
      collection: "orders",
      where: {
        and: [
          { orderNumber: { equals: orderNumber.trim() } },
          { customerEmail: { equals: email.trim().toLowerCase() } }
        ]
      },
      limit: 1,
    })

    if (orders.length === 0) {
      return NextResponse.json({ ok: false, error: "لم يتم العثور على طلب بهذه البيانات." }, { status: 404 })
    }

    return NextResponse.json({ ok: true, order: orders[0] })
  } catch (err) {
    console.error("[OrderLookup] error:", err)
    return NextResponse.json({ ok: false, error: "فشل البحث في قاعدة البيانات." }, { status: 500 })
  }
}
