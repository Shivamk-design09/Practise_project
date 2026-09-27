import type { Lesson } from '../types'

const references = [
  { label: 'MDN HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
  { label: 'REST API Tutorial', url: 'https://restfulapi.net/' },
  { label: 'HTTP Status Codes', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status' }
]

export const apiLessons: Lesson[] = [
  {
    id: 'rest-api-fundamentals',
    slug: 'rest-api-fundamentals',
    technology: 'api',
    title: 'REST API Fundamentals',
    category: 'API Development',
    description: 'Understand the constraints and principles of REST architecture.',
    section: '09. API Development',
    level: 1,
    difficulty: 'beginner',
    progress: 0,
    toc: ['REST Constraints and Principles'],
    references,
    sections: [
      {
        heading: 'REST Constraints and Principles',
        explanation: [
          'REST (Representational State Transfer) is an architectural style for designing networked applications. Unlike protocols like SOAP, REST relies on standard HTTP methods and conventions. A core tenet of REST is that URLs should represent resources (nouns like `/users` or `/products`), not actions (verbs like `/getUsers`). This creates a predictable and logical structure for consumers.',
          'One of the most critical constraints of REST is statelessness. This means that every HTTP request from a client to the server must contain all the information needed to understand and process the request. The server must not rely on any stored context (like session state) between requests. This constraint vastly improves scalability and reliability.',
          'REST APIs must also adhere to a uniform interface. This means utilizing standard HTTP verbs correctly, providing consistent resource representations (typically JSON), and using hypermedia (HATEOAS) when possible to guide clients through the application state. Adhering to these principles results in APIs that are robust, decoupled, and easy to evolve.'
        ],
        code: `// Good REST API Design:\nGET /users           // Get all users\nGET /users/123       // Get user 123\nPOST /users          // Create a new user\nPUT /users/123       // Replace user 123\nDELETE /users/123    // Delete user 123\n\n// Bad (Non-RESTful) Design:\nGET /getAllUsers\nPOST /createUser\nPOST /updateUser?id=123`,
        interviewQuestion: 'What does "statelessness" mean in the context of REST, and why is it beneficial for scaling?',
        commonMistakes: ['Designing endpoints with verbs in the URL instead of relying on HTTP methods (e.g., using `/deleteUser/1` instead of `DELETE /users/1`).'],
        bestPractices: ['Always use plural nouns for collections (e.g., `/articles` instead of `/article`) to maintain consistency.']
      }
    ]
  },
  {
    id: 'crud-operations',
    slug: 'crud-operations',
    technology: 'api',
    title: 'CRUD Operations',
    category: 'API Development',
    description: 'Map database CRUD operations to standard HTTP methods.',
    section: '09. API Development',
    level: 2,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Mapping Actions to HTTP Methods'],
    references,
    sections: [
      {
        heading: 'Mapping Actions to HTTP Methods',
        explanation: [
          'CRUD stands for Create, Read, Update, and Delete. These are the four basic functions of persistent storage. In REST API design, these database operations map directly to specific HTTP methods. Create maps to `POST`, Read maps to `GET`, Update maps to `PUT` or `PATCH`, and Delete maps to `DELETE`. This mapping establishes a universal language for API consumers.',
          'An important concept related to these operations is idempotency. An operation is idempotent if executing it multiple times produces the same outcome as executing it once. `GET`, `PUT`, and `DELETE` are expected to be idempotent. For example, deleting a user that has already been deleted should not cause adverse side effects or change the state further.',
          '`POST` is explicitly non-idempotent because firing the same `POST` request multiple times typically results in the creation of multiple duplicate resources. Understanding the idempotency of each CRUD operation helps developers design retry mechanisms safely, especially in distributed networks where requests might drop.'
        ],
        code: `// Express CRUD implementation\napp.post('/items', (req, res) => { /* Create */ });\napp.get('/items', (req, res) => { /* Read All */ });\napp.get('/items/:id', (req, res) => { /* Read One */ });\napp.put('/items/:id', (req, res) => { /* Update/Replace completely */ });\napp.patch('/items/:id', (req, res) => { /* Update partially */ });\napp.delete('/items/:id', (req, res) => { /* Delete */ });`,
        interviewQuestion: 'Explain the concept of idempotency and identify which HTTP methods are idempotent.',
        commonMistakes: ['Using `GET` requests to modify data, which violates HTTP semantics and exposes the API to unintentional side effects via caching or pre-fetching.'],
        bestPractices: ['Ensure that `PUT` endpoints fully replace the existing resource, while `PATCH` endpoints apply partial modifications.']
      }
    ]
  },
  {
    id: 'http-methods-deep-dive',
    slug: 'http-methods-deep-dive',
    technology: 'api',
    title: 'HTTP Methods Deep Dive',
    category: 'API Development',
    description: 'Explore HTTP verbs, including safe and idempotent methods.',
    section: '09. API Development',
    level: 3,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Advanced HTTP Methods'],
    references,
    sections: [
      {
        heading: 'Advanced HTTP Methods',
        explanation: [
          'Beyond the basic CRUD operations, HTTP provides other verbs that are essential for a complete API implementation. The `HEAD` method requests the headers that would be returned if the URL were requested with an HTTP `GET` method. It is highly useful for checking if a resource exists or checking its size without downloading the entire body.',
          'The `OPTIONS` method is used to describe the communication options for the target resource. It is heavily utilized by web browsers during Cross-Origin Resource Sharing (CORS) preflight requests to determine which HTTP methods and headers are permitted by the server for a specific endpoint.',
          'Methods are categorized as "safe" if they do not alter the server state (e.g., `GET`, `HEAD`, `OPTIONS`). Safe methods are inherently idempotent and can be aggressively cached by clients and CDNs. Understanding the distinction between safe, idempotent, and non-idempotent methods is crucial for API reliability and performance optimization.'
        ],
        code: `// Handling OPTIONS manually (though CORS middleware usually handles this)\napp.options('/api/resource', (req, res) => {\n  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');\n  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');\n  res.status(204).end();\n});\n\n// Handling HEAD request\napp.head('/api/large-file', (req, res) => {\n  res.set('Content-Length', '1048576');\n  res.status(200).end();\n});`,
        interviewQuestion: 'When would a client use a `HEAD` request instead of a `GET` request?',
        commonMistakes: ['Failing to respond to `OPTIONS` requests, which prevents browser-based clients from successfully making cross-origin API calls.'],
        bestPractices: ['Rely on standard CORS middleware to handle `OPTIONS` preflight requests rather than managing them manually.']
      }
    ]
  },
  {
    id: 'http-status-codes',
    slug: 'http-status-codes',
    technology: 'api',
    title: 'HTTP Status Codes',
    category: 'API Development',
    description: 'Select the correct response codes for success and error states.',
    section: '09. API Development',
    level: 4,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Understanding Status Codes'],
    references,
    sections: [
      {
        heading: 'Understanding Status Codes',
        explanation: [
          'HTTP status codes are a critical part of the REST API contract. They provide machine-readable information about the result of a request. Codes are grouped into five classes: 1xx (Informational), 2xx (Successful), 3xx (Redirection), 4xx (Client Error), and 5xx (Server Error). Using the appropriate status code ensures clients can programmatically handle API responses.',
          'The 2xx family indicates success. `200 OK` is standard, while `201 Created` indicates a resource was successfully created (typically via POST). `204 No Content` means the request succeeded, but there is no data to return (often used for DELETE). The 4xx family indicates the client made a mistake. `400 Bad Request` means malformed syntax or validation failure, `401 Unauthorized` means lacking valid authentication, `403 Forbidden` means lacking permissions, and `404 Not Found` means the resource does not exist.',
          'The 5xx family indicates the server failed to fulfill a valid request. `500 Internal Server Error` is a generic catch-all for unexpected crashes, while `502 Bad Gateway` and `503 Service Unavailable` indicate infrastructure or routing issues. Accurate use of 4xx vs 5xx is critical; returning a 500 when a user forgets a required field breaks the semantics of HTTP.'
        ],
        code: `app.post('/login', (req, res) => {\n  const { user, password } = req.body;\n  if (!user || !password) {\n    return res.status(400).json({ error: 'Missing credentials' });\n  }\n  if (password !== 'secret') {\n    return res.status(401).json({ error: 'Invalid credentials' });\n  }\n  res.status(200).json({ token: 'abc123xyz' });\n});`,
        interviewQuestion: 'What is the difference between a 401 Unauthorized and a 403 Forbidden status code?',
        commonMistakes: ['Returning `200 OK` with an error message in the JSON payload (e.g., `{ error: true, code: 500 }`), forcing clients to manually parse every response to check for errors.'],
        bestPractices: ['Always pair a 4xx or 5xx status code with a descriptive JSON payload explaining the error and how to resolve it.']
      }
    ]
  },
  {
    id: 'headers-and-content-types',
    slug: 'headers-and-content-types',
    technology: 'api',
    title: 'Headers & Content Types',
    category: 'API Development',
    description: 'Use HTTP headers to manage content negotiation and metadata.',
    section: '09. API Development',
    level: 5,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Content Negotiation and Headers'],
    references,
    sections: [
      {
        heading: 'Content Negotiation and Headers',
        explanation: [
          'HTTP headers are key-value pairs sent between the client and server that carry metadata about the request or response. They dictate caching policies, authentication credentials, and data formatting. One of the most important concepts is content negotiation, handled primarily by the `Accept` and `Content-Type` headers.',
          'The `Content-Type` header tells the receiver what data format is being sent in the body (e.g., `application/json`, `multipart/form-data`, `text/html`). Conversely, the client sends an `Accept` header to declare what formats it is capable of processing. A robust API checks the `Accept` header and formats its response accordingly, or returns a `406 Not Acceptable` if the requested format is unsupported.',
          'Custom headers are also frequently used for API-specific metadata, such as request tracing IDs, rate limit statuses, or API versioning. By convention, custom headers were historically prefixed with `X-` (e.g., `X-RateLimit-Remaining`), though modern RFCs suggest dropping the prefix and using descriptive names directly.'
        ],
        code: `app.get('/data', (req, res) => {\n  const data = { message: 'Hello World' };\n  \n  // Content Negotiation\n  if (req.accepts('json')) {\n    res.set('X-Trace-Id', 'trace-98765');\n    res.json(data);\n  } else if (req.accepts('html')) {\n    res.send(\`<h1>\${data.message}</h1>\`);\n  } else {\n    res.status(406).send('Not Acceptable');\n  }\n});`,
        interviewQuestion: 'Explain how the `Accept` and `Content-Type` headers work together during content negotiation.',
        commonMistakes: ['Failing to set the `Content-Type` header, forcing the client to guess or parse the payload incorrectly.'],
        bestPractices: ['Include standard HTTP security headers (like HSTS and X-Content-Type-Options) in all API responses to protect clients.']
      }
    ]
  },
  {
    id: 'query-and-route-parameters',
    slug: 'query-and-route-parameters',
    technology: 'api',
    title: 'Query & Route Parameters',
    category: 'API Development',
    description: 'Design URLs effectively using route params and query strings.',
    section: '09. API Development',
    level: 6,
    difficulty: 'beginner',
    progress: 0,
    toc: ['URL Design Patterns'],
    references,
    sections: [
      {
        heading: 'URL Design Patterns',
        explanation: [
          'In RESTful API design, dynamic data is passed through URLs in two distinct ways: route parameters and query strings. Route parameters (`/users/:id`) represent specific resources or hierarchical identifiers. They are structurally part of the URI path and are necessary to identify the exact resource being manipulated.',
          'Query strings (`/users?role=admin&sort=asc`), on the other hand, are appended to the end of the URL after a question mark. They are typically used for filtering, sorting, searching, or paginating a collection of resources. They are optional parameters that modify the result set rather than identifying a specific resource.',
          'When designing nested resources, a common rule of thumb is to limit nesting to two or three levels to avoid overly complex URLs. For example, `/users/:userId/posts/:postId` is acceptable, but going deeper (e.g., `/users/:userId/posts/:postId/comments/:commentId`) becomes unwieldy. In deeper relationships, it is better to access the sub-resource directly if it has a globally unique ID (e.g., `/comments/:commentId`).'
        ],
        code: `// Route Parameter: Identifying a specific resource\napp.get('/users/:userId/posts/:postId', (req, res) => {\n  const { userId, postId } = req.params;\n  res.send(\`Fetching post \${postId} by user \${userId}\`);\n});\n\n// Query String: Filtering and sorting a collection\napp.get('/users', (req, res) => {\n  const { role, limit, sort } = req.query;\n  // logic to fetch users where role=role, limit=limit, order=sort\n  res.send(\`Fetching users with role: \${role}\`);\n});`,
        interviewQuestion: 'When designing a REST API, when should you use a route parameter versus a query parameter?',
        commonMistakes: ['Using query strings to identify specific individual resources (e.g., `/getUser?id=123`) instead of path parameters.'],
        bestPractices: ['Keep URL path nesting shallow; prefer direct endpoints for deeply nested relationships.']
      }
    ]
  },
  {
    id: 'request-body-parsing',
    slug: 'request-body-parsing',
    technology: 'api',
    title: 'Request Body Parsing',
    category: 'API Development',
    description: 'Handle various data payloads securely and efficiently.',
    section: '09. API Development',
    level: 7,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Parsing Payloads'],
    references,
    sections: [
      {
        heading: 'Parsing Payloads',
        explanation: [
          'APIs receive data payloads in several formats, dictated by the client\'s `Content-Type` header. The most common format for modern APIs is `application/json`. However, web forms typically submit data as `application/x-www-form-urlencoded`, and file uploads require `multipart/form-data`.',
          'To process these payloads, the server must run the request stream through specific parsers. In Express, this is handled by built-in middleware like `express.json()` and `express.urlencoded()`. These middleware intercept the request, buffer the incoming data stream, parse it according to the header, and populate the `req.body` object.',
          'Security is a major concern when parsing bodies. Attackers can send massive payloads to exhaust server memory (Denial of Service). To prevent this, parsers must be configured with strict payload size limits. For example, `express.json({ limit: \'100kb\' })` ensures that requests exceeding this size are rejected before they are fully read into memory.'
        ],
        code: `// Parse JSON bodies (e.g. from React/Axios)\napp.use(express.json({ limit: '1mb' }));\n\n// Parse URL-encoded bodies (e.g. from HTML forms)\napp.use(express.urlencoded({ extended: true, limit: '1mb' }));\n\napp.post('/data', (req, res) => {\n  // req.body is now populated based on the parsed format\n  console.log(req.body);\n  res.send('Payload received');\n});`,
        interviewQuestion: 'Why is it important to set payload size limits on body parsing middleware?',
        commonMistakes: ['Attempting to parse `multipart/form-data` requests using `express.json()`, which silently fails and leaves `req.body` empty.'],
        bestPractices: ['Apply body parsing middleware specifically to the routes that need it, rather than globally, if large file uploads are handled differently elsewhere.']
      }
    ]
  },
  {
    id: 'pagination',
    slug: 'pagination',
    technology: 'api',
    title: 'Pagination',
    category: 'API Development',
    description: 'Implement efficient data pagination strategies.',
    section: '09. API Development',
    level: 8,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Pagination Strategies'],
    references,
    sections: [
      {
        heading: 'Pagination Strategies',
        explanation: [
          'When an API returns collections, returning all records at once degrades performance and overwhelms the client. Pagination limits the payload size by returning data in chunks. The two primary strategies are Offset-based pagination and Cursor-based pagination. Choosing the right strategy depends on the dataset size and update frequency.',
          'Offset-based pagination uses `page` and `limit` query parameters (e.g., `?page=2&limit=20`). The database skips `(page - 1) * limit` rows. While easy to implement, it suffers from performance degradation on large offsets (the database must scan and discard all preceding rows) and can result in duplicated or missed items if records are inserted or deleted while the user is paging.',
          'Cursor-based (or keyset) pagination uses a unique identifier from the last received item (e.g., `?cursor=last_id&limit=20`). The database queries for items strictly after that ID. This approach is highly performant regardless of depth and is immune to real-time data shifts, making it the preferred standard for endless feeds (like Twitter or Instagram).'
        ],
        code: `// Offset-based pagination implementation\napp.get('/articles', async (req, res) => {\n  const page = parseInt(req.query.page) || 1;\n  const limit = parseInt(req.query.limit) || 10;\n  const offset = (page - 1) * limit;\n\n  // Pseudo-code database call\n  const articles = await db.articles.find().skip(offset).limit(limit);\n  const total = await db.articles.countDocuments();\n\n  res.json({\n    data: articles,\n    meta: { page, limit, total, totalPages: Math.ceil(total / limit) }\n  });\n});`,
        interviewQuestion: 'What are the performance drawbacks of offset-based pagination on large datasets compared to cursor-based pagination?',
        commonMistakes: ['Failing to validate maximum limits (e.g., allowing a user to request `limit=1000000`), which causes performance bottlenecks.'],
        bestPractices: ['Include pagination metadata (like next page URL or total count) in the response envelope or HTTP Link headers to help clients navigate.']
      }
    ]
  },
  {
    id: 'filtering-and-sorting',
    slug: 'filtering-and-sorting',
    technology: 'api',
    title: 'Filtering & Sorting',
    category: 'API Development',
    description: 'Build flexible APIs with query-based filtering and sorting.',
    section: '09. API Development',
    level: 9,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Advanced Querying'],
    references,
    sections: [
      {
        heading: 'Advanced Querying',
        explanation: [
          'Filtering and sorting allow API consumers to refine datasets to their specific needs. Filtering is typically handled by mapping query string parameters to database query constraints. For exact matches, parameters like `?status=active` are straightforward. However, robust APIs often support advanced comparison operators, such as greater than (`gt`) or less than (`lt`), encoded in the query string (e.g., `?price[gte]=100`).',
          'Sorting requires interpreting query parameters to define the order of results. A common pattern is using a `sort` parameter where multiple fields are comma-separated, and a prefix (like a minus sign `-`) indicates descending order. For example, `?sort=-createdAt,price` dictates sorting by creation date descending, and then by price ascending.',
          'When implementing these features, security and performance must be carefully managed. The API must validate which fields are allowed for filtering and sorting to prevent malicious clients from querying unindexed fields, which could cause full table scans and degrade database performance (a type of DoS attack).'
        ],
        code: `app.get('/products', async (req, res) => {\n  // 1. Filtering\n  const queryObj = { ...req.query };\n  const excludedFields = ['page', 'sort', 'limit', 'fields'];\n  excludedFields.forEach(el => delete queryObj[el]);\n\n  // Convert query string like { price: { gte: '50' } } to MongoDB format\n  let queryStr = JSON.stringify(queryObj);\n  queryStr = queryStr.replace(/\\b(gte|gt|lte|lt)\\b/g, match => \`$\${match}\`);\n  \n  let dbQuery = Product.find(JSON.parse(queryStr));\n\n  // 2. Sorting\n  if (req.query.sort) {\n    const sortBy = req.query.sort.split(',').join(' '); // e.g., "-price name"\n    dbQuery = dbQuery.sort(sortBy);\n  } else {\n    dbQuery = dbQuery.sort('-createdAt'); // Default sort\n  }\n\n  const products = await dbQuery;\n  res.json({ results: products.length, data: products });\n});`,
        interviewQuestion: 'How would you prevent a client from performing a database-intensive sort on an unindexed field?',
        commonMistakes: ['Directly injecting `req.query` into a database query without validation or sanitization, potentially allowing NoSQL injection.'],
        bestPractices: ['Maintain a strict whitelist of fields that can be filtered or sorted, ensuring they correspond to database indexes.']
      }
    ]
  },
  {
    id: 'searching',
    slug: 'searching',
    technology: 'api',
    title: 'Searching',
    category: 'API Development',
    description: 'Implement full-text and fuzzy search capabilities.',
    section: '09. API Development',
    level: 10,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Implementing Search'],
    references,
    sections: [
      {
        heading: 'Implementing Search',
        explanation: [
          'While filtering looks for exact matches or specific range constraints, searching is designed for unstructured human input, often involving text analysis, partial matches, and relevance scoring. An API typically exposes search functionality via a generic query parameter, such as `?q=searchterm`.',
          'Standard database `LIKE` clauses (or regex matching in NoSQL) are highly inefficient for text searches across large datasets because they cannot utilize standard indexes effectively, resulting in full collection scans. For robust search functionality, a specialized Full-Text Search index is required on the database level.',
          'For highly complex search requirements involving fuzzy matching (typo tolerance), faceted search, and complex scoring, it is a best practice to offload search workloads to specialized search engines like Elasticsearch, Algolia, or Meilisearch. The API acts as a proxy, passing the search query to the engine and returning the formatted results to the client.'
        ],
        code: `// Simple MongoDB Full-Text Search Example\n// Requires a text index on the collection: db.articles.createIndex({ title: "text", content: "text" })\n\napp.get('/articles/search', async (req, res) => {\n  const searchTerm = req.query.q;\n  \n  if (!searchTerm) {\n    return res.status(400).json({ error: 'Search term "q" is required' });\n  }\n\n  // $text operator performs a text search on the content of the fields indexed with a text index.\n  const results = await db.articles.find(\n    { $text: { $search: searchTerm } },\n    { score: { $meta: "textScore" } } // Project the relevance score\n  ).sort({ score: { $meta: "textScore" } }); // Sort by relevance\n\n  res.json({ data: results });\n});`,
        interviewQuestion: 'Why is using a regex or SQL `LIKE` operator generally a bad idea for searching large text fields?',
        commonMistakes: ['Implementing search endpoints that execute expensive regex matching on every request without caching or rate limiting.'],
        bestPractices: ['Offload complex search requirements to dedicated search infrastructure like Elasticsearch to ensure low latency and typo tolerance.']
      }
    ]
  },
  {
    id: 'api-versioning',
    slug: 'api-versioning',
    technology: 'api',
    title: 'API Versioning',
    category: 'API Development',
    description: 'Maintain backwards compatibility using API versioning strategies.',
    section: '09. API Development',
    level: 11,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Versioning Strategies'],
    references,
    sections: [
      {
        heading: 'Versioning Strategies',
        explanation: [
          'As your application evolves, you will inevitably need to introduce breaking changes to your API—such as altering response structures, changing validation rules, or deprecating endpoints. API versioning ensures that existing clients continue to function normally while new clients can take advantage of updated features. Failing to version an API leads to client breakage.',
          'There are several strategies for versioning. The most common is URI versioning (e.g., `/api/v1/users` vs `/api/v2/users`). It is highly visible, easily cacheable, and simple to route. Another approach is Header versioning, where the client specifies the version in an `Accept` header (e.g., `Accept: application/vnd.myapi.v2+json`). This keeps URLs clean but complicates caching and manual testing.',
          'A successful versioning strategy also requires a deprecation lifecycle. When a new version is released, the old version should be marked as deprecated using HTTP `Warning` headers or documentation, and a clear timeline for its ultimate removal (sunset) must be communicated to API consumers. Maintaining multiple active versions increases server and codebase overhead, so old versions should be pruned eventually.'
        ],
        code: `// URI Versioning Structure in Express\nimport v1UserRoutes from './routes/v1/users.js';\nimport v2UserRoutes from './routes/v2/users.js';\n\nconst app = express();\n\n// Mount different versions on different paths\napp.use('/api/v1/users', v1UserRoutes);\napp.use('/api/v2/users', v2UserRoutes);\n\n// Example of header-based routing middleware (Alternative Approach)\nconst headerVersioning = (req, res, next) => {\n  const version = req.headers['accept-version'];\n  if (version === 'v2') {\n    return v2UserRoutes(req, res, next);\n  }\n  return v1UserRoutes(req, res, next);\n};`,
        interviewQuestion: 'Compare URI versioning with HTTP Header versioning. What are the pros and cons of each?',
        commonMistakes: ['Making breaking changes (like renaming a widely-used field) to an unversioned API, causing existing mobile apps or third-party integrations to crash.'],
        bestPractices: ['Establish a clear API lifecycle policy, including deprecation schedules and sunset dates, before releasing the first public version of your API.']
      }
    ]
  }
];
