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
    <SectionRail />
  </div>
</template>

<script setup>
import SectionRail from '../components/SectionRail.vue'
import { useSeo }          from '../composables/useSeo.js'
import { useLanguage }     from '../composables/useLanguage.js'
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

const { t } = useLanguage()

useSeo(() => ({
  title:       t('seo.home.title'),
  description: t('seo.home.description'),
  canonical:   '/',
}))

useJsonLd([
  localBusinessSchema(),
  webSiteSchema(),
  breadcrumbSchema([{ name: 'Home', url: '/' }]),
])
</script>