import { notFound } from "next/navigation"
import { getPayload } from "payload"
import config from "@payload-config"
import { RichText } from "@payloadcms/richtext-lexical/react"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
    const resolvedParams = await params
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
        collection: "dynamic-pages",
        where: {
            slug: { equals: resolvedParams.slug },
            status: { equals: "published" },
        },
        limit: 1,
    })

    if (!docs.length) return { title: "Page Not Found | Etihad AlRaeda" }

    const page = docs[0]

    return {
        title: page.seo?.metaTitle || `${page.title} | Etihad AlRaeda`,
        description: page.seo?.metaDescription || "",
        openGraph: {
            title: page.seo?.metaTitle || page.title,
            description: page.seo?.metaDescription || "",
            images: page.seo?.ogImage ? [page.seo.ogImage] : [],
        },
    }
}

export async function generateStaticParams() {
    try {
        const payload = await getPayload({ config })
        const { docs } = await payload.find({
            collection: "dynamic-pages",
            where: { status: { equals: "published" } },
            limit: 100,
        })

        return docs.map((doc) => ({
            slug: doc.slug,
        }))
    } catch (error) {
        console.error("Error in generateStaticParams (dynamic-pages):", error)
        return []
    }
}

export default async function DynamicPageTemplate({ params }: PageProps) {
    const resolvedParams = await params
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
        collection: "dynamic-pages",
        where: {
            slug: { equals: resolvedParams.slug },
            status: { equals: "published" },
        },
        limit: 1,
    })

    if (!docs.length) notFound()

    const page = docs[0]

    return (
        <article className="min-h-screen bg-background pb-20 pt-32">
            <div className="mx-auto max-w-4xl container-px">
                <header className="mb-12 border-b border-border pb-8">
                    <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
                        {page.title}
                    </h1>
                </header>

                <main className="prose prose-lg prose-invert max-w-none prose-headings:font-display prose-a:text-primary hover:prose-a:text-primary/80">
                    {page.content && typeof page.content === "object" && (
                        <RichText data={page.content as any} />
                    )}
                </main>
            </div>
        </article>
    )
}
