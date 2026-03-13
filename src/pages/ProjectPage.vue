<template>
  <div v-if="project" class="pt-24 pb-40 px-6">

    <!-- Back button -->
    <div class="max-w-[1080px] mx-auto mb-16">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 text-text-muted text-[14px] hover:text-text-main transition-colors"
        style="cursor: none;"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to work
      </RouterLink>
    </div>

    <!-- Hero -->
    <div class="max-w-[1080px] mx-auto mb-16">
      <div class="chip mb-6">{{ project.tag }}</div>

      <h1
        class="font-display mb-6"
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
        class="w-full h-full object-cover object-top"
      />
      <div v-else class="w-full h-full flex items-center justify-center" style="color: var(--text-dim); font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">
        {{ project.title }} Preview
      </div>
    </div>

    <!-- Project details -->
    <div class="max-w-[1080px] mx-auto">

      <!-- Meta row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-10" style="border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
        <div>
          <div class="text-[11px] uppercase tracking-widest text-text-dim mb-2">Year</div>
          <div class="font-semibold text-[16px]">{{ project.year }}</div>
        </div>
        <div>
          <div class="text-[11px] uppercase tracking-widest text-text-dim mb-2">Category</div>
          <div class="font-semibold text-[16px]">{{ project.tag }}</div>
        </div>
        <div>
          <div class="text-[11px] uppercase tracking-widest text-text-dim mb-2">Stack</div>
          <div class="flex flex-wrap gap-1 mt-1">
            <span v-for="t in project.stack" :key="t" class="chip" style="font-size: 11px;">{{ t }}</span>
          </div>
        </div>
        <div>
          <div class="text-[11px] uppercase tracking-widest text-text-dim mb-2">Live</div>
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
          <div class="section-label mb-6">Overview</div>
          <p class="text-text-muted text-[17px] leading-relaxed">{{ project.description }}</p>
        </div>

        <div class="fade-up" style="transition-delay: 0.1s;">
          <div class="section-label mb-6">The Challenge</div>
          <p class="text-text-muted text-[17px] leading-relaxed">{{ project.challenge }}</p>
        </div>

        <div class="fade-up" style="transition-delay: 0.15s;">
          <div class="section-label mb-6">The Solution</div>
          <p class="text-text-muted text-[17px] leading-relaxed">{{ project.solution }}</p>
        </div>

        <div class="fade-up" style="transition-delay: 0.2s;">
          <div class="section-label mb-6">The Outcome</div>
          <p class="text-text-muted text-[17px] leading-relaxed">{{ project.outcome }}</p>
        </div>

      </div>

      <!-- Bottom CTA -->
      <div class="mt-32 text-center fade-up">
        <div class="divider mb-16" />
        <h2 class="font-display text-[clamp(40px,7vw,80px)] mb-8" style="letter-spacing: 0.02em;">
          WANT SOMETHING<br/><span style="color: var(--accent);">LIKE THIS?</span>
        </h2>
        <RouterLink to="/contact" class="btn-primary text-[16px] px-10 py-5">
          Let's talk about your project
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
      </div>

    </div>
  </div>

  <!-- 404 state -->
  <div v-else class="min-h-screen flex items-center justify-center text-center px-6">
    <div>
      <h1 class="font-display text-[120px] text-accent" style="letter-spacing: 0.02em;">404</h1>
      <p class="text-text-muted text-[18px] mb-8">Project not found.</p>
      <RouterLink to="/" class="btn-primary">Go back home</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getProject } from '../data/projects.js'
import { useFadeUp } from '../composables/useFadeUp.js'

const route   = useRoute()
const project = computed(() => getProject(route.params.slug))

useFadeUp()
</script>