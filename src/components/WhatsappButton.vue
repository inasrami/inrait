<template>
  <Teleport to="body">
    <Transition name="fab">
      <a
        v-if="visible"
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="whatsapp-fab"
        :class="{ 'fab-expanded': hovered }"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        aria-label="Chat on WhatsApp"
        data-cursor
      >
        <!-- WhatsApp SVG icon -->
        <svg class="fab-icon" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <!-- Label shown on hover -->
        <span class="fab-label">Chat on WhatsApp</span>
      </a>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route   = useRoute()
const hovered = ref(false)
const visible = ref(false)

// Your WhatsApp number in international format — no + or spaces
const PHONE   = '359876566094'
const MESSAGE = encodeURIComponent('Hi! I found you through your website and I\'d like to discuss a project.')

const whatsappUrl = computed(() =>
  `https://wa.me/${PHONE}?text=${MESSAGE}`
)

// Don't show on contact page — redundant there
const shouldShow = computed(() => route.path !== '/contact')

onMounted(() => {
  setTimeout(() => { visible.value = shouldShow.value }, 2000)
})
</script>

<style scoped>
.whatsapp-fab {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 8000;
  display: inline-flex;
  align-items: center;
  gap: 0;
  background: #25D366;
  color: #fff;
  border-radius: 100px;
  padding: 14px;
  box-shadow: 0 8px 32px rgba(37,211,102,0.35), 0 2px 8px rgba(0,0,0,0.3);
  transition: padding 0.3s cubic-bezier(0.16,1,0.3,1),
              gap 0.3s cubic-bezier(0.16,1,0.3,1),
              box-shadow 0.3s ease,
              transform 0.3s ease;
  text-decoration: none;
  overflow: hidden;
  cursor: none;
}

.whatsapp-fab:hover,
.fab-expanded {
  padding: 14px 20px;
  gap: 10px;
  box-shadow: 0 12px 40px rgba(37,211,102,0.45), 0 4px 12px rgba(0,0,0,0.3);
  transform: translateY(-2px);
}

.fab-icon {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.whatsapp-fab:hover .fab-icon {
  transform: scale(1.05);
}

.fab-label {
  font-size: 13px;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  white-space: nowrap;
  max-width: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-width 0.35s cubic-bezier(0.16,1,0.3,1),
              opacity 0.25s ease;
}

.fab-expanded .fab-label,
.whatsapp-fab:hover .fab-label {
  max-width: 180px;
  opacity: 1;
}

/* Entrance animation */
.fab-enter-active {
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
}
.fab-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

/* Pulse ring */
.whatsapp-fab::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 100px;
  border: 2px solid #25D366;
  animation: pulse-ring 2.5s ease-out infinite;
  opacity: 0;
}

@keyframes pulse-ring {
  0%   { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.6); opacity: 0; }
}
</style>