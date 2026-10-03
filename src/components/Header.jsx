import { useEffect, useState } from 'react'
import InstallButton from './InstallButton.jsx'
import { getCartCount, subscribeCart } from '../utils/cart.js'

const NAV = ['Catalog', 'Favorites', 'Cart', 'About', 'Contact']

function Header({ tab, onTab }) {
  const [count, setCount] = useState(() => getCartCount())

  useEffect(() => {
    return subscribeCart(() => setCount(getCartCount()))
  }, [])

  return (
    <header className="header">
      <span className="brand display">Bore &amp; Barrel</span>
      <nav className="nav">
        {NAV.map((item) => (
          <button
            key={item}
            type="button"
            className={tab === item ? 'nav-link active' : 'nav-link'}
            onClick={() => onTab(item)}
          >
            {item}
            {item === 'Cart' && count > 0 && <span className="cart-badge">{count}</span>}
          </button>
        ))}
        <InstallButton />
      </nav>
    </header>
  )
}

export default Header