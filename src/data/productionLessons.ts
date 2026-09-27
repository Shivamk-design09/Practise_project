import type { Lesson } from '../types'

const references = [
  { label: 'Node.js Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices' },
  { label: 'Pino Logger', url: 'https://getpino.io/' },
  { label: 'PM2', url: 'https://pm2.keymetrics.io/docs/usage/quick-start/' },
]

export const productionLessons: Lesson[] = [
  {
    id: 'logging',
    slug: 'logging',
    technology: 'production',
    title: 'Logging',
    category: 'Production',
    description: 'Implement structured, performant logging for production observability.',
    section: '12. Production',
    level: 1,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Structured Logging', 'Log Levels', 'Using Pino'],
    references,
    sections: [
      {
        heading: 'Structured Logging',
        explanation: [
          'In development, `console.log()` is sufficient for debugging. However, in production, raw text logs are incredibly difficult to search, parse, and analyze. Production environments require structured logging.',
          'Structured logging means writing log entries as structured data objects, usually in JSON format. Instead of a string like "User 123 logged in from IP 1.2.3.4", a structured log looks like `{"level":"info","event":"user_login","userId":123,"ip":"1.2.3.4"}`.',
          'This format allows log aggregation tools (like Datadog, ELK stack, or Splunk) to easily ingest, index, and query the logs. You can instantly filter for all errors related to a specific user ID or visualize authentication failures over time.'
        ],
        whyItMatters: 'Structured logging transforms logs from unsearchable text blocks into queryable data streams, essential for debugging distributed systems.',
        interviewQuestion: 'Why is JSON logging preferred over plain text logging in production?'
      },
      {
        heading: 'Log Levels',
        explanation: [
          'Logging everything in production creates noise and consumes significant storage and bandwidth. Log levels allow you to categorize the severity of logs and filter them accordingly.',
          'Common levels include DEBUG (verbose info for development), INFO (normal application events), WARN (unexpected situations that aren\'t errors, like a deprecated API call), ERROR (exceptions that need attention), and FATAL (application-crashing errors).',
          'In production, you typically configure the application to only output logs at the INFO level and above. If a specific issue occurs, you can dynamically change the log level to DEBUG to gather more information without redeploying.'
        ],
        whyItMatters: 'Log levels help separate critical alerts from routine operational noise and manage storage costs.',
        interviewQuestion: 'What is the difference between a WARN level log and an ERROR level log?'
      },
      {
        heading: 'Using Pino',
        explanation: [
          'Node.js applications demand high-performance logging. Traditional libraries like Winston or Morgan can sometimes become a bottleneck due to the overhead of stringifying JSON on the main thread.',
          'Pino is a highly performant, low-overhead logging library. It achieves its speed by minimizing processing on the main thread and moving tasks like log formatting and transport to separate worker threads.',
          'Pino provides structured logging out of the box. For Express applications, `pino-http` is commonly used to automatically log incoming requests and outgoing responses, attaching unique request IDs to trace interactions through the system.'
        ],
        code: `import pino from 'pino';\nimport pinoHttp from 'pino-http';\nimport express from 'express';\n\n// Create a logger instance\nconst logger = pino({ level: process.env.LOG_LEVEL || 'info' });\n\nconst app = express();\n\n// Add request logging middleware\napp.use(pinoHttp({ logger }));\n\napp.get('/', (req, res) => {\n  req.log.info('Handling request for root route');\n  res.send('Hello World');\n});`,
        bestPractices: ['Never log sensitive data (PII, passwords, tokens)', 'Attach a unique request ID to all logs associated with a specific HTTP request for tracing'],
        commonMistakes: ['Using `console.log` in production, which is synchronous and can block the event loop']
      }
    ]
  },
  {
    id: 'error-monitoring',
    slug: 'error-monitoring',
    technology: 'production',
    title: 'Error Monitoring',
    category: 'Production',
    description: 'Track, categorize, and alert on unhandled errors in your application.',
    section: '12. Production',
    level: 2,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Error Tracking Services', 'Unhandled Exceptions', 'Error Alerting'],
    references,
    sections: [
      {
        heading: 'Error Tracking Services',
        explanation: [
          'Relying solely on logs to discover errors is reactive and inefficient. You need proactive error monitoring. Tools like Sentry, Rollbar, or Datadog Error Tracking automatically capture exceptions that occur in your application.',
          'These services group similar errors together, tracking how often they occur and when they first appeared. Crucially, they capture the stack trace, request context (headers, URL), and even the user ID associated with the error, providing immense context for debugging.',
          'Integrating these tools typically involves adding a middleware layer at the very end of your Express application to catch any errors that bypass your standard error handlers.'
        ],
        whyItMatters: 'Error tracking services provide immediate visibility into production issues, drastically reducing mean time to resolution (MTTR).',
        interviewQuestion: 'What are the benefits of using an error tracking service like Sentry over just searching through logs?'
      },
      {
        heading: 'Unhandled Exceptions',
        explanation: [
          'In Node.js, an unhandled exception or an unhandled promise rejection will cause the application process to crash. While you should strive to catch all errors, unexpected things happen.',
          'You must configure your application to listen for the `uncaughtException` and `unhandledRejection` process events. This gives you a final opportunity to log the error to your monitoring service before the process dies.',
          'It is critical that you DO NOT attempt to continue running the application after an uncaught exception. The application is in an undefined state and could leak memory or corrupt data. The correct procedure is to log the error, gracefully shut down, and let a process manager (like PM2 or Kubernetes) restart the application.'
        ],
        code: `process.on('uncaughtException', (error) => {\n  logger.fatal({ err: error }, 'Uncaught Exception');\n  // Notify error tracker (e.g., Sentry.captureException(error))\n  \n  // Exit process, allow process manager to restart\n  process.exit(1);\n});\n\nprocess.on('unhandledRejection', (reason, promise) => {\n  logger.fatal({ reason }, 'Unhandled Promise Rejection');\n  process.exit(1);\n});`,
        bestPractices: ['Always exit the process after an `uncaughtException`', 'Ensure promises are always awaited or have a `.catch()` block attached'],
        commonMistakes: ['Catching `uncaughtException` to prevent the server from crashing, leaving the app in an unstable state']
      },
      {
        heading: 'Error Alerting',
        explanation: [
          'Monitoring tools are useless if nobody looks at them. You must configure intelligent alerting to notify your team when critical issues arise. Alerts are typically sent to channels like Slack, PagerDuty, or email.',
          'Effective alerting requires tuning. Alert fatigue occurs when developers are bombarded with notifications for minor, non-actionable errors, causing them to ignore critical alerts when they happen.',
          'Set up alerts based on error thresholds (e.g., "Alert if error rate exceeds 5% in 5 minutes") or for specific high-priority errors (e.g., database connection failures). Route alerts to the right teams based on the context of the error.'
        ],
        whyItMatters: 'Intelligent alerting ensures the team is notified immediately of critical issues without burning out from excessive noise.',
        interviewQuestion: 'What is alert fatigue and how can you mitigate it?'
      }
    ]
  },
  {
    id: 'graceful-shutdown',
    slug: 'graceful-shutdown',
    technology: 'production',
    title: 'Graceful Shutdown',
    category: 'Production',
    description: 'Ensure your application terminates safely without dropping active connections.',
    section: '12. Production',
    level: 3,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Understanding Process Signals', 'Draining Connections', 'Implementing the Pattern'],
    references,
    sections: [
      {
        heading: 'Understanding Process Signals',
        explanation: [
          'When deploying new code or scaling down infrastructure, the environment (like Docker or Kubernetes) needs to stop your running Node.js process. It does this by sending inter-process communication signals, most notably SIGTERM (terminate signal) and SIGINT (interrupt signal, often triggered by Ctrl+C).',
          'If your application does not handle these signals, it will be forcefully terminated (SIGKILL) after a brief timeout. Any HTTP requests currently being processed will be abruptly cut off, returning errors to clients, and database transactions might be left in an inconsistent state.',
          'Graceful shutdown is the process of listening for these signals and safely winding down operations before the application exits voluntarily.'
        ],
        whyItMatters: 'Graceful shutdowns prevent in-flight user requests from failing during deployments or scaling events.',
        interviewQuestion: 'What is the difference between a SIGTERM and a SIGKILL signal?'
      },
      {
        heading: 'Draining Connections',
        explanation: [
          'The first step in a graceful shutdown is to stop accepting new requests. In Express, this means calling `server.close()`. This stops the HTTP server from listening on the port, and the load balancer will route new traffic to other instances.',
          'However, `server.close()` does not kill existing connections. The server will wait for currently processing requests to finish. Once the HTTP server has drained all connections, you must then clean up other resources.',
          'This cleanup phase involves gracefully closing database connections, flushing remaining logs to disk, and closing connections to message queues or caches (like Redis). Only after all cleanup is complete should the process exit.'
        ],
        whyItMatters: 'Draining ensures that work currently in progress completes successfully before the rug is pulled out from under the application.',
        interviewQuestion: 'What happens to active HTTP requests when you call `server.close()` in Node.js?'
      },
      {
        heading: 'Implementing the Pattern',
        explanation: [
          'Implementing this pattern requires careful orchestration. You must set up event listeners for the relevant signals and execute a predefined shutdown sequence.',
          'It is also crucial to implement a fallback timeout. If a request is stuck or a database connection refuses to close, the graceful shutdown process could hang indefinitely. You must use `setTimeout` to forcefully exit the process (e.g., after 10 seconds) if the graceful shutdown does not complete in time.',
          'When running in containerized environments like Kubernetes, the environment orchestrator manages routing traffic away from shutting-down pods based on health checks, working in tandem with your application\'s shutdown logic.'
        ],
        code: `const server = app.listen(3000);\n\nconst shutdown = async () => {\n  logger.info('SIGTERM received. Starting graceful shutdown.');\n  \n  // Stop accepting new connections\n  server.close(async () => {\n    logger.info('HTTP server closed.');\n    \n    try {\n      // Close database connections\n      await mongoose.connection.close();\n      logger.info('Database connections closed.');\n      \n      process.exit(0); // Exit cleanly\n    } catch (err) {\n      logger.error('Error during shutdown', err);\n      process.exit(1);\n    }\n  });\n\n  // Force quit after 10 seconds if graceful shutdown fails\n  setTimeout(() => {\n    logger.error('Could not close connections in time, forcefully shutting down');\n    process.exit(1);\n  }, 10000);\n};\n\nprocess.on('SIGTERM', shutdown);\nprocess.on('SIGINT', shutdown);`,
        bestPractices: ['Always implement a timeout for your shutdown sequence', 'Close database connections only after the HTTP server has stopped accepting requests'],
        commonMistakes: ['Exiting the process immediately upon receiving a SIGTERM, terminating active requests']
      }
    ]
  },
  {
    id: 'environment-configuration',
    slug: 'environment-configuration',
    technology: 'production',
    title: 'Environment Configuration',
    category: 'Production',
    description: 'Manage secrets and configuration securely across different environments.',
    section: '12. Production',
    level: 4,
    difficulty: 'beginner',
    progress: 0,
    toc: ['The Twelve-Factor App', 'Validating Configuration', 'Secrets Management'],
    references,
    sections: [
      {
        heading: 'The Twelve-Factor App',
        explanation: [
          'The Twelve-Factor App methodology states that an application\'s configuration should be strictly separated from its code. Configuration includes anything that varies between deployments (development, staging, production), such as database URLs, API keys, and port numbers.',
          'In Node.js, this configuration is supplied via environment variables, accessed through `process.env`. This allows the exact same compiled code to run in multiple environments simply by providing different environment variables at runtime.',
          'In local development, the `dotenv` package is commonly used to load variables from a `.env` file into `process.env`. However, `.env` files should NEVER be committed to version control, as they often contain sensitive secrets.'
        ],
        whyItMatters: 'Separating config from code ensures security and allows for portable applications that can be easily deployed to different environments.',
        interviewQuestion: 'Why should you never commit your `.env` file to version control?'
      },
      {
        heading: 'Validating Configuration',
        explanation: [
          'A common cause of application crashes on startup is missing or incorrectly formatted environment variables. To prevent this, you should validate your configuration as soon as the application boots.',
          'Instead of accessing `process.env` directly throughout your codebase, it is a best practice to create a central configuration module. This module reads the variables, validates them using a library like Zod or Joi, and exports a strongly typed configuration object.',
          'If a required variable is missing (e.g., `DATABASE_URL`), the validation will fail, and the application will gracefully crash immediately with a clear error message, rather than failing mysteriously later when a database connection is attempted.'
        ],
        code: `import { z } from 'zod';\nimport dotenv from 'dotenv';\n\ndotenv.config();\n\nconst envSchema = z.object({\n  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),\n  PORT: z.string().default('3000'),\n  DATABASE_URL: z.string().url(),\n  JWT_SECRET: z.string().min(32),\n});\n\n// Validate immediately on startup\nconst parsedEnv = envSchema.safeParse(process.env);\n\nif (!parsedEnv.success) {\n  console.error('Invalid environment variables:', parsedEnv.error.format());\n  process.exit(1);\n}\n\n// Export the validated, typed configuration\nexport const config = parsedEnv.data;`,
        bestPractices: ['Validate all environment variables on application startup', 'Centralize config access rather than reading `process.env` scattered throughout the codebase'],
        commonMistakes: ['Failing to validate configs and experiencing runtime crashes deep within the application logic']
      },
      {
        heading: 'Secrets Management',
        explanation: [
          'While `.env` files are fine for local development, production environments require secure secrets management. You should not pass API keys or database passwords as plain text in continuous integration scripts or container definitions.',
          'Cloud providers offer dedicated Secrets Management services (e.g., AWS Secrets Manager, HashiCorp Vault, Azure Key Vault). These services encrypt secrets at rest and control access via IAM policies.',
          'In modern containerized deployments, the orchestrator (like Kubernetes or AWS ECS) retrieves the secrets from the management service and injects them into the container securely as environment variables at runtime, abstracting the complexity from the application code itself.'
        ],
        whyItMatters: 'Proper secrets management prevents sensitive credentials from leaking into logs, version control, or being exposed to unauthorized personnel.',
        interviewQuestion: 'How would you securely supply a database password to a Node.js application running in AWS or Kubernetes?'
      }
    ]
  },
  {
    id: 'api-performance',
    slug: 'api-performance',
    technology: 'production',
    title: 'API Performance',
    category: 'Production',
    description: 'Optimize response times and resource utilization in Node.js.',
    section: '12. Production',
    level: 5,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Solving N+1 Queries', 'Connection Pooling', 'Compression and ETags'],
    references,
    sections: [
      {
        heading: 'Solving N+1 Queries',
        explanation: [
          'The N+1 query problem is a common performance bottleneck, especially when using ORMs. It occurs when you fetch a list of entities (1 query) and then loop through that list to fetch related data for each entity (N queries). If you fetch 100 users and then fetch the posts for each user individually, you run 101 queries.',
          'This causes massive latency due to network round trips between the application and the database. The solution is to fetch all necessary data in a single query using SQL JOINs or, in ORMs, utilizing features like eager loading (e.g., `include` in Prisma or Sequelize).',
          'In GraphQL APIs, N+1 problems are extremely prevalent due to the hierarchical nature of resolvers. Data loaders (like the `dataloader` package) are the standard solution. They batch and deduplicate queries, fetching all required related records in a single database request.'
        ],
        whyItMatters: 'N+1 queries degrade performance exponentially as data sets grow, causing severe latency and database overload.',
        interviewQuestion: 'Explain the N+1 query problem and how a DataLoader solves it in GraphQL.'
      },
      {
        heading: 'Connection Pooling',
        explanation: [
          'Establishing a new TCP connection to a database is a slow, resource-intensive process. If your application opens a new connection for every incoming HTTP request, performance will tank under load.',
          'Connection pooling solves this. The application maintains a "pool" of open, reusable database connections. When a request needs to query the database, it borrows a connection from the pool. When finished, it returns the connection to the pool for the next request to use.',
          'Properly configuring the pool size is critical. Too small, and requests will queue up waiting for a connection. Too large, and you risk overwhelming the database server\'s memory and CPU limits. The optimal size depends on your database server\'s capabilities and the nature of your queries.'
        ],
        whyItMatters: 'Connection pooling drastically reduces the overhead of database interactions, allowing for high concurrency.',
        interviewQuestion: 'What happens if your connection pool size is set too small under high traffic?'
      },
      {
        heading: 'Compression and ETags',
        explanation: [
          'Minimizing the size of HTTP responses speeds up transfer times, especially on mobile networks. Enabling Gzip or Brotli compression is a quick win. In Express, the `compression` middleware automatically compresses response bodies.',
          'ETags (Entity Tags) are a mechanism for web cache validation. When a server sends a response, it includes an ETag header (a hash of the response content). On subsequent requests, the client sends this ETag in the `If-None-Match` header.',
          'The server compares the client\'s ETag with the current content\'s ETag. If they match, the content hasn\'t changed. The server sends a `304 Not Modified` response with an empty body, saving bandwidth and processing time. Express enables ETags by default for static files and standard responses.'
        ],
        code: `import express from 'express';\nimport compression from 'compression';\n\nconst app = express();\n\n// Compress all responses\napp.use(compression());\n\napp.get('/large-data', (req, res) => {\n  // Response will be automatically gzipped\n  res.json({ data: '...very large payload...' });\n});`,
        bestPractices: ['Enable compression for all text-based responses (JSON, HTML, CSS)', 'Offload compression to a reverse proxy (like Nginx or a CDN) in high-traffic environments to save Node CPU'],
        commonMistakes: ['Compressing already compressed formats like images or videos, which wastes CPU']
      }
    ]
  },
  {
    id: 'caching-strategies',
    slug: 'caching-strategies',
    technology: 'production',
    title: 'Caching Strategies',
    category: 'Production',
    description: 'Reduce database load and latency using various caching layers.',
    section: '12. Production',
    level: 6,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Application Caching (Redis)', 'HTTP Caching', 'Cache Invalidation'],
    references,
    sections: [
      {
        heading: 'Application Caching (Redis)',
        explanation: [
          'Application-level caching stores the results of expensive operations (like complex database queries or external API calls) in a fast, in-memory store like Redis. Before performing the operation, the application checks if the data exists in the cache.',
          'If the data is found (a cache hit), it is returned immediately, bypassing the database. If not (a cache miss), the application performs the operation, stores the result in the cache, and then returns it.',
          'This strategy is highly effective for data that is frequently read but infrequently updated, such as product catalogs, user profiles, or configuration settings. It significantly reduces database load and response times.'
        ],
        whyItMatters: 'In-memory caching is the most effective way to scale read-heavy applications and protect backend databases from overload.',
        interviewQuestion: 'Describe the "Cache-Aside" pattern and how it operates.'
      },
      {
        heading: 'HTTP Caching',
        explanation: [
          'HTTP caching utilizes the browser and intermediate networks (like CDNs) to store responses. This is controlled via HTTP response headers, primarily `Cache-Control`.',
          'Setting `Cache-Control: max-age=3600` tells the browser and CDNs they can cache the response for one hour. During this time, subsequent requests for the same URL will be served from the cache without ever hitting your Node.js server.',
          'This is ideal for static assets (images, CSS, JS) and public, non-personalized API endpoints. Combining HTTP caching with a CDN allows content to be served from edge locations physically closer to the user, providing massive performance gains.'
        ],
        whyItMatters: 'HTTP caching prevents requests from reaching your infrastructure entirely, offering the highest possible performance and scalability.',
        interviewQuestion: 'What is the purpose of the `Cache-Control` header?'
      },
      {
        heading: 'Cache Invalidation',
        explanation: [
          'Phil Karlton famously said, "There are only two hard things in Computer Science: cache invalidation and naming things." The challenge is ensuring users don\'t see stale data after the underlying data has been updated.',
          'Time-To-Live (TTL) is a common strategy where cached items automatically expire after a set duration. However, this means users might see stale data until the TTL expires. For data that must be immediately consistent, you must actively invalidate (delete or update) the cache whenever the underlying data is modified.',
          'In complex systems, managing cache invalidation can be error-prone. Strategies like "Write-Through" caching (updating the cache and database simultaneously) or using messaging queues to trigger invalidations across distributed systems are often necessary.'
        ],
        code: `import Redis from 'ioredis';\nconst redis = new Redis();\n\nasync function getUserProfile(userId) {\n  const cacheKey = \`user:\${userId}:profile\`;\n  \n  // 1. Try to get from cache\n  const cached = await redis.get(cacheKey);\n  if (cached) return JSON.parse(cached);\n\n  // 2. Cache miss, query database\n  const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);\n  \n  // 3. Store in cache with a 1-hour TTL, then return\n  await redis.set(cacheKey, JSON.stringify(user), 'EX', 3600);\n  return user;\n}\n\nasync function updateUserProfile(userId, data) {\n  // 1. Update database\n  await db.query('UPDATE users SET ? WHERE id = ?', [data, userId]);\n  \n  // 2. Invalidate cache\n  await redis.del(\`user:\${userId}:profile\`);\n}`,
        bestPractices: ['Always use a TTL as a safety net, even if you implement active invalidation', 'Cache structured data (like JSON) rather than HTML fragments for better reusability'],
        commonMistakes: ['Failing to invalidate the cache on updates, leading to users seeing outdated information']
      }
    ]
  },
  {
    id: 'load-handling',
    slug: 'load-handling',
    technology: 'production',
    title: 'Load Handling',
    category: 'Production',
    description: 'Scale your application to handle high traffic and avoid bottlenecks.',
    section: '12. Production',
    level: 7,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Horizontal Scaling and Clustering', 'Process Managers (PM2)', 'Circuit Breakers'],
    references,
    sections: [
      {
        heading: 'Horizontal Scaling and Clustering',
        explanation: [
          'Node.js runs on a single thread. While asynchronous I/O allows it to handle many concurrent connections, CPU-intensive tasks will block the event loop. To utilize multi-core servers, you must scale horizontally.',
          'The native Node.js `cluster` module allows you to fork the main process into multiple worker processes, typically one for each CPU core. These workers share the same server port and the OS distributes incoming connections among them.',
          'While clustering utilizes a single machine\'s resources, true horizontal scaling involves running instances of your application across multiple different servers or containers, managed by a load balancer (like Nginx, HAProxy, or AWS ALB) that distributes traffic across the fleet.'
        ],
        whyItMatters: 'Horizontal scaling is the primary method for increasing application throughput and achieving high availability.',
        interviewQuestion: 'Why is a Node.js application limited by default on a multi-core server, and how do you solve it?'
      },
      {
        heading: 'Process Managers (PM2)',
        explanation: [
          'Managing clusters manually is complex. Process managers like PM2 simplify this significantly. PM2 can automatically start a cluster utilizing all available CPU cores with a simple command: `pm2 start app.js -i max`.',
          'Beyond clustering, process managers provide essential production features. They keep applications alive forever by automatically restarting them if they crash. They manage logging, provide performance monitoring dashboards, and enable zero-downtime reloads.',
          'During a zero-downtime reload, PM2 spins up new worker processes with updated code, waits for them to become ready, and then gracefully shuts down the old workers, ensuring no user requests are dropped during deployment.'
        ],
        whyItMatters: 'Process managers handle the operational complexities of running Node.js in production, providing stability and clustering out of the box.',
        interviewQuestion: 'What are the main benefits of using a process manager like PM2 in production?'
      },
      {
        heading: 'Circuit Breakers',
        explanation: [
          'In microservices architectures, your application often depends on external services (other APIs, databases). If a downstream service fails or becomes slow, requests waiting for it will pile up, potentially consuming all your server\'s resources and causing a cascading failure.',
          'The Circuit Breaker pattern prevents this. It monitors calls to a service. If the failure rate exceeds a threshold, the circuit "trips" (opens). While open, any calls to the service immediately fail (or return a fallback value) without actually making the network request.',
          'This gives the struggling downstream service time to recover. Periodically, the circuit breaker allows a single test request through (half-open state). If successful, the circuit closes, and traffic resumes. If it fails, it remains open.'
        ],
        code: `import CircuitBreaker from 'opossum';\n\n// Function that calls an external API\nasync function fetchExternalData() {\n  return await axios.get('https://unstable-api.com/data');\n}\n\n// Configure the breaker\nconst options = {\n  timeout: 3000, // If request takes longer than 3 seconds, trigger a failure\n  errorThresholdPercentage: 50, // When 50% of requests fail, open the circuit\n  resetTimeout: 30000 // After 30 seconds, try again (half-open)\n};\n\nconst breaker = new CircuitBreaker(fetchExternalData, options);\n\n// Fallback if circuit is open or request fails\nbreaker.fallback(() => ({ data: 'Fallback data from cache' }));\n\napp.get('/data', async (req, res) => {\n  try {\n    const result = await breaker.fire();\n    res.json(result);\n  } catch (err) {\n    res.status(503).json({ error: 'Service Unavailable' });\n  }\n});`,
        bestPractices: ['Use circuit breakers for all synchronous network calls to external services', 'Provide sensible fallback data when a circuit is open to degrade gracefully'],
        commonMistakes: ['Setting overly aggressive timeouts that trip circuits during normal network fluctuations']
      }
    ]
  }
]
