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