<template>
  <div class="min-h-screen px-6 pb-32 pt-36" style="cursor:none;">

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

    <!-- Loading -->
    <div v-if="isLoading" class="max-w-[1080px] mx-auto">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="n in 3" :key="n" class="skeleton-card" />
      </div>
    </div>

    <!-- Empty -->
    <div v-else-if="posts.length === 0" class="max-w-[1080px] mx-auto text-center py-20">
      <p class="text-text-muted text-[16px]">{{ t('blog.empty') }}</p>
      <p class="text-text-dim text-[13px] mt-2">Check back soon — new articles are on the way.</p>
    </div>

    <!-- Posts grid -->
    <div v-else class="max-w-[1080px] mx-auto">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(post, i) in posts"
          :key="post.id"
          class="post-card card-entrance"
          :style="`animation-delay: ${i * 0.08}s`"
          @click="$router.push(`/blog/${post.slug}`)"
          data-cursor
        >
          <!-- Image -->
          <div class="post-img-wrap">
            <img
              v-if="post.image && post.image !== '/images/WhiteLogo.webp'"
              :src="post.image"
              :alt="localise(post).title"
              class="post-img"
              draggable="false"
            />
            <div v-else class="post-img-placeholder">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <!-- Category chip over image -->
            <span class="post-cat-badge">{{ post.category === 'tech' ? 'Tech' : 'Industry' }}</span>
          </div>

          <!-- Content -->
          <div class="post-content">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-text-dim text-[11px] uppercase tracking-widest">{{ formatDate(post.date) }}</span>
              <span class="text-text-dim text-[11px]">·</span>
              <span class="text-text-dim text-[11px]">{{ post.readTime }} {{ t('blog.minRead') }}</span>
            </div>

            <h2 class="font-semibold text-[18px] leading-snug mb-3 post-title" style="letter-spacing:-0.02em;">
              {{ localise(post).title }}
            </h2>

            <p class="text-text-muted text-[13px] leading-relaxed post-excerpt">
              {{ localise(post).excerpt }}
            </p>

            <!-- Read more -->
            <div class="post-footer">
              <span class="read-more">
                {{ t('blog.readMore') }}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'
import { useFadeUp } from '../composables/useFadeUp.js'
import { useSeo } from '../composables/useSeo.js'
import { db } from '../firebase.js'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

const router = useRouter()
const { t, currentLanguage } = useLanguage()
useFadeUp()

useSeo({
  title:       'Blog',
  description: 'Practical articles on web engineering, workflow automation, and digital strategy.',
  canonical:   '/blog',
})

const posts     = ref([])
const isLoading = ref(true)

// Safe helper — falls back to EN if BG is missing
function localise(post) {
  return post[currentLanguage.value] ?? post.en ?? { title: '', excerpt: '', content: '' }
}

onMounted(async () => {
  try {
    const q = query(collection(db, 'posts'), orderBy('date', 'desc'))
    const snapshot = await getDocs(q)
    posts.value = snapshot.docs.map(doc => {
      const data = doc.data()
      // DEBUG — open browser console to see structure, remove after confirming
      console.log('Firestore post:', data)
      return {
        id:       doc.id,
        slug:     data.slug || doc.id,
        category: data.category || 'tech',
        readTime: data.readTime || '5',
        date:     data.date,
        image:    data.image || '/images/WhiteLogo.webp',
        en: {
          title:   data.en?.title   || '',
          excerpt: (data.en?.content || '').slice(0, 160) + '…',
          content: data.en?.content || '',
        },
        bg: {
          title:   data.bg?.title   || '',
          excerpt: (data.bg?.content || '').slice(0, 160) + '…',
          content: data.bg?.content || '',
        },
      }
    })
  } catch (err) {
    console.error('Error fetching posts:', err)
  } finally {
    isLoading.value = false
  }
})

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(
    currentLanguage.value === 'bg' ? 'bg-BG' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
}
</script>

<style scoped>
/* ── Card entrance animation ──────────────────────────── */
@keyframes cardIn {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
.card-entrance {
  opacity: 0;
  animation: cardIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* ── Post card ────────────────────────────────────────── */
.post-card {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.018);
  overflow: hidden;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  cursor: none;
}

.post-card:hover {
  border-color: rgba(164,224,75,0.22);
  transform: translateY(-5px);
  box-shadow: 0 24px 60px rgba(0,0,0,0.45);
}

/* ── Image ────────────────────────────────────────────── */
.post-img-wrap {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: var(--surface-3);
  flex-shrink: 0;
}

.post-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease;
  filter: grayscale(0.3);
}

.post-card:hover .post-img {
  transform: scale(1.05);
  filter: grayscale(0);
}

.post-img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-3);
}

.post-cat-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #000;
  background: var(--accent);
  border-radius: 100px;
  padding: 3px 10px;
}

/* ── Content ──────────────────────────────────────────── */
.post-content {
  display: flex;
  flex-direction: column;
  padding: 24px 24px 20px;
  flex: 1;
}

.post-title {
  transition: color 0.2s ease;
}
.post-card:hover .post-title { color: var(--accent); }

.post-excerpt {
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.02em;
  transition: gap 0.2s ease;
}

.post-card:hover .read-more { gap: 9px; }

/* ── Skeleton loading ─────────────────────────────────── */
.skeleton-card {
  height: 360px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.02) 0%,
    rgba(255,255,255,0.05) 50%,
    rgba(255,255,255,0.02) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>