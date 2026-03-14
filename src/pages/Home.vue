<template>
  <div>
    <HeroSection />
    <SkillsStrip />
    <PhilosophySection />
    <StatsStrip />
    <ServicesSection />
    <ClientLogos />
    <ProjectsSection />
    <AboutSection />
    <TechSpecs />
    <TestimonialsSection />
    <ProcessSection />
    <CtaSection />
  </div>
</template>

<script setup>
import { useSeo }            from '../composables/useSeo.js'
import { useJsonLd, localBusinessSchema, webSiteSchema, breadcrumbSchema } from '../composables/useJsonLd.js'
import HeroSection           from '../components/HeroSection.vue'
import SkillsStrip           from '../components/SkillsStrip.vue'
import PhilosophySection     from '../components/PhilosophySection.vue'
import StatsStrip            from '../components/StatsStrip.vue'
import ServicesSection       from '../components/ServicesSection.vue'
import ClientLogos           from '../components/ClientLogos.vue'
import ProjectsSection       from '../components/ProjectsSection.vue'
import AboutSection          from '../components/AboutSection.vue'
import TechSpecs             from '../components/TechSpecs.vue'
import TestimonialsSection   from '../components/TestimonialsSection.vue'
import ProcessSection        from '../components/ProcessSection.vue'
import CtaSection            from '../components/CtaSection.vue'

useSeo({
  title:       'Web Engineering Studio Sofia',
  description: 'Custom websites, booking systems, workflow automation (n8n), e-commerce and visual identity — built by INRAIT in Sofia, Bulgaria.',
  canonical:   '/',
})

useJsonLd([
  localBusinessSchema(),
  webSiteSchema(),
  breadcrumbSchema([{ name: 'Home', url: '/' }]),
])
</script>