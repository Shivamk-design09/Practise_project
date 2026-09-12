import { Link } from 'react-router-dom'
import { nodeQuestions } from '../data/nodeQuestions'

export function PracticePage() {
  return (
    <div className="page-content">
      <div className="page-head-row">
        <div>
          <p className="eyebrow">Practice</p>
          <h1>Node.js Interview Practice</h1>
        </div>
        <div className="filter-row">
          <span>Difficulty: Easy</span>
          <span>Topic: All</span>
        </div>
      </div>

      <div className="question-grid">
        {nodeQuestions.map((question) => (
          <Link
            to={`/practice/node/question/${question.id}`}
            key={question.id}
            className="question-card"
          >
            <div className="question-card-top">
              <span className="difficulty-badge difficulty-easy">
                {question.difficulty}
              </span>
              <span className="small-label">{question.topic}</span>
            </div>
            <h3>{question.title}</h3>
            <p>{question.question}</p>
            <div className="question-progress">3/10 completed</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
