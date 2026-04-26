import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { sqliteAdapter } from "@payloadcms/db-sqlite"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { fileURLToPath } from "url"
import sharp from "sharp"

// ─── Collections ────────────────────────────────────────────────────────────
import { Users } from "./payload/collections/Users"
import { Media } from "./payload/collections/Media"
// Content
import { Services } from "./payload/collections/Services"
import { Portfolio } from "./payload/collections/Portfolio"
import { Posts } from "./payload/collections/Posts"
import { Team } from "./payload/collections/Team"
import { Testimonials } from "./payload/collections/Testimonials"
import { Partners } from "./payload/collections/Partners"
import { FAQs } from "./payload/collections/FAQs"
import { News } from "./payload/collections/News"
import { Resources } from "./payload/collections/Resources"
// Store
import { Categories } from "./payload/collections/Categories"
import { Brands } from "./payload/collections/Brands"
import { Products } from "./payload/collections/Products"
import { Coupons } from "./payload/collections/Coupons"
import { Orders } from "./payload/collections/Orders"
import { ShippingZones } from "./payload/collections/ShippingZones"
// CMS / Pages
import { HeroSlides } from "./payload/collections/HeroSlides"
import { DynamicPages } from "./payload/collections/DynamicPages"
// Leads & CRM
import { QuoteRequests } from "./payload/collections/QuoteRequests"
import { Customers } from "./payload/collections/Customers"
import { Appointments } from "./payload/collections/Appointments"
import { ContactMessages } from "./payload/collections/ContactMessages"
import { JobApplications } from "./payload/collections/JobApplications"
import { Careers } from "./payload/collections/Careers"
import { Leads } from "./payload/collections/Leads"
import { Offers } from "./payload/collections/Offers"

// ─── Globals ─────────────────────────────────────────────────────────────────
import { SiteSettings } from "./payload/globals/SiteSettings"
import { Homepage } from "./payload/globals/Homepage"
import { AboutPage } from "./payload/globals/AboutPage"
import { Navigation } from "./payload/globals/Navigation"
import { PaymentGateways } from "./payload/globals/PaymentGateways"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// ─── Database Adapter ─────────────────────────────────────────────────────────
// Uses PostgreSQL (Supabase) in production, SQLite for local development.
const isDevelopment = process.env.NODE_ENV !== "production"

const dbAdapter = isDevelopment
  ? sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "file:./payload.db",
    },
    push: true,
  })
  : postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  })

export default buildConfig({
  serverURL: process.env.SERVER_URL || "http://localhost:3000",
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — لوحة التحكم",
    },
    // ── Custom Admin Components ──────────────────────────────────────────
    components: {
      afterNavLinks: ["@/payload/components/AnalyticsNavLink"],
      views: {
        dashboard: {
          Component: "@/payload/components/AdminDashboard",
        },
      },
    },
  },

  editor: lexicalEditor({}),
  // ─── Localization ──────────────────────────────────────────────────────────
  localization: {
    locales: [
      { label: "العربية", code: "ar" },
      { label: "English", code: "en" },
    ],
    defaultLocale: "ar",
    fallback: true,
  },
  i18n: {
    fallbackLanguage: "ar",
  },
  // ─── Collections ──────────────────────────────────────────────────────────
  collections: [
    // Auth & Media
    Users,
    Customers,
    Media,
    // CMS / Pages
    HeroSlides,
    DynamicPages,
    // Content
    Services,
    Portfolio,
    Posts,
    Team,
    Testimonials,
    Partners,
    FAQs,
    News,
    Resources,
    // Store
    Categories,
    Brands,
    Products,
    Coupons,
    Orders,
    ShippingZones,
    // Leads & CRM
    QuoteRequests,
    Appointments,
    ContactMessages,
    JobApplications,
    Careers,
    Offers,
    Leads,
  ],
  // ─── Globals ──────────────────────────────────────────────────────────────
  globals: [SiteSettings, Homepage, AboutPage, Navigation, PaymentGateways],
  // ─── Config ───────────────────────────────────────────────────────────────
  secret: process.env.PAYLOAD_SECRET || "CHANGE-ME-IN-PRODUCTION-VERY-LONG-SECRET",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: dbAdapter,
  sharp,
  telemetry: false,
})
