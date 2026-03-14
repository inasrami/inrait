<template>
  <div class="admin-shell">

    <!-- Login screen -->
    <Transition name="fade">
      <div v-if="!isLoggedIn" class="login-screen">
        <div class="login-card">
          <div class="login-logo">IN<span style="color:var(--accent)">R</span>AIT</div>
          <div class="login-subtitle">Content Studio</div>

          <div class="field-group">
            <label class="field-label">Email</label>
            <input v-model="email" type="email" placeholder="admin@inrait.com" class="field-input" @keyup.enter="login" />
          </div>

          <div class="field-group">
            <label class="field-label">Password</label>
            <input v-model="password" type="password" placeholder="••••••••" class="field-input" @keyup.enter="login" />
          </div>

          <p v-if="loginError" class="login-error">{{ loginError }}</p>

          <button class="w-full btn-accent" @click="login" :disabled="loginLoading">
            <span v-if="loginLoading" class="spinner-sm" />
            <span v-else>Sign in</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Editor -->
    <div v-if="isLoggedIn" class="editor-shell">

      <!-- Topbar -->
      <header class="topbar">
        <div class="topbar-left">
          <span class="topbar-logo">IN<span style="color:var(--accent)">R</span>AIT</span>
          <span class="topbar-divider" />
          <span class="topbar-title">Blog Editor</span>
        </div>
        <div class="topbar-right">
          <span class="status-dot-wrap">
            <span class="status-dot" />
            <span style="font-size:12px; color:var(--accent);">Live</span>
          </span>
          <button class="btn-ghost" @click="logout">Sign out</button>
        </div>
      </header>

      <!-- Two-column body -->
      <div class="editor-body">

        <!-- LEFT: Form -->
        <aside class="editor-form">

          <div class="form-section">
            <div class="form-section-label">Article details</div>

            <div class="field-group">
              <label class="field-label">Title <span class="required">*</span></label>
              <input v-model="post.titleEn" type="text" class="field-input" placeholder="Enter article title…" />
            </div>

            <div class="two-col">
              <div class="field-group">
                <label class="field-label">Category</label>
                <div class="select-wrap">
                  <select v-model="post.category" class="field-input field-select">
                    <option value="tech">Tech</option>
                    <option value="industry">Industry</option>
                    <option value="design">Design</option>
                  </select>
                  <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div class="field-group">
                <label class="field-label">Read time (min)</label>
                <input v-model="post.readTime" type="number" min="1" class="field-input" placeholder="5" />
              </div>
            </div>

            <div class="field-group">
              <label class="field-label">Cover image URL</label>
              <input v-model="post.imageUrl" type="text" class="field-input" placeholder="/images/blog-cover.webp" />
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-label">
              Content <span class="required">*</span>
            </div>
            <div class="field-hint">Supports **bold**, *italic*, ## Heading, - list item, [link](url), ---</div>
            <textarea
              v-model="post.contentEn"
              class="field-input field-textarea"
              placeholder="Write your article in English here…"
              rows="18"
            />
          </div>

          <!-- Publish -->
          <div class="publish-row">
            <div v-if="publishStatus" class="publish-status" :class="publishStatus.type">
              <svg v-if="publishStatus.type === 'success'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {{ publishStatus.msg }}
            </div>
            <button
              class="btn-accent publish-btn"
              @click="publishPost"
              :disabled="isPublishing || !post.titleEn || !post.contentEn"
            >
              <span v-if="isPublishing" class="spinner-sm" />
              <template v-else>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Translate to BG &amp; Publish
              </template>
            </button>
          </div>

        </aside>

        <!-- RIGHT: Live preview -->
        <main class="editor-preview">
          <div class="preview-header">
            <span class="preview-label">Live preview</span>
            <div class="preview-lang-tabs">
              <button class="lang-tab" :class="{ active: previewLang === 'en' }" @click="previewLang = 'en'">EN</button>
              <button class="lang-tab" :class="{ active: previewLang === 'bg' }" @click="previewLang = 'bg'" :disabled="!bgPreview.title">BG</button>
            </div>
          </div>

          <div class="preview-body">
            <div class="preview-meta">
              <span class="preview-cat">{{ post.category || 'tech' }}</span>
              <span class="preview-time">{{ post.readTime || '5' }} min read</span>
              <span class="preview-date">{{ todayFormatted }}</span>
            </div>

            <h1 class="preview-title">
              {{ previewLang === 'en'
                  ? (post.titleEn || 'Your title will appear here…')
                  : (bgPreview.title || 'BG translation will appear after publishing…') }}
            </h1>

            <div v-if="post.imageUrl" class="preview-img-wrap">
              <img :src="post.imageUrl" alt="Cover" class="preview-img" />
            </div>
            <div v-else class="preview-img-placeholder">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <span>No image URL set</span>
            </div>

            <div class="preview-content">
              <template v-if="previewLang === 'en'">
                <template v-if="post.contentEn">
                  <template v-for="(block, i) in parsedEN" :key="i">
                    <h2 v-if="block.type==='h2'" class="preview-h2">{{ block.text }}</h2>
                    <p v-else-if="block.type==='p'" class="preview-p" v-html="block.html" />
                    <ul v-else-if="block.type==='ul'" class="preview-ul">
                      <li v-for="(item,j) in block.items" :key="j" v-html="item" />
                    </ul>
                    <hr v-else-if="block.type==='hr'" class="preview-hr" />
                  </template>
                </template>
                <p v-else class="preview-placeholder">Your article content will appear here as you type…</p>
              </template>
              <template v-else>
                <p v-if="!bgPreview.content" class="preview-placeholder">Publish to see the Bulgarian translation.</p>
                <template v-else>
                  <template v-for="(block, i) in parsedBG" :key="i">
                    <h2 v-if="block.type==='h2'" class="preview-h2">{{ block.text }}</h2>
                    <p v-else-if="block.type==='p'" class="preview-p" v-html="block.html" />
                    <ul v-else-if="block.type==='ul'" class="preview-ul">
                      <li v-for="(item,j) in block.items" :key="j" v-html="item" />
                    </ul>
                    <hr v-else-if="block.type==='hr'" class="preview-hr" />
                  </template>
                </template>
              </template>
            </div>
          </div>
        </main>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { auth, db } from '../firebase.js'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'

