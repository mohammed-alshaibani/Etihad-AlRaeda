import { buildConfig } from "payload"
import { sqliteAdapter } from "@payloadcms/db-sqlite"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { fileURLToPath } from "url"
import sharp from "sharp"

// Collections
import { Users } from "./payload/collections/Users"
import { Media } from "./payload/collections/Media"
import { Services } from "./payload/collections/Services"
import { Portfolio } from "./payload/collections/Portfolio"
import { Posts } from "./payload/collections/Posts"
import { Team } from "./payload/collections/Team"
import { Testimonials } from "./payload/collections/Testimonials"
import { Partners } from "./payload/collections/Partners"
import { FAQs } from "./payload/collections/FAQs"
import { Careers } from "./payload/collections/Careers"
import { Offers } from "./payload/collections/Offers"
import { News } from "./payload/collections/News"
import { Resources } from "./payload/collections/Resources"
import { QuoteRequests } from "./payload/collections/QuoteRequests"
import { Appointments } from "./payload/collections/Appointments"
import { ContactMessages } from "./payload/collections/ContactMessages"
import { JobApplications } from "./payload/collections/JobApplications"

// Globals
import { SiteSettings } from "./payload/globals/SiteSettings"
import { Homepage } from "./payload/globals/Homepage"
import { AboutPage } from "./payload/globals/AboutPage"
import { Navigation } from "./payload/globals/Navigation"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — لوحة التحكم",
    },
  },
  editor: lexicalEditor({}),
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
  collections: [
    Users,
    Media,
    Services,
    Portfolio,
    Posts,
    Team,
    Testimonials,
    Partners,
    FAQs,
    Careers,
    Offers,
    News,
    Resources,
    QuoteRequests,
    Appointments,
    ContactMessages,
    JobApplications,
  ],
  globals: [SiteSettings, Homepage, AboutPage, Navigation],
  secret: process.env.PAYLOAD_SECRET || "CHANGE-ME-IN-PRODUCTION-VERY-LONG-SECRET",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "file:./payload.db",
    },
    push: true,
  }),
  sharp,
  telemetry: false,
})
