<template>
  <div>
    <HeroSection />
    <PhilosophySection />
    <ServicesSection />
    <IntegrationsSection />
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
import IntegrationsSection from '../components/IntegrationsSection.vue'
import ProjectsSection     from '../components/ProjectsSection.vue'
import ComparisonTable     from '../components/Comparisontable.vue'
import AboutSection        from '../components/AboutSection.vue'
import TechSpecs           from '../components/TechSpecs.vue'
import ProcessSection      from '../components/ProcessSection.vue'
import FaqSection          from '../components/Faqsection.vue'
import CtaSection          from '../components/CtaSection.vue'

useSeo({
  title:       'Websites, Booking Systems & Automation in Sofia',
  description: 'Custom websites, booking systems, stores and automation for hotels, restaurants and service businesses in Bulgaria and the EU. Get a free estimate.',
  canonical:   '/',
})

useJsonLd([
  localBusinessSchema(),
  webSiteSchema(),
  breadcrumbSchema([{ name: 'Home', url: '/' }]),
])
</script>