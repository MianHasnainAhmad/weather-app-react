import { useState, useEffect, useCallback } from 'react'
import SearchBar from './components/SearchBar.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import LoadingState from './components/LoadingState.jsx'
import ErrorState from './components/ErrorState.jsx'
import { getWeatherForCity, CityNotFoundError } from './utils/weatherApi.js'
import './App.css'

const STORAGE_KEY = 'windrose.lastCity'
const SUGGESTIONS = ['Karachi', 'Islamabad', 'London', 'Tokyo', 'New York']

export default function App() {
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const runSearch = useCallback(async (city) => {
    setStatus('loading')
    setErrorMessage('')
    try {
      const result = await getWeatherForCity(city)
      setWeather(result)
      setStatus('success')
      localStorage.setItem(STORAGE_KEY, result.city)
    } catch (err) {
      setWeather(null)
      setStatus('error')
      if (err instanceof CityNotFoundError) {
        setErrorMessage(`We couldn't find "${city}". Check the spelling and try again.`)
      } else {
        setErrorMessage('Something went wrong reaching the weather service. Please try again.')
      }
    }
  }, [])

  // Auto-load the last searched city on first visit, if any.
  useEffect(() => {
    const lastCity = localStorage.getItem(STORAGE_KEY)
    if (lastCity) runSearch(lastCity)
  }, [runSearch])

  const backgroundClass = weather ? `bg-${weather.icon}` : 'bg-default'

  return (
    <div className={`page ${backgroundClass} ${weather && !weather.isDay ? 'page-night' : ''}`}>
      <div className="app-shell">
        <header className="app-header">
          <h1>Windrose</h1>
          <p className="app-tagline">Search any city for live conditions</p>
        </header>

        <SearchBar onSearch={runSearch} disabled={status === 'loading'} />

        <div className="result-area">
          {status === 'loading' && <LoadingState />}
          {status === 'error' && <ErrorState message={errorMessage} />}
          {status === 'success' && weather && <WeatherCard weather={weather} />}

          {status === 'idle' && (
            <div className="suggestions">
              <p className="suggestions-label">Try a city</p>
              <div className="suggestion-chips">
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="chip" onClick={() => runSearch(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
