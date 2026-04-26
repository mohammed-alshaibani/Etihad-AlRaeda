import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get("q")

    if (!q || q.length < 2) {
      return NextResponse.json({ products: [], posts: [] })
    }

    const payload = await getPayload({ config })

    // Query Products
    const productsRes = await payload.find({
      collection: "products",
      where: {
        or: [
          { title: { like: q } },
          { "title.ar": { like: q } },
          { "title.en": { like: q } },
        ],
      },
      limit: 5,
    })

    // Query Posts
    const postsRes = await payload.find({
      collection: "posts",
      where: {
        and: [
          { status: { equals: "published" } },
          {
            or: [
              { title: { like: q } },
              { "title.ar": { like: q } },
              { "title.en": { like: q } },
            ],
          },
        ]
      },
      limit: 5,
    })

    const results = {
      products: productsRes.docs.map((p) => ({
        id: p.id,
        title: typeof p.title === "object" ? p.title?.ar || p.title?.en : p.title,
        slug: p.slug,
        type: "product",
      })),
      posts: postsRes.docs.map((p) => ({
        id: p.id,
        title: typeof p.title === "object" ? p.title?.ar || p.title?.en : p.title,
        slug: p.slug,
        type: "post",
      })),
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Search API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
