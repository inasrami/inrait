import { onMounted, onUnmounted } from 'vue'

/**
 * Observes all .fade-up elements in the document and adds .is-visible
 * when they enter the viewport. Safe to call from multiple components —
 * each call creates its own observer that only watches elements not yet
 * observed.
 */
export function useFadeUp() {
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px', threshold: 0.12 }
    )

    // Observe any .fade-up that hasn't been activated yet
    document.querySelectorAll('.fade-up:not(.is-visible)').forEach((el) => {
      observer.observe(el)
    })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}
