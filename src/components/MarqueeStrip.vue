<template>
  <div class="overflow-hidden bg-surface border-y border-[#333336] py-24 flex items-center">
    <div class="marquee-track">
      <div v-for="n in 4" :key="n" class="flex-shrink-0 px-10 font-bold select-none text-stroke-border" style="font-size: clamp(80px, 10vw, 140px); letter-spacing: -0.03em;">
        {{ t('marquee.powered') }} <span style="-webkit-text-stroke: 0; color: #F5F5F7;">{{ t('marquee.vuejs') }}</span> • {{ t('marquee.drivenBy') }} <span style="-webkit-text-stroke: 0; color: #F5F5F7;">{{ t('marquee.design') }}</span> • {{ t('marquee.engineered') }} <span style="-webkit-text-stroke: 0; color: #F5F5F7;">{{ t('marquee.scale') }}</span> •&nbsp;
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage.js'
const { t } = useLanguage()
</script>