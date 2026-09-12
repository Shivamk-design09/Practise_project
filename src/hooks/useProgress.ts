import { useEffect, useState } from 'react'
import type { ProgressState } from '../types'

const STORAGE_KEY = 'backend-lab-progress'

const defaultState: ProgressState = {
  completedLessons: [],
  solvedQuestions: [],
  bookmarks: [],
  quizScores: {},
  currentLesson: 'what-is-event-loop',
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState

    try {
      return { ...defaultState, ...JSON.parse(raw) }
    } catch {
      return defaultState
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const toggleBookmark = (id: string) => {
    setProgress((prev) => ({
      ...prev,
      bookmarks: prev.bookmarks.includes(id)
        ? prev.bookmarks.filter((bookmark) => bookmark !== id)
        : [...prev.bookmarks, id],
    }))
  }

  const markLessonComplete = (id: string) => {
    setProgress((prev) => ({
      ...prev,
      currentLesson: id,
      completedLessons: prev.completedLessons.includes(id)
        ? prev.completedLessons
        : [...prev.completedLessons, id],
    }))
  }

  return { progress, setProgress, toggleBookmark, markLessonComplete }
}
