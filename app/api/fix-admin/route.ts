import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

export async function GET() {
    const payload = await getPayload({ config })

    try {
        const result = await payload.update({
            collection: "users",
            where: {
                email: {
                    equals: "admin@admin.com",
                },
            },
            data: {
                role: "superadmin",
            },
            overrideAccess: true,
        })

        return NextResponse.json({ success: true, result: result.docs[0] })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
