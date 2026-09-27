import type { Lesson } from '../types'

const documentation: Record<string, Lesson['references']> = {
  typescript: [
    {
      label: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    },
    {
      label: 'Everyday Types',
      url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
    },
    {
      label: 'Narrowing',
      url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
    },
    {
      label: 'Generics',
      url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
    },
    {
      label: 'TSConfig Reference',
      url: 'https://www.typescriptlang.org/tsconfig/',
    },
  ],
  react: [
    { label: 'Learn React', url: 'https://react.dev/learn' },
    { label: 'React Reference', url: 'https://react.dev/reference/react' },
  ],
  express: [
    {
      label: 'Express Routing',
      url: 'https://expressjs.com/en/guide/routing.html',
    },
    {
      label: 'Using Middleware',
      url: 'https://expressjs.com/en/guide/using-middleware.html',
    },
    {
      label: 'Error Handling',
      url: 'https://expressjs.com/en/guide/error-handling.html',
    },
    {
      label: 'Security Best Practices',
      url: 'https://expressjs.com/en/advanced/best-practice-security.html',
    },
  ],
  mongodb: [
    {
      label: 'MongoDB Manual',
      url: 'https://www.mongodb.com/docs/manual/introduction/',
    },
    {
      label: 'CRUD Operations',
      url: 'https://www.mongodb.com/docs/manual/crud/',
    },
    { label: 'Indexes', url: 'https://www.mongodb.com/docs/manual/indexes/' },
    {
      label: 'Aggregation',
      url: 'https://www.mongodb.com/docs/manual/aggregation/',
    },
    {
      label: 'Replication and Sharding',
      url: 'https://www.mongodb.com/docs/manual/replication/',
    },
  ],
  postgresql: [
    {
      label: 'PostgreSQL Tutorial',
      url: 'https://www.postgresql.org/docs/current/tutorial.html',
    },
    {
      label: 'SQL Commands',
      url: 'https://www.postgresql.org/docs/current/sql.html',
    },
    {
      label: 'Indexes',
      url: 'https://www.postgresql.org/docs/current/indexes.html',
    },
    {
      label: 'Transactions',
      url: 'https://www.postgresql.org/docs/current/tutorial-transactions.html',
    },
  ],
  redis: [
    {
      label: 'Develop with Redis',
      url: 'https://redis.io/docs/latest/develop/',
    },
    {
      label: 'Redis Data Types',
      url: 'https://redis.io/docs/latest/develop/data-types/',
    },
    {
      label: 'Redis Persistence',
      url: 'https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/',
    },
    {
      label: 'Redis Cluster',
      url: 'https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/',
    },
  ],
  docker: [
    {
      label: 'Docker Get Started',
      url: 'https://docs.docker.com/get-started/introduction/',
    },
    {
      label: 'Dockerfile Overview',
      url: 'https://docs.docker.com/build/concepts/dockerfile/',
    },
    { label: 'Docker Compose', url: 'https://docs.docker.com/compose/' },
    {
      label: 'Networking Overview',
      url: 'https://docs.docker.com/engine/network/',
    },
  ],
  'system-design': [
    {
      label: 'Google SRE Book',
      url: 'https://sre.google/sre-book/table-of-contents/',
    },
    {
      label: 'Service Level Objectives',
      url: 'https://sre.google/sre-book/service-level-objectives/',
    },
    {
      label: 'Handling Overload',
      url: 'https://sre.google/sre-book/handling-overload/',
    },
    {
      label: 'Addressing Cascading Failures',
      url: 'https://sre.google/sre-book/addressing-cascading-failures/',
    },
  ],
}

