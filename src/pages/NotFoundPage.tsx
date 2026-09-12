import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="page-content not-found">
      <h1>404</h1>
      <p>This page is not available yet.</p>
      <Link to="/" className="primary-button">
        Return home
      </Link>
    </div>
  )
}
