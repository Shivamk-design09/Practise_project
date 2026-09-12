import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CodePlayground } from '../components/ui/CodePlayground'
import { nodeLessons } from '../data/nodeLessons'
import type { ProgressState } from '../types'

type HomeProps = {
  progress: ProgressState
}

export function Home({ progress }: HomeProps) {
  const totalLessons = nodeLessons.length
  const completedCount = progress.completedLessons.length

  const dashboardRows = [
    [
      'Node.js Fundamentals',
      Math.min(100, Math.round((completedCount / totalLessons) * 100)),
    ],
    ['Async JavaScript', completedCount > 0 ? 65 : 0],
    ['Event Loop', completedCount > 1 ? 40 : 0],
    ['Node Internals', completedCount > 2 ? 20 : 0],
    ['HTTP', completedCount > 3 ? 30 : 0],
  ]

  return (
    <div className="page-content">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Node.js learning platform</p>
          <h1>Master Node.js from the Inside Out</h1>
          <p className="lead">
            Learn Node.js fundamentals, understand the runtime under the hood,
            visualize the event loop, and prepare for backend interviews.
          </p>
          <div className="hero-actions">
            <Link to="/learn/node/what-is-nodejs" className="primary-button">
              Start Learning <ArrowRight size={16} />
            </Link>
            <Link to="/practice/node" className="secondary-button">
              Practice Questions
            </Link>
          </div>
        </div>
      </section>

      <section className="panel-section">
        <h2>Your Progress</h2>
        <div className="progress-list">
          {dashboardRows.map(([label, value]) => (
            <div key={label} className="progress-row">
              <div className="progress-label-row">
                <span>{label}</span>
                <span>{value}%</span>
              </div>
              <div className="progress-track">
                <span style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <CodePlayground />

      <section className="panel-section">
        <h2>Continue Learning</h2>
        <div className="continue-card">
          <div>
            <p className="small-label">Next lesson</p>
            <h3>
              {progress.completedLessons.length > 0
                ? 'Continue learning'
                : 'What is Node.js?'}
            </h3>
          </div>
          <Link
            to={
              progress.completedLessons.length > 0
                ? '/learn/node/what-is-nodejs'
                : '/learn/node/what-is-nodejs'
            }
            className="inline-link"
          >
            Continue →
          </Link>
        </div>
      </section>

      <section className="panel-section">
        <h2>Learning Roadmap</h2>
        <div className="roadmap-mini">
          {[
            'JavaScript',
            'Node.js Basics',
            'Async JavaScript',
            'Event Loop',
            'Node Internals',
            'HTTP',
            'Express',
            'Databases',
            'System Design',
          ].map((step, index) => (
            <div key={step} className="roadmap-step">
              <span className={index <= 3 ? 'active' : ''}>{step}</span>
              {index < 8 && <div className="roadmap-arrow">↓</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
