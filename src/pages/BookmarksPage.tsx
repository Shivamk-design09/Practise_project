import { Link } from 'react-router-dom'
import { learningLessons, lessonPath } from '../data/nodeLessons'
import type { ProgressState } from '../types'

type BookmarksPageProps = {
  progress: ProgressState
  toggleBookmark: (id: string) => void
}

export function BookmarksPage({
  progress,
  toggleBookmark,
}: BookmarksPageProps) {
  const bookmarks = learningLessons.filter((lesson) =>
    progress.bookmarks.includes(lesson.id),
  )

  return (
    <div className="page-content">
      <h1>Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks saved yet.</p>
      ) : (
        <div className="lesson-grid">
          {bookmarks.map((lesson) => (
            <div key={lesson.id} className="lesson-card">
              <div className="lesson-card-top">
                <span className="small-label">{lesson.section}</span>
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => toggleBookmark(lesson.id)}
                  aria-label="Remove bookmark"
                >
                  ✕
                </button>
              </div>
              <Link to={lessonPath(lesson)}>
                <h3>{lesson.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
