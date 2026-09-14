<template>
  <div class="notfound">
    <div class="hero-glow" />

    <div class="max-w-[1080px] mx-auto px-6 text-center relative z-10">

      <!-- Big 404 -->
      <div class="font-display notfound-num">404</div>

      <h1 class="font-display text-[clamp(36px,6vw,64px)] mb-6 leading-none" style="letter-spacing:0.02em;">
        {{ t('notFound.title') }}
      </h1>

      <p class="text-text-muted text-[17px] max-w-md mx-auto leading-relaxed mb-12" style="font-weight:300;">
        {{ t('notFound.sub') }}
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4">
        <RouterLink to="/" class="btn-primary px-8 py-4 text-[15px]">
          {{ t('notFound.home') }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
        <RouterLink to="/contact" class="btn-outline px-8 py-4 text-[15px]">
          {{ t('notFound.contact') }}
        </RouterLink>
      </div>

      <!-- Primary recovery links -->
      <div class="recovery-links">
        <RouterLink to="/services" class="recovery-link">
          <span class="recovery-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
            </svg>
          </span>
          <span>{{ t('nav.services') }}</span>
          <svg class="recovery-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </RouterLink>
        <RouterLink to="/#work" class="recovery-link">
          <span class="recovery-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
            </svg>
          </span>
          <span>{{ t('nav.work') }}</span>
          <svg class="recovery-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </RouterLink>
        <RouterLink to="/contact" class="recovery-link">
          <span class="recovery-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
            </svg>
          </span>
          <span>{{ t('nav.letsTalk') }}</span>
          <svg class="recovery-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useSeo } from '../composables/useSeo.js'
import { useLanguage } from '../composables/useLanguage.js'

const { t } = useLanguage()

useSeo({
  title:       '404 - Page Not Found',
  description: 'The page you are looking for does not exist. Return to the INRAIT homepage.',
  canonical:   '/404',
})

</script>

<style scoped>
.notfound {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
}

.notfound-num {
  font-size: clamp(160px, 28vw, 320px);
  line-height: 1;
  letter-spacing: 0.02em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(164,224,75,0.15);
  margin-bottom: -20px;
  user-select: none;
  pointer-events: none;
}

.recovery-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  max-width: 720px;
  margin: 72px auto 0;
  border-top: 1px solid var(--border-strong);
  border-bottom: 1px solid var(--border-strong);
}

.recovery-link {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  padding: 16px 14px;
  color: var(--text-muted);
  font-size: 13px;
  text-align: left;
  transition: color 0.2s ease, background 0.2s ease;
}

.recovery-link + .recovery-link { border-left: 1px solid var(--border); }
.recovery-link:hover { color: var(--text); background: rgba(164,224,75,0.05); }
.recovery-icon { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; flex-shrink: 0; color: var(--accent); background: rgba(164,224,75,0.07); border: 1px solid rgba(164,224,75,0.18); border-radius: 10px; }
.recovery-arrow { margin-left: auto; color: var(--text-dim); transition: color 0.2s ease, transform 0.2s ease; }
.recovery-link:hover .recovery-arrow { color: var(--accent); transform: translateX(3px); }

@media (max-width: 640px) {
  .recovery-links { grid-template-columns: 1fr; margin-top: 56px; }
  .recovery-link + .recovery-link { border-top: 1px solid var(--border); border-left: 0; }
}
</style>