// ── Auth ──────────────────────────────────────────────────
const isLoggedIn   = ref(false)
const loginLoading = ref(false)
const loginError   = ref('')
const email        = ref('')
const password     = ref('')

async function login() {
  loginError.value   = ''
  loginLoading.value = true
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    isLoggedIn.value = true
  } catch (err) {
    loginError.value = err.message.includes('wrong-password') || err.message.includes('user-not-found')
      ? 'Invalid email or password.'
      : 'Login failed. Check your credentials.'
  } finally {
    loginLoading.value = false
  }
}

async function logout() {
  await signOut(auth)
  isLoggedIn.value = false
  email.value = ''
  password.value = ''
}

// ── Post state ────────────────────────────────────────────
const post = ref({ titleEn: '', contentEn: '', imageUrl: '', category: 'tech', readTime: 5 })
const isPublishing  = ref(false)
const publishStatus = ref(null)
const previewLang   = ref('en')
const bgPreview     = ref({ title: '', content: '' })

// ── DeepL via corsproxy.io ────────────────────────────────
const DEEPL_KEY = import.meta.env.VITE_DEEPL_API_KEY

async function translateText(text, targetLang) {
  const res = await fetch('https://corsproxy.io/?https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${DEEPL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: [text], target_lang: targetLang }),
  })
  if (!res.ok) throw new Error('Translation failed. Check your DeepL API key.')
  const data = await res.json()
  return data.translations[0].text
}

// ── Publish ───────────────────────────────────────────────
async function publishPost() {
  if (!post.value.titleEn || !post.value.contentEn) return
  isPublishing.value  = true
  publishStatus.value = null

  try {
    const titleBg   = await translateText(post.value.titleEn, 'BG')
    const contentBg = await translateText(post.value.contentEn, 'BG')

    await addDoc(collection(db, 'posts'), {
      slug:     post.value.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      date:     new Date().toISOString(),
      image:    post.value.imageUrl || '/images/WhiteLogo.webp',
      category: post.value.category,
      readTime: String(post.value.readTime),
      en: { title: post.value.titleEn,  content: post.value.contentEn },
      bg: { title: titleBg,             content: contentBg },
    })

    bgPreview.value     = { title: titleBg, content: contentBg }
    previewLang.value   = 'bg'
    publishStatus.value = { type: 'success', msg: 'Published and translated successfully!' }

    setTimeout(() => {
      post.value          = { titleEn: '', contentEn: '', imageUrl: '', category: 'tech', readTime: 5 }
      bgPreview.value     = { title: '', content: '' }
      previewLang.value   = 'en'
      publishStatus.value = null
    }, 3000)

  } catch (err) {
    publishStatus.value = { type: 'error', msg: err.message }
  } finally {
    isPublishing.value = false
  }
}

