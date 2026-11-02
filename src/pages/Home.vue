<template>
  <div>
    <HeroSection />
    <ProjectsSection />
    <ServicesSection />
    <AboutSection />
    <ProcessSection />
    <FaqSection />
    <CtaSection />
    <SectionRail />
  </div>
</template>

<script setup>
import { useSeo }          from '../composables/useSeo.js'
import { useLanguage }     from '../composables/useLanguage.js'
import { useJsonLd, localBusinessSchema, webSiteSchema, breadcrumbSchema } from '../composables/Usejsonld.js'
import SectionRail         from '../components/SectionRail.vue'
import HeroSection         from '../components/HeroSection.vue'
import ServicesSection     from '../components/ServicesSection.vue'
import ProjectsSection     from '../components/ProjectsSection.vue'
import AboutSection        from '../components/AboutSection.vue'
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