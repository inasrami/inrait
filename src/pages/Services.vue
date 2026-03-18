<template>
  <div class="services-page">

    <!-- Hero -->
    <section class="relative px-6 pt-40 pb-20 overflow-hidden">
      <div class="hero-glow" />
      <div class="max-w-[1080px] mx-auto relative z-10 text-center">
        <div class="mb-5 section-label fade-up" style="justify-content:center;">{{ t('servicesPage.label') }}</div>
        <h1 class="font-display fade-up text-[clamp(64px,12vw,130px)] leading-none mb-6"
          style="letter-spacing:0.02em; transition-delay:0.05s;">
          {{ t('servicesPage.title') }}
        </h1>
        <p class="fade-up text-[17px] text-text-muted max-w-xl mx-auto leading-relaxed mb-8"
          style="font-weight:300; transition-delay:0.1s;">
          {{ t('servicesPage.selectServices') }} {{ t('servicesPage.combineServices') }}
        </p>

        <!-- Pricing disclaimer -->
        <div class="disclaimer-box fade-up" style="transition-delay:0.18s;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:1px;">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p class="text-[13px] text-text-muted leading-relaxed text-left">
            <strong class="text-text-main">{{ t('servicesPage.disclaimerStrong') }}</strong>
            {{ t('servicesPage.disclaimerBody') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Bundle discount banner -->
    <Transition name="banner">
      <div v-if="selectedServices.length >= 2" class="discount-banner">
        <div class="max-w-[1080px] mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-3">
            <div class="banner-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <div class="font-semibold text-[15px] text-black leading-tight">
                {{ currentDiscount.label }} {{ t('servicesPage.bannerLabel') }}
              </div>
              <div class="text-[12px] text-black/60">
                {{ selectedServices.length >= 3 ? t('servicesPage.bannerMax') : t('servicesPage.bannerNext') }}
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[13px] text-black/45 line-through">€{{ subtotal.toLocaleString() }}</span>
            <span class="font-display text-[30px] text-black leading-none" style="letter-spacing:0.02em;">
              €{{ discountedTotal.toLocaleString() }}
            </span>
            <span class="banner-pct">-{{ currentDiscount.percent }}%</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Services grid -->
    <section class="px-6 pb-8">
      <div class="max-w-[1080px] mx-auto">
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div
            v-for="(service, i) in SERVICES"
            :key="service.id"
            class="service-card card-entrance"
            :class="{ 'service-card--selected': isSelected(service.id) }"
            :style="`animation-delay: ${i * 0.07}s`"
          >

            <!-- Card header -->
            <div class="card-header" @click="toggleService(service.id)" data-cursor>

              <Transition name="badge">
                <div v-if="isSelected(service.id)" class="selected-badge">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {{ t('servicesPage.added') }}
                </div>
              </Transition>

              <div class="flex items-start flex-1 min-w-0 gap-4">
                <div class="svc-icon" :class="{ 'svc-icon--on': isSelected(service.id) }">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                    :stroke="isSelected(service.id) ? '#000' : 'var(--accent)'"
                    stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <g v-html="service.icon" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2 mb-1">
                    <h3 class="font-semibold text-[18px]" style="letter-spacing:-0.02em;">{{ service.title }}</h3>
                    <span class="svc-tag">{{ service.tag }}</span>
                  </div>
                  <p class="text-text-muted text-[13px] leading-relaxed">{{ service.body }}</p>
                </div>
              </div>

              <div class="select-toggle" :class="{ 'select-toggle--on': isSelected(service.id) }">
                <svg v-if="isSelected(service.id)" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
            </div>

            <!-- Deliverables -->
            <div class="px-6 pb-4">
              <ul class="grid grid-cols-2 gap-x-4 gap-y-2">
                <li v-for="item in service.deliverables" :key="item"
                  class="flex items-start gap-2 text-[12px] text-text-muted">
                  <svg class="flex-shrink-0 mt-[2px]" width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {{ item }}
                </li>
              </ul>
            </div>

            <!-- Price row + add-ons toggle -->
            <div class="price-row" @click.stop>
              <div>
                <div class="price-label-sm">{{ t('servicesPage.basePrice') }}</div>
                <div class="font-display text-[32px] leading-none" style="letter-spacing:0.02em; color:var(--accent);">
                  €{{ service.basePrice.toLocaleString() }}
                </div>
              </div>
              <button
                class="addon-toggle"
                :class="{ 'addon-toggle--open': openAddons === service.id }"
                @click.stop="toggleAddons(service.id)"
                style="cursor:none;"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                {{ t('servicesPage.addons') }}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                  class="chevron" :class="{ 'chevron--open': openAddons === service.id }">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
            </div>

            <!-- Add-ons drawer -->
            <Transition name="drawer">
              <div v-if="openAddons === service.id" class="addons-drawer" @click.stop>
                <div class="addons-header">{{ t('servicesPage.addonsTitle') }}</div>
                <div class="flex flex-col gap-1.5">
                  <div
                    v-for="addon in service.addons"
                    :key="addon.id"
                    class="addon-row"
                    :class="{ 'addon-row--checked': isAddonSelected(addon.id) }"
                    @click.stop="toggleAddon(addon.id, service.id)"
                    style="cursor:none;"
                  >
                    <div class="addon-check" :class="{ 'addon-check--on': isAddonSelected(addon.id) }">
                      <svg v-if="isAddonSelected(addon.id)" width="9" height="9" viewBox="0 0 24 24" fill="none"
                        stroke="#000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <span class="addon-label">{{ addon.label }}</span>
                    <span class="addon-price">+€{{ addon.price }}</span>
                  </div>
                </div>
              </div>
            </Transition>

          </div>
        </div>
      </div>
    </section>

    <!-- Pricing disclaimer at bottom -->
    <div class="max-w-[1080px] mx-auto px-6 mb-10">
      <div class="bottom-disclaimer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span class="text-[12px] text-text-dim leading-relaxed">
          {{ t('servicesPage.bottomNote') }}
          <RouterLink to="/contact" class="text-accent underline-offset-2 hover:underline" style="cursor:none;">{{ t('servicesPage.bookCall') }}</RouterLink>
        </span>
      </div>
    </div>

    <!-- Sticky quote bar -->
    <Transition name="quotebar">
      <div v-if="hasSelection" class="quote-bar">
        <div class="max-w-[1080px] mx-auto px-6 flex items-center justify-between flex-wrap gap-4">

          <div class="flex flex-wrap items-center gap-3">
            <span
              v-for="id in selectedServices"
              :key="id"
              class="summary-chip"
            >
              {{ serviceById(id).title }}
              <button @click.stop="toggleService(id)" class="chip-remove" style="cursor:none;">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </span>
            <span v-if="selectedAddons.length > 0" class="addon-count-chip">
              +{{ selectedAddons.length }} {{ t('servicesPage.addons') }}
            </span>
          </div>

          <div class="flex items-center gap-4">
            <div class="text-right">
              <div v-if="currentDiscount" class="flex items-center gap-2 justify-end mb-0.5">
                <span class="text-[11px] text-text-dim line-through">€{{ subtotal.toLocaleString() }}</span>
                <span class="discount-badge">-{{ currentDiscount.percent }}%</span>
              </div>
              <div class="font-display text-[28px] leading-none text-accent" style="letter-spacing:0.02em;">
                ~€{{ discountedTotal.toLocaleString() }}
              </div>
              <div class="text-[9px] text-text-dim mt-0.5 uppercase tracking-widest">{{ t('servicesPage.estimate') }}</div>
            </div>
            <RouterLink to="/contact" class="btn-primary text-[13px] py-3 px-6" style="cursor:none;">
              {{ t('servicesPage.getQuote') }}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </RouterLink>
          </div>

        </div>
      </div>
    </Transition>

    <div :style="hasSelection ? 'height: 96px' : 'height: 40px'" />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '../composables/useSeo.js'
import { useJsonLd, breadcrumbSchema, serviceListSchema } from '../composables/useJsonLd.js'
import { SERVICES, getBundleDiscount } from '../data/services.js'
import { useFadeUp } from '../composables/useFadeUp'
import { useLanguage } from '../composables/useLanguage.js'

useFadeUp()
const { t } = useLanguage()

useSeo({
  title:       'Services & Pricing',
  description: 'Web engineering, booking systems, e-commerce, automation, design and photography — view all INRAIT services and build your custom package.',
  canonical:   '/services',
})
useJsonLd([
  breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]),
  serviceListSchema(SERVICES),
])

