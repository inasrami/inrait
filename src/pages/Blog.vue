<template>
  <div class="min-h-screen px-6 pb-32 pt-36">

    <!-- Hero -->
    <div class="max-w-[1080px] mx-auto mb-20">
      <div class="mb-4 section-label fade-up">{{ t('blog.label') }}</div>
      <div class="flex flex-wrap items-end justify-between gap-6">
        <h1 class="font-display fade-up text-[clamp(64px,12vw,120px)] leading-none"
          style="letter-spacing:0.02em; transition-delay:0.05s;">
          {{ t('blog.title') }}
        </h1>
        <p class="fade-up text-text-muted text-[16px] max-w-sm leading-relaxed"
          style="font-weight:300; transition-delay:0.1s;">
          {{ t('blog.sub') }}
        </p>
      </div>
    </div>

    <!-- Posts grid -->
    <div class="max-w-[1080px] mx-auto">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="(post, i) in posts"
          :key="post.id"
          :to="`/blog/${post.slug}`"
          class="post-card card-entrance"
          :style="`animation-delay: ${i * 0.08}s`"
          data-cursor
        >
          <!-- Category + read time -->
          <div class="flex items-center justify-between mb-6">
            <span class="post-cat">{{ post.category === 'tech' ? 'Tech' : 'Industry' }}</span>
            <span class="text-text-dim text-[12px]">{{ post[lang].readTime ?? post.readTime }} {{ t('blog.minRead') }}</span>
          </div>

          <!-- Title -->
          <h2 class="font-semibold text-[18px] leading-snug mb-3" style="letter-spacing:-0.02em;">
            {{ post[lang].title }}
          </h2>

          <!-- Excerpt -->
          <p class="text-text-muted text-[13px] leading-relaxed mb-8 flex-1">
            {{ post[lang].excerpt }}
          </p>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-4" style="border-top:1px solid var(--border);">
            <span class="text-text-dim text-[12px]">{{ formatDate(post.date) }}</span>
            <span class="post-read-link">
              {{ t('blog.readMore') }}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          </div>
        </RouterLink>
      </div>
    </div>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useFadeUp } from '../composables/useFadeUp.js'
import { useSeo } from '../composables/useSeo.js'
import { useLanguage } from '../composables/useLanguage.js'
import { useJsonLd, breadcrumbSchema } from '../composables/useJsonLd.js'
import { posts } from '../data/posts.js'

useFadeUp()
const { t, lang } = useLanguage()

useSeo({
  title:       'Blog',
  description: 'Practical articles on web engineering, workflow automation, and digital strategy for businesses in Bulgaria and Europe.',
  canonical:   '/blog',
})

useJsonLd(breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]))

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString(lang.value === 'bg' ? 'bg-BG' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}
</script>

<style scoped>
.post-card {
  display: flex;
  flex-direction: column;
  padding: 28px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.018);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  cursor: none;
}

.post-card:hover {
  border-color: rgba(164,224,75,0.2);
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(0,0,0,0.4);
}

.post-cat {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  background: rgba(164,224,75,0.08);
  border: 1px solid rgba(164,224,75,0.18);
  border-radius: 100px;
  padding: 3px 10px;
}

.post-read-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  transition: gap 0.2s ease;
}

.post-card:hover .post-read-link { gap: 8px; }

/* Reuse card-entrance from Services page */
@keyframes cardIn {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card-entrance {
  opacity: 0;
  animation: cardIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>