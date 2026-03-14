<template>
  <div style="cursor:none;">

  <!-- Loaded post -->
  <div v-if="post" class="min-h-screen px-6 pb-32 pt-36">

    <!-- Back -->
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

    <!-- Header -->
    <header class="max-w-[720px] mx-auto mb-16">
      <div class="flex items-center gap-3 mb-6">
        <span class="post-cat">{{ post.category === 'tech' ? 'Tech' : 'Industry' }}</span>
        <span class="text-text-dim text-[12px]">{{ formatDate(post.date) }}</span>
        <span class="text-text-dim text-[12px]">·</span>
        <span class="text-text-dim text-[12px]">{{ post.readTime }} {{ t('blog.minRead') }}</span>
      </div>

      <h1 class="font-display text-[clamp(36px,6vw,64px)] leading-none mb-6"
        style="letter-spacing:0.02em; color: var(--text);">
        {{ localise(post).title }}
      </h1>
    </header>

    <!-- Accent divider -->
    <div class="max-w-[720px] mx-auto mb-12 h-px"
      style="background: linear-gradient(90deg, var(--accent), transparent);" />

    <!-- Hero image -->
    <div v-if="post.image" class="max-w-[720px] mx-auto mb-12 overflow-hidden rounded-2xl" style="aspect-ratio:16/9;">
      <img :src="post.image" :alt="localise(post).title" class="object-cover w-full h-full" />
    </div>

    <!-- Article body — rendered from parsed markdown content -->
    <article class="max-w-[720px] mx-auto" style="cursor:none;">
      <template v-for="(block, i) in parsedContent" :key="i">
        <h2 v-if="block.type === 'h2'"   class="article-h2">{{ block.text }}</h2>
        <p  v-else-if="block.type === 'p'" class="article-p"  v-html="block.html" />
        <ul v-else-if="block.type === 'ul'" class="article-ul">
          <li v-for="(item, j) in block.items" :key="j" v-html="item" />
        </ul>
        <hr v-else-if="block.type === 'hr'" class="article-hr" />
      </template>
    </article>

    <!-- End CTA -->
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
    </div>

  </div>

  <!-- Loading state -->
  <div v-else-if="isLoading" class="flex items-center justify-center min-h-screen" style="cursor:none;">
    <div class="flex flex-col items-center gap-4">
      <div class="loader-bar-wrap">
        <div class="loader-bar-anim" />
      </div>
      <p class="text-text-dim text-[13px]">Loading article…</p>
    </div>
  </div>

  <!-- 404 -->
  <div v-else class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="font-display text-[120px] leading-none"
        style="color:transparent; -webkit-text-stroke:1px rgba(164,224,75,0.15);">404</div>
      <p class="mb-6 text-text-muted">Article not found.</p>
      <RouterLink to="/blog" class="btn-outline" style="cursor:none;">Back to blog</RouterLink>
    </div>
  </div>

  </div><!-- end outer wrapper -->
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'
import { useSeo } from '../composables/useSeo.js'
import { db } from '../firebase.js'
import { collection, query, where, getDocs } from 'firebase/firestore'

const route = useRoute()
const { t, currentLanguage } = useLanguage()

const post      = ref(null)
const isLoading = ref(true)

// Same safe helper as Blog.vue — falls back to EN if language key missing
function localise(p) {
  if (!p) return { title: '', content: '', excerpt: '' }
  return p[currentLanguage.value] ?? p.en ?? { title: '', content: '', excerpt: '' }
}

// ── Fetch from Firestore ──────────────────────────────────
onMounted(async () => {
  try {
    const q = query(collection(db, 'posts'), where('slug', '==', route.params.slug))
    const snapshot = await getDocs(q)
    if (!snapshot.empty) {
      const doc = snapshot.docs[0]
      const data = doc.data()
      post.value = {
        id:       doc.id,
        slug:     data.slug,
        category: data.category || 'tech',
        readTime: data.readTime || '5',
        date:     data.date,
        image:    data.image || null,
        en: { title: data.en?.title || '', content: data.en?.content || '' },
        bg: { title: data.bg?.title || '', content: data.bg?.content || '' },
      }
    }
  } catch (err) {
    console.error('Error fetching post:', err)
  } finally {
    isLoading.value = false
  }
})

// ── Reactive SEO ──────────────────────────────────────────
watch([post, currentLanguage], () => {
  if (!post.value) return
  const local = post.value[currentLanguage.value]
  useSeo({
    title:       local?.title,
    description: (local?.content || '').slice(0, 160),
    canonical:   `/blog/${post.value.slug}`,
  })
}, { immediate: true })

// ── Markdown parser ───────────────────────────────────────
// Runs at computed time — nothing called inside the template
const parsedContent = computed(() => {
  const raw = localise(post.value).content ?? ''
  const lines = raw.split('\n')
  const blocks = []
  let listBuf = []

  function flush() {
    if (listBuf.length) {
      blocks.push({ type: 'ul', items: listBuf.map(fmt) })
      listBuf = []
    }
  }

  for (const line of lines) {
    const s = line.trim()
    if (!s) { flush(); continue }
    if (s.startsWith('## ')) { flush(); blocks.push({ type: 'h2', text: s.slice(3) }); continue }
    if (/^\*\*[^*]+\*\*$/.test(s)) { flush(); blocks.push({ type: 'h2', text: s.slice(2, -2) }); continue }
    if (s === '---') { flush(); blocks.push({ type: 'hr' }); continue }
    if (s.startsWith('- ')) { listBuf.push(s.slice(2)); continue }
    flush()
    blocks.push({ type: 'p', html: fmt(s) })
  }

  flush()
  return blocks
})

function fmt(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, (_, label, url) => {
      const ext = !url.startsWith('/')
      return `<a href="${url}"${ext ? ' target="_blank" rel="noopener"' : ''} style="color:var(--accent);text-decoration:underline;text-underline-offset:3px;">${label}</a>`
    })
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(
    currentLanguage.value === 'bg' ? 'bg-BG' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
}
</script>

<style scoped>
* { cursor: none !important; }

.post-cat {
  font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--accent); background: rgba(164,224,75,0.08);
  border: 1px solid rgba(164,224,75,0.18); border-radius: 100px; padding: 3px 10px;
}

.article-h2 {
  font-family: 'DM Sans', sans-serif; font-size: 20px; font-weight: 700;
  letter-spacing: -0.02em; color: var(--text); margin: 44px 0 14px; line-height: 1.3;
}
.article-p { font-size: 16px; color: var(--text-muted); line-height: 1.85; margin-bottom: 22px; }
.article-ul { list-style: none; padding: 0; margin: 0 0 22px; display: flex; flex-direction: column; gap: 10px; }
.article-ul li { font-size: 15px; color: var(--text-muted); line-height: 1.7; padding-left: 22px; position: relative; }
.article-ul li::before { content: ''; position: absolute; left: 0; top: 10px; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
.article-hr { border: none; border-top: 1px solid var(--border); margin: 44px 0; }

.post-cta-box {
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;
  gap: 20px; padding: 28px 32px; border-radius: 20px;
  border: 1px solid rgba(164,224,75,0.2); background: rgba(164,224,75,0.04);
}

.loader-bar-wrap { width: 120px; height: 2px; background: rgba(255,255,255,0.08); border-radius: 100px; overflow: hidden; }
.loader-bar-anim { height: 100%; width: 40%; background: var(--accent); border-radius: 100px; animation: slide 1s ease-in-out infinite alternate; }
@keyframes slide { from { transform: translateX(0); } to { transform: translateX(200%); } }
</style>