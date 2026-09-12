import type { Lesson } from '../types'

export const nodeLessons: Lesson[] = [
  {
    id: 'what-is-nodejs',
    slug: 'what-is-nodejs',
    title: 'What is Node.js?',
    category: 'Node.js Fundamentals',
    description:
      'Understand the runtime, the JavaScript engine, and how Node.js runs outside the browser.',
    section: '01. Node.js Fundamentals',
    level: 1,
    progress: 80,
    toc: [
      'What is Node.js?',
      'JavaScript Engine',
      'Node.js APIs',
      'libuv',
      'Operating System',
    ],
    sections: [
      {
        heading: 'What is Node.js?',
        explanation: [
          "Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets developers run JavaScript on the server, not only in the browser.",
          'JavaScript by itself is just a language. The browser provides APIs like document and fetch. Node.js provides APIs like fs, http, child_process, and crypto that let you work with files, sockets, subprocesses, and the network.',
          'The important idea is that Node.js is not a browser. It is a runtime environment with a different execution model, and it is designed for high-concurrency, event-driven server workloads.',
        ],
        code: `console.log(typeof process)
console.log(process.version)`,
        output: `object\n22.x`,
        note: 'Node.js adds runtime APIs on top of V8, then coordinates I/O through libuv and the operating system.',
        interviewQuestion:
          'What is the difference between JavaScript and Node.js?',
        misconception:
          'Node.js is not just JavaScript in a terminal. It is a runtime with additional APIs and server-oriented behavior.',
        practiceQuestion:
          'Why does Node.js need more than the V8 engine to handle networking and files?',
      },
      {
        heading: 'JavaScript Engine',
        explanation: [
          'V8 compiles JavaScript to machine code and manages memory, optimizing hot paths for performance.',
          'The engine handles parsing, compilation, optimization, and execution. But it does not magically provide file system access or HTTP sockets.',
          'Node.js layers runtime APIs and system integration on top of V8.',
        ],
        code: `const greeting = 'hello';\nconsole.log(greeting.toUpperCase())`,
        output: `HELLO`,
        note: 'V8 is the engine, while Node.js adds the platform around it.',
      },
    ],
  },
  {
    id: 'node-vs-browser',
    slug: 'node-vs-browser',
    title: 'Node.js vs Browser',
    category: 'Node.js Fundamentals',
    description:
      'Compare the browser runtime with the Node.js runtime and understand their different responsibilities.',
    section: '01. Node.js Fundamentals',
    level: 2,
    progress: 72,
    toc: [
      'Environment',
      'Global APIs',
      'Execution Model',
      'DOM',
      'File System',
    ],
    sections: [
      {
        heading: 'Different runtimes, different goals',
        explanation: [
          'Browsers are built for rendering UI and interacting with the DOM. Node.js is built for server-side I/O, CLI tools, networking, and backend logic.',
          'In the browser, window, document, and fetch are available. In Node.js, process, require, fs, and http are the core runtime tools.',
          'The browser safety model is different from Node.js, especially for file access and security boundaries.',
        ],
        code: `console.log(typeof window)
console.log(typeof globalThis.process)`,
        output: `undefined\nobject`,
        note: 'Browser JavaScript runs inside a UI environment. Node.js runs in a server or CLI environment.',
      },
    ],
  },
  {
    id: 'v8-engine',
    slug: 'v8-engine',
    title: 'V8 Engine',
    category: 'Node.js Fundamentals',
    description:
      'Learn how V8 turns JavaScript into optimized native code and why that matters for Node.js performance.',
    section: '01. Node.js Fundamentals',
    level: 3,
    progress: 57,
    toc: ['Parsing', 'Compilation', 'Optimization', 'Garbage Collection'],
    sections: [
      {
        heading: 'V8 in a sentence',
        explanation: [
          'V8 is the JavaScript engine developed by Google for Chrome. Node.js uses it as the core execution engine for JavaScript.',
          'It parses source code, builds an abstract syntax tree, compiles it to bytecode or optimized machine code, and then executes it.',
          'V8 also includes a runtime for objects, functions, memory management, and garbage collection.',
        ],
        code: `const items = [1, 2, 3, 4, 5]\nconsole.log(items.map((n) => n * 2))`,
        output: `[ 2, 4, 6, 8, 10 ]`,
        note: 'V8 optimizes hot code paths, but Node.js still needs libuv for asynchronous I/O operations.',
      },
    ],
  },
  {
    id: 'node-architecture',
    slug: 'node-architecture',
    title: 'Node.js Architecture',
    category: 'Node.js Fundamentals',
    description:
      'Trace the layers between JavaScript code, V8, Node.js APIs, libuv, and the operating system.',
    section: '01. Node.js Fundamentals',
    level: 4,
    progress: 60,
    toc: ['V8', 'Node.js APIs', 'libuv', 'OS', 'Execution flow'],
    sections: [
      {
        heading: 'The runtime stack',
        explanation: [
          'User code runs in JavaScript. V8 executes that code.',
          'When the code calls filesystem or network APIs, Node.js delegates that work to libuv, which then interacts with the OS or a thread pool.',
          'This separation is why Node.js can stay single-threaded for JavaScript execution while supporting asynchronous I/O.',
        ],
        note: 'A common interview point: V8 handles JavaScript execution; libuv manages event loop and async I/O coordination.',
      },
    ],
  },
  {
    id: 'what-is-libuv',
    slug: 'what-is-libuv',
    title: 'What is libuv?',
    category: 'Node.js Fundamentals',
    description:
      'Understand the C library that powers Node.js I/O scheduling and the event loop.',
    section: '01. Node.js Fundamentals',
    level: 5,
    progress: 52,
    toc: ['libuv', 'Event loop', 'Thread pool', 'Polling'],
    sections: [
      {
        heading: 'libuv as the runtime engine for async I/O',
        explanation: [
          'libuv is a C library that provides Node.js with its event loop, file system access, and thread pool.',
          'It abstracts OS differences and gives Node.js a consistent cross-platform asynchronous I/O model.',
          'This is why Node.js can support many I/O operations without blocking the main JavaScript thread.',
        ],
        note: 'libuv is not the same as V8. V8 executes JavaScript. libuv schedules and coordinates async work.',
      },
    ],
  },
  {
    id: 'sync-vs-async',
    slug: 'sync-vs-async',
    title: 'Synchronous vs Asynchronous',
    category: 'Asynchronous JavaScript',
    description:
      'See how synchronous code blocks while asynchronous code frees the main thread for other work.',
    section: '03. Asynchronous JavaScript',
    level: 6,
    progress: 68,
    toc: ['Execution order', 'Blocking', 'Async patterns'],
    sections: [
      {
        heading: 'The difference is in when work completes',
        explanation: [
          'Synchronous code runs top-to-bottom and blocks further execution until it completes.',
          'Asynchronous code schedules work to complete later, letting the main thread keep processing other tasks.',
          'This is the core pattern that makes Node.js useful for I/O-heavy server workloads.',
        ],
        code: `console.log('A')\nsetTimeout(() => console.log('B'), 0)\nconsole.log('C')`,
        output: `A\nC\nB`,
        note: 'The timer callback is deferred, so C runs before B.',
      },
    ],
  },
  {
    id: 'blocking-vs-nonblocking',
    slug: 'blocking-vs-nonblocking',
    title: 'Blocking vs Non-blocking',
    category: 'Asynchronous JavaScript',
    description:
      'Differentiate blocking operations from non-blocking operations and their impact on throughput.',
    section: '03. Asynchronous JavaScript',
    level: 7,
    progress: 70,
    toc: ['Blocking', 'Non-blocking', 'I/O patterns'],
    sections: [
      {
        heading: 'Blocking pauses execution',
        explanation: [
          'A blocking operation stops the current thread until it finishes. In Node.js, the JavaScript thread should not be blocked for long operations.',
          'A non-blocking operation requests work and continues immediately, then reacts when the result is ready.',
          'This is what enables Node.js to handle many concurrent connections efficiently.',
        ],
        note: 'Non-blocking does not mean parallel execution of JavaScript; it means the code does not wait for the result before continuing.',
      },
    ],
  },
  {
    id: 'call-stack',
    slug: 'call-stack',
    title: 'Call Stack',
    category: 'Asynchronous JavaScript',
    description:
      'Learn how the call stack tracks active function execution in JavaScript and Node.js.',
    section: '03. Asynchronous JavaScript',
    level: 8,
    progress: 90,
    toc: ['Stack', 'Push', 'Pop', 'Execution order'],
    sections: [
      {
        heading: 'A last-in, first-out runtime structure',
        explanation: [
          'The call stack keeps track of the current execution context. When a function is called, it is pushed onto the stack; when it returns, it is popped.',
          'This is the simple model behind synchronous execution.',
          'The call stack itself does not handle async work. It coordinates with the event loop and the task queues.',
        ],
        code: `function one() { two(); }\nfunction two() { three(); }\nfunction three() { console.log('Hello'); }\none();`,
        output: `Hello`,
        note: 'The stack order is one -> two -> three, then it unwinds back to one.',
      },
    ],
  },
  {
    id: 'what-is-event-loop',
    slug: 'what-is-event-loop',
    title: 'What is the Event Loop?',
    category: 'Event Loop',
    description:
      'See how Node.js coordinates the call stack, tasks, microtasks, and async I/O using libuv.',
    section: '04. Event Loop',
    level: 9,
    progress: 40,
    toc: ['Call stack', 'Tasks', 'Microtasks', 'libuv'],
    sections: [
      {
        heading: 'The event loop keeps the runtime alive',
        explanation: [
          'The event loop is the mechanism that checks whether the call stack is empty and then dispatches queued work.',
          'It is central to Node.js because JavaScript execution is single-threaded, yet many operations are asynchronous.',
          'In Node.js, libuv owns the event-loop implementation and phase scheduling.',
        ],
        note: 'The call stack handles currently running JavaScript. The event loop decides what runs next when async work completes.',
      },
    ],
  },
  {
    id: 'microtasks',
    slug: 'microtasks',
    title: 'Microtasks',
    category: 'Event Loop',
    description:
      'Understand Promise callbacks, queueMicrotask, and the role of microtasks in Node.js execution.',
    section: '04. Event Loop',
    level: 10,
    progress: 45,
    toc: ['Promise', 'Microtasks', 'queueMicrotask'],
    sections: [
      {
        heading: 'Microtasks run after the current stack',
        explanation: [
          'When the current JavaScript turns are complete, Node.js drains the microtask queue before running the next macrotask.',
          'Promise callbacks and queueMicrotask() are common microtask sources.',
          'This is why Promise.then() often runs before a later timer callback.',
        ],
        code: `console.log('A')\nPromise.resolve().then(() => console.log('B'))\nconsole.log('C')`,
        output: `A\nC\nB`,
        note: 'Microtasks are processed after the current synchronous task completes, before the next scheduled callback.',
      },
    ],
  },
  {
    id: 'process-nexttick',
    slug: 'process-nexttick',
    title: 'process.nextTick()',
    category: 'Event Loop',
    description:
      'Learn the Node.js-specific queue that runs before microtasks and before the next event-loop turn.',
    section: '04. Event Loop',
    level: 11,
    progress: 70,
    toc: ['nextTick', 'Queue order', 'Node-specific semantics'],
    sections: [
      {
        heading: 'nextTick is special in Node.js',
        explanation: [
          'process.nextTick() schedules a callback to run before the event loop continues to the next phase.',
          'It is not the same as Promise.then(). It has a different queue and priority in Node.js.',
        ],
        code: `console.log('1')\nprocess.nextTick(() => console.log('2'))\nPromise.resolve().then(() => console.log('3'))\nconsole.log('4')`,
        output: `1\n4\n2\n3`,
        note: 'The exact ordering is subtle and important in interviews.',
      },
    ],
  },
  {
    id: 'promise-callbacks',
    slug: 'promise-callbacks',
    title: 'Promise callbacks',
    category: 'Event Loop',
    description:
      'Understand why Promise callbacks run in a microtask queue instead of immediately.',
    section: '04. Event Loop',
    level: 12,
    progress: 63,
    toc: ['Resolution', 'then()', 'Queue behavior'],
    sections: [
      {
        heading: 'Promises schedule work asynchronously',
        explanation: [
          'A Promise resolves in the current turn, but its .then() handlers run as microtasks after the current stack is drained.',
          'This makes Promise-based code predictable and helps order callback execution.',
        ],
        code: `console.log('start')\nPromise.resolve().then(() => console.log('promise'))\nconsole.log('end')`,
        output: `start\nend\npromise`,
        note: 'The callback is queued, not executed immediately.',
      },
    ],
  },
  {
    id: 'set-timeout',
    slug: 'set-timeout',
    title: 'setTimeout()',
    category: 'Event Loop',
    description:
      'Understand timer scheduling, delayed tasks, and how timers fit in the event loop.',
    section: '04. Event Loop',
    level: 13,
    progress: 61,
    toc: ['Timers', 'Delay', 'Execution timing'],
    sections: [
      {
        heading:
          'Timers are scheduled, not guaranteed to run exactly at the delay',
        explanation: [
          'setTimeout schedules a callback after a minimum delay. The event loop may not fire it at an exact millisecond.',
          'Timer callbacks are processed in the timers phase when the loop reaches it.',
        ],
        code: `console.log('A')\nsetTimeout(() => console.log('B'), 0)\nconsole.log('C')`,
        output: `A\nC\nB`,
        note: 'Zero delay does not mean immediate execution; it means as soon as the loop gets there.',
      },
    ],
  },
  {
    id: 'set-immediate',
    slug: 'set-immediate',
    title: 'setImmediate()',
    category: 'Event Loop',
    description:
      'Review the check phase in Node.js and the difference between setImmediate and setTimeout.',
    section: '04. Event Loop',
    level: 14,
    progress: 58,
    toc: ['Check phase', 'setImmediate', 'Order'],
    sections: [
      {
        heading: 'setImmediate schedules work for the check phase',
        explanation: [
          'setImmediate() is a Node.js API that queues a callback to run in the check phase of the event loop.',
          'It often interacts with timers, I/O callbacks, and poll activity in subtle ways.',
        ],
        code: `setImmediate(() => console.log('immediate'))\nsetTimeout(() => console.log('timeout'), 0)`,
        output: `timeout\nimmediate`,
        note: 'The exact order depends on the current phase and context.',
      },
    ],
  },
  {
    id: 'event-loop-phases',
    slug: 'event-loop-phases',
    title: 'Event Loop Phases',
    category: 'Event Loop',
    description:
      'Trace the structure of the Node.js event loop and the roles of each phase.',
    section: '04. Event Loop',
    level: 15,
    progress: 66,
    toc: ['Timers', 'Pending callbacks', 'Poll', 'Check', 'Close'],
    sections: [
      {
        heading: 'The loop rotates through stages',
        explanation: [
          'Node.js uses libuv to run an event loop with phases such as timers, pending callbacks, poll, check, and close callbacks.',
          'The loop continuously checks for I/O readiness, scheduled timers, and queued callbacks.',
          'This is the mechanism that lets Node.js remain efficient under many concurrent requests.',
        ],
        note: 'Timers and poll are especially important in interviews because they govern callback scheduling.',
      },
    ],
  },
  {
    id: 'timers-phase',
    slug: 'timers-phase',
    title: 'Timers Phase',
    category: 'Event Loop',
    description:
      'Understand timer callbacks and their schedule within the libuv loop.',
    section: '04. Event Loop',
    level: 16,
    progress: 38,
    toc: ['setTimeout', 'setInterval', 'Timing'],
    sections: [
      {
        heading: 'This phase checks expired timers',
        explanation: [
          'The timers phase executes callbacks whose delay has elapsed.',
          'This includes setTimeout and setInterval-style scheduled tasks.',
          'It does not guarantee strict real-time precision, but it is the phase that handles expired timer deadlines.',
        ],
        interviewQuestion:
          'Why can setTimeout(..., 0) still run after other synchronous code?',
      },
    ],
  },
  {
    id: 'poll-phase',
    slug: 'poll-phase',
    title: 'Poll Phase',
    category: 'Event Loop',
    description:
      'See how the poll phase waits for I/O events and dispatches ready callbacks.',
    section: '04. Event Loop',
    level: 17,
    progress: 46,
    toc: ['I/O events', 'Ready callbacks', 'Idle'],
    sections: [
      {
        heading: 'The poll phase is where most I/O waits happen',
        explanation: [
          'In the poll phase, the loop checks for ready I/O events from file system and network operations.',
          'If no events are ready, the loop may wait. If there are callbacks to process, it drains them.',
          'This is the phase most associated with handling server requests and responses.',
        ],
        note: 'The poll phase is where Node.js often appears to “wait” while network or file I/O is happening.',
      },
    ],
  },
  {
    id: 'check-phase',
    slug: 'check-phase',
    title: 'Check Phase',
    category: 'Event Loop',
    description:
      'Learn when setImmediate callbacks run and how they relate to poll and timers.',
    section: '04. Event Loop',
    level: 18,
    progress: 35,
    toc: ['setImmediate', 'Check', 'Ordering'],
    sections: [
      {
        heading: 'The check phase handles immediate callbacks',
        explanation: [
          'After the poll phase, the loop moves into the check phase, where setImmediate callbacks are executed.',
          'This phase is particularly relevant when comparing setImmediate and setTimeout behavior.',
        ],
        code: `console.log('start')\nsetImmediate(() => console.log('immediate'))\nsetTimeout(() => console.log('timeout'), 0)\nconsole.log('end')`,
        output: `start\nend\ntimeout\nimmediate`,
        note: 'The actual order can vary with context, so interviews usually focus on the lifecycle and phase model.',
      },
    ],
  },
  {
    id: 'close-callbacks',
    slug: 'close-callbacks',
    title: 'Close Callbacks',
    category: 'Event Loop',
    description:
      'Understand cleanup work when sockets and handles are closed in Node.js.',
    section: '04. Event Loop',
    level: 19,
    progress: 29,
    toc: ['close', 'cleanup', 'handle shutdown'],
    sections: [
      {
        heading: 'Close callbacks run when resources are being cleaned up',
        explanation: [
          'When a handle or socket closes, Node.js emits a close callback so that cleanup work can happen.',
          'This phase is relevant for network resources and file handles.',
        ],
        note: 'It is less common than timers or poll, but important for resource lifecycle and debugging.',
      },
    ],
  },
  {
    id: 'thread-pool',
    slug: 'thread-pool',
    title: 'Thread Pool',
    category: 'Node.js Internals',
    description:
      'Learn when Node.js uses libuv’s thread pool for expensive asynchronous operations.',
    section: '05. Node.js Under The Hood',
    level: 20,
    progress: 55,
    toc: ['JavaScript thread', 'libuv', 'worker pool'],
    sections: [
      {
        heading:
          'JavaScript execution is single-threaded, but I/O can be delegated',
        explanation: [
          'Node.js JavaScript execution remains primarily single-threaded, but libuv can offload expensive operations to a thread pool.',
          'File system work, crypto operations, compression, and some DNS-related tasks may use the pool.',
          'Network I/O often relies on the OS kernel and event loop instead of the thread pool alone.',
        ],
        note: 'Thread pool is not a replacement for the event loop; it is a helper for blocking work that is better offloaded.',
      },
    ],
  },
  {
    id: 'worker-threads',
    slug: 'worker-threads',
    title: 'Worker Threads',
    category: 'Node.js Internals',
    description:
      'See how worker threads let Node.js parallelize CPU-bound work while keeping the main thread responsive.',
    section: '05. Node.js Under The Hood',
    level: 21,
    progress: 32,
    toc: ['Worker', 'Message Channel', 'CPU bound'],
    sections: [
      {
        heading: 'Use workers for CPU-intensive tasks',
        explanation: [
          'Worker threads create additional Node.js execution contexts that can run JavaScript in parallel.',
          'This is useful for CPU-heavy work such as large calculations, image processing, or parsing.',
          'They are not a substitute for the event loop architecture, but a way to add separate execution threads.',
        ],
        note: 'Use worker threads when the main Node.js thread needs relief from CPU-bound work.',
      },
    ],
  },
  {
    id: 'streams',
    slug: 'streams',
    title: 'Streams',
    category: 'HTTP & Networking',
    description:
      'Learn how streams handle large data efficiently by processing chunks incrementally.',
    section: '06. HTTP & Networking',
    level: 22,
    progress: 45,
    toc: ['Readable', 'Writable', 'Transform'],
    sections: [
      {
        heading: 'Streams avoid loading everything into memory',
        explanation: [
          'A stream emits chunks as data becomes available, instead of waiting for a full payload to arrive in memory.',
          'This is important for file reading, HTTP responses, and large data pipelines.',
        ],
        code: `const fs = require('fs')\nconst stream = fs.createReadStream('sample.txt', { encoding: 'utf8' })\nstream.on('data', (chunk) => console.log(chunk.toString().slice(0, 10)))`,
        output: 'Partial data',
        note: 'Streams are efficient because they process data incrementally.',
      },
    ],
  },
  {
    id: 'buffers',
    slug: 'buffers',
    title: 'Buffers',
    category: 'HTTP & Networking',
    description:
      'Understand binary data handling in Node.js and why buffers are part of the runtime.',
    section: '06. HTTP & Networking',
    level: 23,
    progress: 34,
    toc: ['Binary data', 'Raw memory', 'Encoding'],
    sections: [
      {
        heading: 'Buffers represent raw binary bytes',
        explanation: [
          'A Buffer is a fixed-size chunk of memory used to handle binary data efficiently.',
          'They are common when reading files, network payloads, or sockets.',
          'Buffers are important because JavaScript strings are not ideal for arbitrary byte-level data.',
        ],
        code: `const buf = Buffer.from('hello')\nconsole.log(buf.toString())`,
        output: `hello`,
        note: 'Node.js represents raw binary data in Buffers, which are a core primitive for networking and streams.',
      },
    ],
  },
  {
    id: 'eventemitter',
    slug: 'eventemitter',
    title: 'EventEmitter',
    category: 'Node.js Internals',
    description:
      'Learn the event-driven pattern behind many Node.js core APIs.',
    section: '05. Node.js Under The Hood',
    level: 24,
    progress: 40,
    toc: ['emit', 'on', 'once'],
    sections: [
      {
        heading: 'EventEmitter powers Node.js callback-driven APIs',
        explanation: [
          'EventEmitter is a core Node.js class for dispatching named events to listeners.',
          'Many internal modules and libraries use it to emit lifecycle and data events.',
          'It is central to the event-driven model that Node.js is built around.',
        ],
        code: `const { EventEmitter } = require('events')\nconst ee = new EventEmitter()\nee.on('ping', () => console.log('pong'))\nee.emit('ping')`,
        output: `pong`,
        note: 'Node.js uses event-driven patterns heavily, especially around streams and servers.',
      },
    ],
  },
  {
    id: 'node-http-server',
    slug: 'node-http-server',
    title: 'Node.js HTTP Server',
    category: 'HTTP & Networking',
    description:
      'Build a minimal HTTP server and understand the request-response lifecycle in Node.js.',
    section: '06. HTTP & Networking',
    level: 25,
    progress: 28,
    toc: ['createServer', 'request', 'response', 'port'],
    sections: [
      {
        heading: 'A server is just a socket listener',
        explanation: [
          'Node.js can create an HTTP server with createServer(), then receive incoming requests and write responses.',
          'The event loop handles connection readiness. The callback receives the request and response objects.',
          'This is the foundational model for backend web servers.',
        ],
        code: `const http = require('http')\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' })\n  res.end('hello from Node.js')\n})\nserver.listen(3000)`,
        output: `Server listening on port 3000`,
        note: 'This is the beginning of the Node.js web server story, before Express and framework layers.',
      },
    ],
  },
]

export const lessonBySlug = Object.fromEntries(
  nodeLessons.map((lesson) => [lesson.slug, lesson]),
)
