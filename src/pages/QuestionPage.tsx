import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { nodeQuestions } from '../data/nodeQuestions'

export function QuestionPage() {
  const { id } = useParams()
  const question = nodeQuestions.find((item) => item.id === id)
  const [revealed, setRevealed] = useState(false)

  if (!question) {
    return (
      <div className="page-content">
        <h1>Question not found</h1>
        <Link to="/practice/node">Back to practice</Link>
      </div>
    )
  }

  return (
    <div className="page-content question-page">
      <p className="eyebrow">{question.topic}</p>
      <h1>{question.title}</h1>
      <p className="lead">{question.question}</p>

      <div className="question-box">
        <h3>Think about it</h3>
        <button
          type="button"
          className="primary-button"
          onClick={() => setRevealed(true)}
        >
          Show Answer
        </button>
      </div>

      {revealed && (
        <div className="answer-panel">
          <h3>Short Answer</h3>
          <p>{question.answer}</p>
          <h3>Deep Explanation</h3>
          <p>{question.explanation}</p>
          {question.code && (
            <pre className="code-block">
              <code>{question.code}</code>
            </pre>
          )}
          <h3>Interview Tip</h3>
          <p>
            Be precise about the runtime difference and the specific event loop
            behavior involved.
          </p>
        </div>
      )}
    </div>
  )
}
