import type { Lesson } from '../types'

const references = [
  { label: 'Express.js', url: 'https://expressjs.com' },
  { label: 'Express Routing', url: 'https://expressjs.com/en/guide/routing.html' },
  { label: 'Middleware', url: 'https://expressjs.com/en/guide/using-middleware.html' },
  { label: 'Error Handling', url: 'https://expressjs.com/en/guide/error-handling.html' }
]

export const expressLessons: Lesson[] = [
  {
    id: 'express-fundamentals',
    slug: 'express-fundamentals',
    technology: 'express',
    title: 'Express Fundamentals',
    category: 'Express.js',
    description: 'Learn what Express is, the app lifecycle, express(), and app.listen().',
    section: '08. Express.js',
    level: 1,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Understanding Express.js Basics'],
    references,
    sections: [
      {
        heading: 'Understanding Express.js Basics',
        explanation: [
          'Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It acts as a thin layer of fundamental web application features, abstracting the raw and sometimes verbose Node.js `http` module. This makes building robust APIs and web servers significantly faster and more intuitive.',
          'At the heart of an Express application is the `express()` function, which creates an Express application object, typically named `app`. This `app` object provides essential methods for defining routes, configuring middleware, and starting the server to listen for incoming connections. The `app.listen()` method is what binds and listens for connections on a specified host and port.',
          'One key distinction to understand is the difference between the Express `app` and the underlying HTTP server. While `app.listen()` is a convenient wrapper that internally creates an `http.Server` and passes the Express app as the callback, you can also create the HTTP server manually and pass the Express app to it. This is particularly useful when you need to attach other protocols, like WebSockets, to the same underlying server instance.'
        ],
        code: `import express from 'express';\n\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.get('/', (req, res) => {\n  res.send('Welcome to the Express Fundamentals API!');\n});\n\napp.listen(PORT, () => {\n  console.log(\`Server is listening on port \${PORT}\`);\n});`,
        output: 'Server is listening on port 3000',
        interviewQuestion: 'What is the purpose of the `app` object in Express, and how does `app.listen()` work under the hood?',
        commonMistakes: ['Forgetting to call `app.listen()`, resulting in a script that exits immediately instead of running a server.'],
        bestPractices: ['Always use environment variables for configuration values like ports and database URIs to ensure portability across environments.']
      }
    ]
  },
  {
    id: 'routing-and-http-methods',
    slug: 'routing-and-http-methods',
    technology: 'express',
    title: 'Routing & HTTP Methods',
    category: 'Express.js',
    description: 'Master routing in Express using standard HTTP methods and URL patterns.',
    section: '08. Express.js',
    level: 2,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Defining Routes and Methods'],
    references,
    sections: [
      {
        heading: 'Defining Routes and Methods',
        explanation: [
          'Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, etc.). In Express, you define routes using methods on the `app` object that correspond to HTTP methods, such as `app.get()`, `app.post()`, `app.put()`, `app.patch()`, and `app.delete()`.',
          'A route definition typically consists of a path string or regular expression, and one or more handler functions. When a request comes in that matches both the path and the HTTP method, Express executes the specified handler functions. You can also capture dynamic values from the URL using route parameters (e.g., `/users/:id`), which Express populates into the `req.params` object.',
          'For more organized routing, Express provides the `app.route()` method. This allows you to create chainable route handlers for a single route path, reducing redundancy and typos. By grouping HTTP methods for a specific path, your code becomes cleaner and easier to maintain, especially for standard CRUD endpoints.'
        ],
        code: `import express from 'express';\nconst app = express();\n\napp.route('/books')\n  .get((req, res) => {\n    res.send('Get all books');\n  })\n  .post((req, res) => {\n    res.send('Add a new book');\n  });\n\napp.get('/books/:id', (req, res) => {\n  const bookId = req.params.id;\n  res.send(\`Get book with ID: \${bookId}\`);\n});`,
        interviewQuestion: 'How does Express handle dynamic route segments, and how can you access those values in your handler?',
        commonMistakes: ['Defining generic routes (like `/:id`) before more specific routes (like `/new`), causing the generic route to catch requests meant for the specific one.'],
        bestPractices: ['Use `app.route()` to group handlers for the same path, reducing code duplication and improving readability.']
      }
    ]
  },
  {
    id: 'request-and-response',
    slug: 'request-and-response',
    technology: 'express',
    title: 'Request & Response',
    category: 'Express.js',
    description: 'Deep dive into the Express Request and Response objects.',
    section: '08. Express.js',
    level: 3,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Working with Req and Res'],
    references,
    sections: [
      {
        heading: 'Working with Req and Res',
        explanation: [
          'The Request (`req`) and Response (`res`) objects are the core interfaces through which an Express application interacts with HTTP traffic. The `req` object represents the incoming HTTP request and contains essential properties like `req.body` for the payload, `req.params` for dynamic route segments, `req.query` for query string parameters, and `req.headers` for HTTP headers.',
          'Conversely, the `res` object represents the HTTP response that an Express app sends when it receives an HTTP request. It exposes methods to set the status code (`res.status`), send data (`res.send`, `res.json`), set headers (`res.set`), and signal the end of the request-response cycle. Using `res.json()` is particularly common in API development, as it automatically stringifies the provided object and sets the correct `Content-Type` header.',
          'Understanding how to efficiently parse incoming data and format outgoing responses is critical. For instance, to access `req.body`, you must ensure the appropriate body-parsing middleware is registered (like `express.json()`). Proper manipulation of the response, including setting appropriate HTTP status codes, ensures that clients can reliably understand the outcome of their requests.'
        ],
        code: `app.use(express.json());\n\napp.post('/api/data', (req, res) => {\n  const payload = req.body;\n  const customHeader = req.headers['x-custom-header'];\n  \n  res.status(201)\n     .set('X-Response-ID', '12345')\n     .json({\n       success: true,\n       received: payload\n     });\n});`,
        interviewQuestion: 'What is the difference between `res.send()` and `res.json()`?',
        commonMistakes: ['Trying to access `req.body` without applying body-parsing middleware, resulting in `undefined`.'],
        bestPractices: ['Always explicitly set the HTTP status code before sending a response to avoid ambiguous or default 200 statuses on errors.']
      }
    ]
  },
  {
    id: 'middleware-architecture',
    slug: 'middleware-architecture',
    technology: 'express',
    title: 'Middleware Architecture',
    category: 'Express.js',
    description: 'Understand how middleware functions process requests in Express.',
    section: '08. Express.js',
    level: 4,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['The Middleware Pipeline'],
    references,
    sections: [
      {
        heading: 'The Middleware Pipeline',
        explanation: [
          'Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` middleware function in the application’s request-response cycle. They represent the core architectural pattern of Express. Middleware can execute any code, make changes to the request and the response objects, end the request-response cycle, or call the next middleware function in the stack.',
          'The order in which middleware is registered using `app.use()` or route-specific definitions is absolutely critical, as they are executed sequentially. If a middleware function does not end the request-response cycle (e.g., by calling `res.send()`), it must call `next()` to pass control to the subsequent middleware function. If it fails to do so, the request will be left hanging and eventually time out.',
          'You can create custom middleware for tasks like logging, authentication, or input sanitization. Middleware can be mounted globally to apply to all routes, or specifically to a single route or group of routes. This composability allows developers to build robust and modular processing pipelines.'
        ],
        code: `const requestLogger = (req, res, next) => {\n  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);\n  next(); // Pass control to the next middleware\n};\n\napp.use(requestLogger); // Global middleware\n\napp.get('/protected', (req, res, next) => {\n  // Route-specific middleware\n  if (!req.headers.authorization) return res.status(401).send('Unauthorized');\n  next();\n}, (req, res) => {\n  res.send('Welcome to the protected route');\n});`,
        interviewQuestion: 'What happens if a middleware function neither ends the request-response cycle nor calls `next()`?',
        commonMistakes: ['Forgetting to call `next()`, which causes the request to hang indefinitely.'],
        bestPractices: ['Keep middleware functions small and focused on a single responsibility.']
      }
    ]
  },
  {
    id: 'express-router',
    slug: 'express-router',
    technology: 'express',
    title: 'Express Router',
    category: 'Express.js',
    description: 'Organize your application using modular, mountable route handlers.',
    section: '08. Express.js',
    level: 5,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Modular Routing'],
    references,
    sections: [
      {
        heading: 'Modular Routing',
        explanation: [
          'As an Express application grows, defining all routes in a single file becomes unmanageable. The `express.Router` class is used to create modular, mountable route handlers. A Router instance is a complete middleware and routing system, often referred to as a "mini-app". It helps break down the application logic into separate, organized files.',
          'You define routes on a Router instance just as you would on the main `app` object. Once configured, you export the Router and mount it in your main application using `app.use()`, optionally under a specific route prefix (e.g., `app.use(\'/api/users\', userRouter)`). This makes versioning and organizing related endpoints highly intuitive.',
          'An important feature of Routers is the `mergeParams` option. By default, Routers do not have access to route parameters defined in the parent route path. If you need to access a parameter from a parent router (e.g., `/users/:userId/posts/:postId`), you must initialize the child router with `express.Router({ mergeParams: true })`.'
        ],
        code: `// routes/users.js\nimport express from 'express';\nconst router = express.Router();\n\nrouter.get('/', (req, res) => res.send('List of users'));\nrouter.get('/:id', (req, res) => res.send(\`User \${req.params.id}\`));\n\nexport default router;\n\n// app.js\nimport express from 'express';\nimport userRoutes from './routes/users.js';\n\nconst app = express();\napp.use('/users', userRoutes); // Mount under /users prefix`,
        interviewQuestion: 'What is the purpose of `express.Router({ mergeParams: true })`?',
        commonMistakes: ['Attempting to access parent route parameters in a child router without setting `mergeParams: true`.'],
        bestPractices: ['Organize routes by resource (e.g., users, products) and mount them under distinct prefixes in the main app file.']
      }
    ]
  },
  {
    id: 'controllers-and-services',
    slug: 'controllers-and-services',
    technology: 'express',
    title: 'Controllers & Services',
    category: 'Express.js',
    description: 'Implement the MVC pattern to separate concerns in your application.',
    section: '08. Express.js',
    level: 6,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Separation of Concerns'],
    references,
    sections: [
      {
        heading: 'Separation of Concerns',
        explanation: [
          'While Express allows you to place all logic directly inside route handlers, this leads to bloated and untestable code. A standard approach is to use the Model-View-Controller (MVC) pattern, or an API-centric variation that involves Controllers and Services. This separation of concerns ensures that routing, HTTP request handling, and business logic remain distinct.',
          'Controllers are responsible for extracting data from the incoming `req` object, validating it loosely, and passing it to a Service function. They then take the result from the Service and formulate the HTTP response using the `res` object. By keeping HTTP-specific logic out of the business layer, you ensure that your application logic is portable and testable.',
          'The Service layer contains the core business logic. It handles data manipulation, interacts with the database (Models), and executes complex workflows. Services should ideally be unaware of the Express request/response cycle. This means you can reuse service functions in different contexts, such as background jobs or CLI scripts, without modifying the logic.'
        ],
        code: `// userService.js\nexport const createUser = async (userData) => {\n  // Database logic here\n  return { id: 1, ...userData };\n};\n\n// userController.js\nimport * as userService from './userService.js';\n\nexport const handleCreateUser = async (req, res, next) => {\n  try {\n    const user = await userService.createUser(req.body);\n    res.status(201).json(user);\n  } catch (err) {\n    next(err);\n  }\n};\n\n// routes.js\nrouter.post('/', handleCreateUser);`,
        interviewQuestion: 'Why is it recommended to separate business logic into a Service layer rather than keeping it in the Controller?',
        commonMistakes: ['Passing the `req` and `res` objects directly into the Service layer, coupling business logic to the HTTP framework.'],
        bestPractices: ['Keep Controllers thin (focused on HTTP) and Services fat (focused on business rules).']
      }
    ]
  },
  {
    id: 'error-handling',
    slug: 'error-handling',
    technology: 'express',
    title: 'Error Handling',
    category: 'Express.js',
    description: 'Learn how to catch and manage errors effectively in Express routes.',
    section: '08. Express.js',
    level: 7,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Managing Asynchronous Errors'],
    references,
    sections: [
      {
        heading: 'Managing Asynchronous Errors',
        explanation: [
          'Error handling is a critical aspect of any robust application. In Express, synchronous code errors are caught automatically. However, for asynchronous code (like Promises or async/await), errors must be explicitly caught and passed to the `next` function (e.g., `next(err)`). If an unhandled promise rejection occurs, it can crash the Node.js process.',
          'To handle these errors, Express expects a special error-handling middleware function, which is distinguished by having exactly four parameters: `(err, req, res, next)`. When `next(err)` is called, Express skips all subsequent regular middleware and route handlers, jumping directly to the first registered error-handling middleware.',
          'Writing `try/catch` blocks for every async route handler can lead to repetitive code. A common practice is to use an async wrapper utility function that automatically catches errors and forwards them to `next`. This keeps your route handlers clean and ensures no async errors slip through the cracks.'
        ],
        code: `// Async error wrapper\nconst asyncHandler = (fn) => (req, res, next) => {\n  Promise.resolve(fn(req, res, next)).catch(next);\n};\n\n// Using the wrapper\napp.get('/data', asyncHandler(async (req, res) => {\n  const data = await fetchSomeData(); // Might throw\n  res.json(data);\n}));\n\n// Error handling middleware\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: 'Something broke!' });\n});`,
        interviewQuestion: 'What distinguishes an error-handling middleware function from regular middleware in Express?',
        commonMistakes: ['Defining error-handling middleware with only three parameters `(req, res, next)`, which causes Express to treat it as regular middleware.'],
        bestPractices: ['Always define error-handling middleware at the very end of your middleware stack, after all routes and other middleware.']
      }
    ]
  },
  {
    id: 'centralized-error-handling',
    slug: 'centralized-error-handling',
    technology: 'express',
    title: 'Centralized Error Handling',
    category: 'Express.js',
    description: 'Build a robust, centralized error handling pipeline for production.',
    section: '08. Express.js',
    level: 8,
    difficulty: 'advanced',
    progress: 0,
    toc: ['AppError Class and Operational Errors'],
    references,
    sections: [
      {
        heading: 'AppError Class and Operational Errors',
        explanation: [
          'In advanced applications, it is crucial to differentiate between "operational errors" (expected issues like invalid input or missing files) and "programmer errors" (bugs like unhandled exceptions). Centralized error handling involves creating a structured pipeline that can intelligently process, log, and respond to both types of errors.',
          'A standard approach is to create a custom `AppError` class that extends the built-in `Error` class. This custom class can hold additional metadata, such as HTTP status codes, whether the error is operational, and a specific error code. When an error occurs anywhere in the app, you throw an instance of `AppError`.',
          'The centralized error middleware then intercepts this `AppError`. It logs the error using a structured logger (like Winston or Pino) for observability, and determines the appropriate response payload. For operational errors, a helpful message is sent to the client. For programmer errors, a generic 500 status is returned to avoid leaking sensitive internal details.'
        ],
        code: `class AppError extends Error {\n  constructor(message, statusCode) {\n    super(message);\n    this.statusCode = statusCode;\n    this.isOperational = true;\n    Error.captureStackTrace(this, this.constructor);\n  }\n}\n\n// Throwing an operational error\nif (!user) throw new AppError('User not found', 404);\n\n// Centralized Error Middleware\nconst globalErrorHandler = (err, req, res, next) => {\n  err.statusCode = err.statusCode || 500;\n  err.status = err.status || 'error';\n\n  if (err.isOperational) {\n    res.status(err.statusCode).json({ status: err.status, message: err.message });\n  } else {\n    // Log programmer error internally\n    console.error('ERROR 💥:', err);\n    res.status(500).json({ status: 'error', message: 'Something went very wrong!' });\n  }\n};`,
        interviewQuestion: 'Why is it important to distinguish between operational errors and programmer errors?',
        commonMistakes: ['Sending raw error stack traces to the client in production, exposing sensitive backend implementation details.'],
        bestPractices: ['Create a dedicated module for centralized error handling to ensure consistent error responses and logging throughout the application.']
      }
    ]
  },
  {
    id: 'validation-and-sanitization',
    slug: 'validation-and-sanitization',
    technology: 'express',
    title: 'Validation & Sanitization',
    category: 'Express.js',
    description: 'Ensure data integrity using schema validation middleware.',
    section: '08. Express.js',
    level: 9,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Schema Validation Middleware'],
    references,
    sections: [
      {
        heading: 'Schema Validation Middleware',
        explanation: [
          'Never trust client input. Validation ensures that the data sent to your API meets the required format, types, and constraints before it reaches your business logic. Sanitization involves cleaning or modifying the input to prevent injection attacks or format mismatches. Doing this early in the request lifecycle is crucial for security and data integrity.',
          'Modern Node.js applications typically use schema validation libraries like Zod, Joi, or Yup. These libraries allow you to define schemas that strictly describe the expected shape of your data. You can then create a reusable middleware factory function that takes a schema and validates `req.body`, `req.query`, or `req.params` against it.',
          'If the validation fails, the middleware immediately intercepts the request and responds with a 400 Bad Request error containing detailed validation issues. This fail-fast approach prevents malformed data from causing deeper runtime errors and provides immediate, actionable feedback to the API consumer.'
        ],
        code: `import { z } from 'zod';\n\nconst userSchema = z.object({\n  body: z.object({\n    email: z.string().email(),\n    password: z.string().min(6)\n  })\n});\n\nconst validate = (schema) => (req, res, next) => {\n  try {\n    schema.parse({\n      body: req.body,\n      query: req.query,\n      params: req.params\n    });\n    next();\n  } catch (error) {\n    return res.status(400).json(error.errors);\n  }\n};\n\napp.post('/register', validate(userSchema), (req, res) => {\n  res.send('User registered successfully');\n});`,
        interviewQuestion: 'What are the benefits of using a schema validation library (like Zod) in middleware instead of writing manual if-statements?',
        commonMistakes: ['Only validating `req.body` and ignoring `req.query` and `req.params`, which can also be vectors for injection.'],
        bestPractices: ['Strip unknown properties from incoming requests during validation to prevent mass assignment vulnerabilities.']
      }
    ]
  },
  {
    id: 'authentication-and-route-protection',
    slug: 'authentication-and-route-protection',
    technology: 'express',
    title: 'Authentication & Route Protection',
    category: 'Express.js',
    description: 'Protect routes using JWT authentication middleware.',
    section: '08. Express.js',
    level: 10,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Protecting Routes with JWT'],
    references,
    sections: [
      {
        heading: 'Protecting Routes with JWT',
        explanation: [
          'Authentication verifies the identity of a user making a request. In stateless APIs, JSON Web Tokens (JWT) are the standard mechanism. After a successful login, the server issues a JWT. For subsequent requests, the client must include this token, typically in the `Authorization` header as a Bearer token.',
          'To protect routes, you create a custom authentication middleware. This middleware intercepts the request, extracts the JWT from the headers, and verifies its signature and expiration using a secret key. If the token is invalid, expired, or missing, the middleware immediately responds with a 401 Unauthorized status.',
          'If the token is valid, the middleware decodes the payload (which usually contains a user ID) and attaches the decoded information to the `req` object (e.g., `req.user = decodedUser`). This allows subsequent middleware and route handlers to know exactly who is making the request, enabling role-based access control and personalized responses.'
        ],
        code: `import jwt from 'jsonwebtoken';\n\nconst protect = (req, res, next) => {\n  let token;\n  if (req.headers.authorization?.startsWith('Bearer')) {\n    token = req.headers.authorization.split(' ')[1];\n  }\n\n  if (!token) {\n    return res.status(401).json({ error: 'Not authorized to access this route' });\n  }\n\n  try {\n    const decoded = jwt.verify(token, process.env.JWT_SECRET);\n    req.user = decoded; // Attach user info to request\n    next();\n  } catch (err) {\n    return res.status(401).json({ error: 'Token is invalid or expired' });\n  }\n};\n\napp.get('/dashboard', protect, (req, res) => {\n  res.json({ message: \`Welcome user \${req.user.id}\` });\n});`,
        interviewQuestion: 'How does attaching user data to the `req` object in middleware benefit subsequent route handlers?',
        commonMistakes: ['Storing sensitive information like passwords or PII directly within the JWT payload.'],
        bestPractices: ['Ensure JWTs have a reasonably short expiration time and consider implementing a refresh token rotation strategy for enhanced security.']
      }
    ]
  },
  {
    id: 'file-uploads',
    slug: 'file-uploads',
    technology: 'express',
    title: 'File Uploads',
    category: 'Express.js',
    description: 'Handle multipart/form-data uploads using Multer.',
    section: '08. Express.js',
    level: 11,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Managing Multipart Data with Multer'],
    references,
    sections: [
      {
        heading: 'Managing Multipart Data with Multer',
        explanation: [
          'Handling file uploads in Node.js requires parsing `multipart/form-data` requests, which native Express body parsers do not support. Multer is the standard middleware used specifically for this purpose. It efficiently streams incoming file data to disk or memory, preventing large files from overwhelming the server.',
          'When configuring Multer, you must specify a storage engine. `DiskStorage` saves the files directly to the local file system, which is useful for temporary processing or simple hosting. `MemoryStorage` keeps the file as a buffer in RAM, which is ideal if you intend to immediately stream the file to a cloud storage provider like AWS S3 without writing to the local disk.',
          'Security is paramount when accepting file uploads. You should rigorously filter uploads by file extension and MIME type to prevent the execution of malicious scripts. Additionally, imposing strict file size limits prevents Denial of Service (DoS) attacks where attackers attempt to fill your server\'s disk or exhaust its memory.'
        ],
        code: `import multer from 'multer';\nimport path from 'path';\n\nconst storage = multer.diskStorage({\n  destination: './uploads/',\n  filename: (req, file, cb) => {\n    cb(null, \`\${Date.now()}-\${file.originalname}\`);\n  }\n});\n\nconst upload = multer({\n  storage,\n  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit\n  fileFilter: (req, file, cb) => {\n    const ext = path.extname(file.originalname).toLowerCase();\n    if (ext !== '.png' && ext !== '.jpg') {\n      return cb(new Error('Only images are allowed'));\n    }\n    cb(null, true);\n  }\n});\n\napp.post('/upload', upload.single('avatar'), (req, res) => {\n  res.json({ file: req.file });\n});`,
        interviewQuestion: 'What are the risks of using Multer\'s `MemoryStorage` for large file uploads?',
        commonMistakes: ['Failing to validate the file extension and MIME type, allowing users to upload executable scripts.'],
        bestPractices: ['Offload file storage to a dedicated cloud service like Amazon S3 or Cloudinary rather than relying on the local application server storage.']
      }
    ]
  },
  {
    id: 'production-best-practices',
    slug: 'production-best-practices',
    technology: 'express',
    title: 'Production Best Practices',
    category: 'Express.js',
    description: 'Prepare your Express API for production environments.',
    section: '08. Express.js',
    level: 12,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Securing and Scaling Express APIs'],
    references,
    sections: [
      {
        heading: 'Securing and Scaling Express APIs',
        explanation: [
          'Deploying an Express application to production requires mitigating security vulnerabilities and ensuring resilience. Using security middleware like Helmet helps protect your app by setting various HTTP headers that prevent common attacks (e.g., Cross-Site Scripting, Clickjacking). Configuring CORS correctly restricts which domains can access your API, preventing unauthorized cross-origin requests.',
          'Rate limiting is essential to protect your endpoints from brute-force attacks and abuse. Libraries like `express-rate-limit` allow you to restrict the number of requests a single IP address can make within a specified time frame. Additionally, implementing structured logging (using tools like Pino or Winston) provides searchable, machine-readable logs that are vital for debugging issues in production.',
          'Finally, handling application termination safely is critical for zero-downtime deployments. Implementing graceful shutdown ensures that when the Node.js process receives a termination signal (SIGTERM/SIGINT), it stops accepting new requests, finishes processing active requests, safely closes database connections, and then exits.'
        ],
        code: `import helmet from 'helmet';\nimport cors from 'cors';\nimport rateLimit from 'express-rate-limit';\n\napp.use(helmet()); // Secure HTTP headers\napp.use(cors({ origin: 'https://myapp.com' }));\n\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100 // Limit each IP to 100 requests per windowMs\n});\napp.use('/api', limiter);\n\n// Graceful Shutdown\nconst server = app.listen(3000);\nprocess.on('SIGTERM', () => {\n  console.log('SIGTERM signal received: closing HTTP server');\n  server.close(() => {\n    console.log('HTTP server closed');\n    // Close database connection here\n    process.exit(0);\n  });\n});`,
        interviewQuestion: 'What does graceful shutdown mean, and why is it important in containerized environments like Kubernetes?',
        commonMistakes: ['Exposing stack traces or internal configuration details through error messages in the production environment.'],
        bestPractices: ['Implement a dedicated `/health` endpoint to allow load balancers and orchestrators to verify application availability.']
      }
    ]
  }
];