// ── Markdown parser ───────────────────────────────────────
function parseMarkdown(raw) {
  const lines  = (raw || '').split('\n')
  const blocks = []
  let listBuf  = []

  function flush() {
    if (listBuf.length) {
      blocks.push({ type: 'ul', items: listBuf.map(fmt) })
      listBuf = []
    }
  }

  for (const line of lines) {
    const s = line.trim()
    if (!s) { flush(); continue }
    if (s.startsWith('## '))     { flush(); blocks.push({ type: 'h2', text: s.slice(3) }); continue }
    if (/^\*\*[^*]+\*\*$/.test(s)) { flush(); blocks.push({ type: 'h2', text: s.slice(2,-2) }); continue }
    if (s === '---')             { flush(); blocks.push({ type: 'hr' }); continue }
    if (s.startsWith('- '))      { listBuf.push(s.slice(2)); continue }
    flush()
    blocks.push({ type: 'p', html: fmt(s) })
  }
  flush()
  return blocks
}

function fmt(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, (_, label, url) =>
      `<a href="${url}" style="color:var(--accent);text-decoration:underline;">${label}</a>`)
}

const parsedEN = computed(() => parseMarkdown(post.value.contentEn))
const parsedBG = computed(() => parseMarkdown(bgPreview.value.content))

const todayFormatted = new Date().toLocaleDateString('en-GB', {
  year: 'numeric', month: 'long', day: 'numeric',
})
</script>

<style scoped>
.admin-shell {
  --accent:  #A4E04B;
  --bg:      #080808;
  --surface: #111111;
  --surface2:#181818;
  --border:  rgba(255,255,255,0.07);
  --border2: rgba(255,255,255,0.12);
  --text:    #F5F5F7;
  --muted:   #888;
  --dim:     #444;
  font-family: 'DM Sans', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}

/* ── Login ──────────────────────────────────────────────── */
.login-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: 24px;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.login-logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 36px;
  letter-spacing: 0.06em;
  text-align: center;
}

.login-subtitle {
  text-align: center;
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: -12px;
}

.login-error {
  font-size: 13px;
  color: #ff6060;
  padding: 10px 14px;
  background: rgba(255,60,60,0.07);
  border: 1px solid rgba(255,60,60,0.2);
  border-radius: 8px;
}

/* ── Topbar ─────────────────────────────────────────────── */
.topbar {
  height: 54px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(16px);
  position: sticky;
  top: 0;
  z-index: 50;
  flex-shrink: 0;
}

.topbar-left  { display: flex; align-items: center; gap: 12px; }
.topbar-right { display: flex; align-items: center; gap: 16px; }
.topbar-logo  { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.06em; }
.topbar-divider { width: 1px; height: 16px; background: var(--border2); }
.topbar-title { font-size: 13px; color: var(--muted); font-weight: 500; }

.status-dot-wrap { display: flex; align-items: center; gap: 6px; }
.status-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  animation: glow 2.5s ease-in-out infinite;
}
@keyframes glow {
  0%,100% { box-shadow: 0 0 6px var(--accent); }
  50%     { box-shadow: 0 0 14px var(--accent); }
}

/* ── Editor layout ──────────────────────────────────────── */
.editor-shell { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }

.editor-body {
  display: grid;
  grid-template-columns: 460px 1fr;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

/* ── Form ───────────────────────────────────────────────── */
.editor-form {
  overflow-y: auto;
  border-right: 1px solid var(--border);
  background: var(--surface);
  padding: 24px 24px 80px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-section {
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--border);
}
.form-section:last-of-type { border-bottom: none; }

.form-section-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 16px;
}

.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

.field-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
.field-group:last-child { margin-bottom: 0; }

.field-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dim);
}

.required { color: var(--accent); }

.field-hint {
  font-size: 11px;
  color: var(--dim);
  font-family: monospace;
  margin-bottom: 10px;
  line-height: 1.6;
}

.field-input {
  background: var(--surface2);
  border: 1px solid var(--border2);
  border-radius: 10px;
  padding: 11px 14px;
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease;
  width: 100%;
  resize: none;
  box-sizing: border-box;
}

.field-input:focus {
  border-color: rgba(164,224,75,0.4);
  background: rgba(164,224,75,0.025);
}

.field-input::placeholder { color: var(--dim); }

