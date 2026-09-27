import { Link } from 'react-router-dom'
import { learningLessons, lessonPath } from '../data/nodeLessons'

export function Learn() {
  return (
    <div className="page-content">
      <h1>Learning Paths</h1>
      <div className="lesson-grid">
        {learningLessons.map((lesson) => (
          <Link key={lesson.id} to={lessonPath(lesson)} className="lesson-card">
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
