import { useMemo, useState } from 'react'

const JS_SNIPPET = `console.log('Hello from JavaScript!')
const total = [1, 2, 3].reduce((sum, value) => sum + value, 0)
console.log('Total:', total)
`

const NODE_SNIPPET = `console.log('Node.js demo runtime booted')
console.log('Process version:', process.version)
const data = { name: 'Backend Lab', active: true }
console.log(data)
`

type RuntimeMode = 'js' | 'node'

export function CodePlayground() {
  const [mode, setMode] = useState<RuntimeMode>('js')
  const [code, setCode] = useState(JS_SNIPPET)
  const [output, setOutput] = useState('Ready to run JavaScript.')

  const activeSnippet = useMemo(
    () => (mode === 'js' ? JS_SNIPPET : NODE_SNIPPET),
    [mode],
  )

  const runCode = async () => {
    const logs: string[] = []
    let pendingTimers = 0
    let finishTimers: (() => void) | undefined

    const waitForTimers = () =>
      new Promise<void>((resolve) => {
        finishTimers = resolve
        if (pendingTimers === 0) {
          window.setTimeout(resolve, 0)
        }
      })

    const trackedSetTimeout = (callback: () => void, delay = 0) => {
      pendingTimers += 1
      return window.setTimeout(() => {
        try {
          callback()
        } catch (error) {
          logs.push(
            `ERROR: ${error instanceof Error ? error.message : String(error)}`,
          )
        } finally {
          pendingTimers -= 1
          if (pendingTimers === 0) {
            finishTimers?.()
          }
        }
      }, delay)
    }

    const capturedConsole = {
      log: (...args: unknown[]) => {
        logs.push(args.map((arg) => String(arg)).join(' '))
      },
      error: (...args: unknown[]) => {
        logs.push(`ERROR: ${args.map((arg) => String(arg)).join(' ')}`)
      },
      warn: (...args: unknown[]) => {
        logs.push(`WARN: ${args.map((arg) => String(arg)).join(' ')}`)
      },
    }

    try {
      if (mode === 'js') {
        const runner = new Function('console', 'setTimeout', code)
        runner(capturedConsole, trackedSetTimeout)
      } else {
        const processLike = {
          version: 'v22.0.0-demo',
          cwd: () => '/workspace',
          env: {},
        }
        const requireLike = (name: string) => {
          if (name === 'fs') {
            return {
              readFileSync: () => 'demo file content',
              writeFileSync: () => undefined,
            }
          }
          return { name }
        }
        const runner = new Function(
          'console',
          'process',
          'require',
          'setTimeout',
          code,
        )
        runner(capturedConsole, processLike, requireLike, trackedSetTimeout)
      }

      await waitForTimers()
      setOutput(
        logs.length ? logs.join('\n') : 'Program finished without output.',
      )
    } catch (error) {
      setOutput(
        `Runtime error: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  const resetCode = () => {
    setCode(activeSnippet)
    setOutput(
      mode === 'js'
        ? 'Ready to run JavaScript.'
        : 'Demo Node.js environment is ready.',
    )
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setOutput('Code copied to clipboard.')
    } catch {
      setOutput('Clipboard access is unavailable in this browser.')
    }
  }

  const switchMode = (nextMode: RuntimeMode) => {
    setMode(nextMode)
    setCode(nextMode === 'js' ? JS_SNIPPET : NODE_SNIPPET)
    setOutput(
      nextMode === 'js'
        ? 'Ready to run JavaScript.'
        : 'Demo Node.js environment is ready.',
    )
  }

  return (
    <div className="playground-shell">
      <div className="playground-header">
        <div className="playground-title-group">
          <p className="eyebrow">Code Playground</p>
          <h2>Practice JavaScript & Node.js</h2>
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
          <span className="demo-badge">Demo execution environment</span>
          <div className="toolbar-actions">
            <button
              type="button"
              className="secondary-button small"
              onClick={runCode}
            >
              Run
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
          </div>
        </div>

        <textarea
          value={code}
          onChange={(event) => setCode(event.target.value)}
          className="code-textarea"
          spellCheck={false}
          aria-label="Code editor"
        />

        <div className="output-panel">
          <div className="output-header">Output</div>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  )
}
