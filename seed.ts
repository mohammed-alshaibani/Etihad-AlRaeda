import { getPayload } from "payload"
import config from "@payload-config"

async function run() {
    const payload = await getPayload({ config })

    console.log("Seeding Database...")

    // 0. Create Superadmin User
    await payload.create({
        collection: "users",
        data: {
            email: "admin@marassi.sa",
            password: "123",
            roles: ["superadmin"],
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

    // 4. Create a Post
    await payload.create({
        collection: "posts",
        data: {
            title: "مستقبل العمل المرن ورؤية 2030",
            slug: "future-of-flexible-work",
            status: "published",
            excerpt: "كيف تعيد رؤية المملكة 2030 تشكيل مساحات العمل للشركات الرائدة.",
            readingTime: 5,
            category: "strategy",
            "title.ar": "مستقبل العمل المرن ورؤية 2030",
            "title.en": "The Future of Flexible Work and Vision 2030"
        } as any,
    })

    // 5. Update Site Settings
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

    console.log("Seeding Complete!")
    process.exit(0)
}

run().catch((e) => {
    console.error(e)
    process.exit(1)
})
