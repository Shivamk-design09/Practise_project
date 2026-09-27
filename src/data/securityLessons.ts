import type { Lesson } from '../types'

const references = [
  { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
  { label: 'Helmet.js', url: 'https://helmetjs.github.io/' },
  { label: 'MDN CORS', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS' },
]

export const securityLessons: Lesson[] = [
  {
    id: 'cors-deep-dive',
    slug: 'cors-deep-dive',
    technology: 'security',
    title: 'CORS Deep Dive',
    category: 'Security',
    description: 'Understand and configure Cross-Origin Resource Sharing securely.',
    section: '11. Security',
    level: 1,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Same-Origin Policy', 'Preflight Requests', 'Configuring CORS'],
    references,
    sections: [
      {
        heading: 'Same-Origin Policy',
        explanation: [
          'The Same-Origin Policy (SOP) is a critical security mechanism built into modern web browsers. It restricts how a document or script loaded from one origin can interact with a resource from another origin. An origin is defined by the combination of protocol, domain, and port (e.g., https://example.com:443).',
          'Without the SOP, a malicious script on an attacker\'s website could make authenticated requests to your banking application, read the responses, and steal your data. The browser prevents this by blocking the response if the origins do not match.',
          'However, modern web architecture often requires cross-origin requests. For example, a frontend application hosted on `app.example.com` needs to access an API hosted on `api.example.com`. This is where CORS (Cross-Origin Resource Sharing) comes in. CORS is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin access to selected resources from a different origin.'
        ],
        whyItMatters: 'SOP prevents unauthorized data reading across different domains, while CORS provides a secure way to bypass SOP when intentionally required.',
        interviewQuestion: 'What is an "origin" in the context of the Same-Origin Policy?'
      },
      {
        heading: 'Preflight Requests',
        explanation: [
          'Not all cross-origin requests are treated equally. "Simple requests" (like GET or POST with certain standard headers) are sent directly, and the browser checks the response headers to see if access is allowed. However, requests that could potentially modify data or use custom headers trigger a "preflight" request.',
          'A preflight request is an HTTP OPTIONS request sent by the browser before the actual request. It asks the server: "Are you willing to accept this request from this origin, using these methods and headers?" The server responds with headers like `Access-Control-Allow-Methods` and `Access-Control-Allow-Headers`.',
          'If the server\'s preflight response indicates that the request is not allowed, the browser blocks the actual request from being sent. This protects servers that might not be aware of CORS from receiving unexpected and potentially harmful cross-origin requests.'
        ],
        whyItMatters: 'Preflight requests ensure that servers explicitly opt-in to complex cross-origin interactions, preventing CSRF-like state-changing attacks.',
        interviewQuestion: 'What HTTP method is used for a CORS preflight request, and what is its purpose?'
      },
      {
        heading: 'Configuring CORS',
        explanation: [
          'In Express.js, configuring CORS is straightforward using the `cors` middleware. By default, `app.use(cors())` allows all origins, methods, and headers. This is acceptable for public APIs but highly insecure for APIs handling sensitive data.',
          'You should configure CORS to explicitly allow only trusted origins. You can provide an array of allowed origins or a function for dynamic origin checking. It\'s also crucial to specify allowed methods (e.g., GET, POST) and allowed headers.',
          'If your frontend needs to send credentials (like cookies or Authorization headers) to a cross-origin API, you must set `credentials: true` in the CORS configuration. When doing so, you cannot use the wildcard `*` for the `Access-Control-Allow-Origin` header; you must specify the exact origin.'
        ],
        code: `import cors from 'cors';\nimport express from 'express';\n\nconst app = express();\n\nconst corsOptions = {\n  origin: ['https://myapp.com', 'https://admin.myapp.com'],\n  methods: ['GET', 'POST', 'PUT', 'DELETE'],\n  allowedHeaders: ['Content-Type', 'Authorization'],\n  credentials: true, // Required for cookies/authorization headers\n  optionsSuccessStatus: 200 // Some legacy browsers choke on 204\n};\n\napp.use(cors(corsOptions));`,
        bestPractices: ['Never use `*` for `Access-Control-Allow-Origin` if the API handles sensitive user data', 'Explicitly list allowed origins, methods, and headers'],
        commonMistakes: ['Setting `Access-Control-Allow-Origin: *` while also setting `credentials: true` (which will fail)']
      }
    ]
  },
  {
    id: 'rate-limiting',
    slug: 'rate-limiting',
    technology: 'security',
    title: 'Rate Limiting',
    category: 'Security',
    description: 'Protect your API from abuse and denial-of-service attacks.',
    section: '11. Security',
    level: 2,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Why Rate Limit?', 'Algorithms (Token Bucket vs Windows)', 'Implementation'],
    references,
    sections: [
      {
        heading: 'Why Rate Limit?',
        explanation: [
          'Rate limiting is a defensive strategy to control the amount of incoming traffic to your API. It restricts the number of requests a client (identified by IP address, user ID, or API key) can make within a specified timeframe.',
          'Without rate limiting, your application is vulnerable to Denial of Service (DoS) attacks, brute-force password guessing, and resource exhaustion. Even non-malicious actors, like a poorly written script or a sudden spike in legitimate traffic, can overwhelm your servers and database.',
          'When a client exceeds the limit, the server responds with a `429 Too Many Requests` HTTP status code. Good APIs also include headers like `Retry-After` to tell the client when they can try again, and `X-RateLimit-Limit`/`X-RateLimit-Remaining` to provide visibility into their current quota.'
        ],
        whyItMatters: 'Rate limiting is essential for maintaining API availability and preventing cost overruns from unbounded scaling.',
        interviewQuestion: 'What HTTP status code should be returned when a rate limit is exceeded?'
      },
      {
        heading: 'Algorithms (Token Bucket vs Windows)',
        explanation: [
          'There are several algorithms used for rate limiting. The Fixed Window algorithm divides time into fixed intervals (e.g., a new window every minute). It resets the count at the start of each window. While simple, it suffers from spikes at the window boundaries (e.g., sending all allowed requests at the end of minute 1, and again at the start of minute 2).',
          'The Sliding Window algorithm smooths this out by calculating a moving average of requests over the specified timeframe, preventing sudden spikes. It is more memory-intensive but provides fairer limits.',
          'The Token Bucket algorithm is popular for APIs. Imagine a bucket holding tokens. Tokens are added at a constant rate. Each request removes a token. If the bucket is empty, the request is dropped. This allows for brief bursts of traffic (up to the bucket capacity) while enforcing a steady average rate.'
        ],
        whyItMatters: 'Choosing the right algorithm balances fairness, performance overhead, and the ability to handle traffic bursts.',
        interviewQuestion: 'Describe a vulnerability of the Fixed Window rate limiting algorithm compared to a Sliding Window.'
      },
      {
        heading: 'Implementation',
        explanation: [
          'In Express, the `express-rate-limit` package is standard for implementing basic fixed-window rate limiting. You can apply it globally to all routes, or specifically to sensitive endpoints like login or password reset.',
          'By default, `express-rate-limit` stores request counts in the server\'s memory. As with session storage, this is problematic for load-balanced, multi-server deployments because each server has its own memory. An attacker could bypass limits by hitting different servers.',
          'For production, you should use a distributed store like Redis for rate limiting. This ensures that a user\'s request count is consistent across all instances of your application. There are dedicated packages like `rate-limit-redis` that integrate seamlessly with `express-rate-limit`.'
        ],
        code: `import rateLimit from 'express-rate-limit';\n\n// Basic memory-based limiter for a specific route\nconst loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 5, // Limit each IP to 5 login requests per \`window\` (here, per 15 minutes)\n  message: 'Too many login attempts from this IP, please try again after 15 minutes',\n  standardHeaders: true, // Return rate limit info in the \`RateLimit-*\` headers\n  legacyHeaders: false, // Disable the \`X-RateLimit-*\` headers\n});\n\napp.use('/login', loginLimiter);`,
        bestPractices: ['Apply stricter rate limits to authentication and high-cost resource endpoints', 'Use a centralized store like Redis for rate limiting in distributed systems'],
        commonMistakes: ['Relying solely on IP address for rate limiting, which can punish users sharing a NAT/office IP']
      }
    ]
  },
  {
    id: 'helmet-and-security-headers',
    slug: 'helmet-and-security-headers',
    technology: 'security',
    title: 'Helmet & Security Headers',
    category: 'Security',
    description: 'Harden your application by setting secure HTTP response headers.',
    section: '11. Security',
    level: 3,
    difficulty: 'beginner',
    progress: 0,
    toc: ['What are Security Headers?', 'Using Helmet.js', 'Content Security Policy (CSP)'],
    references,
    sections: [
      {
        heading: 'What are Security Headers?',
        explanation: [
          'When a web server responds to a request, it includes HTTP headers containing metadata about the response. Security headers are specific HTTP response headers that tell the browser how to behave when handling the content, mitigating various types of attacks.',
          'For example, the `X-Frame-Options` header prevents your site from being loaded inside an iframe on another domain, protecting against Clickjacking. `Strict-Transport-Security` (HSTS) forces the browser to always use HTTPS, preventing protocol downgrade attacks.',
          'While you could manually set these headers using `res.setHeader()`, managing all of them and staying up-to-date with security best practices is tedious and error-prone. This is why specialized libraries are used.'
        ],
        whyItMatters: 'Security headers provide an easy, low-overhead layer of defense enforced directly by the user\'s browser.',
        interviewQuestion: 'What type of attack does the X-Frame-Options header prevent?'
      },
      {
        heading: 'Using Helmet.js',
        explanation: [
          'In the Express ecosystem, Helmet is the standard middleware for securing HTTP headers. It is a collection of smaller middleware functions that set various security headers appropriately.',
          'Adding `app.use(helmet())` at the top of your middleware stack immediately provides sensible defaults. It removes the `X-Powered-By` header (which leaks the framework being used), sets `X-Content-Type-Options: nosniff` (preventing MIME type sniffing), and enables basic protection against XSS and clickjacking.',
          'Helmet is highly configurable. You can enable, disable, or customize specific headers based on your application\'s needs. It is one of the highest ROI (Return on Investment) security improvements you can make in a Node.js app.'
        ],
        code: `import express from 'express';\nimport helmet from 'helmet';\n\nconst app = express();\n\n// Enable all default Helmet protections\napp.use(helmet());\n\n// Customizing Helmet (e.g., disabling a specific header)\napp.use(\n  helmet({\n    xPoweredBy: false, // Explicitly disable this header\n    referrerPolicy: {\n      policy: 'no-referrer',\n    },\n  })\n);`,
        bestPractices: ['Place Helmet early in your middleware stack', 'Keep the Helmet library updated to receive the latest header configurations'],
        interviewQuestion: 'Why is it recommended to remove the X-Powered-By header?'
      },
      {
        heading: 'Content Security Policy (CSP)',
        explanation: [
          'Content Security Policy (CSP) is one of the most powerful security headers. It allows you to declare approved sources of content that the browser is allowed to load on your site. This includes scripts, styles, images, and fonts.',
          'CSP is the primary defense against Cross-Site Scripting (XSS). If an attacker manages to inject a malicious script into your page, a strong CSP will prevent the browser from executing it because the script\'s origin (or the fact that it is inline) is not explicitly allowed in the policy.',
          'Configuring CSP can be complex and requires careful tuning to ensure you don\'t break legitimate functionality. Helmet includes a CSP middleware, but it requires explicit configuration to define your application\'s specific allowed sources.'
        ],
        whyItMatters: 'CSP drastically reduces the severity of XSS vulnerabilities by restricting where scripts can be loaded from and preventing inline execution.',
        commonMistakes: ['Using `unsafe-inline` in your CSP, which defeats the purpose of the policy against XSS']
      }
    ]
  },
  {
    id: 'input-validation',
    slug: 'input-validation',
    technology: 'security',
    title: 'Input Validation',
    category: 'Security',
    description: 'Ensure data integrity and security by validating user input.',
    section: '11. Security',
    level: 4,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Never Trust User Input', 'Validation vs Sanitization', 'Using Validation Libraries'],
    references,
    sections: [
      {
        heading: 'Never Trust User Input',
        explanation: [
          'The golden rule of web security is: Never trust user input. Any data coming from the client—whether via URL parameters, query strings, headers, or request bodies—must be treated as potentially malicious.',
          'Failing to validate input is the root cause of many major vulnerabilities, including SQL Injection, NoSQL Injection, and Cross-Site Scripting (XSS). If your application expects an integer for a user ID, but receives a string containing a database command, unvalidated processing can lead to disaster.',
          'Input validation should occur at multiple layers. While frontend validation improves user experience by providing immediate feedback, backend validation is the only true security boundary. Attackers can easily bypass frontend checks using tools like Postman or curl.'
        ],
        whyItMatters: 'Input validation is the first line of defense against injection attacks and data corruption.',
        interviewQuestion: 'Why is frontend validation insufficient for security?'
      },
      {
        heading: 'Validation vs Sanitization',
        explanation: [
          'Validation and sanitization are related but distinct concepts. Validation checks if the input meets a set of criteria (e.g., "Is this a valid email format?", "Is this number between 1 and 100?"). If the input is invalid, the server rejects the request with a 400 Bad Request error.',
          'Sanitization, or data cleansing, modifies the input to ensure it is safe before processing. This might involve stripping HTML tags, trimming whitespace, or escaping special characters. For example, sanitizing user input before displaying it on a page is crucial for preventing XSS.',
          'As a best practice, you should rely on "allow-listing" (validation) rather than "block-listing" (sanitization) whenever possible. It is much safer to define exactly what is allowed than to try and anticipate every possible malicious input an attacker might devise.'
        ],
        whyItMatters: 'Understanding the difference ensures you apply the correct technique; validation ensures correct data types, while sanitization ensures safe data rendering.',
        interviewQuestion: 'Explain the difference between input validation and input sanitization.'
      },
      {
        heading: 'Using Validation Libraries',
        explanation: [
          'Writing manual validation logic for every endpoint is tedious and error-prone. Node.js has excellent libraries like Zod, Joi, or express-validator that provide robust, declarative ways to define validation schemas.',
          'Zod, for example, allows you to define a schema that not only validates the data at runtime but also provides static type inference for TypeScript. This ensures that your validated data has the correct types throughout your application.',
          'When validation fails, your API should return a standardized error response (typically a 400 status) detailing exactly which fields failed and why. This helps legitimate clients fix their requests without exposing internal system details.'
        ],
        code: `import { z } from 'zod';\nimport express from 'express';\n\nconst app = express();\napp.use(express.json());\n\n// Define a schema\nconst userSchema = z.object({\n  username: z.string().min(3).max(20),\n  email: z.string().email(),\n  age: z.number().int().positive(),\n});\n\napp.post('/users', (req, res) => {\n  try {\n    // Validate the request body\n    const validatedData = userSchema.parse(req.body);\n    \n    // Proceed with validated data\n    res.status(201).json({ message: 'User created', data: validatedData });\n  } catch (error) {\n    // Return validation errors\n    res.status(400).json({ errors: error.errors });\n  }\n});`,
        bestPractices: ['Validate early in the request lifecycle (middleware or controller start)', 'Use a schema validation library for declarative and maintainable rules'],
        commonMistakes: ['Relying solely on frontend validation or Mongoose schemas (which validate too late in the process)']
      }
    ]
  },
  {
    id: 'sql-injection',
    slug: 'sql-injection',
    technology: 'security',
    title: 'SQL Injection',
    category: 'Security',
    description: 'Understand and prevent SQL Injection attacks.',
    section: '11. Security',
    level: 5,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['How SQL Injection Works', 'Parameterized Queries', 'ORM Safety'],
    references,
    sections: [
      {
        heading: 'How SQL Injection Works',
        explanation: [
          'SQL Injection (SQLi) is a classic but critical vulnerability that occurs when user-supplied data is concatenated directly into a database query. By crafting malicious input, an attacker can alter the structure of the SQL statement, tricking the database into executing unintended commands.',
          'For example, consider a query like `SELECT * FROM users WHERE email = \'${userInput}\'`. If the attacker inputs `\' OR \'1\'=\'1`, the resulting query becomes `SELECT * FROM users WHERE email = \'\' OR \'1\'=\'1\'`. Since `1=1` is always true, the database returns all user records, bypassing authentication or exposing sensitive data.',
          'More severe SQLi attacks can modify data (using UPDATE or DELETE), execute administrative operations, or even read underlying file systems, depending on database permissions. It represents a total compromise of data integrity and confidentiality.'
        ],
        whyItMatters: 'SQL Injection allows attackers to bypass application logic and interact directly with the database, leading to massive data breaches.',
        interviewQuestion: 'Provide an example of a simple SQL injection attack and explain how it alters the query logic.'
      },
      {
        heading: 'Parameterized Queries',
        explanation: [
          'The primary and most effective defense against SQL injection is the use of Parameterized Queries (also known as Prepared Statements). Instead of dynamically building a SQL string with user input, you define the SQL query structure separately from the data values.',
          'In a parameterized query, you use placeholders (like `?` or `$1`) where user input should go. The database driver sends the query structure and the parameters to the database separately. The database engine compiles the query structure first, and then treats the parameters strictly as data values, not executable code.',
          'Because the parsing and compilation phase occurs before the parameters are inserted, it is impossible for malicious input to change the query\'s logic. The database will safely treat `\' OR \'1\'=\'1` as a literal string value to search for, rather than an executable command.'
        ],
        code: `// UNSAFE: Vulnerable to SQL Injection\nconst query = \`SELECT * FROM users WHERE username = '\${req.body.username}'\`;\nconst result = await db.query(query);\n\n// SAFE: Using Parameterized Queries\nconst safeQuery = 'SELECT * FROM users WHERE username = $1';\nconst safeResult = await db.query(safeQuery, [req.body.username]);`,
        bestPractices: ['Always use parameterized queries for any data supplied by external sources', 'Ensure your database user operates with the principle of least privilege'],
        interviewQuestion: 'How do prepared statements conceptually prevent SQL injection?'
      },
      {
        heading: 'ORM Safety',
        explanation: [
          'Object-Relational Mappers (ORMs) like Prisma, Sequelize, or TypeORM abstract away raw SQL writing. When you use standard ORM methods (e.g., `user.findOne({ where: { username: input } })`), the ORM automatically generates parameterized queries behind the scenes.',
          'Therefore, relying on an ORM is a strong defensive posture against SQL injection. However, you must be careful. Most ORMs provide "escape hatches" that allow you to execute raw SQL queries when complex logic is required.',
          'If you use a raw query feature (e.g., `sequelize.query(...)`), you are suddenly responsible for securing the query. You must ensure you are still using parameter binding methods provided by the ORM, rather than string interpolation, even in raw mode.'
        ],
        whyItMatters: 'ORMs provide safe defaults, but developers must remain vigilant when writing custom or raw queries.',
        commonMistakes: ['Using template literals to build raw queries inside an ORM\'s raw query function']
      }
    ]
  },
  {
    id: 'nosql-injection',
    slug: 'nosql-injection',
    technology: 'security',
    title: 'NoSQL Injection',
    category: 'Security',
    description: 'Protect MongoDB and other NoSQL databases from injection attacks.',
    section: '11. Security',
    level: 6,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Understanding NoSQL Injection', 'Operator Injection', 'Sanitization and Validation'],
    references,
    sections: [
      {
        heading: 'Understanding NoSQL Injection',
        explanation: [
          'While NoSQL databases like MongoDB don\'t use traditional SQL syntax, they are still vulnerable to injection attacks if user input is not properly handled. NoSQL injection targets the query language or syntax of the specific NoSQL database.',
          'In MongoDB, queries are typically constructed using JSON objects. If an attacker can inject structural elements into these query objects, they can manipulate the query logic in ways the developer didn\'t intend. This often happens when developers take user input (like a JSON body from a POST request) and pass it directly into a database query method.',
          'The consequences are similar to SQL injection: bypassing authentication, unauthorized data extraction, or data modification. Because NoSQL databases often lack the strict schema constraints of relational databases, injection can sometimes be even more flexible for an attacker.'
        ],
        whyItMatters: 'NoSQL databases are not immune to injection; the attack vector simply shifts from string concatenation to object manipulation.',
        interviewQuestion: 'Why is it a misconception that NoSQL databases like MongoDB are inherently immune to injection attacks?'
      },
      {
        heading: 'Operator Injection',
        explanation: [
          'MongoDB uses query operators (starting with `$`) to perform complex lookups. For example, `$gt` means "greater than" and `$ne` means "not equal". A common NoSQL injection technique involves providing an object containing these operators instead of a plain string.',
          'Consider an authentication query: `User.findOne({ username: req.body.username, password: req.body.password })`. If an attacker sends a payload where the password is an object: `{ "username": "admin", "password": { "$ne": null } }`, the query becomes `User.findOne({ username: "admin", password: { $ne: null } })`.',
          'Because the password for the admin user is likely not null, the `$ne` (not equal) condition evaluates to true, and the database returns the admin user record, allowing the attacker to bypass the password check entirely.'
        ],
        whyItMatters: 'Operator injection leverages the database\'s own query features against the application logic.',
        interviewQuestion: 'Explain how an attacker could bypass a MongoDB login using the `$ne` operator.'
      },
      {
        heading: 'Sanitization and Validation',
        explanation: [
          'To prevent NoSQL operator injection, you must ensure that fields expected to be strings or numbers are not actually objects containing query operators. Strict input validation is the primary defense.',
          'Using a validation library (like Zod or Joi) to enforce that `req.body.password` must be a string prevents the attacker from sending an object payload in the first place. If the input is an object, the validation fails and the request is rejected.',
          'Additionally, packages like `express-mongo-sanitize` can be used as middleware. They recursively search through the request body, query string, and params, and remove any keys that begin with `$` or contain a `.`. This provides a blanket defense, although schema validation is still the preferred approach.'
        ],
        code: `import express from 'express';\nimport mongoSanitize from 'express-mongo-sanitize';\n\nconst app = express();\n\n// Parses incoming JSON\napp.use(express.json());\n\n// Prevent MongoDB Operator Injection globally\napp.use(mongoSanitize());\n\n// Example of vulnerable code if sanitize wasn't used\napp.post('/login', async (req, res) => {\n  // If req.body.password is { "$gt": "" }, auth could be bypassed\n  const user = await User.findOne({ \n    username: req.body.username, \n    password: req.body.password \n  });\n  // ...\n});`,
        bestPractices: ['Enforce strict type checking on all user inputs using a schema validation library', 'Avoid passing entire request objects (`req.body`, `req.query`) directly to database queries'],
        commonMistakes: ['Assuming `req.body.password` is a string without explicit validation']
      }
    ]
  },
  {
    id: 'xss-prevention',
    slug: 'xss-prevention',
    technology: 'security',
    title: 'XSS Prevention',
    category: 'Security',
    description: 'Understand and mitigate Cross-Site Scripting vulnerabilities.',
    section: '11. Security',
    level: 7,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Types of XSS', 'Output Encoding', 'Using DOMPurify'],
    references,
    sections: [
      {
        heading: 'Types of XSS',
        explanation: [
          'Cross-Site Scripting (XSS) occurs when an application includes untrusted data in a web page without proper validation or escaping. This allows an attacker to execute malicious scripts in the victim\'s browser. There are three main types: Reflected, Stored, and DOM-based.',
          'Stored XSS is the most dangerous. The malicious script is permanently saved on the target servers (e.g., in a database via a comment field). When victims request the infected page, the script executes. Reflected XSS occurs when user input is immediately returned (reflected) by the server in an error message or search result, requiring the attacker to trick a user into clicking a crafted link.',
          'DOM-based XSS occurs entirely client-side. The vulnerability is in the page\'s JavaScript, which takes untrusted data (like from the URL fragment) and dynamically updates the DOM insecurely (e.g., using `innerHTML`).'
        ],
        whyItMatters: 'XSS allows attackers to steal session cookies, capture keystrokes, and perform actions on behalf of the user.',
        interviewQuestion: 'What is the difference between Stored XSS and Reflected XSS?'
      },
      {
        heading: 'Output Encoding',
        explanation: [
          'The primary defense against XSS is Context-Aware Output Encoding. This means converting potentially executable characters into their safe HTML entity equivalents before rendering them in the browser. For example, `<script>` becomes `&lt;script&gt;`.',
          'Modern frontend frameworks (like React, Vue, and Angular) handle output encoding automatically for most text bindings (e.g., `{userData}`). They treat the variable as text, not HTML. However, vulnerabilities occur when developers intentionally bypass this protection, such as using `dangerouslySetInnerHTML` in React.',
          'Encoding must be context-aware because the rules change depending on where the data is placed. Placing data inside a `<script>` block, an HTML attribute, or a CSS context requires different escaping strategies than placing it in the HTML body.'
        ],
        whyItMatters: 'Encoding ensures the browser interprets data as text content rather than executable code or markup.',
        interviewQuestion: 'How do modern frameworks like React generally protect against XSS by default?'
      },
      {
        heading: 'Using DOMPurify',
        explanation: [
          'Sometimes, you need to allow users to input rich text (HTML), such as in a blog post editor or a forum. In these cases, you cannot simply encode everything, or the HTML tags won\'t render. This is where sanitization is necessary.',
          'Sanitization involves parsing the untrusted HTML and stripping out any potentially dangerous tags (like `<script>`, `<iframe>`, or `onload` attributes) while preserving safe markup (like `<b>`, `<i>`, or `<p>`).',
          'DOMPurify is the industry-standard library for sanitizing HTML in JavaScript. It is extremely fast and robust against complex evasion techniques. Whenever you accept HTML input or need to render raw HTML strings, you must run it through DOMPurify first.'
        ],
        code: `import DOMPurify from 'dompurify';\nimport { JSDOM } from 'jsdom';\n\n// Setup DOMPurify for Node.js environment\nconst window = new JSDOM('').window;\nconst purify = DOMPurify(window);\n\nconst dirtyHtml = '<p>Hello <b>World</b>!</p><script>alert("hacked")</script>';\n\n// Clean the HTML\nconst cleanHtml = purify.sanitize(dirtyHtml);\nconsole.log(cleanHtml); // Output: <p>Hello <b>World</b>!</p>`,
        bestPractices: ['Never use `dangerouslySetInnerHTML` or `v-html` with unsanitized user input', 'Use DOMPurify whenever you must render user-supplied HTML'],
        commonMistakes: ['Trying to write custom regex to sanitize HTML (it is notoriously difficult to get right)']
      }
    ]
  },
  {
    id: 'csrf-protection',
    slug: 'csrf-protection',
    technology: 'security',
    title: 'CSRF Protection',
    category: 'Security',
    description: 'Prevent Cross-Site Request Forgery attacks.',
    section: '11. Security',
    level: 8,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Understanding CSRF', 'SameSite Cookies', 'Anti-CSRF Tokens'],
    references,
    sections: [
      {
        heading: 'Understanding CSRF',
        explanation: [
          'Cross-Site Request Forgery (CSRF) is an attack that forces an authenticated user to execute unwanted actions on a web application in which they are currently authenticated. The attacker tricks the victim\'s browser into sending a forged HTTP request, including the victim\'s session cookies.',
          'Because the browser automatically includes cookies with requests to the original domain, the target application cannot distinguish between a legitimate request initiated by the user and a forged request initiated by the attacker\'s site. For example, an attacker could embed an image tag like `<img src="https://bank.com/transfer?amount=1000&to=attacker">`.',
          'CSRF primarily targets state-changing requests (POST, PUT, DELETE). Therefore, it is critical that GET requests are truly safe and never alter server state.'
        ],
        whyItMatters: 'CSRF exploits the browser\'s automatic inclusion of credentials, turning the user\'s own authenticated session against them.',
        interviewQuestion: 'Why does CSRF rely on the victim having an active session with the target application?'
      },
      {
        heading: 'SameSite Cookies',
        explanation: [
          'The `SameSite` cookie attribute is a modern and highly effective defense against CSRF. It allows a server to declare whether cookies should be sent with cross-site requests. It has three values: `Strict`, `Lax`, and `None`.',
          '`Strict` prevents the cookie from being sent on any cross-site request, even when following a regular link. `Lax` is the modern browser default. It allows the cookie to be sent with top-level navigations (like clicking a link) but prevents it from being sent with cross-site POST requests or requests made via images or scripts.',
          'Setting `SameSite=Lax` or `Strict` eliminates the vast majority of CSRF vulnerabilities. However, older browsers may not fully support it, and highly sensitive actions might require an additional layer of defense.'
        ],
        whyItMatters: 'SameSite is a declarative defense that requires minimal configuration and protects against most CSRF scenarios.',
        interviewQuestion: 'What is the difference between `SameSite=Lax` and `SameSite=Strict`?'
      },
      {
        heading: 'Anti-CSRF Tokens',
        explanation: [
          'The traditional defense against CSRF, and a necessary fallback for older browsers or complex CORS setups, is the use of Anti-CSRF tokens (or Synchronizer Tokens).',
          'In this pattern, the server generates a unique, cryptographically strong, and unpredictable token for the user\'s session. When rendering a form or providing configuration to a frontend framework, the server includes this token. When the client submits a state-changing request, it must include this token (usually in a hidden form field or a custom HTTP header).',
          'The server then validates that the token provided in the request matches the token stored in the user\'s session. Since the attacker\'s site cannot read the token due to the Same-Origin Policy, they cannot forge a request containing the correct token, and the server rejects it.'
        ],
        code: `// Conceptual example using express-csrf (or similar)\n// Server generates token and passes to view\napp.get('/form', csrfProtection, (req, res) => {\n  res.render('send', { csrfToken: req.csrfToken() })\n})\n\n// Client submits form, token is automatically checked by middleware\napp.post('/process', csrfProtection, (req, res) => {\n  res.send('data is being processed')\n})`,
        bestPractices: ['Ensure state-changing operations require POST, PUT, or DELETE methods', 'Use SameSite cookies as the primary defense, supplemented by tokens for sensitive actions'],
        commonMistakes: ['Relying on checking the `Referer` or `Origin` header for CSRF protection, as these can sometimes be spoofed or omitted']
      }
    ]
  }
]
