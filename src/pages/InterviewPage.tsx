import { useState } from 'react'
import { nodeQuestions } from '../data/nodeQuestions'

export function InterviewPage() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    'easy',
  )
  const [count, setCount] = useState(5)
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)

  const allQuestions = nodeQuestions
    .filter((question) => question.difficulty === difficulty)
    .slice(0, count)

  const currentQuestion = allQuestions[current]

  const submitAnswer = (index: number) => {
    if (!currentQuestion) return
    if (index === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1)
    }
    setCurrent((prev) => prev + 1)
  }

  return (
    <div className="page-content">
      <h1>Node.js Interview Simulator</h1>
      {!started ? (
        <div className="interview-config">
          <div>
            <label>Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')
              }
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label>Number of questions</label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <button
            type="button"
            className="primary-button"
            onClick={() => setStarted(true)}
          >
            Start
          </button>
        </div>
      ) : currentQuestion ? (
        <div className="quiz-panel">
          <p className="small-label">
            Question {current + 1} of {allQuestions.length}
          </p>
          <h2>{currentQuestion.question}</h2>
          <div className="quiz-options">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={option}
                type="button"
                className="quiz-option"
                onClick={() => submitAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="panel-section">
          <h2>Simulation complete</h2>
          <p>
            Score: {score} / {allQuestions.length}
          </p>
          <p>
            Accuracy:{' '}
            {Math.round((score / Math.max(allQuestions.length, 1)) * 100)}%
          </p>
        </div>
      )}
    </div>
  )
}
