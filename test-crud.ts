import { getPayload } from "payload"
import config from "./payload.config"

async function runTest() {
    console.log("🚀 Starting Payload CRUD Local API Test...\n")

    // Initialize payload without needing a running server
    const payload = await getPayload({ config })

    try {
        // 1. CREATE
        console.log("1️⃣  Creating new record...")
        const newSlide = await payload.create({
            collection: "hero-slides",
            data: {
                headline: "Test Local API Headline",
                mediaType: "image",
                isActive: true,
                order: 999,
            },
            overrideAccess: false, // Bypass access control restrictions
        })
        console.log(`✅ Success: Created record with ID [${newSlide.id}]\n`)

        // 2. READ
        console.log("2️⃣  Fetching the created record...")
        const fetchedSlide = await payload.findByID({
            collection: "hero-slides",
            id: newSlide.id,
            overrideAccess: false,
        })
        console.log(`✅ Success: Found record headline: "${fetchedSlide.headline}"\n`)

        // 3. UPDATE
        console.log("3️⃣  Updating the record...")
        const updatedSlide = await payload.update({
            collection: "hero-slides",
            id: newSlide.id,
            data: {
                headline: "Updated Local API Headline",
            },
            overrideAccess: false,
        })
        console.log(`✅ Success: Updated headline to: "${updatedSlide.headline}"\n`)

        // 4. DELETE
        console.log("4️⃣  Deleting the record...")
        const deletedSlide = await payload.delete({
            collection: "hero-slides",
            id: newSlide.id,
            overrideAccess: false,
        })

        console.log(`✅ Success: Deleted record ID [${deletedSlide.id}]\n`)

        console.log("🎉 All CRUD operations completed successfully!")
    } catch (error) {
        console.error("❌ Test Failed:", error)
    } finally {
        process.exit(0)
    }
}

runTest()