const selectedServices = ref([])
const selectedAddons   = ref([])
const openAddons       = ref(null)

function isSelected(id)      { return selectedServices.value.includes(id) }
function isAddonSelected(id) { return selectedAddons.value.includes(id) }
function serviceById(id)     { return SERVICES.find(s => s.id === id) }

function toggleService(id) {
  if (isSelected(id)) {
    selectedServices.value = selectedServices.value.filter(s => s !== id)
    const addonIds = serviceById(id).addons.map(a => a.id)
    selectedAddons.value = selectedAddons.value.filter(a => !addonIds.includes(a))
    if (openAddons.value === id) openAddons.value = null
  } else {
    selectedServices.value = [...selectedServices.value, id]
  }
}

function toggleAddon(addonId, serviceId) {
  if (!isSelected(serviceId)) {
    selectedServices.value = [...selectedServices.value, serviceId]
  }
  if (isAddonSelected(addonId)) {
    selectedAddons.value = selectedAddons.value.filter(a => a !== addonId)
  } else {
    selectedAddons.value = [...selectedAddons.value, addonId]
  }
}

function toggleAddons(id) {
  openAddons.value = openAddons.value === id ? null : id
}

const subtotal = computed(() => {
  let total = 0
  selectedServices.value.forEach(id => { total += serviceById(id).basePrice })
  SERVICES.forEach(svc => {
    svc.addons.forEach(addon => {
      if (isAddonSelected(addon.id)) total += addon.price
    })
  })
  return total
})

