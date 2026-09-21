<template>
  <section class="relative px-6 py-20 overflow-hidden">
    <div class="max-w-[1080px] mx-auto">

      <div class="mb-10 text-center">
        <div class="services-kicker fade-up">{{ t('integrations.landing.label') }}</div>
        <h2 class="font-display fade-up text-[clamp(30px,4vw,44px)] leading-tight mb-4" style="letter-spacing:0.02em; transition-delay:0.05s;">
          {{ t('integrations.landing.title') }}
        </h2>
        <p class="fade-up text-[14px] text-text-muted max-w-lg mx-auto leading-relaxed" style="font-weight:300; transition-delay:0.1s;">
          {{ t('integrations.landing.body') }}
        </p>
      </div>

      <div class="chips-grid fade-up" style="transition-delay:0.15s;">
        <span
          v-for="item in BG_ITEMS"
          :key="item.name"
          class="integration-chip"
          :class="{ 'integration-chip--logo': hasLogo(item) }"
        >
          <span v-if="hasLogo(item)" class="chip-logo-wrap">
            <img :src="item.logo" :alt="item.name" loading="lazy" @error="onLogoError(item)" />
          </span>
          {{ item.name }}
        </span>
      </div>

      <div class="mt-10 text-center fade-up" style="transition-delay:0.2s;">
        <RouterLink to="/integrations" class="see-more-btn">
          {{ t('integrations.landing.seeMore') }}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useFadeUp } from '../composables/useFadeUp'
import { useLanguage } from '../composables/useLanguage.js'

useFadeUp()
const { t } = useLanguage()

// Domain used to fetch each company's icon. Fix any wrong ones here.
const DOMAINS = {
  'Econt':         'econt.com',
  'Speedy':        'speedy.bg',
  'Borica':        'borica.bg',
  'Epay':          'epay.bg',
  'Fibank':        'fibank.bg',
  'Postbank':      'postbank.bg',
  'Microinvest':   'microinvest.net',
  'Pazaruvaj.com': 'pazaruvaj.com',
}

// Optional: use your own file instead (e.g. '/logos/econt.svg')
const LOGO_OVERRIDES = {
  // 'Econt': '/logos/econt.svg',
}

const faviconUrl = domain =>
  `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`

function logoFor(name) {
  if (LOGO_OVERRIDES[name]) return LOGO_OVERRIDES[name]
  return DOMAINS[name] ? faviconUrl(DOMAINS[name]) : null
}

const BG_ITEMS = [
  { name: 'Econt' },
  { name: 'Speedy' },
  { name: 'Borica' },
  { name: 'Epay' },
  { name: 'Fibank' },
  { name: 'Postbank' },
  { name: 'Microinvest' },
  { name: 'Pazaruvaj.com' },
].map(item => ({ ...item, logo: logoFor(item.name) }))

// Companies whose logo failed to load fall back to a plain text chip
const failedLogos = reactive(new Set())
const hasLogo = item => !!item.logo && !failedLogos.has(item.name)
function onLogoError(item) {
  failedLogos.add(item.name)
}
</script>

<style scoped>
.services-kicker { margin-bottom: 14px; color: var(--accent); font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; }

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

.see-more-btn {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid var(--border-strong); border-radius: 100px;
  padding: 11px 20px; font-size: 13px; font-weight: 600;
  color: var(--text-muted); background: transparent; cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
.see-more-btn:hover { color: #000; background: var(--accent); border-color: var(--accent); }
</style>