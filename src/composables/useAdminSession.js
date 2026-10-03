import { ref, onMounted, onBeforeUnmount } from 'vue'
import { auth } from '../firebase.js'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

/**
 * Admin sign-in shared by the admin pages.
 * Firebase keeps the session between pages, so signing in once is enough. Only the
 * account whose email equals VITE_ADMIN_EMAIL counts as logged in - any other
 * account is signed out straight away.
 */
const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || '').trim().toLowerCase()

export function useAdminSession() {
  const isLoggedIn = ref(false)
  const ready      = ref(false)   // false until Firebase has reported the stored session
  const email      = ref('')
  const password   = ref('')
  const loading    = ref(false)
  const error      = ref('')

  let unsubscribe = null

  onMounted(() => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      isLoggedIn.value = Boolean(user && adminEmail && user.email?.toLowerCase() === adminEmail)
      ready.value = true
    })
  })
  onBeforeUnmount(() => unsubscribe?.())

  async function login() {
    error.value = ''
    loading.value = true
    try {
      const credentials = await signInWithEmailAndPassword(auth, email.value, password.value)
      if (!adminEmail) {
        await signOut(auth)
        throw new Error('admin-not-configured')
      }
      if (credentials.user.email?.toLowerCase() !== adminEmail) {
        await signOut(auth)
        throw new Error('admin-email-mismatch')
      }
      password.value = ''
    } catch (err) {
      error.value = err.message === 'admin-not-configured'
        ? 'Admin access is not configured. Add VITE_ADMIN_EMAIL and redeploy the site.'
        : err.message === 'admin-email-mismatch'
        ? 'This account email does not match the configured admin email.'
        : /wrong-password|user-not-found|invalid-credential/.test(err.message)
        ? 'Invalid email or password.'
        : 'Login failed. Check your credentials.'
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    await signOut(auth)
    isLoggedIn.value = false
    email.value = ''
    password.value = ''
  }

  return { isLoggedIn, ready, email, password, loading, error, login, logout }
}
