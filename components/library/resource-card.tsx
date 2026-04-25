"use client"

import { useState } from "react"
import { Download, FileText, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DownloadModal } from "@/components/modals/download-modal"
import type { Resource } from "@/payload-types"

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDownload = () => {
    if (resource.gated) {
      setIsModalOpen(true)
    } else if (resource.file && typeof resource.file === "object" && "url" in resource.file) {
      window.open(resource.file.url as string, "_blank")
    }
  }

  const fileUrl = resource.file && typeof resource.file === "object" && "url" in resource.file 
    ? (resource.file.url as string) 
    : ""

  const coverUrl = resource.coverImage && typeof resource.coverImage === "object" && "url" in resource.coverImage
    ? (resource.coverImage.url as string)
    : ""

  return (
    <div className="group flex h-full flex-col border border-border bg-card transition-all hover:border-primary/40 hover:shadow-premium">
      {coverUrl && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={coverUrl}
            alt={resource.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {resource.gated && (
            <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
              <Lock className="h-3 w-3" />
              محتوى حصري
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            {resource.type}
          </span>
        </div>

        <div className="mb-2 flex items-center gap-2 text-[11px] font-bold text-primary">
          <span>{resource.category}</span>
          {resource.publishedAt && (
            <>
              <span className="opacity-30">•</span>
              <span>{new Date(resource.publishedAt).getFullYear()}</span>
            </>
          )}
        </div>

        <h3 className="mb-3 font-display text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
          {resource.title}
        </h3>
        
        <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {resource.summary}
        </p>

        <Button 
          onClick={handleDownload}
          className="h-11 w-full gap-2 font-semibold shadow-sm"
          variant={resource.gated ? "default" : "outline"}
        >
          {resource.gated ? (
            <>
              <Lock className="h-4 w-4" />
              طلب تحميل المورد
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              تنزيل الملف
            </>
          )}
        </Button>
      </div>

      {resource.gated && (
        <DownloadModal
          resourceId={resource.id}
          resourceTitle={resource.title}
          fileUrl={fileUrl}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  )
}
