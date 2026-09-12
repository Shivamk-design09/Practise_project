import { nodeRoadmap } from '../data/roadmap'

export function RoadmapPage() {
  return (
    <div className="page-content">
      <h1>Node.js Roadmap</h1>
      <div className="roadmap-list">
        {nodeRoadmap.map((step) => (
          <div key={step.level} className="roadmap-card">
            <div className="roadmap-header">
              <span>LEVEL {step.level}</span>
              <span>{step.progress}%</span>
            </div>
            <h3>{step.title}</h3>
            <ul>
              {step.lessons.map((lesson) => (
                <li key={lesson}>{lesson}</li>
              ))}
            </ul>
            <p>Prerequisites: {step.prerequisites.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
