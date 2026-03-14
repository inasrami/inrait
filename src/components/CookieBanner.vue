<template>
  <Teleport to="body">
    <Transition name="cookie">
      <div v-if="visible" class="cookie-banner" role="dialog" aria-label="Cookie consent">
        <div class="max-w-[1080px] mx-auto px-6 flex flex-wrap items-center justify-between gap-4">

          <div class="flex items-start flex-1 min-w-0 gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:1px;">
              <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2z"/>
              <circle cx="8.5" cy="10.5" r="1" fill="var(--accent)" stroke="none"/>
              <circle cx="14.5" cy="8" r="1" fill="var(--accent)" stroke="none"/>
              <circle cx="15" cy="14" r="1" fill="var(--accent)" stroke="none"/>
            </svg>
            <p class="text-[13px] text-text-muted leading-relaxed">
              We use essential cookies to keep the site running. No tracking, no advertising.
              <RouterLink to="/privacy" class="ml-1 text-accent underline-offset-2 hover:underline" style="cursor:none;">
                Privacy Policy
              </RouterLink>
            </p>
          </div>

          <div class="flex items-center flex-shrink-0 gap-3">
            <button class="cookie-decline" @click="decline" style="cursor:none;">
              Decline
            </button>
            <button class="cookie-accept" @click="accept" style="cursor:none;">
              Accept
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const STORAGE_KEY = 'inrait_cookie_consent'
const visible = ref(false)

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    // Small delay so it doesn't flash immediately on load
    setTimeout(() => { visible.value = true }, 1200)
  }
})

function accept() {
  localStorage.setItem(STORAGE_KEY, 'accepted')
  visible.value = false
}

function decline() {
  localStorage.setItem(STORAGE_KEY, 'declined')
  visible.value = false
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9000;
  background: rgba(10,10,10,0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--border-strong);
  padding: 16px 0;
}

.cookie-accept {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  background: var(--accent);
  color: #000;
  font-size: 13px;
  font-weight: 600;
  border-radius: 100px;
  border: none;
  transition: background 0.2s ease, transform 0.2s ease;
  cursor: none;
}

.cookie-accept:hover {
  background: #b8f05a;
  transform: translateY(-1px);
}

.cookie-decline {
  display: inline-flex;
  align-items: center;
  padding: 9px 18px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  border: 1px solid var(--border-strong);
  border-radius: 100px;
  background: transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
  cursor: none;
}

.cookie-decline:hover {
  color: var(--text);
  border-color: rgba(255,255,255,0.2);
}

.cookie-enter-active, .cookie-leave-active {
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
}
.cookie-enter-from, .cookie-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>