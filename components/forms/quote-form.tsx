"use client"

import { useState, useTransition } from "react"
import { Check, ArrowLeft, ArrowRight, Building2, Briefcase, FileCheck, User, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { submitQuoteRequest } from "@/app/actions/forms"

const steps = [
  { id: 1, label: "الشركة", icon: Building2 },
  { id: 2, label: "المتطلبات", icon: Briefcase },
  { id: 3, label: "جهة الاتصال", icon: User },
  { id: 4, label: "مراجعة وإرسال", icon: FileCheck },
]

const allServices = [
  "الاستشارات الاستراتيجية",
  "التوريد المؤسسي",
  "إدارة المشاريع",
  "الاستشارات المالية",
  "الامتثال والحوكمة",
  "الأمن السيبراني",
]

type FormState = {
  companyName: string
  industry: string
  companySize: string
  website: string
  services: string[]
  budget: string
  timeline: string
  contractType: string
  message: string
  contactName: string
  jobTitle: string
  email: string
  phone: string
  channel: string
}

const initialState: FormState = {
  companyName: "",
  industry: "",
  companySize: "",
  website: "",
  services: [],
  budget: "",
  timeline: "",
  contractType: "fixed",
  message: "",
  contactName: "",
  jobTitle: "",
  email: "",
  phone: "",
  channel: "phone",
}

export function QuoteForm() {
  const [current, setCurrent] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [data, setData] = useState<FormState>(initialState)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((d) => ({ ...d, [key]: value }))

  const toggleService = (s: string) =>
    setData((d) => ({
      ...d,
      services: d.services.includes(s) ? d.services.filter((x) => x !== s) : [...d.services, s],
    }))

  const next = () => setCurrent((s) => Math.min(s + 1, steps.length))
  const back = () => setCurrent((s) => Math.max(s - 1, 1))

  const handleSubmit = () => {
    setError(null)
    startTransition(async () => {
      const result = await submitQuoteRequest({
        companyName: data.companyName,
        contactName: data.contactName,
        jobTitle: data.jobTitle,
        email: data.email,
        phone: data.phone,
        industry: data.industry,
        companySize: data.companySize,
        budget: data.budget,
        timeline: data.timeline,
        message: `${data.message}\n\nالخدمات المطلوبة: ${data.services.join("، ")}\nنموذج التعاقد: ${data.contractType}\nقناة التواصل: ${data.channel}\nالموقع: ${data.website}`,
        status: "new",
      })
      if (result.ok) {
        setSubmitted(true)
      } else {
        setError(result.error)
      }
    })
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-foreground">
          <Check className="h-6 w-6" strokeWidth={3} />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-foreground">تم استلام طلبك بنجاح</h3>
        <p className="mt-3 text-base text-muted-foreground">
          سيتواصل معك مدير حساب مؤسسي خلال 24 ساعة عمل على رقم الهاتف والبريد الإلكتروني المُقدّمين.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-premium">
      <div className="border-b border-border bg-muted p-6 md:p-8">
        <ol className="flex items-center justify-between gap-2">
          {steps.map((step, idx) => {
            const Icon = step.icon
            const isActive = step.id === current
            const isDone = step.id < current
            return (
              <li key={step.id} className="flex flex-1 items-center gap-3">
                <div className="flex flex-col items-center gap-2">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition",
                      isDone && "border-primary bg-primary text-foreground",
                      isActive && !isDone && "border-[var(--brand-navy)] bg-background text-foreground",
                      !isActive && !isDone && "border-border bg-background text-foreground",
                    )}
                  >
                    {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : <Icon className="h-4 w-4" />}
                  </span>
                  <span
                    className={cn(
                      "hidden text-xs font-semibold md:block",
                      isActive || isDone ? "text-foreground" : "text-foreground",
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <span className={cn("hidden h-0.5 flex-1 md:block", isDone ? "bg-primary" : "bg-border")} />
                )}
              </li>
            )
          })}
        </ol>
      </div>

      <form
        className="p-6 md:p-10"
        onSubmit={(e) => {
          e.preventDefault()
          if (current < steps.length) {
            next()
          } else {
            handleSubmit()
          }
        }}
      >
        {current === 1 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <h2 className="font-display text-xl font-bold text-foreground">معلومات الشركة</h2>
              <p className="mt-1 text-sm text-muted-foreground">ساعدنا على فهم طبيعة أعمالك لنقدّم عرضاً ملائماً.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">اسم الشركة *</Label>
              <Input
                id="company"
                required
                value={data.companyName}
                onChange={(e) => update("companyName", e.target.value)}
                placeholder="شركة المثال للأعمال"
                className="h-11"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="website">الموقع الإلكتروني</Label>
              <Input
                id="website"
                type="url"
                value={data.website}
                onChange={(e) => update("website", e.target.value)}
                placeholder="https://company.com"
                className="h-11"
                dir="ltr"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sector">القطاع *</Label>
              <Select value={data.industry} onValueChange={(v) => update("industry", v)}>
                <SelectTrigger id="sector" className="h-11">
                  <SelectValue placeholder="اختر القطاع" />
                </SelectTrigger>
                <SelectContent>
                  {["مالي ومصرفي", "طاقة ومرافق", "عقارات وتشييد", "لوجستيات", "تقنية", "رعاية صحية", "تعليم", "تجزئة", "حكومي", "أخرى"].map(
                    (s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="size">حجم الشركة *</Label>
              <Select value={data.companySize} onValueChange={(v) => update("companySize", v)}>
                <SelectTrigger id="size" className="h-11">
                  <SelectValue placeholder="عدد الموظفين" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-49">1 - 49</SelectItem>
                  <SelectItem value="50-249">50 - 249</SelectItem>
                  <SelectItem value="250-999">250 - 999</SelectItem>
                  <SelectItem value="1000+">1000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">الخدمة المطلوبة والنطاق</h2>
              <p className="mt-1 text-sm text-muted-foreground">اختر الخدمات التي تحتاجها ونطاق العمل التقديري.</p>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-foreground">اختر خدمة واحدة أو أكثر *</legend>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {allServices.map((service) => (
                  <label
                    key={service}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background p-4 text-sm font-medium text-foreground transition hover:border-primary/50 hover:bg-primary/5"
                  >
                    <Checkbox checked={data.services.includes(service)} onCheckedChange={() => toggleService(service)} />
                    {service}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="budget">الميزانية التقديرية</Label>
                <Select value={data.budget} onValueChange={(v) => update("budget", v)}>
                  <SelectTrigger id="budget" className="h-11">
                    <SelectValue placeholder="اختر الشريحة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<50K">أقل من 50,000 ريال</SelectItem>
                    <SelectItem value="50K-250K">50,000 - 250,000 ريال</SelectItem>
                    <SelectItem value="250K-1M">250,000 - 1,000,000 ريال</SelectItem>
                    <SelectItem value=">1M">أكثر من 1,000,000 ريال</SelectItem>
                    <SelectItem value="TBD">سأناقش الأمر مع الاستشاري</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timeline">الإطار الزمني</Label>
                <Select value={data.timeline} onValueChange={(v) => update("timeline", v)}>
                  <SelectTrigger id="timeline" className="h-11">
                    <SelectValue placeholder="متى تحتاج البدء؟" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-weeks">خلال أسبوعين</SelectItem>
                    <SelectItem value="1-month">خلال شهر</SelectItem>
                    <SelectItem value="3-months">خلال 3 أشهر</SelectItem>
                    <SelectItem value="flexible">مرن</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-foreground">نموذج التعاقد المفضّل</legend>
              <RadioGroup value={data.contractType} onValueChange={(v) => update("contractType", v)} className="grid grid-cols-1 gap-2 md:grid-cols-3">
                {[
                  { v: "fixed", t: "مشروع ثابت السعر" },
                  { v: "retainer", t: "احتجاز شهري" },
                  { v: "outcome", t: "مبني على النتائج" },
                ].map((opt) => (
                  <label
                    key={opt.v}
                    htmlFor={`contract-${opt.v}`}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background p-4 text-sm font-medium text-foreground transition hover:border-primary/50"
                  >
                    <RadioGroupItem value={opt.v} id={`contract-${opt.v}`} />
                    {opt.t}
                  </label>
                ))}
              </RadioGroup>
            </fieldset>

            <div className="grid gap-2">
              <Label htmlFor="description">وصف مختصر للمشروع *</Label>
              <Textarea
                id="description"
                required
                rows={5}
                value={data.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="صف الأهداف والتحديات والنتائج المتوقعة…"
              />
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <h2 className="font-display text-xl font-bold text-foreground">بيانات جهة الاتصال</h2>
              <p className="mt-1 text-sm text-muted-foreground">سنتواصل معك خلال 24 ساعة عمل.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">الاسم الكامل *</Label>
              <Input
                id="name"
                required
                value={data.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                placeholder="الاسم الثلاثي"
                className="h-11"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">المنصب *</Label>
              <Input
                id="position"
                required
                value={data.jobTitle}
                onChange={(e) => update("jobTitle", e.target.value)}
                placeholder="مثلاً: مدير المشتريات"
                className="h-11"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">البريد الإلكتروني للعمل *</Label>
              <Input
                id="email"
                type="email"
                required
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="name@company.com"
                className="h-11"
                dir="ltr"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">رقم الجوال *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+966 5x xxx xxxx"
                className="h-11"
                dir="ltr"
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label>قناة التواصل المفضّلة</Label>
              <RadioGroup value={data.channel} onValueChange={(v) => update("channel", v)} className="grid grid-cols-3 gap-2">
                {[
                  { v: "phone", t: "اتصال هاتفي" },
                  { v: "email", t: "بريد إلكتروني" },
                  { v: "meet", t: "اجتماع مباشر" },
                ].map((opt) => (
                  <label
                    key={opt.v}
                    htmlFor={`ch-${opt.v}`}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background p-3 text-sm font-medium text-foreground transition hover:border-primary/50"
                  >
                    <RadioGroupItem value={opt.v} id={`ch-${opt.v}`} />
                    {opt.t}
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">مراجعة ملخص الطلب</h2>
              <p className="mt-1 text-sm text-muted-foreground">تحقّق من البيانات قبل الإرسال. سيصلك عرض سعر مبدئي خلال يوم عمل.</p>
            </div>

            <div className="rounded-xl border border-border bg-muted p-6">
              <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                {[
                  ["الشركة", data.companyName || "—"],
                  ["القطاع", data.industry || "—"],
                  ["الخدمات", data.services.join("، ") || "—"],
                  ["الميزانية", data.budget || "—"],
                  ["الإطار الزمني", data.timeline || "—"],
                  ["جهة الاتصال", `${data.contactName} — ${data.email}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0">
                    <dt className="font-medium text-muted-foreground">{label}</dt>
                    <dd className="text-right font-semibold text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
            )}

            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <Checkbox required defaultChecked className="mt-0.5" />
              <span>
                أوافق على{" "}
                <a href="/terms" className="font-semibold text-foreground underline underline-offset-4">
                  الشروط والأحكام
                </a>{" "}
                و{" "}
                <a href="/privacy" className="font-semibold text-foreground underline underline-offset-4">
                  سياسة الخصوصية
                </a>
                ، وأرغب في استلام تحديثات عبر البريد الإلكتروني.
              </span>
            </label>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <Button type="button" variant="outline" onClick={back} disabled={current === 1} className="border-[var(--brand-navy)]/15 text-foreground">
            <ArrowRight className="ml-1.5 h-4 w-4" />
            السابق
          </Button>
          <p className="text-xs text-muted-foreground">
            الخطوة {current} من {steps.length}
          </p>
          <Button
            type="submit"
            disabled={isPending}
            className={cn(
              current === steps.length
                ? "bg-primary text-foreground hover:bg-primary/90"
                : "bg-background text-foreground hover:bg-muted",
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="ml-1.5 h-4 w-4 animate-spin" />
                جاري الإرسال…
              </>
            ) : current === steps.length ? (
              "إرسال الطلب"
            ) : (
              <>
                التالي
                <ArrowLeft className="mr-1.5 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
