<template>
  <section class="relative px-6 py-32 overflow-hidden">

    <div class="max-w-[780px] mx-auto">

      <h2 class="font-display fade-up text-[clamp(48px,8vw,80px)] mb-16"
        style="letter-spacing:0.02em; line-height:1; transition-delay:0.05s;">
        {{ t('faq.title') }}
      </h2>

      <div class="flex flex-col divide-y" style="border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="faq-item fade-up"
          :style="`transition-delay: ${i * 0.06}s`"
        >
          <button
            class="faq-trigger"
            @click="toggle(i)"
            :aria-expanded="open === i"
            style="cursor: pointer;"
          >
            <span class="faq-q">{{ item.q }}</span>
            <span class="faq-icon" :class="{ 'faq-icon--open': open === i }">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </span>
          </button>

          <Transition name="faq-body">
            <div v-if="open === i" class="faq-answer">
              <p>{{ item.a }}</p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- CTA below -->
      <div class="flex flex-wrap items-center justify-between gap-6 p-8 mt-14 fade-up rounded-2xl"
        style="background: rgba(164,224,75,0.04); border: 1px solid rgba(164,224,75,0.18);">
        <div>
          <p class="font-semibold text-[17px] mb-1">{{ t('faq.ctaTitle') }}</p>
          <p class="text-text-muted text-[14px]">{{ t('faq.ctaSub') }}</p>
        </div>
        <RouterLink to="/contact" class="btn-primary text-[14px] px-7 py-4 flex-shrink-0" style="cursor: pointer;">
          {{ t('cta.start') }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'
import { useFadeUp } from '../composables/useFadeUp.js'

useFadeUp()
const { t } = useLanguage()

const open  = ref(null)
const items = computed(() => t('faq.items'))

function toggle(i) {
  open.value = open.value === i ? null : i
}
</script>

<style scoped>
.faq-item { border-color: var(--border); }

.faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 22px 0;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: color 0.2s ease;
}

.faq-trigger:hover .faq-q { color: var(--accent); }

.faq-q {
  font-size: clamp(15px, 2vw, 18px);
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.faq-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
              background 0.2s ease,
              border-color 0.2s ease,
              color 0.2s ease;
}

.faq-icon--open {
  transform: rotate(180deg);
  background: var(--accent);
  border-color: var(--accent);
  color: #000;
}

.faq-answer {
  overflow: hidden;
  padding-bottom: 22px;
}

.faq-answer p {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.8;
  max-width: 640px;
}

.faq-body-enter-active,
.faq-body-leave-active {
  transition: max-height 0.38s cubic-bezier(0.16,1,0.3,1),
              opacity 0.28s ease;
  max-height: 400px;
  overflow: hidden;
}

.faq-body-enter-from,
.faq-body-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>