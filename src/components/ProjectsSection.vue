<template>
  <section id="work" class="projects-section px-6">
    <div class="projects-container">
      <header class="projects-heading">
        <p class="section-kicker">{{ t('projects.label') }}</p>
        <h2 class="font-display">{{ t('projects.title') }}</h2>
      </header>

      <div id="project-grid" class="project-grid">
        <article v-for="project in visibleProjects" :key="project.id" class="project-card">
          <div class="project-image">
            <img
              :src="project.image"
              :alt="`${t('projects.previewAlt')}: ${project.title}`"
              :width="project.imageWidth"
              :height="project.imageHeight"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="project-copy">
            <h3>{{ project.title }}</h3>
            <p>{{ localized(project).cardDescription }}</p>
            <div class="project-actions">
              <button type="button" class="project-details-button" @click="openDetails(project, $event)">
                {{ t('projects.viewCase') }}
              </button>
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="project-live-link"
              >
                {{ t('projects.viewSite') }}
              </a>
            </div>
          </div>
        </article>
      </div>
      <button
        v-if="displayProjects.length > featuredProjectCount"
        type="button"
        class="show-projects-button"
        :aria-expanded="showAllProjects"
        aria-controls="project-grid"
        @click="showAllProjects = !showAllProjects"
      >
        {{ t(showAllProjects ? 'projects.showFeatured' : 'projects.showAll') }}
      </button>
    </div>

    <dialog
      ref="dialogElement"
      class="project-dialog"
      :aria-labelledby="selectedProject ? `project-dialog-title-${selectedProject.id}` : undefined"
      @click="handleDialogClick"
      @keydown.esc.stop.prevent="closeDetails"
      @cancel="closeDetails"
      @close="handleDialogClose"
    >
      <template v-if="selectedProject">
        <button
          ref="closeButton"
          type="button"
          class="dialog-close"
          :aria-label="t('projects.close')"
          @click="closeDetails"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <div class="dialog-content">
          <p class="section-kicker">{{ t('projects.modalTitle') }}</p>
          <h2 :id="`project-dialog-title-${selectedProject.id}`">{{ selectedProject.title }}</h2>
          <p class="dialog-overview">{{ localized(selectedProject).overview }}</p>
          <ul class="dialog-features">
            <li v-for="feature in localized(selectedProject).features?.slice(0, 3)" :key="feature">
              {{ feature }}
            </li>
          </ul>
          <div class="dialog-actions">
            <a
              v-if="selectedProject.liveUrl"
              :href="selectedProject.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary"
              @click="closeDetails"
            >
              {{ t('projects.visitLive') }}
            </a>
            <a
              v-else-if="selectedProject.sourceUrl"
              :href="selectedProject.sourceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary"
              @click="closeDetails"
            >
              {{ t('projects.viewSource') }}
            </a>
            <RouterLink
              :to="localizedPath(`/work/${selectedProject.slug}`)"
              class="dialog-case-link"
              @click="closeDetails"
            >
              {{ t('projects.caseStudy') }}
            </RouterLink>
          </div>
        </div>
      </template>
    </dialog>
  </section>
</template>

