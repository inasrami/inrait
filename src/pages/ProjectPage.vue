<template>
  <main v-if="project" class="project-page px-6">
    <div class="project-container">
      <RouterLink :to="localizedPath('/')" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        {{ t('projects.backToWork') }}
      </RouterLink>

      <header class="project-header">
        <h1 class="font-display">{{ project.title }}</h1>
        <p>{{ copy.overview }}</p>
      </header>

      <figure class="project-image">
        <img
          v-if="project.image"
          :src="project.image"
          :alt="`${t('projects.previewAlt')}: ${project.title}`"
          :width="project.imageWidth"
          :height="project.imageHeight"
          fetchpriority="high"
        />
      </figure>

      <div class="project-details">
        <ul class="project-features">
          <li v-for="feature in copy.features?.slice(0, 3)" :key="feature">{{ feature }}</li>
        </ul>
        <p class="project-year">{{ project.year }}</p>
        <div class="project-actions">
          <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn-primary">
            {{ t('projects.visitLive') }}
          </a>
          <a v-else-if="project.sourceUrl" :href="project.sourceUrl" target="_blank" rel="noopener noreferrer" class="btn-primary">
            {{ t('projects.viewSource') }}
          </a>
          <RouterLink :to="localizedPath('/contact')" class="contact-link">{{ t('cta.start') }}</RouterLink>
        </div>
      </div>
    </div>
  </main>

  <main v-else class="not-found">
    <h1>404</h1>
    <p>{{ t('projects.notFound') }}</p>
    <RouterLink :to="localizedPath('/')" class="btn-primary">{{ t('notFound.home') }}</RouterLink>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getProject } from '../data/Projects.js'
import { useSeo } from '../composables/useSeo.js'
import { useLanguage } from '../composables/useLanguage.js'
import { useJsonLd, breadcrumbSchema, projectSchema } from '../composables/Usejsonld.js'

const route = useRoute()
const { t, lang, localizedPath } = useLanguage()
const project = computed(() => getProject(route.params.slug))
const copy = computed(() => project.value?.localized?.[lang.value] ?? project.value ?? {})

const current = project.value
if (current) {
  const description = current.localized?.[lang.value]?.description ?? current.description
  useSeo({
    title: current.title,
    description,
    canonical: `/work/${current.slug}`,
    image: current.image,
  })
  useJsonLd([
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: t('projects.label'), url: '/#work' },
      { name: current.title, url: `/work/${current.slug}` },
    ]),
    projectSchema({ ...current, description }),
  ])
}
</script>

<style scoped>
.project-page { min-height: 100vh; padding-top: 104px; padding-bottom: 72px; }
.project-container { max-width: 1080px; margin: 0 auto; }
.back-link { display: inline-flex; align-items: center; gap: 8px; color: var(--text-muted); font-size: 13px; }
.back-link:hover, .contact-link:hover { color: var(--accent); }
.project-header { margin: 28px 0 24px; }
.project-header h1 { margin: 0 0 8px; font-size: clamp(36px, 8vw, 72px); font-weight: 400; letter-spacing: 0.02em; line-height: 1; }
.project-header p { max-width: 650px; margin: 0; color: var(--text-muted); font-size: clamp(16px, 2.2vw, 20px); line-height: 1.5; }
.project-image { overflow: hidden; aspect-ratio: 16 / 8; margin: 0; background: var(--surface-3); border: 1px solid var(--border); border-radius: 12px; }
.project-image img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; }
.project-details { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding-top: 22px; }
.project-features { display: flex; flex-wrap: wrap; gap: 8px 22px; margin: 0; padding: 0; list-style: none; }
.project-features li { color: var(--text-muted); font-size: 13px; }
.project-features li::before { margin-right: 8px; color: var(--accent); content: '•'; }
.project-year { flex: 0 0 auto; margin: 0; color: var(--text-dim); font-size: 12px; }
.project-actions { display: flex; flex: 0 0 auto; align-items: center; gap: 18px; }
.project-actions .btn-primary { padding: 11px 16px; font-size: 13px; }
.contact-link { color: var(--text-muted); font-size: 13px; font-weight: 600; }
.not-found { display: flex; min-height: 70vh; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 24px; text-align: center; }
.not-found h1 { margin: 0; color: var(--accent); font-size: 80px; }
.not-found p { margin: 0; color: var(--text-muted); }
@media (max-width: 740px) {
  .project-details { align-items: flex-start; flex-direction: column; }
  .project-features { flex-direction: column; }
  .project-actions { flex-wrap: wrap; }
}
</style>
