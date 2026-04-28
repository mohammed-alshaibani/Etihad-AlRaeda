import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getPayload } from "payload"
import config from "@payload-config"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { Calendar, Clock, Tag, ChevronLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: "posts",
    where: {
      slug: { equals: resolvedParams.slug },
      status: { equals: "published" },
    },
    limit: 1,
  })

  if (!docs.length) return { title: "Post Not Found | Etihad AlRaeda" }

  const post = docs[0]

  return {
    title: post.seo?.metaTitle || `${post.title} | Etihad AlRaeda Insights`,
    description: post.seo?.metaDescription || post.excerpt || "",
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt || "",
      images: post.seo?.ogImage ? [post.seo.ogImage] : [],
    },
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      limit: 100,
    })

    return docs.map((doc) => ({
      slug: doc.slug,
    }))
  } catch (error) {
    console.error("Error in generateStaticParams (blog):", error)
    return []
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: "posts",
    where: {
      slug: { equals: resolvedParams.slug },
      status: { equals: "published" },
    },
    depth: 2,
    limit: 1,
  })

  if (!docs.length) notFound()

  const post = docs[0]

  // Type narrow the relation fields explicitly if they are fully populated documents
  const authorName = post.author && typeof post.author === "object" ? post.author.name : null
  const authorRole = post.author && typeof post.author === "object" ? post.author.role : null
  const authorImage = post.author && typeof post.author === "object" ? post.author.image?.url : null

  return (
    <article className="min-h-screen bg-background pb-20 pt-32 text-foreground">
      <div className="mx-auto max-w-4xl container-px">

        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          العودة للمدونة
        </Link>

        <header className="mb-12">
          {post.category && (
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
              {post.category}
            </span>
          )}

          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-balance mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y border-border py-4">
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary/70" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("ar-SA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            )}

            {post.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary/70" />
                <span>{post.readingTime} دقائق للقراءة</span>
              </div>
            )}
          </div>
        </header>

        {post.coverImage && typeof post.coverImage === "object" && post.coverImage.url && (
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl mb-12">
            <Image
              src={post.coverImage.url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          <main className="prose prose-lg prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
            {post.content && typeof post.content === "object" && (
              <RichText data={post.content as any} />
            )}
          </main>

          <aside className="space-y-8">
            {authorName && (
              <div className="rounded-xl border border-border bg-muted/50 p-6 flex items-center gap-4">
                {authorImage && (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <Image src={authorImage} alt={authorName} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">بقلم</p>
                  <p className="font-display font-semibold text-foreground">{authorName}</p>
                  {authorRole && <p className="text-xs text-muted-foreground">{authorRole}</p>}
                </div>
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="rounded-xl border border-border bg-muted/50 p-6">
                <h3 className="font-display font-semibold mb-4 text-sm flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  الوسوم
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tagObj: any, index: number) => (
                    <span
                      key={index}
                      className="rounded bg-background border border-border px-2.5 py-1 text-xs text-foreground/80"
                    >
                      {tagObj.tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  )
}
