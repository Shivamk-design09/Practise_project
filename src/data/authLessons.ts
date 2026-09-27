import type { Lesson } from '../types'

const references = [
  { label: 'JWT.io', url: 'https://jwt.io/introduction' },
  { label: 'OWASP Auth', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
  { label: 'OAuth 2.0', url: 'https://oauth.net/2/' },
]

export const authLessons: Lesson[] = [
  {
    id: 'password-hashing',
    slug: 'password-hashing',
    technology: 'auth',
    title: 'Password Hashing',
    category: 'Authentication',
    description: 'Learn the fundamentals of securely storing user passwords.',
    section: '10. Authentication',
    level: 1,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Why Plaintext is Dangerous', 'Hashing with bcrypt and argon2', 'Salt Rounds and Rainbow Tables'],
    references,
    sections: [
      {
        heading: 'Why Plaintext is Dangerous',
        explanation: [
          'Storing passwords in plaintext is one of the most critical security vulnerabilities a system can have. If a database is compromised, whether through SQL injection, a leaked backup, or an insider threat, the attacker immediately gains access to all user accounts. This not only affects your application but also puts users at risk across other platforms if they reuse passwords.',
          'To mitigate this, we use cryptographic hashing functions. Unlike encryption, which is reversible given a key, hashing is a one-way mathematical function. It takes an input (the password) and produces a fixed-size string of characters. When a user logs in, the system hashes the entered password and compares it to the stored hash.',
          'However, simple hashing algorithms like MD5 or SHA-256 are no longer sufficient. They are designed to be extremely fast, which means an attacker can use specialized hardware (like GPUs) to compute billions of hashes per second, rapidly guessing passwords through brute force or dictionary attacks.'
        ],
        whyItMatters: 'Compromised plaintext passwords lead to complete account takeovers and massive data breaches.',
        bestPractices: ['Never store plaintext or reversibly encrypted passwords', 'Always use purpose-built password hashing algorithms'],
        interviewQuestion: 'Why is it a bad idea to use SHA-256 for password hashing?'
      },
      {
        heading: 'Hashing with bcrypt and argon2',
        explanation: [
          'Modern password hashing requires algorithms specifically designed to be slow and computationally expensive. This intentional slowness, known as key stretching, makes brute-force attacks economically and practically unfeasible. The two most recommended algorithms today are bcrypt and argon2.',
          'Bcrypt has been the industry standard for over two decades. It incorporates a cost factor that allows you to increase the computational time required as hardware becomes faster. This ensures that the algorithm remains secure over time. It operates by performing multiple iterations of the Blowfish cipher.',
          'Argon2 is newer and won the Password Hashing Competition in 2015. It provides better resistance against GPU-based cracking by being memory-hard. This means it requires a significant amount of RAM to compute the hash, which GPUs do not have in abundance. Argon2 comes in different variants, with Argon2id being the recommended choice for most applications.'
        ],
        code: `import bcrypt from 'bcrypt';\n\nconst saltRounds = 12;\nconst plaintextPassword = 'mySuperSecretPassword';\n\n// Hash the password\nconst hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);\nconsole.log(hashedPassword);\n\n// Verify the password\nconst isMatch = await bcrypt.compare('mySuperSecretPassword', hashedPassword);\nconsole.log(isMatch); // true`,
        commonMistakes: ['Using weak hashing algorithms like MD5', 'Rolling your own cryptographic functions'],
        interviewQuestion: 'What makes bcrypt or argon2 superior to fast hashing algorithms like MD5?'
      },
      {
        heading: 'Salt Rounds and Rainbow Tables',
        explanation: [
          'A rainbow table is a precomputed dictionary of plaintext passwords and their corresponding hashes. Attackers use these tables to instantly reverse hashes back to passwords. If multiple users have the same password, they will have the same hash, making it easier for an attacker to identify common passwords.',
          'To defeat rainbow tables, we use a "salt". A salt is a unique, randomly generated string added to each password before hashing. Even if two users have the same password, their unique salts will result in completely different hashes. The salt is stored alongside the hash in the database, as it is required for verification but does not need to be kept secret.',
          'The "cost factor" or "salt rounds" determines how many times the hashing algorithm is applied. Increasing the salt rounds exponentially increases the time required to compute the hash. You should choose a cost factor that takes around 250-500 milliseconds to compute on your server hardware, balancing security with user experience.'
        ],
        whyItMatters: 'Salts prevent attackers from using precomputed tables, forcing them to attack each password individually.',
        interviewQuestion: 'What is a cryptographic salt and how does it protect against rainbow table attacks?',
        practiceQuestion: 'How would you determine the appropriate number of salt rounds for your application?'
      }
    ]
  },
  {
    id: 'jwt-fundamentals',
    slug: 'jwt-fundamentals',
    technology: 'auth',
    title: 'JWT Fundamentals',
    category: 'Authentication',
    description: 'Understand the structure and usage of JSON Web Tokens.',
    section: '10. Authentication',
    level: 2,
    difficulty: 'beginner',
    progress: 0,
    toc: ['JWT Structure', 'Signing Algorithms', 'Working with JWTs'],
    references,
    sections: [
      {
        heading: 'JWT Structure',
        explanation: [
          'JSON Web Tokens (JWT) are an open, industry-standard method for representing claims securely between two parties. They are widely used for stateless authentication in modern web applications and APIs. A JWT is a compact, URL-safe string divided into three parts separated by dots: header, payload, and signature.',
          'The header typically consists of two parts: the type of the token (which is JWT) and the signing algorithm being used (such as HMAC SHA256 or RSA). This header is Base64Url encoded to form the first part of the token. It tells the receiving party how to parse and verify the token.',
          'The payload contains the claims, which are statements about an entity (typically, the user) and additional data. Claims can be registered (standard claims like "iss" for issuer, "exp" for expiration), public, or private. Like the header, the payload is Base64Url encoded. It is crucial to remember that the payload is readable by anyone, so sensitive information should never be stored here without encryption.'
        ],
        whyItMatters: 'JWTs enable stateless authentication, eliminating the need to query a database for session validation on every request.',
        bestPractices: ['Never put sensitive data like passwords or PII in the JWT payload', 'Keep the payload small to minimize overhead'],
        interviewQuestion: 'Can a user view the contents of a JWT payload? If so, how do we trust the data?'
      },
      {
        heading: 'Signing Algorithms',
        explanation: [
          'The signature is what makes a JWT secure and trustworthy. It is used to verify that the sender of the JWT is who it says it is and to ensure that the message was not changed along the way. To create the signature, you take the encoded header, the encoded payload, a secret, and the algorithm specified in the header, and sign that.',
          'HS256 (HMAC with SHA-256) is a symmetric algorithm. It uses the same secret key to both sign and verify the token. This is simple and fast, making it suitable for scenarios where a single backend service creates and validates the tokens. However, any service that needs to verify the token must also have access to the secret key, which can be a security risk in microservices architectures.',
          'RS256 (RSA Signature with SHA-256) is an asymmetric algorithm. It uses a private key to sign the token and a public key to verify it. This is ideal for distributed systems, as you can share the public key widely without compromising security. Services can independently verify the token\'s authenticity without needing the private key.'
        ],
        whyItMatters: 'Choosing the right signing algorithm ensures the integrity and non-repudiation of the token.',
        interviewQuestion: 'When would you choose RS256 over HS256 for signing a JWT?',
        commonMistakes: ['Exposing the HS256 secret key to client applications']
      },
      {
        heading: 'Working with JWTs',
        explanation: [
          'In Node.js applications, the `jsonwebtoken` library is commonly used to generate and verify JWTs. When a user successfully authenticates, the server generates a token using `jwt.sign()` and sends it to the client. The client then includes this token in subsequent requests, usually in the Authorization header.',
          'On the server side, incoming requests are intercepted by middleware that extracts the token and validates it using `jwt.verify()`. This function checks the token\'s signature against the secret or public key and validates standard claims like expiration (`exp`) and not before (`nbf`). If verification fails, the function throws an error, and the middleware rejects the request.',
          'It is crucial to handle token expiration correctly. A token should have a relatively short lifespan to limit the window of opportunity if it is stolen. When verifying, you must catch token expiration errors specifically to prompt the client to refresh the token or re-authenticate.'
        ],
        code: `import jwt from 'jsonwebtoken';\n\nconst payload = { userId: 123, role: 'admin' };\nconst secret = 'superSecretKey';\n\n// Generate a token\nconst token = jwt.sign(payload, secret, { expiresIn: '1h' });\n\n// Verify the token\ntry {\n  const decoded = jwt.verify(token, secret);\n  console.log(decoded.userId);\n} catch (err) {\n  console.error('Invalid or expired token', err.message);\n}`,
        bestPractices: ['Always set an expiration time for JWTs', 'Handle verification errors gracefully in your middleware'],
        interviewQuestion: 'How does the `jwt.verify` method ensure that the token was not tampered with?'
      }
    ]
  },
  {
    id: 'access-tokens',
    slug: 'access-tokens',
    technology: 'auth',
    title: 'Access Tokens',
    category: 'Authentication',
    description: 'Learn how to use short-lived access tokens securely.',
    section: '10. Authentication',
    level: 3,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Short-Lived Tokens', 'The Bearer Scheme', 'Token Verification Middleware'],
    references,
    sections: [
      {
        heading: 'Short-Lived Tokens',
        explanation: [
          'Access tokens are the credentials used by clients to access protected resources. In a JWT-based architecture, these tokens are self-contained, meaning the resource server can validate them without making a network call to the authorization server. Because they grant immediate access, it is critical that access tokens have a short lifespan.',
          'If an access token is compromised (e.g., intercepted over an insecure network or stolen via XSS), the attacker can use it to impersonate the user. A short expiration time (e.g., 15 minutes to an hour) minimizes the duration an attacker can exploit a stolen token. Once it expires, the attacker loses access.',
          'Determining the exact lifespan of an access token involves balancing security with user convenience and system load. Very short lifespans increase security but require clients to obtain new tokens more frequently, potentially increasing load on your authentication service. You must design your system to seamlessly acquire new tokens when the current one expires.'
        ],
        whyItMatters: 'Short lifespans are the primary defense against the misuse of stolen access tokens.',
        interviewQuestion: 'Why should access tokens have a short expiration time compared to refresh tokens?'
      },
      {
        heading: 'The Bearer Scheme',
        explanation: [
          'The most common way to transmit access tokens is using the HTTP Bearer authentication scheme. This involves sending the token in the `Authorization` header of the HTTP request, formatted as `Authorization: Bearer <token>`. This convention is widely supported and expected by most web frameworks and APIs.',
          'The term "Bearer" literally means "give access to the bearer of this token." It implies that whoever possesses the token is granted access, regardless of their actual identity. This highlights the importance of keeping the token secure in transit (using HTTPS/TLS) and at rest on the client.',
          'When designing your API, you should explicitly document that clients must provide the token in this specific format. Your server-side logic must then parse this header, strip the "Bearer " prefix, and validate the remaining string as the token.'
        ],
        whyItMatters: 'The Bearer scheme is the standardized approach for OAuth 2.0 and JWT token transmission.',
        commonMistakes: ['Transmitting Bearer tokens over unencrypted HTTP', 'Putting tokens in the URL query string where they can be logged']
      },
      {
        heading: 'Token Verification Middleware',
        explanation: [
          'In Express.js, protecting routes is typically handled by authentication middleware. This middleware intercepts incoming requests, extracts the access token from the Authorization header, and verifies it. If the token is valid, the middleware attaches the decoded payload (usually containing user info) to the request object and calls `next()` to pass control to the route handler.',
          'If the token is missing, invalid, or expired, the middleware should immediately return an appropriate HTTP status code. A missing or invalid token usually warrants a 401 Unauthorized response. This prevents unauthorized requests from ever reaching your core application logic.',
          'It is good practice to create modular, reusable middleware functions. You might have one middleware for general authentication and others for specific roles or permissions. This keeps your route definitions clean and ensures consistent security checks across your application.'
        ],
        code: `const authenticate = (req, res, next) => {\n  const authHeader = req.headers.authorization;\n  if (!authHeader || !authHeader.startsWith('Bearer ')) {\n    return res.status(401).json({ error: 'Unauthorized' });\n  }\n\n  const token = authHeader.split(' ')[1];\n  try {\n    const decoded = jwt.verify(token, process.env.JWT_SECRET);\n    req.user = decoded;\n    next();\n  } catch (err) {\n    return res.status(401).json({ error: 'Invalid token' });\n  }\n};`,
        bestPractices: ['Attach the decoded user information to the request object for easy access in controllers', 'Return standardized error responses for authentication failures'],
        interviewQuestion: 'Explain the flow of a request passing through a token verification middleware in Express.'
      }
    ]
  },
  {
    id: 'refresh-tokens',
    slug: 'refresh-tokens',
    technology: 'auth',
    title: 'Refresh Tokens',
    category: 'Authentication',
    description: 'Implement secure, long-lived refresh tokens for continuous access.',
    section: '10. Authentication',
    level: 4,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Purpose of Refresh Tokens', 'Token Rotation and Security', 'Handling Revocation'],
    references,
    sections: [
      {
        heading: 'Purpose of Refresh Tokens',
        explanation: [
          'While access tokens are short-lived for security, forcing a user to log in every 15 minutes is terrible for user experience. This is where refresh tokens come in. A refresh token is a long-lived credential (lasting days, weeks, or months) whose sole purpose is to obtain new access tokens without requiring the user to re-enter their credentials.',
          'When a user initially authenticates, the server issues both an access token and a refresh token. The client uses the access token for API requests until it expires. Once expired, the client sends the refresh token to a dedicated endpoint to request a new access token. If the refresh token is valid, the server issues a new access token.',
          'Because refresh tokens are powerful, they must be stored securely. In web applications, the best practice is to store the refresh token in an `httpOnly`, `Secure`, and `SameSite` cookie. This prevents XSS attacks from reading the token while ensuring it is only sent over encrypted connections.'
        ],
        whyItMatters: 'Refresh tokens balance high security (via short-lived access tokens) with a seamless user experience.',
        bestPractices: ['Store refresh tokens in httpOnly cookies in web apps', 'Do not include excessive claims in the refresh token payload'],
        interviewQuestion: 'Why do we need both access tokens and refresh tokens instead of just one long-lived token?'
      },
      {
        heading: 'Token Rotation and Security',
        explanation: [
          'Refresh token rotation is a critical security enhancement. It means that every time a refresh token is used to obtain a new access token, the server also issues a brand new refresh token and invalidates the old one. The client must replace its stored refresh token with the new one.',
          'This strategy severely limits the damage if a refresh token is stolen. If an attacker steals a refresh token and uses it, the legitimate user\'s token will be invalidated. When the legitimate user tries to use their now-invalidated token, the server can detect the reuse attempt (indicating a potential compromise) and revoke the entire token family, forcing a re-login.',
          'Implementing rotation requires the server to maintain state, typically in a database or a fast cache like Redis, to track which refresh tokens are active and which have been consumed. This statefulness is a trade-off against the statelessness of JWT access tokens, but it is necessary for robust security.'
        ],
        whyItMatters: 'Rotation helps detect token theft and provides a mechanism to automatically cut off unauthorized access.',
        commonMistakes: ['Issuing long-lived refresh tokens without a rotation strategy'],
        interviewQuestion: 'How does refresh token rotation help detect and mitigate token theft?'
      },
      {
        heading: 'Handling Revocation',
        explanation: [
          'One of the main challenges with JWTs is that they cannot be easily revoked before they expire. If a user logs out, changes their password, or is banned, their existing access token remains valid until its expiration time. This is why access tokens must be short-lived.',
          'However, we can and must be able to revoke refresh tokens immediately. When a user logs out, the server should invalidate their active refresh token in the database. Any subsequent attempts to use that refresh token to get a new access token will fail.',
          'In more complex scenarios, you might need to revoke all active tokens for a specific user (e.g., if their account is compromised) or across a specific device. This is achieved by maintaining a "token family" identifier or associating tokens with the user ID and a unique session ID in the database.'
        ],
        code: `// Express route for logging out\napp.post('/logout', async (req, res) => {\n  const refreshToken = req.cookies.refreshToken;\n  \n  // Remove token from database/Redis\n  await TokenBlacklist.add(refreshToken);\n  \n  // Clear the cookie on the client\n  res.clearCookie('refreshToken', {\n    httpOnly: true,\n    secure: process.env.NODE_ENV === 'production'\n  });\n  \n  res.status(200).json({ message: 'Logged out successfully' });\n});`,
        bestPractices: ['Maintain a blacklist or whitelist of refresh tokens in a database', 'Invalidate all associated tokens when a user changes their password'],
        interviewQuestion: 'Since JWTs are stateless, how do you handle user logout effectively?'
      }
    ]
  },
  {
    id: 'cookies-and-sessions',
    slug: 'cookies-and-sessions',
    technology: 'auth',
    title: 'Cookies & Sessions',
    category: 'Authentication',
    description: 'Master traditional session-based authentication and secure cookie management.',
    section: '10. Authentication',
    level: 5,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['How Sessions Work', 'Secure Cookie Attributes', 'Using Session Stores'],
    references,
    sections: [
      {
        heading: 'How Sessions Work',
        explanation: [
          'Before JWTs became popular, stateful session-based authentication was the standard. In this model, when a user logs in, the server creates a "session" object containing user data and stores it in memory or a database. The server then generates a unique session ID and sends it back to the client in a Set-Cookie header.',
          'On every subsequent request, the client\'s browser automatically sends the cookie containing the session ID back to the server. The server uses this ID to look up the corresponding session data, thus identifying the user. This approach is conceptually simpler than JWTs and offers immediate, fine-grained control over active sessions.',
          'Because the actual user data remains on the server, you can instantly revoke a user\'s access by simply deleting their session from the server-side store. However, this statefulness means the server must maintain active session data, which can introduce scaling challenges in distributed environments where requests might hit different servers.'
        ],
        whyItMatters: 'Sessions provide immediate revocation capabilities and keep sensitive user data off the client entirely.',
        interviewQuestion: 'Compare the stateful nature of sessions with the stateless nature of JWTs. What are the trade-offs?'
      },
      {
        heading: 'Secure Cookie Attributes',
        explanation: [
          'When setting cookies, especially for authentication, you must use specific attributes to secure them against common web vulnerabilities. The `httpOnly` flag is crucial; it instructs the browser that the cookie should not be accessible via JavaScript (e.g., `document.cookie`). This drastically reduces the risk of XSS attacks stealing the session ID.',
          'The `Secure` attribute ensures that the cookie is only transmitted over encrypted (HTTPS) connections. If a user attempts to access your site over plain HTTP, the browser will withhold the cookie, preventing it from being intercepted in transit.',
          'The `SameSite` attribute helps protect against Cross-Site Request Forgery (CSRF) attacks. Setting it to `Lax` (the modern default) or `Strict` prevents the browser from sending the cookie with cross-site requests. For APIs accessed by third-party domains, `SameSite=None` is required, but it must be paired with the `Secure` attribute.'
        ],
        code: `res.cookie('sessionId', 'abc123xyz', {\n  httpOnly: true,\n  secure: process.env.NODE_ENV === 'production',\n  sameSite: 'lax',\n  maxAge: 24 * 60 * 60 * 1000 // 1 day\n});`,
        bestPractices: ['Always set httpOnly and Secure flags for authentication cookies', 'Use SameSite=Lax as a baseline defense against CSRF'],
        interviewQuestion: 'What specific attacks do the `httpOnly` and `SameSite` cookie attributes prevent?'
      },
      {
        heading: 'Using Session Stores',
        explanation: [
          'By default, libraries like `express-session` store session data in the server\'s memory. This is fine for development but fatal in production. Memory leaks can crash your server, and if your application restarts, all users are immediately logged out. Furthermore, in a multi-server setup, a session created on Server A won\'t be found if the next request hits Server B.',
          'To solve this, you must use an external session store. Redis is the most popular choice because it is an incredibly fast, in-memory data structure store that handles high read/write loads effortlessly. When configured, `express-session` will automatically save, read, and delete sessions in Redis instead of local memory.',
          'When using a session store, you can configure the TTL (Time To Live) for sessions in Redis, ensuring that expired sessions are automatically purged from the database, preventing it from growing indefinitely. This setup allows your application to scale horizontally while maintaining stateful authentication.'
        ],
        whyItMatters: 'External session stores are mandatory for making stateful session authentication viable and scalable in production.',
        commonMistakes: ['Using in-memory session storage (MemoryStore) in a production environment'],
        interviewQuestion: 'Why is Redis a popular choice for storing session data compared to a traditional relational database?'
      }
    ]
  },
  {
    id: 'oauth-basics',
    slug: 'oauth-basics',
    technology: 'auth',
    title: 'OAuth Basics',
    category: 'Authentication',
    description: 'Understand the OAuth 2.0 flow for authorization and social logins.',
    section: '10. Authentication',
    level: 6,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['What is OAuth 2.0?', 'The Authorization Code Flow', 'Implementing Social Login'],
    references,
    sections: [
      {
        heading: 'What is OAuth 2.0?',
        explanation: [
          'OAuth 2.0 is an industry-standard authorization framework. It allows an application to obtain limited access to a user\'s account on an HTTP service, such as Google, GitHub, or Facebook. Crucially, it achieves this without the application ever seeing or storing the user\'s password for that service.',
          'The framework defines several roles: the Resource Owner (the user), the Client (your application), the Authorization Server (e.g., Google\'s auth server), and the Resource Server (where the user\'s data lives). The core mechanism involves the user authorizing your app, and the authorization server granting your app an access token to act on the user\'s behalf.',
          'While OAuth 2.0 is technically an authorization framework, it is heavily used for authentication (verifying identity) via an extension called OpenID Connect (OIDC). When we talk about "Social Login", we are typically referring to using OIDC on top of OAuth 2.0.'
        ],
        whyItMatters: 'OAuth 2.0 enables secure third-party integrations and frictionless social logins without compromising user passwords.',
        interviewQuestion: 'Explain the difference between OAuth 2.0 (Authorization) and OpenID Connect (Authentication).'
      },
      {
        heading: 'The Authorization Code Flow',
        explanation: [
          'The most common and secure OAuth 2.0 flow for web applications is the Authorization Code Grant. It involves a multi-step process that ensures access tokens are never exposed to the user\'s browser. The flow starts with your application redirecting the user to the provider\'s authorization URL, including a client ID and requested scopes.',
          'The user authenticates with the provider and consents to the access. The provider then redirects the user back to your application\'s callback URL, appending a short-lived authorization code in the URL query string. This code is not an access token; it is simply proof that the user authorized the request.',
          'In the final step, your backend server takes this authorization code and makes a secure, server-to-server POST request to the provider\'s token endpoint, including your client ID and client secret. The provider validates the code and responds with an access token (and optionally a refresh token), which your backend can then use to access the user\'s data securely.'
        ],
        whyItMatters: 'The Authorization Code flow keeps the client secret secure on the backend and prevents access tokens from leaking in the frontend.',
        commonMistakes: ['Exposing the OAuth client secret in frontend code or public repositories'],
        interviewQuestion: 'Why does the Authorization Code flow use an intermediate code instead of returning the access token directly to the browser?'
      },
      {
        heading: 'Implementing Social Login',
        explanation: [
          'Implementing social login in Node.js is vastly simplified by using libraries like Passport.js. Passport provides "strategies" for hundreds of different OAuth providers. It abstracts away the complex redirect logic and token exchange, allowing you to focus on how to handle the user data once authenticated.',
          'When you receive the user\'s profile data from the provider (e.g., their email and ID), you typically check your database to see if a user with that provider ID already exists. If they do, you log them in (e.g., issue them your own JWT or start a session). If they don\'t, you create a new user record in your database using their profile data.',
          'It is important to handle edge cases, such as a user trying to log in with Google when they originally signed up with an email and password using the same email address. You must decide whether to link the accounts automatically or prompt the user for action, keeping security implications in mind.'
        ],
        code: `// High-level conceptual flow using a theoretical library\napp.get('/auth/github', passport.authenticate('github'));\n\napp.get('/auth/github/callback', \n  passport.authenticate('github', { failureRedirect: '/login' }),\n  (req, res) => {\n    // User is authenticated by GitHub.\n    // req.user contains the profile data.\n    \n    // Create your own session/JWT here\n    const token = generateMyOwnJWT(req.user);\n    res.cookie('token', token);\n    res.redirect('/dashboard');\n  }\n);`,
        bestPractices: ['Normalize user profiles from different providers into a consistent database schema', 'Handle account linking carefully to prevent account takeover'],
        interviewQuestion: 'How would you handle a scenario where a user signs up with Email/Password, and later tries to log in using Google with the same email?'
      }
    ]
  },
  {
    id: 'rbac',
    slug: 'rbac',
    technology: 'auth',
    title: 'RBAC',
    category: 'Authentication',
    description: 'Implement Role-Based Access Control to manage permissions.',
    section: '10. Authentication',
    level: 7,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Understanding RBAC', 'Middleware Guards', 'Hierarchical Roles'],
    references,
    sections: [
      {
        heading: 'Understanding RBAC',
        explanation: [
          'Role-Based Access Control (RBAC) is an authorization paradigm where access permissions are assigned to specific roles, and users are granted those roles. This is a significant abstraction over assigning permissions directly to users, making system administration much more manageable at scale.',
          'In a typical RBAC system, you might have roles like "User", "Editor", and "Admin". You define permissions (e.g., "create:post", "delete:user") and map them to these roles. When a user attempts to perform an action, the system checks if the user\'s assigned role has the necessary permission to execute that action.',
          'RBAC is usually implemented by embedding the user\'s role within their session data or JWT payload. This allows the backend to perform authorization checks without constantly querying the database for the user\'s permissions on every request.'
        ],
        whyItMatters: 'RBAC simplifies authorization management, allowing you to change permissions for an entire group of users by modifying a single role definition.',
        interviewQuestion: 'What are the main advantages of Role-Based Access Control over user-based access control?'
      },
      {
        heading: 'Middleware Guards',
        explanation: [
          'In web frameworks like Express, RBAC is enforced using middleware functions known as "guards". These guards run after the initial authentication middleware (which verifies *who* the user is) to determine if the user is *allowed* to access the specific route.',
          'A guard middleware typically inspects the `req.user.role` property and compares it against an array of allowed roles for that route. If the user\'s role is present, the middleware calls `next()`. If not, it rejects the request, usually with a 403 Forbidden HTTP status code.',
          'By using higher-order functions (functions that return middleware functions), you can create highly reusable guards. You can define routes like `router.delete("/users/:id", requireRole(["admin"]), deleteUser)` which clearly expresses the authorization requirements directly in the routing definition.'
        ],
        code: `const requireRole = (allowedRoles) => {\n  return (req, res, next) => {\n    // Ensure user exists (authentication middleware ran first)\n    if (!req.user || !req.user.role) {\n      return res.status(401).json({ error: 'Unauthorized' });\n    }\n\n    // Check if user's role is in the allowed list\n    if (allowedRoles.includes(req.user.role)) {\n      next(); // User has permission\n    } else {\n      res.status(403).json({ error: 'Forbidden: Insufficient permissions' });\n    }\n  };\n};\n\n// Usage in routes\napp.delete('/data', authenticate, requireRole(['admin', 'manager']), deleteData);`,
        bestPractices: ['Fail closed: By default, deny access unless explicitly granted', 'Return a 403 status code for authorization failures, not a 401'],
        interviewQuestion: 'Explain the difference between returning a 401 Unauthorized and a 403 Forbidden status code.'
      },
      {
        heading: 'Hierarchical Roles',
        explanation: [
          'In more complex applications, roles are often hierarchical. For example, an "Admin" role inherently possesses all the permissions of an "Editor" role, which in turn possesses all permissions of a "User" role. Defining explicitly allowed roles for every route can become tedious and error-prone.',
          'To handle this, you can implement role hierarchies. Instead of checking if the user\'s exact role is in an allowed list, the system determines the "weight" or "level" of the user\'s role. If the required role for a route is level 2, any user with a role of level 2 or higher is granted access.',
          'While RBAC is powerful, it sometimes falls short for resource-level access control. For example, an "Editor" might be allowed to edit posts, but only the posts *they* created. This requires Attribute-Based Access Control (ABAC) or specifically checking resource ownership in the controller, moving beyond simple role checks.'
        ],
        whyItMatters: 'Role hierarchies reduce configuration duplication and simplify route definitions in systems with complex permission structures.',
        commonMistakes: ['Confusing RBAC (can this role edit posts?) with resource ownership (can this user edit THIS specific post?)'],
        interviewQuestion: 'How would you design a system where a user can edit their own profile, but an admin can edit any profile?'
      }
    ]
  },
  {
    id: 'authentication-vs-authorization',
    slug: 'authentication-vs-authorization',
    technology: 'auth',
    title: 'Authentication vs Authorization',
    category: 'Authentication',
    description: 'Understand the critical distinction between verifying identity and granting access.',
    section: '10. Authentication',
    level: 8,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Defining the Terms', 'AuthN and AuthZ in Practice', 'Understanding 401 vs 403'],
    references,
    sections: [
      {
        heading: 'Defining the Terms',
        explanation: [
          'In security, Authentication (often abbreviated as AuthN) and Authorization (AuthZ) are distinct but complementary processes. Authentication is the process of verifying who a user is. It answers the question, "Are you who you say you are?" When you log in with a username and password, or via a biometric scan, you are undergoing authentication.',
          'Authorization, on the other hand, is the process of determining what an authenticated user is allowed to do. It answers the question, "Do you have permission to access this resource or perform this action?" Even if we know exactly who you are, we might not let you delete the production database.',
          'A simple analogy is airport security. When you present your ID and boarding pass at the TSA checkpoint, they are authenticating you (verifying your identity matches the ticket). When you arrive at the gate, the boarding group on your ticket authorizes you to board the plane at a specific time, and dictates whether you can sit in first class or economy.'
        ],
        whyItMatters: 'Conflating these two concepts leads to severe security flaws where systems might verify identity but fail to check permissions.',
        interviewQuestion: 'Explain the difference between Authentication and Authorization using a real-world non-technical analogy.'
      },
      {
        heading: 'AuthN and AuthZ in Practice',
        explanation: [
          'In a typical web application architecture, these processes occur sequentially. The authentication process happens first. The server validates credentials, establishes a session, or issues a token. The outcome of successful authentication is that the system now trusts the identity of the client making subsequent requests.',
          'Authorization happens on every single request that attempts to access a protected resource. The system inspects the identity established during authentication (e.g., by reading the user role from a verified JWT) and evaluates it against the security rules defined for that specific resource or action.',
          'This separation of concerns is vital for maintainability. Authentication logic is often centralized (a single login endpoint or OAuth provider), while authorization logic is distributed across various routes and services, tightly coupled to the business rules of what different users can do.'
        ],
        whyItMatters: 'Separating AuthN and AuthZ logic allows for modular code, easier auditing, and the ability to swap authentication providers without rewriting permission rules.',
        commonMistakes: ['Assuming that because a user is authenticated, they have permission to access all endpoints']
      },
      {
        heading: 'Understanding 401 vs 403',
        explanation: [
          'The distinction between authentication and authorization maps directly to two standard HTTP status codes: 401 Unauthorized and 403 Forbidden. While the name "Unauthorized" is historically confusing, it actually means "Unauthenticated".',
          'You return a 401 Unauthorized when the client provides no credentials, invalid credentials, or an expired token. It signals to the client: "I don\'t know who you are, or your proof of identity is invalid. Please log in." The client typically responds by redirecting the user to a login page.',
          'You return a 403 Forbidden when the client is authenticated (we know who they are), but they lack the necessary permissions to perform the requested action. It signals: "I know exactly who you are, but you are not allowed to do this." The client typically responds by showing an error message or a "Access Denied" page.'
        ],
        whyItMatters: 'Using correct status codes helps clients understand exactly why a request failed and how to recover or present the error to the user.',
        bestPractices: ['Return 401 for bad/missing tokens and 403 for insufficient roles/permissions'],
        interviewQuestion: 'If a user tries to access an admin panel but they only have a "user" role, should the server return a 401 or a 403?'
      }
    ]
  }
]
