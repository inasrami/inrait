/**
 * Admin documents - pricing maths + print-ready HTML for the document pack.
 *
 * Pure module (no Vue, no DOM): everything is computed in integer cents so totals
 * always add up exactly, and every user-supplied string is HTML-escaped.
 *
 *   calcQuote(...)            → lines, discount, VAT, total, deposit / balance split
 *   buildDocumentsHtml(...)   → one self-contained HTML string (A4 pages) for 1..n documents
 *
 * NOTE: the legal wording (contract, VAT notes) is a starting template, not legal advice.
 */

import { getBundleDiscount } from './services.js'

export const DOC_TYPES = ['offer', 'proforma', 'invoice', 'contract', 'acceptance']

export const VAT_MODES = {
  none:     { rate: 0,  label: 'No VAT (supplier not VAT-registered)' },
  standard: { rate: 20, label: '20% VAT' },
  reverse:  { rate: 0,  label: '0% - EU reverse charge' },
}

export const DEFAULT_VAT_NOTES = {
  none: {
    en: 'The supplier is not registered under the VAT Act.',
    bg: 'Доставчикът не е регистриран по ЗДДС.',
  },
  standard: { en: '', bg: '' },
  reverse: {
    en: 'Reverse charge: VAT to be accounted for by the recipient (Art. 196, Directive 2006/112/EC).',
    bg: 'Обратно начисляване: данъкът се начислява от получателя (чл. 196 от Директива 2006/112/ЕО).',
  },
}

// ─── Money & small helpers ────────────────────────────────────────────────────

export const toCents = (n) => Math.round((Number(n) || 0) * 100)

export function formatMoney(cents, lang = 'en') {
  return new Intl.NumberFormat(lang === 'bg' ? 'bg-BG' : 'en-GB', {
    style: 'currency', currency: 'EUR', minimumFractionDigits: 2,
  }).format((cents || 0) / 100)
}

const pad2 = (n) => String(n).padStart(2, '0')

export function todayIso() {
  const d = new Date()
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

export function addDaysIso(iso, days) {
  const d = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  d.setDate(d.getDate() + (Number(days) || 0))
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

export function formatDate(iso) {
  const d = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return ''
  return `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`
}

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
))
const multiline = (v) => esc(v).replace(/\r?\n/g, '<br>')
const dash = (v) => (String(v ?? '').trim() ? esc(v) : '&mdash;')

