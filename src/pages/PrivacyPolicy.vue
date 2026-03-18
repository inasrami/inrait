<template>
  <div class="min-h-screen px-6 pb-32 pt-36">
    <div class="max-w-[720px] mx-auto">

      <div class="mb-4 section-label">{{ t('privacy.label') }}</div>
      <h1 class="font-display text-[clamp(48px,8vw,80px)] mb-4 leading-none" style="letter-spacing:0.02em;">
        {{ t('privacy.title') }}
      </h1>
      <p class="text-text-muted text-[14px] mb-16">{{ t('privacy.updated') }}</p>

      <div class="policy-body">

        <section>
          <h2>{{ s.who.heading }}</h2>
          <p>{{ s.who.body }}</p>
        </section>

        <section>
          <h2>{{ s.what.heading }}</h2>
          <p>{{ s.what.intro }}</p>
          <ul>
            <li v-for="item in s.what.items" :key="item"><strong>{{ item.split(':')[0] }}:</strong>{{ item.includes(':') ? item.slice(item.indexOf(':') + 1) : '' }}</li>
          </ul>
          <p>{{ s.what.outro }}</p>
        </section>

        <section>
          <h2>{{ s.how.heading }}</h2>
          <p>{{ s.how.intro }}</p>
          <ul>
            <li v-for="item in s.how.items" :key="item">{{ item }}</li>
          </ul>
          <p>{{ s.how.outro }}</p>
        </section>

        <section>
          <h2>{{ s.legal.heading }}</h2>
          <p>{{ s.legal.intro }}</p>
          <ul>
            <li v-for="item in s.legal.items" :key="item"><strong>{{ item.split(':')[0] }}:</strong>{{ item.includes(':') ? item.slice(item.indexOf(':') + 1) : '' }}</li>
          </ul>
        </section>

        <section>
          <h2>{{ s.retention.heading }}</h2>
          <p>{{ s.retention.body }}</p>
        </section>

        <section>
          <h2>{{ s.thirdParty.heading }}</h2>
          <p>{{ s.thirdParty.emailjs }}</p>
          <p>{{ s.thirdParty.hosting }}</p>
        </section>

        <section>
          <h2>{{ s.rights.heading }}</h2>
          <p>{{ s.rights.intro }}</p>
          <ul>
            <li v-for="item in s.rights.items" :key="item"><strong>{{ item.split(' — ')[0] }}</strong> — {{ item.includes(' — ') ? item.split(' — ')[1] : '' }}</li>
          </ul>
          <p>{{ s.rights.contact }}</p>
          <p>{{ s.rights.complaint }}</p>
        </section>

        <section>
          <h2>{{ s.cookies.heading }}</h2>
          <p>{{ s.cookies.body }}</p>
        </section>

        <section>
          <h2>{{ s.children.heading }}</h2>
          <p>{{ s.children.body }}</p>
        </section>

        <section>
          <h2>{{ s.changes.heading }}</h2>
          <p>{{ s.changes.body }}</p>
        </section>

        <section>
          <h2>{{ s.contactSection.heading }}</h2>
          <p>
            {{ s.contactSection.body }}<br/>
            <strong>INRAIT Web Engineering</strong><br/>
            Sofia, Bulgaria<br/>
            <a href="mailto:inkorami27@gmail.com">inkorami27@gmail.com</a><br/>
            <a href="tel:+359876566094">+359 876 566 094</a>
          </p>
        </section>

      </div>

      <div class="flex flex-wrap gap-4 pt-8 mt-16" style="border-top:1px solid var(--border);">
        <RouterLink to="/" class="btn-outline text-[13px] py-3 px-5">{{ t('privacy.backHome') }}</RouterLink>
        <RouterLink to="/contact" class="btn-outline text-[13px] py-3 px-5">{{ t('privacy.contact') }}</RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '../composables/useSeo.js'
import { useJsonLd, breadcrumbSchema } from '../composables/useJsonLd.js'
import { useLanguage } from '../composables/useLanguage.js'

const { t } = useLanguage()

const s = computed(() => t('privacy.sections'))

useSeo({
  title:       'Privacy Policy',
  description: 'INRAIT privacy policy — how we collect, use, and protect your personal data under GDPR and Bulgarian law.',
  canonical:   '/privacy',
})
useJsonLd(breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy' }]))
</script>

<style scoped>
.policy-body {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.policy-body section h2 {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text);
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.policy-body p {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.75;
  margin-bottom: 12px;
}

.policy-body p:last-child { margin-bottom: 0; }

.policy-body ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0;
  padding-left: 0;
}

.policy-body ul li {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.6;
  padding-left: 20px;
  position: relative;
}

.policy-body ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}

.policy-body a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.policy-body a:hover { color: var(--text); }

.policy-body strong { color: var(--text); font-weight: 600; }
</style>