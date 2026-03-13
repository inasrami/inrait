<template>
  <div class="relative min-h-screen px-6 pt-32 pb-40 overflow-hidden">

    <!-- Background glow -->
    <div
      class="absolute right-0 pointer-events-none top-1/4"
      style="width: 600px; height: 600px; background: radial-gradient(ellipse at right, rgba(164,224,75,0.06) 0%, transparent 70%);"
    />

    <div class="max-w-[1080px] mx-auto">

      <div class="mb-6 section-label fade-up">Get In Touch</div>

      <h1 class="mb-6 font-display fade-up" style="font-size: clamp(60px, 11vw, 130px); letter-spacing: 0.02em; line-height: 0.95; transition-delay: 0.05s;">
        LET'S<br/>BUILD IT.
      </h1>

      <p class="text-text-muted text-[18px] mb-20 max-w-lg leading-relaxed fade-up" style="font-weight: 300; transition-delay: 0.1s;">
        Tell us about your project. We'll get back to you within 24 hours.
      </p>

      <div class="grid grid-cols-1 gap-16 lg:grid-cols-2">

        <!-- Form -->
        <div class="fade-up" style="transition-delay: 0.15s;">
          <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div class="form-group">
                <label class="form-label">Your name</label>
                <input v-model="form.name" type="text" class="form-input" placeholder="Alex Johnson" required />
              </div>
              <div class="form-group">
                <label class="form-label">Email address</label>
                <input v-model="form.email" type="email" class="form-input" placeholder="alex@company.com" required />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Project type</label>
              <select v-model="form.type" class="form-input">
                <option value="">Select a service</option>
                <option value="web-app">Web Application</option>
                <option value="website">Marketing Website</option>
                <option value="ecommerce">E-commerce</option>
                <option value="booking">Booking Platform</option>
                <option value="other">Something else</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Budget range</label>
              <select v-model="form.budget" class="form-input">
                <option value="">Select budget</option>
                <option value="500-1k">€500 – €1,000</option>
                <option value="1k-3k">€1,000 – €3,000</option>
                <option value="3k-8k">€3,000 – €8,000</option>
                <option value="8k+">€8,000+</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Tell me about the project</label>
              <textarea
                v-model="form.message"
                class="form-input"
                rows="5"
                placeholder="What problem are you solving? Who is it for? What's the timeline?"
                required
              />
            </div>

            <button
              type="submit"
              class="btn-primary w-full justify-center py-5 text-[16px]"
              :disabled="submitted"
            >
              <template v-if="!submitted">
                Send message
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </template>
              <template v-else>
                Message sent! We'll be in touch soon.
              </template>
            </button>

          </form>
        </div>

        <!-- Contact info & availability -->
        <div class="flex flex-col gap-8 fade-up" style="transition-delay: 0.25s;">

          <!-- Direct contact -->
          <div class="p-8 card-glass">
            <h3 class="font-semibold text-[18px] mb-6">Direct contact</h3>
            <div class="flex flex-col gap-5">
              <a href="mailto:inkorami27@gmail.com" class="contact-item" data-cursor>
                <div class="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <div class="text-[11px] text-text-dim uppercase tracking-widest mb-0.5">Email</div>
                  <div class="text-[15px] text-text-main">inkorami27@gmail.com</div>
                </div>
              </a>

              <a href="tel:0876566094" class="contact-item" data-cursor>
                <div class="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.01 4.2 2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div>
                  <div class="text-[11px] text-text-dim uppercase tracking-widest mb-0.5">Phone</div>
                  <div class="text-[15px] text-text-main">+359 876 566 094</div>
                </div>
              </a>

              <div class="contact-item">
                <div class="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div class="text-[11px] text-text-dim uppercase tracking-widest mb-0.5">Location</div>
                  <div class="text-[15px] text-text-main">Sofia, Bulgaria · Remote-Ready</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Social -->
          <div class="p-8 card-glass">
            <h3 class="font-semibold text-[18px] mb-6">Find me online</h3>
            <div class="flex flex-col gap-4">
              <a
                href="https://linkedin.com/in/inasrami"
                target="_blank"
                rel="noopener"
                class="contact-item"
                data-cursor
              >
                <div class="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
                <div>
                  <div class="text-[11px] text-text-dim uppercase tracking-widest mb-0.5">LinkedIn</div>
                  <div class="text-[15px] text-text-main">linkedin.com/in/inasrami</div>
                </div>
              </a>
              <a
                href="https://github.com/inasrami"
                target="_blank"
                rel="noopener"
                class="contact-item"
                data-cursor
              >
                <div class="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                </div>
                <div>
                  <div class="text-[11px] text-text-dim uppercase tracking-widest mb-0.5">GitHub</div>
                  <div class="text-[15px] text-text-main">github.com/inasrami</div>
                </div>
              </a>
            </div>
          </div>

          <!-- Availability indicator -->
          <div class="p-6 rounded-2xl" style="background: rgba(164,224,75,0.05); border: 1px solid rgba(164,224,75,0.2);">
            <div class="flex items-center gap-3 mb-3">
              <span class="w-2.5 h-2.5 rounded-full bg-accent" style="box-shadow: 0 0 10px var(--accent);" />
              <span class="font-semibold text-[15px]" style="color: var(--accent);">Currently available</span>
            </div>
            <p class="text-text-muted text-[14px] leading-relaxed">
              Taking on new projects. Typical response time is under 24 hours.
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useFadeUp } from '../composables/useFadeUp.js'

useFadeUp()

const submitted = ref(false)
const form = reactive({
  name:    '',
  email:   '',
  type:    '',
  budget:  '',
  message: '',
})

function handleSubmit() {
  // In a real build this would hit an API / Netlify form / EmailJS
  const mailto = `mailto:inkorami27@gmail.com?subject=Project Inquiry from ${form.name}&body=Name: ${form.name}%0AEmail: ${form.email}%0AType: ${form.type}%0ABudget: ${form.budget}%0A%0A${form.message}`
  window.open(mailto, '_blank')
  submitted.value = true
}
</script>

<style scoped>
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-dim); }
.form-input {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  padding: 14px 16px;
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease;
  cursor: none;
  resize: none;
}
.form-input::placeholder { color: var(--text-dim); }
.form-input:focus { border-color: rgba(164,224,75,0.5); background: rgba(164,224,75,0.03); }
.form-input option { background: #111; color: var(--text); }

.contact-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
  transition: color 0.2s ease;
  cursor: none;
}
.contact-item:last-child { border-bottom: none; }
.contact-item:hover .contact-icon { background: rgba(164,224,75,0.15); }

.contact-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(164,224,75,0.07);
  border: 1px solid rgba(164,224,75,0.15);
  transition: background 0.2s ease;
}
</style>