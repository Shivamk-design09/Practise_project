import type { Lesson } from '../types'

const reactReferences = [
  { label: 'React Learn', url: 'https://react.dev/learn' },
  { label: 'React API Reference', url: 'https://react.dev/reference/react' },
]

type ReactTopic = {
  slug: string
  title: string
  section: string
  level: number
  difficulty: NonNullable<Lesson['difficulty']>
  description: string
  explanation: string[]
  whyItMatters: string
  realWorldExample: string
  code?: string
  output?: string
  note?: string
  commonMistakes: string[]
  bestPractices: string[]
  practiceTask: string
  interviewQuestion: string
}

const topics: ReactTopic[] = [
  {
    slug: 'components',
    title: 'Components',
    section: '01. Fundamentals',
    level: 2,
    difficulty: 'beginner',
    description:
      'Compose an interface from focused, reusable React components.',
    explanation: [
      'A component is a JavaScript function that returns a description of UI. React calls components to produce a tree of elements, then updates the rendered interface when relevant inputs change.',
      'Component names start with a capital letter. Keep each component responsible for a coherent piece of UI and extract a child when it improves reuse, state ownership, or readability.',
    ],
    whyItMatters:
      'Component boundaries make a growing interface easier to change, test, and reason about.',
    realWorldExample:
      'A product page can compose ProductHeader, Price, StockStatus, and AddToCartButton components.',
    code: `function Price({ amount }) {\n  return <span>${'${amount.toFixed(2)}'}</span>\n}\n\nfunction ProductCard({ product }) {\n  return <article><h2>{product.name}</h2><Price amount={product.price} /></article>\n}`,
    commonMistakes: [
      'Calling a component like an ordinary helper function.',
      'Splitting every line into a separate component without a clear boundary.',
    ],
    bestPractices: [
      'Keep components pure during render.',
      'Name components after the UI concept they represent.',
    ],
    practiceTask:
      'Build a small ProfileCard from an avatar, name, and status child component.',
    interviewQuestion:
      'What makes a function a React component, and how does it differ from calling a helper function?',
  },
  {
    slug: 'jsx',
    title: 'JSX',
    section: '01. Fundamentals',
    level: 3,
    difficulty: 'beginner',
    description:
      'Write UI descriptions with JSX and embed JavaScript expressions safely.',
    explanation: [
      'JSX is syntax transformed by the build tool into React element creation calls. It resembles HTML, but attributes and expressions follow JavaScript conventions.',
      'Use braces for JavaScript expressions, className for CSS classes, and close every element. JSX describes what should render; it is not an HTML string and should not be assembled with string concatenation.',
    ],
    whyItMatters:
      'JSX keeps rendering logic close to the component data and makes UI structure visible in code.',
    realWorldExample:
      'A status badge can choose both its label and class from a validated status value.',
    code: `function Status({ online }) {\n  return <span className={online ? 'status-online' : 'status-away'}>\n    {online ? 'Online' : 'Away'}\n  </span>\n}`,
    commonMistakes: [
      'Using class instead of className.',
      'Putting statements such as if directly inside a JSX expression.',
    ],
    bestPractices: [
      'Extract complex conditional logic into named variables or child components.',
      'Use semantic HTML elements.',
    ],
    practiceTask:
      'Render a heading and an empty-state message only when a result list has no items.',
    interviewQuestion:
      'What does JSX compile to, and why is JSX expression syntax useful?',
  },
  {
    slug: 'props',
    title: 'Props',
    section: '01. Fundamentals',
    level: 4,
    difficulty: 'beginner',
    description:
      'Pass read-only inputs from parent components to their children.',
    explanation: [
      'Props are values supplied by a parent when it renders a component. They can include strings, numbers, objects, arrays, callbacks, and other components.',
      'A component should not mutate its props. When a child needs to request a change, it calls a callback supplied by its owner; the owner updates state and passes the new value down.',
    ],
    whyItMatters:
      'Props make data flow explicit and support predictable component composition.',
    realWorldExample:
      'A reusable button receives its label, disabled state, and click handler as props.',
    code: `function SaveButton({ disabled, onSave }) {\n  return <button disabled={disabled} onClick={onSave}>Save</button>\n}`,
    commonMistakes: [
      'Mutating an object received as a prop.',
      'Copying a prop into state and letting the two values drift apart.',
    ],
    bestPractices: [
      'Keep prop APIs small and purpose-specific.',
      'Pass callbacks when children need to request owner-controlled changes.',
    ],
    practiceTask:
      'Create a reusable Alert component that accepts a message and severity.',
    interviewQuestion: 'How do props flow through a React component tree?',
  },
  {
    slug: 'state-and-events',
    title: 'State and Events',
    section: '01. Fundamentals',
    level: 5,
    difficulty: 'beginner',
    description:
      'Connect user events to state updates and predictable re-renders.',
    explanation: [
      'State is component memory that React tracks between renders. A setter schedules a future render; it does not mutate the state value inside the currently running render.',
      'Event handlers are functions passed to elements. When the next state depends on the previous state, use the functional updater form so queued updates compose correctly.',
    ],
    whyItMatters:
      'Interactive controls need a clear source of truth for the values they display and update.',
    realWorldExample:
      'A quantity stepper updates the cart count from button clicks and disables decrement at zero.',
    code: `const [count, setCount] = useState(0)\n<button onClick={() => setCount((current) => current + 1)}>\n  Count: {count}\n</button>`,
    commonMistakes: [
      'Expecting a state setter to change the current render immediately.',
      'Mutating an object or array in state.',
    ],
    bestPractices: [
      'Use functional updates for derived state changes.',
      'Replace objects and arrays instead of mutating them.',
    ],
    practiceTask:
      'Add increment, decrement, and reset actions while preventing the count from going below zero.',
    interviewQuestion:
      'Why can state updates appear asynchronous, and when should a functional updater be used?',
  },
  {
    slug: 'conditional-rendering',
    title: 'Conditional Rendering',
    section: '01. Fundamentals',
    level: 6,
    difficulty: 'beginner',
    description:
      'Render different UI for loading, empty, success, and error states.',
    explanation: [
      'React uses ordinary JavaScript conditions to choose elements. Use if statements before the return for branching, or conditional expressions for concise alternatives.',
      'For data-driven screens, model meaningful states explicitly so loading, empty, error, and success are not accidentally mixed together.',
    ],
    whyItMatters:
      'Explicit UI states prevent blank screens and ambiguous feedback when data changes.',
    realWorldExample:
      'A search page shows a spinner while loading, a retry message on error, and results or an empty state after success.',
    code: `if (loading) return <p>Loading…</p>\nif (error) return <p role="alert">Could not load results</p>\nreturn items.length ? <Results items={items} /> : <EmptyState />`,
    commonMistakes: [
      'Using a number with && and accidentally rendering zero.',
      'Showing an empty state before a request has finished.',
    ],
    bestPractices: [
      'Represent loading and error status explicitly.',
      'Use an accessible live or alert region for important feedback.',
    ],
    practiceTask:
      'Create distinct loading, error, empty, and populated views for a list.',
    interviewQuestion:
      'What subtle output can `{count && <Badge />}` produce when count is zero?',
  },
  {
    slug: 'lists-and-keys',
    title: 'Lists and Keys',
    section: '01. Fundamentals',
    level: 7,
    difficulty: 'beginner',
    description:
      'Render collections with stable identity so React can reconcile changes correctly.',
    explanation: [
      'Use map to turn data into elements. Each sibling in a rendered collection needs a key that remains stable when items are inserted, removed, or reordered.',
      'A key helps React match an element with its prior version; it is not passed to the component as a normal prop. Use a separate id prop when the component needs that value.',
    ],
    whyItMatters:
      'Stable keys preserve the correct component and input state as lists change.',
    realWorldExample:
      'A reorderable task list should key each row by task ID, not by its current position.',
    code: `tasks.map((task) => <TaskRow key={task.id} task={task} />)`,
    commonMistakes: [
      'Using array indexes for lists that can reorder.',
      'Generating a random key on each render.',
    ],
    bestPractices: [
      'Use a stable identifier from the data.',
      'Keep keys unique among siblings.',
    ],
    practiceTask:
      'Render a sortable list and verify each row keeps its text input after reordering.',
    interviewQuestion:
      'How do keys help reconciliation, and why can index keys cause bugs?',
  },
  {
    slug: 'forms',
    title: 'Forms',
    section: '01. Fundamentals',
    level: 8,
    difficulty: 'beginner',
    description:
      'Build accessible controlled forms with validation and clear submission states.',
    explanation: [
      'A controlled input reads its value from React state and updates it from an event handler. An uncontrolled input keeps its current value in the DOM and can be read through a form event or ref.',
      'Validation should distinguish field-level feedback from form-level submission errors. Prevent duplicate submissions while a request is in progress and label every field for assistive technology.',
    ],
    whyItMatters:
      'Forms are the main boundary where user input enters application state.',
    realWorldExample:
      'A sign-up form validates an email, shows field errors, disables submit while saving, and reports server rejection.',
    code: `const [email, setEmail] = useState('')\n<form onSubmit={(event) => { event.preventDefault(); submit(email) }}>\n  <label htmlFor="email">Email</label>\n  <input id="email" value={email} onChange={(event) => setEmail(event.target.value)} />\n</form>`,
    commonMistakes: [
      'Leaving labels disconnected from inputs.',
      'Relying only on client validation for security.',
    ],
    bestPractices: [
      'Validate again on the server.',
      'Associate errors with fields and announce submission status.',
    ],
    practiceTask:
      'Create a controlled email form with a validation message and submitting state.',
    interviewQuestion:
      'When would you choose an uncontrolled input over a controlled input?',
  },
  {
    slug: 'usestate',
    title: 'useState',
    section: '02. Hooks',
    level: 9,
    difficulty: 'beginner',
    description:
      'Store local component state and update it with queued, immutable state transitions.',
    explanation: [
      'useState returns a state value and a setter. The initial value is used on mount; pass a function when calculating it is expensive so initialization only runs for the initial render.',
      'State is a render snapshot. Setters queue updates and React batches many updates; functional updaters receive the pending value and are the reliable choice when calculating from prior state.',
    ],
    whyItMatters:
      'useState is the standard tool for local interactive state such as tabs, toggles, form input, and expanded panels.',
    realWorldExample:
      'A shopping cart quantity control stores the quantity and derives the line total from quantity and unit price.',
    code: `const [quantity, setQuantity] = useState(1)\nconst increase = () => setQuantity((current) => current + 1)`,
    commonMistakes: [
      'Calling a setter and expecting the variable to change in the same handler.',
      'Storing values that can be derived from other state.',
    ],
    bestPractices: [
      'Keep state minimal and colocated.',
      'Group state that changes together and use functional updates for dependent changes.',
    ],
    practiceTask:
      'Implement a counter that increments twice in one click using functional updates.',
    interviewQuestion:
      'Why does calling setCount(count + 1) twice sometimes only increment once?',
  },
  {
    slug: 'useeffect',
    title: 'useEffect',
    section: '02. Hooks',
    level: 10,
    difficulty: 'intermediate',
    description:
      'Synchronize a component with external systems and clean up subscriptions safely.',
    explanation: [
      'useEffect runs after React commits a render and is intended to synchronize with systems outside React, such as subscriptions, timers, and imperative browser APIs.',
      'The dependency list must include reactive values used by the effect. If setup creates a resource, return cleanup that undoes it; React runs cleanup before re-synchronizing and when the component unmounts.',
    ],
    whyItMatters:
      'Effects connect declarative React state to external systems without putting side effects into render.',
    realWorldExample:
      'Subscribe to a chat room when its ID changes and disconnect from the previous room during cleanup.',
    code: `useEffect(() => {\n  const connection = createConnection(roomId)\n  connection.connect()\n  return () => connection.disconnect()\n}, [roomId])`,
    commonMistakes: [
      'Using effects to calculate values that can be computed during render.',
      'Omitting dependencies to suppress repeated synchronization.',
    ],
    bestPractices: [
      'Define the external synchronization clearly.',
      'Make setup and cleanup symmetrical and safe to repeat.',
    ],
    practiceTask:
      'Add and remove a window resize listener when a component mounts and unmounts.',
    interviewQuestion:
      'What does the dependency array mean, and when does cleanup run?',
  },
  {
    slug: 'useref',
    title: 'useRef',
    section: '02. Hooks',
    level: 11,
    difficulty: 'intermediate',
    description:
      'Hold a mutable value across renders or access a DOM node without triggering a render.',
    explanation: [
      'useRef returns the same ref object on each render. Updating its current property does not trigger another render, so it is useful for DOM references and values that do not determine visible output.',
      'When a value should affect the UI, use state instead. A ref is an escape hatch for imperative access, not a replacement state container.',
    ],
    whyItMatters:
      'Refs support focus management, measurements, media controls, and storing timer handles.',
    realWorldExample:
      'Focus the first invalid form field after validation fails.',
    code: `const inputRef = useRef(null)\n\nfunction focusSearch() {\n  inputRef.current?.focus()\n}\n\n<input ref={inputRef} />`,
    commonMistakes: [
      'Reading or writing refs during render to control visible output.',
      'Using a ref where state is needed to update the screen.',
    ],
    bestPractices: [
      'Use refs for imperative handles and non-rendering mutable values.',
      'Prefer declarative props and state when possible.',
    ],
    practiceTask: 'Add a button that focuses a search input through a ref.',
    interviewQuestion:
      'How does changing ref.current differ from calling a state setter?',
  },
  {
    slug: 'usememo',
    title: 'useMemo',
    section: '02. Hooks',
    level: 12,
    difficulty: 'intermediate',
    description:
      'Cache a calculated value between renders when profiling shows the calculation is costly.',
    explanation: [
      'useMemo recalculates a value when one of its dependencies changes and otherwise reuses the previous result. Dependencies are compared with Object.is.',
      'Memoization is a performance optimization, not a semantic guarantee. The code must remain correct if React recalculates the value.',
    ],
    whyItMatters:
      'Memoization can avoid expensive repeated work or preserve a stable value for a memoized child.',
    realWorldExample:
      'A large filtered table can cache its derived rows while the source data and filter are unchanged.',
    code: `const visibleRows = useMemo(\n  () => filterRows(rows, query),\n  [rows, query],\n)`,
    commonMistakes: [
      'Adding useMemo everywhere without measuring.',
      'Leaving a reactive dependency out of the list.',
    ],
    bestPractices: [
      'Profile before optimizing.',
      'Keep the calculation pure and include all reactive dependencies.',
    ],
    practiceTask:
      'Measure a list filter before and after memoizing it, then identify whether the optimization matters.',
    interviewQuestion:
      'Is useMemo required for correctness, and what should justify its use?',
  },
  {
    slug: 'usecallback',
    title: 'useCallback',
    section: '02. Hooks',
    level: 13,
    difficulty: 'intermediate',
    description:
      'Preserve a function identity between renders when a consumer benefits from stability.',
    explanation: [
      'useCallback returns the same function reference while its dependencies remain unchanged. It is useful when passing a callback to a memoized child or when a callback is itself a dependency.',
      'It does not prevent a function from being created during render in the conceptual model, and it does not make the function body faster.',
    ],
    whyItMatters:
      'Stable callbacks can prevent avoidable child renders in measured performance-sensitive paths.',
    realWorldExample:
      'A memoized list row receives a stable selection callback when the selected ID changes.',
    code: `const handleSelect = useCallback((id) => {\n  setSelectedId(id)\n}, [])`,
    commonMistakes: [
      'Using it without a memoized consumer or other identity requirement.',
      'Capturing stale values by omitting dependencies.',
    ],
    bestPractices: [
      'Follow dependency lint rules.',
      'Prefer simple code until profiling shows identity churn is costly.',
    ],
    practiceTask:
      'Pass a callback to a memoized child and verify which changing values belong in its dependencies.',
    interviewQuestion:
      'How does useCallback differ from useMemo returning a function?',
  },
  {
    slug: 'usecontext',
    title: 'useContext',
    section: '02. Hooks',
    level: 14,
    difficulty: 'intermediate',
    description:
      'Read a value from the nearest matching context provider in the component tree.',
    explanation: [
      'Context lets a provider make a value available to deeply nested consumers without forwarding it through every intermediate component. useContext reads the nearest provider above the calling component.',
      'Consumers update when the provider value changes. A new object or function created every render can notify many consumers, so provider value shape and update frequency matter.',
    ],
    whyItMatters:
      'Context is useful for cross-cutting values such as locale, theme, or a stable service reference.',
    realWorldExample:
      'A locale provider gives nested date and currency components the active language settings.',
    code: `const ThemeContext = createContext('light')\n\nfunction Toolbar() {\n  const theme = useContext(ThemeContext)\n  return <div data-theme={theme}>Tools</div>\n}`,
    commonMistakes: [
      'Using one giant context for frequently changing unrelated data.',
      'Calling useContext outside the expected provider and not defining a fallback policy.',
    ],
    bestPractices: [
      'Split contexts by responsibility and update frequency.',
      'Keep provider values stable when that improves measured rendering behavior.',
    ],
    practiceTask:
      'Create a locale context and read it from a nested currency label.',
    interviewQuestion: 'What causes a context consumer to receive a new value?',
  },
  {
    slug: 'custom-hooks',
    title: 'Custom Hooks',
    section: '02. Hooks',
    level: 15,
    difficulty: 'intermediate',
    description:
      'Extract reusable stateful behavior into functions that compose React hooks.',
    explanation: [
      'A custom Hook is a function whose name starts with use and may call other Hooks at its top level. It shares stateful logic, not one shared state instance; each caller gets independent Hook state unless state is lifted or placed in context.',
      'A focused custom Hook hides a behavior such as subscription management or form state behind a small API. It should not be created solely to avoid a few lines of readable code.',
    ],
    whyItMatters:
      'Custom Hooks make complex behavior reusable without adding wrapper components.',
    realWorldExample:
      'useWindowSize can subscribe to resize events and clean up its listener for each consumer.',
    code: `function useWindowWidth() {\n  const [width, setWidth] = useState(window.innerWidth)\n  useEffect(() => {\n    const update = () => setWidth(window.innerWidth)\n    window.addEventListener('resize', update)\n    return () => window.removeEventListener('resize', update)\n  }, [])\n  return width\n}`,
    commonMistakes: [
      'Calling Hooks conditionally inside the custom Hook.',
      'Expecting two callers to share one state instance automatically.',
    ],
    bestPractices: [
      'Expose a small domain-level API.',
      'Keep Hook calls at the top level and clean up external subscriptions.',
    ],
    practiceTask:
      'Extract a reusable useToggle Hook with value, toggle, and reset actions.',
    interviewQuestion:
      'Do two components calling the same custom Hook share its state?',
  },
  {
    slug: 'rendering-and-rerendering',
    title: 'Rendering and Re-rendering',
    section: '03. Rendering',
    level: 16,
    difficulty: 'intermediate',
    description:
      'Understand what triggers renders and how React updates the UI from new render output.',
    explanation: [
      'A render is React calling components to calculate the next UI description. State updates, changed props, and context updates can cause work in a component subtree.',
      'A render does not necessarily mean the browser DOM changes. React compares the new result with prior output and commits only the necessary changes. Render logic should be pure because React may render more than once.',
    ],
    whyItMatters:
      'Knowing the distinction between rendering and committing prevents incorrect performance assumptions.',
    realWorldExample:
      'Typing into a search box may render a parent and list, while only a small set of DOM nodes ultimately changes.',
    commonMistakes: [
      'Putting side effects in the component body.',
      'Assuming every render causes the whole DOM tree to be replaced.',
    ],
    bestPractices: [
      'Keep render calculations pure.',
      'Measure commits and expensive work with the React Profiler.',
    ],
    practiceTask:
      'Add a render counter for learning purposes and distinguish component calls from visible DOM changes.',
    interviewQuestion:
      'What is the difference between a React render and a DOM update?',
  },
  {
    slug: 'reconciliation-and-virtual-dom',
    title: 'Reconciliation and Virtual DOM',
    section: '03. Rendering',
    level: 17,
    difficulty: 'advanced',
    description:
      'Learn how React compares element descriptions and uses type, position, and keys to preserve state.',
    explanation: [
      'React reconciles a new element tree with the previous one to determine which updates are needed. Element type and tree position influence whether component state is preserved or reset.',
      'Keys give sibling elements stable identity when a collection changes. The “virtual DOM” is a useful informal description of element representations, not a claim that every update is faster than direct DOM code.',
    ],
    whyItMatters:
      'Reconciliation rules explain state preservation, list identity, and unexpected remounts.',
    realWorldExample:
      'Changing a form section key intentionally resets its local input state when switching accounts.',
    commonMistakes: [
      'Using unstable keys that remount rows.',
      'Changing element types at a position and expecting state to persist.',
    ],
    bestPractices: [
      'Use stable keys from domain data.',
      'Use a changed key deliberately when a subtree should reset.',
    ],
    practiceTask:
      'Build a reorderable list and observe how stable IDs preserve input state compared with indexes.',
    interviewQuestion:
      'Which factors affect whether React preserves a component’s state between renders?',
  },
  {
    slug: 'component-lifecycle',
    title: 'Component Lifecycle',
    section: '03. Rendering',
    level: 18,
    difficulty: 'intermediate',
    description:
      'Map mount, update, and unmount concerns to modern function components and effects.',
    explanation: [
      'Lifecycle language describes a component entering the tree, responding to changed inputs, and leaving the tree. Function components express external synchronization with Effects and cleanup rather than requiring class lifecycle methods.',
      'Effects do not map one-to-one to lifecycle callbacks; each Effect should represent one synchronization process and list its reactive dependencies.',
    ],
    whyItMatters:
      'Lifecycle reasoning helps manage subscriptions, timers, and resources safely.',
    realWorldExample:
      'A live dashboard connects when its room ID is selected and disconnects when the ID changes or the view unmounts.',
    commonMistakes: [
      'Treating an Effect as a generic “after render” lifecycle bucket.',
      'Forgetting cleanup for subscriptions or timers.',
    ],
    bestPractices: [
      'Describe the external system each Effect synchronizes.',
      'Use cleanup to undo setup.',
    ],
    practiceTask:
      'Translate a class mount/unmount subscription example into a function component with an Effect.',
    interviewQuestion:
      'Why are Effects not simply replacements for every class lifecycle method?',
  },
  {
    slug: 'context-api',
    title: 'Context API',
    section: '03. State Management',
    level: 19,
    difficulty: 'intermediate',
    description:
      'Provide shared values through a tree while keeping ownership and update frequency explicit.',
    explanation: [
      'Context consists of a context object, a provider value, and consumers that read the nearest provider. It is a dependency distribution mechanism, not a complete state-management or server-cache solution.',
      'When provider values change, consumers that read the context update. Split contexts when values have different ownership or update frequency.',
    ],
    whyItMatters:
      'Context removes repetitive prop forwarding for values needed across distant parts of an application.',
    realWorldExample:
      'A theme context supplies color mode to controls throughout a settings screen.',
    code: `const ThemeContext = createContext(null)\n\nfunction App() {\n  return <ThemeContext value="dark"><Settings /></ThemeContext>\n}`,
    note: 'Use the provider syntax supported by your installed React version; older versions use <ThemeContext.Provider value={...}>.',
    commonMistakes: [
      'Using context for every piece of local state.',
      'Updating a large context value on every keystroke.',
    ],
    bestPractices: [
      'Keep context values focused.',
      'Use a dedicated external store or query cache for its intended domain.',
    ],
    practiceTask:
      'Provide a current user object to a deeply nested account menu without passing it through intermediate components.',
    interviewQuestion:
      'When is Context a good fit, and what can make its updates expensive?',
  },
  {
    slug: 'redux-toolkit',
    title: 'Redux Toolkit',
    section: '03. State Management',
    level: 20,
    difficulty: 'advanced',
    description:
      'Manage shared client state with Redux Toolkit slices, reducers, selectors, and predictable actions.',
    explanation: [
      'Redux Toolkit is the recommended way to write Redux logic. A slice groups a state area with reducer logic and generated actions; configureStore combines slices and enables useful development defaults.',
      'Reducers describe state transitions and should remain deterministic. Redux Toolkit uses Immer so reducer code may use mutation-like syntax while producing immutable updates.',
      'Server data usually benefits from a dedicated query cache such as RTK Query rather than manually copying every response into general client state.',
    ],
    whyItMatters:
      'A centralized state model can help when many parts of an application coordinate complex shared client state.',
    realWorldExample:
      'A multi-step checkout can store cart edits and workflow status in a cart slice.',
    commonMistakes: [
      'Adding Redux for a small local interaction.',
      'Putting transient input state and server cache into one undifferentiated global store.',
    ],
    bestPractices: [
      'Model state by domain.',
      'Use selectors and keep reducers focused and deterministic.',
    ],
    practiceTask: 'Create a cart slice with add-item and clear-cart actions.',
    interviewQuestion:
      'What does Redux Toolkit simplify compared with hand-written Redux boilerplate?',
  },
  {
    slug: 'zustand',
    title: 'Zustand',
    section: '03. State Management',
    level: 21,
    difficulty: 'advanced',
    description:
      'Create a small external state store and subscribe components to the values they need.',
    explanation: [
      'Zustand is a state-management library that exposes a store through a Hook. Components select the slice they need, and store actions update state outside the component tree.',
      'External state still needs clear ownership, selectors, and update rules. A small API does not remove the need to decide which state belongs globally and which should remain local.',
    ],
    whyItMatters:
      'A lightweight store can coordinate state across components without a provider wrapper.',
    realWorldExample:
      'A media player store can expose current track and playback actions to controls in separate routes.',
    code: `const useCounter = create((set) => ({\n  count: 0,\n  increment: () => set((state) => ({ count: state.count + 1 })),\n}))`,
    commonMistakes: [
      'Selecting the entire store and rerendering for unrelated changes.',
      'Putting every local value into a global store.',
    ],
    bestPractices: [
      'Select only needed state.',
      'Keep actions and data grouped by domain.',
    ],
    practiceTask:
      'Create a small store for a notification count and select only the count in its badge.',
    interviewQuestion:
      'How do selector choices affect renders in an external React store?',
  },
  {
    slug: 'react-query',
    title: 'React Query',
    section: '03. Data Fetching',
    level: 22,
    difficulty: 'advanced',
    description:
      'Treat remote server data as a cache with query identity, freshness, loading, and mutation states.',
    explanation: [
      'TanStack Query, historically called React Query, manages asynchronous server state: fetching, caching, refetching, deduplication, and mutation lifecycle.',
      'A query key identifies the data and must include every variable that changes the result. Invalidation marks related cached data stale so it can be refreshed after a mutation.',
      'It complements local UI state rather than replacing it. A form’s open/closed state is usually local; data fetched from an API is server state.',
    ],
    whyItMatters:
      'Server-state caching avoids hand-written request lifecycle code and helps keep views synchronized.',
    realWorldExample:
      'A product list query can be keyed by category and page, then invalidated after a product update.',
    code: `const query = useQuery({\n  queryKey: ['products', categoryId],\n  queryFn: () => fetchProducts(categoryId),\n})`,
    commonMistakes: [
      'Using an incomplete query key.',
      'Ignoring loading, error, and stale data states.',
    ],
    bestPractices: [
      'Design stable query keys.',
      'Invalidate or update related cache data after mutations.',
    ],
    practiceTask:
      'Add page number to a product query key and invalidate the product list after deletion.',
    interviewQuestion: 'How does a query key affect caching and deduplication?',
  },
  {
    slug: 'react-performance',
    title: 'React Performance',
    section: '04. Performance',
    level: 23,
    difficulty: 'advanced',
    description:
      'Optimize measured bottlenecks with memoization, code splitting, and bounded rendering work.',
    explanation: [
      'First identify slow renders or interactions with profiling. A component re-render is not automatically expensive, and memoization can add complexity without improving user-perceived performance.',
      'React.memo can skip rendering a component when its props compare equal. useMemo caches a calculation, and useCallback stabilizes a function identity; all have dependency and comparison costs.',
      'Lazy loading and code splitting reduce the initial JavaScript payload. Virtualization limits the number of off-screen list rows mounted at once.',
    ],
    whyItMatters:
      'Performance work should improve real interaction latency or loading time without making code harder to maintain unnecessarily.',
    realWorldExample:
      'A searchable table with tens of thousands of rows can combine deferred filtering with virtualization.',
    commonMistakes: [
      'Memoizing every component before profiling.',
      'Splitting code into too many tiny chunks that add network overhead.',
    ],
    bestPractices: [
      'Profile representative interactions.',
      'Optimize the measured bottleneck and re-measure.',
    ],
    practiceTask:
      'Profile a large list, then compare a straightforward render with a virtualized list.',
    interviewQuestion:
      'When would React.memo or useMemo improve performance, and when could it be unnecessary?',
  },
  {
    slug: 'react-memo',
    title: 'React.memo',
    section: '04. Performance',
    level: 24,
    difficulty: 'advanced',
    description:
      'Memoize a component render when unchanged props make repeated rendering measurable waste.',
    explanation: [
      'React.memo wraps a component and can skip rendering when its props are unchanged according to a shallow comparison by default.',
      'New object, array, or function props are different references, so memoization may not help if parents recreate them every render. A custom comparison must account for every prop that affects output.',
    ],
    whyItMatters: 'It can reduce repeated work in a measured hot subtree.',
    realWorldExample:
      'Memoize expensive chart rows that receive stable data and callbacks.',
    code: `const Row = memo(function Row({ item, onSelect }) {\n  return <button onClick={() => onSelect(item.id)}>{item.name}</button>\n})`,
    commonMistakes: [
      'Assuming memo prevents all renders.',
      'Writing a custom comparator that ignores a behavior-changing prop.',
    ],
    bestPractices: [
      'Profile before memoizing.',
      'Keep props minimal and stable where useful.',
    ],
    practiceTask:
      'Use the Profiler to compare a memoized row list with and without stable callback props.',
    interviewQuestion: 'What comparison does React.memo use by default?',
  },
  {
    slug: 'lazy-loading-code-splitting',
    title: 'Lazy Loading and Code Splitting',
    section: '04. Performance',
    level: 25,
    difficulty: 'advanced',
    description:
      'Defer rarely needed component code and provide a deliberate loading boundary.',
    explanation: [
      'React.lazy loads a component when it is first rendered. Suspense displays a fallback while the lazy component or another supported resource is pending.',
      'Route-level splitting often provides a useful balance: users download the code for the current route without creating a separate chunk for every tiny component.',
    ],
    whyItMatters:
      'Reducing the initial JavaScript bundle can improve startup on slower devices and networks.',
    realWorldExample:
      'Load an administration dashboard only when the user opens the admin route.',
    code: `const AdminPage = lazy(() => import('./AdminPage'))\n\n<Suspense fallback={<p>Loading admin…</p>}>\n  <AdminPage />\n</Suspense>`,
    commonMistakes: [
      'Forgetting a Suspense fallback.',
      'Splitting components that are always required immediately.',
    ],
    bestPractices: [
      'Split at natural route or feature boundaries.',
      'Measure the initial bundle and loading experience.',
    ],
    practiceTask:
      'Lazy-load a secondary route and verify the fallback appears during loading.',
    interviewQuestion:
      'What do React.lazy and Suspense contribute to code splitting?',
  },
  {
    slug: 'virtualization',
    title: 'Virtualization',
    section: '04. Performance',
    level: 26,
    difficulty: 'advanced',
    description: 'Render only the visible window of a very large list or grid.',
    explanation: [
      'Virtualization keeps a small set of visible rows mounted and reuses or replaces them as the viewport moves. It reduces DOM size and rendering work for large collections.',
      'It introduces constraints around row measurement, keyboard navigation, screen readers, sticky elements, and finding an item by scroll position.',
      'Use an established virtualization library for production lists rather than hand-rolling viewport and measurement logic.',
    ],
    whyItMatters:
      'Large DOM trees increase memory use and make layout, paint, and reconciliation more expensive.',
    realWorldExample:
      'A log viewer can virtualize hundreds of thousands of timestamped entries.',
    commonMistakes: [
      'Virtualizing small lists without need.',
      'Ignoring accessibility and variable row heights.',
    ],
    bestPractices: [
      'Measure the list bottleneck.',
      'Use stable item keys and test keyboard and assistive technology behavior.',
    ],
    practiceTask:
      'Prototype a virtualized list and test navigation to an off-screen row.',
    interviewQuestion:
      'What costs does list virtualization reduce, and what UX concerns does it introduce?',
  },
  {
    slug: 'react-login-lab',
    title: 'Lab: Login Form',
    section: '05. Practical Labs',
    level: 27,
    difficulty: 'intermediate',
    description:
      'Build a login form with controlled fields, validation, pending state, and accessible errors.',
    explanation: [
      'The form owns transient input and submission state. Validate required fields before sending, prevent duplicate submission, and present server failures without leaking sensitive details.',
      'Client-side validation improves usability but does not replace authentication and validation on the server. Never treat a hidden button or client route as an authorization boundary.',
    ],
    whyItMatters:
      'Authentication screens combine form state, async requests, validation, and security expectations.',
    realWorldExample:
      'A login screen disables submission during a request and displays a generic credential error if authentication fails.',
    commonMistakes: [
      'Logging passwords.',
      'Assuming client validation secures an API.',
    ],
    bestPractices: [
      'Use labels and autocomplete hints.',
      'Keep tokens out of unsafe storage and follow the application’s authentication design.',
    ],
    practiceTask:
      'Implement email and password fields, validation messages, and pending/success/failure states.',
    interviewQuestion:
      'Why must the server validate credentials even when React validates the form?',
  },
  {
    slug: 'react-crud-lab',
    title: 'Lab: CRUD Interface',
    section: '05. Practical Labs',
    level: 28,
    difficulty: 'intermediate',
    description:
      'Create, display, update, and remove records with clear asynchronous UI states.',
    explanation: [
      'CRUD stands for create, read, update, and delete. A client view should represent pending, success, and failure for each operation and keep the visible list consistent with the server response.',
      'Optimistic updates can make an interface feel faster, but need a rollback or reconciliation strategy if the server rejects the change.',
    ],
    whyItMatters:
      'CRUD patterns appear in dashboards, admin tools, and most data-driven applications.',
    realWorldExample:
      'A task board creates a task, edits its title, marks it complete, and removes it through API calls.',
    commonMistakes: [
      'Updating local state before a request without recovery.',
      'Using array indexes as record identity.',
    ],
    bestPractices: [
      'Use server IDs as keys.',
      'Make mutation and error states visible to users.',
    ],
    practiceTask:
      'Build a task list that supports create, edit, complete, and delete operations.',
    interviewQuestion:
      'How would you keep optimistic UI state consistent after a failed mutation?',
  },
  {
    slug: 'react-search-pagination-lab',
    title: 'Lab: Search and Pagination',
    section: '05. Practical Labs',
    level: 29,
    difficulty: 'intermediate',
    description:
      'Combine controlled search, stable pagination, empty states, and loading feedback.',
    explanation: [
      'Search and pagination state must coordinate: changing the query usually resets the page, and results should show which query and page they represent.',
      'For server pagination, include query and page parameters in request identity and handle stale responses. For local filtering, derive visible results rather than duplicating them in state.',
    ],
    whyItMatters:
      'These patterns are common in data-heavy products and reveal state synchronization issues.',
    realWorldExample:
      'A customer table searches names and loads 25 matching rows per server page.',
    commonMistakes: [
      'Keeping an out-of-range page after the filter changes.',
      'Appending stale results from an earlier query.',
    ],
    bestPractices: [
      'Reset pagination when query identity changes.',
      'Debounce remote search deliberately and expose loading state.',
    ],
    practiceTask:
      'Add search and page controls to a list; changing the search should return to page one.',
    interviewQuestion:
      'What state should be reset when a search filter changes?',
  },
  {
    slug: 'react-infinite-scroll-upload-auth-lab',
    title: 'Lab: Infinite Scroll, Upload, and Protected UI',
    section: '05. Practical Labs',
    level: 30,
    difficulty: 'advanced',
    description:
      'Explore pagination triggers, file input previews, route guards, and role-aware interface states.',
    explanation: [
      'Infinite scrolling should request the next page only when one is not already pending and should stop when the server reports no more results. An observer can detect proximity to the list end.',
      'File uploads need size/type validation, progress and error states, and server-side verification. Protected routes improve navigation UX, but authorization must also be enforced by the server for every protected resource.',
      'Role-based UI can hide actions a user cannot take, but the API remains the security boundary.',
    ],
    whyItMatters:
      'These patterns combine browser APIs, async state, accessibility, and security boundaries.',
    realWorldExample:
      'A media library loads another page near the bottom and uploads images with progress feedback.',
    commonMistakes: [
      'Launching duplicate page requests from repeated observer callbacks.',
      'Trusting a client-side role check to secure data.',
    ],
    bestPractices: [
      'Guard requests with loading and hasMore state.',
      'Validate uploads and permissions on the server.',
    ],
    practiceTask:
      'Design states for a protected image gallery with infinite loading and an upload form.',
    interviewQuestion:
      'Why are protected routes not sufficient to implement authorization?',
  },
]

export const reactTopicLessons: Lesson[] = topics.map((topic) => ({
  id: `react-${topic.slug}`,
  slug: topic.slug,
  technology: 'react',
  title: topic.title,
  category: 'React',
  description: topic.description,
  section: topic.section,
  level: topic.level,
  difficulty: topic.difficulty,
  prerequisites: ['React Overview'],
  concepts: [topic.title],
  progress: 0,
  toc: [topic.title],
  references: reactReferences,
  sections: [
    {
      heading: topic.title,
      difficulty: topic.difficulty,
      explanation: topic.explanation,
      whyItMatters: topic.whyItMatters,
      realWorldExample: topic.realWorldExample,
      code: topic.code,
      output: topic.output,
      note: topic.note,
      commonMistakes: topic.commonMistakes,
      bestPractices: topic.bestPractices,
      practiceTask: topic.practiceTask,
      interviewQuestion: topic.interviewQuestion,
    },
  ],
}))
