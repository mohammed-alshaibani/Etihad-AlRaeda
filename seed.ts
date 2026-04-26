import { getPayload } from "payload"
import config from "@payload-config"
import { fakerAR } from "@faker-js/faker"

async function run() {
    const payload = await getPayload({ config })

    console.log("Seeding Database for اتحاد الرائدة لإدارة المرافق...")

    // 0. Create Superadmin User
    console.log("- Creating Superadmin...")
    try {
        await payload.create({
            collection: "users",
            data: {
                email: "admin@alraida.sa",
                password: "123",
                roles: ["superadmin"],
            } as any,
        })
    } catch (e) {
        console.log("  (Superadmin might already exist)")
    }

    // 1. Create Hero Slide
    console.log("- Creating Hero Slides...")
    const heroSlideRes = await payload.create({
        collection: "hero-slides",
        data: {
            headline: "إدارة المرافق بالكامل من جهة واحدة = كفاءة أعلى + تكلفة أقل + راحة بال",
            subheadline: "نحن شريكك المسؤول عن تشغيل منشأتك بالكامل… نوفر لك إدارة متكاملة، جودة عالية، واستجابة سريعة لضمان استمرارية عملك بدون تعقيد.",
            mediaType: "image",
            overlayOpacity: 50,
            primaryCta: {
                label: "اطلب استشارة مجانية",
                url: "/contact",
            },
            secondaryCta: {
                label: "تعرف على خدماتنا",
                url: "/services",
            },
            order: 1,
            isActive: true,
            "headline.ar": "إدارة المرافق بالكامل من جهة واحدة = كفاءة أعلى + تكلفة أقل + راحة بال",
            "subheadline.ar": "نحن شريكك المسؤول عن تشغيل منشأتك بالكامل… نوفر لك إدارة متكاملة، جودة عالية، واستجابة سريعة لضمان استمرارية عملك بدون تعقيد.",
            "primaryCta.label.ar": "اطلب استشارة مجانية",
            "secondaryCta.label.ar": "تعرف على خدماتنا",
        } as any,
    })

    // 2. Global / Homepage / About Page
    console.log("- Updating Homepage Globals...")
    await payload.updateGlobal({
        slug: "homepage",
        data: {
            heroSlides: [heroSlideRes.id],
            about: {
                eyebrow: "من نحن",
                title: "شريكك الاستراتيجي في إدارة المرافق",
                // Payload richText uses lexical state, we inject basic text format or just leave description empty and rely on highlights
                highlights: [
                    {
                        title: "اتحاد الرائدة لإدارة المرافق",
                        description: "شركة متخصصة في تقديم حلول متكاملة لإدارة وتشغيل وصيانة المرافق، تساعد الشركات والمؤسسات على تحقيق أعلى كفاءة تشغيلية مع تقليل التكاليف وضمان استمرارية العمل. تعمل الشركة كنقطة اتصال واحدة تدير جميع احتياجات المرافق."
                    }
                ],
                "eyebrow.ar": "من نحن",
                "title.ar": "شريكك الاستراتيجي في إدارة المرافق",
            },
            processSection: {
                title: "كيف نعمل؟",
                description: "منهجية عملنا تضمن لك الشفافية والاحترافية في كل خطوة.",
                steps: [
                    { number: "01", title: "زيارة الموقع والمعاينة", description: "نقوم بزيارة ميدانية لتقييم الوضع الحالي للمرفق." },
                    { number: "02", title: "تحليل الاحتياجات", description: "دراسة متطلبات التشغيل والصيانة بدقة." },
                    { number: "03", title: "إعداد العرض الفني والمالي", description: "تقديم عرض متكامل وشفاف." },
                    { number: "04", title: "التنفيذ والتشغيل", description: "بدء العمليات التشغيلية بأعلى معايير الجودة." },
                    { number: "05", title: "المتابعة والصيانة المستمرة", description: "ضمان الاستدامة وتقليل الأعطال." },
                ],
                "title.ar": "كيف نعمل؟",
                "description.ar": "منهجية عملنا تضمن لك الشفافية والاحترافية في كل خطوة.",
            },
            servicesSection: {
                eyebrow: "خدماتنا",
                title: "حلول متكاملة لجميع قطاعات الأعمال",
                description: "نقدم مجموعة واسعة من الخدمات لتلبية احتياجات منشأتك بالكامل.",
                "eyebrow.ar": "خدماتنا",
                "title.ar": "حلول متكاملة لجميع قطاعات الأعمال",
                "description.ar": "نقدم مجموعة واسعة من الخدمات لتلبية احتياجات منشأتك بالكامل.",
            },
            finalCta: {
                title: "هل أنت مستعد لرفع كفاءة منشأتك؟",
                description: "تواصل معنا اليوم ودعنا نتحمل عبء إدارة وتشغيل مرافقك.",
                ctaLabel: "تواصل معنا",
                ctaUrl: "/contact",
                "title.ar": "هل أنت مستعد لرفع كفاءة منشأتك؟",
                "description.ar": "تواصل معنا اليوم ودعنا نتحمل عبء إدارة وتشغيل مرافقك.",
                "ctaLabel.ar": "تواصل معنا",
            }
        } as any,
    })

    // 3. Services Collection
    console.log("- Creating Services...")
    const servicesData = [
        {
            title: "إدارة وتشغيل وصيانة المرافق",
            slug: "facility-management",
            icon: "Building2",
            shortDescription: "تشمل الصيانة الدورية، التشغيل العام للمرافق، خدمات النظافة المتخصصة، وتوفير الكوادر البشرية المؤهلة.",
            deliverables: [
                { item: "الصيانة (كهرباء، سباكة، تكييف)" },
                { item: "تشغيل المرافق" },
                { item: "النظافة" },
                { item: "توفير العمالة" }
            ],
            benefits: [
                { title: "تقليل التكاليف", description: "خفض التكاليف التشغيلية بنسبة ملحوظة من خلال الصيانة الوقائية." },
                { title: "جهة واحدة", description: "التعامل مع مورد واحد لجميع احتياجات الصيانة." }
            ],
            order: 1,
            isFeatured: true,
            "title.ar": "إدارة وتشغيل وصيانة المرافق",
            "shortDescription.ar": "تشمل الصيانة الدورية، التشغيل العام للمرافق، خدمات النظافة المتخصصة، وتوفير الكوادر البشرية المؤهلة.",
        },
        {
            title: "الأنظمة الكهربائية والتقنية",
            slug: "electrical-and-technical-systems",
            icon: "Zap",
            shortDescription: "نقدم حلولاً تقنية متكاملة لتجهيز المباني بأحدث الشبكات، السنترالات، وأنظمة العرض.",
            deliverables: [
                { item: "تجهيز البنية التحتية لتقنية المعلومات (IT)" },
                { item: "أنظمة السنترال والكول سنتر" },
                { item: "تجهيز غرف الاجتماعات والاستديوهات" },
                { item: "أنظمة العرض والشاشات التفاعلية" }
            ],
            benefits: [
                { title: "استجابة سريعة", description: "استجابة سريعة لضمان الاستمرارية وتقليل فترات التوقف." },
                { title: "تنفيذ احترافي", description: "تنفيذ عملي مبني على أسس هندسية وليس مجرد حلول مؤقتة." }
            ],
            order: 2,
            isFeatured: true,
            "title.ar": "الأنظمة الكهربائية والتقنية",
            "shortDescription.ar": "نقدم حلولاً تقنية متكاملة لتجهيز المباني بأحدث الشبكات، السنترالات، وأنظمة العرض.",
        },
        {
            title: "أنظمة الأمن والحلول الذكية",
            slug: "security-and-smart-solutions",
            icon: "Shield",
            shortDescription: "نحمي منشأتك باستخدام أحدث كاميرات المراقبة، البوابات الإلكترونية، وأنظمة إنترنت الأشياء.",
            deliverables: [
                { item: "كاميرات المراقبة المتقدمة" },
                { item: "البوابات الإلكترونية وأنظمة الدخول" },
                { item: "أنظمة التتبع وإدارة الأسطول" },
                { item: "حلول إنترنت الأشياء (IoT) للمرافق" }
            ],
            benefits: [
                { title: "أمان متكامل", description: "تحكم كامل بجميع مداخل ومخارج المنشأة." },
                { title: "تقليل الأعطال", description: "مراقبة ذكية تساهم في التنبؤ بالأعطال قبل حدوثها." }
            ],
            order: 3,
            isFeatured: true,
            "title.ar": "أنظمة الأمن والحلول الذكية",
            "shortDescription.ar": "نحمي منشأتك باستخدام أحدث كاميرات المراقبة، البوابات الإلكترونية، وأنظمة إنترنت الأشياء.",
        }
    ]

    for (const srv of servicesData) {
        await payload.create({
            collection: "services",
            data: srv as any,
        })
    }

    // 4. Site Settings (Features / Pain points and Solutions / Targets)
    console.log("- Updating Site Settings & Brand...")
    await payload.updateGlobal({
        slug: "site-settings",
        data: {
            brand: {
                companyName: "اتحاد الرائدة لإدارة المرافق",
                tagline: "كفاءة أعلى + تكلفة أقل + راحة بال",
                "companyName.ar": "اتحاد الرائدة لإدارة المرافق",
                "tagline.ar": "كفاءة أعلى + تكلفة أقل + راحة بال",
            },
            contact: {
                email: "info@alraida.sa",
                phone: "+966 50 000 0000",
                address: "المملكة العربية السعودية، الرياض",
                "address.ar": "المملكة العربية السعودية، الرياض",
            },
        } as any,
    })

    // 5. Generate Target Audience / Industries / Clients using Faker AR
    console.log("- Generating Fake Clients & Target Industries (Portfolio)...")
    const industries = ["الشركات والمكاتب الإدارية", "المراكز التجارية", "المستشفيات والعيادات", "المصانع والمنشآت الصناعية", "الجهات الحكومية"]
    
    for (const ind of industries) {
        await payload.create({
            collection: "portfolio",
            data: {
                title: fakerAR.company.name() + ` (${ind})`,
                slug: fakerAR.helpers.slugify(fakerAR.company.name() + " " + ind),
                clientName: fakerAR.company.name(),
                industry: ind,
                completionDate: fakerAR.date.past().toISOString(),
                shortDescription: `مشروع تقديم خدمات متكاملة في قطاع ${ind}. تم إنجاز المشروع بنجاح وتقليل التكاليف التشغيلية.`,
                isFeatured: fakerAR.datatype.boolean(),
                "title.ar": fakerAR.company.name() + ` (${ind})`,
                "shortDescription.ar": `مشروع تقديم خدمات متكاملة في قطاع ${ind}. تم إنجاز المشروع بنجاح وتقليل التكاليف التشغيلية.`,
            } as any,
        }).catch(() => null) // Ignore errors if portfolio schema differs slightly
    }

    // Generate Fake Testimonials
    console.log("- Generating Fake Testimonials...")
    for (let i = 0; i < 4; i++) {
        await payload.create({
            collection: "testimonials",
            data: {
                authorName: fakerAR.person.fullName(),
                authorTitle: "مدير التشغيل",
                companyName: fakerAR.company.name(),
                content: "شركة اتحاد الرائدة قدمت لنا حلولاً استثنائية ساهمت في خفض التكاليف التشغيلية بشكل ملحوظ وضمان سير العمل بدون توقف.",
                rating: 5,
                "authorName.ar": fakerAR.person.fullName(),
                "authorTitle.ar": "مدير التشغيل",
                "companyName.ar": fakerAR.company.name(),
                "content.ar": "شركة اتحاد الرائدة قدمت لنا حلولاً استثنائية ساهمت في خفض التكاليف التشغيلية بشكل ملحوظ وضمان سير العمل بدون توقف.",
            } as any,
        }).catch(() => null)
    }

    console.log("=========================================")
    console.log("Seeding Complete! Database is populated.")
    console.log("=========================================")
    process.exit(0)
}

run().catch((e) => {
    console.error("Seeding Failed:", e)
    process.exit(1)
})
