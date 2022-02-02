export const getHash = () => (
  decodeURIComponent(window.location.hash).replace(/^#/, '')
)

export const setHash = (hash) => {
  const url = new URL(window.location.href)
  url.hash = hash || ''
  window.history.replaceState({}, '', url)
}
