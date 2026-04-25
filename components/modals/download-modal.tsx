"use client"

import { useState, useTransition } from "react"
import { Check, Loader2, X } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitLead } from "@/app/actions/forms"

interface DownloadModalProps {
  resourceId: string
  resourceTitle: string
  fileUrl: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function DownloadModal({ resourceId, resourceTitle, fileUrl, isOpen, onOpenChange }: DownloadModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const result = await submitLead({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        company: formData.get("company") as string,
        jobTitle: formData.get("jobTitle") as string,
        resource: resourceId,
      })

      if (result.ok) {
        setSubmitted(true)
        // Automatically trigger download after success
        window.open(fileUrl, "_blank")
      } else {
        setError(result.error)
      }
    })
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-background p-6 shadow-2xl md:p-10">
          <Dialog.Close className="absolute left-4 top-4 rounded-full p-2 transition hover:bg-muted md:left-6 md:top-6">
            <X className="h-5 w-5" />
          </Dialog.Close>

          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-8 w-8" strokeWidth={3} />
              </div>
              <Dialog.Title className="font-display text-2xl font-bold text-foreground">
                تم التحقق بنجاح
              </Dialog.Title>
              <p className="mt-4 text-muted-foreground">
                شكراً لاهتمامك بـ "{resourceTitle}". بدأ تحميل الملف الآن. إذا لم يبدأ تلقائياً، يمكنك النقر على الرابط المرسل لبريدك.
              </p>
              <Button className="mt-8 w-full" onClick={() => onOpenChange(false)}>
                إغلاق
              </Button>
            </div>
          ) : (
            <>
              <Dialog.Title className="font-display text-2xl font-bold text-foreground">
                تحميل المورد التعليمي
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-muted-foreground">
                أدخل بياناتك المؤسسية لتحميل النسخة الكاملة من "{resourceTitle}".
              </Dialog.Description>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">الاسم الكامل *</Label>
                  <Input id="name" name="name" required placeholder="الاسم الثلاثي" className="h-11" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">البريد الإلكتروني للعمل *</Label>
                  <Input id="email" name="email" type="email" required placeholder="name@company.com" dir="ltr" className="h-11" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company">اسم الشركة *</Label>
                    <Input id="company" name="company" required placeholder="شركة المثال" className="h-11" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="jobTitle">المسمى الوظيفي</Label>
                    <Input id="jobTitle" name="jobTitle" placeholder="مثلاً: مدير تقني" className="h-11" />
                  </div>
                </div>

                {error && (
                  <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</p>
                )}

                <Button type="submit" disabled={isPending} className="mt-4 h-12 w-full text-base">
                  {isPending ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جاري المعالجة...
                    </>
                  ) : (
                    "تأكيد وتحميل الملف"
                  )}
                </Button>
                
                <p className="text-center text-[11px] text-muted-foreground">
                  بتحميلك لهذا الملف، أنت توافق على سياسة الخصوصية الخاصة بنا.
                </p>
              </form>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
