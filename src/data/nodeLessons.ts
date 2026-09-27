import type { Lesson } from '../types'
import { technologyLessons } from './technologyLessons'
import { javascriptLessons } from './javascriptLessons'
import { reactTopicLessons } from './reactTopicLessons'

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
    id: 'why-nodejs',
    slug: 'why-nodejs',
    title: 'Why Node.js?',
    category: 'Node.js Fundamentals',
    description:
      'Learn why Node.js is a strong fit for network services, command-line tools, and JavaScript across the stack.',
    section: '01. Node.js Fundamentals',
    level: 2,
    progress: 0,
    toc: [
      'JavaScript on the server',
      'Event-driven I/O',
      'When to choose Node.js',
    ],
    sections: [
      {
        heading: 'Why use Node.js?',
        explanation: [
          'Node.js lets teams use JavaScript beyond the browser, including for APIs, command-line tools, and background services.',
          'Its event-driven, non-blocking I/O model is useful for applications that spend much of their time waiting on network, database, or file operations. A single process can keep many such operations in flight without dedicating a JavaScript thread to each connection.',
          'Using JavaScript across the client and server can also make it easier to share language knowledge and some validation or data-model code between them.',
        ],
        note: 'Node.js is not automatically the best choice for every workload. CPU-heavy work needs careful design so it does not block the event loop.',
        interviewQuestion:
          'What kinds of workloads are a good fit for Node.js?',
        practiceQuestion:
          'Why can non-blocking I/O help a server handle many open connections?',
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
    id: 'runtime-environment',
    slug: 'runtime-environment',
    title: 'Runtime Environment',
    category: 'Node.js Fundamentals',
    description:
      'See what a runtime provides around the JavaScript language and how Node.js starts and runs a program.',
    section: '01. Node.js Fundamentals',
    level: 6,
    progress: 0,
    toc: ['Language and runtime', 'Node.js globals', 'Program lifecycle'],
    sections: [
      {
        heading: 'The runtime around JavaScript',
        explanation: [
          'JavaScript defines the language: its syntax, values, functions, and objects. A runtime supplies the host environment that loads and executes a program.',
          'Node.js combines V8 with APIs for tasks such as reading files, creating servers, accessing environment variables, and scheduling asynchronous work.',
          'When Node.js starts a script, it evaluates the entry point, handles pending work such as timers or I/O, and normally exits after the event loop has no work left to perform.',
        ],
        code: `console.log(process.argv[1])\nconsole.log(process.platform)`,
        output: `path to the script\ncurrent operating system`,
        note: 'Globals and available APIs depend on the host runtime; browser-only APIs such as document are not provided by Node.js.',
      },
    ],
  },
  {
    id: 'node-internals',
    slug: 'node-internals',
    title: 'Node.js Internals',
    category: 'Node.js Fundamentals',
    description:
      'Connect JavaScript execution, Node.js native bindings, libuv, and operating-system services.',
    section: '01. Node.js Fundamentals',
    level: 7,
    progress: 0,
    toc: ['JavaScript layer', 'Native bindings', 'libuv and the OS'],
    sections: [
      {
        heading: 'How a Node.js operation reaches the system',
        explanation: [
          'A Node.js API begins at the JavaScript layer. For operations that need system access, Node.js native bindings connect that API to lower-level implementation code.',
          'Depending on the operation and platform, work may be handled by the operating system directly or coordinated through libuv and its worker pool. Completion is then reported back to JavaScript through the event loop.',
          'These layers let application code use a consistent API while Node.js adapts to platform-specific facilities underneath.',
        ],
        note: 'Not every asynchronous API uses the libuv thread pool; network I/O is commonly driven by operating-system readiness mechanisms.',
        interviewQuestion: 'What roles do V8 and libuv play inside Node.js?',
      },
    ],
  },
  {
    id: 'node-vs-javascript',
    slug: 'node-vs-javascript',
    title: 'Node.js vs JavaScript',
    category: 'Node.js Fundamentals',
    description:
      'Separate the JavaScript language from Node.js, the runtime that executes it and adds host APIs.',
    section: '01. Node.js Fundamentals',
    level: 8,
    progress: 0,
    toc: ['The JavaScript language', 'The Node.js runtime', 'Host APIs'],
    sections: [
      {
        heading: 'Language versus runtime',
        explanation: [
          'JavaScript is a programming language. By itself, it does not specify which host services a program can use.',
          'Node.js is one runtime for JavaScript. It uses V8 to execute the language and exposes Node-specific APIs for files, networking, processes, and other system tasks.',
          'The same JavaScript language can run in a browser or in Node.js, but the available host APIs differ. Portable code should rely on shared language features or explicitly account for its runtime.',
        ],
        code: `console.log(typeof document)\nconsole.log(typeof process)`,
        output: `undefined\nobject`,
        note: 'Modern Node.js also supports some web-standard APIs, so runtime differences should be checked API by API rather than assumed wholesale.',
        misconception:
          'Node.js is not a separate programming language; it is a runtime for JavaScript.',
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
  {
    id: 'osi-model',
    slug: 'osi-model',
    title: 'OSI Model',
    category: 'Networking Fundamentals',
    description:
      'Use the seven-layer OSI model to understand how data moves between applications and network hardware.',
    section: '07. Networking Fundamentals',
    level: 26,
    progress: 0,
    toc: ['Seven layers', 'Encapsulation', 'OSI and TCP/IP'],
    sections: [
      {
        heading: 'A map of network responsibilities',
        explanation: [
          'The OSI model is a teaching model that separates communication into seven layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.',
          'The lower layers move signals and packets between devices. The Network layer routes between networks, the Transport layer delivers data to application ports, and the upper layers describe application data and communication context.',
          'Real Internet protocols do not always fit neatly into one OSI layer. TCP/IP is a practical model with fewer layers; use OSI as a vocabulary for reasoning, not as a strict implementation diagram.',
        ],
        note: 'Examples include Ethernet and Wi-Fi at the link layer, IP at the network layer, TCP or UDP at transport, and HTTP at the application layer.',
        practiceQuestion:
          'Which OSI layer uses port numbers to deliver data to the right process?',
      },
      {
        heading: 'Encapsulation',
        explanation: [
          'As application data is sent, each layer adds the information needed for its part of the journey. A transport segment is carried inside an IP packet, which is carried inside a link-layer frame.',
          'At the receiving end, each layer processes and removes its own header before passing the remaining data upward.',
        ],
      },
    ],
  },
  {
    id: 'tcp-and-ports',
    slug: 'tcp-and-ports',
    title: 'TCP and Ports',
    category: 'Networking Fundamentals',
    description:
      'Learn how TCP provides ordered byte streams and how port numbers identify network services.',
    section: '07. Networking Fundamentals',
    level: 27,
    progress: 0,
    toc: [
      'IP addresses and ports',
      'Reliable byte streams',
      'Connection lifecycle',
    ],
    sections: [
      {
        heading: 'Deliver data to the right service',
        explanation: [
          'An IP address identifies a network interface for routing. A TCP port identifies an endpoint on a host, helping the operating system deliver incoming data to the correct socket.',
          'TCP provides a reliable, ordered byte stream between endpoints. It retransmits lost data and applies flow and congestion control, but it does not preserve application message boundaries.',
          'Ports are 16-bit numbers from 0 through 65535. A server listens on a port, while each connection is identified by its endpoint addresses and ports.',
        ],
        note: 'TCP does not encrypt traffic. Applications commonly use TLS above TCP when confidentiality and peer authentication are required.',
        interviewQuestion:
          'Why does TCP provide a byte stream instead of separate messages?',
      },
    ],
  },
  {
    id: 'tcp-three-way-handshake',
    slug: 'tcp-three-way-handshake',
    title: 'TCP Three-Way Handshake',
    category: 'Networking Fundamentals',
    description:
      'Follow SYN, SYN-ACK, and ACK as two hosts establish a TCP connection.',
    section: '07. Networking Fundamentals',
    level: 28,
    progress: 0,
    toc: ['SYN', 'SYN-ACK', 'ACK', 'After connection setup'],
    sections: [
      {
        heading: 'Establishing a TCP connection',
        explanation: [
          'The client starts by sending SYN with an initial sequence number. This requests a connection and tells the server where the client sequence space begins.',
          'The server responds with SYN-ACK: it acknowledges the client sequence number and provides its own initial sequence number.',
          'The client replies with ACK. Both sides have now exchanged initial sequence information and can send application data.',
        ],
        note: 'The handshake synchronizes TCP state; it does not encrypt data or prove a human identity. TLS performs encryption and certificate-based peer authentication above TCP.',
        practiceQuestion:
          'What information does the server acknowledge in its SYN-ACK?',
      },
    ],
  },
  {
    id: 'udp',
    slug: 'udp',
    title: 'UDP',
    category: 'Networking Fundamentals',
    description:
      'Understand connectionless datagrams and why applications may choose UDP over TCP.',
    section: '07. Networking Fundamentals',
    level: 29,
    progress: 0,
    toc: ['Datagrams', 'Trade-offs', 'Common uses'],
    sections: [
      {
        heading: 'A lightweight transport protocol',
        explanation: [
          'UDP sends independent datagrams between IP endpoints. It includes source and destination ports, length, and a checksum, but no connection handshake or built-in retransmission and ordering.',
          'This smaller transport contract can be useful when an application values low overhead, tolerates some loss, or implements its own reliability and congestion behavior.',
          'Common examples include real-time media, DNS queries, and protocols such as QUIC. A UDP datagram may be lost, duplicated, or arrive out of order, so applications must account for those possibilities.',
        ],
        misconception:
          'UDP is not inherently secure or guaranteed to be faster in every situation. Security and reliability must come from the application protocol when needed.',
      },
    ],
  },
  {
    id: 'quic',
    slug: 'quic',
    title: 'QUIC',
    category: 'Networking Fundamentals',
    description:
      'Explore the secure, multiplexed transport protocol used by HTTP/3 over UDP.',
    section: '07. Networking Fundamentals',
    level: 30,
    progress: 0,
    toc: [
      'Built on UDP',
      'TLS 1.3 security',
      'Streams and connection migration',
    ],
    sections: [
      {
        heading: 'Modern transport over UDP',
        explanation: [
          'QUIC is a transport protocol carried in UDP datagrams. It implements reliable streams, congestion control, and encryption instead of relying on TCP for those features.',
          'QUIC integrates a TLS 1.3 handshake and supports multiple independent streams. Loss affecting one stream need not block delivery to every other stream as it can with a single TCP byte stream.',
          'Connection IDs can help a QUIC connection survive some changes in the client network path, such as switching between Wi-Fi and cellular. HTTP/3 uses QUIC.',
        ],
        note: 'QUIC is not simply a faster UDP setting; it is a complete transport protocol with its own connection and security machinery.',
      },
    ],
  },
  {
    id: 'ip-and-routing',
    slug: 'ip-and-routing',
    title: 'IP and Routing',
    category: 'Networking Fundamentals',
    description:
      'Learn how IPv4 and IPv6 addresses help routers forward packets between networks.',
    section: '07. Networking Fundamentals',
    level: 31,
    progress: 0,
    toc: ['IP addresses', 'Routers and next hops', 'ICMP and diagnostics'],
    sections: [
      {
        heading: 'Move packets between networks',
        explanation: [
          'The Internet Protocol provides addressing and packet forwarding across interconnected networks. IPv4 uses 32-bit addresses; IPv6 uses 128-bit addresses and a much larger address space.',
          'A host checks whether a destination is on its local network. For a remote destination, it sends the packet to a router, which consults its routing table to choose a next hop.',
          'IP offers best-effort delivery: it does not by itself promise that packets arrive, arrive once, or arrive in order. ICMP carries network diagnostics and error information, while tools such as ping use ICMP echo messages where permitted.',
        ],
        note: 'IPsec is a suite for protecting IP traffic. It is separate from TLS, which typically protects application traffic between endpoints.',
        practiceQuestion:
          'What does a router use to decide where to forward an IP packet?',
      },
    ],
  },
  {
    id: 'tls-and-encryption',
    slug: 'tls-and-encryption',
    title: 'TLS and Encryption',
    category: 'Networking Fundamentals',
    description:
      'Understand how TLS protects data in transit and how certificates help authenticate servers.',
    section: '07. Networking Fundamentals',
    level: 32,
    progress: 0,
    toc: ['Confidentiality and integrity', 'Certificates', 'TLS handshake'],
    sections: [
      {
        heading: 'Protecting a connection with TLS',
        explanation: [
          'TLS provides encryption, integrity checks, and usually server authentication for data exchanged over a connection. HTTPS is HTTP carried over TLS.',
          'During the handshake, peers negotiate cryptographic settings and establish shared keys. A server presents a certificate that the client validates against trusted certificate authorities and the requested hostname.',
          'TLS commonly runs over TCP for protocols such as HTTPS over HTTP/1.1 or HTTP/2. QUIC integrates TLS 1.3 as part of its transport design.',
        ],
        note: 'SSL is obsolete and should not be enabled. Use current TLS versions and keep certificate validation enabled.',
        misconception:
          'Encryption alone does not guarantee that you connected to the intended server; certificate and hostname validation matter.',
      },
    ],
  },
  {
    id: 'connections-and-sessions',
    slug: 'connections-and-sessions',
    title: 'Connections and Sessions',
    category: 'Networking Fundamentals',
    description:
      'Separate transport connections from application sessions and learn how each is created and reused.',
    section: '07. Networking Fundamentals',
    level: 33,
    progress: 0,
    toc: [
      'Transport connection',
      'Application session',
      'Keep-alive and proxies',
    ],
    sections: [
      {
        heading: 'Connection is not the same as session',
        explanation: [
          'A transport connection is communication state maintained by a protocol such as TCP or QUIC. A TCP connection is identified by its endpoint addresses and ports and is closed when either side or the network stack ends it.',
          'An application session represents context meaningful to an application, such as a signed-in user or a multi-step workflow. It can persist across multiple transport connections using a cookie or token.',
          'HTTP keep-alive allows requests to reuse a connection. Proxies and load balancers can terminate one connection and establish another, so applications should not assume that a client connection maps directly to a server-side connection.',
        ],
        note: 'Session-layer examples such as SIP or SOCKS describe different kinds of coordination; the OSI session layer is a conceptual model, not a single universal service.',
      },
    ],
  },
  {
    id: 'ethernet-and-wifi',
    slug: 'ethernet-and-wifi',
    title: 'Ethernet and Wi-Fi',
    category: 'Networking Fundamentals',
    description:
      'See how local links carry frames between devices over wired Ethernet or wireless LANs.',
    section: '07. Networking Fundamentals',
    level: 34,
    progress: 0,
    toc: ['Frames and MAC addresses', 'Switches', 'Wireless links'],
    sections: [
      {
        heading: 'Communication on a local link',
        explanation: [
          'Ethernet and Wi-Fi carry link-layer frames across a local network. Frames use link-layer addressing to reach a nearby interface; switches use this information to forward Ethernet traffic within a LAN.',
          'Wi-Fi uses radio and the IEEE 802.11 family to connect devices to a wireless access point. The access point typically bridges wireless devices to the local network.',
          'A MAC address is commonly represented as six hexadecimal octets. It identifies a link-layer interface for local delivery, while IP addresses are used for routing between networks.',
        ],
        note: 'A MAC address is not a reliable identity or security credential; addresses can be changed or randomized by devices.',
      },
    ],
  },
  {
    id: 'arp-and-mac-addresses',
    slug: 'arp-and-mac-addresses',
    title: 'ARP and MAC Addresses',
    category: 'Networking Fundamentals',
    description:
      'Learn how IPv4 hosts discover a local link address before sending a frame.',
    section: '07. Networking Fundamentals',
    level: 35,
    progress: 0,
    toc: ['Neighbor lookup', 'ARP cache', 'IPv6 Neighbor Discovery'],
    sections: [
      {
        heading: 'Finding the next link-layer destination',
        explanation: [
          'When an IPv4 host needs to send a packet on its local network, it needs the destination MAC address for the next hop. ARP asks the local network which interface owns a particular IPv4 address.',
          'The result is stored temporarily in an ARP cache, which avoids repeating the lookup for every packet. On Windows and Linux, `arp -a` can display cached IPv4 neighbor entries.',
          'If the destination IP is remote, the host resolves the MAC address of its default gateway instead of looking for the remote host on the local link. IPv6 uses Neighbor Discovery Protocol rather than ARP.',
        ],
        note: 'Because classic ARP has no authentication, local networks can be exposed to spoofed replies. Network protections and encrypted application protocols address different parts of that risk.',
      },
    ],
  },
  {
    id: 'vlans',
    slug: 'vlans',
    title: 'VLANs',
    category: 'Networking Fundamentals',
    description:
      'Understand how switches use VLAN tags to separate logical networks over shared infrastructure.',
    section: '07. Networking Fundamentals',
    level: 36,
    progress: 0,
    toc: ['VLAN IDs', 'Access and trunk ports', 'Routing between VLANs'],
    sections: [
      {
        heading: 'Segment a switched network',
        explanation: [
          'A Virtual LAN divides a switched network into separate logical broadcast domains. Devices in different VLANs are isolated at Layer 2 unless a router or Layer 3 switch routes between them.',
          'On a trunk link, Ethernet frames can carry an IEEE 802.1Q VLAN tag so multiple VLANs can cross the same physical link. An access port usually associates an endpoint with one VLAN and sends ordinary untagged frames to it.',
          'VLANs help organize networks and limit broadcast scope, but they are not a substitute for firewalls or other security controls.',
        ],
        practiceQuestion:
          'What must happen for two devices in different VLANs to communicate?',
      },
    ],
  },
]

export const learningLessons: Lesson[] = [
  ...javascriptLessons,
  ...reactTopicLessons,
  ...nodeLessons,
  ...technologyLessons.map((lesson) => ({
    ...lesson,
    technology: lesson.technology ?? lesson.slug,
  })),
]

export function lessonPath(lesson: Lesson) {
  return `/learn/${lesson.technology ?? 'node'}/${lesson.slug}`
}

export const lessonBySlug = Object.fromEntries(
  learningLessons.map((lesson) => [lesson.slug, lesson]),
)
