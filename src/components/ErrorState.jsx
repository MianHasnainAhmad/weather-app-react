export default function ErrorState({ message }) {
  return (
    <div className="status-state error-state" role="alert">
      <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
        <circle cx="20" cy="20" r="17" fill="none" stroke="var(--storm)" strokeWidth="2.2" />
        <line x1="20" y1="12" x2="20" y2="22" stroke="var(--storm)" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="20" cy="28" r="1.6" fill="var(--storm)" />
      </svg>
      <p className="error-title">City not found</p>
      <p className="error-hint">{message}</p>
    </div>
  )
}