.field-textarea {
  font-family: 'DM Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.75;
  min-height: 300px;
}

.select-wrap { position: relative; }
.field-select { appearance: none; padding-right: 32px; cursor: pointer; }
.field-select option { background: #111; }
.select-chevron {
  position: absolute; right: 12px; top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  pointer-events: none;
}

/* ── Publish row ────────────────────────────────────────── */
.publish-row { display: flex; flex-direction: column; gap: 10px; margin-top: 4px; }
.publish-btn { width: 100%; }

.publish-status {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; padding: 10px 14px; border-radius: 10px;
}
.publish-status.success {
  color: var(--accent);
  background: rgba(164,224,75,0.07);
  border: 1px solid rgba(164,224,75,0.2);
}
.publish-status.error {
  color: #ff7070;
  background: rgba(255,60,60,0.07);
  border: 1px solid rgba(255,60,60,0.18);
}

/* ── Buttons ────────────────────────────────────────────── */
.btn-accent {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px 24px;
  background: var(--accent); color: #000;
  font-weight: 700; font-size: 13px;
  border-radius: 100px; border: none;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}
.btn-accent:hover:not(:disabled) { background: #b8f05a; transform: translateY(-1px); }
.btn-accent:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }

.btn-ghost {
  font-size: 12px; color: var(--muted);
  background: transparent; border: 1px solid var(--border);
  border-radius: 100px; padding: 6px 14px; cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.btn-ghost:hover { color: var(--text); border-color: var(--border2); }

.w-full { width: 100%; }

/* ── Preview panel ──────────────────────────────────────── */
.editor-preview { display: flex; flex-direction: column; overflow: hidden; background: var(--bg); }

.preview-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 32px;
  border-bottom: 1px solid var(--border);
  background: rgba(0,0,0,0.25);
  flex-shrink: 0;
}

.preview-label {
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--dim);
}

.preview-lang-tabs {
  display: flex; gap: 2px;
  background: var(--surface2);
  border-radius: 100px; padding: 3px;
  border: 1px solid var(--border);
}

.lang-tab {
  font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
  padding: 4px 12px; border-radius: 100px; border: none;
  background: transparent; color: var(--muted); cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.lang-tab.active { background: var(--accent); color: #000; }
.lang-tab:disabled { opacity: 0.3; cursor: not-allowed; }

.preview-body {
  flex: 1; overflow-y: auto;
  padding: 40px 48px 80px;
}

.preview-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }

.preview-cat {
  font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  color: #000; background: var(--accent); border-radius: 100px; padding: 3px 10px;
}
.preview-time, .preview-date { font-size: 12px; color: var(--dim); }

.preview-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(32px, 4vw, 56px);
  letter-spacing: 0.02em; line-height: 1.05;
  margin-bottom: 28px; color: var(--text);
}

.preview-img-wrap {
  width: 100%; aspect-ratio: 16/7;
  border-radius: 14px; overflow: hidden;
  margin-bottom: 28px; background: var(--surface2);
}
.preview-img { width: 100%; height: 100%; object-fit: cover; }

.preview-img-placeholder {
  width: 100%; aspect-ratio: 16/7;
  border-radius: 14px;
  border: 1px dashed var(--border2);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 10px; margin-bottom: 28px;
  color: var(--dim); font-size: 12px;
}

.preview-placeholder { font-size: 15px; color: var(--dim); font-style: italic; }

.preview-h2 {
  font-size: 19px; font-weight: 700;
  color: var(--text); margin: 32px 0 10px;
  letter-spacing: -0.02em;
}
.preview-p { font-size: 15px; color: #999; line-height: 1.8; margin-bottom: 16px; }
.preview-ul { list-style: none; padding: 0; margin: 0 0 16px; display: flex; flex-direction: column; gap: 8px; }
.preview-ul li { font-size: 14px; color: #999; line-height: 1.7; padding-left: 18px; position: relative; }
.preview-ul li::before { content: ''; position: absolute; left: 0; top: 9px; width: 5px; height: 5px; border-radius: 50%; background: var(--accent); }
.preview-hr { border: none; border-top: 1px solid var(--border); margin: 32px 0; }

/* ── Spinner ────────────────────────────────────────────── */
.spinner-sm {
  width: 14px; height: 14px; border-radius: 50%;
  border: 2px solid rgba(0,0,0,0.15); border-top-color: #000;
  animation: spin 0.7s linear infinite; flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Transitions ────────────────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>