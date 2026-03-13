<template>
  <section id="about" class="py-32 px-6 relative overflow-hidden">

    <!-- Accent glow right -->
    <div
      class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
      style="width: 500px; height: 500px; background: radial-gradient(ellipse at right, rgba(164,224,75,0.05) 0%, transparent 70%);"
    />

    <div class="max-w-[1080px] mx-auto">

      <div class="section-label fade-up mb-4">The Studio</div>
      <h2 class="font-display fade-up text-[clamp(48px,8vw,80px)] mb-20" style="letter-spacing:0.02em; line-height:1; transition-delay: 0.05s;">
        ABOUT INRAIT
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        <!-- Left: founder block -->
        <div class="fade-up">

          <!-- Avatar placeholder — replace src with your actual photo -->
          <div class="founder-photo-wrap mb-10">
            <div class="founder-photo">
              <div class="founder-photo-inner">
                <!-- Replace this div with: <img src="/images/inas.jpg" alt="Inas Rami" class="w-full h-full object-cover" /> -->
                <div class="w-full h-full flex items-center justify-center" style="background: var(--surface-3);">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
              </div>
            </div>
            <!-- Accent badge -->
            <div class="founder-badge">
              <span class="w-1.5 h-1.5 rounded-full bg-accent" style="box-shadow: 0 0 6px var(--accent);" />
              Available for hire
            </div>
          </div>

          <h3 class="font-semibold text-[28px] mb-1" style="letter-spacing: -0.02em;">Inas Rami</h3>
          <p class="text-text-muted text-[14px] mb-8" style="letter-spacing: 0.05em; text-transform: uppercase;">Founder &amp; Lead Engineer · Sofia, Bulgaria</p>

          <!-- Social links -->
          <div class="flex gap-3">
            <a href="https://linkedin.com/in/inasrami" target="_blank" rel="noopener" class="social-btn" data-cursor>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
            <a href="https://github.com/inasrami" target="_blank" rel="noopener" class="social-btn" data-cursor>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              GitHub
            </a>
            <RouterLink to="/contact" class="social-btn" style="border-color: rgba(164,224,75,0.3); color: var(--accent);" data-cursor>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Hire me
            </RouterLink>
          </div>
        </div>

        <!-- Right: story + values -->
        <div class="fade-up" style="transition-delay: 0.15s;">

          <p class="text-[18px] leading-relaxed mb-6 text-text-main" style="font-weight: 300; letter-spacing: -0.01em;">
            INRAIT is a boutique web engineering studio founded on one belief: that the quality of your digital presence is a direct reflection of how seriously you take your business.
          </p>

          <p class="text-[16px] leading-relaxed mb-6 text-text-muted">
            I started INRAIT because I was tired of seeing businesses settle for average. Templates that look like everyone else. Agencies that overcharge and underdeliver. Code that nobody can maintain six months later.
          </p>

          <p class="text-[16px] leading-relaxed mb-12 text-text-muted">
            What I bring to the table is rare: engineering precision, a photographer's eye for composition, and a designer's instinct for what feels right. Every project I take on gets my full attention — not a junior's.
          </p>

          <!-- Value props -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="val in values"
              :key="val.title"
              class="value-chip"
            >
              <div class="value-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <g v-html="val.icon" />
                </svg>
              </div>
              <div>
                <div class="text-[13px] font-semibold text-text-main mb-0.5">{{ val.title }}</div>
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
    body: 'You talk to me, not an account manager.',
    icon: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
  },
  {
    title: 'Deadline-driven',
    body: 'Agreed timelines are commitments, not suggestions.',
    icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  },
  {
    title: 'Ownership mentality',
    body: "I treat every project as if it's my own business.",
    icon: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
  },
  {
    title: 'No lock-in',
    body: 'Clean, documented code. You own everything.',
    icon: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>',
  },
]
</script>

<style scoped>
.founder-photo-wrap {
  position: relative;
  display: inline-block;
}

.founder-photo {
  width: 120px;
  height: 120px;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid var(--border-strong);
}

.founder-photo-inner {
  width: 100%;
  height: 100%;
}

.founder-badge {
  position: absolute;
  bottom: -12px;
  left: 16px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: rgba(0,0,0,0.85);
  border: 1px solid rgba(164,224,75,0.25);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 500;
  color: var(--accent);
  backdrop-filter: blur(8px);
  white-space: nowrap;
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
  border-color: rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.04);
}

.value-chip {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
}

.value-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(164,224,75,0.08);
  border: 1px solid rgba(164,224,75,0.15);
  flex-shrink: 0;
  margin-top: 1px;
}
</style>