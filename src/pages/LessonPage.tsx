import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { CodePlayground } from '../components/ui/CodePlayground'
import { learningLessons, lessonBySlug, lessonPath } from '../data/nodeLessons'
import type { ProgressState } from '../types'

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

  const courseLessons = learningLessons.filter(
    (item) => (item.technology ?? 'node') === (lesson.technology ?? 'node'),
  )
  const index = courseLessons.findIndex((item) => item.slug === lesson.slug)
  const prevLesson = courseLessons[index - 1]
  const nextLesson = courseLessons[index + 1]

  return (
    <div className="page-content lesson-page">
      <div className="breadcrumb">
        {lesson.technology ?? 'Node.js'} → {lesson.section} → {lesson.title}
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

      {lesson.sections.map((section, index) => (
        <section
          key={`${index}-${section.heading}`}
          id={`lesson-section-${index}`}
          className="lesson-section"
        >
          <h2>{section.heading}</h2>
          {section.explanation.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {section.whyItMatters && (
            <div className="lesson-detail">
              <h3>Why it matters</h3>
              <p>{section.whyItMatters}</p>
            </div>
          )}

          {section.realWorldExample && (
            <div className="lesson-detail">
              <h3>Real-world example</h3>
              <p>{section.realWorldExample}</p>
            </div>
          )}

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

          {section.commonMistakes && (
            <div className="lesson-detail">
              <h3>Common mistakes</h3>
              <ul>
                {section.commonMistakes.map((mistake) => (
                  <li key={mistake}>{mistake}</li>
                ))}
              </ul>
            </div>
          )}

          {section.bestPractices && (
            <div className="lesson-detail">
              <h3>Best practices</h3>
              <ul>
                {section.bestPractices.map((practice) => (
                  <li key={practice}>{practice}</li>
                ))}
              </ul>
            </div>
          )}

          {section.practiceTask && (
            <div className="callout success">
              <strong>Practice task:</strong> {section.practiceTask}
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

      {lesson.lab && <CodePlayground exercise={lesson.lab} />}

      {lesson.references?.length ? (
        <section className="lesson-section lesson-references">
          <h2>Official documentation</h2>
          <ul>
            {lesson.references.map((reference) => (
              <li key={reference.url}>
                <a href={reference.url} target="_blank" rel="noreferrer">
                  {reference.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="lesson-nav">
        {prevLesson ? (
          <Link to={lessonPath(prevLesson)} className="secondary-button">
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
          <Link to={lessonPath(nextLesson)} className="primary-button">
            Next <ArrowRight size={16} />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  )
}
