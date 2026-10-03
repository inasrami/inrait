<template>
  <div class="inv-shell">

    <!-- Checking the stored session -->
    <div v-if="!ready" class="boot"><span class="spinner" /></div>

    <!-- Login -->
    <div v-else-if="!isLoggedIn" class="login-screen">
      <div class="login-card">
        <div class="login-logo">IN<span style="color:var(--accent)">R</span>AIT</div>
        <div class="login-subtitle">Invoice Studio</div>

        <label class="field">
          <span class="field-label">Email</span>
          <input v-model="email" type="email" placeholder="admin@inrait.com" class="input" @keyup.enter="login" />
        </label>
        <label class="field">
          <span class="field-label">Password</span>
          <input v-model="password" type="password" placeholder="••••••••" class="input" @keyup.enter="login" />
        </label>

        <p v-if="loginError" class="login-error">{{ loginError }}</p>

        <button class="btn-accent w-full" type="button" :disabled="loginLoading" @click="login">
          <span v-if="loginLoading" class="spinner spinner--dark" />
          <span v-else>Sign in</span>
        </button>
      </div>
    </div>

    <!-- Studio -->
    <template v-else>
      <header class="topbar">
        <div class="topbar-left">
          <span class="topbar-logo">IN<span style="color:var(--accent)">R</span>AIT</span>
          <span class="topbar-divider" />
          <span class="topbar-title">Invoice Studio</span>
        </div>
        <div class="topbar-right">
          <RouterLink to="/admin" class="btn-ghost">Blog editor</RouterLink>
          <button class="btn-ghost" type="button" @click="logout">Sign out</button>
        </div>
      </header>

      <div class="inv-body">

        <!-- ───────── LEFT: form ───────── -->
        <div class="inv-form">

          <!-- 1 · Services -->
          <section class="card">
            <div class="card-head">
              <div>
                <div class="card-kicker">Step 1</div>
                <h2 class="card-title">Services &amp; add-ons</h2>
              </div>
              <div class="seg" role="group" aria-label="Document language">
                <button type="button" class="seg-btn" :class="{ on: meta.lang === 'en' }" @click="meta.lang = 'en'">EN</button>
                <button type="button" class="seg-btn" :class="{ on: meta.lang === 'bg' }" @click="meta.lang = 'bg'">BG</button>
              </div>
            </div>
            <p class="hint">Same services and prices as the public Services page. Names follow the document language.</p>

            <div class="svc-list">
              <div v-for="svc in services" :key="svc.id" class="svc" :class="{ 'svc--on': isSelected(svc.id) }">
                <button type="button" class="svc-head" :aria-pressed="isSelected(svc.id)" @click="toggleService(svc.id)">
                  <span class="svc-icon" :class="{ 'svc-icon--on': isSelected(svc.id) }">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" :stroke="isSelected(svc.id) ? '#000' : 'var(--accent)'" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><g v-html="svc.icon" /></svg>
                  </span>
                  <span class="svc-main">
                    <span class="svc-name">{{ svc.title }} <em class="svc-tag">{{ svc.tag }}</em></span>
                    <span class="svc-sub">{{ svc.timeline }}</span>
                  </span>
                  <span class="svc-price">{{ money(toCents(svc.basePrice)) }}</span>
                  <span class="check" :class="{ 'check--on': isSelected(svc.id) }">
                    <svg v-if="isSelected(svc.id)" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                </button>

                <div class="addons">
                  <button
                    v-for="addon in svc.addons"
                    :key="addon.id"
                    type="button"
                    class="chip"
                    :class="{ 'chip--on': isAddonSelected(addon.id) }"
                    :aria-pressed="isAddonSelected(addon.id)"
                    @click="toggleAddon(addon.id, svc.id)"
                  >
                    <span>{{ addon.label }}</span>
                    <b>+{{ money(toCents(addon.price)) }}</b>
                  </button>
                </div>
              </div>
            </div>

            <div class="extras">
              <div class="card-kicker">Extra items (not discounted)</div>
              <div v-for="(item, i) in customItems" :key="i" class="extra-row">
                <input v-model="item.label" class="input" placeholder="Description" aria-label="Extra item description" />
                <input v-model.number="item.qty" class="input input--sm" type="number" min="1" step="1" placeholder="Qty" aria-label="Quantity" />
                <input v-model.number="item.price" class="input input--md" type="number" min="0" step="0.01" placeholder="Unit price €" aria-label="Unit price" />
                <button type="button" class="icon-btn" aria-label="Remove item" @click="customItems.splice(i, 1)">&times;</button>
              </div>
              <button type="button" class="btn-ghost" @click="customItems.push({ label: '', qty: 1, price: null })">+ Add extra item</button>
            </div>
          </section>

          <!-- 2 · Client -->
          <section class="card">
            <div class="card-head">
              <div>
                <div class="card-kicker">Step 2</div>
                <h2 class="card-title">Client</h2>
              </div>
              <div class="seg" role="group" aria-label="Client type">
                <button type="button" class="seg-btn" :class="{ on: client.type === 'company' }" @click="client.type = 'company'">Company</button>
                <button type="button" class="seg-btn" :class="{ on: client.type === 'person' }" @click="client.type = 'person'">Individual</button>
              </div>
            </div>

            <div class="grid2">
              <label class="field span2">
                <span class="field-label">{{ client.type === 'company' ? 'Company name' : 'Full name' }} <i class="req">*</i></span>
                <input v-model="client.name" class="input" autocomplete="off" />
              </label>
              <label v-if="client.type === 'company'" class="field">
                <span class="field-label">Contact person</span>
                <input v-model="client.contact" class="input" autocomplete="off" />
              </label>
              <label v-if="client.type === 'company'" class="field">
                <span class="field-label">Company ID (EIK)</span>
                <input v-model="client.eik" class="input" autocomplete="off" />
              </label>
              <label v-if="client.type === 'company'" class="field span2">
                <span class="field-label">VAT number</span>
                <input v-model="client.vat" class="input" placeholder="BG…" autocomplete="off" />
              </label>
              <label class="field span2">
                <span class="field-label">Address</span>
                <textarea v-model="client.address" class="input" rows="2" autocomplete="off" />
              </label>
              <label class="field">
                <span class="field-label">City</span>
                <input v-model="client.city" class="input" autocomplete="off" />
              </label>
              <label class="field">
                <span class="field-label">Country</span>
                <input v-model="client.country" class="input" autocomplete="off" />
              </label>
              <label class="field">
                <span class="field-label">Email</span>
                <input v-model="client.email" type="email" class="input" autocomplete="off" />
              </label>
              <label class="field">
                <span class="field-label">Phone</span>
                <input v-model="client.phone" class="input" autocomplete="off" />
              </label>
            </div>
          </section>

          <!-- 3 · Project & payment -->
          <section class="card">
            <div class="card-head">
              <div>
                <div class="card-kicker">Step 3</div>
                <h2 class="card-title">Project &amp; payment</h2>
              </div>
            </div>

            <div class="grid2">
              <label class="field span2">
                <span class="field-label">Project name</span>
                <input v-model="meta.project" class="input" placeholder="e.g. Website for Barber Unity" />
              </label>
              <label class="field">
                <span class="field-label">Issue date</span>
                <input v-model="meta.issueDate" type="date" class="input" />
              </label>
              <label class="field">
                <span class="field-label">Payment due in (days)</span>
                <input v-model.number="meta.dueDays" type="number" min="0" max="120" class="input" />
              </label>
              <label class="field">
                <span class="field-label">Deposit %</span>
                <input v-model.number="meta.depositPercent" type="number" min="0" max="100" class="input" @change="clampDeposit" />
              </label>
              <label class="field">
                <span class="field-label">Invoice covers</span>
                <select v-model="meta.invoiceFor" class="input">
                  <option value="full">Full amount</option>
                  <option value="deposit" :disabled="!(meta.depositPercent > 0)">Deposit only</option>
                  <option value="balance" :disabled="!(meta.depositPercent > 0)">Remaining balance</option>
                </select>
              </label>
              <label class="field">
                <span class="field-label">VAT</span>
                <select v-model="meta.vatMode" class="input">
                  <option v-for="(m, key) in VAT_MODES" :key="key" :value="key">{{ m.label }}</option>
                </select>
              </label>
              <label class="field">
                <span class="field-label">Discount</span>
                <select v-model="meta.discountMode" class="input">
                  <option value="auto">Automatic bundle (2 services −10%, 3+ −15%)</option>
                  <option value="none">No discount</option>
                  <option value="custom">Custom %</option>
                </select>
              </label>
              <label v-if="meta.discountMode === 'custom'" class="field">
                <span class="field-label">Custom discount %</span>
                <input v-model.number="meta.discountCustom" type="number" min="0" max="100" class="input" />
              </label>
              <label class="field span2">
                <span class="field-label">
                  Legal note on invoice
                  <button v-if="vatNoteTouched" type="button" class="link" @click="resetVatNote">reset</button>
                </span>
                <textarea v-model="meta.vatNote" class="input" rows="2" @input="vatNoteTouched = true" />
              </label>
              <label class="field span2">
                <span class="field-label">
                  Delivery timeline
                  <button v-if="timelineTouched" type="button" class="link" @click="resetTimeline">reset</button>
                </span>
                <input v-model="meta.timeline" class="input" @input="timelineTouched = true" />
              </label>
              <label class="field span2">
                <span class="field-label">Notes (shown on quotation, proforma and invoice)</span>
                <textarea v-model="meta.notes" class="input" rows="2" />
              </label>
            </div>
            <p class="hint">Prices are treated as excluding VAT. Check VAT wording and invoice requirements with your accountant.</p>
          </section>

          <!-- 4 · Documents -->
          <section class="card">
            <div class="card-head">
              <div>
                <div class="card-kicker">Step 4</div>
                <h2 class="card-title">Documents</h2>
              </div>
            </div>

            <div class="docs-pick">
              <label v-for="d in DOC_TYPES" :key="d" class="doc-check" :class="{ on: meta.docs[d] }">
                <input v-model="meta.docs[d]" type="checkbox" />
                <span class="check" :class="{ 'check--on': meta.docs[d] }">
                  <svg v-if="meta.docs[d]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span class="doc-name">{{ DOC_LABELS[d] }}</span>
                <span class="doc-no">{{ nos[d] || '—' }}</span>
              </label>
            </div>

            <label class="field">
              <span class="field-label">Invoice number <i class="req">*</i></span>
              <input v-model="meta.invoiceNo" class="input" inputmode="numeric" autocomplete="off" />
              <span class="field-help">Next free number is suggested automatically. Other documents get matching references.</span>
            </label>
          </section>

          <!-- Issuer -->
          <details class="card issuer" :open="issuerOpen" @toggle="issuerOpen = $event.target.open">
            <summary>
              <span class="card-kicker">Your company</span>
              <span class="card-title">Supplier details <small>saved in this browser only</small></span>
            </summary>
            <div class="grid2">
              <label class="field span2">
                <span class="field-label">Legal name <i class="req">*</i></span>
                <input v-model="issuer.name" class="input" autocomplete="off" />
              </label>
              <label class="field">
                <span class="field-label">Company ID (EIK)</span>
                <input v-model="issuer.eik" class="input" autocomplete="off" />
              </label>
              <label class="field">
                <span class="field-label">VAT number</span>
                <input v-model="issuer.vat" class="input" autocomplete="off" />
              </label>
              <label class="field span2">
                <span class="field-label">Address</span>
                <textarea v-model="issuer.address" class="input" rows="2" />
              </label>
              <label class="field">
                <span class="field-label">City</span>
                <input v-model="issuer.city" class="input" />
              </label>
              <label class="field">
                <span class="field-label">Country</span>
                <input v-model="issuer.country" class="input" />
              </label>
              <label class="field">
                <span class="field-label">Represented by (МОЛ)</span>
                <input v-model="issuer.representative" class="input" />
              </label>
              <label class="field">
                <span class="field-label">Website</span>
                <input v-model="issuer.website" class="input" />
              </label>
              <label class="field">
                <span class="field-label">Email</span>
                <input v-model="issuer.email" class="input" />
              </label>
              <label class="field">
                <span class="field-label">Phone</span>
                <input v-model="issuer.phone" class="input" />
              </label>
              <label class="field span2">
                <span class="field-label">Bank</span>
                <input v-model="issuer.bank" class="input" />
              </label>
              <label class="field">
                <span class="field-label">IBAN</span>
                <input v-model="issuer.iban" class="input" />
              </label>
              <label class="field">
                <span class="field-label">BIC / SWIFT</span>
                <input v-model="issuer.bic" class="input" />
              </label>
            </div>
          </details>
        </div>

        <!-- ───────── RIGHT: summary ───────── -->
        <aside class="inv-summary">
          <div class="card sum">
            <div class="card-kicker">Summary</div>

            <p v-if="!quote.lines.length" class="empty">Pick at least one service to see the price.</p>

            <ul v-else class="sum-lines">
              <li v-for="(ln, i) in quote.lines" :key="i" :class="`sum-line sum-line--${ln.type}`">
                <span>{{ ln.type === 'addon' ? '+ ' : '' }}{{ ln.label }}<em v-if="ln.qty > 1"> × {{ ln.qty }}</em></span>
                <b>{{ money(ln.total) }}</b>
              </li>
            </ul>

            <dl v-if="quote.lines.length" class="sum-totals">
              <div v-if="quote.discountCents > 0">
                <dt>Discount −{{ quote.discountPercent }}%</dt><dd>−{{ money(quote.discountCents) }}</dd>
              </div>
              <div><dt>Net</dt><dd>{{ money(quote.net) }}</dd></div>
              <div v-if="quote.vatRate > 0"><dt>VAT {{ quote.vatRate }}%</dt><dd>{{ money(quote.vat) }}</dd></div>
              <div class="grand"><dt>Total</dt><dd>{{ money(quote.total) }}</dd></div>
              <div v-if="quote.depositPercent > 0 && quote.depositPercent < 100" class="split">
                <dt>Deposit {{ quote.depositPercent }}%</dt><dd>{{ money(quote.deposit.total) }}</dd>
              </div>
              <div v-if="quote.depositPercent > 0 && quote.depositPercent < 100" class="split">
                <dt>Balance</dt><dd>{{ money(quote.balance.total) }}</dd>
              </div>
            </dl>

            <ul v-if="missing.length" class="missing">
              <li v-for="m in missing" :key="m">{{ m }}</li>
            </ul>

            <button class="btn-accent btn-big" type="button" :disabled="missing.length > 0" @click="generate">
              Create documents ({{ includedDocs.length }})
            </button>
            <button class="btn-ghost reset" type="button" @click="resetForm">Clear form for a new client</button>
          </div>
        </aside>
      </div>
    </template>

    <!-- ───────── Document viewer ───────── -->
    <Transition name="fade">
      <div v-if="viewerOpen" class="viewer" role="dialog" aria-modal="true" aria-label="Generated documents">
        <div class="viewer-bar">
          <div class="tabs" role="tablist">
            <button
              v-for="d in includedDocs"
              :key="d"
              type="button"
              role="tab"
              class="tab"
              :class="{ on: activeDoc === d }"
              :aria-selected="activeDoc === d"
              @click="activeDoc = d"
            >{{ DOC_LABELS[d] }}</button>
          </div>
          <div class="viewer-actions">
            <button class="btn-ghost" type="button" @click="printCurrent">Print / Save PDF</button>
            <button v-if="includedDocs.length > 1" class="btn-accent btn-sm" type="button" @click="printAll">
              Print all ({{ includedDocs.length }}) as one PDF
            </button>
            <button class="icon-btn" type="button" aria-label="Close" @click="viewerOpen = false">&times;</button>
          </div>
        </div>
        <iframe class="viewer-frame" :srcdoc="previewHtml" sandbox="allow-same-origin" title="Document preview" />
        <p class="viewer-tip">In the print dialog choose “Save as PDF” as the destination.</p>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '../composables/useSeo.js'
