# Windrose — React Weather App

Task 10 · React weather application with live city search, built with functional components and hooks.

## Features

- Search weather by city name
- Displays city name, temperature, condition, humidity, wind speed, and a matching weather icon
- Loading state while a request is in flight
- Clear error message for invalid/unrecognized city names
- Remembers your last search (localStorage) and reloads it automatically next visit
- Background gradient + icon shift to match current conditions (sun, cloud, rain, snow, storm, fog) and day/night
- Fully responsive, glassmorphism UI

## Tech stack

- React 18 (functional components only)
- `useState`, `useEffect`, `useCallback` hooks
- Vite (build tool / dev server)
- Plain CSS (no framework)
- **Open-Meteo API** — no API key or signup required

## Why Open-Meteo instead of OpenWeatherMap?

Open-Meteo is free, requires no API key, and is CORS-enabled for direct browser calls — which matters here because this is a static frontend-only app. OpenWeatherMap needs a secret key that would otherwise sit exposed in the deployed frontend bundle, or require a backend proxy just to hide it. Open-Meteo has no such key to leak, so it's a better fit for a plain client-side React app.

The app does two calls per search:
1. **Geocoding** — `geocoding-api.open-meteo.com/v1/search?name={city}` turns the typed city name into a latitude/longitude (and resolves the "invalid city name" case if there are no results).
2. **Forecast** — `api.open-meteo.com/v1/forecast?...&current=...` fetches current temperature, humidity, wind speed, and a WMO weather code for those coordinates.

The WMO weather code (a number like `61` = rain, `71` = snow) is mapped to a human-readable label and an icon key in `src/utils/weatherApi.js`.

## Project structure

```
weather-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx      # city input + submit
│   │   ├── WeatherCard.jsx    # main results display
│   │   ├── WeatherIcon.jsx    # SVG icon set per condition
│   │   ├── LoadingState.jsx
│   │   └── ErrorState.jsx
│   ├── utils/
│   │   └── weatherApi.js      # geocoding + forecast fetch, WMO code mapping
│   ├── App.jsx                 # state management, orchestrates the search flow
│   ├── App.css
│   ├── index.css               # design tokens
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── netlify.toml
```

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`). No `.env` file or API key setup needed.

## Build for production

```bash
npm run build
```

Outputs a static site to `dist/`.

## Deploy to Netlify

1. Push this folder to a GitHub repository.
2. On [netlify.com](https://netlify.com) → **Add new site → Import an existing project** → pick the repo.
3. Netlify reads `netlify.toml` automatically (build command `npm run build`, publish directory `dist`).
4. Click **Deploy site**.

## Deploy to Vercel (alternative)

1. Push to GitHub, then import the repo at [vercel.com](https://vercel.com).
2. Framework preset: **Vite** (usually auto-detected). Build command `npm run build`, output directory `dist`.
3. Deploy.
