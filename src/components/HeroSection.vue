<template>
  <section ref="hero" class="hero-section">
    <div class="hero-stage">
      <div ref="content" class="hero-content">
        <h1
          class="hero-headline"
          :class="{ 'hero-headline--cyrillic': isBG }"
        >
          {{ t('hero.title') }}
        </h1>

        <p class="hero-copy">{{ t('hero.sub') }}</p>

        <div class="hero-actions">
          <RouterLink
            :to="localizedPath('/contact')"
            class="btn-primary"
          >
            {{ t('hero.cta') }}
          </RouterLink>

          <a
            href="#work"
            class="btn-outline hero-work-link"
            @click.prevent="scrollToWork"
          >
            {{ t('hero.ctaWork') }}
          </a>
        </div>
      </div>

      <figure class="hero-preview">
        <div class="preview-browser" aria-hidden="true">
          <div class="browser-dots">
            <span></span><span></span><span></span>
          </div>
          <span>barbersunity.com</span>
          <span class="browser-spacer"></span>
        </div>

        <img
          :src="previewSrc"
          :alt="isBG
            ? 'Начална страница на Barbers Unity'
            : 'Barbers Unity homepage'"
          width="1911"
          height="993"
          fetchpriority="high"
          decoding="async"
        />

        <figcaption class="preview-caption">
          <span>Barbers Unity</span>
          <a :href="localizedPath('/work/barbers-unity')">
            {{ isBG ? 'Виж проекта ↗' : 'View project ↗' }}
          </a>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'

defineProps({
  previewSrc: {
    type: String,
    default: '/images/barbers-unity-homepage.jpg',
  },
})

const { t, isBG, localizedPath } = useLanguage()
const hero = ref(null)
const content = ref(null)

let frame = 0
let motionQuery
let mobileQuery

const clamp = (value) => Math.min(1, Math.max(0, value))

function updateAnimation() {
  frame = 0

  const element = hero.value
  if (!element) return

  const reduced = motionQuery.matches
  const mobile = mobileQuery.matches
  const rect = element.getBoundingClientRect()

  // The animation completes within approximately one viewport.
  const distance = Math.max(
    1,
    Math.min(rect.height * 0.55, window.innerHeight * 0.85),
  )

  const progress = reduced ? 1 : clamp(-rect.top / distance)
  const eased = 1 - Math.pow(1 - progress, 3)

  element.style.setProperty(
    '--copy-y',
    `${reduced ? 0 : -eased * (mobile ? 20 : 70)}px`,
  )
  element.style.setProperty(
    '--copy-opacity',
    reduced || mobile ? '1' : String(1 - eased),
  )
  element.style.setProperty(
    '--preview-y',
    `${reduced ? 0 : (1 - eased) * (mobile ? 20 : 100)}px`,
  )
  element.style.setProperty(
    '--preview-rotate',
    `${reduced || mobile ? 0 : (1 - eased) * 12}deg`,
  )
  element.style.setProperty(
    '--preview-scale',
    reduced || mobile ? '1' : String(0.92 + eased * 0.08),
  )

  // Avoid invisible keyboard-focusable links after the text fades.
  if (content.value) {
    content.value.inert = !reduced && !mobile && eased > 0.97
  }
}

function scheduleUpdate() {
  if (!frame) frame = requestAnimationFrame(updateAnimation)
}

function scrollToWork() {
  document.getElementById('work')?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches ? 'auto' : 'smooth',
  })
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mobileQuery = window.matchMedia('(max-width: 639px)')

  window.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleUpdate)
  motionQuery.addEventListener('change', scheduleUpdate)
  mobileQuery.addEventListener('change', scheduleUpdate)

  updateAnimation()
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', scheduleUpdate)
  window.removeEventListener('resize', scheduleUpdate)
  motionQuery?.removeEventListener('change', scheduleUpdate)
  mobileQuery?.removeEventListener('change', scheduleUpdate)
})
</script>

<style scoped>
.hero-section {
  --copy-y: 0px;
  --copy-opacity: 1;
  --preview-y: 100px;
  --preview-rotate: 12deg;
  --preview-scale: 0.92;

  position: relative;
  isolation: isolate;
  overflow: clip;
  background: var(--bg, #000);
}

.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(
    ellipse at 50% 60%,
    rgba(164, 224, 75, 0.065),
    transparent 60%
  );
}

.hero-stage {
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(100px, 13vh, 160px) 32px 48px;
  perspective: 1400px;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: var(--copy-opacity);
  transform: translateY(var(--copy-y));
}

.hero-content[inert] {
  pointer-events: none;
}

.hero-headline {
  max-width: 960px;
  margin: 0;
  color: var(--text, #f5f5f7);
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(52px, 7.5vw, 96px);
  font-weight: 600;
  letter-spacing: -0.06em;
  line-height: 1.02;
  text-wrap: balance;
}

.hero-headline--cyrillic {
  font-size: clamp(46px, 7vw, 88px);
  letter-spacing: -0.05em;
}

.hero-copy {
  max-width: 560px;
  margin: 24px 0 0;
  color: var(--text-muted, #888);
  font-size: clamp(17px, 2vw, 21px);
  line-height: 1.5;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
}

.hero-actions a {
  min-width: 164px;
  padding: 14px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}

.hero-work-link {
  color: var(--text, #f5f5f7);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-work-link:hover {
  color: #000;
  background: #f5f5f7;
}

.hero-preview {
  position: relative;
  width: min(100%, 1040px);
  margin: 64px auto 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  background: #111;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.45);
  transform-origin: center top;
  transform:
    translateY(var(--preview-y))
    rotateX(var(--preview-rotate))
    scale(var(--preview-scale));
}

.preview-browser {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 38px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #999;
  font-size: 11px;
}

.browser-dots {
  display: flex;
  gap: 5px;
}

.browser-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #444;
}

.browser-spacer {
  width: 28px;
}

.hero-preview img {
  display: block;
  width: 100%;
  height: auto;
}

.preview-caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 22px;
  color: var(--text, #f5f5f7);
  font-size: 13px;
}

.preview-caption a {
  color: var(--accent, #a4e04b);
}

a:focus-visible {
  outline: 2px solid var(--accent, #a4e04b);
  outline-offset: 5px;
}

@media (max-width: 639px) {
  .hero-section {
    --preview-y: 20px;
    --preview-rotate: 0deg;
    --preview-scale: 1;
  }

  .hero-stage {
    padding: 96px 20px 32px;
    perspective: none;
  }

  .hero-headline {
    font-size: clamp(44px, 11vw, 64px);
  }

  .hero-headline--cyrillic {
    font-size: clamp(38px, 10vw, 58px);
  }

  .hero-actions {
    width: 100%;
  }

  .hero-actions a {
    flex: 1 1 140px;
    min-width: 0;
  }

  .hero-preview {
    margin-top: 40px;
    border-radius: 9px;
  }

  .preview-caption {
    padding: 14px;
    font-size: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-content {
    opacity: 1;
    transform: none;
  }

  .hero-preview {
    transform: none;
  }
}
</style>