import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, nextTick } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../src/App.vue'
import Contact from '../src/pages/Contact.vue'
import { useLanguage } from '../src/composables/useLanguage.js'
import { buildServices, calculateEstimate } from '../src/data/services.js'

vi.mock('@unhead/vue', () => ({ useHead: () => {} }))
vi.mock('../src/composables/useSeo.js', () => ({ useSeo: () => {} }))
vi.mock('../src/composables/Usejsonld.js', () => ({ useJsonLd: () => {}, breadcrumbSchema: () => ({}) }))
vi.mock('../src/composables/useFadeUp.js', () => ({ useFadeUp: () => {} }))
vi.mock('../src/composables/useScrollScenes.js', () => ({ useScrollScenes: () => {} }))
vi.mock('../src/components/SiteLoader.vue', () => ({ default: { template: '<div />' } }))
vi.mock('../src/components/AppNav.vue', () => ({ default: { template: '<div />' } }))
vi.mock('../src/components/AppFooter.vue', () => ({ default: { template: '<div />' } }))
vi.mock('../src/components/ScrollProgress.vue', () => ({ default: { template: '<div />' } }))
vi.mock('../src/components/CookieBanner.vue', () => ({ default: { template: '<div />' } }))
vi.mock('../src/components/WhatsappButton.vue', () => ({ default: { template: '<div />' } }))

const { t, setLang } = useLanguage()
let app, router, host
const settle = async () => { await nextTick(); await new Promise(resolve => setTimeout(resolve, 0)); await nextTick() }
async function mount(query = '?services=website&addons=website-i18n') {
  router = createRouter({ history: createMemoryHistory(), routes: [
    { path: '/privacy', component: { template: '<div />' } },
    { path: '/contact', alias: '/bg/contact', name: 'contact', component: Contact },
  ] })
  await router.push(`/contact${query}`)
  host = document.createElement('div')
  document.body.append(host)
  app = createApp(App).use(router)
  app.mount(host)
  await settle()
}
async function input(selector, value, event = 'input') {
  const field = host.querySelector(selector)
  if (typeof value === 'boolean') field.checked = value
  else field.value = value
  field.dispatchEvent(new Event(event, { bubbles: true }))
  await nextTick()
}
async function changeLanguage(language) {
  setLang(language)
  await router.push({ path: language === 'bg' ? '/bg/contact' : '/contact', query: router.currentRoute.value.query })
  await settle()
}
beforeEach(() => { setLang('en'); window.emailjs = { send: vi.fn().mockResolvedValue({ status: 200 }) } })
afterEach(() => { app?.unmount(); host?.remove(); delete window.emailjs; vi.restoreAllMocks() })

describe('bilingual contact journey', () => {
  it('preserves every customer field and the same form instance through EN → BG → EN', async () => {
    await mount()
    const originalForm = host.querySelector('form')
    await input('#contact-name', 'Test Customer')
    await input('#contact-email', 'customer@example.com')
    await input('#project-type', 'booking', 'change')
    await input('#project-budget', 'budget-0', 'change')
    await input('#project-message', 'A bilingual hotel website. Keep my wording.')
    await input('#existing-website', 'https://example.com')
    await input('input[type=checkbox]', true, 'change')
    for (const language of ['bg', 'en']) {
      await changeLanguage(language)
      expect(host.querySelector('form')).toBe(originalForm)
      expect(host.querySelector('#contact-name').value).toBe('Test Customer')
      expect(host.querySelector('#contact-email').value).toBe('customer@example.com')
      expect(host.querySelector('#project-type').value).toBe('booking')
      expect(host.querySelector('#project-budget').value).toBe('budget-0')
      expect(host.querySelector('#project-budget').selectedOptions[0].textContent).toBe(t('contact.budgets')[0])
      expect(host.querySelector('#project-message').value).toBe('A bilingual hotel website. Keep my wording.')
      expect(host.querySelector('#existing-website').value).toBe('https://example.com')
      expect(host.querySelector('input[type=checkbox]').checked).toBe(true)
      expect(host.querySelector('.estimate-total').textContent).toContain('689.99')
    }
  })
  it('translates untouched estimator text and shows the selection, total and exclusions', async () => {
    await mount()
    expect(host.querySelector('.estimate-summary').textContent).toContain('Multilingual support')
    await changeLanguage('bg')
    expect(host.querySelector('#project-message').value).toContain(t('contact.estimateServices'))
    expect(host.querySelector('.estimate-summary').textContent).toContain(t('servicesPage.pricingNote'))
    await changeLanguage('en')
    expect(host.querySelector('#project-message').value).toContain('Services selected in the estimator:')
  })
  it('does not restore generated text after a visitor deliberately clears it', async () => {
    await mount()
    await input('#project-message', '')
    await changeLanguage('bg')
    expect(host.querySelector('#project-message').value).toBe('')
  })
  it('retains a direct-contact draft without estimator parameters', async () => {
    await mount('')
    await input('#project-message', 'Please keep this direct enquiry.')
    await changeLanguage('bg')
    expect(host.querySelector('#project-message').value).toBe('Please keep this direct enquiry.')
    expect(host.querySelector('.estimate-summary')).toBeNull()
  })
  it('keeps a failed submission, then clears personal data on success without sending real email', async () => {
    await mount()
    await input('#contact-name', 'Test Customer')
    await input('#contact-email', 'customer@example.com')
    await input('#project-budget', 'budget-0', 'change')
    await input('#project-message', 'Test enquiry')
    await input('input[type=checkbox]', true, 'change')
    vi.spyOn(console, 'error').mockImplementation(() => {})
    window.emailjs.send.mockRejectedValueOnce(new Error('Simulated failure'))
    host.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    await settle()
    expect(host.querySelector('[role=alert]')).not.toBeNull()
    expect(host.querySelector('#project-message').value).toBe('Test enquiry')
    await changeLanguage('bg')
    host.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    await settle()
    expect(window.emailjs.send.mock.calls[1][2].budget).toBe(t('contact.budgets')[0])
    expect(host.querySelector('#contact-email').value).toBe('')
    await changeLanguage('en')
    expect(host.querySelector('#project-message').value).toBe('')
    expect(host.querySelector('button[type=submit]').disabled).toBe(true)
  })
})

describe('shared quote calculation', () => {
  it('matches €590 plus a €99.99 add-on and ignores duplicates, unknown IDs and unrelated add-ons', () => {
    const result = calculateEstimate(buildServices(t), ['website', 'website', 'unknown'], ['website-i18n', 'website-i18n', 'one-anim'])
    expect(result.total).toBe(689.99)
    expect(result.addons).toHaveLength(1)
  })
  it('applies the existing bundle discount and flags separately quoted services', () => {
    const result = calculateEstimate(buildServices(t), ['onepager', 'website', 'booking'])
    expect(result.discount.percent).toBe(10)
    expect(result.total).toBe(792)
    expect(result.hasQuoteOnly).toBe(true)
    const quoted = calculateEstimate(buildServices(t), ['booking'])
    expect(quoted.total).toBe(0)
    expect(quoted.discount).toBeNull()
  })
})
