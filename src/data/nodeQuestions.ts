import type { Question } from '../types'

export const nodeQuestions: Question[] = [
  {
    id: 'q1',
    title: 'What is Node.js?',
    difficulty: 'easy',
    topic: 'Fundamentals',
    question: 'What is Node.js?',
    answer:
      "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run outside the browser, typically for server-side and CLI environments.",
    explanation:
      'It combines V8 with Node.js APIs and libuv to provide asynchronous I/O and server-side capabilities.',
    code: 'console.log(process.version)',
    related: ['V8 Engine', 'Node.js Architecture'],
  },
  {
    id: 'q2',
    title: 'Browser vs Node',
    difficulty: 'easy',
    topic: 'Fundamentals',
    question:
      'What is the main difference between JavaScript in the browser and JavaScript in Node.js?',
    answer:
      'The browser provides DOM, window, fetch, and UI-specific APIs, while Node.js provides server APIs such as fs, http, process, and networking primitives.',
    explanation:
      'Both use the same language syntax, but the runtime environments and available APIs differ.',
    related: ['Node.js vs Browser'],
  },
  {
    id: 'q3',
    title: 'V8 purpose',
    difficulty: 'easy',
    topic: 'Fundamentals',
    question: 'What role does V8 play in Node.js?',
    answer:
      'V8 is the JavaScript engine that parses, compiles, optimizes, and executes JavaScript code.',
    explanation:
      'It is responsible for turning JavaScript into executable machine code, but it does not handle all Node.js runtime features by itself.',
    related: ['V8 Engine'],
  },
  {
    id: 'q4',
    title: 'libuv role',
    difficulty: 'easy',
    topic: 'Node Internals',
    question: 'What does libuv do in Node.js?',
    answer:
      'libuv manages asynchronous I/O, the event loop, and the thread pool used by Node.js.',
    explanation:
      'It abstracts handling of OS events and file/network operations across platforms.',
    related: ['What is libuv?'],
  },
  {
    id: 'q5',
    title: 'Synchronous blocking',
    difficulty: 'easy',
    topic: 'Async',
    question: 'What does blocking mean in JavaScript?',
    answer:
      'Blocking means the current thread stops and waits for an operation to finish before continuing the program.',
    explanation:
      'This can stall the entire application if long I/O is performed synchronously.',
    related: ['Blocking vs Non-blocking'],
  },
  {
    id: 'q6',
    title: 'Call stack',
    difficulty: 'easy',
    topic: 'Async',
    question: 'What is the call stack?',
    answer:
      'It is the data structure that tracks the current execution context and function calls in LIFO order.',
    explanation:
      'A function gets pushed onto the stack when called, and popped when it returns.',
    related: ['Call Stack'],
  },
  {
    id: 'q7',
    title: 'Microtask example',
    difficulty: 'easy',
    topic: 'Event Loop',
    question:
      'What runs before timer callbacks: a Promise callback or a setTimeout callback?',
    answer:
      'A Promise callback usually runs before a timer callback, because Promise callbacks are microtasks and are processed before the next macrotask.',
    explanation:
      'The current stack must finish first, then the microtask queue is drained before the next timer phase callback runs.',
    related: ['Microtasks', 'setTimeout()'],
  },
  {
    id: 'q8',
    title: 'nextTick special case',
    difficulty: 'easy',
    topic: 'Event Loop',
    question: 'Why is process.nextTick() different from Promise.then()?',
    answer:
      "process.nextTick() uses Node.js's nextTick queue and is run before the event loop continues, often before Promise microtasks in the same tick.",
    explanation:
      'This makes it a Node-specific priority queue with important behavior for control flow and callback ordering.',
    related: ['process.nextTick()'],
  },
  {
    id: 'q9',
    title: 'setImmediate vs setTimeout',
    difficulty: 'easy',
    topic: 'Event Loop',
    question: 'What is setImmediate() used for?',
    answer:
      'It schedules a callback to run in the check phase of the Node.js event loop.',
    explanation:
      "It is used when you want work to run after I/O callbacks have been processed, in the loop's check phase.",
    related: ['setImmediate()'],
  },
  {
    id: 'q10',
    title: 'HTTP server',
    difficulty: 'easy',
    topic: 'HTTP',
    question: 'How do you create a basic HTTP server in Node.js?',
    answer: 'Use http.createServer() and call .listen(port).',
    explanation:
      'The callback receives req and res objects representing the incoming request and outgoing response.',
    related: ['Node.js HTTP Server'],
  },
  {
    id: 'q11',
    title: 'Event loop phases',
    difficulty: 'medium',
    topic: 'Event Loop',
    question: 'What are the main phases of the Node.js event loop?',
    answer:
      'Timers, pending callbacks, idle/prepare, poll, check, and close callbacks.',
    explanation:
      'Each phase handles different kinds of scheduled or completed work, and libuv coordinates the loop.',
    related: ['Event Loop Phases', 'Poll Phase'],
  },
  {
    id: 'q12',
    title: 'Promise order',
    difficulty: 'medium',
    topic: 'Async',
    question:
      'In what order will these run: console.log, Promise.then, and setTimeout?',
    answer:
      'console.log statements run immediately, Promise callbacks run as microtasks after the current stack, and timers run later in the event loop.',
    explanation:
      'The ordering is synchronous code first, then microtasks, then timer callbacks.',
    related: ['Microtasks', 'setTimeout()'],
  },
  {
    id: 'q13',
    title: 'Thread pool',
    difficulty: 'medium',
    topic: 'Node Internals',
    question: 'Why does Node.js sometimes use a thread pool?',
    answer:
      'Because some expensive operations, like file I/O or crypto work, are better offloaded from the main JavaScript thread.',
    explanation:
      'libuv provides the pool so the main thread can stay responsive while async work completes.',
    related: ['Thread Pool'],
  },
  {
    id: 'q14',
    title: 'Poll phase',
    difficulty: 'medium',
    topic: 'Event Loop',
    question: 'What happens in the poll phase?',
    answer:
      'It checks for I/O events and executes their callbacks when they become ready.',
    explanation:
      'This is often where network and file activity gets processed.',
    related: ['Poll Phase'],
  },
  {
    id: 'q15',
    title: 'Worker threads',
    difficulty: 'medium',
    topic: 'Node Internals',
    question: 'When should you use worker threads?',
    answer:
      'When a task is CPU-bound and would block the main JavaScript thread.',
    explanation:
      'Worker threads allow parallel execution for CPU-heavy operations while preserving the main event loop for I/O tasks.',
    related: ['Worker Threads'],
  },
  {
    id: 'q16',
    title: 'Streams efficiency',
    difficulty: 'medium',
    topic: 'HTTP',
    question: 'Why are streams useful in Node.js?',
    answer:
      'They allow processing large amounts of data incrementally instead of buffering everything in memory.',
    explanation:
      'This makes file reads, HTTP responses, and data pipelines more memory-efficient.',
    related: ['Streams'],
  },
  {
    id: 'q17',
    title: 'Buffer purpose',
    difficulty: 'medium',
    topic: 'HTTP',
    question: 'What is a Buffer in Node.js?',
    answer:
      'A Buffer is a chunk of binary data represented in memory, used for file and network payloads.',
    explanation:
      'It is necessary because JavaScript strings do not map neatly to arbitrary byte-level data.',
    related: ['Buffers'],
  },
  {
    id: 'q18',
    title: 'EventEmitter',
    difficulty: 'medium',
    topic: 'Fundamentals',
    question: 'What is EventEmitter used for?',
    answer:
      'It is used to emit and listen for named events in a decoupled, event-driven design.',
    explanation: 'Common in streams, servers, and internal Node.js APIs.',
    related: ['EventEmitter'],
  },
  {
    id: 'q19',
    title: 'Node.js architecture',
    difficulty: 'hard',
    topic: 'Node Internals',
    question:
      'Explain the relationship between V8, Node.js APIs, libuv, and the operating system.',
    answer:
      'V8 executes JavaScript, Node.js exposes runtime APIs, libuv schedules async I/O and the event loop, and the OS handles low-level file and network operations.',
    explanation:
      'This layered architecture is what makes Node.js a server runtime instead of just a JS engine.',
    related: ['Node.js Architecture'],
  },
  {
    id: 'q20',
    title: 'nextTick vs microtask',
    difficulty: 'hard',
    topic: 'Event Loop',
    question:
      'What is the difference between process.nextTick() and Promise.then() in Node.js?',
    answer:
      'process.nextTick() is scheduled in the nextTick queue and runs before the event loop continues, while Promise callbacks run in the microtask queue after the current stack turn and before the next task.',
    explanation:
      'This difference is one of the most important Node.js event-loop interview topics.',
    related: ['process.nextTick()', 'Microtasks'],
  },
  {
    id: 'q21',
    title: 'Timers vs check phase',
    difficulty: 'hard',
    topic: 'Event Loop',
    question: 'When does setTimeout run relative to setImmediate?',
    answer:
      'The exact order depends on the current phase and the context, but both are scheduled by the event loop and run in different phases.',
    explanation:
      'If the code runs within an I/O callback, setImmediate is more likely to run sooner; in a top-level script, timers may win first.',
    related: ['setTimeout()', 'setImmediate()'],
  },
  {
    id: 'q22',
    title: 'libuv event loop',
    difficulty: 'hard',
    topic: 'Node Internals',
    question: 'Why is libuv important to the Node.js event loop?',
    answer:
      'It provides the cross-platform event-loop implementation and the underlying scheduling model for async I/O and thread coordination.',
    explanation:
      'Without libuv, Node.js would not have a unified async I/O model across operating systems.',
    related: ['What is libuv?'],
  },
  {
    id: 'q23',
    title: 'DNS and network I/O',
    difficulty: 'hard',
    topic: 'HTTP',
    question:
      'How does Node.js handle DNS and network I/O without blocking the main thread?',
    answer:
      'It delegates OS-level I/O operations to the event loop and possibly the thread pool, then resumes queued callbacks when the operation is ready.',
    explanation:
      'The runtime does not keep the JavaScript thread busy waiting for network or DNS completion.',
    related: ['HTTP & Networking', 'Event Loop'],
  },
  {
    id: 'q24',
    title: 'Non-blocking I/O',
    difficulty: 'hard',
    topic: 'Async',
    question: 'Why is non-blocking I/O so important in Node.js?',
    answer:
      'It allows Node.js to handle many concurrent operations without stalling the main thread.',
    explanation:
      "This is central to Node.js's scalability for I/O-heavy workloads such as APIs and real-time services.",
    related: ['Blocking vs Non-blocking'],
  },
  {
    id: 'q25',
    title: 'Module system',
    difficulty: 'easy',
    topic: 'Modules',
    question: 'What is the difference between CommonJS and ES modules?',
    answer:
      'CommonJS uses require() and module.exports, while ES modules use import/export syntax and are static by default.',
    explanation:
      'Node.js historically used CommonJS, while ES modules are increasingly used with .mjs or package.json type settings.',
    related: ['Modules'],
  },
  {
    id: 'q26',
    title: 'CommonJS exports',
    difficulty: 'easy',
    topic: 'Modules',
    question: 'What is the purpose of module.exports?',
    answer:
      'It exposes values from a CommonJS module to other files that require it.',
    explanation:
      'This is one of the core ways Node.js code is structured and shared.',
    related: ['Modules'],
  },
  {
    id: 'q27',
    title: 'Event loop reason',
    difficulty: 'medium',
    topic: 'Event Loop',
    question:
      'Why does Node.js need an event loop if JavaScript is single-threaded?',
    answer:
      'Because async I/O and callback scheduling must happen without blocking the main thread, so work can be coordinated across many operations.',
    explanation:
      'The loop is the coordination mechanism between the stack and queued work.',
    related: ['What is the Event Loop?'],
  },
  {
    id: 'q28',
    title: 'Close callbacks',
    difficulty: 'hard',
    topic: 'Event Loop',
    question: 'What is the close callbacks phase used for?',
    answer:
      'It performs cleanup for closed sockets or handles after they have been terminated.',
    explanation:
      'This is important for resource management and finalization logic.',
    related: ['Close Callbacks'],
  },
  {
    id: 'q29',
    title: 'fs operations',
    difficulty: 'medium',
    topic: 'Node Internals',
    question: 'How are fs operations handled in Node.js?',
    answer:
      'They are commonly delegated to libuv and sometimes the thread pool, while JavaScript continues executing asynchronously.',
    explanation:
      'This allows file I/O to happen without blocking business logic on the main thread.',
    related: ['Thread Pool'],
  },
  {
    id: 'q30',
    title: 'HTTP request lifecycle',
    difficulty: 'hard',
    topic: 'HTTP',
    question: 'Describe the lifecycle of a simple HTTP request in Node.js.',
    answer:
      'The server accepts a TCP connection, Node.js receives the request, the callback handles req/res, the handler processes work, and the response is written back on the socket.',
    explanation: 'This is the basic event-driven pipeline behind web servers.',
    related: ['Node.js HTTP Server', 'HTTP Request Lifecycle'],
  },
]

export const easyQuestions = nodeQuestions.filter(
  (q) => q.difficulty === 'easy',
)
export const mediumQuestions = nodeQuestions.filter(
  (q) => q.difficulty === 'medium',
)
export const hardQuestions = nodeQuestions.filter(
  (q) => q.difficulty === 'hard',
)
