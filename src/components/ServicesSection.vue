<template>
  <section id="services" class="services-section px-6">
    <div class="services-container">
      <header class="services-heading">
        <div>
          <p class="section-kicker">{{ t('services.label') }}</p>
          <h2 class="font-display">{{ t('services.title') }}</h2>
        </div>
        <RouterLink :to="localizedPath('/services')" class="catalogue-link">
          {{ t('services.viewAll') }}
        </RouterLink>
      </header>

      <div class="service-grid">
        <article v-for="service in topServices" :key="service.id" class="service-card">
          <h3>{{ service.title }}</h3>
          <p class="service-description">{{ service.body }}</p>
          <p class="service-price">
            {{ t('services.from') }} <strong>€{{ service.basePrice.toLocaleString() }}</strong>
            <span v-if="service.priceUnit === 'month'"> {{ t('servicesPage.perMonth') }}</span>
          </p>
          <button
            type="button"
            class="details-button"
            :aria-expanded="expandedId === service.id"
            :aria-controls="`service-details-${service.id}`"
            @click="toggleDetails(service.id)"
          >
            {{ expandedId === service.id ? t('services.hideDetails') : t('services.details') }}
          </button>
          <div v-show="expandedId === service.id" :id="`service-details-${service.id}`" class="service-details">
            <ul>
              <li v-for="item in service.deliverables.slice(0, 3)" :key="item">{{ item }}</li>
            </ul>
            <RouterLink :to="{ path: localizedPath('/contact'), query: { services: service.id } }" class="quote-link">
              {{ t('services.quote') }}
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'
import { useServices } from '../data/services.js'

const { t, localizedPath } = useLanguage()
const { SERVICES } = useServices()
const expandedId = ref(null)

const featuredServiceIds = ['website', 'booking', 'automation']
const topServices = computed(() => featuredServiceIds.map(id => SERVICES.value.find(service => service.id === id)).filter(Boolean))

function toggleDetails(id) {
  expandedId.value = expandedId.value === id ? null : id
}
</script>

<style scoped>
.services-section { padding-top: 52px; padding-bottom: 56px; background: var(--surface); }
.services-container { max-width: 1080px; margin: 0 auto; }
.services-heading { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 22px; }
.section-kicker { margin: 0 0 6px; color: var(--accent); font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.services-heading h2 { font-size: clamp(30px, 5vw, 44px); font-weight: 400; letter-spacing: 0.02em; line-height: 1.05; }
.catalogue-link { flex: 0 0 auto; color: var(--text-muted); font-size: 13px; font-weight: 600; text-decoration: underline; text-underline-offset: 4px; }
.catalogue-link:hover { color: var(--accent); }
.service-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.service-card { display: flex; min-width: 0; flex-direction: column; padding: 20px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 10px; }
.service-card h3 { margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; }
.service-description { min-height: 42px; margin: 8px 0 16px; color: var(--text-muted); font-size: 13px; line-height: 1.55; }
.service-price { margin: auto 0 14px; color: var(--text-dim); font-size: 12px; }
.service-price strong { color: var(--text-primary); font-size: 14px; }
.details-button { width: 100%; padding: 9px 12px; color: var(--text-primary); font-size: 13px; font-weight: 600; background: transparent; border: 1px solid var(--border-strong); border-radius: 6px; cursor: pointer; }
.details-button:hover, .details-button[aria-expanded="true"] { color: var(--accent); border-color: var(--accent); }
.service-details { padding-top: 14px; }
.service-details ul { display: grid; gap: 8px; margin: 0 0 14px; padding: 0; list-style: none; }
.service-details li { position: relative; padding-left: 14px; color: var(--text-muted); font-size: 12px; line-height: 1.45; }
.service-details li::before { position: absolute; left: 0; color: var(--accent); content: '•'; }
.quote-link { display: inline-flex; min-height: 38px; align-items: center; padding: 0 12px; color: #000; font-size: 12px; font-weight: 700; background: var(--accent); border-radius: 5px; }
.quote-link:hover { background: #b7ee65; }
@media (max-width: 760px) {
  .service-grid { grid-template-columns: 1fr; }
  .service-description { min-height: 0; }
}
@media (max-width: 480px) {
  .services-heading { align-items: flex-start; flex-direction: column; }
  .services-section { padding-top: 42px; padding-bottom: 44px; }
}
</style>
