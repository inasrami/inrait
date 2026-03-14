import { ref, computed } from 'vue'
import en from '../locales/en.js'
import bg from '../locales/bg.js'

const STORAGE_KEY = 'inrait_lang'
const locales = { en, bg }

function detectLang() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && locales[saved]) return saved
  const browser = navigator.language?.toLowerCase()
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
    localStorage.setItem(STORAGE_KEY, l)
    document.documentElement.lang = l
  }

  function toggleLang() {
    setLang(lang.value === 'en' ? 'bg' : 'en')
  }

  const isEN = computed(() => lang.value === 'en')
  const isBG = computed(() => lang.value === 'bg')

  return { t, locale, lang, setLang, toggleLang, isEN, isBG }
}