import { useAdminSession } from '../composables/useAdminSession.js'
import { buildServices } from '../data/services.js'
import enLocale from '../locales/en.js'
import bgLocale from '../locales/bg.js'
import {
  DOC_TYPES, VAT_MODES, DEFAULT_VAT_NOTES,
  calcQuote, buildDocumentsHtml, toCents, formatMoney,
  todayIso, addDaysIso, nextNumber,
} from '../data/invoiceDocs.js'

useSeo({ title: 'Invoice Studio', noindex: true })

const {
  isLoggedIn, ready, email, password,
  loading: loginLoading, error: loginError, login, logout,
} = useAdminSession()

const DOC_LABELS = {
  offer: 'Quotation', proforma: 'Proforma invoice', invoice: 'Invoice',
  contract: 'Service agreement', acceptance: 'Acceptance certificate',
}

// ── Saved in this browser ─────────────────────────────────────────────────────
const KEY_ISSUER = 'inrait_admin_issuer'
const KEY_PREFS  = 'inrait_admin_prefs'
const KEY_NEXTNO = 'inrait_admin_next_no'
const DEFAULT_FIRST_NO = '0000000001'

function load(key, fallback) {
  try { return { ...fallback, ...JSON.parse(localStorage.getItem(key) || '{}') } } catch { return { ...fallback } }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* private mode / quota - not critical */ }
}
const storedNextNo = () => { try { return localStorage.getItem(KEY_NEXTNO) || DEFAULT_FIRST_NO } catch { return DEFAULT_FIRST_NO } }