const currentDiscount  = computed(() => getBundleDiscount(selectedServices.value.length))
const discountedTotal  = computed(() => {
  if (!currentDiscount.value) return subtotal.value
  return subtotal.value - Math.round(subtotal.value * currentDiscount.value.percent / 100)
})
const hasSelection = computed(() =>
  selectedServices.value.length > 0 || selectedAddons.value.length > 0
)
</script>

<style scoped>
.services-page { min-height: 100vh; }

.disclaimer-box {
  display: inline-flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 560px;
  margin: 0 auto;
  padding: 16px 20px;
  border-radius: 14px;
  border: 1px solid rgba(164,224,75,0.15);
  background: rgba(164,224,75,0.04);
  text-align: left;
}

.discount-banner {
  position: sticky;
  top: 56px;
  z-index: 40;
  background: var(--accent);
  padding: 13px 0;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.banner-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.banner-pct {
  font-size: 11px;
  font-weight: 800;
  color: rgba(0,0,0,0.7);
  background: rgba(0,0,0,0.1);
  border-radius: 100px;
  padding: 3px 8px;
  letter-spacing: 0.04em;
}

.banner-enter-active, .banner-leave-active {
  transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
}
.banner-enter-from, .banner-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card-entrance {
  opacity: 0;
  animation: cardIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.service-card {
  border-radius: 20px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.018);
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.service-card--selected {
  border-color: rgba(164,224,75,0.38);
  box-shadow: 0 0 0 1px rgba(164,224,75,0.1), 0 16px 48px rgba(0,0,0,0.35);
}

.selected-badge {
  position: absolute;
  top: 18px;
  right: 60px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px 4px 8px;
  border-radius: 100px;
  background: var(--accent);
  font-size: 11px;
  font-weight: 700;
  color: #000;
  letter-spacing: 0.02em;
  pointer-events: none;
}

.badge-enter-active, .badge-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.badge-enter-from, .badge-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.card-header {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 26px 22px 18px;
  user-select: none;
  cursor: none;
  transition: background 0.2s ease;
}

.card-header:hover { background: rgba(255,255,255,0.02); }

.svc-icon {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(164,224,75,0.07);
  border: 1px solid rgba(164,224,75,0.18);
  flex-shrink: 0;
  margin-top: 2px;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.svc-icon--on {
  background: var(--accent);
  border-color: var(--accent);
}

.svc-tag {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  background: rgba(164,224,75,0.08);
  border: 1px solid rgba(164,224,75,0.18);
  border-radius: 100px;
  padding: 3px 9px;
  white-space: nowrap;
}

.select-toggle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.2s ease, border-color 0.2s ease;
  margin-top: 2px;
}

.select-toggle--on {
  background: var(--accent);
  border-color: var(--accent);
}

.price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 22px;
  border-top: 1px solid var(--border);
}

.price-label-sm {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-dim);
  margin-bottom: 3px;
}

