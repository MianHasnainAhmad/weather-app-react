// Open-Meteo: free, no API key required, CORS-enabled.
// Docs: https://open-meteo.com/en/docs / https://open-meteo.com/en/docs/geocoding-api

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

// WMO Weather interpretation codes -> human label + icon key
const WEATHER_CODE_MAP = {
  0: { label: 'Clear sky', icon: 'sun' },
  1: { label: 'Mainly clear', icon: 'sun-cloud' },
  2: { label: 'Partly cloudy', icon: 'sun-cloud' },
  3: { label: 'Overcast', icon: 'cloud' },
  45: { label: 'Fog', icon: 'fog' },
  48: { label: 'Depositing rime fog', icon: 'fog' },
  51: { label: 'Light drizzle', icon: 'drizzle' },
  53: { label: 'Moderate drizzle', icon: 'drizzle' },
  55: { label: 'Dense drizzle', icon: 'drizzle' },
  56: { label: 'Freezing drizzle', icon: 'drizzle' },
  57: { label: 'Freezing drizzle', icon: 'drizzle' },
  61: { label: 'Slight rain', icon: 'rain' },
  63: { label: 'Moderate rain', icon: 'rain' },
  65: { label: 'Heavy rain', icon: 'rain' },
  66: { label: 'Freezing rain', icon: 'rain' },
  67: { label: 'Freezing rain', icon: 'rain' },
  71: { label: 'Slight snow fall', icon: 'snow' },
  73: { label: 'Moderate snow fall', icon: 'snow' },
  75: { label: 'Heavy snow fall', icon: 'snow' },
  77: { label: 'Snow grains', icon: 'snow' },
  80: { label: 'Slight rain showers', icon: 'rain' },
  81: { label: 'Moderate rain showers', icon: 'rain' },
  82: { label: 'Violent rain showers', icon: 'rain' },
  85: { label: 'Slight snow showers', icon: 'snow' },
  86: { label: 'Heavy snow showers', icon: 'snow' },
  95: { label: 'Thunderstorm', icon: 'storm' },
  96: { label: 'Thunderstorm with hail', icon: 'storm' },
  99: { label: 'Thunderstorm with hail', icon: 'storm' },
}

export function describeWeatherCode(code) {
  return WEATHER_CODE_MAP[code] ?? { label: 'Unknown', icon: 'cloud' }
}

export class CityNotFoundError extends Error {
  constructor(city) {
    super(`No results found for "${city}"`)
    this.name = 'CityNotFoundError'
  }
}

/**
 * Looks up a city name and returns { name, country, latitude, longitude }.
 * Throws CityNotFoundError if nothing matches.
 */
export async function geocodeCity(city) {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Geocoding request failed')

  const data = await res.json()
  if (!data.results || data.results.length === 0) {
    throw new CityNotFoundError(city)
  }

  const { name, country, latitude, longitude, admin1 } = data.results[0]
  return { name, country, admin1, latitude, longitude }
}

/**
 * Fetches current weather for a lat/lon pair.
 * Returns { temperature, feelsLike, humidity, windSpeed, code, isDay }
 */
export async function fetchCurrentWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'wind_speed_10m',
      'weather_code',
      'is_day',
    ].join(','),
    timezone: 'auto',
  })

  const res = await fetch(`${FORECAST_URL}?${params.toString()}`)
  if (!res.ok) throw new Error('Weather request failed')

  const data = await res.json()
  const c = data.current

  return {
    temperature: Math.round(c.temperature_2m),
    feelsLike: Math.round(c.apparent_temperature),
    humidity: Math.round(c.relative_humidity_2m),
    windSpeed: Math.round(c.wind_speed_10m),
    code: c.weather_code,
    isDay: c.is_day === 1,
  }
}

/**
 * Combined helper: city name -> full weather payload for the UI.
 */
export async function getWeatherForCity(city) {
  const place = await geocodeCity(city)
  const weather = await fetchCurrentWeather(place.latitude, place.longitude)
  const condition = describeWeatherCode(weather.code)

  return {
    city: place.name,
    region: place.admin1,
    country: place.country,
    ...weather,
    conditionLabel: condition.label,
    icon: condition.icon,
  }
}
