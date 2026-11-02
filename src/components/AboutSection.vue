<template>
  <section id="about" ref="section" class="about-section">
    <div class="about-layout" :class="{ 'about-layout--visible': hasEntered }">
      <div class="about-brand">
        <img
          class="about-logo"
          src="/images/WhiteLogo.webp"
          alt="INRAIT"
          width="1365"
          height="1290"
        />
        <span class="about-caption">{{ t('about.caption') }}</span>
      </div>

      <div class="about-content">
        <p class="about-eyebrow">{{ t('about.label') }}</p>
        <h2 class="about-heading">
          <span v-for="line in headlineLines" :key="line" class="about-heading-line">{{ line }}</span>
        </h2>
        <p class="about-intro">{{ t('about.statement') }}</p>

        <ul class="about-benefits">
          <li v-for="(benefit, index) in benefits" :key="benefit.title" class="about-benefit">
            <span class="about-icon" aria-hidden="true">
              <svg v-if="index === 0" viewBox="0 0 24 24" fill="none">
                <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-6.5A7.5 7.5 0 1 1 20 11.5Z" />
                <path d="M8 11h8M8 14h5" />
              </svg>
              <svg v-else-if="index === 1" viewBox="0 0 24 24" fill="none">
                <path d="M8 4h8a2 2 0 0 1 2 2v15H6V6a2 2 0 0 1 2-2Z" />
                <path d="M9 4.5V3h6v1.5M9 10l1.5 1.5L13 9M9 16l1.5 1.5L13 14M15.5 10H17M15.5 16H17" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none">
                <circle cx="8" cy="15.5" r="4.5" />
                <path d="m11.2 12.3 7.3-7.3 2.8 2.8-2 2-1.5-1.5-2 2 1.5 1.5-2.8 2.8M8 15.5h.01" />
              </svg>
            </span>
            <span class="about-benefit-copy">
              <span class="about-benefit-title">{{ benefit.title }}</span>
              <span class="about-benefit-body">{{ benefit.body }}</span>
            </span>
          </li>
        </ul>

        <RouterLink class="about-contact-link" :to="localizedPath('/contact')">
          {{ t('about.contactLink') }} <span aria-hidden="true">↗</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'

const { t, localizedPath } = useLanguage()
const section = ref(null)
const hasEntered = ref(false)
const benefits = computed(() => t('about.benefits'))
const headlineLines = computed(() => t('about.headline').split('\n'))
let observer

onMounted(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      hasEntered.value = true
      observer.disconnect()
    }
  }, { threshold: 0.15 })

  if (section.value) observer.observe(section.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.about-section {
  padding: clamp(72px, 9vw, 124px) 24px;
  scroll-margin-top: 88px;
}

.about-layout {
  width: min(100%, 1080px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 3fr;
  align-items: center;
  gap: clamp(36px, 6vw, 76px);
}

.about-brand {
  position: relative;
  min-height: 390px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #242424;
  border-radius: 4px;
  background:
    radial-gradient(ellipse at 50% 43%, rgb(164 224 75 / 9%), transparent 53%),
    linear-gradient(145deg, #151515 0%, #0c0c0c 78%);
}

.about-logo {
  display: block;
  width: clamp(130px, 16vw, 184px);
  height: auto;
  object-fit: contain;
}

.about-caption {
  position: absolute;
  bottom: 22px;
  left: 24px;
  color: #a4a4a4;
  font-size: 12px;
  letter-spacing: 0.04em;
}

.about-content {
  max-width: 610px;
}

.about-eyebrow {
  margin: 0 0 16px;
  color: #a4e04b;
  font-family: var(--font-display, 'Bebas Neue', sans-serif);
  font-size: 16px;
  letter-spacing: 0.11em;
}

.about-heading {
  margin: 0;
  color: #f5f5f7;
  font-size: clamp(40px, 4vw, 56px);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -0.045em;
}

.about-heading-line {
  display: block;
  white-space: nowrap;
}

.about-intro {
  max-width: 510px;
  margin: 20px 0 28px;
  color: #a0a0a0;
  font-size: 16px;
  line-height: 1.65;
}

.about-benefits {
  margin: 0;
  padding: 0;
  list-style: none;
}

.about-benefit {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 0;
  border-bottom: 1px solid #242424;
}

.about-icon {
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  display: grid;
  place-items: center;
  border-radius: 3px;
  background: rgb(164 224 75 / 8%);
  color: #a4e04b;
}

.about-icon svg {
  width: 19px;
  height: 19px;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5;
}

.about-benefit-copy {
  display: grid;
  gap: 3px;
}

.about-benefit-title {
  color: #f5f5f7;
  font-size: 14px;
  font-weight: 600;
}

.about-benefit-body {
  color: #929292;
  font-size: 13px;
  line-height: 1.45;
}

.about-contact-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 24px;
  padding: 4px 0;
  color: #f5f5f7;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: color 160ms ease;
}

.about-contact-link:hover {
  color: #a4e04b;
}

.about-contact-link:focus-visible {
  outline: 2px solid #a4e04b;
  outline-offset: 5px;
  border-radius: 2px;
}

.about-layout--visible .about-brand {
  animation: about-rise 500ms ease-out both;
}

.about-layout--visible .about-content {
  animation: about-rise 500ms 100ms ease-out both;
}

@keyframes about-rise {
  from {
    opacity: 0.72;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 800px) {
  .about-section {
    padding: 72px 20px;
  }

  .about-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .about-brand {
    min-height: 220px;
  }

  .about-logo {
    width: 112px;
  }

  .about-caption {
    bottom: 16px;
    left: 18px;
  }
}

@media (max-width: 480px) {
  .about-heading {
    font-size: clamp(26px, 8.2vw, 32px);
  }

  .about-intro {
    margin: 16px 0 20px;
    font-size: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-layout--visible .about-brand,
  .about-layout--visible .about-content {
    animation: none;
  }

  .about-contact-link {
    transition: none;
  }
}
</style>
