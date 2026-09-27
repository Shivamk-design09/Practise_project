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
  {
    id: 'express-course',
    slug: 'express',
    title: 'Express',
    category: 'Express',
    description:
      'Build maintainable HTTP services with Express routing, middleware, validation, error handling, and security.',
    section: 'Express',
    level: 1,
    progress: 0,
    toc: [
      'Application and request lifecycle',
      'Routes and parameters',
      'Middleware',
      'Validation and API design',
      'Errors and async handlers',
      'Security and production readiness',
    ],
    references: documentation.express,
    sections: [
      {
        heading: 'Application and request lifecycle',
        explanation: [
          'Express is a minimal web framework built around Node.js HTTP requests and responses. An application configures middleware and routes, then listens on a network port.',
          'A request passes through matching middleware and route handlers in registration order. A handler must send or end a response, or pass control onward; otherwise the client can wait indefinitely.',
          'Keep process startup separate from app construction where possible. That makes application configuration easier to test without binding a real port.',
        ],
        code: `import express from 'express'\n\nconst app = express()\napp.use(express.json())\napp.get('/health', (_req, res) => res.json({ ok: true }))\napp.listen(3000)`,
      },
      {
        heading: 'Routes and parameters',
        explanation: [
          'A route combines an HTTP method and a path. Named parameters capture path segments in req.params; query strings are separate and are not part of the route path.',
          'Use routers to group related endpoints and mount them under a shared path. Keep resource names and HTTP methods consistent so clients can understand the API.',
          'Treat every path, query, and body value as untrusted input. Parse and validate its type, allowed range, and format before using it in application logic or a database operation.',
        ],
        code: `const router = express.Router()\n\nrouter.get('/users/:userId', (req, res) => {\n  res.json({ userId: req.params.userId })\n})\n\napp.use('/api', router)`,
      },
      {
        heading: 'Middleware',
        explanation: [
          'Middleware receives a request, response, and next function. It can inspect or modify the request, end the response, or call next to continue the chain.',
          'Common middleware handles JSON parsing, logging, authentication, request IDs, and static files. Ordering matters: parsers must run before routes that use parsed bodies, and error middleware belongs after the routes it handles.',
          'Avoid middleware that silently swallows failures or calls next more than once. Make ownership of response completion explicit.',
        ],
      },
      {
        heading: 'Validation and API design',
        explanation: [
          'Define an API contract for request and response shapes, status codes, and error bodies. Use 2xx responses for success, 4xx for client-side problems, and 5xx for server failures.',
          'Validate at the HTTP boundary and convert accepted input into an application-level type. Do not rely on TypeScript annotations alone because they disappear at runtime.',
          'Make write endpoints safe against accidental duplicate submissions when the operation has side effects. Idempotency keys or naturally idempotent methods can help, depending on the contract.',
        ],
      },
      {
        heading: 'Errors and async handlers',
        explanation: [
          'Central error middleware has four parameters: error, request, response, and next. It should log useful diagnostics server-side and return a safe, consistent error response to the client.',
          'Forward asynchronous failures through Express error handling. Express 5 forwards rejected promises from route handlers; in other versions, wrap or explicitly catch asynchronous handlers and pass errors to next.',
          'Do not expose stack traces, secrets, SQL, or internal paths in production responses. Distinguish expected client errors from unexpected faults in logs and monitoring.',
        ],
        code: `app.use((error, _req, res, _next) => {\n  console.error(error)\n  res.status(500).json({ error: 'Internal server error' })\n})`,
      },
      {
        heading: 'Security and production readiness',
        explanation: [
          'Follow Express security guidance: keep dependencies updated, validate input, use TLS at the appropriate boundary, set security headers, and configure cookies and CORS deliberately.',
          'Use environment configuration for deployment-specific values and never commit credentials. Apply request size limits and rate controls appropriate to the service.',
          'Production services need graceful shutdown, structured logs, health checks, and tests for both expected responses and failure paths.',
        ],
      },
    ],
  },
  {
    id: 'mongodb-course',
    slug: 'mongodb',
    title: 'MongoDB',
    category: 'MongoDB',
    description:
      'Model documents, perform CRUD, design indexes and aggregations, and understand replication and sharding.',
    section: 'MongoDB',
    level: 1,
    progress: 0,
    toc: [
      'Documents and collections',
      'CRUD and query filters',
      'Schema and relationships',
      'Indexes and query plans',
      'Aggregation pipelines',
      'Transactions and scaling',
    ],
    references: documentation.mongodb,
    sections: [
      {
        heading: 'Documents and collections',
        explanation: [
          'MongoDB is a document database. A document stores field-value pairs in a BSON representation, and fields can contain nested documents and arrays. Collections group related documents.',
          'A flexible schema does not mean no schema design. Decide which fields are required, how values are represented, and what invariants the application must enforce.',
          'Embed related data when it is commonly read or updated together and its size is bounded. Refer to another document when data is shared, grows independently, or needs separate lifecycle management.',
        ],
        code: `// A document can embed a bounded set of related values.\n{\n  _id: 'order-42',\n  customerId: 'customer-7',\n  items: [{ sku: 'book-1', quantity: 2 }]\n}`,
      },
      {
        heading: 'CRUD and query filters',
        explanation: [
          'CRUD means create, read, update, and delete. MongoDB query filters select documents; update operators change selected fields without requiring the application to replace the entire document.',
          'Use a unique identifier or another appropriately indexed predicate to target a write. Check the matched and modified counts so the application can distinguish a successful no-op from an unexpected target.',
          'Build filters from validated values rather than accepting arbitrary client-supplied query objects, which can create authorization or query-injection risks.',
        ],
        code: `db.users.insertOne({ _id: 'u-1', name: 'Ava', active: true })\ndb.users.find({ active: true })\ndb.users.updateOne({ _id: 'u-1' }, { $set: { active: false } })`,
      },
      {
        heading: 'Schema and relationships',
        explanation: [
          'MongoDB data modeling starts from application access patterns. Shape documents around the reads and writes the application actually performs, while considering document growth and update frequency.',
          'Embedding can reduce round trips but duplicates data when the same fact is copied into multiple documents. References reduce duplication but require additional reads or aggregation when related data is needed.',
          'Schema validation can enforce allowed field types and required fields at the database boundary, complementing validation in application code.',
        ],
      },
      {
        heading: 'Indexes and query plans',
        explanation: [
          'An index stores an ordered structure that lets MongoDB find matching documents without scanning an entire collection. Indexes improve selected reads but consume storage and add work to inserts and updates.',
          'Choose compound index field order to match equality, sort, and range predicates in important queries. There is no universally optimal index independent of the workload.',
          'Use explain to inspect a query plan and confirm whether it uses an index and how many documents it examines. Measure representative production-shaped queries rather than guessing.',
        ],
        code: `db.users.createIndex({ active: 1, createdAt: -1 })\ndb.users.find({ active: true }).sort({ createdAt: -1 }).explain('executionStats')`,
      },
      {
        heading: 'Aggregation pipelines',
        explanation: [
          'An aggregation pipeline passes documents through ordered stages that filter, reshape, group, join, and compute values. Each stage transforms the stream for the next stage.',
          'Place selective filters early when doing so preserves the intended result, and use indexes where supported. Consider memory use and result size when grouping or sorting large datasets.',
          'Aggregation is a data-processing tool, not a substitute for an appropriate document model. Keep pipelines understandable and test them with realistic edge cases.',
        ],
        code: `db.orders.aggregate([\n  { $match: { status: 'paid' } },\n  { $group: { _id: '$customerId', total: { $sum: '$amount' } } },\n  { $sort: { total: -1 } }\n])`,
      },
      {
        heading: 'Transactions and scaling',
        explanation: [
          'Single-document writes are atomic. Multi-document transactions are available when an operation must preserve invariants across documents, but they add coordination cost and do not remove the need for good data modeling.',
          'Replica sets maintain multiple copies of data and support automatic failover. Replication improves availability, but applications must understand read preference, write concern, and the possibility of stale reads.',
          'Sharding distributes data across shards using a shard key. Key choice affects distribution and query routing, so plan it around cardinality, write patterns, and targeted queries.',
        ],
      },
    ],
  },
  {
    id: 'postgresql-course',
    slug: 'postgresql',
    title: 'PostgreSQL',
    category: 'PostgreSQL',
    description:
      'Learn relational modeling, SQL queries, constraints, transactions, indexing, and operational basics.',
    section: 'PostgreSQL',
    level: 1,
    progress: 0,
    toc: [
      'Relational model and schemas',
      'SELECT and filtering',
      'Joins and aggregation',
      'Constraints and relationships',
      'Transactions and isolation',
      'Indexes and query plans',
    ],
    references: documentation.postgresql,
    sections: [
      {
        heading: 'Relational model and schemas',
        explanation: [
          'PostgreSQL is an object-relational database that stores structured data in tables of rows and columns. A schema groups database objects such as tables, views, and functions.',
          'Choose column types that match the domain, use primary keys to identify rows, and normalize repeated facts so updates do not leave contradictory copies.',
          'Relational design is about expressing useful invariants. A clear schema makes valid states representable and gives queries predictable structure.',
        ],
        code: `CREATE TABLE customers (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  email text NOT NULL UNIQUE,\n  created_at timestamptz NOT NULL DEFAULT now()\n);`,
      },
      {
        heading: 'SELECT and filtering',
        explanation: [
          'SELECT chooses columns and expressions, FROM identifies the source, and WHERE filters rows. ORDER BY defines result order; without it, row order is not guaranteed.',
          'Use parameters for values supplied by an application rather than concatenating them into SQL strings. Parameters prevent values from being interpreted as SQL syntax.',
          'Limit results deliberately and paginate with a stable ordering. Large OFFSET values can become expensive; keyset pagination is often a better fit for forward traversal.',
        ],
        code: `SELECT id, email\nFROM customers\nWHERE created_at >= $1\nORDER BY created_at DESC\nLIMIT 50;`,
      },
      {
        heading: 'Joins and aggregation',
        explanation: [
          'A join combines rows using a relationship between tables. INNER JOIN keeps matching pairs; LEFT JOIN also keeps unmatched rows from the left side with nulls for missing right-side values.',
          'GROUP BY forms groups for aggregate functions such as count, sum, and average. HAVING filters groups after aggregation, while WHERE filters individual rows before grouping.',
          'Think about cardinality when joining: a one-to-many relationship can multiply rows and inflate aggregates unless the query accounts for it.',
        ],
        code: `SELECT customers.id, count(orders.id) AS order_count\nFROM customers\nLEFT JOIN orders ON orders.customer_id = customers.id\nGROUP BY customers.id;`,
      },
      {
        heading: 'Constraints and relationships',
        explanation: [
          'Constraints enforce rules at the database boundary. NOT NULL requires a value, UNIQUE prevents duplicate keys, CHECK validates a condition, and foreign keys keep references consistent.',
          'Use transactions when several statements must succeed or fail as one unit. Constraints remain valuable even when application code also validates input because other clients and future code paths share the same database.',
          'Choose deletion behavior for foreign keys intentionally. Cascades can simplify dependent cleanup but can also remove more data than an operator expects.',
        ],
        code: `CREATE TABLE orders (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  customer_id bigint NOT NULL REFERENCES customers(id),\n  amount numeric(12, 2) NOT NULL CHECK (amount >= 0)\n);`,
      },
      {
        heading: 'Transactions and isolation',
        explanation: [
          'A transaction groups statements into an atomic unit. COMMIT makes changes visible as a completed operation; ROLLBACK discards them.',
          'PostgreSQL uses MVCC so statements can work with snapshots while concurrent transactions proceed. Isolation levels define which concurrent effects a transaction can observe.',
          'Applications should keep transactions as short as practical, retry serialization failures when appropriate, and avoid holding locks while waiting on slow external services.',
        ],
        code: `BEGIN;\nUPDATE accounts SET balance = balance - 25 WHERE id = 1;\nUPDATE accounts SET balance = balance + 25 WHERE id = 2;\nCOMMIT;`,
      },
      {
        heading: 'Indexes and query plans',
        explanation: [
          'Indexes provide alternate access paths to rows. B-tree indexes are a strong default for equality and range comparisons, while other index types support specific data and operator patterns.',
          'Each index increases disk use and write maintenance, so index columns used by measured high-value queries rather than indexing everything.',
          'EXPLAIN shows the planned execution strategy; EXPLAIN ANALYZE runs the query and reports observed work. Use realistic data and remember that ANALYZE executes the statement.',
        ],
        code: `CREATE INDEX orders_customer_created_idx\n  ON orders (customer_id, created_at DESC);\n\nEXPLAIN ANALYZE\nSELECT id FROM orders WHERE customer_id = 42 ORDER BY created_at DESC LIMIT 20;`,
      },
    ],
  },
  {
    id: 'redis-course',
    slug: 'redis',
    title: 'Redis',
    category: 'Redis',
    description:
      'Use Redis data structures for caching and coordination, and understand expiration, persistence, and scaling trade-offs.',
    section: 'Redis',
    level: 1,
    progress: 0,
    toc: [
      'Keys, strings, and expiration',
      'Hashes, lists, sets, and sorted sets',
      'Caching patterns',
      'Atomic operations and transactions',
      'Streams and publish/subscribe',
      'Persistence and high availability',
    ],
    references: documentation.redis,
    sections: [
      {
        heading: 'Keys, strings, and expiration',
        explanation: [
          'Redis is an in-memory data structure server accessed through commands. Keys identify values, and strings store byte sequences used for values such as counters, tokens, and serialized cache entries.',
          'Set an expiration when data should become invalid after a period. TTL is useful for bounded caches and temporary records, but expiration is not a precise scheduler and expired keys may be removed lazily or in the background.',
          'Choose key names consistently and avoid placing secrets in keys that may appear in logs or diagnostic output.',
        ],
        code: `SET profile:42:name "Ava" EX 300\nGET profile:42:name\nTTL profile:42:name`,
      },
      {
        heading: 'Hashes, lists, sets, and sorted sets',
        explanation: [
          'Redis hashes store field-value pairs and suit compact records. Lists preserve order and support queue-like operations; sets store unique members; sorted sets order unique members by a numeric score.',
          'Pick the data type that matches the operations you need, not merely the shape of your application object. Redis commands operate on these structures without requiring every value to be serialized as one opaque blob.',
          'Check command complexity and bound collection sizes. A single expensive command can delay other clients because command execution is coordinated by the server event loop.',
        ],
        code: `HSET user:42 name Ava plan pro\nSADD room:7:members user:42 user:18\nZADD leaderboard 1200 user:42`,
      },
      {
        heading: 'Caching patterns',
        explanation: [
          'A cache stores reusable results near the application to reduce repeated work against a slower source. In cache-aside, the application checks Redis, loads a miss from the source of truth, then stores the result with a bounded lifetime.',
          'Cache entries can become stale, disappear, or be evicted. The application must remain correct when the cache is empty or unavailable and should define how updates invalidate or refresh affected entries.',
          'Protect a backend from a stampede when many requests miss the same popular key at once. Techniques include request coalescing, short randomized TTL variation, and carefully designed stale-while-revalidate behavior.',
        ],
      },
      {
        heading: 'Atomic operations and transactions',
        explanation: [
          'Many Redis commands are atomic, which makes operations such as incrementing a counter safe from interleaving at the individual command level.',
          'MULTI and EXEC group commands for serialized execution, while WATCH enables optimistic checks. Lua scripts or Redis Functions can perform related server-side logic atomically when a sequence cannot be expressed as one command.',
          'Atomicity is not the same as durability or a multi-key relational transaction. Understand cluster slot constraints and persistence settings before relying on a workflow for important data.',
        ],
        code: `INCR page:42:views\nSET login:token-abc user:42 EX 900 NX`,
      },
      {
        heading: 'Streams and publish/subscribe',
        explanation: [
          'Redis Streams provide an append-only log with entry IDs and consumer groups. Consumers can share work, acknowledge processed entries, and inspect entries that remain pending.',
          'Publish/subscribe broadcasts messages to currently subscribed clients but does not retain them for disconnected subscribers. Use it for live notification, not as a durable queue.',
          'Choose based on delivery requirements: replay, acknowledgment, retention, and consumer recovery point toward Streams or a dedicated message broker rather than ephemeral pub/sub.',
        ],
        code: `XADD events * type order.created orderId 42\nXREAD COUNT 10 STREAMS events 0`,
      },
      {
        heading: 'Persistence and high availability',
        explanation: [
          'Redis can use RDB snapshots, an append-only file, both, or no persistence. RDB creates point-in-time snapshots; AOF records write operations for replay. Each has distinct recovery, disk, latency, and potential data-loss trade-offs.',
          'Replication maintains copies and can support failover through Sentinel or Redis Cluster, depending on the deployment. Replication is generally asynchronous, so acknowledged writes can be lost in some failure scenarios.',
          'Redis Cluster partitions keys into hash slots across nodes. Multi-key operations have placement constraints, and cluster availability depends on the number and health of masters and replicas.',
        ],
        note: 'Do not describe Redis as automatically durable. Select persistence and replication settings from the data-loss tolerance and recovery objectives of the application.',
      },
    ],
  },
  {
    id: 'docker-course',
    slug: 'docker',
    title: 'Docker',
    category: 'Docker',
    description:
      'Package applications into reproducible images and run them with containers, networks, volumes, and Compose.',
    section: 'Docker',
    level: 1,
    progress: 0,
    toc: [
      'Images and containers',
      'Dockerfiles and build layers',
      'Ports, networks, and name resolution',
      'Volumes and persistent data',
      'Docker Compose',
      'Security and production practice',
    ],
    references: documentation.docker,
    sections: [
      {
        heading: 'Images and containers',
        explanation: [
          'An image is a packaged filesystem and configuration used to start containers. A container is a running instance of an image with its own process and isolated namespaces, while sharing the host kernel.',
          'Containers are designed to be replaceable. Data that must survive container replacement belongs in an external volume or service, not only in the writable container layer.',
          'A container is not automatically a virtual machine or a security boundary equivalent to one. Host kernel sharing and runtime configuration remain part of the threat model.',
        ],
        code: `docker pull nginx\ndocker run --rm --name web -p 8080:80 nginx`,
      },
      {
        heading: 'Dockerfiles and build layers',
        explanation: [
          'A Dockerfile describes image construction. FROM selects a base image, WORKDIR sets the working directory, COPY adds build-context files, RUN executes build steps, and CMD provides the default container command.',
          'Build instructions create layers that can be reused from cache. Copy dependency manifests before frequently changing source files when that improves cache reuse, and exclude unnecessary files with .dockerignore.',
          'Use small trusted base images and multi-stage builds when useful so build tools do not need to remain in the runtime image. Pin and update dependencies deliberately.',
        ],
        code: `FROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD ["node", "server.js"]`,
      },
      {
        heading: 'Ports, networks, and name resolution',
        explanation: [
          'Container ports exist inside the container network namespace. Publishing a port with -p maps a host port to a container port; EXPOSE documents an intended port but does not publish it by itself.',
          'User-defined Docker networks allow containers to reach each other by service or container name. Applications inside a container should listen on an address reachable from that network, not only on its loopback interface.',
          'Separate public ingress from internal service communication, and avoid publishing database ports to every host interface unless external access is actually required.',
        ],
        code: `docker network create app-net\ndocker run -d --name api --network app-net my-api\ndocker run --rm --network app-net busybox wget -qO- http://api:3000/health`,
      },
      {
        heading: 'Volumes and persistent data',
        explanation: [
          'A volume stores data outside a container’s writable layer and can be mounted into one or more containers. Named volumes are managed by Docker; bind mounts connect a host path to a container path.',
          'Use volumes for database data that must survive replacement. Use bind mounts primarily when the host and container need to share source files or configuration during development.',
          'Backups still require a tested process. A volume is persistence across container recreation, not a backup against deletion, disk failure, or operator error.',
        ],
        code: `docker volume create db-data\ndocker run -d --name db -v db-data:/var/lib/postgresql/data postgres`,
      },
      {
        heading: 'Docker Compose',
        explanation: [
          'Compose defines an application stack in a compose.yaml file. Services describe containers, while networks and volumes describe shared connectivity and persistent storage.',
          'Compose is useful for repeatable local development, tests, and some deployments. `docker compose up` creates and starts the declared services; `docker compose down` removes the stack resources it manages.',
          'A service name can be used for network discovery between services. Configure health checks and startup dependencies carefully: ordering a start does not guarantee that a dependency is ready to serve requests.',
        ],
        code: `services:\n  api:\n    build: .\n    ports:\n      - "3000:3000"\n    depends_on:\n      - db\n  db:\n    image: postgres:18\n    volumes:\n      - db-data:/var/lib/postgresql/data\nvolumes:\n  db-data:`,
      },
      {
        heading: 'Security and production practice',
        explanation: [
          'Run with only the privileges and capabilities required. Avoid embedding credentials in images, minimize writable surfaces, and keep the host runtime and base images patched.',
          'Use health checks and logs that help operators understand process state. Containers should handle termination signals and exit cleanly so orchestrators can replace them safely.',
          'Resource limits, image scanning, provenance, and deployment policy belong in the wider container platform. Docker packaging alone does not provide orchestration or production resilience.',
        ],
      },
    ],
  },
  {
    id: 'system-design-course',
    slug: 'system-design',
    title: 'System Design',
    category: 'System Design',
    description:
      'Design services from requirements through APIs, data, scaling, resilience, observability, and explicit trade-offs.',
    section: 'System Design',
    level: 1,
    progress: 0,
    toc: [
      'Requirements and constraints',
      'Capacity and data modeling',
      'APIs and service boundaries',
      'Scaling and caching',
      'Consistency and asynchronous work',
      'Reliability and observability',
    ],
    references: documentation['system-design'],
    sections: [
      {
        heading: 'Requirements and constraints',
        explanation: [
          'Start by clarifying the users, core use cases, and what is explicitly out of scope. Separate functional requirements from quality goals such as latency, availability, durability, privacy, and cost.',
          'Make assumptions visible and turn vague goals into measurable targets. An availability objective must specify the measurement window and what counts as a successful request.',
          'Prioritize the central user journey before adding edge features. A design is easier to evaluate when each component is tied to a requirement it serves.',
        ],
      },
      {
        heading: 'Capacity and data modeling',
        explanation: [
          'Estimate average and peak request rates, data growth, payload sizes, and retention. These are rough bounds to guide bottleneck analysis, not a substitute for measuring a real implementation.',
          'Choose a source of truth and model the records, ownership, access patterns, and update invariants. Identify which operations must be atomic and which can be eventually consistent.',
          'Consider hot keys, skew, indexes, backup size, and migration needs early. A storage choice should follow the access and consistency requirements, not a popularity contest between products.',
        ],
      },
      {
        heading: 'APIs and service boundaries',
        explanation: [
          'Define request and response contracts, error semantics, authentication, idempotency, and versioning. Clients should be able to distinguish retryable failures from permanent validation errors.',
          'Split services around ownership and independent change only when the benefits justify network calls, deployment coordination, and distributed failure modes. A modular monolith can be a sound starting architecture.',
          'Map synchronous request paths and asynchronous workflows. Every network dependency can add latency and fail independently, so set timeouts and decide how partial failure appears to users.',
        ],
      },
      {
        heading: 'Scaling and caching',
        explanation: [
          'Scale a bottleneck based on evidence. Stateless application instances are usually easier to replicate; shared state, databases, and downstream services need their own capacity and contention plans.',
          'Load balancers distribute requests, but routing policy must account for health, locality, and uneven request costs. Request-per-second counts alone may hide expensive operations.',
          'Caching can reduce repeated work but adds staleness, invalidation, and stampede concerns. State what data may be stale, for how long, and how the system behaves when the cache is unavailable.',
        ],
      },
      {
        heading: 'Consistency and asynchronous work',
        explanation: [
          'State the consistency users require for each operation. Stronger coordination can increase latency and reduce availability during partitions; eventual consistency can improve independence while requiring conflict or reconciliation handling.',
          'Queues and event logs decouple producers from consumers and absorb bursts, but introduce duplicate delivery, delayed work, ordering questions, and poison messages. Consumers should be idempotent where retries are possible.',
          'Use an outbox or another atomic publishing strategy when a database update and event publication must not silently diverge. Define retry limits and a dead-letter or operator-recovery path.',
        ],
      },
      {
        heading: 'Reliability and observability',
        explanation: [
          'Design for partial failure with timeouts, bounded retries, backoff, jitter, rate limits, and circuit-breaking or load shedding where appropriate. Unbounded retries can amplify an outage into a cascading failure.',
          'Measure user-facing latency, traffic, errors, and saturation. Logs provide event detail, metrics show trends and alert signals, and traces connect work across service boundaries.',
          'Set service level indicators and objectives that reflect user experience, then use error budgets to balance reliability work with delivery. Practice restores, failover, and incident procedures rather than assuming recovery will work.',
        ],
        note: 'There is no universal architecture recipe. Explain the requirement, bottleneck, failure mode, and trade-off behind each design choice.',
        practiceQuestion:
          'For a service that creates orders, which operations must be atomic, and which can safely happen asynchronously?',
      },
    ],
  },
]
