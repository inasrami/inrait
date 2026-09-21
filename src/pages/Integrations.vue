<template>
  <div class="integrations-page">

    <section class="relative px-6 pt-24 pb-10 overflow-hidden integrations-hero">
      <div class="hero-glow" />
      <div class="max-w-[1080px] mx-auto relative z-10 text-center">
        <div class="services-kicker fade-up" style="transition-delay:0.02s;">{{ t('integrations.page.label') }}</div>
        <h1 class="font-display fade-up text-[clamp(40px,6vw,64px)] leading-none mb-4" style="letter-spacing:0.02em; transition-delay:0.05s;">
          {{ t('integrations.page.title') }}
        </h1>
        <p class="fade-up text-[15px] text-text-muted max-w-lg mx-auto leading-relaxed" style="font-weight:300; transition-delay:0.1s;">
          {{ t('integrations.page.body') }}
        </p>
      </div>
    </section>

    <section class="px-6 pb-24">
      <div class="max-w-[1080px] mx-auto">

        <div class="tabs-row fade-up">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            class="tab-btn"
            :class="{ 'tab-btn--active': activeCategory === cat.id }"
            @click="activeCategory = cat.id"
          >
            {{ cat.label }}
          </button>
        </div>

        <TransitionGroup name="chip-fade" tag="div" class="chips-grid fade-up" style="transition-delay:0.1s;">
          <span
            v-for="item in filteredItems"
            :key="item.name"
            class="integration-chip"
            :class="{ 'integration-chip--logo': hasLogo(item) }"
          >
            <span v-if="hasLogo(item)" class="chip-logo-wrap">
              <img :src="item.logo" :alt="item.name" loading="lazy" @error="onLogoError(item)" />
            </span>
            {{ item.name }}
          </span>
        </TransitionGroup>

        <p class="text-center text-[12px] text-text-dim mt-10 fade-up" style="transition-delay:0.2s;">
          {{ t('integrations.note') }}
          <RouterLink to="/contact" class="text-accent underline-offset-2 hover:underline" style="cursor: pointer;">{{ t('integrations.cta') }}</RouterLink>
        </p>

      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '../composables/useSeo.js'
import { useJsonLd, breadcrumbSchema } from '../composables/Usejsonld.js'
import { useFadeUp } from '../composables/useFadeUp'
import { useLanguage } from '../composables/useLanguage.js'

useFadeUp()
const { t } = useLanguage()

