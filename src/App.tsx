import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Learn } from './pages/Learn'
import { LessonPage } from './pages/LessonPage'
import { PracticePage } from './pages/PracticePage'
import { QuestionPage } from './pages/QuestionPage'
import { InterviewPage } from './pages/InterviewPage'
import { ProgressPage } from './pages/ProgressPage'
import { BookmarksPage } from './pages/BookmarksPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { CodePracticePage } from './pages/CodePracticePage'
import { useProgress } from './hooks/useProgress'
import { javascriptLessons } from './data/javascriptLessons'
import './index.css'

function App() {
  const progressState = useProgress()

  return (
    <BrowserRouter>
      <AppShell progressState={progressState} />
    </BrowserRouter>
  )
}

type AppShellProps = {
  progressState: ReturnType<typeof useProgress>
}

function AppShell({ progressState }: AppShellProps) {
  return (
    <>
      <Layout
        progress={progressState.progress}
        toggleBookmark={progressState.toggleBookmark}
      >
        <Routes>
          <Route
            path="/"
            element={<Home progress={progressState.progress} />}
          />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/node" element={<Learn />} />
          <Route
            path="/learn/:technology/:slug"
            element={
              <LessonPage
                progress={progressState.progress}
                markLessonComplete={progressState.markLessonComplete}
                toggleBookmark={progressState.toggleBookmark}
              />
            }
          />
          <Route
            path="/learn/node/event-loop/visualizer"
            element={<VisualizerPlaceholder />}
          />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice/node" element={<PracticePage />} />
          <Route
            path="/practice/javascript"
            element={
              <CodePracticePage
                exercise={javascriptLessons.find((lesson) => lesson.lab)?.lab}
              />
            }
          />
          <Route path="/practice/code" element={<CodePracticePage />} />
          <Route
            path="/practice/node/question/:id"
            element={<QuestionPage />}
          />
          <Route path="/interview/node" element={<InterviewPage />} />
          <Route path="/roadmap/node" element={<RoadmapPage />} />
          <Route
            path="/progress"
            element={<ProgressPage progress={progressState.progress} />}
          />
          <Route
            path="/bookmarks"
            element={
              <BookmarksPage
                progress={progressState.progress}
                toggleBookmark={progressState.toggleBookmark}
              />
            }
          />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Layout>
    </>
  )
}

function VisualizerPlaceholder() {
  return (
    <div className="page-content">
      <h1>Event Loop Visualizer</h1>
      <p className="lead">
        This interactive visualizer is ready for the next iteration of the
        learning experience.
      </p>
    </div>
  )
}

export default App
