const ICONS = {
  sun: (
    <>
      <circle cx="32" cy="32" r="12" fill="var(--sun)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="32"
          y1="10"
          x2="32"
          y2="16"
          stroke="var(--sun)"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
    </>
  ),
  'sun-cloud': (
    <>
      <circle cx="24" cy="26" r="9" fill="var(--sun)" />
      <path
        d="M16 44a9 9 0 019-9c.6-4.8 4.7-8.5 9.6-8.5 5.4 0 9.7 4.3 9.7 9.6 0 .3 0 .6-.1.9A7.5 7.5 0 0143 44H16z"
        fill="var(--cloud)"
      />
    </>
  ),
  cloud: (
    <path
      d="M14 44a9.5 9.5 0 019.2-9.5c.5-5.4 5-9.6 10.5-9.6 5.9 0 10.6 4.7 10.6 10.5 0 .3 0 .7-.1 1A7.6 7.6 0 0143 44H14z"
      fill="var(--cloud)"
    />
  ),
  fog: (
    <>
      <path
        d="M16 30a9.5 9.5 0 019.2-8c.5-4.6 5-8.2 10.5-8.2 5.9 0 10.6 4 10.6 9 0 .2 0 .5-.1.8A6.7 6.7 0 0145 30H16z"
        fill="var(--cloud)"
        opacity="0.85"
      />
      {[36, 44, 52].map((y) => (
        <line
          key={y}
          x1="12"
          y1={y}
          x2="52"
          y2={y}
          stroke="var(--cloud)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
      ))}
    </>
  ),
  drizzle: (
    <>
      <path
        d="M14 30a9.5 9.5 0 019.2-9.5c.5-5.4 5-9.6 10.5-9.6 5.9 0 10.6 4.7 10.6 10.5 0 .3 0 .7-.1 1A7.6 7.6 0 0143 30H14z"
        fill="var(--cloud)"
      />
      {[20, 30, 40].map((x) => (
        <line
          key={x}
          x1={x}
          y1="36"
          x2={x - 3}
          y2="46"
          stroke="var(--rain)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
    </>
  ),
  rain: (
    <>
      <path
        d="M14 28a9.5 9.5 0 019.2-9.5c.5-5.4 5-9.6 10.5-9.6 5.9 0 10.6 4.7 10.6 10.5 0 .3 0 .7-.1 1A7.6 7.6 0 0143 28H14z"
        fill="var(--cloud)"
      />
      {[18, 27, 36, 45].map((x, i) => (
        <line
          key={x}
          x1={x}
          y1="34"
          x2={x - 4}
          y2={i % 2 === 0 ? '50' : '46'}
          stroke="var(--rain)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
    </>
  ),
  snow: (
    <>
      <path
        d="M14 26a9.5 9.5 0 019.2-9.5c.5-5.4 5-9.6 10.5-9.6 5.9 0 10.6 4.7 10.6 10.5 0 .3 0 .7-.1 1A7.6 7.6 0 0143 26H14z"
        fill="var(--cloud)"
      />
      {[19, 28, 37, 46].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={i % 2 === 0 ? 40 : 46}
          r="2.2"
          fill="var(--snow)"
        />
      ))}
    </>
  ),
  storm: (
    <>
      <path
        d="M14 26a9.5 9.5 0 019.2-9.5c.5-5.4 5-9.6 10.5-9.6 5.9 0 10.6 4.7 10.6 10.5 0 .3 0 .7-.1 1A7.6 7.6 0 0143 26H14z"
        fill="var(--cloud)"
      />
      <path
        d="M31 30l-7 12h6l-3 10 10-14h-6l4-8z"
        fill="var(--sun)"
        stroke="var(--sun)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </>
  ),
}

export default function WeatherIcon({ type = 'cloud', size = 64 }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className="weather-icon"
      role="img"
      aria-label={type}
    >
      {ICONS[type] ?? ICONS.cloud}
    </svg>
  )
}
