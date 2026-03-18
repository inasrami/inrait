<template>
  <section class="py-24 bg-surface border-t border-[#333336]" style="padding-top: 100px; padding-bottom: 160px;">
    <div class="max-w-[1080px] mx-auto px-5">

      <h2 class="fade-up text-[56px] font-semibold text-center mb-20" style="letter-spacing: -0.01em;">
        {{ t('timeline.title') }}
      </h2>

      <div class="relative max-w-[800px] mx-auto">

        <!-- Vertical line -->
        <div class="absolute top-0 bottom-0 w-px bg-[#333336]" style="left: 40px;" />

        <div
          v-for="(item, i) in items"
          :key="item.title"
          class="fade-up relative mb-[60px] last:mb-0"
          style="padding-left: 60px;"
          :style="{ transitionDelay: `${i * 100}ms` }"
        >
          <!-- Dot -->
          <div
            class="absolute border-2 rounded-full bg-bg-base border-accent"
            style="left: 14px; top: 8px; width: 12px; height: 12px; box-shadow: 0 0 10px #A4E04B;"
          />

          <p class="text-[14px] font-semibold text-accent mb-2" style="letter-spacing: 1px;">
            {{ item.date }}
          </p>
          <h3 class="text-[24px] font-semibold text-text-main mb-2">{{ item.title }}</h3>
          <p class="text-[17px] text-text-muted leading-relaxed">{{ item.subtitle }}</p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useFadeUp } from '../composables/useFadeUp'
import { useLanguage } from '../composables/useLanguage.js'

useFadeUp()
const { t } = useLanguage()

const items = computed(() => t('timeline.items'))
</script>