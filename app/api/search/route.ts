import { NextResponse } from "next/server"
import { getPayloadClient } from "@/lib/payload"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q")

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    const payload = await getPayloadClient()

    const [products, services, posts] = await Promise.all([
      payload.find({
        collection: "products",
        where: { or: [{ name: { contains: query } }, { tagline: { contains: query } }] },
        limit: 5,
      }),
      payload.find({
        collection: "services",
        where: { or: [{ name: { contains: query } }, { description: { contains: query } }] },
        limit: 5,
      }),
      payload.find({
        collection: "posts",
        where: { or: [{ title: { contains: query } }, { summary: { contains: query } }] },
        limit: 5,
      }),
    ])

    const results = [
      ...products.docs.map((p: any) => ({ id: p.id, title: p.name, type: "product", href: `/shop/${p.slug}` })),
      ...services.docs.map((s: any) => ({ id: s.id, title: s.name, type: "service", href: `/services/${s.slug}` })),
      ...posts.docs.map((post: any) => ({ id: post.id, title: post.title, type: "post", href: `/blog/${post.slug}` })),
    ]

    return NextResponse.json({ results })
  } catch (err) {
    console.error("[Search] error:", err)
    return NextResponse.json({ results: [] })
  }
}
