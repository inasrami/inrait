<template>
  <div class="bg-bg-base text-text-main min-h-screen overflow-x-hidden">

    <AppNav />

    <main>
      <HeroSection />
      <PhilosophySection />
      <MarqueeStrip />
      <TechSpecs />
      <ProjectsSection />
      <TimelineSection />
    </main>

    <AppFooter />

  </div>
</template>

<script setup>
import AppNav          from './components/AppNav.vue'
import HeroSection     from './components/HeroSection.vue'
import PhilosophySection from './components/PhilosophySection.vue'
import MarqueeStrip    from './components/MarqueeStrip.vue'
import TechSpecs       from './components/TechSpecs.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import AppFooter       from './components/AppFooter.vue'
</script>
