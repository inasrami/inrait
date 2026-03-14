<template>
  <div class="min-h-screen px-6 pb-32 pt-36">
    <div class="max-w-[720px] mx-auto">

      <div class="mb-4 section-label">Legal</div>
      <h1 class="font-display text-[clamp(48px,8vw,80px)] mb-4 leading-none" style="letter-spacing:0.02em;">
        PRIVACY POLICY
      </h1>
      <p class="text-text-muted text-[14px] mb-16">Last updated: January 2025</p>

      <div class="policy-body">

        <section>
          <h2>1. Who We Are</h2>
          <p>
            INRAIT ("we", "us", "our") is a web engineering and digital studio based in Sofia, Bulgaria.
            We operate the website at <strong>inrait.com</strong> (the "Site").
            For any privacy-related questions, contact us at
            <a href="mailto:inkorami27@gmail.com">inkorami27@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2>2. What Data We Collect</h2>
          <p>We collect personal data only when you voluntarily provide it:</p>
          <ul>
            <li><strong>Contact form:</strong> your name, email address, project type, budget range, and message content.</li>
            <li><strong>Direct contact:</strong> any information you send us by email or phone.</li>
          </ul>
          <p>
            We do not use tracking pixels, advertising networks, or third-party analytics tools. We do not collect data automatically beyond what your browser sends to any web server (e.g. IP address in server logs).
          </p>
        </section>

        <section>
          <h2>3. How We Use Your Data</h2>
          <p>The data you submit through our contact form is used exclusively to:</p>
          <ul>
            <li>Respond to your project inquiry</li>
            <li>Communicate with you about potential or ongoing work</li>
            <li>Send project-related correspondence</li>
          </ul>
          <p>We do not use your data for marketing, profiling, or automated decision-making. We do not sell or share your data with third parties for commercial purposes.</p>
        </section>

        <section>
          <h2>4. Legal Basis for Processing (GDPR)</h2>
          <p>We process your personal data under the following legal bases as defined by the EU General Data Protection Regulation (GDPR):</p>
          <ul>
            <li><strong>Legitimate interests (Art. 6(1)(f)):</strong> responding to business inquiries you initiate.</li>
            <li><strong>Contractual necessity (Art. 6(1)(b)):</strong> fulfilling a service agreement if we enter into one.</li>
            <li><strong>Consent (Art. 6(1)(a)):</strong> where you have explicitly opted in (e.g. cookie consent).</li>
          </ul>
        </section>

        <section>
          <h2>5. Data Retention</h2>
          <p>
            We retain inquiry data for up to 2 years after last contact, or for the duration of any active business relationship, whichever is longer.
            After this period, data is securely deleted. You may request deletion at any time (see Section 7).
          </p>
        </section>

        <section>
          <h2>6. Third-Party Services</h2>
          <p>Our contact form uses <strong>EmailJS</strong> to deliver your message to our inbox. EmailJS processes form submissions on their infrastructure. You can review their privacy policy at <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener">emailjs.com/legal/privacy-policy</a>.</p>
          <p>Our website is hosted on infrastructure that may log standard server access data (IP address, browser type, timestamp) for security and operational purposes. These logs are not used for profiling and are retained for a maximum of 30 days.</p>
        </section>

        <section>
          <h2>7. Your Rights Under GDPR</h2>
          <p>As a data subject in the EU/EEA, you have the right to:</p>
          <ul>
            <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
            <li><strong>Rectification</strong> — request correction of inaccurate data</li>
            <li><strong>Erasure</strong> — request deletion of your data ("right to be forgotten")</li>
            <li><strong>Restriction</strong> — request that we limit how we process your data</li>
            <li><strong>Portability</strong> — receive your data in a structured, machine-readable format</li>
            <li><strong>Object</strong> — object to processing based on legitimate interests</li>
          </ul>
          <p>
            To exercise any of these rights, email us at
            <a href="mailto:inkorami27@gmail.com">inkorami27@gmail.com</a>.
            We will respond within 30 days.
          </p>
          <p>
            You also have the right to lodge a complaint with the Bulgarian Commission for Personal Data Protection (CPDP):
            <a href="https://www.cpdp.bg" target="_blank" rel="noopener">cpdp.bg</a>.
          </p>
        </section>

        <section>
          <h2>8. Cookies</h2>
          <p>
            This website uses only essential cookies necessary for the site to function. We do not use advertising cookies, social media tracking cookies, or third-party analytics cookies without your consent.
            A cookie consent banner is presented on your first visit where applicable.
          </p>
        </section>

        <section>
          <h2>9. Children's Privacy</h2>
          <p>
            Our services are directed at businesses and adults. We do not knowingly collect personal data from individuals under the age of 16.
          </p>
        </section>

        <section>
          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update the "last updated" date at the top of this page.
            Continued use of the Site after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2>11. Contact</h2>
          <p>
            For any privacy questions or requests:<br/>
            <strong>INRAIT Web Engineering</strong><br/>
            Sofia, Bulgaria<br/>
            <a href="mailto:inkorami27@gmail.com">inkorami27@gmail.com</a><br/>
            <a href="tel:+359876566094">+359 876 566 094</a>
          </p>
        </section>

      </div>

      <div class="flex flex-wrap gap-4 pt-8 mt-16" style="border-top:1px solid var(--border);">
        <RouterLink to="/" class="btn-outline text-[13px] py-3 px-5">Back to home</RouterLink>
        <RouterLink to="/contact" class="btn-outline text-[13px] py-3 px-5">Contact us</RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useSeo } from '../composables/useSeo.js'
import { useJsonLd, breadcrumbSchema } from '../composables/useJsonLd.js'

useSeo({ title: 'Privacy Policy', description: 'INRAIT privacy policy — how we collect, use, and protect your personal data under GDPR and Bulgarian law.', canonical: '/privacy' })
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