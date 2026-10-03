import { useEffect, useState } from 'react'
import GUNS from '../data/guns.js'
import { getCart, setQuantity, removeFromCart, subscribeCart } from '../utils/cart.js'

function Cart() {
  const [items, setItems] = useState(() => getCart())

  useEffect(() => {
    return subscribeCart(() => setItems(getCart()))
  }, [])

  const rows = items
    .map((item) => {
      const gun = GUNS.find((g) => g.name === item.name)
      return gun ? { ...gun, qty: item.qty } : null
    })
    .filter(Boolean)

  const total = rows.reduce((sum, row) => sum + row.price * row.qty, 0)

  return (
    <section>
      <div className="list-head">
        <h2>Cart</h2>
        <span className="count">{rows.length} item</span>
      </div>

      {rows.length === 0 ? (
        <p className="lede">Keranjang masih kosong. Tambahkan senjata dari halaman Catalog.</p>
      ) : (
        <>
          <ul className="cart-list">
            {rows.map((row) => (
              <li key={row.name} className="cart-row">
                <img className="cart-img" src={row.image} alt="" />
                <div className="cart-info">
                  <span className="name display">{row.name}</span>
                  <span className="type">
                    {row.type} · {row.caliber}
                  </span>
                </div>
                <div className="cart-qty">
                  <button type="button" onClick={() => setQuantity(row.name, row.qty - 1)}>
                    −
                  </button>
                  <span>{row.qty}</span>
                  <button type="button" onClick={() => setQuantity(row.name, row.qty + 1)}>
                    +
                  </button>
                </div>
                <span className="price">${(row.price * row.qty).toLocaleString()}</span>
                <button
                  type="button"
                  className="cart-remove"
                  onClick={() => removeFromCart(row.name)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total</span>
            <span className="price">${total.toLocaleString()}</span>
          </div>
        </>
      )}
    </section>
  )
}

export default Cart