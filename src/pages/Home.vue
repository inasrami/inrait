<template>
  <div>
    <HeroSection />        <!-- 1. Hook — who we are, instant credibility -->
    <SkillsStrip />        <!-- 2. Skills ticker — signals breadth fast -->
    <PhilosophySection />  <!-- 3. Philosophy — builds emotional trust -->
    <StatsStrip />         <!-- 4. Numbers — social proof -->
    <ServicesSection />    <!-- 5. Services — what can you actually do for me? -->
    <ClientLogos />        <!-- 6. Logos — others trust you, so can I -->
    <ProjectsSection />    <!-- 7. Projects — here's the proof -->
    <AboutSection />       <!-- 8. About — now I want to know who's behind this -->
    <TechSpecs />          <!-- 9. Stack — technical credibility -->
    <TestimonialsSection /><!-- 10. Testimonials — final trust seal -->
    <ProcessSection />     <!-- 11. Process — shows you're professional to work with -->
    <CtaSection />         <!-- 12. CTA — make contact -->
  </div>
</template>

<script setup>
import HeroSection        from '../components/HeroSection.vue'
import SkillsStrip        from '../components/SkillsStrip.vue'
import PhilosophySection  from '../components/PhilosophySection.vue'
import StatsStrip         from '../components/StatsStrip.vue'
import ServicesSection    from '../components/ServicesSection.vue'
import ClientLogos        from '../components/ClientLogos.vue'
import ProjectsSection    from '../components/ProjectsSection.vue'
import AboutSection       from '../components/AboutSection.vue'
import TechSpecs          from '../components/TechSpecs.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import ProcessSection     from '../components/ProcessSection.vue'
import CtaSection         from '../components/CtaSection.vue'
</script>