<script setup>
import { computed, nextTick, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { projects } from '../data/Projects.js'
import { useLanguage } from '../composables/useLanguage.js'

const { t, lang, localizedPath } = useLanguage()
const dialogElement = ref(null)
const closeButton = ref(null)
const selectedProject = ref(null)
const showAllProjects = ref(false)
const featuredProjectCount = 2
let returnFocusElement = null
let previousOverflow = ''
let scrollLockActive = false

const displayProjects = computed(() => {
  const featuredIds = ['barbers-unity', 'hotel-prestige']
  return [
    ...featuredIds.map(id => projects.find(project => project.id === id)).filter(Boolean),
    ...projects.filter(project => !featuredIds.includes(project.id)),
  ]
})
const visibleProjects = computed(() => (
  showAllProjects.value ? displayProjects.value : displayProjects.value.slice(0, featuredProjectCount)
))

function localized(project) {
  return project.localized?.[lang.value] ?? project
}

async function openDetails(project, event) {
  returnFocusElement = event.currentTarget
  selectedProject.value = project
  await nextTick()
  if (!dialogElement.value?.open) {
    if (!scrollLockActive) {
      previousOverflow = document.documentElement.style.overflow
      document.documentElement.style.overflow = 'hidden'
      scrollLockActive = true
    }
    dialogElement.value?.showModal()
  }
  closeButton.value?.focus()
}

function closeDetails() {
  if (dialogElement.value?.open) dialogElement.value.close()
  restoreScrollLock()
}

function handleDialogClick(event) {
  if (event.target === dialogElement.value) closeDetails()
}

function handleDialogClose() {
  selectedProject.value = null
  restoreScrollLock()
  nextTick(() => returnFocusElement?.focus())
}

function restoreScrollLock() {
  if (scrollLockActive) {
    document.documentElement.style.overflow = previousOverflow
    scrollLockActive = false
  }
}

onUnmounted(() => {
  if (dialogElement.value?.open) dialogElement.value.close()
  if (scrollLockActive) document.documentElement.style.overflow = previousOverflow
})
</script>

<style scoped>
.projects-section { padding-top: 48px; padding-bottom: 56px; }
.projects-container { max-width: 960px; margin: 0 auto; }
.projects-heading { margin-bottom: 24px; }
.section-kicker { margin: 0 0 8px; color: var(--accent); font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.projects-heading h2 { font-size: clamp(34px, 5vw, 48px); font-weight: 400; letter-spacing: 0.02em; line-height: 1; }
.project-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 24px; }
.project-card { min-width: 0; }
.project-image { overflow: hidden; aspect-ratio: 16 / 9; background: var(--surface-3); }
.project-image img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; }
.project-copy { padding-top: 14px; }
.project-copy h3 { margin: 0; font-size: clamp(20px, 2.4vw, 26px); font-weight: 600; letter-spacing: -0.03em; }
.project-copy p { margin: 4px 0 12px; color: var(--text-muted); font-size: 14px; line-height: 1.5; }
.project-actions, .dialog-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 18px; }
.project-details-button, .project-live-link, .dialog-case-link { color: var(--text-primary); font-size: 13px; font-weight: 600; text-underline-offset: 4px; }
.project-details-button { padding: 0; color: var(--accent); background: transparent; border: 0; cursor: pointer; }
.project-details-button:hover, .project-live-link:hover, .dialog-case-link:hover { text-decoration: underline; }
.show-projects-button { display: block; margin: 28px auto 0; padding: 10px 0; color: var(--text-primary); background: none; border: 0; border-bottom: 1px solid var(--accent); cursor: pointer; font-size: 14px; font-weight: 600; }
.show-projects-button:hover { color: var(--accent); }
.show-projects-button:focus-visible { outline: 2px solid var(--accent); outline-offset: 5px; }

.project-dialog { position: fixed; inset: 0; width: min(520px, calc(100vw - 32px)); max-width: none; max-height: min(680px, calc(100dvh - 32px)); margin: auto; padding: 0; overflow: auto; color: var(--text-primary); background: var(--surface); border: 1px solid var(--border-strong); border-radius: 16px; }
.project-dialog::backdrop { background: rgba(0, 0, 0, 0.78); backdrop-filter: blur(5px); }
.dialog-content { padding: clamp(24px, 6vw, 40px); }
.dialog-content h2 { margin: 0 40px 10px 0; font-size: clamp(26px, 6vw, 36px); font-weight: 600; letter-spacing: -0.035em; line-height: 1.1; }
.dialog-overview { margin: 0; color: var(--text-muted); font-size: 15px; line-height: 1.55; }
.dialog-features { display: grid; gap: 9px; margin: 20px 0 24px; padding: 0; list-style: none; }
.dialog-features li { position: relative; padding-left: 18px; color: var(--text-primary); font-size: 14px; line-height: 1.45; }
.dialog-features li::before { position: absolute; left: 0; color: var(--accent); content: '•'; }
.dialog-actions .btn-primary { display: inline-flex; min-height: 42px; align-items: center; padding: 0 16px; font-size: 13px; }
.dialog-case-link { color: var(--text-muted); }
.dialog-close { position: absolute; top: 16px; right: 16px; display: grid; width: 40px; height: 40px; place-items: center; color: var(--text-primary); background: var(--surface-2); border: 1px solid var(--border); border-radius: 50%; cursor: pointer; }
.dialog-close:hover { color: var(--accent); border-color: var(--accent); }
.dialog-close:focus-visible, .project-details-button:focus-visible, .project-live-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }

@media (max-width: 640px) {
  .projects-section { padding-top: 36px; padding-bottom: 48px; }
  .project-grid { grid-template-columns: 1fr; gap: 32px; }
  .project-image { aspect-ratio: 16 / 9; }
}
@media (prefers-reduced-motion: reduce) {
  .project-image img { transition: none; }
}
</style>
