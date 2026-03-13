<template>
  <section id="about" class="py-32 px-6 relative overflow-hidden">

    <!-- Accent glow -->
    <div class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
      style="width:500px;height:500px;background:radial-gradient(ellipse at right, rgba(164,224,75,0.05) 0%, transparent 70%);" />

    <div class="max-w-[1080px] mx-auto relative z-10">

      <div class="section-label fade-up mb-4">The Studio</div>
      <h2 class="font-display fade-up text-[clamp(48px,8vw,80px)] mb-20"
        style="letter-spacing:0.02em; line-height:1; transition-delay:0.05s;">
        ABOUT INRAIT
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        <!-- Left: founder block -->
        <div class="fade-up">
          <div class="founder-wrap mb-10">
            <!-- Replace inner div with <img src="/images/inas.jpg" alt="Inas Rami" class="w-full h-full object-cover" /> -->
            <div class="founder-photo">
              <div class="founder-photo-placeholder">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            </div>
            <div class="founder-badge">
              <span class="status-dot" />
              Available for new projects
            </div>
          </div>

          <h3 class="font-semibold text-[26px] mb-1" style="letter-spacing:-0.02em;">Inas Rami</h3>
          <p class="text-text-muted text-[13px] mb-8" style="letter-spacing:0.06em; text-transform:uppercase;">
            Founder &amp; Lead Engineer · Sofia, Bulgaria
          </p>

          <!-- Social links -->
          <div class="flex flex-wrap gap-3">
            <a href="https://linkedin.com/in/inasrami" target="_blank" rel="noopener" class="social-btn" data-cursor>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
            <a href="https://github.com/inasrami" target="_blank" rel="noopener" class="social-btn" data-cursor>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
              </svg>
              GitHub
            </a>
            <RouterLink to="/contact" class="social-btn accent-btn" data-cursor>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Work with us
            </RouterLink>
          </div>
        </div>

        <!-- Right: company story + values -->
        <div class="fade-up" style="transition-delay:0.15s;">
          <p class="text-[18px] leading-relaxed mb-6" style="font-weight:300; letter-spacing:-0.01em;">
            INRAIT is a boutique digital studio founded in Sofia, built on a simple belief: that the quality of your digital presence is a direct reflection of how seriously you take your business.
          </p>
          <p class="text-[15px] leading-relaxed mb-5 text-text-muted">
            We work with hospitality businesses, service providers, and growing brands across Bulgaria and Europe. Our work spans custom web engineering, booking systems, automation pipelines, brand identity, and photography — everything a business needs to compete and convert online.
          </p>
          <p class="text-[15px] leading-relaxed mb-12 text-text-muted">
            What sets us apart is the combination of technical depth and design sensibility that most studios lack. We don't hand work off to juniors or offshore. Every project is built to a standard we'd be proud to put our name on.
          </p>

          <!-- Value chips -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-for="val in values" :key="val.title" class="value-chip">
              <div class="value-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <g v-html="val.icon" />
                </svg>
              </div>
              <div>
                <div class="text-[13px] font-semibold mb-0.5">{{ val.title }}</div>
                <div class="text-[12px] text-text-dim leading-snug">{{ val.body }}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useFadeUp } from '../composables/useFadeUp'

useFadeUp()

const values = [
  {
    title: 'Direct communication',
    body: 'You talk to the person doing the work, not an account manager.',
    icon: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
  },
  {
    title: 'Deadline-driven',
    body: 'Agreed timelines are commitments, not suggestions.',
    icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  },
  {
    title: 'Full ownership transfer',
    body: 'Clean, documented code. You own everything we build.',
    icon: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>',
  },
  {
    title: 'Outcome-focused',
    body: 'We build what generates results, not what looks impressive in a proposal.',
    icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  },
]
</script>

<style scoped>
.founder-wrap {
  position: relative;
  display: inline-block;
}

.founder-photo {
  width: 116px;
  height: 116px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--border-strong);
}

.founder-photo-placeholder {
  width: 100%;
  height: 100%;
  background: var(--surface-3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.founder-badge {
  position: absolute;
  bottom: -12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 13px;
  background: rgba(0,0,0,0.9);
  border: 1px solid rgba(164,224,75,0.2);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 500;
  color: var(--accent);
  backdrop-filter: blur(10px);
  white-space: nowrap;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent);
  flex-shrink: 0;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
  border-radius: 100px;
  border: 1px solid var(--border-strong);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  cursor: none;
}

.social-btn:hover {
  color: var(--text);
  border-color: rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.03);
}

.accent-btn {
  border-color: rgba(164,224,75,0.25);
  color: var(--accent);
}

.accent-btn:hover {
  background: rgba(164,224,75,0.08);
  border-color: rgba(164,224,75,0.4);
  color: var(--accent);
}

.value-chip {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255,255,255,0.025);
  border: 1px solid var(--border);
  transition: border-color 0.2s ease;
}

.value-chip:hover { border-color: var(--border-strong); }

.value-icon {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(164,224,75,0.07);
  border: 1px solid rgba(164,224,75,0.14);
  flex-shrink: 0;
  margin-top: 1px;
}
</style>