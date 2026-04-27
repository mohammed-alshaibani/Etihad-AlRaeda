import { getPayload } from "payload"
import configPromise from "@/payload.config"
import { NextResponse } from "next/server"

export async function GET() {
    const payload = await getPayload({ config: configPromise })
    const logs: string[] = []

    try {
        // 1. CREATE
        logs.push("1️⃣  Creating new record...")
        const newSlide = await payload.create({
            collection: "hero-slides",
            data: {
                headline: "Test Local API Headline",
                mediaType: "image",
                isActive: true,
                order: 999,
            },
            overrideAccess: true,
        })
        logs.push(`✅ Success: Created record with ID [${newSlide.id}]`)

        // 2. READ
        logs.push("2️⃣  Fetching the created record...")
        const fetchedSlide = await payload.findByID({
            collection: "hero-slides",
            id: newSlide.id,
            overrideAccess: true,
        })
        logs.push(`✅ Success: Found record headline: "${fetchedSlide.headline}"`)

        // 3. UPDATE
        logs.push("3️⃣  Updating the record...")
        const updatedSlide = await payload.update({
            collection: "hero-slides",
            id: newSlide.id,
            data: {
                headline: "Updated Local API Headline",
            },
            overrideAccess: true,
        })
        logs.push(`✅ Success: Updated headline to: "${updatedSlide.headline}"`)

        // 4. DELETE
        logs.push("4️⃣  Deleting the record...")
        const deletedSlide = await payload.delete({
            collection: "hero-slides",
            id: newSlide.id,
            overrideAccess: true,
        })
        logs.push(`✅ Success: Deleted record ID [${deletedSlide.id}]`)

        logs.push("🎉 All CRUD operations completed successfully!")
        return NextResponse.json({ success: true, logs })
    } catch (error: any) {
        logs.push(`❌ Test Failed: ${error.message}`)
        return NextResponse.json({ success: false, logs }, { status: 500 })
    }
}
