<template>
  <section id="work" class="py-32 overflow-hidden">

    <!-- Header — full-width padded -->
    <div class="px-6 max-w-[1080px] mx-auto mb-10">
      <div class="flex flex-wrap items-end justify-between gap-6 mb-8">
        <div>
          <div class="mb-4 section-label fade-up">{{ t('projects.label') }}</div>
          <h2 class="font-display fade-up text-[clamp(48px,8vw,80px)]" style="letter-spacing:0.02em; line-height:1;">
            {{ t('projects.title') }}
          </h2>
        </div>
        <div class="flex items-center gap-4 fade-up" style="transition-delay: 0.1s;">
          <!-- Drag hint -->
          <span class="text-text-dim text-[13px] flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            {{ t('projects.dragHint') }}
          </span>
          <!-- Arrow nav -->
          <button class="carousel-btn" @click="scroll(-1)" aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </button>
          <button class="carousel-btn" @click="scroll(1)" aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>

      <!-- Filter tabs -->
      <div class="flex flex-wrap items-center gap-2 fade-up" style="transition-delay:0.15s;">
        <button
          v-for="f in filters"
          :key="f.key"
          class="filter-tab"
          :class="{ 'filter-tab--active': activeFilter === f.key }"
          @click="setFilter(f.key)"
          style="cursor:none;"
        >
          {{ f.label }}
        </button>
      </div>
    </div>
          <button class="carousel-btn" @click="scroll(-1)" aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </button>
          <button class="carousel-btn" @click="scroll(1)" aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
      
     
    

    <!-- Carousel track — bleeds full width -->
    <div
      ref="trackEl"
      class="carousel-track"
      @mousedown="onDragStart"
      @mousemove="onDragMove"
      @mouseup="onDragEnd"
      @mouseleave="onDragEnd"
    >
      <!-- Left padding card (spacer) -->
      <div class="carousel-spacer" />

      <RouterLink
        v-for="(project, i) in filteredProjects"
        :key="project.id"
        :to="`/work/${project.slug}`"
        class="carousel-card"
        :class="{ 'is-dragging': dragging }"
        @click.prevent="handleClick(project)"
      >
        <!-- Image -->
        <div class="carousel-img-wrap">
          <img
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            draggable="false"
          />
          <div
            v-else
            class="flex items-center justify-center w-full h-full"
            style="background: var(--surface-3); color: var(--text-dim); font-size: 13px; letter-spacing: 2px; text-transform: uppercase;"
          >
            {{ project.title }}
          </div>
          <!-- Gradient overlay -->
          <div class="carousel-overlay" />
          <!-- Index number -->
          <span class="carousel-index">{{ String(i + 1).padStart(2, '0') }}</span>
        </div>

        <!-- Info below image -->
        <div class="carousel-info">
          <div class="flex items-start justify-between gap-4 mb-2">
            <h3 class="font-semibold" style="font-size: 22px; letter-spacing: -0.02em; line-height: 1.2;">
              {{ project.title }}
            </h3>
            <span class="text-text-dim text-[12px] mt-1 shrink-0 font-mono">{{ project.year }}</span>
          </div>
          <p class="mb-5 text-text-muted" style="font-size: 14px; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            {{ project.description }}
          </p>
          <div class="flex items-center justify-between">
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="t in project.stack.slice(0, 2)"
                :key="t"
                class="chip"
                style="font-size: 10px; padding: 3px 8px;"
              >{{ t }}</span>
            </div>
            <span
              class="flex items-center gap-1 text-[12px] font-medium"
              :style="`color: ${project.color}`"
            >
              Case study
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </div>
      </RouterLink>

      <!-- Right padding spacer -->
      <div class="carousel-spacer" />
    </div>

    <!-- Dot indicators -->
    <div class="flex justify-center gap-2 mt-10">
      <button
        v-for="(project, i) in filteredProjects"
        :key="project.id"
        class="dot-btn"
        :class="{ active: activeIndex === i }"
        @click="scrollToIndex(i)"
        :aria-label="`Go to ${project.title}`"
      />
    </div>

  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { projects } from '../data/projects.js'
import { useFadeUp } from '../composables/useFadeUp.js'
import { useLanguage } from '../composables/useLanguage.js'

useFadeUp()
const { t } = useLanguage()

const router      = useRouter()
const trackEl     = ref(null)
const activeIndex = ref(0)
const activeFilter = ref('all')

const filters = computed(() => [
  { key: 'all',        label: t('projects.filter.all')        },
  { key: 'web',        label: t('projects.filter.web')        },
  { key: 'design',     label: t('projects.filter.design')     },
  { key: 'automation', label: t('projects.filter.automation') },
])

const filteredProjects = computed(() =>
  activeFilter.value === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter.value)
)

