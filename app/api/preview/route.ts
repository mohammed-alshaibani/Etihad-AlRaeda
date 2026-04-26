import { NextRequest, NextResponse } from "next/server"

/**
 * Draft Preview Route Handler
 * Called by Payload's "Preview" button in the admin.
 * URL pattern: /api/preview?slug=<slug>&collection=<collection>&secret=<PAYLOAD_SECRET>
 */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const secret = searchParams.get("secret")
    const slug = searchParams.get("slug")
    const collection = searchParams.get("collection")

    // Validate secret
    if (secret !== process.env.PAYLOAD_SECRET) {
        return NextResponse.json({ message: "Invalid preview secret" }, { status: 401 })
    }

    if (!slug || !collection) {
        return NextResponse.json({ message: "Missing slug or collection param" }, { status: 400 })
    }

    // Map collection slug to frontend route
    const routeMap: Record<string, string> = {
        posts: `/blog/${slug}`,
        "dynamic-pages": `/pages/${slug}`,
        services: `/services/${slug}`,
        products: `/shop/${slug}`,
    }

    const path = routeMap[collection]
    if (!path) {
        return NextResponse.json({ message: `No preview route for collection: ${collection}` }, { status: 400 })
    }

    // Enable draft mode and redirect to preview
    const response = NextResponse.redirect(new URL(path, req.url))

    // Set a preview cookie for the frontend to detect draft mode
    response.cookies.set("payload-preview", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60, // 1 hour
        path: "/",
    })

    return response
}

/** Exit preview mode */
export async function DELETE(req: NextRequest) {
    const response = NextResponse.json({ message: "Preview mode disabled" })
    response.cookies.delete("payload-preview")
    return response
}