const issuer = reactive(load(KEY_ISSUER, {
  name: '', eik: '', vat: '', address: '', city: 'Sofia', country: 'Bulgaria',
  email: '', phone: '', website: 'inrait.com', representative: '', bank: '', iban: '', bic: '',
}))
// Starts open only when nothing is saved yet - and stays under the user's control while typing
const issuerOpen = ref(!issuer.name)
const prefs = load(KEY_PREFS, { lang: 'en', dueDays: 7, depositPercent: 50, vatMode: 'none', discountMode: 'auto' })

// ── Form state ────────────────────────────────────────────────────────────────
const blankClient = () => ({ type: 'company', name: '', contact: '', eik: '', vat: '', address: '', city: '', country: 'Bulgaria', email: '', phone: '' })
const client = reactive(blankClient())

const meta = reactive({
  lang: prefs.lang,
  project: '',
  invoiceNo: storedNextNo(),
  issueDate: todayIso(),
  dueDays: prefs.dueDays,
  depositPercent: prefs.depositPercent,
  vatMode: prefs.vatMode,
  vatNote: '',
  discountMode: prefs.discountMode,
  discountCustom: 10,
  invoiceFor: 'full',
  timeline: '',
  notes: '',
  docs: { offer: true, proforma: true, invoice: true, contract: true, acceptance: false },
})