function setFilter(key) {
  activeFilter.value = key
  activeIndex.value = 0
  // Scroll carousel back to start
  if (trackEl.value) trackEl.value.scrollTo({ left: 0, behavior: 'smooth' })
}

// ── Drag-to-scroll ────────────────────────────────────────
const dragging   = ref(false)
let dragStartX   = 0
let scrollStartX = 0
let didDrag      = false

function onDragStart(e) {
  dragging.value = true
  didDrag        = false
  dragStartX     = e.clientX
  scrollStartX   = trackEl.value.scrollLeft
  trackEl.value.style.cursor = 'grabbing'
}

function onDragMove(e) {
  if (!dragging.value) return
  const delta = e.clientX - dragStartX
  if (Math.abs(delta) > 4) didDrag = true
  trackEl.value.scrollLeft = scrollStartX - delta
  updateActiveIndex()
}

function onDragEnd() {
  dragging.value = false
  if (trackEl.value) trackEl.value.style.cursor = 'grab'
}

// Prevent navigation when user was dragging
function handleClick(project) {
  if (!didDrag) router.push(`/work/${project.slug}`)
}

// ── Button scroll ─────────────────────────────────────────
const CARD_WIDTH = 420 + 20 // card + gap

function scroll(dir) {
  const next = Math.max(0, Math.min(filteredProjects.value.length - 1, activeIndex.value + dir))
  scrollToIndex(next)
}

function scrollToIndex(i) {
  if (!trackEl.value) return
  const spacer = 24 // matches carousel-spacer width
  trackEl.value.scrollTo({
    left: i * (CARD_WIDTH),
    behavior: 'smooth',
  })
  activeIndex.value = i
}

// ── Active dot tracking on scroll ────────────────────────
function updateActiveIndex() {
  if (!trackEl.value) return
  const i = Math.round(trackEl.value.scrollLeft / CARD_WIDTH)
  activeIndex.value = Math.max(0, Math.min(filteredProjects.value.length - 1, i))
}

onMounted(() => {
  trackEl.value?.addEventListener('scroll', updateActiveIndex, { passive: true })
})

onUnmounted(() => {
  trackEl.value?.removeEventListener('scroll', updateActiveIndex)
})
</script>

<style scoped>
/* ── Track ─────────────────────────────────────────────── */

/* ── Filter tabs ───────────────────────────────────────── */
.filter-tab {
  padding: 7px 16px;
  border-radius: 100px;
  border: 1px solid var(--border);
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  background: transparent;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  cursor: none;
}

.filter-tab:hover {
  color: var(--text);
  border-color: var(--border-strong);
}

.filter-tab--active {
  color: #000;
  background: var(--accent);
  border-color: var(--accent);
}

.carousel-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  overflow-y: visible;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  cursor: grab;
  padding-bottom: 8px;
  user-select: none;
}

.carousel-track::-webkit-scrollbar { display: none; }

.carousel-spacer {
  flex-shrink: 0;
  width: calc((100vw - 1080px) / 2);
  min-width: 24px;
}

/* ── Card ──────────────────────────────────────────────── */
.carousel-card {
  flex-shrink: 0;
  width: 420px;
  scroll-snap-align: start;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
              box-shadow 0.4s ease,
              border-color 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.carousel-card:hover:not(.is-dragging) {
  transform: translateY(-6px);
  box-shadow: 0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(164,224,75,0.15);
  border-color: rgba(164,224,75,0.2);
}

/* ── Image ─────────────────────────────────────────────── */
.carousel-img-wrap {
  position: relative;
  height: 260px;
  overflow: hidden;
  background: var(--surface-3);
}

.carousel-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
  pointer-events: none;
}

.carousel-card:hover:not(.is-dragging) .carousel-img-wrap img {
  transform: scale(1.05);
}

.carousel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%);
}

/* ── Index number ──────────────────────────────────────── */
.carousel-index {
  position: absolute;
  bottom: 14px;
  right: 18px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 48px;
  line-height: 1;
  letter-spacing: 0.02em;
  color: rgba(255,255,255,0.12);
  pointer-events: none;
}

/* ── Info ──────────────────────────────────────────────── */
.carousel-info {
  padding: 24px 28px 28px;
}

/* ── Nav buttons ───────────────────────────────────────── */
.carousel-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  background: transparent;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: none;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.carousel-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(164,224,75,0.06);
}

/* ── Dots ──────────────────────────────────────────────── */
.dot-btn {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border-strong);
  border: none;
  cursor: none;
  transition: background 0.25s ease, transform 0.25s ease, width 0.25s ease;
}

.dot-btn.active {
  background: var(--accent);
  width: 20px;
  border-radius: 3px;
}
</style>