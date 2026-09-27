import { CodePlayground } from '../components/ui/CodePlayground'
import type { InteractiveLabDefinition } from '../types'

type CodePracticePageProps = {
  exercise?: InteractiveLabDefinition
}

export function CodePracticePage({ exercise }: CodePracticePageProps) {
  return (
    <div className="page-content">
      <CodePlayground exercise={exercise} />
    </div>
  )
}
