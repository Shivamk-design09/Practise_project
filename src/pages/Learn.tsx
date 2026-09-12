import { Link } from 'react-router-dom'
import { nodeLessons } from '../data/nodeLessons'

export function Learn() {
  return (
    <div className="page-content">
      <h1>Node.js Learning Path</h1>
      <div className="lesson-grid">
        {nodeLessons.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/learn/node/${lesson.slug}`}
            className="lesson-card"
          >
            <div className="lesson-card-top">
              <span className="small-label">{lesson.section}</span>
              <span className="pct-badge">{lesson.progress}%</span>
            </div>
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
