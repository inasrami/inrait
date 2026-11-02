<template>
  <section class="faq-section px-6">
    <div class="faq-container">
      <h2 class="font-display">{{ t('faq.title') }}</h2>
      <div class="faq-list">
        <div v-for="(item, i) in items" :key="i" class="faq-item">
          <button
            class="faq-trigger"
            :aria-expanded="open === i"
            :aria-controls="`faq-answer-${i}`"
            @click="toggle(i)"
          >
            <span>{{ item.q }}</span>
            <svg
              class="faq-icon"
              :class="{ 'faq-icon--open': open === i }"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div v-show="open === i" :id="`faq-answer-${i}`" class="faq-answer">
            <p>{{ item.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLanguage } from '../composables/useLanguage.js'

const { t } = useLanguage()
const open = ref(null)
const items = computed(() => t('faq.items'))

function toggle(index) {
  open.value = open.value === index ? null : index
}
</script>

<style scoped>
.faq-section { padding-top: 52px; padding-bottom: 56px; }
.faq-container { max-width: 780px; margin: 0 auto; }
.faq-container > h2 { margin: 0 0 24px; font-size: clamp(36px, 6vw, 56px); font-weight: 400; letter-spacing: 0.02em; line-height: 1.05; }
.faq-list { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.faq-item + .faq-item { border-top: 1px solid var(--border); }
.faq-trigger { display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 18px; padding: 16px 0; color: var(--text-primary); text-align: left; background: transparent; border: 0; cursor: pointer; }
.faq-trigger > span { font-size: 15px; font-weight: 600; line-height: 1.4; }
.faq-trigger:hover > span { color: var(--accent); }
.faq-icon { flex: 0 0 auto; color: var(--text-muted); transition: transform 0.18s ease, color 0.18s ease; }
.faq-icon--open { color: var(--accent); transform: rotate(180deg); }
.faq-answer { padding: 0 32px 16px 0; }
.faq-answer p { max-width: 640px; margin: 0; color: var(--text-muted); font-size: 14px; line-height: 1.55; }
@media (max-width: 560px) {
  .faq-section { padding-top: 40px; padding-bottom: 44px; }
  .faq-trigger > span { font-size: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .faq-icon { transition: none; }
}
</style>