useSeo({
  title:       'Integrations',
  description: 'Every courier, payment gateway, ERP, marketing tool and sales channel INRAIT can connect your store or workflow to.',
  canonical:   '/integrations',
})
useJsonLd(breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Integrations', url: '/integrations' }]))

const CATEGORY_ORDER = ['all', 'delivery', 'payments', 'erp', 'marketing', 'distributors', 'chat', 'sales']

/* ------------------------------------------------------------------ */
/* Logos                                                               */
/* ------------------------------------------------------------------ */
// Domain used to fetch each company's icon. Fix any wrong ones here.
const DOMAINS = {
  // delivery
  'ACS':                   'acscourier.net',
  'BoxNow':                'boxnow.bg',
  'DHL':                   'dhl.com',
  'DPD':                   'dpd.com',
  'Econt':                 'econt.com',
  'Europut':               'europut.bg',
  'EuShipments':           'eushipments.com',
  'Glovo':                 'glovoapp.com',
  'Sameday':               'sameday.bg',
  'Speedex':               'speedex.gr',
  'Speedy':                'speedy.bg',

  // payments
  'Borica':                'borica.bg',
  'Epay':                  'epay.bg',
  'EveryPay':              'everypay.gr',
  'Fibank':                'fibank.bg',
  'KBC':                   'kbc.com',
  'Mokka':                 'mokka.bg',
  'Mypos':                 'mypos.com',
  'Newpay':                'newpay.bg',
  'PayPal':                'paypal.com',
  'Paysera':               'paysera.com',
  'Postbank':              'postbank.bg',
  'Settle':                'settle.eu',
  'Stripe':                'stripe.com',
  'TBI':                   'tbibank.bg',
  'UniCredit':             'unicreditbulbank.bg',

  // erp
  'Barsy':                 'barsy.bg',
  'Colibri':               'colibri.bg',
  'Gensoft':               'gensoft.bg',
  'Micro.bg':              'micro.bg',
  'Microinvest':           'microinvest.net',
  'Selmatic':              'selmatic.com',
  'Universum':             'universum.bg',
  'Versus':                'versus.bg',
  'Zeron':                 'zeron.bg',

  // marketing
  'AdScout':               'adscout.io',
  'ChannelSight':          'channelsight.com',
  'Facebook Pixel/CAPI':   'facebook.com',
  'Google Ads':            'ads.google.com',
  'Google Analytics':      'analytics.google.com',
  'Google Search Console': 'search.google.com',
  'Profitshare':           'profitshare.bg',
  'Retargeting Algolia':   'retargeting.biz',

  // distributors
  'Asbis':                 'asbis.com',
  'Polycomp':              'polycomp.bg',
  'Vali Computers':        'vali.bg',

  // chat
  'ClickDesk':             'clickdesk.com',
  'Freshdesk':             'freshdesk.com',
  'HubSpot':               'hubspot.com',
  'Intercom':              'intercom.com',
  'LiveChat':              'livechat.com',
  'PureChat':              'purechat.com',
  'Smartsupp':             'smartsupp.com',
  'Social Intents':        'socialintents.com',
  'Tawk.to':               'tawk.to',
  'Tidio':                 'tidio.com',
  'Zendesk':               'zendesk.com',

  // sales
  'eMAG':                  'emag.bg',
  'Glami':                 'glami.bg',
  'OLX':                   'olx.bg',
  'Pazaruvaj.com':         'pazaruvaj.com',
  'Skroutz':               'skroutz.gr',
}

// Optional: point a company at your own file (e.g. '/logos/econt.svg')
// and it will be used instead of the auto-fetched icon.
const LOGO_OVERRIDES = {
  // 'Econt': '/logos/econt.svg',
}

const faviconUrl = domain =>
  `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`

function logoFor(name) {
  if (LOGO_OVERRIDES[name]) return LOGO_OVERRIDES[name]
  return DOMAINS[name] ? faviconUrl(DOMAINS[name]) : null
}

/* ------------------------------------------------------------------ */
/* Items                                                               */
/* ------------------------------------------------------------------ */
const RAW_ITEMS = [
  { name: 'ACS',                     category: 'delivery' },
  { name: 'BoxNow',                  category: 'delivery' },
  { name: 'DHL',                     category: 'delivery' },
  { name: 'DPD',                     category: 'delivery' },
  { name: 'Econt',                   category: 'delivery' },
  { name: 'Europut',                 category: 'delivery' },
  { name: 'EuShipments',             category: 'delivery' },
  { name: 'Glovo',                   category: 'delivery' },
  { name: 'Sameday',                 category: 'delivery' },
  { name: 'Speedex',                 category: 'delivery' },
  { name: 'Speedy',                  category: 'delivery' },
  { name: 'Borica',                  category: 'payments' },
  { name: 'Epay',                    category: 'payments' },
  { name: 'EveryPay',                category: 'payments' },
  { name: 'Fibank',                  category: 'payments' },
  { name: 'KBC',                     category: 'payments' },
  { name: 'Mokka',                   category: 'payments' },
  { name: 'Mypos',                   category: 'payments' },
  { name: 'Newpay',                  category: 'payments' },
  { name: 'PayPal',                  category: 'payments' },
  { name: 'Paysera',                 category: 'payments' },
  { name: 'Postbank',                category: 'payments' },
  { name: 'Settle',                  category: 'payments' },
  { name: 'Stripe',                  category: 'payments' },
  { name: 'TBI',                     category: 'payments' },
  { name: 'UniCredit',               category: 'payments' },

  { name: 'Barsy',                   category: 'erp' },
  { name: 'Colibri',                 category: 'erp' },
  { name: 'Gensoft',                 category: 'erp' },
  { name: 'Micro.bg',                category: 'erp' },
  { name: 'Microinvest',             category: 'erp' },
  { name: 'Selmatic',                category: 'erp' },
  { name: 'Universum',               category: 'erp' },
  { name: 'Versus',                  category: 'erp' },
  { name: 'Zeron',                   category: 'erp' },

  { name: 'AdScout',                 category: 'marketing' },
  { name: 'ChannelSight',            category: 'marketing' },
  { name: 'Facebook Pixel/CAPI',     category: 'marketing' },
  { name: 'Google Ads',              category: 'marketing' },
  { name: 'Google Analytics',        category: 'marketing' },
  { name: 'Google Search Console',   category: 'marketing' },
  { name: 'Profitshare',             category: 'marketing' },
  { name: 'Retargeting Algolia',     category: 'marketing' },

  { name: 'Asbis',                   category: 'distributors' },
  { name: 'Polycomp',                category: 'distributors' },
  { name: 'Vali Computers',          category: 'distributors' },

  { name: 'ClickDesk',               category: 'chat' },
  { name: 'Freshdesk',               category: 'chat' },
  { name: 'HubSpot',                 category: 'chat' },
  { name: 'Intercom',                category: 'chat' },
  { name: 'LiveChat',                category: 'chat' },
  { name: 'PureChat',                category: 'chat' },
  { name: 'Smartsupp',               category: 'chat' },
  { name: 'Social Intents',          category: 'chat' },
  { name: 'Tawk.to',                 category: 'chat' },
  { name: 'Tidio',                   category: 'chat' },
  { name: 'Zendesk',                 category: 'chat' },

  { name: 'eMAG',                    category: 'sales' },
  { name: 'Glami',                   category: 'sales' },
  { name: 'OLX',                     category: 'sales' },
  { name: 'Pazaruvaj.com',           category: 'sales' },
  { name: 'Skroutz',                 category: 'sales' },
]

const ITEMS = RAW_ITEMS.map(item => ({ ...item, logo: logoFor(item.name) }))

const activeCategory = ref('all')

const categories = computed(() =>
  CATEGORY_ORDER.map(id => ({ id, label: t(`integrations.categories.${id}`) }))
)

const filteredItems = computed(() =>
  activeCategory.value === 'all'
    ? ITEMS
    : ITEMS.filter(item => item.category === activeCategory.value)
)

// Companies whose logo failed to load fall back to a plain text chip
const failedLogos = reactive(new Set())
const hasLogo = item => !!item.logo && !failedLogos.has(item.name)
function onLogoError(item) {
  failedLogos.add(item.name)
}
</script>

<style scoped>
.integrations-page { min-height: 100vh; }
.integrations-hero { border-bottom: 1px solid var(--border); }
.services-kicker { margin-bottom: 14px; color: var(--accent); font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; }

.tabs-row {
  display: flex; flex-wrap: wrap; gap: 8px;
  justify-content: center; margin: 28px 0 28px;
}

.tab-btn {
  padding: 8px 16px; border-radius: 100px;
  border: 1px solid var(--border-strong); background: transparent;
  color: var(--text-muted); font-size: 12px; font-weight: 600;
  white-space: nowrap; cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
.tab-btn:hover { color: var(--text); border-color: rgba(164,224,75,0.35); }
.tab-btn--active { background: var(--accent); border-color: var(--accent); color: #000; }

.chips-grid {
  display: flex; flex-wrap: wrap; gap: 8px;
  justify-content: center;
}

.integration-chip {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 16px; border-radius: 100px;
  border: 1px solid var(--border); background: rgba(255,255,255,0.025);
  color: var(--text-muted); font-size: 12.5px; font-weight: 500;
  transition: color 0.18s ease, background 0.18s ease, border-color 0.18s ease;
}
.integration-chip--logo { padding-left: 6px; }
.integration-chip:hover { color: var(--text); background: rgba(255,255,255,0.06); border-color: var(--border-strong); }

.chip-logo-wrap {
  width: 22px; height: 22px; border-radius: 6px; flex-shrink: 0;
  background: #fff; display: flex; align-items: center; justify-content: center;
  padding: 3px; overflow: hidden;
}
.chip-logo-wrap img { max-width: 100%; max-height: 100%; object-fit: contain; }

.chip-fade-enter-active, .chip-fade-leave-active { transition: opacity 0.2s ease; }
.chip-fade-enter-from, .chip-fade-leave-to { opacity: 0; }
.chip-fade-leave-active { position: absolute; }
</style>