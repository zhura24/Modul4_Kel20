import { useMemo, useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

const TYPES = ['All', ...new Set(GUNS.map((gun) => gun.type))]

function Catalog() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('All')
  const [sortField, setSortField] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  function toggleSort(field) {
    if (sortField !== field) {
      setSortField(field)
      setSortDir('asc')
    } else {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    }
  }

  const filtered = useMemo(() => {
    let list = GUNS.filter((gun) => gun.name.toLowerCase().includes(search.toLowerCase()))
    if (type !== 'All') {
      list = list.filter((gun) => gun.type === type)
    }
    if (sortField) {
      list = [...list].sort((a, b) => {
        if (sortField === 'name') {
          return sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        }
        return sortDir === 'asc' ? a.price - b.price : b.price - a.price
      })
    }
    return list
  }, [search, type, sortField, sortDir])

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section className="toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Cari nama senjata..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="type-select" value={type} onChange={(e) => setType(e.target.value)}>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button
          type="button"
          className={sortField === 'name' ? 'sort-btn active' : 'sort-btn'}
          onClick={() => toggleSort('name')}
        >
          Name {sortField === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
        </button>

        <button
          type="button"
          className={sortField === 'price' ? 'sort-btn active' : 'sort-btn'}
          onClick={() => toggleSort('price')}
        >
          Price {sortField === 'price' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
        </button>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{filtered.length} pieces</span>
        </div>
        <ul className="stock">
          {filtered.map((gun) => (
            <GunCard key={gun.name} gun={gun} />
          ))}
        </ul>
      </section>
    </>
  )
}

export default Catalog