import WeatherIcon from './WeatherIcon.jsx'

export default function WeatherCard({ weather }) {
  const { city, region, country, temperature, feelsLike, humidity, windSpeed, conditionLabel, icon, isDay } = weather

  const location = [city, region, country].filter(Boolean)
  // avoid "London, London, UK" when admin1 duplicates the city name
  const locationLabel =
    region && region !== city ? `${city}, ${country}` : `${city}, ${country}`

  return (
    <div className={`weather-card ${isDay ? 'is-day' : 'is-night'}`}>
      <div className="weather-card-top">
        <div>
          <h2 className="weather-city">{city}</h2>
          <p className="weather-location">
            {region && region !== city ? `${region}, ` : ''}
            {country}
          </p>
        </div>
        <WeatherIcon type={icon} size={68} />
      </div>

      <div className="weather-temp-row">
        <span className="weather-temp">{temperature}°</span>
        <span className="weather-condition">{conditionLabel}</span>
      </div>
      <p className="weather-feels-like">Feels like {feelsLike}°</p>

      <div className="weather-stats">
        <div className="weather-stat">
          <span className="stat-label">Humidity</span>
          <span className="stat-value">{humidity}%</span>
        </div>
        <div className="weather-stat">
          <span className="stat-label">Wind</span>
          <span className="stat-value">{windSpeed} km/h</span>
        </div>
      </div>
    </div>
  )
}
