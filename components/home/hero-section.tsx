"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection({ heroSlides }: { heroSlides?: any[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Default fallback if no slides are defined
  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : [
    {
      headline: "نحن شريكك المسؤول عن تشغيل منشأتك بالكامل… نوفر لك إدارة متكاملة لعملك بدون تعقيد.",
      subheadline: "إدارة المرافق بالكامل من جهة واحدة = كفاءة أعلى + تكلفة أقل + راحة بال",
      primaryCta: { label: "طلب عرض سعر", url: "/quote" },
      secondaryCta: { label: "حجز استشارة مجانية", url: "/book-appointment" },
      mediaType: "image",
      backgroundImage: { url: "/images/hero-boardroom.jpg" }
    }
  ]

  // Auto-slide every 6 seconds
  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative overflow-hidden bg-background text-foreground min-h-[85vh] flex items-center">
      {/* Background Media */}
      {slides.map((slide, index) => {
        const isVideo = slide.mediaType === "video"
        const mediaUrl = isVideo ? slide.backgroundVideo?.url : slide.backgroundImage?.url

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
          >
            {isVideo && mediaUrl ? (
              <video
                src={mediaUrl}
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full opacity-40"
              />
            ) : mediaUrl ? (
              <Image
                src={mediaUrl}
                alt={slide.headline}
                fill
                priority={index === 0}
                className="object-cover opacity-30"
              />
            ) : (
              <div className="absolute inset-0 bg-muted/20" />
            )}

            {/* Dark/Gradient Overlays */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50 md:bg-gradient-to-l md:from-background md:via-background/90 md:to-background/60"
            />
          </div>
        )
      })}

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start justify-center container-px py-24 md:py-32 lg:py-40 z-10">

        {/* Content Slider */}
        <div className="relative w-full max-w-4xl h-full flex flex-col items-start text-start">
          {slides.map((slide, index) => {
            if (index !== currentSlide) return null
            return (
              <div
                key={index}
                className="flex flex-col items-start animate-in fade-in slide-in-from-bottom-8 duration-700 w-full"
              >
                {slide.eyebrow && (
                  <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20 backdrop-blur-sm">
                    {slide.eyebrow}
                  </span>
                )}
                <h1 className="font-display text-4xl font-bold leading-[1.2] text-foreground md:text-5xl lg:text-6xl drop-shadow-sm">
                  {slide.headline}
                </h1>

                {slide.subheadline && (
                  <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80 md:text-xl lg:text-2xl drop-shadow-sm">
                    {slide.subheadline}
                  </p>
                )}

                <div className="mt-10 flex flex-wrap items-center gap-4 w-full">
                  {slide.primaryCta?.label && (
                    <Button
                      asChild
                      size="lg"
                      className="h-14 bg-primary px-8 text-base font-semibold text-primary-foreground shadow-premium-lg hover:bg-primary/90 flex-1 md:flex-none justify-center"
                    >
                      <Link href={slide.primaryCta.url || "/quote"}>
                        {slide.primaryCta.label}
                        <ArrowLeft className="mr-2 h-5 w-5" />
                      </Link>
                    </Button>
                  )}
                  {slide.secondaryCta?.label && (
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-14 border-foreground/20 bg-foreground/5 px-8 text-base font-semibold text-foreground backdrop-blur hover:bg-foreground/10 hover:text-foreground flex-1 md:flex-none justify-center"
                    >
                      <Link href={slide.secondaryCta.url || "/book-appointment"}>
                        {slide.secondaryCta.label}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Slide Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 right-8 flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-primary" : "w-2 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}


