import { useEffect, useMemo, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { format } from 'prettier/standalone'
import babelParser from 'prettier/plugins/babel'
import type { InteractiveLabDefinition } from '../../types'

const JS_SNIPPET = `const a = 10;
const b = 20;

function multiply(x, y) {
  return x * y;
}

console.log(multiply(a, b));
`

const NODE_SNIPPET = `console.log('Node.js runtime:', process.version);

setTimeout(() => {
  console.log('timer callback');
}, 100);
`

type RuntimeMode = 'js' | 'node'
type ExecutionResult = {
  stdout: string
  stderr: string
  exitCode: number | null
  executionTime: number
  timedOut: boolean
  executionMode: 'docker' | 'local-development'
}

type HistoryItem = {
  id: string
  title: string
  code: string
  createdAt: number
}

type CodePlaygroundProps = {
  exercise?: InteractiveLabDefinition
}

const HISTORY_KEY = 'backend-lab-execution-history'

export function CodePlayground({ exercise }: CodePlaygroundProps) {
  const [mode, setMode] = useState<RuntimeMode>('js')
  const [code, setCode] = useState(exercise?.starterCode ?? JS_SNIPPET)
  const [result, setResult] = useState<ExecutionResult | null>(null)
  const [requestError, setRequestError] = useState('')
  const [running, setRunning] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [controller, setController] = useState<AbortController | null>(null)
  const [visibleHintCount, setVisibleHintCount] = useState(0)
  const [solutionVisible, setSolutionVisible] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<boolean | null>(null)

  const activeSnippet = useMemo(
    () => exercise?.starterCode ?? (mode === 'js' ? JS_SNIPPET : NODE_SNIPPET),
    [exercise, mode],
  )

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY)
      if (saved) setHistory(JSON.parse(saved))
    } catch {
      setHistory([])
    }
  }, [])

  const saveHistory = (nextHistory: HistoryItem[]) => {
    setHistory(nextHistory)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory.slice(0, 10)))
  }

  const runCode = async (): Promise<ExecutionResult | null> => {
    const nextController = new AbortController()
    setController(nextController)
    setRunning(true)
    setRequestError('')
    setResult(null)
    setSubmissionResult(null)

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code, language: 'node' }),
        signal: nextController.signal,
      })
      const responseText = await response.text()
      let payload: { error?: string } & Partial<ExecutionResult>
      try {
        payload = JSON.parse(responseText)
      } catch {
        throw new Error(
          response.ok
            ? 'The execution API returned an invalid response.'
            : `Execution API returned HTTP ${response.status}: ${responseText || 'No response body. Is the API running?'}`,
        )
      }
      if (!response.ok) throw new Error(payload.error || 'Execution failed.')

      const executionResult = payload as ExecutionResult
      setResult(executionResult)
      const item: HistoryItem = {
        id: crypto.randomUUID(),
        title:
          code
            .split('\n')
            .find((line) => line.trim())
            ?.trim() || 'Node.js execution',
        code,
        createdAt: Date.now(),
      }
      saveHistory([item, ...history.filter((entry) => entry.code !== code)])
      return executionResult
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError')
        return null
      setRequestError(error instanceof Error ? error.message : String(error))
      return null
    } finally {
      setRunning(false)
      setController(null)
    }
  }

  const stopCode = () => controller?.abort()

  const clearOutput = () => {
    setResult(null)
    setRequestError('')
    setSubmissionResult(null)
  }

  const submitExercise = async () => {
    if (!exercise) return
    const executionResult = await runCode()
    if (!executionResult) return

    const actualOutput = executionResult.stdout.replace(/\r\n/g, '\n').trim()
    const expectedOutput = exercise.expectedOutput.replace(/\r\n/g, '\n').trim()
    setSubmissionResult(
      executionResult.exitCode === 0 &&
        !executionResult.stderr &&
        actualOutput === expectedOutput,
    )
  }

  const revealHint = () => {
    setVisibleHintCount((count) =>
      Math.min(exercise?.hints.length ?? 0, count + 1),
    )
  }

  const formatCode = async () => {
    try {
      setCode(await format(code, { parser: 'babel', plugins: [babelParser] }))
      setRequestError('')
      setSubmissionResult(null)
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : String(error))
    }
  }

  const resetCode = () => {
    setCode(activeSnippet)
    setVisibleHintCount(0)
    setSolutionVisible(false)
    clearOutput()
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setRequestError('Code copied to clipboard.')
    } catch {
      setRequestError('Clipboard access is unavailable in this browser.')
    }
  }

  const switchMode = (nextMode: RuntimeMode) => {
    setMode(nextMode)
    setCode(nextMode === 'js' ? JS_SNIPPET : NODE_SNIPPET)
    clearOutput()
  }

  return (
    <div className="playground-shell">
      <div className="playground-header">
        <div className="playground-title-group">
          <p className="eyebrow">
            {exercise ? 'Interactive JavaScript lab' : 'Node.js Playground'}
          </p>
          <h2>{exercise?.title ?? 'Run real Node.js code'}</h2>
        </div>
        {!exercise && (
          <div className="mode-toggle" aria-label="Execution mode selector">
            <button
              type="button"
              className={mode === 'js' ? 'mode-button active' : 'mode-button'}
              onClick={() => switchMode('js')}
            >
              JavaScript
            </button>
            <button
              type="button"
              className={mode === 'node' ? 'mode-button active' : 'mode-button'}
              onClick={() => switchMode('node')}
            >
              Node.js
            </button>
          </div>
        )}
      </div>

      <div className="playground-card">
        {exercise && (
          <div className="lab-brief">
            <p>{exercise.objective}</p>
            <div>
              <strong>Expected output</strong>
              <pre>{exercise.expectedOutput}</pre>
            </div>
          </div>
        )}

        <div className="playground-toolbar">
          <span className="demo-badge">
            {exercise
              ? 'JavaScript · isolated Node.js sandbox'
              : result?.executionMode === 'local-development'
                ? 'Local execution mode · development only'
                : 'Docker sandbox · Node.js runtime'}
          </span>
          <div className="toolbar-actions">
            <button
              type="button"
              className="secondary-button small"
              onClick={running ? stopCode : runCode}
            >
              {running ? 'Stop' : 'Run'}
            </button>
            {exercise && (
              <button
                type="button"
                className="primary-button small"
                onClick={submitExercise}
                disabled={running}
              >
                Submit
              </button>
            )}
            <button
              type="button"
              className="secondary-button small"
              onClick={clearOutput}
            >
              Clear
            </button>
            <button
              type="button"
              className="secondary-button small"
              onClick={resetCode}
            >
              Reset
            </button>
            <button
              type="button"
              className="secondary-button small"
              onClick={copyCode}
            >
              Copy
            </button>
            <button
              type="button"
              className="secondary-button small"
              onClick={formatCode}
            >
              Format
            </button>
          </div>
        </div>

        <CodeMirror
          value={code}
          height="300px"
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => {
            setCode(value)
            setSubmissionResult(null)
          }}
          theme="dark"
          aria-label="Code editor"
        />

        {exercise && (
          <div className="lab-controls">
            <div className="toolbar-actions">
              <button
                type="button"
                className="secondary-button small"
                onClick={revealHint}
                disabled={visibleHintCount >= exercise.hints.length}
              >
                Hint ({visibleHintCount}/{exercise.hints.length})
              </button>
              <button
                type="button"
                className="secondary-button small"
                onClick={() => setSolutionVisible((visible) => !visible)}
                aria-expanded={solutionVisible}
              >
                {solutionVisible ? 'Hide solution' : 'Show solution'}
              </button>
            </div>
            {visibleHintCount > 0 && (
              <ol className="lab-hints">
                {exercise.hints.slice(0, visibleHintCount).map((hint) => (
                  <li key={hint}>{hint}</li>
                ))}
              </ol>
            )}
            {submissionResult !== null && (
              <p
                className={
                  submissionResult
                    ? 'lab-feedback passed'
                    : 'lab-feedback not-passed'
                }
                role="status"
              >
                {submissionResult
                  ? 'Passed. Your output matches the expected result.'
                  : 'Not quite. Check the output and try again.'}
              </p>
            )}
            {solutionVisible && (
              <div className="lab-solution">
                <h3>Solution</h3>
                <pre>
                  <code>{exercise.solution}</code>
                </pre>
              </div>
            )}
          </div>
        )}

        {requestError && (
          <div className="error-panel">
            <div className="output-header">Request</div>
            <pre>{requestError}</pre>
          </div>
        )}

        <div className="output-panel">
          <div className="output-header">Output</div>
          <pre>
            {result?.stdout ||
              (running
                ? 'Running in isolated Node.js container...'
                : 'Run your code to see stdout.')}
          </pre>
        </div>

        {result?.stderr && (
          <div className="error-panel">
            <div className="output-header">Error</div>
            <pre>{result.stderr}</pre>
          </div>
        )}

        {result && (
          <div className="execution-meta">
            <span>Exit code: {result.exitCode ?? 'terminated'}</span>
            <span>Execution time: {result.executionTime}ms</span>
            {result.timedOut && <span>Timed out after 5 seconds</span>}
          </div>
        )}

        {history.length > 0 && (
          <div className="execution-history">
            <div className="output-header">History</div>
            {history.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setCode(item.code)}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
