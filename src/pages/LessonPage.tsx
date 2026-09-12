import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { lessonBySlug, nodeLessons } from '../data/nodeLessons'
import type { ProgressState } from '../types'

const lessonIndex = nodeLessons.reduce<Record<string, number>>(
  (acc, lesson, index) => {
    acc[lesson.slug] = index
    return acc
  },
  {},
)

type LessonPageProps = {
  progress: ProgressState
  markLessonComplete: (id: string) => void
  toggleBookmark: (id: string) => void
}

export function LessonPage({
  progress,
  markLessonComplete,
  toggleBookmark,
}: LessonPageProps) {
  const { slug } = useParams()
  const lesson = slug ? lessonBySlug[slug] : undefined

  if (!lesson) {
    return (
      <div className="page-content">
        <h1>Lesson not found</h1>
        <Link to="/learn">Back to learning</Link>
      </div>
    )
  }

  const index = lessonIndex[lesson.slug] ?? 0
  const prevLesson = nodeLessons[index - 1]
  const nextLesson = nodeLessons[index + 1]

  return (
    <div className="page-content lesson-page">
      <div className="breadcrumb">
        Node.js → {lesson.section} → {lesson.title}
      </div>
      <div className="lesson-header-row">
        <div>
          <p className="eyebrow">{lesson.section}</p>
          <h1>{lesson.title}</h1>
          <p className="lead">{lesson.description}</p>
        </div>
        <button
          type="button"
          className="icon-button bookmark-button"
          onClick={() => toggleBookmark(lesson.id)}
          aria-label="Bookmark lesson"
        >
          {progress.bookmarks.includes(lesson.id) ? (
            <BookmarkCheck size={18} />
          ) : (
            <Bookmark size={18} />
          )}
        </button>
      </div>

      {lesson.sections.map((section) => (
        <section key={section.heading} className="lesson-section">
          <h2>{section.heading}</h2>
          {section.explanation.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {section.code && (
            <pre className="code-block">
              <code>{section.code}</code>
            </pre>
          )}

          {section.output && (
            <div className="output-box">
              <span>Expected output</span>
              <pre>{section.output}</pre>
            </div>
          )}

          {section.note && (
            <div className="callout note">
              <strong>Important note:</strong> {section.note}
            </div>
          )}

          {section.interviewQuestion && (
            <div className="callout info">
              <strong>Interview question:</strong> {section.interviewQuestion}
            </div>
          )}

          {section.misconception && (
            <div className="callout warning">
              <strong>Common misconception:</strong> {section.misconception}
            </div>
          )}

          {section.practiceQuestion && (
            <div className="callout success">
              <strong>Practice question:</strong> {section.practiceQuestion}
            </div>
          )}
        </section>
      ))}

      <div className="lesson-nav">
        {prevLesson ? (
          <Link
            to={`/learn/node/${prevLesson.slug}`}
            className="secondary-button"
          >
            <ArrowLeft size={16} /> Previous
          </Link>
        ) : (
          <span />
        )}
        <button
          type="button"
          className="primary-button"
          onClick={() => markLessonComplete(lesson.id)}
        >
          Mark complete
        </button>
        {nextLesson ? (
          <Link
            to={`/learn/node/${nextLesson.slug}`}
            className="primary-button"
          >
            Next <ArrowRight size={16} />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  )
}
