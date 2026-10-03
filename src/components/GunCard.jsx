import { useRef, useState } from 'react'
import { isFavorite, toggleFavorite } from '../utils/favorites.js'
import { addToCart } from '../utils/cart.js'

function GunCard({ gun }) {
  const popup = useRef(null)
  const [fav, setFav] = useState(() => isFavorite(gun.name))

  function handleFavorite(e) {
    e.stopPropagation()
    toggleFavorite(gun.name)
    setFav((prev) => !prev)
  }

  function handleAddToCart(e) {
    e.stopPropagation()
    addToCart(gun.name)
  }

  return (
    <li className="card">
      <button
        type="button"
        className={fav ? 'fav-btn active' : 'fav-btn'}
        onClick={handleFavorite}
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
      >
        {fav ? '★' : '☆'}
      </button>

      <button className="card-btn" onClick={() => popup.current.showModal()}>
        <img className="card-img" src={gun.image} alt="" width="120" height="90" />
        <span className="name display">{gun.name}</span>
        <span className="type">
          {gun.type} · {gun.caliber}
        </span>
        <span className="price">${gun.price.toLocaleString()}</span>
      </button>

      <button type="button" className="cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>

      <dialog
        className="popup"
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <img className="popup-img" src={gun.image} alt="" width="240" height="180" />
        <h3 className="display">{gun.name}</h3>
        <p className="type">
          {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
        </p>
        <p>{gun.description}</p>
        <form method="dialog">
          <button className="popup-close">Close</button>
        </form>
      </dialog>
    </li>
  )
}

export default GunCard