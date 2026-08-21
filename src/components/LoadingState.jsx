export default function LoadingState() {
  return (
    <div className="status-state loading-state" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true"></div>
      <p>Fetching weather...</p>
    </div>
  )
}
