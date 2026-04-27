# Etihad AlRaeda — Project Task Tracker

## Phase 1 — Foundation & Database (Week 1–2) ✅

- [x] **1.1** Switch DB to PostgreSQL (Supabase) in `payload.config.ts` — auto-switches by NODE_ENV
- [x] **1.2** Create `Categories` collection (hierarchical, self-referencing `parent` field)
- [x] **1.3** Create `Brands` collection (`name`, `slug`, `logo`)
- [x] **1.4** Refactor `Products` collection:
  - [x] Replace hardcoded `category` select → `relationship` to `Categories`
  - [x] Add `brand` relationship to `Brands`
  - [x] Add `sku`, `compareAtPrice`, `tags`, `technicalSpecs`, `variants` array
- [x] **1.5** Create `HeroSlides` collection (image AND video support) + `Homepage` global updated
- [x] **1.6** Create `DynamicPages` collection (`title`, `slug`, `content`, `seo`, draft versions)
- [x] **1.7** Extend `Orders` collection:
  - [x] Add `customer` → `Customers`, `shippingAddress`, `billingAddress`
  - [x] Add `coupon` → `Coupons`, `discountAmount`, `shippingCost`
  - [x] Add `trackingNumber`, `paymentStatus`, `paymentGatewayId`, `paidAt`
  - [x] Auto-calculate totals via `beforeChange` hook
- [x] **1.8** Extend `QuoteRequests` collection:
  - [x] Add `items` array (product + quantity + notes)
  - [x] Add `attachments` uploads, `quotedAmount`, `quotePdf`, `validUntil`
  - [x] Add `convertedOrder` relationship, `statusHistory` array
  - [x] Updated statuses: `new → under-review → sent → accepted → rejected`
- [x] **1.9** Create `Coupons` collection (percentage + fixed, usage limits, expiry)
- [x] **1.10** Create `Customers` collection (Payload auth enabled, saved addresses)
- [x] **1.11** Create `ShippingZones` collection (Aramex/SMSA, tiered rates, free threshold)
- [x] **1.12** Extend `Posts`: add `tags`, `status` (draft/published), `ogImage`, `relatedPosts`

---

## Phase 2 — CMS & Admin Completeness (Week 2–3) ✅

- [x] **2.1** All new collections verified in `/admin` with correct Arabic/English labels and admin groups
- [x] **2.2** Build custom Payload admin view: **Premium Corporate Dashboard**
  - [x] Grouped Section Cards: المتجر, المحتوى, الطلبات, الإدارة
  - [x] Live KPI Summary Bar (Revenue, Orders, Quotes, Leads)
  - [x] Corporate Gold/Navy theme with Tajawal RTL Arabic font
  - [x] Two-column item grids with Gold '+' icons
- [x] **2.3** Role-based access control implemented (`payload/access/roles.ts`)
  - [x] `superadmin` — full access to everything
  - [x] `content-editor` — manage posts, pages, media only
  - [x] `sales-manager` — manage orders, quotes, customers; read-only products
  - [x] Users collection updated with 3-role system
- [x] **2.4** Draft & Preview configured for `Posts` and `DynamicPages`
  - [x] `versions: { drafts: true }` enabled on both collections (from Phase 1)
  - [x] `admin.preview` URL function added to both collections
  - [x] Preview API route created: `app/api/preview/route.ts`
- [x] **2.5** Auto-calculate totals `beforeChange` hook already implemented in `Orders.ts` (Phase 1)

---

## Phase 3 — Homepage & Corporate Pages (Week 3–4)

- [x] **3.1** Refactor `HeroSection` → fetch `HeroSlides`, implement embla-carousel (ISR)
- [x] **3.2** Refactor all static homepage sections to fetch from Payload (ISR):
  - [x] ServicesSection, PortfolioSection, TestimonialsSection
  - [x] PartnersStrip, InsightsSection, FaqSection, AboutSection
- [x] **3.3** Create `/pages/[slug]/page.tsx` catch-all for `DynamicPages` (SSG + metadata)
- [x] **3.4** Make `/blog/[slug]` fully dynamic (richText render, related posts, SEO metadata)
- [x] **3.5** Implement live search — `/api/search` querying products + posts
- [x] **3.6** Wire `Navigation` global → `site-header.tsx`
- [x] **3.7** Wire `SiteSettings` global → `site-footer.tsx`

---

## Phase 4 — E-commerce Store (Week 4–6)

- [x] **4.1** Build `CartContext` with Zustand + localStorage persistence
- [x] **4.2** Build `QuoteCartContext` (parallel to cart, for "Add to Quote" items)
- [x] **4.3** Build `/shop` product listing page: (ISR grid + CSR filters: category, brand, price, stock)
- [x] **4.4** Build `/shop/[slug]` product detail page: (gallery, variant selector, Add to Cart / Quote)
- [ ] **4.5** Build `CartDrawer` slide-over component
- [ ] **4.6** Build `/checkout` multi-step (Cart → Shipping → Payment, guest checkout)
- [ ] **4.7** Integrate Dynamic(any payment gateway) (Admin can enter api keys from admin panel of each payment gateway) payment gateway:
  - [ ] `POST /api/checkout` — create payment intent
  - [ ] `POST /api/webhooks/` — update order on success
- [ ] **4.8** Build coupon validation — `POST /api/validate-coupon`
- [ ] **4.9** Build `/invoice/[orderNumber]` — dynamic order confirmation

---

## Phase 5 — RFQ System & Customer Accounts (Week 6–8)

**Current Phase: COMPLETED**
Next focus: Phase 5 (RFQ & Customer Accounts)
- [ ] **5.1** Build `/request-quote` form (company info, quote items, file upload → Payload API)
- [ ] **5.2** Add "Add to Quote" button on product pages → `QuoteCartContext`
- [ ] **5.3** Customer auth: `/login`, `/register` pages + `middleware.ts` for protected routes
- [ ] **5.4** Build `/account` dashboard (SSR + auth): orders, quotes, profile
- [ ] **5.5** Quote status tracking page (customer-facing)
- [ ] **5.6** Admin "Convert Quote to Order" custom action in Payload
- [ ] **5.7** Shipping carrier integration (Aramex / SMSA) — auto-generate AWB
- [ ] **5.8** Google Maps + reCAPTCHA on contact/public forms
- [ ] **5.9** XML Sitemap: `/app/sitemap.ts` pulling slugs from Payload
- [ ] **5.10** Production deployment (PostgreSQL, env vars, Vercel, `migrate:run`)
