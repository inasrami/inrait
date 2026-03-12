<template>
  <!-- Matches original: padding: 100px 22px 200px, max-width 1080px -->
  <section id="work" class="px-5 max-w-[1080px] mx-auto" style="padding-top: 100px; padding-bottom: 200px; position: relative;">

    <h2 class="font-semibold text-center fade-up" style="font-size: 56px; margin-bottom: 80px; letter-spacing: -0.01em;">
      Pro level projects.
    </h2>

    <!-- sticky-card-wrapper: sticky top:120px, stacking z-index, pb:40px -->
    <div
      v-for="(project, index) in projects"
      :key="project.id"
      class="sticky"
      :style="{
        top: '120px',
        zIndex: index + 1,
        paddingBottom: '40px',
      }"
    >
      <!-- project-card: matches original padding 80px 60px, border-radius 32px, shadow -->
      <div
        :ref="el => cardRefs[index] = el"
        :class="project.darker ? 'bg-[#1D1D1F]' : 'bg-[#111111]'"
        class="flex flex-col items-center text-center"
        :style="{
          borderRadius: '32px',
          padding: '80px 60px',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.8)',
          border: '1px solid #333336',
          transformOrigin: 'top center',
          transform: `scale(${cardScales[index]})`,
          transition: 'transform 0.1s ease-out',
          willChange: 'transform',
        }"
      >
        <!-- project-tag -->
        <span
          class="font-semibold uppercase text-accent"
          style="font-size: 14px; letter-spacing: 2px; margin-bottom: 16px; display: block;"
        >
          {{ project.tag }}
        </span>

        <!-- project-title -->
        <h3 class="font-semibold" style="font-size: 48px; letter-spacing: -0.01em; margin-bottom: 16px;">
          {{ project.title }}
        </h3>

        <!-- project-desc -->
        <p class="text-text-muted" style="font-size: 21px; max-width: 500px; margin-bottom: 40px; line-height: 1.5;">
          {{ project.description }}
        </p>

        <!-- btn — matches original .btn .btn-primary / .btn-accent -->
        <a
          :href="project.url"
          target="_blank"
          rel="noopener"
          :class="project.btnAccent
            ? 'bg-accent text-black hover:bg-[#8cc23e]'
            : 'bg-[#F5F5F7] text-black hover:bg-white'"
          class="inline-flex items-center justify-center hover:scale-[1.03] transition-all duration-300"
          style="padding: 14px 28px; border-radius: 980px; font-size: 15px; font-weight: 500; text-decoration: none;"
        >
          {{ project.cta }}
        </a>

        <!-- Project image — replaces original .project-mockup placeholder -->
        <div
          class="w-full overflow-hidden"
          style="max-width: 800px; height: 350px; border-radius: 20px; border: 1px solid #333336; margin-top: 20px; background: #000; position: relative;"
        >
          <img
            v-if="project.image"
            :src="`/images/${project.image}`"
            :alt="`${project.title} preview`"
            class="object-cover object-top w-full h-full transition-transform duration-700 ease-out"
            style="display: block;"
            @mouseover="e => e.target.style.transform = 'scale(1.03)'"
            @mouseleave="e => e.target.style.transform = 'scale(1)'"
          />
          <!-- Fallback while image not yet added -->
          <div
            v-else
            class="flex items-center justify-center w-full h-full"
            style="color: #444; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;"
          >
            {{ project.title }} Preview
          </div>

          <!-- Subtle gradient overlay at bottom for depth -->
          <div
            class="absolute bottom-0 left-0 w-full pointer-events-none"
            style="height: 80px; background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);"
          />
        </div>

      </div>
    </div>

  </section>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'
import { useFadeUp } from '../composables/useFadeUp'

useFadeUp()

const projects = [
  {
    id: 'card-1',
    darker: false,
    tag: 'Vue.js / Tailwind CSS',
    title: 'Barbers Unity.',
    description: 'A complete booking platform architecture allowing dynamic profile management and seamless client scheduling.',
    url: 'https://barbersunity.com',
    cta: 'View Platform',
    btnAccent: false,
    image: 'barbersUnity.png', // ← replace with your filename in public/images/
  },
  {
    id: 'card-2',
    darker: true,
    tag: 'JavaScript / SheetJS',
    title: 'ShiftEase.',
    description: 'Intuitive web-based scheduling tool to easily generate, visualize, and export optimized work schedules.',
    url: 'https://shift-ease-kappa.vercel.app',
    cta: 'Launch App',
    btnAccent: false,
    image: 'shiftEase.png', // ← replace with your filename in public/images/
  },
  {
    id: 'card-3',
    darker: false,
    tag: 'Vue 3 / MongoDB',
    title: 'Hotel Prestige.',
    description: 'Full-stack hospitality booking system featuring a responsive UI integrated with real-time database management.',
    url: 'https://hotel-prestige.vercel.app',
    cta: 'Explore Site',
    btnAccent: true,
    image: 'hotelprestige.png', // ← replace with your filename in public/images/
  },
  {
    id: 'card-4',
    darker: true,
    tag: 'JavaScript / Computer Vision',
    title: 'DNA of Design.',
    description: 'An analytical web application extracting dominant color palettes from any live website using ScreenshotAPI.',
    url: 'https://github.com/inasrami/dna-of-design.git',
    cta: 'View GitHub Repo',
    btnAccent: false,
    image: 'dnaofdesign.png', // ← replace with your filename in public/images/
  },
  {
    id: 'card-5',
    darker: true,
    tag: 'Vue.js / Tailwind CSS',
    title: 'Aurum.',
    description: 'A high-end digital experience for a luxury hotel brand, focusing on elegance and atmosphere.',
    url: 'https://inasrami.github.io/aurum-luxury/',
    cta: 'Explore Site',
    btnAccent: false,
    image: 'aurum.png', // ← replace with your filename in public/images/
  },
]

const cardRefs   = reactive([])
const cardScales = reactive(projects.map(() => 1))

function onScroll() {
  cardRefs.forEach((card, index) => {
    if (!card) return
    const rect = card.parentElement.getBoundingClientRect()
    if (rect.top <= 120) {
      const distancePast = 120 - rect.top
      cardScales[index] = Math.max(0.9, 1 - distancePast * 0.0005)
    } else {
      cardScales[index] = 1
    }
  })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
