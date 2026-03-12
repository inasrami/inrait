<template>
  <div class="overflow-hidden bg-surface border-y border-[#333336] py-24 flex items-center">
    <div class="marquee-track">
      <div v-for="n in 4" :key="n" class="flex-shrink-0 px-10 font-bold select-none text-stroke-border" style="font-size: clamp(80px, 10vw, 140px); letter-spacing: -0.03em;">
        POWERED BY <span style="-webkit-text-stroke: 0; color: #F5F5F7;">VUE.JS</span> • DRIVEN BY <span style="-webkit-text-stroke: 0; color: #F5F5F7;">DESIGN</span> • ENGINEERED FOR <span style="-webkit-text-stroke: 0; color: #F5F5F7;">SCALE</span> •&nbsp;
      </div>
    </div>
  </div>
</template>
