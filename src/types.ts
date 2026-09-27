export type Lesson = {
  id: string
  slug: string
  technology?: string
  title: string
  category: string
  description: string
  section: string
  level: number
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'interview'
  prerequisites?: string[]
  concepts?: string[]
  progress: number
  toc: string[]
  references?: Array<{
    label: string
    url: string
  }>
  sections: Array<{
    heading: string
    explanation: string[]
    difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'interview'
    whyItMatters?: string
    realWorldExample?: string
    code?: string
    output?: string
    note?: string
    commonMistakes?: string[]
    bestPractices?: string[]
    practiceTask?: string
    interviewQuestion?: string
    misconception?: string
    practiceQuestion?: string
  }>
  lab?: InteractiveLabDefinition
}

export type InteractiveLabDefinition = {
  title: string
  objective: string
  starterCode: string
  expectedOutput: string
  solution: string
  hints: string[]
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
