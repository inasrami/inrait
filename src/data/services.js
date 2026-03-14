/**
 * Single source of truth for all INRAIT services.
 * Used by both ServicesSection.vue (homepage) and Services.vue (full page).
 */

export const SERVICES = [
  {
    id: 'website',
    title: 'Business Website',
    tag: 'Most Popular',
    hero: true,
    body: 'Custom-built websites that establish credibility and convert visitors into clients. Architecture, design, performance, and deployment — end to end.',
    icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    basePrice: 900,
    addons: [
      { id: 'website-cms',     label: 'CMS integration (editable content)',      price: 200 },
      { id: 'website-blog',    label: 'Blog / news section',                     price: 150 },
      { id: 'website-seo',     label: 'Advanced SEO audit + schema markup',      price: 180 },
      { id: 'website-i18n',    label: 'Multilingual support (2 languages)',      price: 250 },
      { id: 'website-anim',    label: 'Premium animations (GSAP)',               price: 300 },
    ],
    deliverables: [
      'Vue.js SPA or multi-page site',
      'Mobile-first responsive design',
      'SEO markup & Core Web Vitals optimisation',
      'Git handoff + deployment support',
    ],
  },
  {
    id: 'booking',
    title: 'Custom Booking System',
    tag: 'For Hospitality',
    hero: true,
    body: 'Tailor-made reservation platforms for hotels, guesthouses, barbershops, and service businesses. Cut commission fees and own your bookings entirely.',
    icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    basePrice: 1200,
    addons: [
      { id: 'booking-payment', label: 'Online payment (Stripe / PayPal)',        price: 250 },
      { id: 'booking-sms',     label: 'SMS & email confirmation automation',     price: 200 },
      { id: 'booking-gcal',    label: 'Google Calendar two-way sync',            price: 150 },
      { id: 'booking-multi',   label: 'Multi-property / multi-staff support',    price: 350 },
      { id: 'booking-promo',   label: 'Promo codes & discount engine',           price: 180 },
    ],
    deliverables: [
      'Real-time availability calendar',
      'Admin dashboard for managing bookings',
      'Automated confirmation emails',
      'Mobile-optimised booking flow',
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Store',
    tag: 'Sell Online',
    hero: false,
    body: 'Full-featured online stores built for performance. Product management, checkout, payments — designed to sell from day one and scale with your catalogue.',
    icon: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.97 1.61h9.72a2 2 0 001.97-1.61L23 6H6"/>',
    basePrice: 1500,
    addons: [
      { id: 'eco-payment',     label: 'Multi-gateway checkout (Stripe + PayPal)', price: 200 },
      { id: 'eco-inventory',   label: 'Advanced inventory & variant management',  price: 250 },
      { id: 'eco-reviews',     label: 'Product reviews & ratings system',         price: 180 },
      { id: 'eco-analytics',   label: 'Sales analytics dashboard',               price: 220 },
      { id: 'eco-discounts',   label: 'Discount codes & flash sale engine',       price: 160 },
    ],
    deliverables: [
      'Product catalogue & variant management',
      'Secure checkout & payment gateway',
      'Order & inventory management',
      'Mobile-optimised shopping experience',
    ],
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    tag: 'Save Time',
    hero: true,
    body: 'n8n automation pipelines that eliminate repetitive work — lead capture, CRM syncing, invoice generation, notification flows, and multi-system integrations.',
    icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    basePrice: 600,
    addons: [
      { id: 'auto-crm',        label: 'CRM integration (HubSpot / Pipedrive)',   price: 200 },
      { id: 'auto-invoice',    label: 'Automated invoicing pipeline',            price: 180 },
      { id: 'auto-leadseq',    label: 'Lead capture + follow-up sequence',       price: 220 },
      { id: 'auto-hosting',    label: 'Self-hosted n8n server setup',            price: 250 },
      { id: 'auto-reporting',  label: 'Automated weekly reporting emails',       price: 150 },
    ],
    deliverables: [
      'Custom n8n workflow design & build',
      'CRM, email & calendar integrations',
      'Self-hosted or cloud deployment',
      'Full documentation & handover',
    ],
  },
  {
    id: 'identity',
    title: 'Visual Identity & Design',
    tag: 'Brand First',
    hero: false,
    body: 'Brand identity systems, UI/UX design, and marketing assets. We build brands that look intentional — from logo to colour palette to every client touchpoint.',
    icon: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
    basePrice: 450,
    addons: [
      { id: 'id-guidelines',   label: 'Full brand guidelines document',          price: 150 },
      { id: 'id-social',       label: 'Social media template pack (10 assets)',  price: 180 },
      { id: 'id-print',        label: 'Print assets (business card, letterhead)', price: 120 },
      { id: 'id-ui',           label: 'UI design for web (Figma screens)',       price: 300 },
      { id: 'id-motion',       label: 'Animated logo / intro (After Effects)',   price: 250 },
    ],
    deliverables: [
      'Logo design & brand guidelines',
      'Adobe Suite production files',
      'Typography & colour system',
      'Social media & marketing assets',
    ],
  },
  {
    id: 'photography',
    title: 'Photography & Media',
    tag: 'Visual Content',
    hero: false,
    body: 'Commercial photography and post-production for businesses that need their visual content to match the quality of their product.',
    icon: '<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>',
    basePrice: 250,
    addons: [
      { id: 'photo-extra',     label: 'Additional half-day shoot',               price: 200 },
      { id: 'photo-drone',     label: 'Drone aerial photography',               price: 300 },
      { id: 'photo-video',     label: 'Short promo video edit (60–90 sec)',      price: 350 },
      { id: 'photo-360',       label: '360° virtual tour (hotels / venues)',     price: 400 },
      { id: 'photo-rush',      label: '48hr rush delivery',                     price: 150 },
    ],
    deliverables: [
      'Commercial & brand photography',
      'Professional retouching & colour grading',
      'Delivered in web & print formats',
      'Usage rights — full commercial licence',
    ],
  },
]

// Discount tiers applied when selecting multiple base services
export const BUNDLE_DISCOUNTS = [
  { minServices: 2, percent: 10, label: '10% bundle discount' },
  { minServices: 3, percent: 15, label: '15% bundle discount' },
]

export function getBundleDiscount(serviceCount) {
  const tier = [...BUNDLE_DISCOUNTS]
    .reverse()
    .find(d => serviceCount >= d.minServices)
  return tier ?? null
}