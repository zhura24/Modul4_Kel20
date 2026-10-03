import { useEffect, useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'
import { getFavorites, subscribeFavorites } from '../utils/favorites.js'

function Favorites() {
  const [names, setNames] = useState(() => getFavorites())

  useEffect(() => {
    return subscribeFavorites(() => setNames(getFavorites()))
  }, [])

  const favoriteGuns = GUNS.filter((gun) => names.includes(gun.name))

  return (
    <section>
      <div className="list-head">
        <h2>Favorites</h2>
        <span className="count">{favoriteGuns.length} pieces</span>
      </div>
      {favoriteGuns.length === 0 ? (
        <p className="lede">
          Belum ada senjata yang ditandai favorit. Data ini tersimpan langsung di perangkat
          sehingga tetap muncul walaupun aplikasi dibuka dalam kondisi offline.
        </p>
      ) : (
        <ul className="stock">
          {favoriteGuns.map((gun) => (
            <GunCard key={gun.name} gun={gun} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default Favorites