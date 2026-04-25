"use client"

import { useMemo, useState, useTransition } from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { submitAppointment } from "@/app/actions/forms"

const arabicMonths = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
]

const arabicWeekdays = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"]

const timeSlots = [
  "09:00 ص", "09:30 ص", "10:00 ص", "10:30 ص",
  "11:00 ص", "11:30 ص", "01:00 م", "01:30 م",
  "02:00 م", "02:30 م", "03:00 م", "03:30 م",
  "04:00 م", "04:30 م",
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

export function BookingWidget() {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate() + 1)
  const [selectedTime, setSelectedTime] = useState<string | null>("10:00 ص")
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [contactName, setContactName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [notes, setNotes] = useState("")

  const firstDayWeekday = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = getDaysInMonth(viewYear, viewMonth)

  const cells = useMemo(() => {
    const out: Array<number | null> = []
    for (let i = 0; i < firstDayWeekday; i++) out.push(null)
    for (let d = 1; d <= daysInMonth; d++) out.push(d)
    return out
  }, [firstDayWeekday, daysInMonth])

  const goMonth = (dir: 1 | -1) => {
    let m = viewMonth + dir
    let y = viewYear
    if (m < 0) {
      m = 11
      y -= 1
    }
    if (m > 11) {
      m = 0
      y += 1
    }
    setViewMonth(m)
    setViewYear(y)
    setSelectedDay(null)
  }

  const isPast = (day: number) => {
    const date = new Date(viewYear, viewMonth, day)
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return date < t
  }

  if (confirmed) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-foreground">
          <Check className="h-6 w-6" strokeWidth={3} />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-foreground">
          تم تأكيد موعدك
        </h3>
        <p className="mt-3 text-base text-muted-foreground">
          {selectedDay} {arabicMonths[viewMonth]} {viewYear} — الساعة {selectedTime}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          سيصلك تأكيد عبر البريد الإلكتروني مع رابط الاجتماع ومعلومات مدير الحساب.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-premium">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Calendar */}
        <div className="border-b border-border p-6 md:p-8 lg:col-span-7 lg:border-b-0 lg:border-l">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                اختر التاريخ
              </p>
              <p className="mt-1 font-display text-xl font-bold text-foreground">
                {arabicMonths[viewMonth]} {viewYear}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon"
                onClick={() => goMonth(-1)}
                className="border-[var(--brand-navy)]/15"
                aria-label="الشهر السابق"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => goMonth(1)}
                className="border-[var(--brand-navy)]/15"
                aria-label="الشهر التالي"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-1.5 text-center">
            {arabicWeekdays.map((w) => (
              <div
                key={w}
                className="pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {w}
              </div>
            ))}
            {cells.map((d, idx) => {
              if (d === null) return <div key={idx} />
              const past = isPast(d)
              const weekday = new Date(viewYear, viewMonth, d).getDay()
              const isFriSat = weekday === 5 || weekday === 6
              const isSelected = d === selectedDay
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={past || isFriSat}
                  onClick={() => setSelectedDay(d)}
                  className={cn(
                    "aspect-square rounded-lg text-sm font-semibold transition",
                    past || isFriSat
                      ? "cursor-not-allowed text-foreground/60 line-through"
                      : "hover:bg-primary/10 hover:text-foreground",
                    isSelected &&
                      "bg-background text-foreground shadow-premium hover:bg-muted hover:text-foreground"
                  )}
                  aria-pressed={isSelected}
                  aria-label={`${d} ${arabicMonths[viewMonth]}`}
                >
                  {d}
                </button>
              )
            })}
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                الأوقات المتاحة (توقيت الرياض)
              </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-4">
              {timeSlots.map((slot) => {
                const isSel = slot === selectedTime
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-sm font-semibold transition",
                      isSel
                        ? "border-primary bg-primary text-foreground"
                        : "border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                    )}
                  >
                    {slot}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Summary + form */}
        <form
          className="flex flex-col gap-5 bg-muted p-6 md:p-8 lg:col-span-5"
          onSubmit={(e) => {
            e.preventDefault()
            setError(null)
            if (!selectedDay || !selectedTime) return
            const dateISO = new Date(viewYear, viewMonth, selectedDay).toISOString()
            startTransition(async () => {
              const result = await submitAppointment({
                contactName,
                email,
                company,
                meetingType: "video",
                preferredDate: dateISO,
                preferredTime: selectedTime,
                notes,
                status: "pending",
              })
              if (result.ok) setConfirmed(true)
              else setError(result.error)
            })
          }}
        >
          <div className="rounded-xl border border-border bg-background p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              ملخص الحجز
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-4 w-4 text-foreground" />
                <span className="font-semibold text-foreground">
                  {selectedDay
                    ? `${selectedDay} ${arabicMonths[viewMonth]} ${viewYear}`
                    : "اختر التاريخ"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-foreground" />
                <span className="font-semibold text-foreground">
                  {selectedTime || "اختر الوقت"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="b-name">الاسم الكامل *</Label>
            <Input
              id="b-name"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="الاسم الكامل"
              className="h-11 bg-background"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="b-email">البريد الإلكتروني *</Label>
            <Input
              id="b-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="h-11 bg-background"
              dir="ltr"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="b-company">الشركة</Label>
            <Input
              id="b-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="اسم الشركة"
              className="h-11 bg-background"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="b-agenda">جدول اللقاء (اختياري)</Label>
            <Textarea
              id="b-agenda"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="ما الذي تودّ مناقشته خلال الجلسة؟"
              className="bg-background"
            />
          </div>

          {error && <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

          <Button
            type="submit"
            disabled={!selectedDay || !selectedTime || isPending}
            className="h-12 bg-primary text-base font-semibold text-foreground hover:bg-primary/90"
          >
            {isPending ? (
              <>
                <Loader2 className="ml-1.5 h-4 w-4 animate-spin" />
                جاري التأكيد…
              </>
            ) : (
              "تأكيد الحجز"
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            سيصلك تأكيد فوري عبر البريد الإلكتروني.
          </p>
        </form>
      </div>
    </div>
  )
}
