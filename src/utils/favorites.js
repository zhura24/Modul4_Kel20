const KEY = 'bore-barrel-favorites'
const EVENT = 'favorites-changed'

export function getFavorites() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function isFavorite(name) {
  return getFavorites().includes(name)
}

export function toggleFavorite(name) {
  const current = getFavorites()
  const next = current.includes(name)
    ? current.filter((n) => n !== name)
    : [...current, name]
  localStorage.setItem(KEY, JSON.stringify(next))
  window.dispatchEvent(new Event(EVENT))
  return next
}

export function subscribeFavorites(callback) {
  window.addEventListener(EVENT, callback)
  return () => window.removeEventListener(EVENT, callback)
}