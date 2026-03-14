<template>
  <div v-if="post" class="min-h-screen px-6 pb-32 pt-36" style="cursor:none;">

    <!-- Back link -->
    <div class="max-w-[720px] mx-auto mb-12">
      <RouterLink to="/blog"
        class="inline-flex items-center gap-2 text-text-muted text-[13px] hover:text-text-main transition-colors"
        style="cursor:none;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        {{ t('blog.backBlog') }}
      </RouterLink>
    </div>

    <!-- Article header -->
    <header class="max-w-[720px] mx-auto mb-16">
      <div class="flex items-center gap-3 mb-6">
        <span class="post-cat">{{ post.category === 'tech' ? 'Tech' : 'Industry' }}</span>
        <span class="text-text-dim text-[12px]">{{ formatDate(post.date) }}</span>
        <span class="text-text-dim text-[12px]">·</span>
        <span class="text-text-dim text-[12px]">{{ post.readTime }} {{ t('blog.minRead') }}</span>
      </div>

      <h1 class="font-display text-[clamp(36px,6vw,64px)] leading-none mb-6 fade-up"
        style="letter-spacing:0.02em;">
        {{ localPost.title }}
      </h1>

      <p class="text-text-muted text-[18px] leading-relaxed fade-up"
        style="font-weight:300; transition-delay:0.05s;">
        {{ localPost.excerpt }}
      </p>
    </header>

    <!-- Accent divider -->
    <div class="max-w-[720px] mx-auto mb-12 h-px"
      style="background: linear-gradient(90deg, var(--accent), transparent);" />

    <!-- Article body — all blocks pre-computed, no function calls in template -->
    <article class="max-w-[720px] mx-auto fade-up" style="transition-delay:0.1s; cursor:none;">
      <template v-for="(block, i) in parsedContent" :key="i">
        <h2 v-if="block.type === 'h2'" class="article-h2">{{ block.text }}</h2>
        <p  v-else-if="block.type === 'p'"  class="article-p"  v-html="block.html" />
        <ul v-else-if="block.type === 'ul'" class="article-ul">
          <li v-for="(item, j) in block.items" :key="j" v-html="item" />
        </ul>
        <hr v-else-if="block.type === 'hr'" class="article-hr" />
      </template>
    </article>

    <!-- End-of-article CTA -->
    <div class="max-w-[720px] mx-auto mt-20">
      <div class="post-cta-box">
        <div>
          <h3 class="font-semibold text-[18px] mb-2" style="letter-spacing:-0.02em;">
            {{ t('blog.ctaTitle') }}
          </h3>
          <p class="text-text-muted text-[14px] leading-relaxed">{{ t('blog.ctaSub') }}</p>
        </div>
        <RouterLink to="/contact" class="btn-primary text-[13px] py-3 px-6 flex-shrink-0" style="cursor:none;">
          {{ t('cta.start') }}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
      </div>
    </div>

    <!-- Footer nav -->
    <div class="max-w-[720px] mx-auto mt-12 pt-8 flex items-center justify-between flex-wrap gap-4"
      style="border-top:1px solid var(--border);">
      <RouterLink to="/blog" class="btn-outline text-[13px] py-3 px-5" style="cursor:none;">
        {{ t('blog.allPosts') }}
      </RouterLink>
      <RouterLink v-if="nextPost" :to="`/blog/${nextPost.slug}`"
        class="flex items-center gap-2 text-[13px] text-text-muted hover:text-accent transition-colors"
        style="cursor:none;">
        {{ t('blog.nextArticle') }}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </RouterLink>
    </div>

  </div>

  <!-- 404 fallback -->
  <div v-else class="flex items-center justify-center min-h-screen" style="cursor:none;">
    <div class="text-center">
      <div class="font-display text-[120px] leading-none"
        style="color:transparent; -webkit-text-stroke:1px rgba(164,224,75,0.15);">404</div>
      <p class="mb-6 text-text-muted">Article not found.</p>
      <RouterLink to="/blog" class="btn-outline" style="cursor:none;">Back to blog</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useFadeUp } from '../composables/useFadeUp.js'
