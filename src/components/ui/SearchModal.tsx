import { useState } from 'react'
import { Search } from 'lucide-react'

export function SearchModal() {
  const [query, setQuery] = useState('')

  const results = [
    { label: 'Event Loop → Poll Phase', path: '/learn/node/event-loop-phases' },
    { label: 'Question → Poll vs Check', path: '/practice/node/question/q14' },
    {
      label: 'Question → What is Node.js?',
      path: '/practice/node/question/q1',
    },
  ].filter(
    (item) =>
      item.label.toLowerCase().includes(query.trim().toLowerCase()) ||
      query.trim() === '',
  )

  return (
    <div className="search-panel">
      <div className="search-box">
        <Search size={16} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for poll, event loop, questions..."
          aria-label="Search app content"
        />
      </div>
      <div className="search-results-list">
        {results.length === 0 ? (
          <p className="empty-state-small">No matches found.</p>
        ) : (
          results.map((result) => (
            <a
              href={result.path}
              key={result.label}
              className="search-result-item"
            >
              {result.label}
            </a>
          ))
        )}
      </div>
    </div>
  )
}
