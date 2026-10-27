import { ref, computed } from 'vue'
import en from '../locales/en.js'
import bg from '../locales/bg.js'

const STORAGE_KEY = 'inrait_lang'
const locales = { en, bg }

const isBrowser = typeof window !== 'undefined'

function readSaved() {
  if (!isBrowser) return null
  try { return localStorage.getItem(STORAGE_KEY) } catch { return null }
}

function detectLang() {
  const saved = readSaved()
  if (saved && locales[saved]) return saved
  const browser = isBrowser ? navigator.language?.toLowerCase() : ''
  if (browser?.startsWith('bg')) return 'bg'
  return 'en'
}

const lang = ref(detectLang())

// Dot-notation getter: t('nav.work') → locales[lang].nav.work
function resolvePath(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? path
}

export function useLanguage() {
  const locale = computed(() => locales[lang.value])

  function t(path) {
    return resolvePath(locales[lang.value], path)
  }

  function setLang(l) {
    if (!locales[l]) return
    lang.value = l
    if (!isBrowser) return // prerender: <html lang> is set through useHead in App.vue
    try { localStorage.setItem(STORAGE_KEY, l) } catch { /* storage blocked */ }
    document.documentElement.lang = l
  }

  function toggleLang() {
    setLang(lang.value === 'en' ? 'bg' : 'en')
  }

  function localizedPath(path, language = lang.value) {
    const englishPath = path === '/bg' || path === '/bg/'
      ? '/'
      : path.replace(/^\/bg(?=\/)/, '')

    if (language === 'bg') return englishPath === '/' ? '/bg' : `/bg${englishPath}`
    return englishPath
  }

  const isEN = computed(() => lang.value === 'en')
  const isBG = computed(() => lang.value === 'bg')

  return { t, locale, lang, currentLanguage: lang, setLang, toggleLang, localizedPath, isEN, isBG }
}