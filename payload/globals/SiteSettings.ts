import type { GlobalConfig } from "payload"

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: { ar: "إعدادات الموقع", en: "Site Settings" },
  admin: { group: "الإعدادات" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: { ar: "هوية المؤسسة", en: "Identity" },
          fields: [
            {
              name: "brand",
              type: "group",
              label: { ar: "الهوية التجارية", en: "Brand Identity" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "companyName", type: "text", localized: true, label: { ar: "اسم الشركة", en: "Company Name" }, admin: { width: "50%" } },
                    { name: "tagline", type: "text", localized: true, label: { ar: "الشعار اللفظي", en: "Tagline / Slogan" }, admin: { width: "50%" } },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    { name: "logo", type: "upload", relationTo: "media", label: { ar: "شعار الموقع رئيسي", en: "Primary Logo" }, admin: { width: "50%" } },
                    { name: "favicon", type: "upload", relationTo: "media", label: { ar: "أيقونة المتصفح (Favicon)", en: "Favicon" }, admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { ar: "بيانات التواصل", en: "Contact" },
          fields: [
            {
              name: "contact",
              type: "group",
              label: { ar: "معلومات الاتصال", en: "Contact Details" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "email", type: "email", label: { ar: "البريد الرئيسي", en: "Corporate Email" }, admin: { width: "33%" } },
                    { name: "phone", type: "text", label: { ar: "رقم الهاتف", en: "Landline / Office" }, admin: { width: "33%" } },
                    { name: "whatsapp", type: "text", label: { ar: "واتساب", en: "WhatsApp Business" }, admin: { width: "34%" } },
                  ],
                },
                { name: "address", type: "textarea", localized: true, label: { ar: "العنوان الفعلي", en: "Physical Address" } },
                {
                  type: "row",
                  fields: [
                    { name: "workingHours", type: "text", localized: true, label: { ar: "ساعات العمل", en: "Operational Hours" }, admin: { width: "50%" } },
                    { name: "mapUrl", type: "text", label: { ar: "رابط Google Maps", en: "Map Share Link" }, admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { ar: "التواصل الاجتماعي", en: "Social" },
          fields: [
            {
              name: "social",
              type: "group",
              label: { ar: "حسابات التواصل الاجتماعي", en: "Social Media Links" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "linkedin", type: "text", label: "LinkedIn", admin: { width: "50%" } },
                    { name: "twitter", type: "text", label: "X / Twitter", admin: { width: "50%" } },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    { name: "instagram", type: "text", label: "Instagram", admin: { width: "33%" } },
                    { name: "youtube", type: "text", label: "YouTube", admin: { width: "33%" } },
                    { name: "facebook", type: "text", label: "Facebook", admin: { width: "34%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { ar: "إحصائيات", en: "Stats" },
          fields: [
            {
              name: "stats",
              type: "array",
              localized: true,
              label: { ar: "إحصائيات الإنجاز (أرقامنا)", en: "Platform Numbers / Impact" },
              admin: { initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", type: "text", required: true, label: { ar: "القيمة (مثال: +٥٠٠)", en: "Value" }, admin: { width: "50%" } },
                    { name: "label", type: "text", required: true, label: { ar: "التسمية (مثال: عميل)", en: "Label" }, admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { ar: "SEO العام", en: "Global SEO" },
          fields: [
            {
              name: "seo",
              type: "group",
              label: { ar: "تحسين محركات البحث الافتراضي", en: "Default SEO Configuration" },
              fields: [
                { name: "metaTitle", type: "text", localized: true, label: { ar: "عنوان الصفحة الافتراضي", en: "Meta Title" } },
                { name: "metaDescription", type: "textarea", localized: true, label: { ar: "وصف الموقع الافتراضي", en: "Meta Description" } },
                { name: "ogImage", type: "upload", relationTo: "media", label: { ar: "صورة المشاركة الافتراضية", en: "Social Share Image" } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
