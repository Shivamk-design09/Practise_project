import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  GitBranch,
  Menu,
  Moon,
  Search,
  SunMedium,
  UserCircle2,
  X,
} from 'lucide-react'
import {
  learningLessons,
  lessonBySlug,
  lessonPath,
  nodeLessons,
} from '../../data/nodeLessons'
import type { ProgressState } from '../../types'

type SidebarItem = {
  label: string
  level?: number
  children?: string[]
  comingSoon?: boolean
  path?: string
}

type SidebarGroup = {
  title: string
  items: SidebarItem[]
}

const sidebarGroups: SidebarGroup[] = [
  {
    title: 'LEARN',
    items: [
      {
        label: '01. JavaScript',
        children: [
          'JavaScript Fundamentals',
          'JavaScript Core Concepts',
          'Asynchronous JavaScript',
          'Advanced JavaScript',
          'JavaScript Interview Practice',
        ],
      },
      {
        label: '02. React',
        children: [
          'React Overview',
          'Components',
          'JSX',
          'Props',
          'State and Events',
          'Conditional Rendering',
          'Lists and Keys',
          'Forms',
          'useState',
          'useEffect',
          'useRef',
          'useMemo',
          'useCallback',
          'useContext',
          'Custom Hooks',
          'Rendering and Re-rendering',
          'Reconciliation and Virtual DOM',
          'Component Lifecycle',
          'Context API',
          'Redux Toolkit',
          'Zustand',
          'React Query',
          'React Performance',
          'React.memo',
          'Lazy Loading and Code Splitting',
          'Virtualization',
          'Lab: Login Form',
          'Lab: CRUD Interface',
          'Lab: Search and Pagination',
          'Lab: Infinite Scroll, Upload, and Protected UI',
        ],
      },
      { label: 'Node.js', level: 60 },
      {
        label: '01. Node.js Fundamentals',
        children: [
          'What is Node.js?',
          'Why Node.js?',
          'Node.js vs Browser',
          'V8 Engine',
          'Node.js Architecture',
          'Runtime Environment',
          'Node.js Internals',
          'Node.js vs JavaScript',
        ],
      },
      {
        label: '02. Modules',
        children: [
          'CommonJS',
          'ES Modules',
          'require()',
          'import/export',
          'module.exports',
          'exports',
          'Module Resolution',
          'Module Cache',
        ],
      },
      {
        label: '03. Asynchronous JavaScript',
        children: [
          'Synchronous vs Asynchronous',
          'Blocking vs Non-blocking',
          'Call Stack',
          'Web APIs vs Node APIs',
          'Callback',
          'Promise',
          'async/await',
        ],
      },
      {
        label: '04. Event Loop',
        children: [
          'What is Event Loop?',
          'Why Event Loop?',
          'Microtasks',
          'Macrotasks',
          'process.nextTick()',
          'queueMicrotask()',
          'Promise callbacks',
          'setTimeout()',
          'setImmediate()',
          'Event Loop Phases',
          'Timers',
          'Pending Callbacks',
          'Idle / Prepare',
          'Poll',
          'Check',
          'Close Callbacks',
          'Event Loop Execution Order',
        ],
      },
      {
        label: '05. Node.js Under The Hood',
        children: [
          'V8',
          'libuv',
          'Event Loop',
          'Thread Pool',
          'OS Kernel',
          'File System',
          'Network I/O',
          'DNS',
          'Worker Threads',
          'Child Processes',
          'Cluster',
          'Streams',
          'Buffers',
          'EventEmitter',
        ],
      },
      {
        label: '06. HTTP & Networking',
        children: [
          'HTTP Basics',
          'TCP',
          'Sockets',
          'HTTP Request Lifecycle',
          'HTTP Server',
          'IncomingMessage',
          'ServerResponse',
          'Headers',
          'Keep Alive',
          'Connection Pooling',
        ],
      },
      {
        label: '07. Networking Fundamentals',
        children: [
          'OSI Model',
          'TCP and Ports',
          'TCP Three-Way Handshake',
          'UDP',
          'QUIC',
          'IP and Routing',
          'TLS and Encryption',
          'Connections and Sessions',
          'Ethernet and Wi-Fi',
          'ARP and MAC Addresses',
          'VLANs',
        ],
      },
      {
        label: '08. Express.js',
        children: [
          'Express Fundamentals',
          'Routing & HTTP Methods',
          'Request & Response',
          'Middleware Architecture',
          'Express Router',
          'Controllers & Services',
          'Error Handling',
          'Centralized Error Handling',
          'Validation & Sanitization',
          'Authentication & Route Protection',
          'File Uploads',
          'Production Best Practices',
        ],
      },
      {
        label: '09. API Development',
        children: [
          'REST API Fundamentals',
          'CRUD Operations',
          'HTTP Methods Deep Dive',
          'HTTP Status Codes',
          'Headers & Content Types',
          'Query & Route Parameters',
          'Request Body Parsing',
          'Pagination',
          'Filtering & Sorting',
          'Searching',
          'API Versioning',
        ],
      },
      {
        label: '10. Authentication',
        children: [
          'Password Hashing',
          'JWT Fundamentals',
          'Access Tokens',
          'Refresh Tokens',
          'Cookies & Sessions',
          'OAuth Basics',
          'RBAC',
          'Authentication vs Authorization',
        ],
      },
      {
        label: '11. Security',
        children: [
          'CORS Deep Dive',
          'Rate Limiting',
          'Helmet & Security Headers',
          'Input Validation',
          'SQL Injection',
          'NoSQL Injection',
          'XSS Prevention',
          'CSRF Protection',
          'Secure Cookies',
          'Password Security',
        ],
      },
      {
        label: '12. Production',
        children: [
          'Logging',
          'Error Monitoring',
          'Graceful Shutdown',
          'Environment Configuration',
          'API Performance',
          'Caching Strategies',
          'Load Handling',
        ],
      },
      { label: 'Databases', level: 60 },
      {
        label: '13. MongoDB',
        children: [
          'Documents & Collections',
          'BSON Data Types',
          'CRUD Operations',
          'Query Operators',
          'Indexes',
          'Compound Indexes',
          'Aggregation Framework',
          'Aggregation Pipeline Stages',
          'Lookup & Joins',
          'Transactions',
          'Replication',
          'Sharding',
          'Schema Design Patterns',
          'Embedding vs Referencing',
          'MongoDB Performance',
          'Mongoose ODM',
          'Mongoose Schemas & Models',
          'Mongoose Middleware',
          'Population & References',
          'Lab: User System',
          'Lab: Product System',
          'Lab: Order System',
          'Lab: Search Implementation',
          'Lab: Pagination System',
          'Lab: Aggregation Analytics',
        ],
      },
      {
        label: '14. PostgreSQL',
        children: [
          'Relational Database Concepts',
          'Tables, Rows & Columns',
          'Primary & Foreign Keys',
          'Constraints',
          'SELECT Queries',
          'INSERT, UPDATE, DELETE',
          'JOINs',
          'GROUP BY & HAVING',
          'Subqueries',
          'Common Table Expressions',
          'Window Functions',
          'Indexes',
          'Transactions & ACID',
          'Isolation Levels',
          'Locks',
          'Normalization',
          'Denormalization',
          'Query Optimization',
          'EXPLAIN & EXPLAIN ANALYZE',
          'Lab: User Database',
          'Lab: E-Commerce Database',
          'Lab: Booking System',
          'Lab: Banking Transactions',
          'Lab: Analytics Queries',
        ],
      },
      {
        label: '15. Redis',
        children: [
          'What is Redis?',
          'In-Memory Architecture',
          'Redis Event Loop',
          'Strings',
          'Lists',
          'Sets',
          'Sorted Sets',
          'Hashes',
          'TTL & Expiration',
          'Cache Patterns',
          'Cache-Aside Pattern',
          'Sessions with Redis',
          'Rate Limiting with Redis',
          'Distributed Locks',
          'Pub/Sub',
          'Streams',
          'Queues',
          'Redis Persistence',
          'Redis Replication',
          'Redis Cluster',
          'Lab: API Caching',
          'Lab: Rate Limiter',
          'Lab: Session Store',
          'Lab: OTP Expiry',
          'Lab: Distributed Lock',
          'Lab: Real-time Notifications',
        ],
      },
      { label: 'DevOps & Architecture', level: 60 },
      {
        label: '16. Docker',
        children: [
          'Containers & Images',
          'Dockerfile',
          'Docker Commands',
          'Volumes',
          'Networks',
          'Environment Variables & Port Mapping',
          'Docker Compose',
          'Multi-Stage Builds',
          'Dockerizing Node.js',
          'Dockerizing React',
          'PostgreSQL with Docker',
          'Redis with Docker',
          'Container Networking',
          'Production Optimization',
          'Lab: Dockerize Node API',
          'Lab: Node + PostgreSQL',
          'Lab: Node + Redis',
          'Lab: Full-Stack Docker Compose',
        ],
      },
      {
        label: '17. System Design',
        children: [
          'What is System Design?',
          'Scalability',
          'Availability & Reliability',
          'Latency & Throughput',
          'CAP Theorem',
          'Consistency Patterns',
          'Load Balancing',
          'Reverse Proxy',
          'API Gateway',
          'CDN',
          'Caching Strategies',
          'Database Scaling',
          'Replication',
          'Sharding',
          'Message Queues',
          'Pub/Sub Architecture',
          'WebSockets',
          'Rate Limiting at Scale',
          'Distributed Systems',
          'Microservices',
          'Monolith vs Microservices',
          'Design: URL Shortener',
          'Design: Chat Application',
          'Design: Video Streaming',
          'Design: Social Media Feed',
          'Design: Food Delivery',
          'Design: Ride Booking',
          'Design: Notification System',
          'Design: File Storage',
          'Design: Job Portal',
          'Design: E-Commerce System',
        ],
      },
    ],
  },
]

