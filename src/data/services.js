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
}

const ADDON_PRICES = {
  website:     [199.99, 149.99, 179.99, 99.99, 99.99],
  booking:     [249.99, 199.99, 149.99, 349.99, 179.99],
  ecommerce:   [199.99, 249.99, 179.99, 219.99, 159.99],
  automation:  [199.99, 179.99, 219.99, 249.99, 149.99],
  identity:    [149.99, 179.99, 119.99, 299.99, 249.99],
}

const BASE_PRICES = {
  website:     899.99,
  booking:     1199.99,
  ecommerce:   1999.99,
  automation:  599.99,
  identity:    449.99,
}

const HERO_FLAGS = {
  website:     true,
  booking:     true,
  ecommerce:   false,
  automation:  true,
  identity:    false,
}

const ICONS = {
  website:     '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  booking:     '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  ecommerce:   '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.97 1.61h9.72a2 2 0 001.97-1.61L23 6H6"/>',
  automation:  '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  identity:    '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
}


const SERVICE_KEYS = ['website', 'booking', 'ecommerce', 'automation', 'identity']

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