import { useState } from 'react'

export default function SearchBar({ onSearch, disabled }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSearch(trimmed)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <svg className="search-glyph" viewBox="0 0 20 20" width="18" height="18">
        <circle cx="9" cy="9" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <line x1="13.6" y1="13.6" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        placeholder="Search a city..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="City name"
        disabled={disabled}
      />
      <button type="submit" className="search-btn" disabled={disabled}>
        Search
      </button>
    </form>
  )
}
