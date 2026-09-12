import { createContext, useContext, useState } from 'react'

const ToastContext = createContext<{ push: (message: string) => void }>({
  push: () => undefined,
})

export function Toaster() {
  const [messages, setMessages] = useState<string[]>([])

  const push = (message: string) => {
    setMessages((prev) => [...prev, message])
    setTimeout(() => {
      setMessages((prev) => prev.slice(1))
    }, 2200)
  }

  return (
    <ToastContext.Provider value={{ push }}>
      <div className="toast-stack">
        {messages.map((message, index) => (
          <div key={`${message}-${index}`} className="toast">
            {message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function toast(message: string) {
  const context = useContext(ToastContext)
  context.push(message)
}
