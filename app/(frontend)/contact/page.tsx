import { Phone, Mail, MapPin, Clock, MessagesSquare, Linkedin, Twitter } from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata = {
  title: "تواصل معنا",
  description:
    "فريق العناية المؤسسية في مَراسي جاهز لخدمتك. هاتف، بريد إلكتروني، ومكاتب في 3 دول.",
}

const offices = [
  {
    city: "الرياض",
    country: "المملكة العربية السعودية",
    address: "طريق الملك فهد، حي العليا، برج المملكة، الطابق 18",
    phone: "+966 11 000 0000",
    email: "riyadh@marasi.sa",
    hours: "الأحد - الخميس، 8:30 ص - 5:30 م",
  },
  {
    city: "جدة",
    country: "المملكة العربية السعودية",
    address: "طريق الكورنيش، حي الشاطئ، أبراج البحر",
    phone: "+966 12 000 0000",
    email: "jeddah@marasi.sa",
    hours: "الأحد - الخميس، 8:30 ص - 5:30 م",
  },
  {
    city: "دبي",
    country: "الإمارات العربية المتحدة",
    address: "شارع الشيخ زايد، مركز الإمارات المالي الدولي (DIFC)",
    phone: "+971 4 000 0000",
    email: "dubai@marasi.ae",
    hours: "الإثنين - الجمعة، 9:00 ص - 6:00 م",
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="تواصل معنا"
        title="فريق العناية المؤسسية جاهز للإجابة على استفساراتك"
        description="اختر قناة التواصل الأنسب لك، أو تفضّل بزيارتنا في أحد مكاتبنا الإقليمية."
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "تواصل معنا" },
        ]}
      />

      {/* Contact Channels */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]">
                <Phone className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-lg font-bold text-[var(--brand-navy)]">
                الخط المؤسسي
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                لاستفسارات طلبات العرض والشراكات.
              </p>
              <a
                href="tel:+966110000000"
                dir="ltr"
                className="mt-3 block font-display text-xl font-bold text-[var(--brand-navy)] hover:text-[var(--brand-gold)]"
              >
                +966 11 000 0000
              </a>
            </div>
            <div className="rounded-2xl border border-border bg-white p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]">
                <Mail className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-lg font-bold text-[var(--brand-navy)]">
                البريد الإلكتروني
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                رد خلال 24 ساعة عمل لجميع الاستفسارات.
              </p>
              <a
                href="mailto:business@marasi.sa"
                className="mt-3 block font-display text-xl font-bold text-[var(--brand-navy)] hover:text-[var(--brand-gold)]"
              >
                business@marasi.sa
              </a>
            </div>
            <div className="rounded-2xl border border-border bg-white p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]">
                <MessagesSquare className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-lg font-bold text-[var(--brand-navy)]">
                الدردشة المباشرة
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                متاحة خلال ساعات العمل الرسمية.
              </p>
              <p className="mt-3 font-display text-xl font-bold text-[var(--brand-navy)]">
                متاح الآن
                <span className="ms-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="bg-[var(--brand-gray-soft)] py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 container-px lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-premium md:p-10">
              <h2 className="font-display text-2xl font-bold text-[var(--brand-navy)]">
                أرسل استفسارك
              </h2>
              <p className="mt-1 text-[14px] text-muted-foreground">
                سيُوجّه طلبك مباشرة إلى القسم المختص.
              </p>

              <form className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="c-name">الاسم الكامل *</Label>
                  <Input id="c-name" required className="h-11" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="c-company">الشركة *</Label>
                  <Input id="c-company" required className="h-11" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="c-email">البريد الإلكتروني *</Label>
                  <Input id="c-email" type="email" required className="h-11" dir="ltr" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="c-phone">رقم الجوال</Label>
                  <Input id="c-phone" type="tel" className="h-11" dir="ltr" />
                </div>
                <div className="grid gap-2 md:col-span-2">
                  <Label htmlFor="c-topic">موضوع الاستفسار *</Label>
                  <Select>
                    <SelectTrigger id="c-topic" className="h-11">
                      <SelectValue placeholder="اختر الموضوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">طلب عرض سعر</SelectItem>
                      <SelectItem value="support">دعم عملاء حاليين</SelectItem>
                      <SelectItem value="partnership">شراكة استراتيجية</SelectItem>
                      <SelectItem value="media">علاقات عامة / إعلام</SelectItem>
                      <SelectItem value="careers">الوظائف والتوظيف</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 md:col-span-2">
                  <Label htmlFor="c-msg">الرسالة *</Label>
                  <Textarea id="c-msg" rows={5} required />
                </div>
                <div className="md:col-span-2">
                  <Button className="h-12 w-full bg-[var(--brand-navy)] text-white hover:bg-[var(--brand-navy-700)] md:w-auto">
                    إرسال الاستفسار
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-premium">
              <div className="relative aspect-[4/3] bg-[var(--brand-navy)]">
                {/* Stylized map */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <span className="relative flex h-4 w-4">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-gold)] opacity-70"></span>
                      <span className="relative inline-flex h-4 w-4 rounded-full bg-[var(--brand-gold)] ring-4 ring-[var(--brand-gold)]/30"></span>
                    </span>
                    <span className="mt-3 block rounded-lg bg-white px-3 py-1.5 text-[12px] font-semibold text-[var(--brand-navy)] shadow-premium">
                      الرياض، السعودية
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="font-display text-sm font-bold text-[var(--brand-navy)]">
                  تابعنا على
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href="#"
                    aria-label="لينكد إن"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-[var(--brand-navy)] transition hover:border-[var(--brand-gold)]/50 hover:text-[var(--brand-gold)]"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="تويتر"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-[var(--brand-navy)] transition hover:border-[var(--brand-gold)]/50 hover:text-[var(--brand-gold)]"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="rounded-2xl border border-border bg-white p-6"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-display text-lg font-bold text-[var(--brand-navy)]">
                        مكتب {office.city}
                      </p>
                      <p className="text-[13px] text-muted-foreground">
                        {office.country}
                      </p>
                    </div>
                    <span className="rounded-full bg-[var(--brand-gold)]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-gold)]">
                      مفتوح
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-[13px] text-[var(--brand-navy)]/80">
                    <li className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-gold)]" />
                      {office.address}
                    </li>
                    <li className="flex items-center gap-2" dir="ltr">
                      <Phone className="h-4 w-4 shrink-0 text-[var(--brand-gold)]" />
                      {office.phone}
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0 text-[var(--brand-gold)]" />
                      {office.email}
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0 text-[var(--brand-gold)]" />
                      {office.hours}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