const selectedServices = ref([])
const selectedAddons   = ref([])
const customItems      = ref([])

watch(issuer, () => save(KEY_ISSUER, { ...issuer }), { deep: true })
watch(
  () => [meta.lang, meta.dueDays, meta.depositPercent, meta.vatMode, meta.discountMode],
  () => save(KEY_PREFS, {
    lang: meta.lang, dueDays: meta.dueDays, depositPercent: meta.depositPercent,
    vatMode: meta.vatMode, discountMode: meta.discountMode,
  }),
)

// ── Services (same data as the public page, in the document language) ────────
const translatorFor = (locale) => (path) =>
  path.split('.').reduce((acc, key) => acc?.[key], locale) ?? path

const services = computed(() => buildServices(translatorFor(meta.lang === 'bg' ? bgLocale : enLocale)))

const isSelected      = (id) => selectedServices.value.includes(id)
const isAddonSelected = (id) => selectedAddons.value.includes(id)
const money = (cents) => formatMoney(cents, 'en')

function toggleService(id) {
  if (isSelected(id)) {
    selectedServices.value = selectedServices.value.filter((s) => s !== id)
    // deselecting a service also drops its add-ons (same as the Services page)
    const addonIds = services.value.find((s) => s.id === id)?.addons.map((a) => a.id) ?? []
    selectedAddons.value = selectedAddons.value.filter((a) => !addonIds.includes(a))
  } else {
    selectedServices.value = [...selectedServices.value, id]
  }
}

