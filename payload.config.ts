import { buildConfig } from "payload"
import { sqliteAdapter } from "@payloadcms/db-sqlite"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { fileURLToPath } from "url"
import sharp from "sharp"

// Collections
import { Users } from "./payload/collections/Users.ts"
import { Media } from "./payload/collections/Media.ts"
import { Services } from "./payload/collections/Services.ts"
import { Portfolio } from "./payload/collections/Portfolio.ts"
import { Posts } from "./payload/collections/Posts.ts"
import { Team } from "./payload/collections/Team.ts"
import { Testimonials } from "./payload/collections/Testimonials.ts"
import { Partners } from "./payload/collections/Partners.ts"
import { FAQs } from "./payload/collections/FAQs.ts"
import { Careers } from "./payload/collections/Careers.ts"
import { Offers } from "./payload/collections/Offers.ts"
import { News } from "./payload/collections/News.ts"
import { Resources } from "./payload/collections/Resources.ts"
import { QuoteRequests } from "./payload/collections/QuoteRequests.ts"
import { Appointments } from "./payload/collections/Appointments.ts"
import { ContactMessages } from "./payload/collections/ContactMessages.ts"
import { JobApplications } from "./payload/collections/JobApplications.ts"
import { Leads } from "./payload/collections/Leads.ts"
import { Products } from "./payload/collections/Products.ts"
import { Orders } from "./payload/collections/Orders.ts"


// Globals
import { SiteSettings } from "./payload/globals/SiteSettings.ts"
import { Homepage } from "./payload/globals/Homepage.ts"
import { AboutPage } from "./payload/globals/AboutPage.ts"
import { Navigation } from "./payload/globals/Navigation.ts"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.SERVER_URL || "http://localhost:3000",
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
    Leads,
    Products,
    Orders,
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
