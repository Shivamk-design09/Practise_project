import type { ProgressState } from '../types'

type ProgressPageProps = {
  progress: ProgressState
}

export function ProgressPage({ progress }: ProgressPageProps) {
  return (
    <div className="page-content">
      <h1>Progress</h1>
      <div className="progress-grid">
        <div className="panel-section">
          <h2>Overall progress</h2>
          <div className="big-progress">
            {Math.min(
              80,
              Math.round((progress.completedLessons.length / 25) * 100),
            )}
            %
          </div>
        </div>
        <div className="panel-section">
          <h2>Interview Questions</h2>
          <p>{progress.solvedQuestions.length} solved</p>
        </div>
        <div className="panel-section">
          <h2>Quiz Performance</h2>
          <p>{Object.keys(progress.quizScores).length} recorded attempts</p>
        </div>
      </div>
    </div>
  )
}
