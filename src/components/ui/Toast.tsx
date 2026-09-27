import { useEffect, useState } from 'react'

type ToastListener = (message: string) => void
const listeners = new Set<ToastListener>()

export function Toaster() {
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const handleMessage: ToastListener = (message) => {
      setMessages((prev) => [...prev, message])
      setTimeout(() => {
        setMessages((prev) => prev.slice(1))
      }, 2200)
    }

    listeners.add(handleMessage)
    return () => {
      listeners.delete(handleMessage)
    }
  }, [])

  return (
    <div className="toast-stack">
      {messages.map((message, index) => (
        <div key={`${message}-${index}`} className="toast">
          {message}
        </div>
      ))}
    </div>
  )
}

export function toast(message: string) {
  listeners.forEach((listener) => listener(message))
}