type LayoutProps = {
  children: React.ReactNode
  progress: ProgressState
  toggleBookmark: (id: string) => void
}

export function Layout({ children, progress }: LayoutProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [expandedSidebarGroups, setExpandedSidebarGroups] = useState<
    Record<string, boolean>
  >({})
  const location = useLocation()
  const navigate = useNavigate()
  const currentLessonSlug = location.pathname.startsWith('/learn/')
    ? location.pathname.split('/').at(-1)
    : undefined
  const currentLesson = currentLessonSlug
    ? lessonBySlug[currentLessonSlug]
    : undefined

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const lessonRouteMap = useMemo(
    () =>
      Object.fromEntries(
        learningLessons.map((lesson) => [
          lesson.title.toLowerCase().trim(),
          lessonPath(lesson),
        ]),
      ),
    [],
  )

  const resolveLessonPath = (label: string) => {
    const normalizedLabel = label.toLowerCase().trim()
    return lessonRouteMap[normalizedLabel]
  }

  const searchData = useMemo(() => {
    const items = learningLessons.map((lesson) => ({
      type: 'lesson',
      label: lesson.title,
      path: lessonPath(lesson),
    }))
    const practiceItems = [
      {
        type: 'practice',
        label: 'Node.js Interview Practice',
        path: '/practice/node',
      },
    ]
    return [...items, ...practiceItems]
  }, [])

  const handleSearch = (path: string) => {
    navigate(path)
    setSearchOpen(false)
  }

  const nodeProgress = Math.round(
    (nodeLessons.filter((lesson) =>
      progress.completedLessons.includes(lesson.id),
    ).length /
      nodeLessons.length) *
      100,
  )

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <button
            className="mobile-menu-button"
            aria-label="Toggle navigation"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <Link to="/" className="brand">
            Backend Lab
          </Link>
        </div>

        <nav className="nav-center" aria-label="Main navigation">
          <NavLink
            to="/learn"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Learn
          </NavLink>
          <NavLink
            to="/practice/node"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Practice
          </NavLink>
          <NavLink
            to="/interview/node"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Interview
          </NavLink>
          <NavLink
            to="/progress"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Progress
          </NavLink>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={16} />
          </button>
          <button
            className="icon-button"
            aria-label="Toggle theme"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? <SunMedium size={16} /> : <Moon size={16} />}
          </button>
          <a
            href="https://github.com"
            className="icon-button"
            aria-label="GitHub"
          >
            <GitBranch size={16} />
          </a>
          <Link to="/progress" className="avatar" aria-label="Profile">
            <UserCircle2 size={18} />
          </Link>
        </div>
      </header>

      <div className="content-shell">
        <aside
          className={`sidebar ${sidebarOpen ? 'open' : ''}`}
          aria-label="Sidebar navigation"
        >
          <div className="sidebar-block">
            <div className="sidebar-header">Backend</div>
            <div className="sidebar-card">
              <div className="sidebar-title-row">
                <span>Node.js</span>
                <span>{nodeProgress}%</span>
              </div>
              <div className="progress-track">
                <span style={{ width: `${nodeProgress}%` }} />
              </div>
            </div>

            {sidebarGroups[0].items.map((item, itemIndex) => (
              <div
                key={`${item.label}-${itemIndex}`}
                className="sidebar-item-wrap"
              >
                {item.comingSoon ? (
                  <button
                    className="sidebar-link coming-soon"
                    type="button"
                    onClick={() => window.alert('This module is coming soon.')}
                  >
                    <span>{item.label}</span>
                    <span className="coming-soon-badge">Soon</span>
                  </button>
                ) : item.children ? (
                  <div className="sidebar-group">
                    <button
                      type="button"
                      className="sidebar-group-label"
                      aria-expanded={expandedSidebarGroups[item.label] ?? true}
                      aria-controls={`sidebar-children-${itemIndex}`}
                      onClick={() =>
                        setExpandedSidebarGroups((groups) => ({
                          ...groups,
                          [item.label]: !(groups[item.label] ?? true),
                        }))
                      }
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={14} />
                    </button>
                    {(expandedSidebarGroups[item.label] ?? true) ? (
                      <ul
                        className="sidebar-children"
                        id={`sidebar-children-${itemIndex}`}
                      >
                        {item.children.map((child) => {
                          const childPath = resolveLessonPath(child)
                          const isActive = childPath === location.pathname
                          return (
                            <li key={child}>
                              <button
                                type="button"
                                className={isActive ? 'active' : ''}
                                disabled={!childPath}
                                onClick={() => {
                                  if (childPath) navigate(childPath)
                                }}
                              >
                                {child}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    to={item.path ?? '/learn/node/what-is-nodejs'}
                    className="sidebar-link"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </aside>

        <main className="main-panel">{children}</main>

        <aside className="toc-panel">
          {currentLesson?.sections.length ? (
            <div className="toc-card">
              <h3>On this page</h3>
              <ul>
                {currentLesson.sections.map((section, index) => (
                  <li key={`${index}-${section.heading}`}>
                    <a href={`#lesson-section-${index}`}>{section.heading}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>

      {searchOpen && (
        <div className="overlay" onClick={() => setSearchOpen(false)}>
          <div
            className="search-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="search-header">
              <Search size={16} />
              <input
                autoFocus
                aria-label="Search lessons and questions"
                placeholder="Search lessons, topics, or questions..."
              />
            </div>
            <div className="search-results">
              {searchData.map((result) => (
                <button
                  type="button"
                  key={`${result.type}-${result.label}`}
                  className="search-result"
                  onClick={() => handleSearch(result.path)}
                >
                  <span className="search-type">{result.type}</span>
                  <span>{result.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