.addon-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  border: 1px solid var(--border-strong);
  border-radius: 100px;
  padding: 7px 14px;
  background: transparent;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  cursor: none;
}

.addon-toggle:hover,
.addon-toggle--open {
  color: var(--accent);
  border-color: rgba(164,224,75,0.35);
  background: rgba(164,224,75,0.04);
}

.chevron { transition: transform 0.25s ease; }
.chevron--open { transform: rotate(180deg); }

.addons-drawer {
  padding: 18px 22px 20px;
  background: rgba(255,255,255,0.018);
  border-top: 1px solid var(--border);
}

.addons-header {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 12px;
}

.addon-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: background 0.18s ease, border-color 0.18s ease;
  cursor: none;
}

.addon-row:hover { background: rgba(255,255,255,0.03); }

.addon-row--checked {
  background: rgba(164,224,75,0.05);
  border-color: rgba(164,224,75,0.2);
}

.addon-check {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 1.5px solid rgba(255,255,255,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.18s ease, border-color 0.18s ease;
}

.addon-check--on {
  background: var(--accent);
  border-color: var(--accent);
}

.addon-label {
  flex: 1;
  font-size: 13px;
  color: var(--text-muted);
  transition: color 0.18s ease;
}

.addon-row--checked .addon-label { color: var(--text); }

.addon-price {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  flex-shrink: 0;
}

.drawer-enter-active, .drawer-leave-active {
  transition: opacity 0.25s ease, max-height 0.3s cubic-bezier(0.16,1,0.3,1);
  overflow: hidden;
  max-height: 500px;
}
.drawer-enter-from, .drawer-leave-to {
  opacity: 0;
  max-height: 0 !important;
}

.bottom-disclaimer {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.01);
}

.quote-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(8,8,8,0.94);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid var(--border-strong);
  padding: 14px 0;
}

.quotebar-enter-active, .quotebar-leave-active {
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
.quotebar-enter-from, .quotebar-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.summary-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-strong);
  border-radius: 100px;
  padding: 5px 8px 5px 12px;
}

.addon-count-chip {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  background: rgba(164,224,75,0.08);
  border: 1px solid rgba(164,224,75,0.2);
  border-radius: 100px;
  padding: 4px 10px;
}

.chip-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(255,255,255,0.07);
  border: none;
  color: var(--text-muted);
  transition: background 0.18s ease, color 0.18s ease;
  cursor: none;
}

.chip-remove:hover {
  background: rgba(255,80,80,0.15);
  color: #ff6060;
}

.discount-badge {
  font-size: 10px;
  font-weight: 700;
  color: var(--accent);
  background: rgba(164,224,75,0.1);
  border: 1px solid rgba(164,224,75,0.22);
  border-radius: 100px;
  padding: 2px 7px;
  letter-spacing: 0.04em;
}
</style>