/**
 * INRAIT services - fully internationalised.
 *
 * Usage inside a component:
 *   import { useServices, getBundleDiscount } from '../data/services.js'
 *   const { SERVICES } = useServices()   // reactive ComputedRef<Service[]>
 */

import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage.js'

// ─── Static data (never changes per language) ─────────────────────────────────

const ADDON_IDS = {
  website:     ['website-cms',  'website-blog',  'website-seo',  'website-i18n',  'website-anim'],
  booking:     ['booking-pay',  'booking-sms',   'booking-gcal', 'booking-multi', 'booking-promo'],
  ecommerce:   ['eco-payment',  'eco-inventory', 'eco-reviews',  'eco-analytics', 'eco-discounts'],
  automation:  ['auto-crm',     'auto-invoice',  'auto-lead',    'auto-hosting',  'auto-report'],
  identity:    ['id-guide',     'id-social',     'id-print',     'id-ui',         'id-motion'],
  marketing:   ['mkt-strategy', 'mkt-content',   'mkt-ads',       'mkt-seo',       'mkt-reporting'],

}

const ADDON_PRICES = {
  website:     [199.99, 149.99, 179.99, 99.99, 99.99],
  booking:     [249.99, 199.99, 149.99, 349.99, 179.99],
  ecommerce:   [199.99, 249.99, 179.99, 219.99, 159.99],
  automation:  [199.99, 179.99, 219.99, 249.99, 149.99],
  identity:    [149.99, 179.99, 119.99, 299.99, 249.99],
  marketing:   [249.99, 199.99, 299.99, 249.99, 149.99],
}

const BASE_PRICES = {
  website:     899.99,
  booking:     1199.99,
  ecommerce:   1999.99,
  automation:  599.99,
  identity:    449.99,
  marketing:   399.99,
}

const HERO_FLAGS = {
  website:     true,
  booking:     true,
  ecommerce:   false,
  automation:  true,
  identity:    false,
  marketing:   true,
}

const ICONS = {
  website:     '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
  booking:     '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 15l2 2 5-5"/>',
  ecommerce:   '<path d="M4 5h17l-2 9H7L5 2H2"/><path d="M7 18h.01M18 18h.01M7 18a2 2 0 102 2M18 18a2 2 0 102 2"/>',
  automation:  '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 11l7-4M8.5 13l7 4"/>',
  identity:    '<path d="M4 17.5V20h2.5L19 7.5 16.5 5 4 17.5zM15 6.5l2.5 2.5M12 21h9"/>',
  marketing:   '<path d="M4 11v2a2 2 0 002 2h2l3 5h2l-2-5 10-3V8L11 5 8 10H6a2 2 0 00-2 1zM21 8v8"/>',
}


const SERVICE_KEYS = ['website', 'booking', 'ecommerce', 'automation', 'identity', 'marketing']

// ─── Composable ───────────────────────────────────────────────────────────────

export function useServices() {
  const { t } = useLanguage()

  const SERVICES = computed(() =>
    SERVICE_KEYS.map((key) => {
      // t() returns the locale object at servicesData[key]
      const data = t(`servicesData.${key}`)

      return {
        id:           key,
        hero:         HERO_FLAGS[key],
        icon:         ICONS[key],
        basePrice:    BASE_PRICES[key],
        title:        data.title,
        tag:          data.tag,
        body:         data.body,
        bestFor:      data.bestFor,
        timeline:     data.timeline,
        deliverables: data.deliverables,
        // Merge locale label with static id and price
        addons: data.addons.map((addon, i) => ({
          id:    ADDON_IDS[key][i],
          label: addon.label,
          price: ADDON_PRICES[key][i],
        })),
      }
    })
  )

  return { SERVICES }
}

// ─── Bundle discounts ─────────────────────────────────────────────────────────

export const BUNDLE_DISCOUNTS = [
  { minServices: 2, percent: 10 },
  { minServices: 3, percent: 15 },
]

export function getBundleDiscount(serviceCount) {
  return [...BUNDLE_DISCOUNTS]
    .reverse()
    .find(d => serviceCount >= d.minServices) ?? null
}