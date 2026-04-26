import { HeroSection } from "@/components/home/hero-section"
import { PartnersStrip } from "@/components/home/partners-strip"
import { ServicesSection } from "@/components/home/services-section"
import { AboutSection } from "@/components/home/about-section"
import { PortfolioSection } from "@/components/home/portfolio-section"
import { ProcessSection } from "@/components/home/process-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { InsightsSection } from "@/components/home/insights-section"
import { FaqSection } from "@/components/home/faq-section"
import { FinalCta } from "@/components/home/final-cta"

import { getPayload } from "payload"
import config from "@payload-config"

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Fetch homepage global
  let homepage: any = null
  try {
    homepage = await payload.findGlobal({
      slug: "homepage",
      depth: 2,
    })
  } catch (error) {
    console.error("Error fetching homepage global:", error)
  }

  // Fetch featured services/products
  let services: any[] = []
  try {
    const servicesRes = await payload.find({
      collection: "products",
      limit: 4,
      depth: 1,
    })
    services = servicesRes.docs
  } catch (error) {
    console.error("Error fetching products:", error)
  }

  // Fetch partners (brands)
  let brands: any[] = []
  try {
    const brandsRes = await payload.find({
      collection: "brands",
      limit: 15,
    })
    brands = brandsRes.docs
  } catch (error) {
    console.error("Error fetching brands:", error)
  }

  // Fetch recent posts (insights)
  let posts: any[] = []
  try {
    const postsRes = await payload.find({
      collection: "posts",
      where: {
        status: { equals: "published" }
      },
      sort: "-publishedAt",
      limit: 3,
    })
    posts = postsRes.docs
  } catch (error) {
    console.error("Error fetching posts:", error)
  }

  return (
    <>
      <HeroSection heroSlides={homepage?.heroSlides || []} />
      <PartnersStrip data={brands} />
      <ServicesSection data={homepage?.servicesSection || {}} services={services} />
      <AboutSection data={homepage?.about || {}} />
      <PortfolioSection data={homepage?.portfolioSection || {}} />
      <ProcessSection data={homepage?.processSection || {}} />
      <TestimonialsSection />
      <InsightsSection data={posts} />
      <FaqSection />
      <FinalCta data={homepage?.finalCta || {}} />
    </>
  )
}