function toggleAddon(addonId, serviceId) {
  if (!isSelected(serviceId)) selectedServices.value = [...selectedServices.value, serviceId]
  selectedAddons.value = isAddonSelected(addonId)
    ? selectedAddons.value.filter((a) => a !== addonId)
    : [...selectedAddons.value, addonId]
}

// ── Pricing ───────────────────────────────────────────────────────────────────
const quote = computed(() => calcQuote({
  services: services.value,
  serviceIds: selectedServices.value,
  addonIds: selectedAddons.value,
  customItems: customItems.value,
  discount: { mode: meta.discountMode, custom: meta.discountCustom },
  vatMode: meta.vatMode,
  depositPercent: meta.depositPercent,
}))

function clampDeposit() {
  const n = Number(meta.depositPercent)
  meta.depositPercent = Number.isFinite(n) ? Math.min(100, Math.max(0, Math.round(n))) : 0
  if (!(meta.depositPercent > 0) && meta.invoiceFor !== 'full') meta.invoiceFor = 'full'
}
watch(() => meta.depositPercent, (v) => {
  if (!(v > 0) && meta.invoiceFor !== 'full') meta.invoiceFor = 'full'
})

// Legal note + timeline follow the selection until you edit them yourself
const vatNoteTouched = ref(false)
const timelineTouched = ref(false)

function defaultTimeline() {
  const picked = services.value.filter((s) => isSelected(s.id))
  if (picked.length === 0) return ''
  if (picked.length === 1) return picked[0].timeline
  return picked.map((s) => `${s.title}: ${s.timeline}`).join('; ')
}
function resetVatNote()  { vatNoteTouched.value = false;  meta.vatNote  = DEFAULT_VAT_NOTES[meta.vatMode][meta.lang] }
function resetTimeline() { timelineTouched.value = false; meta.timeline = defaultTimeline() }

watch(() => [meta.vatMode, meta.lang], () => { if (!vatNoteTouched.value) meta.vatNote = DEFAULT_VAT_NOTES[meta.vatMode][meta.lang] }, { immediate: true })
watch(() => [selectedServices.value.slice(), meta.lang], () => { if (!timelineTouched.value) meta.timeline = defaultTimeline() }, { deep: true })

// ── Document numbers & dates ──────────────────────────────────────────────────
const nos = computed(() => {
  const base = String(meta.invoiceNo || '').replace(/\D/g, '') || String(meta.invoiceNo || '')
  return {
    offer: base ? `OF-${base}` : '',
    proforma: base ? `PF-${base}` : '',
    invoice: meta.invoiceNo || '',
    contract: base ? `CT-${base}` : '',
    acceptance: base ? `AP-${base}` : '',
  }
})

const dueDate   = computed(() => addDaysIso(meta.issueDate, meta.dueDays))
const validUntil = computed(() => addDaysIso(meta.issueDate, 30))

const includedDocs = computed(() => DOC_TYPES.filter((d) => meta.docs[d]))

const missing = computed(() => {
  const out = []
  if (!quote.value.lines.length) out.push('Select a service or add an extra item')
  if (!client.name.trim()) out.push('Enter the client name')
  if (!issuer.name.trim()) out.push('Fill in your company details (bottom of the form)')
  if (!includedDocs.value.length) out.push('Choose at least one document')
  if (meta.docs.invoice && !String(meta.invoiceNo).trim()) out.push('Enter an invoice number')
  return out
})

// ── Generate / preview / print ───────────────────────────────────────────────
const viewerOpen = ref(false)
const activeDoc  = ref('offer')

function buildHtml(docs, title) {
  return buildDocumentsHtml({
    docs,
    lang: meta.lang,
    issuer: { ...issuer },
    client: { ...client },
    meta: {
      project: meta.project.trim(), issueDate: meta.issueDate, dueDate: dueDate.value, validUntil: validUntil.value,
      dueDays: meta.dueDays, timeline: meta.timeline.trim(), notes: meta.notes, vatNote: meta.vatNote,
      invoiceFor: meta.invoiceFor, title,
    },
    nos: nos.value,
    quote: quote.value,
  })
}

