import { BookingWidget } from "@/components/forms/booking-widget"
import { PageHero } from "@/components/page-hero"
import { Video, Building2, PhoneCall, Clock3 } from "lucide-react"

export const metadata = {
  title: "حجز موعد",
  description: "احجز استشارة مجانية مع أحد خبراء مَراسي للحلول المؤسسية.",
}

const meetingTypes = [
  {
    icon: Video,
    title: "اجتماع افتراضي",
    desc: "جلسة عبر Google Meet أو Microsoft Teams.",
    length: "45 دقيقة",
  },
  {
    icon: Building2,
    title: "اجتماع في مكاتبنا",
    desc: "في مكاتب مَراسي بالرياض، جدة، أو دبي.",
    length: "60 دقيقة",
  },
  {
    icon: PhoneCall,
    title: "اتصال هاتفي",
    desc: "مكالمة صوتية سريعة مع استشاري مختص.",
    length: "30 دقيقة",
  },
]

export default function BookAppointmentPage() {
  return (
    <>
      <PageHero
        eyebrow="حجز موعد"
        title="احجز جلسة استشارية مجانية مع أحد خبرائنا"
        description="اختر نوع الاجتماع والتاريخ المناسب، وسنؤكّد الموعد خلال ساعة."
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "حجز موعد" },
        ]}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {meetingTypes.map((type) => {
              const Icon = type.icon
              return (
                <div
                  key={type.title}
                  className="rounded-2xl border border-border bg-white p-6 transition hover:border-[var(--brand-gold)]/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5" />
                      {type.length}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[16px] font-bold text-[var(--brand-navy)]">
                    {type.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] text-muted-foreground">
                    {type.desc}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-10">
            <BookingWidget />
          </div>
        </div>
      </section>
    </>
  )
}
