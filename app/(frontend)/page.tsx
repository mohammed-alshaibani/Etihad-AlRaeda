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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnersStrip />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <InsightsSection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
