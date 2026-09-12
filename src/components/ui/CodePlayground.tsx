import { useEffect, useMemo, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { format } from 'prettier/standalone'
import babelParser from 'prettier/plugins/babel'

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

const HISTORY_KEY = 'backend-lab-execution-history'

export function CodePlayground() {
  const [mode, setMode] = useState<RuntimeMode>('js')
  const [code, setCode] = useState(JS_SNIPPET)
  const [result, setResult] = useState<ExecutionResult | null>(null)
  const [requestError, setRequestError] = useState('')
  const [running, setRunning] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [controller, setController] = useState<AbortController | null>(null)

  const activeSnippet = useMemo(
    () => (mode === 'js' ? JS_SNIPPET : NODE_SNIPPET),
    [mode],
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

  const runCode = async () => {
    const nextController = new AbortController()
    setController(nextController)
    setRunning(true)
    setRequestError('')
    setResult(null)

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
      setResult(payload as ExecutionResult)
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
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setRequestError(error instanceof Error ? error.message : String(error))
    } finally {
      setRunning(false)
      setController(null)
    }
  }

  const stopCode = () => controller?.abort()

  const clearOutput = () => {
    setResult(null)
    setRequestError('')
  }

  const formatCode = async () => {
    try {
      setCode(await format(code, { parser: 'babel', plugins: [babelParser] }))
      setRequestError('')
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : String(error))
    }
  }

  const resetCode = () => {
    setCode(activeSnippet)
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
          <p className="eyebrow">Node.js Playground</p>
          <h2>Run real Node.js code</h2>
        </div>
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
      </div>

      <div className="playground-card">
        <div className="playground-toolbar">
          <span className="demo-badge">
            {result?.executionMode === 'local-development'
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
          onChange={(value) => setCode(value)}
          theme="dark"
          aria-label="Code editor"
        />

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
