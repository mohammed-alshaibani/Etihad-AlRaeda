import type { CollectionConfig } from "payload"

export const HeroSlides: CollectionConfig = {
    slug: "hero-slides",
    admin: {
        useAsTitle: "headline",
        defaultColumns: ["headline", "mediaType", "order", "isActive"],
        group: "محتوى الصفحات",
        description: "تحكّم في شرائح القسم الرئيسي — تدعم الصور والفيديو",
    },
    labels: {
        singular: { ar: "شريحة رئيسية", en: "Hero Slide" },
        plural: { ar: "شرائح القسم الرئيسي", en: "Hero Slides" },
    },
      access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
    fields: [
        {
            name: "headline",
            type: "text",
            required: true,
            localized: true,
            label: { ar: "العنوان الرئيسي", en: "Headline" },
        },
        {
            name: "subheadline",
            type: "textarea",
            localized: true,
            label: { ar: "العنوان الفرعي", en: "Subheadline" },
        },
        // ─── Media ──────────────────────────────────────────────────────────────
        {
            name: "mediaType",
            type: "select",
            required: true,
            defaultValue: "image",
            label: { ar: "نوع الوسائط", en: "Media Type" },
            options: [
                { label: { ar: "صورة", en: "Image" }, value: "image" },
                { label: { ar: "فيديو", en: "Video" }, value: "video" },
            ],
        },
        {
            name: "backgroundImage",
            type: "upload",
            relationTo: "media",
            label: { ar: "صورة الخلفية", en: "Background Image" },
            admin: {
                condition: (data) => data?.mediaType === "image",
            },
        },
        {
            name: "backgroundVideo",
            type: "upload",
            relationTo: "media",
            label: { ar: "فيديو الخلفية", en: "Background Video" },
            admin: {
                condition: (data) => data?.mediaType === "video",
            },
        },
        {
            name: "videoFallbackImage",
            type: "upload",
            relationTo: "media",
            label: { ar: "صورة بديلة للفيديو", en: "Video Fallback Image" },
            admin: {
                condition: (data) => data?.mediaType === "video",
            },
        },
        // ─── Overlay ────────────────────────────────────────────────────────────
        {
            name: "overlayOpacity",
            type: "number",
            min: 0,
            max: 100,
            defaultValue: 50,
            label: { ar: "شفافية الطبقة المظلمة (%)", en: "Overlay Opacity (%)" },
        },
        // ─── CTAs ───────────────────────────────────────────────────────────────
        {
            name: "primaryCta",
            type: "group",
            label: { ar: "الزر الرئيسي", en: "Primary CTA" },
            fields: [
                { name: "label", type: "text", localized: true, label: { ar: "النص", en: "Label" } },
                { name: "url", type: "text", label: { ar: "الرابط", en: "URL" } },
            ],
        },
        {
            name: "secondaryCta",
            type: "group",
            label: { ar: "الزر الثانوي", en: "Secondary CTA" },
            fields: [
                { name: "label", type: "text", localized: true, label: { ar: "النص", en: "Label" } },
                { name: "url", type: "text", label: { ar: "الرابط", en: "URL" } },
            ],
        },
        // ─── Control ────────────────────────────────────────────────────────────
        {
            name: "order",
            type: "number",
            defaultValue: 0,
            label: { ar: "الترتيب", en: "Display Order" },
        },
        {
            name: "isActive",
            type: "checkbox",
            defaultValue: true,
            label: { ar: "منشور", en: "Active" },
        },
    ],
}