export const technologyLessons: Lesson[] = [
  {
    id: 'typescript-course',
    slug: 'typescript',
    title: 'TypeScript',
    category: 'TypeScript',
    description:
      'Build reliable JavaScript with static types, safe narrowing, reusable generics, and project configuration.',
    section: 'TypeScript',
    level: 1,
    progress: 0,
    toc: [
      'What TypeScript adds',
      'Everyday types and inference',
      'Functions and object shapes',
      'Unions and narrowing',
      'Generics',
      'Modules and compiler configuration',
    ],
    references: documentation.typescript,
    sections: [
      {
        heading: 'What TypeScript adds',
        explanation: [
          'TypeScript is a static type checker for JavaScript. It checks relationships between values before the program runs and reports likely mistakes, such as passing a number to a function that expects text.',
          'Type annotations and interfaces are removed during compilation; ordinary TypeScript does not add runtime validation. Data from a network, file, or user still needs runtime validation before the program can trust it.',
          'A practical workflow is to let inference handle obvious local types, then describe important API boundaries explicitly. Prefer unknown over any for untrusted values because unknown requires a check before use.',
        ],
        code: `function greet(name: string): string {\n  return \`Hello, \${name}\`\n}\n\ngreet('Ava')`,
        output: `Hello, Ava`,
        note: 'TypeScript catches many mistakes during development, but it does not change JavaScript runtime behavior or replace tests.',
      },
      {
        heading: 'Everyday types and inference',
        explanation: [
          'The common primitive types are string, number, and boolean. Arrays use forms such as User[] or Array<User>. Object types describe the properties a value must provide, while optional properties are marked with a question mark.',
          'The compiler infers types from initial values and surrounding context, so annotating every variable usually adds noise. Type aliases name reusable types; interfaces are especially useful for object shapes that may be extended or declaration-merged.',
          'Enable strict checking in new projects where practical. In particular, strictNullChecks makes null and undefined explicit possibilities that must be handled instead of silently treated as every type.',
        ],
        code: `type User = { id: string; nickname?: string }\n\nfunction label(user: User): string {\n  return user.nickname ?? user.id\n}`,
      },
      {
        heading: 'Functions and object shapes',
        explanation: [
          'Function types describe accepted parameters and returned values. TypeScript can infer return types, but explicit return types can document exported APIs and ensure later edits keep the same contract.',
          'Use unions to express a finite set of valid alternatives, such as a request method of GET or POST. Use readonly when callers should not mutate a value through a particular reference.',
          'Type assertions such as value as User do not inspect or convert the value at runtime. Use them only when independent evidence proves the type; otherwise, validate the value with code.',
        ],
        code: `type Method = 'GET' | 'POST'\n\ntype RequestOptions = {\n  method: Method\n  url: string\n}\n\nfunction send(options: RequestOptions): void {\n  console.log(options.method, options.url)\n}`,
      },
      {
        heading: 'Unions and narrowing',
        explanation: [
          'A union means a value can be one of several types. An operation is safe on a union only when every member supports it, so code must narrow the value before using member-specific behavior.',
          'JavaScript checks such as typeof, instanceof, equality checks, the in operator, and Array.isArray can narrow types. A shared literal field creates a discriminated union that TypeScript can narrow in a switch statement.',
          'Exhaustiveness checks make changes safer: assigning the remaining case to never causes a compile error when a new union member is added but not handled.',
        ],
        code: `type Result =\n  | { status: 'ok'; value: string }\n  | { status: 'error'; message: string }\n\nfunction describe(result: Result): string {\n  switch (result.status) {\n    case 'ok': return result.value\n    case 'error': return result.message\n  }\n}`,
      },
      {
        heading: 'Generics',
        explanation: [
          'A generic captures a type and carries that information through an API. Unlike any, a generic identity function can return the exact type it received.',
          'Type parameters can have constraints, often expressed with extends, when an implementation needs a known capability such as a length property or a key from keyof T.',
          'Use generics when input and output types are related. Do not add them merely to make a signature look advanced; a concrete type is clearer when the operation only supports one shape.',
        ],
        code: `function first<T>(items: readonly T[]): T | undefined {\n  return items[0]\n}\n\nconst value = first([10, 20])`,
      },
      {
        heading: 'Modules and compiler configuration',
        explanation: [
          'TypeScript follows the JavaScript module system used by the project. The module and moduleResolution options should match the runtime or bundler: modern Node projects commonly use Node-aware modes, while bundler projects use bundler-oriented resolution.',
          'The tsconfig file controls which files are checked and settings such as strictness, target JavaScript version, JSX transformation, and emitted output. A paths mapping informs TypeScript resolution but does not rewrite imports for the runtime by itself.',
          'Treat compiler options as part of the application contract. Check the official TSConfig reference before copying options from a project using a different runtime or build tool.',
        ],
        code: `// Import a runtime value and a type separately.\nimport { createUser } from './users'\nimport type { User } from './types'`,
      },
    ],
  },
  {
    id: 'react-course',
    slug: 'overview',
    technology: 'react',
    title: 'React Overview',
    category: 'React',
    description:
      'Learn components, JSX, props, state, effects, forms, and the rendering model behind interactive interfaces.',
    section: 'React',
    level: 1,
    progress: 0,
    toc: [
      'Components and JSX',
      'Props and rendering data',
      'State and events',
      'Sharing state',
      'Effects and external systems',
      'Forms and component design',
    ],
    references: documentation.react,
    sections: [
      {
        heading: 'Components and JSX',
        explanation: [
          'A React component is a JavaScript function that returns a description of UI. Components compose into a tree, with capitalized names distinguishing component references from lowercase HTML elements.',
          'JSX is syntax for describing that UI. It resembles HTML but follows JavaScript rules: use className for CSS classes, close tags, and wrap adjacent returned elements in a fragment or another parent.',
          'Keep a component focused on one coherent piece of interface. Extract a child when it has meaningful independent behavior, reuse, or complexity rather than splitting every few lines.',
        ],
        code: `function Greeting({ name }: { name: string }) {\n  return <h1>Hello, {name}</h1>\n}`,
      },
      {
        heading: 'Props and rendering data',
        explanation: [
          'Props are inputs passed from a parent to a child. A component should treat props as read-only and describe their expected shape, especially in TypeScript projects.',
          'JavaScript expressions inside JSX use braces. Conditional expressions choose what to render, and array map creates repeated elements.',
          'Each sibling produced from a list needs a stable key that identifies the item across insertion, deletion, and reordering. Prefer a stable data ID over an array index when the list can change.',
        ],
        code: `type Product = { id: string; name: string }\n\nfunction ProductList({ products }: { products: Product[] }) {\n  return (\n    <ul>\n      {products.map((product) => (\n        <li key={product.id}>{product.name}</li>\n      ))}\n    </ul>\n  )\n}`,
      },
      {
        heading: 'State and events',
        explanation: [
          'State is data that belongs to a component and can change over time. useState returns the current value and a setter; calling the setter schedules a render with the new state.',
          'Event handlers are passed as functions, for example onClick={handleClick}. Do not call the handler while rendering. When the next value depends on the previous value, use the functional setter form to avoid stale updates.',
          'State should be replaced rather than mutated. For objects and arrays, create a new value so React can observe the update and rendering remains predictable.',
        ],
        code: `import { useState } from 'react'\n\nfunction Counter() {\n  const [count, setCount] = useState(0)\n  return <button onClick={() => setCount((value) => value + 1)}>\n    Count: {count}\n  </button>\n}`,
      },
      {
        heading: 'Sharing state',
        explanation: [
          'When multiple components need the same changing value, move that state to their closest common parent. The parent passes the value and event callbacks down through props; this is commonly called lifting state up.',
          'Keep each piece of state at the lowest common owner that needs to coordinate it. Context can avoid passing a value through many intermediate components, but it is not a general replacement for local state or explicit props.',
          'Derived values should usually be calculated during rendering from existing props and state instead of being stored separately and synchronized with effects.',
        ],
        note: 'A single source of truth makes it easier to understand which component owns an update.',
      },
      {
        heading: 'Effects and external systems',
        explanation: [
          'Effects synchronize a component with systems outside React, such as browser APIs, subscriptions, or a network connection. They are not needed for ordinary calculations or for responding directly to a user event.',
          'An effect may return cleanup that undoes its setup, such as removing a listener or closing a connection. Dependencies describe the reactive values used by the effect and must stay accurate.',
          'For data fetching, account for stale responses and loading or error states. Framework data APIs or a client cache may provide better deduplication and lifecycle handling than hand-written effects.',
        ],
        code: `useEffect(() => {\n  const connection = connect(serverUrl)\n  return () => connection.disconnect()\n}, [serverUrl])`,
      },
      {
        heading: 'Forms and component design',
        explanation: [
          'A controlled input receives its current value from state and reports edits through an event handler. This is useful when the UI must validate, transform, or coordinate the input as it changes.',
          'Uncontrolled inputs keep their current value in the DOM and can be read through a ref or form submission. Choose the simpler model that meets the interaction requirements.',
          'Accessible controls need labels, keyboard operation, and understandable validation feedback. Prefer native HTML elements where they already provide the expected behavior.',
        ],
      },
    ],
  },
]

