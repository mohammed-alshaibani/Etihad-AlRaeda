Phase 1 — Foundation & Database (Week 1–2)
Zero frontend work until the data model is correct.

 1.1 Switch DB to PostgreSQL (Supabase) in 
payload.config.ts
 — run migration
 1.2 Create Categories collection (hierarchical, self-referencing parent)
 1.3 Create Brands collection
 1.4 replace category select → relationship, add brand relationship1.5 Create HeroSlides collection; update Homepage global to reference it
 1.6 Create DynamicPages collection
 1.7 Extend Orders collection: add customer, shippingAddress, billingAddress, coupon, discountAmount, shippingCost, trackingNumber, paymentStatus, paymentGatewayId
 1.8 Extend QuoteRequests: add items (product array), attachments, quotedAmount, quotePdf, convertedOrder, validUntil, statusHistory
 1.9 Create Coupons collection
 1.10 Create Customers collection (with Payload auth enabled)
 1.11 Create ShippingZones collection
 1.12 Add tags, status (draft/published), ogImage to PostsPhase 2 — CMS & Admin Completeness (Week 2–3)
Make the admin usable for the content/sales team.

 2.1 Verify all new collections appear correctly in /admin with proper labels and groups
 2.2 Build custom Payload admin view: Analytics Dashboard (sales chart, top products, RFQ conversion rate) using recharts (already installed)
 2.3 Add role-based access control: superadmin, content-editor, sales-manager
 2.4 Configure Draft & Preview for Posts and DynamicPages
 2.5 Add Payload beforeChange hook on Orders to auto-calculate totalsPhase 3 — Homepage & Corporate Pages (Week 3–4)
Connect all static frontend components to live Payload data.

 3.1 Refactor HeroSection → fetch HeroSlides, implement embla-carousel slider (ISR)
 3.2 Refactor ServicesSection, PortfolioSection, TestimonialsSection, PartnersStrip, InsightsSection, FaqSection, AboutSection → fetch from Payload (ISR)
 3.3 Create catch-all /pages/[slug]/page.tsx for DynamicPages + generateStaticParams + generateMetadata
 3.4 Make /blog/[slug] dynamic: fetch post, render richText, related posts, SEO metadata
 3.5 Implement live search: /api/search route handler querying products + posts
 3.6 Wire Navigation and SiteSettings globals into 
site-header.tsx
 and 
site-footer.tsx Phase 4 — E-commerce Store (Week 4–6)
The core revenue engine.The core revenue engine.

 4.1 Build CartContext (Zustand or Context API) with localStorage persistence
 4.2 Build QuoteCartContext parallel to cart
 4.3 Build /shop product listing page: ISR grid + CSR filters (category, brand, price, stock)
 4.4 Build /shop/[slug] product detail page: gallery carousel, variant selector, Add to Cart / Add to Quote
 4.5 Build CartDrawer component (slide-over panel)
 4.6 Build /checkout multi-step: Cart Review → Shipping Info → Payment
 4.7 Integrate Moyasar payment gateway:
POST /api/checkout — create payment, return hosted URL
POST /api/webhooks/moyasar — update order on webhook
 4.8 Build coupon validation: POST /api/validate-coupon
 4.9 Build /invoice/[orderNumber] — dynamic order confirmationPhase 5 — RFQ System & Customer Accounts (Week 6–8)
 5.1 Build /request-quote full form: company info, product items, file upload, submission → creates QuoteRequests doc via Payload API /account dashboard: Order history, quote history, profile editor (SSR + auth middleware)
 5.5 Quote status tracking page (customer-facing)