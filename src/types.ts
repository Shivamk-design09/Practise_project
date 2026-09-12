export type Lesson = {
  id: string
  slug: string
  title: string
  category: string
  description: string
  section: string
  level: number
  progress: number
  toc: string[]
  sections: Array<{
    heading: string
    explanation: string[]
    code?: string
    output?: string
    note?: string
    interviewQuestion?: string
    misconception?: string
    practiceQuestion?: string
  }>
}

export type Question = {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  question: string
  answer: string
  explanation: string
  code?: string
  options?: string[]
  correctAnswer?: number
  related?: string[]
}

export type ProgressState = {
  completedLessons: string[]
  solvedQuestions: string[]
  bookmarks: string[]
  quizScores: Record<string, number>
  currentLesson: string
}
