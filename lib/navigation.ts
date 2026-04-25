export type NavItem = {
  label: string
  href: string
  description?: string
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export const primaryNav: NavItem[] = [
  { label: "الصفحة الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "خدماتنا", href: "/services" },
  { label: "أعمالنا / مشاريعنا", href: "/portfolio" },
  { label: "تواصل معنا", href: "/contact" },
]

export type UnifiedNavItem = {
  label: string
  href?: string
  items?: NavItem[]
}

export const mainNav: UnifiedNavItem[] = [
  { label: "الرئيسية", href: "/" },
  { label: "عنا", href: "/about" },
  { 
    label: "خدمتنا", 
    items: [
      { label: "إدارة المرافق المتكاملة", href: "/services/integrated", description: "حلول شاملة للمباني والمجمعات" },
      { label: "التشغيل والصيانة", href: "/services/o-and-m", description: "صيانة وقائية وعلاجية دورية" },
      { label: "خدمات النظافة والضيافة", href: "/services/cleaning", description: "معايير فندقية لمنشأتك" },
      { label: "الحلول الأمنية", href: "/services/security", description: "حراسات أمنية وأنظمة مراقبة" },
    ]
  },
  { label: "مشاريعنا", href: "/portfolio" },
  { label: "المتجر", href: "/shop" },
  { label: "المدونة", href: "/blog" },
  { label: "تواصل معنا", href: "/contact" },

]

export const megaNav: NavGroup[] = [
  {
    label: "الشركة",
    items: [
      { label: "من نحن", href: "/about", description: "الرؤية، الرسالة، والفريق" },
      { label: "أخبار الشركة", href: "/news", description: "آخر المستجدات والإعلانات" },
      { label: "الوظائف", href: "/careers", description: "انضم إلى فريق مَراسي" },
      { label: "الشركاء", href: "/partners", description: "عملاؤنا حول العالم" },
    ],
  },
  {
    label: "الحلول",
    items: [
      { label: "خدماتنا", href: "/services", description: "جميع خدمات الأعمال" },
      { label: "أعمالنا", href: "/portfolio", description: "دراسات حالة ومشاريع" },
      { label: "المتجر الإلكتروني", href: "/shop", description: "باقات خدمات جاهزة" },
      { label: "مكتبة الملفات", href: "/library", description: "كتالوجات ومواصفات فنية" },
    ],

  },
  {
    label: "الدعم",
    items: [
      { label: "الأسئلة الشائعة", href: "/faq", description: "إجابات سريعة لاستفساراتك" },
      { label: "آراء العملاء", href: "/testimonials", description: "قصص نجاح حقيقية" },
      { label: "حجز موعد", href: "/book-appointment", description: "استشارة مع خبير" },
      { label: "بوابة العملاء", href: "/account", description: "متابعة الطلبات والعروض" },
      { label: "تواصل معنا", href: "/contact", description: "مكاتبنا ومعلومات الاتصال" },
    ],

  },
]

export const footerNav: NavGroup[] = [
  {
    label: "معلومات الشركة",
    items: [
      { label: "من نحن", href: "/about" },
      { label: "أخبار الشركة", href: "/news" },
      { label: "شركاؤنا / عملاؤنا", href: "/partners" },
      { label: "وظائف / التوظيف", href: "/careers" },
    ],
  },
  {
    label: "الموارد والروابط",
    items: [
      { label: "مدونة / مقالات", href: "/blog" },
      { label: "مكتبة ملفات / كتالوجات", href: "/library" },
      { label: "الأسئلة الشائعة", href: "/faq" },
      { label: "آراء العملاء", href: "/testimonials" },
    ],
  },
  {
    label: "خدماتنا",
    items: [
      { label: "خدماتنا", href: "/services" },
      { label: "عروض أو خصومات", href: "/offers" },
      { label: "أعمالنا / مشاريعنا", href: "/portfolio" },
    ],
  },
  {
    label: "تواصل وشؤون قانونية",
    items: [
      { label: "طلب عرض سعر", href: "/request-quote" },
      { label: "بوابة العملاء", href: "/account" },
      { label: "سياسة الخصوصية", href: "/privacy" },
      { label: "الشروط والأحكام", href: "/terms" },
    ],
  },

]
