import { BrandLogo } from "@/components/brand-logo"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-navy">
      <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
        <BrandLogo className="w-64 md:w-80 animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </div>
  )
}
