import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export async function GET() {
    try {
        const payload = await getPayload({ config })

        // 0. Create an Admin User since DB was dropped
        await payload.create({
            collection: "users",
            data: {
                email: "admin@marassi.sa",
                password: "123",
                name: "Admin Marassi",
                role: "superadmin",
            } as any,
        })

        // 1. Create a Category
        const categoryRes = await payload.create({
            collection: "categories",
            data: {
                title: "أثاث مكتبي",
                slug: "office-furniture",
                "title.ar": "أثاث مكتبي",
                "title.en": "Office Furniture"
            } as any,
        })

        // 2. Create a Brand
        const brandRes = await payload.create({
            collection: "brands",
            data: {
                name: "هيرمان ميلر",
                slug: "herman-miller",
                "name.ar": "هيرمان ميلر",
                "name.en": "Herman Miller"
            } as any,
        })

        // 3. Create Products
        await payload.create({
            collection: "products",
            data: {
                title: "كرسي أيرون",
                slug: "aeron-chair",
                sku: "HM-AERON-1",
                price: 4500,
                compareAtPrice: 5000,
                stock: 10,
                shortDescription: "كرسي أيرون الأيقوني لراحة طوال اليوم",
                category: categoryRes.id,
                brand: brandRes.id,
                "title.ar": "كرسي أيرون",
                "title.en": "Aeron Chair"
            } as any,
        })

        // 4. Update Site Settings
        await payload.updateGlobal({
            slug: "site-settings",
            data: {
                brand: {
                    companyName: "شركة مَراسي",
                    tagline: "حلول مؤسسية متكاملة"
                },
                contact: {
                    email: "demo@marassi.sa",
                    phone: "+966 50 000 0000",
                    address: "برج المملكة، طريق الملك فهد، الرياض"
                },
                social: {
                    linkedin: "https://linkedin.com",
                    twitter: "https://twitter.com"
                }
            } as any,
        })

        return NextResponse.json({ success: true, message: "Database seeded and Admin User created successfully" })
    } catch (error: any) {
        console.error("Seed API Error:", error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
