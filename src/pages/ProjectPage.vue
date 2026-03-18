<template>
  <div v-if="project" class="px-6 pt-24 pb-40">

    <!-- Back button -->
    <div class="max-w-[1080px] mx-auto mb-16">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 text-text-muted text-[14px] hover:text-text-main transition-colors"
        style="cursor: none;"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        {{ t('projects.backToWork') }}
      </RouterLink>
    </div>

    <!-- Hero -->
    <div class="max-w-[1080px] mx-auto mb-16">
      <div class="mb-6 chip">{{ project.tag }}</div>

      <h1
        class="mb-6 font-display"
        style="font-size: clamp(56px, 10vw, 120px); letter-spacing: 0.02em; line-height: 0.95;"
      >
        {{ project.title.toUpperCase() }}
      </h1>

      <p class="text-[22px] text-text-muted max-w-[600px]" style="font-weight: 300; line-height: 1.5; letter-spacing: -0.01em;">
        {{ project.tagline }}
      </p>
    </div>

    <!-- Full-width image -->
    <div class="max-w-[1200px] mx-auto mb-24 rounded-3xl overflow-hidden" style="border: 1px solid var(--border); aspect-ratio: 16/7; background: var(--surface-3);">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        class="object-cover object-top w-full h-full"
      />
      <div v-else class="flex items-center justify-center w-full h-full" style="color: var(--text-dim); font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">
        {{ project.title }} Preview
      </div>
    </div>

    <!-- Project details -->
    <div class="max-w-[1080px] mx-auto">

      <!-- Meta row -->
      <div class="grid grid-cols-2 gap-8 py-10 mb-20 md:grid-cols-4" style="border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
        <div>
          <div class="text-[11px] uppercase tracking-widest text-text-dim mb-2">{{ t('projects.metaYear') }}</div>
          <div class="font-semibold text-[16px]">{{ project.year }}</div>
        </div>
        <div>
          <div class="text-[11px] uppercase tracking-widest text-text-dim mb-2">{{ t('projects.metaCategory') }}</div>
          <div class="font-semibold text-[16px]">{{ project.tag }}</div>
        </div>
        <div>
          <div class="text-[11px] uppercase tracking-widest text-text-dim mb-2">{{ t('projects.metaStack') }}</div>
          <div class="flex flex-wrap gap-1 mt-1">
            <span v-for="t in project.stack" :key="t" class="chip" style="font-size: 11px;">{{ t }}</span>
          </div>
        </div>
        <div>
          <div class="text-[11px] uppercase tracking-widest text-text-dim mb-2">{{ t('projects.metaLive') }}</div>
          <a
            :href="project.url"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1 text-[14px] font-medium hover:underline"
            :style="`color: ${project.color}; cursor: none;`"
          >
            Visit site
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>

      <!-- Case study body -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">

        <div class="fade-up">
          <div class="mb-6 section-label">{{ t('projects.overview') }}</div>
          <p class="text-text-muted text-[17px] leading-relaxed">{{ project.description }}</p>
        </div>

        <div class="fade-up" style="transition-delay: 0.1s;">
          <div class="mb-6 section-label">{{ t('projects.challenge') }}</div>
          <p class="text-text-muted text-[17px] leading-relaxed">{{ project.challenge }}</p>
        </div>

        <div class="fade-up" style="transition-delay: 0.15s;">
          <div class="mb-6 section-label">{{ t('projects.solution') }}</div>
          <p class="text-text-muted text-[17px] leading-relaxed">{{ project.solution }}</p>
        </div>

        <div class="fade-up" style="transition-delay: 0.2s;">
          <div class="mb-6 section-label">{{ t('projects.outcome') }}</div>
          <p class="text-text-muted text-[17px] leading-relaxed">{{ project.outcome }}</p>
        </div>

      </div>

      <!-- Bottom CTA -->
      <div class="mt-32 text-center fade-up">
        <div class="mb-16 divider" />
        <h2 class="font-display text-[clamp(40px,7vw,80px)] mb-8" style="letter-spacing: 0.02em;">
          WANT SOMETHING<br/><span style="color: var(--accent);">{{ t('projects.likeThis') }}</span>
        </h2>
        <RouterLink to="/contact" class="btn-primary text-[16px] px-10 py-5">
          {{ t('cta.start') }}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
      </div>

    </div>
  </div>

  <!-- 404 state -->
  <div v-else class="flex items-center justify-center min-h-screen px-6 text-center">
    <div>
      <h1 class="font-display text-[120px] text-accent" style="letter-spacing: 0.02em;">404</h1>
      <p class="text-text-muted text-[18px] mb-8">{{ t('projects.notFound') }}</p>
      <RouterLink to="/" class="btn-primary">Go back home</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getProject } from '../data/projects.js'
import { useFadeUp } from '../composables/useFadeUp.js'
import { useSeo } from '../composables/useSeo.js'
import { useLanguage } from '../composables/useLanguage.js'
import { useJsonLd, breadcrumbSchema, projectSchema } from '../composables/useJsonLd.js'

const route   = useRoute()
const { t } = useLanguage()
const project = computed(() => getProject(route.params.slug))

useFadeUp()

// Reactive SEO — updates when slug changes
watch(project, (p) => {
  if (!p) return
  useSeo({
    title:       p.title,
    description: p.description,
    canonical:   `/work/${p.slug}`,
    image:       p.image,
  })
}, { immediate: true })

// JSON-LD injected directly when project resolves
watch(project, (p) => {
  if (!p) return
  // Remove previous ld+json scripts
  document.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
    if (s.id && s.id.startsWith('jsonld-')) s.remove()
  })
  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Work', url: '/#work' },
      { name: p.title, url: `/work/${p.slug}` },
    ]),
    projectSchema(p),
  ]
  schemas.forEach((schema, i) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id   = `jsonld-${i}-proj`
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
  })
}, { immediate: true })
</script>