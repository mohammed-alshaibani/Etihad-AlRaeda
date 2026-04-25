import Image from "next/image"
import { cn } from "@/lib/utils"

type BrandLogoProps = {
  className?: string
  tone?: "navy" | "white"
  withWordmark?: boolean
}

export function BrandLogo({
  className,
}: BrandLogoProps) {
  return (
    <div className={cn("relative inline-flex items-center", className)} aria-label="اتحاد الرائدة">
      <Image 
        src="/Etihadlogo.png" 
        alt="Etihad FM Logo" 
        width={300} 
        height={80} 
        className="h-16 w-auto object-contain brightness-0 invert"
        priority
      />
    </div>
  )
}
