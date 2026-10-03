const KEY = 'bore-barrel-cart'
const EVENT = 'cart-changed'

export function getCart() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event(EVENT))
}

export function addToCart(name) {
  const cart = getCart()
  const existing = cart.find((item) => item.name === name)
  if (existing) {
    existing.qty += 1
  } else {
    cart.push({ name, qty: 1 })
  }
  saveCart(cart)
}

export function removeFromCart(name) {
  const cart = getCart().filter((item) => item.name !== name)
  saveCart(cart)
}

export function setQuantity(name, qty) {
  let cart = getCart()
  if (qty <= 0) {
    cart = cart.filter((item) => item.name !== name)
  } else {
    cart = cart.map((item) => (item.name === name ? { ...item, qty } : item))
  }
  saveCart(cart)
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0)
}

export function subscribeCart(callback) {
  window.addEventListener(EVENT, callback)
  return () => window.removeEventListener(EVENT, callback)
}