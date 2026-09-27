import type { Lesson } from '../types'

const javascriptReferences = [
  {
    label: 'MDN JavaScript Guide',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
  },
  {
    label: 'MDN JavaScript execution model',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model',
  },
  {
    label: 'MDN Promise reference',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
  },
]

export const javascriptLessons: Lesson[] = [
  {
    id: 'javascript-fundamentals',
    slug: 'fundamentals',
    technology: 'javascript',
    title: 'JavaScript Fundamentals',
    category: 'JavaScript',
    description:
      'Build a dependable mental model for values, declarations, control flow, functions, scope, and hoisting.',
    section: '01. Fundamentals',
    level: 1,
    difficulty: 'beginner',
    prerequisites: ['Basic computer literacy'],
    concepts: [
      'Variables',
      'Data Types',
      'Type Coercion',
      'Operators',
      'Conditions',
      'Loops',
      'Functions',
      'Arrow Functions',
      'Scope',
      'Hoisting',
    ],
    progress: 0,
    toc: [
      'Variables and declarations',
      'Data types and coercion',
      'Operators and conditions',
      'Loops and iteration',
      'Functions and arrow functions',
      'Scope and closures preview',
      'Hoisting and the temporal dead zone',
    ],
    references: javascriptReferences,
    sections: [
      {
        heading: 'Variables and declarations',
        difficulty: 'beginner',
        explanation: [
          'A variable binding gives a readable name to a value. Prefer const when the binding will not be reassigned, and use let when reassignment is part of the algorithm. Avoid var in new code because its function scope and hoisting rules are easier to misuse.',
          'const prevents rebinding, not mutation of an object stored in the binding. For example, a const array can still have items pushed into it. Choose immutable updates when shared state must be predictable.',
        ],
        whyItMatters:
          'Clear declarations reduce accidental state changes and make data flow easier to review.',
        realWorldExample:
          'A request handler can keep the validated request ID in a const binding while using let for a retry counter that changes.',
        code: `const requestId = 'req-42'\nlet retryCount = 0\nretryCount += 1\nconsole.log(requestId, retryCount)`,
        output: `req-42 1`,
        commonMistakes: [
          'Treating const as deep immutability.',
          'Using var for block-local values.',
        ],
        bestPractices: [
          'Default to const.',
          'Use descriptive names and narrow mutation.',
        ],
        practiceTask:
          'Declare a fixed tax rate and a mutable subtotal, then calculate a total.',
      },
      {
        heading: 'Data types and coercion',
        difficulty: 'beginner',
        explanation: [
          'JavaScript values include primitives such as string, number, bigint, boolean, undefined, symbol, and null, plus objects. Arrays and functions are objects with specialized behavior.',
          'Operators sometimes convert values implicitly. For example, the plus operator concatenates if either operand becomes a string, while subtraction converts operands to numbers. Use explicit conversion and strict equality when intent should be obvious.',
        ],
        whyItMatters:
          'Understanding runtime types prevents bugs at input boundaries, in comparisons, and in calculations.',
        realWorldExample:
          'HTML form values arrive as strings; convert and validate them before using them as quantities or prices.',
        code: `console.log('5' + 2)\nconsole.log('5' - 2)\nconsole.log(Number('5') + 2)`,
        output: `52\n3\n7`,
        commonMistakes: [
          'Assuming form values are already numeric.',
          'Using == without understanding its conversions.',
        ],
        bestPractices: [
          'Prefer === and !==.',
          'Parse external input explicitly and validate NaN/range.',
        ],
        practiceTask:
          'Convert the string "18" into a number and reject values that are not finite.',
      },
      {
        heading: 'Operators and conditions',
        difficulty: 'beginner',
        explanation: [
          'Operators compute values or compare values. Logical operators && and || short-circuit and return operands, while ?? chooses a fallback only for null or undefined.',
          'Conditions use truthiness, but values such as 0 and an empty string are falsy. When zero or an empty string is valid data, compare explicitly instead of relying on a truthy check.',
        ],
        whyItMatters:
          'Precise conditions protect business rules such as discounts, permissions, and optional settings.',
        realWorldExample:
          'Use a nullish fallback for a configured retry count so a deliberate value of zero is preserved.',
        code: `const configuredRetries = 0\nconst retries = configuredRetries ?? 3\nconsole.log(retries)\nconsole.log(Boolean(''))`,
        output: `0\nfalse`,
        commonMistakes: [
          'Using || when zero or an empty string is meaningful.',
          'Combining many conditions without naming intermediate intent.',
        ],
        bestPractices: [
          'Use ?? for absent values.',
          'Extract complex predicates into named functions.',
        ],
        practiceTask:
          'Write a condition that accepts quantities from 1 through 10, inclusive.',
      },
      {
        heading: 'Loops and iteration',
        difficulty: 'beginner',
        explanation: [
          'Loops repeat work. Use for...of to visit values in an iterable such as an array or string; use a counted for loop when the index is part of the logic.',
          'for...in enumerates property keys and is generally not the right way to process array values. Array methods such as map, filter, and reduce express common transformations declaratively.',
        ],
        whyItMatters:
          'Choosing the right iteration form keeps collection processing correct and readable.',
        realWorldExample:
          'A product listing can filter unavailable items and then map the remaining records into view models.',
        code: `const prices = [8, 12, 20]\nlet total = 0\nfor (const price of prices) total += price\nconsole.log(total)`,
        output: `40`,
        commonMistakes: [
          'Mutating a collection while iterating without a clear plan.',
          'Using for...in for array values.',
        ],
        bestPractices: [
          'Choose iteration based on intent.',
          'Keep each loop body small and test edge cases.',
        ],
        practiceTask:
          'Sum only positive numbers from an array without changing the original array.',
      },
      {
        heading: 'Functions and arrow functions',
        difficulty: 'beginner',
        explanation: [
          'Functions package behavior and can accept parameters and return values. Function declarations are hoisted within their scope; function expressions are values assigned to bindings.',
          'Arrow functions provide concise syntax and capture this from the surrounding scope. They do not have their own this, arguments, or constructor behavior, so they are not a drop-in replacement for every function.',
        ],
        whyItMatters:
          'Small, pure functions are easier to reuse, test, and reason about than duplicated inline logic.',
        realWorldExample:
          'A sort comparator or event callback can be an arrow function, while an object method may need its own dynamic this behavior.',
        code: `function addTax(price, rate) {\n  return price * (1 + rate)\n}\nconst formatPrice = (price) => price.toFixed(2)\nconsole.log(formatPrice(addTax(10, 0.1)))`,
        output: `11.00`,
        commonMistakes: [
          'Expecting an arrow function to define its own this.',
          'Forgetting to return from a block-bodied arrow function.',
        ],
        bestPractices: [
          'Name nontrivial functions.',
          'Keep calculation functions pure when possible.',
        ],
        practiceTask:
          'Write a function that accepts an array and returns its largest value, including an empty-array policy.',
      },
      {
        heading: 'Scope and closures preview',
        difficulty: 'beginner',
        explanation: [
          'Scope determines where a binding can be accessed. let and const are block-scoped; var is function-scoped. Inner functions can access bindings from their outer lexical scopes.',
          'A closure is a function together with access to the lexical bindings around where it was created. This lets a function preserve private state after its outer function has returned.',
        ],
        whyItMatters:
          'Lexical scope underlies callbacks, module privacy, event handlers, and many stateful JavaScript patterns.',
        realWorldExample:
          'A factory can return a function that remembers a retry count without exposing that counter globally.',
        code: `function makeCounter() {\n  let count = 0\n  return () => ++count\n}\nconst next = makeCounter()\nconsole.log(next(), next())`,
        output: `1 2`,
        commonMistakes: [
          'Assuming a block-scoped binding is visible outside its block.',
          'Creating closures over mutable loop variables without understanding their binding.',
        ],
        bestPractices: [
          'Keep state ownership explicit.',
          'Use closures intentionally to encapsulate small private state.',
        ],
        practiceTask:
          'Create a function that returns a greeting function which remembers a supplied name.',
      },
      {
        heading: 'Hoisting and the temporal dead zone',
        difficulty: 'intermediate',
        explanation: [
          'Before execution, JavaScript creates bindings for declarations in their scopes. Function declarations can be called before their source line, while let and const bindings exist but cannot be accessed before initialization.',
          'That inaccessible region is the temporal dead zone. var behaves differently: its binding is initialized to undefined, which can hide ordering mistakes.',
        ],
        whyItMatters:
          'Knowing declaration initialization rules explains surprising ReferenceErrors and undefined values.',
        realWorldExample:
          'Module initialization order and refactoring declarations can expose temporal-dead-zone errors.',
        code: `sayHello()\nfunction sayHello() { console.log('hello') }\n\n// Accessing a let binding before its declaration would throw.`,
        output: `hello`,
        commonMistakes: [
          'Describing let and const as simply “not hoisted.”',
          'Relying on var hoisting to make code run.',
        ],
        bestPractices: [
          'Declare bindings close to first use.',
          'Prefer module structure that avoids order-sensitive initialization.',
        ],
        practiceTask:
          'Predict which of var, let, const, and a function declaration can be read before their declaration line.',
        interviewQuestion:
          'How does the temporal dead zone differ from a var binding initialized to undefined?',
      },
    ],
  },
  {
    id: 'javascript-core',
    slug: 'core',
    technology: 'javascript',
    title: 'JavaScript Core Concepts',
    category: 'JavaScript',
    description:
      'Work confidently with arrays, objects, functions as values, prototypes, and the behavior of this.',
    section: '02. Core Concepts',
    level: 2,
    difficulty: 'intermediate',
    prerequisites: ['JavaScript Fundamentals'],
    concepts: [
      'Arrays',
      'Objects',
      'Destructuring',
      'Spread and Rest',
      'Spread / Rest',
      'Array Methods',
      'Object Methods',
      'Closures',
      'this',
      'call',
      'apply',
      'bind',
    ],
    progress: 0,
    toc: [
      'Arrays and array methods',
      'Objects and object methods',
      'Destructuring, spread, and rest',
      'Closures and private state',
      'this, call, apply, and bind',
    ],
    references: javascriptReferences,
    sections: [
      {
        heading: 'Arrays and array methods',
        difficulty: 'beginner',
        explanation: [
          'Arrays are ordered, zero-indexed collections. map transforms each element, filter selects elements, find returns the first match, and reduce combines values into an accumulator.',
          'Methods such as sort and splice mutate their receiver, while map, filter, and slice return new arrays. Mutation is not inherently wrong, but it should be intentional when values are shared.',
        ],
        whyItMatters:
          'Collection operations are central to API response handling and UI state.',
        realWorldExample:
          'Filter active orders, then map them into a compact response DTO.',
        code: `const orders = [{ total: 12 }, { total: 30 }, { total: 8 }]\nconst largeTotals = orders.filter((order) => order.total >= 10).map((order) => order.total)\nconsole.log(largeTotals)`,
        output: `[ 12, 30 ]`,
        commonMistakes: [
          'Using map when the result is discarded.',
          'Assuming sort leaves the original array unchanged.',
        ],
        bestPractices: [
          'Choose methods that express intent.',
          'Copy before using a mutating method when the source must stay unchanged.',
        ],
        practiceTask:
          'Return the names of enabled users, sorted alphabetically, without mutating the input.',
      },
      {
        heading: 'Objects and object methods',
        difficulty: 'beginner',
        explanation: [
          'Objects associate property keys with values. Properties may be data or accessors, and methods are functions stored on objects.',
          'Object.keys, Object.values, and Object.entries help inspect own enumerable properties. The in operator checks the object and its prototype chain; Object.hasOwn checks for an own property.',
        ],
        whyItMatters:
          'Objects are the basic representation for records, options, and many API values.',
        realWorldExample:
          'A configuration object can collect related timeout and retry settings under named keys.',
        code: `const config = { timeout: 2500, retries: 2 }\nconsole.log(Object.entries(config))\nconsole.log(Object.hasOwn(config, 'timeout'))`,
        output: `[ [ 'timeout', 2500 ], [ 'retries', 2 ] ]\ntrue`,
        commonMistakes: [
          'Using for...in without checking inherited properties.',
          'Assuming object property order is a data-model guarantee.',
        ],
        bestPractices: [
          'Use plain objects for records.',
          'Use Map when keys are dynamic and not naturally strings/symbols.',
        ],
        practiceTask:
          'Create a new object that omits a secret field without modifying the source object.',
      },
      {
        heading: 'Destructuring, spread, and rest',
        difficulty: 'beginner',
        explanation: [
          'Destructuring extracts values from arrays or properties from objects into local bindings. Defaults apply when a value is undefined, not whenever it is falsy.',
          'Spread expands iterable items or enumerable object properties into a new array/object. Rest gathers remaining values. Object spread is shallow, so nested references remain shared.',
        ],
        whyItMatters:
          'These syntax features make transformations and function signatures concise while preserving explicit data flow.',
        realWorldExample:
          'A UI can update one property with `{ ...state, loading: false }` while retaining other fields.',
        code: `const user = { id: 7, name: 'Mina', active: true }\nconst { name, ...publicUser } = user\nconst updated = { ...publicUser, active: false }\nconsole.log(name, updated)`,
        output: `Mina { id: 7, active: false }`,
        commonMistakes: [
          'Expecting spread to deep-clone nested objects.',
          'Using a destructuring default for null values.',
        ],
        bestPractices: [
          'Treat spread as a shallow copy.',
          'Validate optional values at boundaries.',
        ],
        practiceTask:
          'Extract the first array item and collect all remaining values into a second array.',
      },
      {
        heading: 'Closures and private state',
        difficulty: 'intermediate',
        explanation: [
          'A closure retains access to lexical bindings from the function’s creation environment, even after the outer function has returned.',
          'Closures are useful for factories and encapsulation, but retained references also keep reachable objects alive. Long-lived callbacks should not accidentally retain large data structures.',
        ],
        whyItMatters:
          'Closures power callbacks, event listeners, and private state in ordinary functions.',
        realWorldExample:
          'A rate limiter can close over a timestamp without exposing its bookkeeping object.',
        code: `function makeIdGenerator(prefix) {\n  let nextId = 1\n  return () => \`${'${prefix}'}-${'${nextId++}'}\`\n}\nconst createOrderId = makeIdGenerator('order')\nconsole.log(createOrderId(), createOrderId())`,
        output: `order-1 order-2`,
        commonMistakes: [
          'Assuming a closure snapshots values rather than retaining bindings.',
          'Keeping listeners alive after their owning view is gone.',
        ],
        bestPractices: [
          'Release subscriptions during cleanup.',
          'Keep closure state small and ownership clear.',
        ],
        practiceTask:
          'Implement a counter with increment, decrement, and read operations while keeping its value private.',
        interviewQuestion:
          'What exactly does a closure retain, and how can that affect memory?',
      },
      {
        heading: 'this, call, apply, and bind',
        difficulty: 'intermediate',
        explanation: [
          'For ordinary functions, this is generally determined by how the function is called, not where it was defined. A method call uses the receiver before the dot; extracting the function can lose that receiver.',
          'call invokes a function with a chosen this and individual arguments; apply does so with an argument array; bind returns a new function with this and optionally leading arguments fixed. Arrow functions capture this lexically and cannot be rebound this way.',
        ],
        whyItMatters:
          'Correct receiver behavior matters in callbacks, event handlers, and legacy APIs.',
        realWorldExample:
          'Binding a method before passing it as a callback preserves its owning instance.',
        code: `const user = { name: 'Rae', say(prefix) { return prefix + this.name } }\nconst say = user.say.bind(user, 'Hi, ')\nconsole.log(say())`,
        output: `Hi, Rae`,
        commonMistakes: [
          'Assuming method this is permanently attached to the object.',
          'Using bind on an arrow function expecting to change its lexical this.',
        ],
        bestPractices: [
          'Prefer closures or arrow callbacks when that makes ownership clearer.',
          'Choose call/apply/bind only when receiver control is needed.',
        ],
        practiceTask:
          'Extract a method from an object and preserve the receiver when passing it to a callback.',
        interviewQuestion: 'How do call, apply, and bind differ?',
      },
    ],
  },
  {
    id: 'javascript-async',
    slug: 'async',
    technology: 'javascript',
    title: 'Asynchronous JavaScript',
    category: 'JavaScript',
    description:
      'Trace synchronous execution, jobs, callbacks, promises, and async functions without confusing concurrency with parallelism.',
    section: '03. Async JavaScript',
    level: 3,
    difficulty: 'intermediate',
    prerequisites: ['JavaScript Fundamentals', 'Functions and closures'],
    concepts: [
      'Call Stack',
      'Web APIs',
      'Host APIs',
      'Callback Queue',
      'Event Loop',
      'Microtasks',
      'Macrotasks',
      'Callbacks',
      'Promises',
      'Promise Chaining',
      'Promise Chaining',
      'async/await',
      'Promise.all',
      'Promise.allSettled',
      'Promise.race',
      'Promise.any',
    ],
    progress: 0,
    toc: [
      'Call stack and run-to-completion',
      'Host APIs and queued callbacks',
      'Tasks and microtasks',
      'Callbacks and error-first conventions',
      'Promises and chaining',
      'async/await and error handling',
      'Promise concurrency methods',
      'Event loop output-prediction lab',
    ],
    references: [
      ...javascriptReferences,
      {
        label: 'MDN Using promises',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises',
      },
    ],
    lab: {
      title: 'Predict and verify the event loop',
      objective:
        'Complete the missing Promise callback, run the code, and submit when synchronous code, microtasks, and timer tasks print in the correct order.',
      starterCode: `console.log('sync: start')\n\nsetTimeout(() => {\n  console.log('task: timer')\n}, 0)\n\nPromise.resolve().then(() => {\n  // Add the microtask log here.\n})\n\nconsole.log('sync: end')`,
      expectedOutput: 'sync: start\nsync: end\nmicrotask: promise\ntask: timer',
      solution: `console.log('sync: start')\n\nsetTimeout(() => {\n  console.log('task: timer')\n}, 0)\n\nPromise.resolve().then(() => {\n  console.log('microtask: promise')\n})\n\nconsole.log('sync: end')`,
      hints: [
        'The current synchronous job runs to completion before queued callbacks run.',
        'A Promise reaction is queued as a microtask; a timer callback is a task.',
        "Put console.log('microtask: promise') inside the .then() callback.",
      ],
    },
    sections: [
      {
        heading: 'Call stack and run-to-completion',
        difficulty: 'beginner',
        explanation: [
          'Function calls create execution contexts tracked on a last-in, first-out call stack. JavaScript runs the current job to completion before another job in the same agent begins.',
          'Long synchronous work therefore blocks that agent from processing other queued work. “Asynchronous” does not mean a callback interrupts the currently running function.',
        ],
        whyItMatters:
          'This model explains why a CPU-heavy loop can freeze a browser interaction or stall a Node.js request handler.',
        realWorldExample:
          'Move large CPU-bound calculations into a worker when the UI or server event loop must remain responsive.',
        code: `function inner() { console.log('inner') }\nfunction outer() { inner(); console.log('outer') }\nouter()`,
        output: `inner\nouter`,
        bestPractices: [
          'Keep event-loop callbacks short.',
          'Use workers for CPU-heavy work when parallel execution is needed.',
        ],
        practiceTask:
          'Draw the call stack after each call in a three-function nested call.',
      },
      {
        heading: 'Host APIs and queued callbacks',
        difficulty: 'beginner',
        explanation: [
          'The JavaScript engine implements the language; a host environment supplies timers, I/O, and other external capabilities. Browsers and Node.js provide different host APIs.',
          'When an asynchronous host operation completes, its callback or Promise reaction becomes eligible to run later. The exact queues and scheduling rules depend on the host specification.',
        ],
        whyItMatters:
          'It separates language guarantees from browser and Node runtime behavior.',
        realWorldExample:
          'fetch and DOM events are browser host APIs; filesystem and process APIs are Node.js host APIs.',
        note: 'MDN describes the execution model abstractly; browser task scheduling and Node.js phases are related but not identical.',
        practiceTask:
          'List which APIs in a small code sample come from ECMAScript and which come from its host.',
      },
      {
        heading: 'Tasks and microtasks',
        difficulty: 'intermediate',
        explanation: [
          'In browser terminology, tasks include many timer and event callbacks. Promise reactions are microtasks. After the current stack empties, the host drains queued microtasks before selecting the next task.',
          'A microtask can enqueue another microtask, so a continually replenished microtask queue can delay tasks and rendering. Do not assume every host uses exactly the same queue names or ordering rules.',
        ],
        whyItMatters:
          'Queue ordering is a frequent source of incorrect output predictions and UI responsiveness problems.',
        realWorldExample:
          'A Promise callback often runs before a timer callback scheduled in the same synchronous turn.',
        code: `console.log('A')\nsetTimeout(() => console.log('C'), 0)\nPromise.resolve().then(() => console.log('B'))\nconsole.log('D')`,
        output: `A\nD\nB\nC`,
        commonMistakes: [
          'Calling all asynchronous callbacks “macrotasks” as if that were a universal spec term.',
          'Assuming setTimeout(..., 0) runs immediately.',
        ],
        bestPractices: [
          'Describe the host when discussing event-loop order.',
          'Test output in the runtime that will execute the code.',
        ],
        practiceTask:
          'Predict the output after adding a second Promise callback inside the first Promise callback.',
        interviewQuestion:
          'Why does a Promise callback run after synchronous logs but before a timer in common browser and Node examples?',
      },
      {
        heading: 'Callbacks and error-first conventions',
        difficulty: 'beginner',
        explanation: [
          'A callback is a function passed to another operation for later invocation. Callback APIs can report completion through a result parameter or a Node-style error-first signature.',
          'Nested callbacks can obscure control flow and error handling. Promises provide composable settlement and chaining, but callbacks remain common at event and low-level API boundaries.',
        ],
        whyItMatters:
          'Callbacks are still present in event listeners, streams, and many integration APIs.',
        realWorldExample:
          'A Node filesystem callback commonly receives an error first and data second.',
        code: `function readValue(callback) {\n  setTimeout(() => callback(null, 42), 0)\n}\nreadValue((error, value) => {\n  if (error) return console.error(error)\n  console.log(value)\n})`,
        output: `42`,
        commonMistakes: [
          'Ignoring callback errors.',
          'Calling a completion callback more than once.',
        ],
        bestPractices: [
          'Handle errors at every callback boundary.',
          'Convert callback APIs to promises when composition improves clarity.',
        ],
        practiceTask:
          'Add an error result path and ensure the callback is invoked exactly once.',
      },
      {
        heading: 'Promises and chaining',
        difficulty: 'intermediate',
        explanation: [
          'A Promise represents the eventual fulfillment or rejection of an asynchronous operation. A Promise is pending, fulfilled, or rejected; settled means fulfilled or rejected.',
          'then returns a new Promise. Returning a value fulfills that next Promise, returning another Promise adopts its eventual state, and throwing rejects it. catch handles rejection, while finally is suited to cleanup that should happen either way.',
        ],
        whyItMatters:
          'Chaining makes asynchronous dependencies and error propagation explicit.',
        realWorldExample:
          'A service can load a user, then load that user’s settings, and handle failures in one final catch.',
        code: `Promise.resolve(3)\n  .then((value) => value * 2)\n  .then((value) => console.log(value))\n  .catch((error) => console.error(error))`,
        output: `6`,
        commonMistakes: [
          'Forgetting to return a Promise inside then.',
          'Swallowing a rejection accidentally by returning a fallback from catch.',
        ],
        bestPractices: [
          'Return every asynchronous dependency in a chain.',
          'Reject with Error objects and handle failures deliberately.',
        ],
        practiceTask:
          'Chain two transformations and ensure a thrown error reaches one catch handler.',
      },
      {
        heading: 'async/await and error handling',
        difficulty: 'intermediate',
        explanation: [
          'An async function always returns a Promise. await pauses that async function until the awaited value settles; it does not block the JavaScript thread.',
          'Use try/catch around awaited operations when recovery or contextual handling is needed. Parallel independent work should be started before awaiting it, often with Promise.all.',
        ],
        whyItMatters:
          'async/await expresses dependency order in a form that is easier to read and debug.',
        realWorldExample:
          'An HTTP handler can await a repository call and translate known failures into appropriate response behavior.',
        code: `async function loadTotal() {\n  try {\n    const values = await Promise.all([Promise.resolve(4), Promise.resolve(5)])\n    return values.reduce((sum, value) => sum + value, 0)\n  } catch (error) {\n    throw new Error('Could not load total', { cause: error })\n  }\n}\nloadTotal().then(console.log)`,
        output: `9`,
        commonMistakes: [
          'Awaiting independent work sequentially.',
          'Using async without handling or returning its Promise.',
        ],
        bestPractices: [
          'Parallelize independent asynchronous work.',
          'Propagate errors with useful context rather than discarding them.',
        ],
        practiceTask:
          'Fetch two independent values concurrently, then combine them after both finish.',
      },
      {
        heading: 'Promise concurrency methods',
        difficulty: 'advanced',
        explanation: [
          'Promise.all fulfills with ordered results when every input fulfills and rejects as soon as one rejects. Promise.allSettled waits for every input and reports each outcome.',
          'Promise.race settles with the first input to settle. Promise.any fulfills with the first fulfillment and rejects with AggregateError only when every input rejects.',
          'These methods coordinate Promises; they do not automatically cancel losing operations. Use an underlying cancellation mechanism such as AbortController when the work should stop.',
        ],
        whyItMatters:
          'Selecting the correct combinator determines failure policy, latency, and resource cleanup.',
        realWorldExample:
          'Use all for required independent profile data, allSettled for best-effort widgets, and race for a timeout wrapper paired with cancellation.',
        code: `const results = await Promise.allSettled([\n  Promise.resolve('profile'),\n  Promise.reject(new Error('recommendations unavailable')),\n])\nconsole.log(results.map((item) => item.status))`,
        output: `[ 'fulfilled', 'rejected' ]`,
        commonMistakes: [
          'Assuming race cancels unfinished work.',
          'Using allSettled when every result is required for correctness.',
        ],
        bestPractices: [
          'Choose the method from the desired failure semantics.',
          'Bound work and cancel operations that are no longer useful.',
        ],
        practiceTask:
          'Choose a Promise combinator for a page where the main record is required but recommendations are optional.',
        interviewQuestion:
          'Compare Promise.all, allSettled, race, and any in terms of when their result settles.',
      },
    ],
  },
  {
    id: 'javascript-advanced',
    slug: 'advanced',
    technology: 'javascript',
    title: 'Advanced JavaScript',
    category: 'JavaScript',
    description:
      'Understand prototypes, classes, modules, generators, memory behavior, and practical function utilities.',
    section: '04. Advanced Concepts',
    level: 4,
    difficulty: 'advanced',
    prerequisites: ['JavaScript Core Concepts', 'Asynchronous JavaScript'],
    concepts: [
      'Prototypes',
      'Prototype Chain',
      'Prototype Chain',
      'Classes',
      'Modules',
      'Iterators',
      'Generators',
      'Memory',
      'Garbage Collection',
      'Debouncing',
      'Throttling',
      'EventEmitter',
    ],
    progress: 0,
    toc: [
      'Prototypes and the prototype chain',
      'Classes and inheritance',
      'JavaScript modules',
      'Iterators and generators',
      'Memory and garbage collection',
      'Debouncing and throttling',
      'EventEmitter and event-driven design',
    ],
    references: [
      ...javascriptReferences,
      {
        label: 'MDN Inheritance and the prototype chain',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain',
      },
      {
        label: 'Node.js EventEmitter',
        url: 'https://nodejs.org/api/events.html',
      },
    ],
    sections: [
      {
        heading: 'Prototypes and the prototype chain',
        difficulty: 'advanced',
        explanation: [
          'Objects can delegate property lookup to another object through their internal prototype link. Lookup walks this chain until it finds an own property or reaches null.',
          'Object.create can make delegation explicit. JavaScript classes provide syntax over prototype-based behavior; they do not replace the underlying model.',
        ],
        whyItMatters:
          'Prototype behavior explains inherited methods, property shadowing, and many object-model interview questions.',
        realWorldExample:
          'Instances created from a class share methods on the class prototype rather than allocating a duplicate method per instance.',
        code: `const base = { describe() { return 'base' } }\nconst item = Object.create(base)\nitem.name = 'record'\nconsole.log(item.describe(), Object.hasOwn(item, 'describe'))`,
        output: `base false`,
        commonMistakes: [
          'Confusing an object’s prototype with its constructor property.',
          'Treating inherited properties as own data.',
        ],
        bestPractices: [
          'Use Object.hasOwn for own-property checks.',
          'Prefer composition unless inheritance models a real substitutable relationship.',
        ],
        practiceTask:
          'Create an object that delegates one method to a prototype and shadows one inherited property.',
      },
      {
        heading: 'Classes and inheritance',
        difficulty: 'intermediate',
        explanation: [
          'Class syntax defines constructors and prototype methods. extends establishes a prototype relationship, and super invokes base-class construction or behavior.',
          'Private fields beginning with # are enforced by the language. Inheritance can couple subclasses to base-class details, so small composed objects are often easier to evolve.',
        ],
        whyItMatters:
          'Classes are common in frameworks, libraries, and application models, but understanding their prototype behavior keeps them predictable.',
        realWorldExample:
          'A base error class can carry a code while specialized errors add domain context.',
        code: `class AppError extends Error {\n  constructor(message, code) {\n    super(message)\n    this.code = code\n  }\n}\nconsole.log(new AppError('missing', 'NOT_FOUND').code)`,
        output: `NOT_FOUND`,
        commonMistakes: [
          'Forgetting super before using this in a derived constructor.',
          'Building deep inheritance trees for code reuse.',
        ],
        bestPractices: [
          'Favor shallow hierarchies.',
          'Keep class invariants established in the constructor.',
        ],
        practiceTask:
          'Create a base notification type and a specialized email notification without duplicating shared behavior.',
      },
      {
        heading: 'JavaScript modules',
        difficulty: 'intermediate',
        explanation: [
          'ECMAScript modules use import and export declarations. Named exports make dependencies explicit; default exports provide one primary value. Dynamic import loads a module asynchronously.',
          'Modules have their own scope and are evaluated once per module graph in a given loader context. Browser and Node module resolution rules differ in some details.',
        ],
        whyItMatters:
          'Modules create maintainable boundaries and prevent accidental reliance on global variables.',
        realWorldExample:
          'A price module can export a pure calculation function used by both a checkout flow and tests.',
        code: `// prices.js\nexport function withTax(amount, rate) {\n  return amount * (1 + rate)\n}\n\n// app.js\nimport { withTax } from './prices.js'\nconsole.log(withTax(10, 0.1))`,
        output: `11`,
        commonMistakes: [
          'Mixing CommonJS and ESM assumptions without checking project configuration.',
          'Creating circular dependencies that make initialization order unclear.',
        ],
        bestPractices: [
          'Keep module APIs small.',
          'Prefer explicit named imports for shared utilities.',
        ],
        practiceTask:
          'Split a pure formatter from its caller and export/import it as an ES module.',
      },
      {
        heading: 'Iterators and generators',
        difficulty: 'advanced',
        explanation: [
          'An iterable provides a Symbol.iterator method that returns an iterator. An iterator returns objects with value and done fields from next().',
          'A generator function, declared with function*, creates an iterator whose execution can pause at yield and resume on the next call.',
        ],
        whyItMatters:
          'The iteration protocol supports for...of, custom collections, and lazy sequences.',
        realWorldExample:
          'A generator can lazily page through records so the application does not build one enormous intermediate array.',
        code: `function* ids() {\n  yield 'a'\n  yield 'b'\n}\nconsole.log([...ids()])`,
        output: `[ 'a', 'b' ]`,
        commonMistakes: [
          'Assuming a generator runs when it is created.',
          'Forgetting that an exhausted iterator usually stays exhausted.',
        ],
        bestPractices: [
          'Use laziness when it reduces memory or clarifies streaming.',
          'Keep generator side effects explicit.',
        ],
        practiceTask:
          'Write a generator that yields the first five positive even numbers.',
      },
      {
        heading: 'Memory and garbage collection',
        difficulty: 'advanced',
        explanation: [
          'JavaScript engines manage memory automatically and reclaim objects that are no longer reachable from program roots. Garbage collection does not reclaim objects that remain referenced.',
          'Leaks often come from unintended long-lived references such as global caches, retained closures, timers, or event listeners that are never removed.',
        ],
        whyItMatters:
          'Memory growth can increase latency and eventually terminate a long-running browser tab or service process.',
        realWorldExample:
          'A component that registers a global event listener should remove it when the component is disposed.',
        commonMistakes: [
          'Assuming garbage collection fixes every memory leak.',
          'Keeping unbounded caches without an eviction policy.',
        ],
        bestPractices: [
          'Bound caches and queues.',
          'Use heap snapshots and allocation profiles to investigate measured growth.',
        ],
        practiceTask:
          'Identify which references keep a detached object alive in a small event-listener example.',
        interviewQuestion:
          'Why can an object still leak when JavaScript uses garbage collection?',
      },
      {
        heading: 'Debouncing and throttling',
        difficulty: 'advanced',
        explanation: [
          'Debouncing delays work until a stream of calls has been quiet for a chosen interval. Throttling limits how often work can run during a stream of calls.',
          'These are application-level scheduling patterns, not built-in language primitives. Correct implementations should consider trailing calls, leading calls, cancellation, and preserving arguments and this.',
        ],
        whyItMatters:
          'They control expensive work triggered by high-frequency events such as typing, resizing, or scrolling.',
        realWorldExample:
          'Debounce a search request while a user types; throttle a scroll-position update to a manageable rate.',
        code: `function debounce(callback, delay) {\n  let timer\n  return (...args) => {\n    clearTimeout(timer)\n    timer = setTimeout(() => callback(...args), delay)\n  }\n}`,
        commonMistakes: [
          'Debouncing a required final action without a trailing call.',
          'Losing callback arguments or receiver context.',
        ],
        bestPractices: [
          'Expose cancellation for teardown.',
          'Choose the behavior from the product requirement, not the name alone.',
        ],
        practiceTask:
          'Add a cancel method to a debounced function so pending work can be cleared.',
      },
      {
        heading: 'EventEmitter and event-driven design',
        difficulty: 'advanced',
        explanation: [
          'EventEmitter is a Node.js API, not part of browser ECMAScript. It lets one object emit named events to registered listeners.',
          'Event-driven designs reduce direct coupling, but event names, payloads, listener cleanup, and error behavior still need explicit contracts.',
        ],
        whyItMatters:
          'Node streams, servers, and many libraries use event emitters to report lifecycle and data events.',
        realWorldExample:
          'A worker can emit progress and completion events to a coordinating service.',
        code: `const { EventEmitter } = require('node:events')\nconst bus = new EventEmitter()\nbus.once('ready', (name) => console.log(name))\nbus.emit('ready', 'worker-1')`,
        output: `worker-1`,
        commonMistakes: [
          'Leaving listeners attached indefinitely.',
          'Assuming an emitter event is durable like a message queue.',
        ],
        bestPractices: [
          'Remove listeners when ownership ends.',
          'Use a durable queue when delivery and replay guarantees are required.',
        ],
        practiceTask:
          'Register a one-time completion listener and verify it does not run for a second emission.',
      },
    ],
  },
  {
    id: 'javascript-interview',
    slug: 'interview',
    technology: 'javascript',
    title: 'JavaScript Interview Practice',
    category: 'JavaScript',
    description:
      'Practice output prediction, closures, async ordering, object behavior, and small implementation problems.',
    section: '05. Interview Practice',
    level: 5,
    difficulty: 'interview',
    prerequisites: [
      'JavaScript Fundamentals',
      'JavaScript Core Concepts',
      'Asynchronous JavaScript',
    ],
    concepts: [
      'Output-based questions',
      'Async questions',
      'Closure questions',
      'Event loop questions',
      'Array and object questions',
      'Array/object questions',
      'Coding problems',
    ],
    progress: 0,
    toc: [
      'Output: coercion and evaluation',
      'Output: closures',
      'Output: asynchronous ordering',
      'Output: object references',
      'Coding: group values by key',
      'Coding: debounce',
    ],
    references: javascriptReferences,
    sections: [
      {
        heading: 'Output: coercion and evaluation',
        difficulty: 'interview',
        explanation: [
          'Predict each expression using operator rules rather than guessing from appearance. String concatenation and numeric conversion can happen in the same line depending on the operator.',
          'When explaining an answer, state the conversion step and the resulting value. This makes the reasoning auditable and reveals exactly which rule you are applying.',
        ],
        code: `console.log(1 + '2' + 3)\nconsole.log(1 + 2 + '3')`,
        output: `123\n33`,
        interviewQuestion:
          'Why do these expressions produce different strings?',
        practiceQuestion:
          'Predict the result of [] + {} and then explain why such coercions should not be used in application code.',
      },
      {
        heading: 'Output: closures',
        difficulty: 'interview',
        explanation: [
          'A closure retains access to a lexical binding. In modern JavaScript each let binding in a for loop iteration is distinct, while a var declaration has function scope.',
          'Closures keep bindings reachable; they do not freeze the value at the instant the callback is created.',
        ],
        code: `const callbacks = []\nfor (let index = 0; index < 3; index++) {\n  callbacks.push(() => index)\n}\nconsole.log(callbacks.map((callback) => callback()))`,
        output: `[ 0, 1, 2 ]`,
        interviewQuestion:
          'How would changing let to var affect this example, and why?',
      },
      {
        heading: 'Output: asynchronous ordering',
        difficulty: 'interview',
        explanation: [
          'Run synchronous code to completion first. Promise reactions are scheduled after the current stack; timer callbacks are scheduled by the host and run in a later task/phase.',
          'Interview answers should name the runtime when host-specific ordering matters. This example uses ordinary Node.js/browser behavior for a resolved Promise and zero-delay timer.',
        ],
        code: `console.log('one')\nsetTimeout(() => console.log('timer'), 0)\nPromise.resolve().then(() => console.log('promise'))\nconsole.log('two')`,
        output: `one\ntwo\npromise\ntimer`,
        interviewQuestion:
          'Which callback runs first after synchronous execution finishes, and what queueing rule explains it?',
      },
      {
        heading: 'Output: object references',
        difficulty: 'interview',
        explanation: [
          'Assigning an object to another variable copies the reference, not the object. Both bindings can therefore observe mutations to the same object.',
          'A shallow spread creates a new outer object, but nested objects still share references unless they are copied separately.',
        ],
        code: `const source = { settings: { theme: 'dark' } }\nconst copy = { ...source }\ncopy.settings.theme = 'light'\nconsole.log(source.settings.theme)`,
        output: `light`,
        interviewQuestion:
          'What would need to change for the nested settings object to be independent?',
      },
      {
        heading: 'Coding: group values by key',
        difficulty: 'interview',
        explanation: [
          'Implement a grouping helper that accepts records and a key selector, returning a plain object whose values are arrays of records.',
          'Clarify edge cases during an interview: empty input, missing keys, inherited object property names, and whether output order matters.',
        ],
        code: `function groupBy(items, getKey) {\n  return items.reduce((groups, item) => {\n    const key = getKey(item)\n    ;(groups[key] ??= []).push(item)\n    return groups\n  }, Object.create(null))\n}\n\nconst grouped = groupBy(['apple', 'ant', 'berry'], (word) => word[0])\nconsole.log(grouped.a, grouped.b)`,
        output: `[ 'apple', 'ant' ] [ 'berry' ]`,
        practiceTask:
          'Extend groupBy to accept a selector that returns a number, then explain how you would preserve insertion order.',
      },
      {
        heading: 'Coding: debounce',
        difficulty: 'interview',
        explanation: [
          'Implement a function that postpones a callback until no call has occurred for the delay interval. Each new invocation replaces the pending timer.',
          'A complete solution should preserve the latest arguments, return value expectations, receiver behavior, and support cancelation if the caller needs cleanup.',
        ],
        code: `function debounce(callback, delay) {\n  let timer\n  return function (...args) {\n    clearTimeout(timer)\n    timer = setTimeout(() => callback.apply(this, args), delay)\n  }\n}`,
        practiceTask:
          'Add a cancel method and write a small test that verifies rapid calls invoke the callback only once.',
        interviewQuestion:
          'How does debounce differ from throttle, and which is appropriate for continuous scroll updates?',
      },
    ],
  },
]