const safeName = (s) => String(s || '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '')
const fileTitle = (docs) => [
  docs.length === 1 ? nos.value[docs[0]] : nos.value.invoice || nos.value.offer,
  safeName(client.name),
].filter(Boolean).join('_') || 'document'

const previewHtml = computed(() => (viewerOpen.value ? buildHtml([activeDoc.value], fileTitle([activeDoc.value])) : ''))

function generate() {
  if (missing.value.length) return
  // Use up the suggested invoice number so the next client gets the following one
  if (meta.docs.invoice && meta.invoiceNo === storedNextNo()) {
    const next = nextNumber(meta.invoiceNo)
    if (next) { try { localStorage.setItem(KEY_NEXTNO, next) } catch { /* ignore */ } }
  }
  if (!includedDocs.value.includes(activeDoc.value)) activeDoc.value = includedDocs.value[0]
  viewerOpen.value = true
}

function printDocs(docs) {
  const title = fileTitle(docs)
  const frame = document.createElement('iframe')
  frame.setAttribute('aria-hidden', 'true')
  frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;'
  let cleaned = false
  const prevTitle = document.title
  const cleanup = () => {
    if (cleaned) return
    cleaned = true
    document.title = prevTitle
    setTimeout(() => frame.remove(), 300)
  }
  frame.onload = () => {
    const win = frame.contentWindow
    document.title = title            // browsers suggest this as the PDF file name
    win.addEventListener('afterprint', cleanup, { once: true })
    win.focus()
    win.print()
    setTimeout(cleanup, 60000)        // safety net for browsers without afterprint
  }
  frame.srcdoc = buildHtml(docs, title)
  document.body.appendChild(frame)
}

const printCurrent = () => printDocs([activeDoc.value])
const printAll     = () => printDocs(includedDocs.value)

function resetForm() {
  Object.assign(client, blankClient())
  selectedServices.value = []
  selectedAddons.value = []
  customItems.value = []
  Object.assign(meta, { project: '', notes: '', invoiceFor: 'full', issueDate: todayIso(), invoiceNo: storedNextNo(), discountCustom: 10 })
  vatNoteTouched.value = false
  timelineTouched.value = false
  meta.vatNote = DEFAULT_VAT_NOTES[meta.vatMode][meta.lang]
  meta.timeline = ''
}

function onKey(e) { if (e.key === 'Escape') viewerOpen.value = false }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.inv-shell {
  --accent:  #A4E04B;
  --bg:      #080808;
  --surface: #111111;
  --surface2:#181818;
  --border:  rgba(255,255,255,0.07);
  --border2: rgba(255,255,255,0.12);
  --text:    #F5F5F7;
  --muted:   #888;
  --dim:     #555;
  font-family: 'DM Sans', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}

/* ── Login / boot ───────────────────────────────────────── */
.boot { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
.login-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
.login-card { width: 100%; max-width: 400px; background: var(--surface); border: 1px solid var(--border2); border-radius: 24px; padding: 48px 40px; display: flex; flex-direction: column; gap: 18px; }
.login-logo { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 0.06em; text-align: center; }
.login-subtitle { text-align: center; font-size: 12px; color: var(--muted); letter-spacing: 0.12em; text-transform: uppercase; margin-top: -12px; }
.login-error { font-size: 13px; color: #ff6060; padding: 10px 14px; background: rgba(255,60,60,0.07); border: 1px solid rgba(255,60,60,0.2); border-radius: 8px; }
.w-full { width: 100%; }

/* ── Topbar ─────────────────────────────────────────────── */
.topbar { height: 54px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 24px; background: rgba(8,8,8,0.82); backdrop-filter: blur(16px); position: sticky; top: 0; z-index: 40; }
.topbar-left, .topbar-right { display: flex; align-items: center; gap: 12px; }
.topbar-logo { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.06em; }
.topbar-divider { width: 1px; height: 16px; background: var(--border2); }
.topbar-title { font-size: 13px; color: var(--muted); font-weight: 500; }

/* ── Layout ─────────────────────────────────────────────── */
.inv-body { max-width: 1240px; margin: 0 auto; padding: 28px 24px 96px; display: grid; grid-template-columns: minmax(0, 1fr) 380px; gap: 28px; align-items: start; }
.inv-form { display: flex; flex-direction: column; gap: 20px; min-width: 0; }
.inv-summary { position: sticky; top: 78px; }

.card { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 24px; }
.card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 14px; }
.card-kicker { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 4px; }
.card-title { font-size: 20px; font-weight: 600; letter-spacing: -0.02em; margin: 0; }
.card-title small { font-size: 11px; font-weight: 400; color: var(--muted); letter-spacing: 0; margin-left: 8px; }
.hint { font-size: 12px; color: var(--muted); line-height: 1.6; margin: 0 0 16px; }

/* ── Fields ─────────────────────────────────────────────── */
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.span2 { grid-column: 1 / -1; }
.field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.field-label { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--dim); display: flex; align-items: center; gap: 8px; }
.field-help { font-size: 11px; color: var(--dim); }
.req { color: var(--accent); font-style: normal; }
.input { width: 100%; box-sizing: border-box; background: var(--surface2); border: 1px solid var(--border2); border-radius: 10px; padding: 11px 14px; color: var(--text); font: 14px 'DM Sans', sans-serif; outline: none; transition: border-color .2s ease; resize: vertical; }
.input:focus { border-color: rgba(164,224,75,0.5); }
select.input { appearance: none; cursor: pointer; background-image: linear-gradient(45deg, transparent 50%, #888 50%), linear-gradient(135deg, #888 50%, transparent 50%); background-position: calc(100% - 18px) 50%, calc(100% - 13px) 50%; background-size: 5px 5px; background-repeat: no-repeat; padding-right: 34px; }
.link { background: none; border: none; color: var(--accent); font-size: 11px; text-transform: none; letter-spacing: 0; cursor: pointer; padding: 0; }

/* ── Buttons ────────────────────────────────────────────── */
.btn-accent { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 24px; background: var(--accent); color: #000; font-weight: 700; font-size: 13px; border-radius: 100px; border: none; cursor: pointer; transition: transform .2s ease, opacity .2s ease; font-family: inherit; }
.btn-accent:hover:not(:disabled) { transform: translateY(-1px); }
.btn-accent:disabled { opacity: .35; cursor: not-allowed; }
.btn-accent.btn-big { width: 100%; padding: 16px 24px; font-size: 14px; margin-top: 18px; }
.btn-accent.btn-sm { padding: 8px 16px; font-size: 12px; }
.btn-ghost { white-space: nowrap; display: inline-flex; align-items: center; font-size: 12px; color: var(--muted); background: transparent; border: 1px solid var(--border2); border-radius: 100px; padding: 7px 14px; cursor: pointer; text-decoration: none; transition: color .2s ease, border-color .2s ease; font-family: inherit; }
.btn-ghost:hover { color: var(--text); border-color: rgba(255,255,255,0.3); }
.icon-btn { background: transparent; border: 1px solid var(--border2); color: var(--muted); width: 34px; height: 34px; border-radius: 50%; font-size: 18px; line-height: 1; cursor: pointer; flex-shrink: 0; }
.icon-btn:hover { color: var(--text); border-color: rgba(255,255,255,0.3); }
.reset { width: 100%; justify-content: center; margin-top: 10px; }

.seg { display: inline-flex; background: var(--surface2); border: 1px solid var(--border2); border-radius: 100px; padding: 3px; flex-shrink: 0; }
.seg-btn { border: none; background: transparent; color: var(--muted); font: 600 11px 'DM Sans', sans-serif; letter-spacing: .06em; padding: 6px 14px; border-radius: 100px; cursor: pointer; }
.seg-btn.on { background: var(--accent); color: #000; }

/* ── Services ───────────────────────────────────────────── */
.svc-list { display: flex; flex-direction: column; gap: 10px; }
.svc { border: 1px solid var(--border2); border-radius: 14px; background: var(--surface2); transition: border-color .2s ease; }
.svc--on { border-color: rgba(164,224,75,0.45); }
.svc-head { width: 100%; display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: none; border: none; color: inherit; text-align: left; cursor: pointer; font-family: inherit; }
.svc-icon { width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; background: rgba(164,224,75,0.07); border: 1px solid rgba(164,224,75,0.15); flex-shrink: 0; }
.svc-icon--on { background: var(--accent); border-color: var(--accent); }
.svc-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.svc-name { font-weight: 600; font-size: 15px; letter-spacing: -0.01em; }
.svc-tag { font-style: normal; font-size: 10px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--accent); background: rgba(164,224,75,0.08); border-radius: 100px; padding: 2px 8px; margin-left: 6px; }
.svc-sub { font-size: 12px; color: var(--muted); }
.svc-price { font-weight: 700; font-size: 14px; white-space: nowrap; }
.check { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid var(--border2); display: grid; place-items: center; flex-shrink: 0; }
.check--on { background: var(--accent); border-color: var(--accent); }
.addons { display: flex; flex-wrap: wrap; gap: 8px; padding: 0 16px 16px 68px; }
.chip { display: inline-flex; align-items: center; gap: 8px; background: transparent; border: 1px solid var(--border2); color: var(--muted); border-radius: 100px; padding: 6px 12px; font: 12px 'DM Sans', sans-serif; cursor: pointer; transition: all .2s ease; text-align: left; }
.chip b { font-weight: 700; color: var(--text); white-space: nowrap; }
.chip:hover { border-color: rgba(255,255,255,0.3); }
.chip--on { border-color: var(--accent); color: var(--text); background: rgba(164,224,75,0.1); }
.chip--on b { color: var(--accent); }

.extras { margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }
.extra-row { display: flex; gap: 8px; width: 100%; align-items: center; }
.input--sm { width: 72px; flex: none; }
.input--md { width: 130px; flex: none; }

/* ── Documents picker ───────────────────────────────────── */
.docs-pick { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
.doc-check { display: flex; align-items: center; gap: 12px; padding: 11px 14px; border: 1px solid var(--border2); border-radius: 12px; background: var(--surface2); cursor: pointer; transition: border-color .2s ease; }
.doc-check.on { border-color: rgba(164,224,75,0.45); }
.doc-check input { position: absolute; opacity: 0; pointer-events: none; }
.doc-name { flex: 1; font-size: 14px; font-weight: 500; }
.doc-no { font: 11px ui-monospace, monospace; color: var(--muted); }

/* ── Issuer (collapsible) ───────────────────────────────── */
.issuer summary { cursor: pointer; list-style: none; display: flex; flex-direction: column; gap: 2px; margin-bottom: 0; }
.issuer summary::-webkit-details-marker { display: none; }
.issuer[open] summary { margin-bottom: 18px; }

/* ── Summary ────────────────────────────────────────────── */
.sum .card-kicker { margin-bottom: 12px; }
.empty { color: var(--muted); font-size: 13px; margin: 0 0 4px; }
.sum-lines { list-style: none; margin: 0 0 14px; padding: 0; display: flex; flex-direction: column; gap: 8px; max-height: 38vh; overflow-y: auto; }
.sum-line { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; }
.sum-line b { white-space: nowrap; font-weight: 600; }
.sum-line--addon { color: var(--muted); padding-left: 12px; font-size: 12px; }
.sum-line em { font-style: normal; color: var(--muted); }
.sum-totals { margin: 0; padding-top: 14px; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 7px; }
.sum-totals div { display: flex; justify-content: space-between; font-size: 13px; color: var(--muted); }
.sum-totals dt, .sum-totals dd { margin: 0; }
.sum-totals dd { color: var(--text); font-weight: 600; }
.sum-totals .grand { color: var(--text); font-size: 18px; font-weight: 700; padding-top: 10px; margin-top: 4px; border-top: 1px solid var(--border2); }
.sum-totals .grand dd { color: var(--accent); }
.sum-totals .split { font-size: 12px; }
.missing { list-style: disc; margin: 16px 0 0; padding: 12px 14px 12px 28px; background: rgba(255,170,60,0.07); border: 1px solid rgba(255,170,60,0.22); border-radius: 10px; font-size: 12px; color: #ffb454; display: flex; flex-direction: column; gap: 4px; }

/* ── Viewer ─────────────────────────────────────────────── */
.viewer { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.92); display: flex; flex-direction: column; }
.viewer-bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 20px; border-bottom: 1px solid var(--border2); background: var(--surface); flex-wrap: wrap; }
.tabs { display: flex; gap: 6px; flex-wrap: wrap; }
.tab { background: transparent; border: 1px solid var(--border2); color: var(--muted); font: 600 12px 'DM Sans', sans-serif; padding: 7px 14px; border-radius: 100px; cursor: pointer; }
.tab.on { background: var(--accent); border-color: var(--accent); color: #000; }
.viewer-actions { display: flex; gap: 10px; align-items: center; }
.viewer-frame { flex: 1; width: 100%; border: 0; background: #e9e9e9; min-height: 0; }
.viewer-tip { margin: 0; padding: 8px 20px; font-size: 11px; color: var(--muted); background: var(--surface); border-top: 1px solid var(--border); text-align: center; }

/* ── Misc ───────────────────────────────────────────────── */
.spinner { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.15); border-top-color: var(--accent); animation: spin .7s linear infinite; display: inline-block; }
.spinner--dark { border-color: rgba(0,0,0,0.15); border-top-color: #000; }
@keyframes spin { to { transform: rotate(360deg); } }
.fade-enter-active, .fade-leave-active { transition: opacity .25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 1020px) {
  .inv-body { grid-template-columns: 1fr; padding: 20px 16px 72px; }
  .inv-summary { position: static; }
  .sum-lines { max-height: none; }
}
@media (max-width: 640px) {
  .topbar { padding: 0 14px; }
  .topbar-title, .topbar-divider { display: none; }
  .topbar-right { gap: 8px; }
  .grid2 { grid-template-columns: 1fr; }
  .addons { padding-left: 16px; }
  .card { padding: 18px; }
  .extra-row { flex-wrap: wrap; }
  .input--sm, .input--md { width: calc(50% - 4px); flex: 1; }
  .viewer-actions { width: 100%; justify-content: space-between; }
}
</style>
