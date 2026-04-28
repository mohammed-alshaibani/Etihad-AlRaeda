import { getPayload } from "payload"
import configPromise from "../../payload.config"
import { NextResponse } from "next/server"

export async function GET() {
    const payload = await getPayload({ config: configPromise })

    try {
        const newSlide = await payload.create({
            collection: "services",
            data: {
                title: "Test Access Service",
                slug: "test-access-service-" + Date.now(),
            },
            overrideAccess: false, // Should fail if anonymous, but succeed if our map allows it for anon? No, our map requires user.
        })
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}
