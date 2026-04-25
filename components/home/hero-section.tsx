import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background text-foreground">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-boardroom.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-l from-background via-background/90 to-background/60"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(185,153,90,0.22), transparent 55%)",
          }}
        />
      </div>

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-center container-px py-24 md:py-32 lg:py-40">
        <div className="flex w-full max-w-4xl flex-col items-start text-start">
          <h1 className="font-display text-3xl font-bold leading-normal text-foreground md:text-4xl lg:text-5xl">
            نحن شريكك المسؤول عن تشغيل منشأتك بالكامل… نوفر لك إدارة متكاملة لعملك بدون تعقيد.
          </h1>

          <p className="mt-6 text-base leading-relaxed text-foreground opacity-80 md:text-xl lg:text-2xl">
            إدارة المرافق بالكامل من جهة واحدة = كفاءة أعلى + تكلفة أقل + راحة بال
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-14 bg-primary px-8 text-base font-semibold text-primary-foreground shadow-premium-lg hover:bg-primary/90"
            >
              <Link href="/quote">
                طلب عرض سعر
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 border-foreground/20 bg-foreground/5 px-8 text-base font-semibold text-foreground backdrop-blur hover:bg-foreground/10 hover:text-foreground"
            >
              <Link href="/book-appointment">حجز استشارة مجانية</Link>
            </Button>
          </div>
        </div>
        
        {/* Decorative elements can be placed here if needed */}
        <div className="hidden">
        </div>
      </div>
    </section>
  )
}