/** Next number in a sequence, keeping zero padding: "0000000041" → "0000000042". */
export function nextNumber(current) {
  const m = /^(.*?)(\d+)(\D*)$/.exec(String(current ?? ''))  // increments the LAST run of digits
  if (!m) return null
  const next = String(Number(m[2]) + 1).padStart(m[2].length, '0')
  return `${m[1]}${next}${m[3]}`
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

/**
 * @param services      result of buildServices(...)
 * @param serviceIds    selected service ids
 * @param addonIds      selected add-on ids
 * @param customItems   [{ label, qty, price }] - extra lines, never discounted
 * @param discount      { mode: 'auto' | 'none' | 'custom', custom: number }
 * @param vatMode       'none' | 'standard' | 'reverse'
 * @param depositPercent 0..100
 */
export function calcQuote({
  services = [], serviceIds = [], addonIds = [], customItems = [],
  discount = { mode: 'auto', custom: 0 }, vatMode = 'none', depositPercent = 0,
}) {
  const lines = []
  let discountBase = 0
  let serviceCount = 0

  for (const svc of services) {
    if (!serviceIds.includes(svc.id)) continue
    serviceCount += 1
    const unit = toCents(svc.basePrice)
    lines.push({
      type: 'service', id: svc.id, label: svc.title, qty: 1, unit, total: unit,
      deliverables: svc.deliverables || [], timeline: svc.timeline || '',
    })
    discountBase += unit

    for (const addon of svc.addons || []) {
      if (!addonIds.includes(addon.id)) continue
      const price = toCents(addon.price)
      lines.push({ type: 'addon', id: addon.id, label: addon.label, qty: 1, unit: price, total: price })
      discountBase += price
    }
  }

  let customTotal = 0
  for (const item of customItems) {
    const label = String(item?.label ?? '').trim()
    const qty = Number(item?.qty) > 0 ? Number(item.qty) : 1
    const unit = toCents(item?.price)
    if (!label || unit <= 0) continue
    const total = Math.round(qty * unit)
    lines.push({ type: 'custom', label, qty, unit, total })
    customTotal += total
  }

  let discountPercent = 0
  let discountIsBundle = false
  if (discount.mode === 'auto') {
    discountPercent = getBundleDiscount(serviceCount)?.percent ?? 0
    discountIsBundle = discountPercent > 0
  } else if (discount.mode === 'custom') {
    discountPercent = Math.min(100, Math.max(0, Number(discount.custom) || 0))
  }

  const discountCents = Math.round(discountBase * discountPercent / 100)
  const subtotal = discountBase + customTotal
  const net = subtotal - discountCents
  const vatRate = (VAT_MODES[vatMode] || VAT_MODES.none).rate
  const vat = Math.round(net * vatRate / 100)
  const total = net + vat

  // Deposit / balance split - the two always add up to the total, cent for cent
  const depPct = Math.min(100, Math.max(0, Number(depositPercent) || 0))
  const depNet = Math.round(net * depPct / 100)
  const depVat = Math.round(depNet * vatRate / 100)
  const deposit = { net: depNet, vat: depVat, total: depNet + depVat }
  const balance = { net: net - depNet, vat: vat - depVat, total: total - deposit.total }

  return {
    lines, serviceCount, subtotal, discountPercent, discountIsBundle, discountCents,
    net, vatRate, vat, total, depositPercent: depPct, deposit, balance,
  }
}

// ─── Strings ──────────────────────────────────────────────────────────────────

const L = {
  en: {
    titles: { offer: 'Quotation', proforma: 'Proforma invoice', invoice: 'Invoice', contract: 'Service agreement', acceptance: 'Acceptance certificate' },
    supplier: 'Supplier', client: 'Client',
    no: 'No.', issueDate: 'Issue date', validUntil: 'Valid until', dueDate: 'Payment due', taxEvent: 'Date of tax event',
    eik: 'Company ID', vatNo: 'VAT no.', rep: 'Represented by', contact: 'Contact',
    project: 'Project', description: 'Description', qty: 'Qty', unitPrice: 'Unit price', amount: 'Amount',
    subtotal: 'Subtotal', netAmount: 'Net amount', total: 'Total',
    bundle: (n, p) => `Bundle discount (${n} services, -${p}%)`,
    discount: (p) => `Discount (-${p}%)`,
    vat: (r) => `VAT ${r}%`,
    vatPlain: 'VAT',
    depositRow: (p) => `Deposit (${p}%)`,
    balanceRow: (p) => `Balance (${p}%)`,
    payableNow: 'Payable now', amountDue: 'Amount due',
    paymentDetails: 'Payment details', bank: 'Bank', iban: 'IBAN', bic: 'BIC / SWIFT', reference: 'Payment reference',
    timeline: 'Delivery timeline', notes: 'Notes',
    advanceLine: (p, proj) => `Advance payment ${p}% - ${proj}`,
    balanceLine: (p, proj) => `Remaining balance ${p}% - ${proj}`,
    offerIntro: (proj) => `Thank you for your interest. Below is our proposal for the project "${proj}".`,
    offerValid: 'This quotation is valid for 30 days from the issue date.',
    offerTerms: (dep, depAmt, balAmt, days) => dep > 0
      ? `Payment terms: a ${dep}% deposit (${depAmt}) is due before work starts; the remaining ${balAmt} is due within ${days} days of delivery.`
      : `Payment terms: the full amount is due within ${days} days of the invoice date.`,
    offerAccept: 'Accepted by the Client',
    proformaNote: 'This proforma invoice is not a tax document. A tax invoice will be issued after payment.',
    included: 'Included',
    signFor: (who) => `For the ${who}`,
    signName: 'Name', signDate: 'Date', signSignature: 'Signature',
    page: 'Page',
    // contract
    contractIntro: (no, date, sup, cli) => `This agreement no. ${no} is made on ${date} between ${sup} ("the Supplier") and ${cli} ("the Client").`,
    clauses: (c) => [
      { t: '1. Subject', p: [
        `The Supplier will provide the Client with the services listed in the Annex below (quotation no. ${c.offerNo}) for the project "${c.project}" (the "Services").`,
      ] },
      { t: '2. Scope and deliverables', p: [
        'The scope of each service is described in the Annex. Anything not listed in the Annex is outside the scope and will be quoted separately before any work on it begins.',
      ] },
      { t: '3. Price and payment', p: [
        `The total price is ${c.total}${c.vatText}.`,
        c.deposit > 0
          ? `A deposit of ${c.deposit}% (${c.depositAmt}) is due before work starts. The remaining ${c.balanceAmt} is due within ${c.days} days of delivery and the invoice date.`
          : `The full price is due within ${c.days} days of the invoice date.`,
        'Late payments bear statutory interest. The Supplier may pause work while an invoice is overdue.',
      ] },
      { t: '4. Timeline', p: [
        c.timeline
          ? `The Services will be delivered within ${c.timeline}, counted from receipt of the deposit and all materials the Client must provide.`
          : 'The delivery timeline is agreed in writing and counted from receipt of the deposit and all materials the Client must provide.',
        'Delays caused by late feedback, content or access from the Client move the timeline accordingly.',
      ] },
      { t: '5. Client responsibilities', p: [
        'The Client will provide texts, images, brand assets, accounts and access that the work requires, and will give feedback promptly. The Client confirms they hold the rights to everything they supply.',
      ] },
      { t: '6. Revisions', p: [
        'Reasonable revisions within the agreed scope are included. Changes that go beyond the scope are quoted and agreed in writing before they start.',
      ] },
      { t: '7. Intellectual property', p: [
        'Upon full payment, the rights to the deliverables created specifically for the Client pass to the Client. The Supplier keeps all rights to its pre-existing code, tools and frameworks, and third-party components remain under their own licences. The Supplier may show the finished work in its portfolio unless the Client objects in writing.',
      ] },
      { t: '8. Confidentiality', p: [
        'Each party keeps the other party\'s non-public business information confidential and uses it only for this agreement. This continues after the agreement ends.',
      ] },
      { t: '9. Support after delivery', p: [
        'The Supplier will fix defects in the delivered work reported within 30 days after acceptance, free of charge. Later work, new features and third-party service issues (hosting, payment providers and similar) are charged separately.',
      ] },
      { t: '10. Liability', p: [
        'The Supplier\'s total liability under this agreement is limited to the amounts paid by the Client. Neither party is liable for indirect or consequential losses.',
      ] },
      { t: '11. Termination', p: [
        'Either party may terminate by written notice. The Client pays for work completed up to the termination date; a deposit covers work already started and is not refunded for that work.',
      ] },
      { t: '12. Governing law', p: [
        'This agreement is governed by the law of the Republic of Bulgaria. The parties will try to settle disputes amicably first; otherwise the competent court in Sofia decides.',
      ] },
      { t: '13. Final provisions', p: [
        'Changes must be made in writing. The agreement may be signed in counterparts or electronically, and each signed copy is equally valid.',
      ] },
    ],
    annex: 'Annex - services and prices',
    // acceptance
    acceptIntro: (proj, date) => `The Supplier delivered the services below for the project "${proj}". The Client reviewed them on ${date}.`,
    acceptDelivered: 'Delivered',
    acceptStatement: 'The Client confirms receipt and accepts the delivered work with no objections, except for the remarks below (if any).',
    acceptRemarks: 'Remarks',
    acceptWarranty: 'The 30-day post-delivery support period under the service agreement starts from the date of this certificate.',
  },

  bg: {
    titles: { offer: 'Оферта', proforma: 'Проформа фактура', invoice: 'Фактура', contract: 'Договор за услуги', acceptance: 'Приемо-предавателен протокол' },
    supplier: 'Доставчик', client: 'Клиент',
    no: '№', issueDate: 'Дата на издаване', validUntil: 'Валидна до', dueDate: 'Падеж', taxEvent: 'Дата на данъчно събитие',
    eik: 'ЕИК', vatNo: 'ИН по ЗДДС', rep: 'МОЛ', contact: 'Лице за контакт',
    project: 'Проект', description: 'Описание', qty: 'Кол.', unitPrice: 'Ед. цена', amount: 'Сума',
    subtotal: 'Междинна сума', netAmount: 'Данъчна основа', total: 'Общо',
    bundle: (n, p) => `Отстъпка за пакет (${n} услуги, -${p}%)`,
    discount: (p) => `Отстъпка (-${p}%)`,
    vat: (r) => `ДДС ${r}%`,
    vatPlain: 'ДДС',
    depositRow: (p) => `Аванс (${p}%)`,
    balanceRow: (p) => `Остатък (${p}%)`,
    payableNow: 'Дължимо сега', amountDue: 'Сума за плащане',
    paymentDetails: 'Данни за плащане', bank: 'Банка', iban: 'IBAN', bic: 'BIC / SWIFT', reference: 'Основание за плащане',
    timeline: 'Срок за изпълнение', notes: 'Забележки',
    advanceLine: (p, proj) => `Авансово плащане ${p}% - ${proj}`,
    balanceLine: (p, proj) => `Остатък за плащане ${p}% - ${proj}`,
    offerIntro: (proj) => `Благодарим за проявения интерес. По-долу е нашето предложение за проект „${proj}“.`,
    offerValid: 'Офертата е валидна 30 дни от датата на издаване.',
    offerTerms: (dep, depAmt, balAmt, days) => dep > 0
      ? `Условия за плащане: аванс от ${dep}% (${depAmt}) преди започване на работата; остатъкът от ${balAmt} се дължи в срок от ${days} дни след предаването.`
      : `Условия за плащане: пълната сума се дължи в срок от ${days} дни от датата на фактурата.`,
    offerAccept: 'Приета от Клиента',
    proformaNote: 'Проформа фактурата не е данъчен документ. Данъчна фактура ще бъде издадена след плащането.',
    included: 'Включено',
    signFor: (who) => `За ${who}`,
    signName: 'Име', signDate: 'Дата', signSignature: 'Подпис',
    page: 'Стр.',
    contractIntro: (no, date, sup, cli) => `Този договор № ${no} се сключва на ${date} между ${sup} („Изпълнителят“) и ${cli} („Възложителят“).`,
    clauses: (c) => [
      { t: '1. Предмет', p: [
        `Изпълнителят предоставя на Възложителя услугите, описани в Приложението по-долу (оферта № ${c.offerNo}), за проект „${c.project}“ („Услугите“).`,
      ] },
      { t: '2. Обхват и резултати', p: [
        'Обхватът на всяка услуга е описан в Приложението. Всичко, което не е посочено в него, е извън обхвата и се остойностява отделно, преди да започне работа по него.',
      ] },
      { t: '3. Цена и плащане', p: [
        `Общата цена е ${c.total}${c.vatText}.`,
        c.deposit > 0
          ? `Аванс от ${c.deposit}% (${c.depositAmt}) се дължи преди започване на работата. Остатъкът от ${c.balanceAmt} се дължи в срок от ${c.days} дни след предаването и датата на фактурата.`
          : `Пълната цена се дължи в срок от ${c.days} дни от датата на фактурата.`,
        'При забава се дължи законната лихва. Изпълнителят може да спре работата, докато има просрочена фактура.',
      ] },
      { t: '4. Срок', p: [
        c.timeline
          ? `Услугите се предават в срок от ${c.timeline}, считано от получаването на аванса и на всички материали, които Възложителят трябва да предостави.`
          : 'Срокът за изпълнение се уговаря писмено и тече от получаването на аванса и на всички материали, които Възложителят трябва да предостави.',
        'Забавяне на обратна връзка, съдържание или достъп от страна на Възложителя удължава срока съответно.',
      ] },
      { t: '5. Задължения на Възложителя', p: [
        'Възложителят предоставя текстове, изображения, брандови материали, акаунти и достъпи, необходими за работата, и дава обратна връзка своевременно. Възложителят потвърждава, че притежава правата върху всичко, което предоставя.',
      ] },
      { t: '6. Корекции', p: [
        'Разумни корекции в рамките на уговорения обхват са включени. Промени извън обхвата се остойностяват и се уговарят писмено, преди да започнат.',
      ] },
      { t: '7. Интелектуална собственост', p: [
        'С пълното плащане правата върху резултатите, създадени специално за Възложителя, преминават към него. Изпълнителят запазва всички права върху предварително съществуващия си код, инструменти и рамки, а компонентите на трети страни остават под собствените си лицензи. Изпълнителят може да показва готовата работа в портфолиото си, освен ако Възложителят не възрази писмено.',
      ] },
      { t: '8. Поверителност', p: [
        'Всяка страна запазва в тайна непубличната бизнес информация на другата страна и я използва само за целите на този договор. Задължението продължава и след прекратяването му.',
      ] },
      { t: '9. Поддръжка след предаване', p: [
        'Изпълнителят отстранява безплатно дефектите в предадената работа, съобщени в рамките на 30 дни след приемането. Последваща работа, нови функционалности и проблеми с услуги на трети страни (хостинг, платежни доставчици и други) се заплащат отделно.',
      ] },
      { t: '10. Отговорност', p: [
        'Общата отговорност на Изпълнителя по този договор е ограничена до сумите, платени от Възложителя. Никоя от страните не отговаря за непреки или последващи вреди.',
      ] },
      { t: '11. Прекратяване', p: [
        'Всяка страна може да прекрати договора с писмено уведомление. Възложителят заплаща извършената до прекратяването работа; авансът покрива вече започната работа и не се възстановява за нея.',
      ] },
      { t: '12. Приложимо право', p: [
        'Договорът се урежда от правото на Република България. Страните ще се опитат първо да решат споровете по взаимно съгласие; в противен случай спорът се решава от компетентния съд в гр. София.',
      ] },
      { t: '13. Заключителни разпоредби', p: [
        'Промени се правят в писмена форма. Договорът може да бъде подписан в няколко екземпляра или електронно и всеки подписан екземпляр има еднаква сила.',
      ] },
    ],
    annex: 'Приложение - услуги и цени',
    acceptIntro: (proj, date) => `Изпълнителят предаде услугите по-долу по проект „${proj}“. Възложителят ги прегледа на ${date}.`,
    acceptDelivered: 'Предадено',
    acceptStatement: 'Възложителят потвърждава получаването и приема предадената работа без възражения, освен посочените по-долу забележки (ако има такива).',
    acceptRemarks: 'Забележки',
    acceptWarranty: 'Срокът за поддръжка от 30 дни след предаването по договора за услуги започва да тече от датата на този протокол.',
  },
}

// ─── HTML building blocks ─────────────────────────────────────────────────────

const CSS = `
:root { --ink:#111; --muted:#666; --line:#e4e4e4; --soft:#f6f7f4; --accent:#A4E04B; --green:#4c7d0a; }
* { box-sizing: border-box; }
html, body { margin:0; padding:0; }
body { font: 11.5px/1.5 -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: var(--ink); background:#e9e9e9; }
.page { width:210mm; min-height:297mm; margin:14px auto; padding:14mm 16mm; background:#fff; box-shadow:0 2px 18px rgba(0,0,0,.14); }
.head { display:flex; justify-content:space-between; align-items:flex-start; gap:24px; padding-bottom:11px; border-bottom:3px solid var(--accent); margin-bottom:14px; }
.brand { font-weight:800; font-size:24px; letter-spacing:.08em; line-height:1; }
.brand b { color: var(--green); font-weight:800; }
.brand-sub { margin-top:6px; color:var(--muted); font-size:10.5px; }
.doc-meta { text-align:right; }
.doc-title { font-size:22px; font-weight:800; letter-spacing:.04em; text-transform:uppercase; line-height:1.1; }
.doc-no { margin-top:4px; font-size:13px; font-weight:600; }
.meta-table { margin-top:8px; margin-left:auto; border-collapse:collapse; }
.meta-table td { padding:1px 0 1px 14px; font-size:11px; }
.meta-table td:first-child { color:var(--muted); }
.parties { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
.party { background:var(--soft); border-radius:6px; padding:9px 12px; }
.party h4 { margin:0 0 6px; font-size:9.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); }
.party .nm { font-weight:700; font-size:13px; margin-bottom:2px; }
.party .ln { font-size:10.5px; color:#333; }
.party .ln span { color:var(--muted); }
.project { margin:0 0 9px; font-size:12px; }
.project span { color:var(--muted); }
.lead { margin:0 0 9px; }
table.items { width:100%; border-collapse:collapse; margin-bottom:6px; }
table.items th { text-align:left; font-size:9.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); padding:6px 8px; border-bottom:1.5px solid var(--ink); }
table.items td { padding:6px 8px; border-bottom:1px solid var(--line); vertical-align:top; }
table.items tr { break-inside:avoid; }
table.items .n { text-align:right; white-space:nowrap; }
table.items .svc { font-weight:600; }
table.items .add { padding-left:22px; color:#333; }
table.items .add::before { content:"+ "; color:var(--green); font-weight:700; }
.deliv { margin:3px 0 0; padding-left:16px; color:var(--muted); font-size:10px; font-weight:400; }
.totals { width:62%; margin:8px 0 12px auto; border-collapse:collapse; break-inside:avoid; }
.totals td { padding:4px 8px; font-size:11.5px; }
.totals td:last-child { text-align:right; white-space:nowrap; }
.totals tr.sep td { border-top:1px solid var(--line); }
.totals tr.grand td { border-top:2px solid var(--ink); font-weight:800; font-size:13.5px; padding-top:7px; }
.totals tr.due td { background:var(--accent); font-weight:800; font-size:13.5px; }
.box { background:var(--soft); border-radius:6px; padding:9px 12px; margin-bottom:9px; break-inside:avoid; }
.box h4 { margin:0 0 6px; font-size:9.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); }
.box p { margin:0 0 3px; }
.kv { display:grid; grid-template-columns:120px 1fr; gap:2px 10px; font-size:11.5px; }
.kv span { color:var(--muted); }
.note { color:var(--muted); font-size:11px; margin:6px 0; }
.clause { margin-bottom:7px; break-inside:avoid; }
.clause h5 { margin:0 0 2px; font-size:12px; }
.clause p { margin:0 0 3px; text-align:justify; }
.sigs { display:grid; grid-template-columns:1fr 1fr; gap:36px; margin-top:22px; break-inside:avoid; }
.sig .who { font-weight:700; margin-bottom:26px; }
.sig .line { border-top:1px solid var(--ink); padding-top:4px; font-size:10.5px; color:var(--muted); }
.sig .nm { font-size:11.5px; margin-top:8px; }
.remarks { height:52px; border:1px solid var(--line); border-radius:6px; margin-bottom:10px; }
.foot { margin-top:14px; padding-top:8px; break-inside:avoid; break-before:avoid; border-top:1px solid var(--line); color:var(--muted); font-size:10px; display:flex; justify-content:space-between; gap:16px; }
@page { size: A4; margin: 13mm 14mm 15mm; }
@media print {
  body { background:#fff; }
  .page { width:auto; min-height:0; margin:0; padding:0; box-shadow:none; break-after:page; }
  .page:last-child { break-after:auto; }
  * { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
}
`

function partyBlock(title, p, str, { isClient = false } = {}) {
  const addr = [p.address, [p.city, p.country].filter(Boolean).join(', ')].filter((x) => String(x || '').trim())
  const rows = []
  if (isClient && p.contact) rows.push(`<div class="ln"><span>${esc(str.contact)}:</span> ${esc(p.contact)}</div>`)
  if (addr.length) rows.push(`<div class="ln">${addr.map(multiline).join('<br>')}</div>`)
  if (p.eik) rows.push(`<div class="ln"><span>${esc(str.eik)}:</span> ${esc(p.eik)}</div>`)
  if (p.vat) rows.push(`<div class="ln"><span>${esc(str.vatNo)}:</span> ${esc(p.vat)}</div>`)
  if (!isClient && p.representative) rows.push(`<div class="ln"><span>${esc(str.rep)}:</span> ${esc(p.representative)}</div>`)
  if (p.email) rows.push(`<div class="ln">${esc(p.email)}</div>`)
  if (p.phone) rows.push(`<div class="ln">${esc(p.phone)}</div>`)
  return `<div class="party"><h4>${esc(title)}</h4><div class="nm">${dash(p.name)}</div>${rows.join('')}</div>`
}

function header(type, ctx, { extraMeta = [] } = {}) {
  const { str, issuer, meta, nos } = ctx
  const rows = [[str.issueDate, formatDate(meta.issueDate)], ...extraMeta]
    .map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')
  return `
  <div class="head">
    <div>
      <div class="brand">IN<b>R</b>AIT</div>
      <div class="brand-sub">${esc(issuer.website || '')}</div>
    </div>
    <div class="doc-meta">
      <div class="doc-title">${esc(str.titles[type])}</div>
      <div class="doc-no">${esc(str.no)} ${esc(nos[type])}</div>
      <table class="meta-table">${rows}</table>
    </div>
  </div>`
}

function parties(ctx) {
  const { str, issuer, client } = ctx
  return `<div class="parties">${partyBlock(str.supplier, issuer, str)}${partyBlock(str.client, client, str, { isClient: true })}</div>`
}

function projectLine(ctx) {
  const { str, meta } = ctx
  return meta.project ? `<p class="project"><span>${esc(str.project)}:</span> <b>${esc(meta.project)}</b></p>` : ''
}

function itemsTable(lines, ctx, { deliverables = false } = {}) {
  const { str, lang } = ctx
  const body = lines.map((ln) => {
    const label = ln.type === 'addon'
      ? `<td class="add">${esc(ln.label)}</td>`
      : `<td class="${ln.type === 'service' ? 'svc' : ''}">${esc(ln.label)}${
        deliverables && ln.deliverables?.length
          ? `<ul class="deliv">${ln.deliverables.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>` : ''}</td>`
    return `<tr>${label}<td class="n">${esc(ln.qty)}</td><td class="n">${formatMoney(ln.unit, lang)}</td><td class="n">${formatMoney(ln.total, lang)}</td></tr>`
  }).join('')
  return `<table class="items"><thead><tr><th>${esc(str.description)}</th><th class="n">${esc(str.qty)}</th><th class="n">${esc(str.unitPrice)}</th><th class="n">${esc(str.amount)}</th></tr></thead><tbody>${body}</tbody></table>`
}

/** Totals rows for the full quote (or for one partial amount: { net, vat, total }). */
function totalsTable(ctx, { part = null, extraRows = '', dueLabel = null, dueCents = null } = {}) {
  const { str, lang, quote: q } = ctx
  const m = (c) => formatMoney(c, lang)
  const rows = []
  const net = part ? part.net : q.net
  const vat = part ? part.vat : q.vat
  const total = part ? part.total : q.total

  if (!part) {
    if (q.discountCents > 0 || q.subtotal !== q.net) {
      rows.push(`<tr><td>${esc(str.subtotal)}</td><td>${m(q.subtotal)}</td></tr>`)
    }
    if (q.discountCents > 0) {
      const lbl = q.discountIsBundle ? str.bundle(q.serviceCount, q.discountPercent) : str.discount(q.discountPercent)
      rows.push(`<tr><td>${esc(lbl)}</td><td>-${m(q.discountCents)}</td></tr>`)
    }
  }
  rows.push(`<tr class="${rows.length ? 'sep' : ''}"><td>${esc(str.netAmount)}</td><td>${m(net)}</td></tr>`)
  rows.push(`<tr><td>${esc(q.vatRate > 0 ? str.vat(q.vatRate) : str.vatPlain)}</td><td>${q.vatRate > 0 ? m(vat) : '&mdash;'}</td></tr>`)
  rows.push(`<tr class="grand"><td>${esc(str.total)}</td><td>${m(total)}</td></tr>`)
  if (dueLabel) rows.push(`<tr class="due"><td>${esc(dueLabel)}</td><td>${m(dueCents)}</td></tr>`)
  return `<table class="totals">${rows.join('')}${extraRows}</table>`
}

function paymentBox(ctx, { reference }) {
  const { str, issuer } = ctx
  const rows = [
    [str.bank, issuer.bank], [str.iban, issuer.iban], [str.bic, issuer.bic], [str.reference, reference],
  ].filter(([, v]) => String(v || '').trim())
  if (!rows.length) return ''
  return `<div class="box"><h4>${esc(str.paymentDetails)}</h4><div class="kv">${rows.map(([k, v]) => `<span>${esc(k)}</span><b>${esc(v)}</b>`).join('')}</div></div>`
}

function footer(ctx) {
  const { issuer } = ctx
  const left = [issuer.name, issuer.email, issuer.phone].filter(Boolean).map(esc).join(' &middot; ')
  return `<div class="foot"><span>${left}</span><span>${esc(issuer.website || '')}</span></div>`
}

function notesBlock(ctx, text, title) {
  if (!String(text || '').trim()) return ''
  return `<div class="box"><h4>${esc(title)}</h4><p>${multiline(text)}</p></div>`
}

function signatures(ctx, { supplierLabel, clientLabel }) {
  const { str, issuer, client } = ctx
  return `<div class="sigs">
    <div class="sig"><div class="who">${esc(supplierLabel)}</div><div class="line">${esc(str.signSignature)}</div><div class="nm">${esc(str.signName)}: ${dash(issuer.representative || issuer.name)}</div><div class="nm">${esc(str.signDate)}: ____________</div></div>
    <div class="sig"><div class="who">${esc(clientLabel)}</div><div class="line">${esc(str.signSignature)}</div><div class="nm">${esc(str.signName)}: ${dash(client.contact || client.name)}</div><div class="nm">${esc(str.signDate)}: ____________</div></div>
  </div>`
}

// ─── The five documents ───────────────────────────────────────────────────────

function offerPage(ctx) {
  const { str, lang, quote: q, meta, nos } = ctx
  const m = (c) => formatMoney(c, lang)
  const terms = str.offerTerms(q.depositPercent, m(q.deposit.total), m(q.balance.total), meta.dueDays)
  const rows = q.depositPercent > 0 && q.depositPercent < 100
    ? `<tr class="sep"><td>${esc(str.depositRow(q.depositPercent))}</td><td>${m(q.deposit.total)}</td></tr><tr><td>${esc(str.balanceRow(100 - q.depositPercent))}</td><td>${m(q.balance.total)}</td></tr>`
    : ''
  return `<section class="page">
    ${header('offer', ctx, { extraMeta: [[str.validUntil, formatDate(meta.validUntil)]] })}
    ${parties(ctx)}
    ${projectLine(ctx)}
    <p class="lead">${esc(str.offerIntro(meta.project || '—'))}</p>
    ${itemsTable(q.lines, ctx, { deliverables: true })}
    ${totalsTable(ctx, { extraRows: rows })}
    ${meta.timeline ? `<div class="box"><h4>${esc(str.timeline)}</h4><p>${esc(meta.timeline)}</p></div>` : ''}
    <div class="box"><p>${esc(terms)}</p><p>${esc(str.offerValid)}</p></div>
    ${notesBlock(ctx, meta.notes, str.notes)}
    ${signatures(ctx, { supplierLabel: str.signFor(str.supplier), clientLabel: str.offerAccept })}
    ${footer(ctx)}
  </section>`
}

function invoiceLikePage(type, ctx) {
  const { str, lang, quote: q, meta, nos } = ctx
  const isProforma = type === 'proforma'
  const m = (c) => formatMoney(c, lang)
  const mode = isProforma ? 'full' : meta.invoiceFor
  const proj = meta.project || '—'

  let lines = q.lines
  let table
  let part = null
  if (!isProforma && mode === 'deposit' && q.depositPercent > 0) {
    part = q.deposit
    lines = [{ type: 'custom', label: str.advanceLine(q.depositPercent, proj), qty: 1, unit: q.deposit.net, total: q.deposit.net }]
  } else if (!isProforma && mode === 'balance' && q.depositPercent > 0) {
    part = q.balance
    lines = [{ type: 'custom', label: str.balanceLine(100 - q.depositPercent, proj), qty: 1, unit: q.balance.net, total: q.balance.net }]
  }
  table = itemsTable(lines, ctx)

  let totals
  if (isProforma) {
    const payNow = q.depositPercent > 0 && q.depositPercent < 100
    totals = totalsTable(ctx, payNow
      ? { dueLabel: `${str.payableNow} - ${str.depositRow(q.depositPercent)}`, dueCents: q.deposit.total }
      : { dueLabel: str.payableNow, dueCents: q.total })
  } else {
    totals = totalsTable(ctx, { part, dueLabel: str.amountDue, dueCents: part ? part.total : q.total })
  }

  const extraMeta = isProforma
    ? [[str.dueDate, formatDate(meta.dueDate)]]
    : [[str.taxEvent, formatDate(meta.issueDate)], [str.dueDate, formatDate(meta.dueDate)]]

  return `<section class="page">
    ${header(type, ctx, { extraMeta })}
    ${parties(ctx)}
    ${projectLine(ctx)}
    ${table}
    ${totals}
    ${paymentBox(ctx, { reference: nos[type] })}
    ${isProforma ? `<p class="note">${esc(str.proformaNote)}</p>` : ''}
    ${!isProforma && String(meta.vatNote || '').trim() ? `<p class="note">${multiline(meta.vatNote)}</p>` : ''}
    ${notesBlock(ctx, meta.notes, str.notes)}
    ${footer(ctx)}
  </section>`
}

function contractPage(ctx) {
  const { str, lang, quote: q, meta, nos, issuer, client } = ctx
  const m = (c) => formatMoney(c, lang)
  const vatText = q.vatRate > 0
    ? (lang === 'bg' ? ` (без ДДС ${m(q.net)}, ДДС ${q.vatRate}% ${m(q.vat)})` : ` (net ${m(q.net)} + VAT ${q.vatRate}% ${m(q.vat)})`)
    : (lang === 'bg' ? ' (без начислен ДДС)' : ' (no VAT charged)')
  const sup = `${issuer.name || '—'}${issuer.eik ? `, ${str.eik} ${issuer.eik}` : ''}`
  const cli = `${client.name || '—'}${client.eik ? `, ${str.eik} ${client.eik}` : ''}`
  const clauses = str.clauses({
    offerNo: nos.offer, project: meta.project || '—', total: m(q.total), vatText,
    deposit: q.depositPercent, depositAmt: m(q.deposit.total), balanceAmt: m(q.balance.total),
    days: meta.dueDays, timeline: meta.timeline,
  })
  return `<section class="page">
    ${header('contract', ctx)}
    ${parties(ctx)}
    <p class="lead">${esc(str.contractIntro(nos.contract, formatDate(meta.issueDate), sup, cli))}</p>
    ${clauses.map((c) => `<div class="clause"><h5>${esc(c.t)}</h5>${c.p.map((x) => `<p>${esc(x)}</p>`).join('')}</div>`).join('')}
    ${signatures(ctx, { supplierLabel: str.signFor(lang === 'bg' ? 'Изпълнителя' : str.supplier), clientLabel: str.signFor(lang === 'bg' ? 'Възложителя' : str.client) })}
  </section>
  <section class="page">
    ${header('contract', ctx)}
    <h3 style="margin:0 0 10px">${esc(str.annex)}</h3>
    ${projectLine(ctx)}
    ${itemsTable(q.lines, ctx, { deliverables: true })}
    ${totalsTable(ctx)}
    ${meta.timeline ? `<div class="box"><h4>${esc(str.timeline)}</h4><p>${esc(meta.timeline)}</p></div>` : ''}
    ${footer(ctx)}
  </section>`
}

function acceptancePage(ctx) {
  const { str, quote: q, meta, nos } = ctx
  const delivered = q.lines.map((ln) => `<tr><td class="${ln.type === 'addon' ? 'add' : ln.type === 'service' ? 'svc' : ''}">${esc(ln.label)}</td><td class="n">&#9744;</td></tr>`).join('')
  return `<section class="page">
    ${header('acceptance', ctx)}
    ${parties(ctx)}
    ${projectLine(ctx)}
    <p class="lead">${esc(str.acceptIntro(meta.project || '—', formatDate(meta.issueDate)))}</p>
    <table class="items"><thead><tr><th>${esc(str.description)}</th><th class="n">${esc(str.acceptDelivered)}</th></tr></thead><tbody>${delivered}</tbody></table>
    <div class="box"><p>${esc(str.acceptStatement)}</p></div>
    <div class="note">${esc(str.acceptRemarks)}:</div>
    <div class="remarks"></div>
    <p class="note">${esc(str.acceptWarranty)}</p>
    ${signatures(ctx, { supplierLabel: str.signFor(ctx.lang === 'bg' ? 'Изпълнителя' : str.supplier), clientLabel: str.signFor(ctx.lang === 'bg' ? 'Възложителя' : str.client) })}
    ${footer(ctx)}
  </section>`
}

const BUILDERS = {
  offer: offerPage,
  proforma: (ctx) => invoiceLikePage('proforma', ctx),
  invoice: (ctx) => invoiceLikePage('invoice', ctx),
  contract: contractPage,
  acceptance: acceptancePage,
}

/**
 * @param docs     document types to include, in order (see DOC_TYPES)
 * @param lang     'en' | 'bg'
 * @param issuer   { name, eik, vat, address, city, country, email, phone, website, representative, bank, iban, bic }
 * @param client   { name, contact, eik, vat, address, city, country, email, phone }
 * @param meta     { project, issueDate, dueDate, validUntil, dueDays, timeline, notes, vatNote, invoiceFor, title }
 * @param nos      { offer, proforma, invoice, contract, acceptance } - document numbers
 * @param quote    result of calcQuote()
 */
export function buildDocumentsHtml({ docs, lang = 'en', issuer, client, meta, nos, quote }) {
  const str = L[lang] || L.en
  const ctx = { str, lang, issuer, client, meta, nos, quote }
  const pages = docs.filter((d) => BUILDERS[d]).map((d) => BUILDERS[d](ctx)).join('\n')
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${esc(meta.title || 'Documents')}</title><style>${CSS}</style></head><body>${pages}</body></html>`
}