import { useSeo } from '../composables/useSeo.js'
import { useLanguage } from '../composables/useLanguage.js'
import { useJsonLd, breadcrumbSchema } from '../composables/useJsonLd.js'
import { posts } from '../data/posts.js'

useFadeUp()
const route = useRoute()
const { t, lang } = useLanguage()

const post      = computed(() => posts.find(p => p.slug === route.params.slug))
const localPost = computed(() => post.value?.[lang.value] ?? post.value?.en)
const nextPost  = computed(() => {
  if (!post.value) return null
  const idx = posts.findIndex(p => p.slug === route.params.slug)
  return posts[idx + 1] ?? null
})

// ── SEO (reactive to slug + language changes) ─────────────
watch([post, lang], () => {
  if (!post.value) return
  useSeo({
    title:       localPost.value.title,
    description: localPost.value.excerpt,
    canonical:   `/blog/${post.value.slug}`,
  })
}, { immediate: true })

// ── JSON-LD (injected directly, not via useJsonLd computed) ─
watch([post, lang], () => {
  if (!post.value) return
  document.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
    if (s.id?.startsWith('jsonld-')) s.remove()
  })
  const schema = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: localPost.value?.title ?? '', url: `/blog/${post.value.slug}` },
  ])
  const el = document.createElement('script')
  el.type = 'application/ld+json'
  el.id   = 'jsonld-0-blog'
  el.textContent = JSON.stringify(schema)
  document.head.appendChild(el)
}, { immediate: true })

// ── Markdown parser ────────────────────────────────────────
// All inlineFormat calls happen here — never inside the template
const parsedContent = computed(() => {
  const raw = localPost.value?.content ?? ''
  const lines = raw.split('\n')
  const blocks = []
  let listBuffer = []

  function flushList() {
    if (listBuffer.length) {
      // Pre-format all list items here so template just does v-html on strings
      blocks.push({ type: 'ul', items: listBuffer.map(fmt) })
      listBuffer = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) { flushList(); continue }

    if (trimmed.startsWith('## ')) {
      flushList()
      blocks.push({ type: 'h2', text: trimmed.slice(3) })
      continue
    }

    // **heading** shorthand (bold-only line = treated as h2)
    if (/^\*\*[^*]+\*\*$/.test(trimmed)) {
      flushList()
      blocks.push({ type: 'h2', text: trimmed.slice(2, -2) })
      continue
    }

    if (trimmed === '---') { flushList(); blocks.push({ type: 'hr' }); continue }

    if (trimmed.startsWith('- ')) {
      listBuffer.push(trimmed.slice(2))
      continue
    }

    flushList()
    blocks.push({ type: 'p', html: fmt(trimmed) })
  }

  flushList()
  return blocks
})

// Inline formatter — runs at parse time, not per render
function fmt(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, (_, label, url) => {
      const ext = !url.startsWith('/')
      return `<a href="${url}"${ext ? ' target="_blank" rel="noopener"' : ''} style="color:var(--accent);text-decoration:underline;text-underline-offset:3px;">${label}</a>`
    })
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(
    lang.value === 'bg' ? 'bg-BG' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
}
</script>

<style scoped>
/* Force cursor:none on everything inside the article */
* { cursor: none !important; }

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

/* Article prose */
.article-h2 {
  font-family: 'DM Sans', sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 44px 0 14px;
  line-height: 1.3;
}

.article-p {
  font-size: 16px;
  color: var(--text-muted);
  line-height: 1.85;
  margin-bottom: 22px;
}

.article-ul {
  list-style: none;
  padding: 0;
  margin: 0 0 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.article-ul li {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.7;
  padding-left: 22px;
  position: relative;
}

.article-ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}

.article-hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 44px 0;
}

/* CTA box */
.post-cta-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding: 28px 32px;
  border-radius: 20px;
  border: 1px solid rgba(164,224,75,0.2);
  background: rgba(164,224,75,0.04);
}
</style>