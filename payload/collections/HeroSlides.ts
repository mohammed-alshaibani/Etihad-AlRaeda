import type { CollectionConfig } from "payload"

export const HeroSlides: CollectionConfig = {
    slug: "hero-slides",
    admin: {
        useAsTitle: "headline",
        defaultColumns: ["headline", "eyebrow", "mediaType", "order", "isActive"],
        group: "محتوى الصفحات",
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
            type: "tabs",
            tabs: [
                {
                    label: { ar: "النصوص", en: "Content" },
                    fields: [
                        {
                            name: "headline",
                            type: "text",
                            required: true,
                            localized: true,
                            label: { ar: "العنوان الرئيسي", en: "Headline" },
                        },
                        {
                            name: "eyebrow",
                            type: "text",
                            localized: true,
                            label: { ar: "نص علوي مصغر", en: "Eyebrow" },
                        },
                        {
                            name: "subheadline",
                            type: "textarea",
                            localized: true,
                            label: { ar: "العنوان الفرعي", en: "Subheadline" },
                        },
                    ],
                },
                {
                    label: { ar: "الخلفية والوسائط", en: "Media" },
                    fields: [
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
                            admin: { condition: (data) => data?.mediaType === "image" },
                        },
                        {
                            name: "backgroundVideo",
                            type: "upload",
                            relationTo: "media",
                            label: { ar: "فيديو الخلفية", en: "Background Video" },
                            admin: { condition: (data) => data?.mediaType === "video" },
                        },
                        {
                            name: "videoFallbackImage",
                            type: "upload",
                            relationTo: "media",
                            label: { ar: "صورة بديلة للفيديو", en: "Video Fallback" },
                            admin: { condition: (data) => data?.mediaType === "video" },
                        },
                        {
                            name: "overlayOpacity",
                            type: "number",
                            min: 0,
                            max: 100,
                            defaultValue: 50,
                            label: { ar: "شفافية الطبقة المظلمة (%)", en: "Dark Overlay (%)" },
                        },
                    ],
                },
                {
                    label: { ar: "أزرار الإجراء", en: "Actions (CTAs)" },
                    fields: [
                        {
                            name: "primaryCta",
                            type: "group",
                            label: { ar: "الزر الرئيسي", en: "Primary CTA" },
                            fields: [
                                {
                                    type: "row",
                                    fields: [
                                        { name: "label", type: "text", localized: true, label: { ar: "النص", en: "Label" }, admin: { width: "50%" } },
                                        { name: "url", type: "text", label: { ar: "الرابط", en: "URL" }, admin: { width: "50%" } },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "secondaryCta",
                            type: "group",
                            label: { ar: "الزر الثانوي", en: "Secondary CTA" },
                            fields: [
                                {
                                    type: "row",
                                    fields: [
                                        { name: "label", type: "text", localized: true, label: { ar: "النص", en: "Label" }, admin: { width: "50%" } },
                                        { name: "url", type: "text", label: { ar: "الرابط", en: "URL" }, admin: { width: "50%" } },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: { ar: "الإعدادات", en: "Settings" },
                    fields: [
                        {
                            type: "row",
                            fields: [
                                { name: "order", type: "number", defaultValue: 0, label: { ar: "ترتيب العرض", en: "Display Order" }, admin: { width: "50%" } },
                                { name: "isActive", type: "checkbox", defaultValue: true, label: { ar: "مفعّل", en: "Active" }, admin: { width: "50%", style: { alignSelf: "center" } } },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
