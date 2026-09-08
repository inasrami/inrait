<template>
  <div>
    <HeroSection />
    <PhilosophySection />
    <ServicesSection />
    <ProjectsSection />
    <ComparisonTable />
    <AboutSection />
    <TechSpecs />
    <ProcessSection />
    <FaqSection />
    <CtaSection />
  </div>
</template>

<script setup>
import { useSeo }          from '../composables/useSeo.js'
import { useJsonLd, localBusinessSchema, webSiteSchema, breadcrumbSchema } from '../composables/Usejsonld.js'
import HeroSection         from '../components/HeroSection.vue'
import PhilosophySection   from '../components/PhilosophySection.vue'
import ServicesSection     from '../components/ServicesSection.vue'
import ProjectsSection     from '../components/ProjectsSection.vue'
import ComparisonTable     from '../components/ComparisonTable.vue'
import AboutSection        from '../components/AboutSection.vue'
import TechSpecs           from '../components/TechSpecs.vue'
import ProcessSection      from '../components/ProcessSection.vue'
import FaqSection          from '../components/FaqSection.vue'
import CtaSection          from '../components/CtaSection.vue'

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