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
      name: "brand",
      type: "group",
      label: { ar: "الهوية", en: "Brand" },
      fields: [
        { name: "companyName", type: "text", localized: true, label: { ar: "اسم الشركة", en: "Company Name" } },
        { name: "tagline", type: "text", localized: true, label: { ar: "الشعار النصي", en: "Tagline" } },
        { name: "logo", type: "upload", relationTo: "media", label: { ar: "الشعار", en: "Logo" } },
        { name: "favicon", type: "upload", relationTo: "media", label: { ar: "أيقونة الموقع", en: "Favicon" } },
      ],
    },
    {
      name: "contact",
      type: "group",
      label: { ar: "معلومات التواصل", en: "Contact Info" },
      fields: [
        { name: "email", type: "email", label: { ar: "البريد الإلكتروني", en: "Email" } },
        { name: "phone", type: "text", label: { ar: "الهاتف", en: "Phone" } },
        { name: "whatsapp", type: "text", label: "WhatsApp" },
        { name: "address", type: "textarea", localized: true, label: { ar: "العنوان", en: "Address" } },
        { name: "workingHours", type: "text", localized: true, label: { ar: "ساعات العمل", en: "Working Hours" } },
        { name: "mapUrl", type: "text", label: { ar: "رابط الخريطة", en: "Map URL" } },
      ],
    },
    {
      name: "social",
      type: "group",
      label: { ar: "وسائل التواصل", en: "Social Media" },
      fields: [
        { name: "linkedin", type: "text", label: "LinkedIn" },
        { name: "twitter", type: "text", label: "Twitter / X" },
        { name: "instagram", type: "text", label: "Instagram" },
        { name: "youtube", type: "text", label: "YouTube" },
        { name: "facebook", type: "text", label: "Facebook" },
      ],
    },
    {
      name: "stats",
      type: "array",
      localized: true,
      label: { ar: "أرقامنا", en: "Key Stats" },
      fields: [
        { name: "value", type: "text", required: true, label: { ar: "القيمة", en: "Value" } },
        { name: "label", type: "text", required: true, label: { ar: "التسمية", en: "Label" } },
      ],
    },
    {
      name: "seo",
      type: "group",
      label: { ar: "SEO الافتراضي", en: "Default SEO" },
      fields: [
        { name: "metaTitle", type: "text", localized: true, label: { ar: "عنوان الصفحة", en: "Meta Title" } },
        {
          name: "metaDescription",
          type: "textarea",
          localized: true,
          label: { ar: "وصف الصفحة", en: "Meta Description" },
        },
        { name: "ogImage", type: "upload", relationTo: "media", label: { ar: "صورة المشاركة", en: "OG Image" } },
      ],
    },
  ],
}
