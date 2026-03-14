/**
 * useJsonLd — injects JSON-LD structured data into <head>.
 * Automatically removes the script when the component unmounts
 * (important for SPA navigation — stale schemas must not persist).
 *
 * Usage:
 *   useJsonLd(schemaObject)
 *   useJsonLd([schema1, schema2])   // multiple schemas
 *
 * Pre-built helpers exported below:
 *   localBusinessSchema()
 *   webSiteSchema()
 *   breadcrumbSchema(items)         // items: [{ name, url }]
 *   projectSchema(project)
 *   serviceListSchema(services)
 */

import { onMounted, onUnmounted } from 'vue'

const SITE_URL  = 'https://inrait.com'
const SITE_NAME = 'INRAIT'

export function useJsonLd(schema) {
  let el = null

  onMounted(() => {
    const schemas = Array.isArray(schema) ? schema : [schema]
    schemas.forEach((s, i) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id   = `jsonld-${i}-${Date.now()}`
      script.textContent = JSON.stringify(s)
      document.head.appendChild(script)
      if (i === 0) el = script   // track first for cleanup reference
    })
  })

  onUnmounted(() => {
    // Remove all ld+json scripts added by this instance
    document.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
      if (s.id && s.id.startsWith('jsonld-')) s.remove()
    })
  })
}

// ─── Pre-built schemas ────────────────────────────────────

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    alternateName: 'INRAIT Web Engineering',
    url: SITE_URL,
    logo: `${SITE_URL}/images/WhiteLogo.webp`,
    image: `${SITE_URL}/images/og-cover.jpg`,
    description: 'Custom websites, booking systems, workflow automation (n8n), e-commerce and visual identity — built by INRAIT in Sofia, Bulgaria.',
    telephone: '+359876566094',
    email: 'inkorami27@gmail.com',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sofia',
      addressCountry: 'BG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.6977,
      longitude: 23.3219,
    },
    areaServed: [
      { '@type': 'Country', name: 'Bulgaria' },
      { '@type': 'Place',   name: 'European Union' },
    ],
    serviceType: [
      'Web Design',
      'Web Development',
      'Booking System Development',
      'E-commerce Development',
      'Workflow Automation',
      'Visual Identity Design',
      'Photography',
    ],
    sameAs: [
      'https://linkedin.com/in/inasrami',
      'https://github.com/inasrami',
    ],
    priceRange: '€€',
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: 'Web engineering studio based in Sofia, Bulgaria.',
    publisher: { '@id': `${SITE_URL}/#business` },
    inLanguage: ['en', 'bg'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbSchema(items) {
  // items = [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

export function projectSchema(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/work/${project.slug}`,
    image: `${SITE_URL}${project.image}`,
    dateCreated: project.year,
    creator: { '@id': `${SITE_URL}/#business` },
    keywords: project.stack.join(', '),
    genre: project.tag,
  }
}

export function serviceListSchema(services) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'INRAIT Services',
    url: `${SITE_URL}/services`,
    itemListElement: services.map((svc, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: svc.title,
        description: svc.body,
        provider: { '@id': `${SITE_URL}/#business` },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          price: svc.basePrice,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: svc.basePrice,
            priceCurrency: 'EUR',
            description: 'Starting price — final cost agreed after consultation',
          },
        },
      },
    })),
  }
}