import type { Lesson } from '../types'

const references = [
  { label: 'Develop with Redis', url: 'https://redis.io/docs/latest/develop/' },
  { label: 'Redis Data Types', url: 'https://redis.io/docs/latest/develop/data-types/' },
  { label: 'Redis Persistence', url: 'https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/' },
  { label: 'Redis Cluster', url: 'https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/' },
  { label: 'Redis Pub/Sub', url: 'https://redis.io/docs/latest/develop/interact/pubsub/' }
]

export const redisLessons: Lesson[] = [
  {
    id: 'what-is-redis',
    slug: 'what-is-redis',
    technology: 'redis',
    title: 'What is Redis?',
    category: 'Redis',
    description: 'An introduction to Redis as an in-memory data structure store, exploring its use cases and single-threaded model.',
    section: '15. Redis',
    level: 1,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Introduction to Redis'],
    references,
    sections: [
      {
        heading: 'Introduction to Redis',
        explanation: [
          'Redis (Remote Dictionary Server) is an open-source, in-memory data structure store used as a database, cache, message broker, and streaming engine. Unlike traditional relational databases that store data on disk, Redis keeps all its data in the main memory (RAM). This architecture allows it to deliver exceptional performance, with read and write operations typically taking less than a millisecond.',
          'One of the defining characteristics of Redis is its single-threaded architecture for command execution. While it uses multiple threads for background tasks like I/O and persistence, the actual processing of commands happens on a single thread. This eliminates the need for complex locking mechanisms and prevents race conditions, making the system highly predictable and efficient at processing millions of requests per second.',
          'Redis is not just a simple key-value store; it supports complex data structures like Strings, Lists, Sets, Hashes, and Sorted Sets. It is heavily utilized in modern application stacks for use cases such as caching API responses, managing user sessions, real-time analytics, leaderboards, and pub/sub messaging. Compared to databases like MongoDB or PostgreSQL, Redis sacrifices persistent storage capacity for sheer speed, making it an ideal companion database.'
        ],
        whyItMatters: 'Understanding what Redis is and its core architecture helps developers decide when and how to integrate it into their stack, often for critical performance-sensitive paths.',
        realWorldExample: 'A popular e-commerce platform uses Redis to cache its product catalog and handle user shopping carts. This ensures lightning-fast page loads and immediate cart updates, even during high-traffic events like Black Friday.',
        code: `// Example of basic Redis connection using Node.js and ioredis
import Redis from 'ioredis';

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
});

async function main() {
  await redis.set('mykey', 'Hello Redis!');
  const value = await redis.get('mykey');
  console.log(value);
  redis.quit();
}
main();`,
        output: 'Hello Redis!',
        commonMistakes: [
          'Treating Redis as a primary database without configuring proper persistence, risking data loss on restart.',
          'Running complex, long-running commands (like KEYS *) in production, blocking the single thread.'
        ],
        bestPractices: [
          'Use connection pooling or a persistent connection across your application rather than connecting per request.',
          'Always set a reasonable timeout for your connections to prevent hanging.'
        ],
        interviewQuestion: 'Why is Redis so fast despite being single-threaded?',
        practiceQuestion: 'What are the main differences between Redis and a traditional relational database?'
      }
    ]
  },
  {
    id: 'in-memory-architecture',
    slug: 'in-memory-architecture',
    technology: 'redis',
    title: 'In-Memory Architecture',
    category: 'Redis',
    description: 'Explore how Redis manages data in RAM and handles memory limits using maxmemory policies.',
    section: '15. Redis',
    level: 2,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Memory Management and Policies'],
    references,
    sections: [
      {
        heading: 'Memory Management and Policies',
        explanation: [
          'Because Redis operates entirely in-memory, the available RAM on the server acts as the strict upper bound for data storage. Accessing data in RAM is orders of magnitude faster than accessing SSDs or HDDs. However, this speed comes with a significant cost per gigabyte and strict capacity limits. Developers must be mindful of their data footprint, using efficient data types and actively managing memory usage.',
          'When Redis reaches its memory limit (configured via the maxmemory directive), it needs a strategy to handle incoming writes. This is where eviction policies come into play. Redis offers several policies to determine which keys should be removed to make room for new data. These policies range from returning errors on new writes to intelligently evicting older, less-used data based on various algorithms.',
          'Common maxmemory policies include `noeviction` (the default, which returns an error when memory is full), `allkeys-lru` (evicts the least recently used keys out of all keys), and `volatile-lru` (evicts the least recently used keys among those with an expiration set). Choosing the right policy is crucial for maintaining cache health and ensuring that high-priority data remains available while stale data is appropriately discarded.'
        ],
        whyItMatters: 'Memory is a finite and expensive resource. Proper memory management ensures your Redis instance doesn\'t crash from OOM (Out of Memory) errors and maintains optimal cache hit rates.',
        realWorldExample: 'A news website uses Redis as a cache with the `allkeys-lru` policy. As new articles are published and cached, older, less-accessed articles are automatically evicted from memory, keeping the cache within its 4GB limit without manual intervention.',
        code: `# Checking memory stats in Redis CLI
127.0.0.1:6379> INFO memory
# Memory
used_memory:1048576
used_memory_human:1.00M
maxmemory:4294967296
maxmemory_human:4.00G
maxmemory_policy:allkeys-lru`,
        commonMistakes: [
          'Leaving maxmemory unconfigured on a shared server, potentially starving the OS of memory.',
          'Using noeviction policy for a pure caching workload, causing the application to fail when the cache fills up.'
        ],
        bestPractices: [
          'Always configure a maxmemory limit when using Redis as a cache.',
          'Monitor memory usage and cache hit rates to tune your eviction policy and memory limits.'
        ],
        interviewQuestion: 'Explain the difference between allkeys-lru and volatile-lru in Redis.',
        practiceQuestion: 'How would you configure Redis if you wanted it to act purely as a persistent store that never deletes data automatically?'
      }
    ]
  },
  {
    id: 'redis-event-loop',
    slug: 'redis-event-loop',
    technology: 'redis',
    title: 'Redis Event Loop',
    category: 'Redis',
    description: 'Deep dive into the single-threaded event loop and I/O multiplexing in Redis.',
    section: '15. Redis',
    level: 3,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Understanding the Event Loop'],
    references,
    sections: [
      {
        heading: 'Understanding the Event Loop',
        explanation: [
          'At the heart of Redis is a reactive event loop that uses I/O multiplexing techniques like epoll, kqueue, or select. This mechanism allows a single thread to monitor multiple file descriptors (network connections) simultaneously, waiting for them to become readable or writable. Instead of spawning a thread per connection, Redis queues the network events and processes them sequentially in its main event loop.',
          'The single-threaded execution of commands ensures that operations are atomic by default. When a command is being executed, no other command can interrupt it or modify the data concurrently. This simplifies the internal architecture, avoids context-switching overhead, and prevents concurrency bugs like race conditions. However, it also means that long-running commands will block the entire server, delaying the processing of subsequent requests.',
          'While command execution is single-threaded, modern Redis (from version 6.0 onwards) supports multi-threaded I/O for network reading and writing. This means Redis can use multiple threads to parse incoming network requests and write responses to the network sockets, offloading the most CPU-intensive non-command tasks. Even with I/O threading, the actual execution of the commands remains single-threaded, preserving the simplicity and atomicity guarantees.'
        ],
        whyItMatters: 'Understanding the single-threaded model is critical for writing efficient Redis interactions, as blocking the event loop can severely degrade application performance.',
        realWorldExample: 'A developer accidentally runs the `KEYS *` command in a production Redis instance containing millions of keys. The single thread spends 2 seconds iterating over all keys, during which all other application requests time out, causing a massive service disruption. They learn to use `SCAN` instead.',
        code: `// Simulating non-blocking operations in Node.js
import Redis from 'ioredis';
const redis = new Redis();

async function demonstrateSpeed() {
  const start = Date.now();
  const pipeline = redis.pipeline();
  
  // Queue 10,000 commands
  for(let i = 0; i < 10000; i++) {
    pipeline.set(\`key:\${i}\`, 'value');
  }
  
  // Execute all commands in one network trip
  await pipeline.exec();
  const duration = Date.now() - start;
  console.log(\`Processed 10,000 commands in \${duration}ms\`);
  redis.quit();
}
demonstrateSpeed();`,
        commonMistakes: [
          'Using O(N) commands like KEYS or SMEMBERS on very large datasets in production.',
          'Running Lua scripts that contain long loops or computationally expensive logic.'
        ],
        bestPractices: [
          'Use the SCAN family of commands for iterating over large datasets incrementally.',
          'Keep your Redis commands and Lua scripts as fast and simple as possible.'
        ],
        interviewQuestion: 'How does Redis handle thousands of concurrent connections using a single thread?',
        practiceQuestion: 'What are the performance implications of the single-threaded model?'
      }
    ]
  },
  {
    id: 'strings',
    slug: 'strings',
    technology: 'redis',
    title: 'Strings',
    category: 'Redis',
    description: 'Master the fundamental String data type in Redis and its various operations.',
    section: '15. Redis',
    level: 4,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Working with Strings'],
    references,
    sections: [
      {
        heading: 'Working with Strings',
        explanation: [
          'Strings are the most basic and versatile data type in Redis. A Redis String can contain any kind of data, such as a text string, a serialized JSON object, an integer, or even binary data like a JPEG image. The maximum size of a single String value in Redis is 512 Megabytes, making it suitable for caching large payloads or documents.',
          'While they are called Strings, Redis provides specific commands to manipulate them as integers or floats. Commands like INCR (increment), DECR (decrement), and INCRBY allow you to atomically modify numeric values stored in strings. This atomic nature means that if multiple clients send INCR commands simultaneously, Redis guarantees that the counter will be incremented correctly without race conditions.',
          'Other powerful string operations include SETNX (set if not exists), which is foundational for implementing distributed locks, and SETEX (set with expiration). For performance, MSET and MGET allow you to set or retrieve multiple string keys in a single atomic operation, significantly reducing network round-trip times when dealing with batches of data.'
        ],
        whyItMatters: 'Strings are the building blocks of Redis. They are used for everything from simple caching and session storage to atomic counters and rate limiters.',
        realWorldExample: 'A web application uses Redis Strings with the INCR command to keep track of page views for articles in real-time, completely bypassing the heavy write load that would otherwise hit their SQL database.',
        code: `import Redis from 'ioredis';
const redis = new Redis();

async function stringOperations() {
  // Basic Set and Get
  await redis.set('user:1:name', 'Alice');
  console.log(await redis.get('user:1:name')); // Alice

  // Atomic Counters
  await redis.set('page:views', 0);
  await redis.incr('page:views');
  await redis.incrby('page:views', 10);
  console.log(await redis.get('page:views')); // 11

  // Set with Expiration (TTL)
  await redis.set('session:abcd', 'active', 'EX', 60); // Expires in 60s
  
  // Set if Not Exists
  const isSet = await redis.setnx('lock:resource', 'locked');
  console.log(isSet === 1 ? 'Lock acquired' : 'Lock busy');
  
  redis.quit();
}
stringOperations();`,
        commonMistakes: [
          'Fetching multiple keys sequentially with GET instead of using MGET, causing high network latency.',
          'Storing very large objects (e.g., > 10MB) as single strings, which can block the event loop when read or written.'
        ],
        bestPractices: [
          'Use structured key names like `object-type:id:field` (e.g., `user:1000:email`).',
          'Serialize complex objects to JSON before storing them as strings, or use Redis Hashes.'
        ],
        interviewQuestion: 'How would you use Redis Strings to implement a simple rate limiter?',
        practiceQuestion: 'Explain the difference between SET, SETNX, and SETEX.'
      }
    ]
  },
  {
    id: 'lists',
    slug: 'lists',
    technology: 'redis',
    title: 'Lists',
    category: 'Redis',
    description: 'Learn how to use Redis Lists for queues, stacks, and ordered data collections.',
    section: '15. Redis',
    level: 5,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Redis Lists as Queues and Stacks'],
    references,
    sections: [
      {
        heading: 'Redis Lists as Queues and Stacks',
        explanation: [
          'Redis Lists are simply lists of strings, sorted by insertion order. Under the hood, Redis implements Lists as linked lists, which means that adding elements to the head or tail of the list is extremely fast (O(1) time complexity), regardless of how long the list is. However, accessing elements in the middle of a large list can be slower (O(N)).',
          'The primary commands for manipulating Lists involve pushing and popping elements from either end. LPUSH and RPUSH add elements to the left (head) and right (tail) respectively. Conversely, LPOP and RPOP remove and return elements from the left and right. By combining these commands, developers can easily implement common data structures: using LPUSH and RPOP creates a queue (FIFO), while using LPUSH and LPOP creates a stack (LIFO).',
          'Redis also provides blocking commands for Lists, such as BRPOP and BLPOP. These commands are crucial for building robust message queues. If a client attempts to pop from an empty list using a blocking command, the connection will block until another client pushes an item into the list, or a timeout is reached. This is vastly more efficient than a client continuously polling an empty list in a loop.'
        ],
        whyItMatters: 'Lists are fundamental for building background job queues, activity feeds, and buffering data in real-time applications.',
        realWorldExample: 'A social network uses Redis Lists to store the activity feed for each user. When someone posts an update, an RPUSH command appends the post ID to their followers\' lists, and LRANGE is used to fetch the latest 50 posts when a user views their timeline.',
        code: `import Redis from 'ioredis';
const redis = new Redis();

async function listOperations() {
  const queueKey = 'tasks:queue';

  // Producer: Add items to the queue
  await redis.rpush(queueKey, 'task1');
  await redis.rpush(queueKey, 'task2');
  await redis.rpush(queueKey, 'task3');
  
  console.log('Queue length:', await redis.llen(queueKey)); // 3

  // Consumer: Process items (FIFO)
  const task = await redis.lpop(queueKey);
  console.log('Processing:', task); // task1

  // Read range without removing
  const remaining = await redis.lrange(queueKey, 0, -1);
  console.log('Remaining tasks:', remaining); // [ 'task2', 'task3' ]
  
  redis.quit();
}
listOperations();`,
        commonMistakes: [
          'Using LRANGE 0 -1 on a list with millions of elements, which blocks the Redis server.',
          'Using a List for random access lookups by index (LINDEX) on large lists, which is inefficient.'
        ],
        bestPractices: [
          'Trim lists to a fixed size using LTRIM to prevent them from growing indefinitely (e.g., keeping only the latest 100 log entries).',
          'Use blocking pop operations (BRPOP/BLPOP) for worker queues instead of polling with LPOP.'
        ],
        interviewQuestion: 'How would you implement a capped collection (a list that only keeps the latest N items) in Redis?',
        practiceQuestion: 'What is the time complexity of pushing an element to a Redis List versus accessing an element by its index?'
      }
    ]
  },
  {
    id: 'sets',
    slug: 'sets',
    technology: 'redis',
    title: 'Sets',
    category: 'Redis',
    description: 'Understand Redis Sets for storing unique collections and performing mathematical set operations.',
    section: '15. Redis',
    level: 6,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Working with Sets'],
    references,
    sections: [
      {
        heading: 'Working with Sets',
        explanation: [
          'Redis Sets are unordered collections of unique strings. They are implemented using a hash table data structure internally, which allows for highly efficient O(1) operations for adding, removing, and checking the existence of elements. Because Sets enforce uniqueness, they are ideal for keeping track of distinct items, such as unique IP addresses that visited a site or users who have liked a post.',
          'Beyond simple storage and retrieval (SADD, SREM, SMEMBERS), Redis Sets excel at mathematical set operations. You can compute the intersection (SINTER), union (SUNION), and difference (SDIFF) between multiple Sets server-side. These operations are extremely fast and save you from having to pull large amounts of data to your application server just to compare them.',
          'Sets also offer commands for random selection, which can be surprisingly useful. The SRANDMEMBER command returns one or more random elements without removing them, while SPOP returns and removes random elements. This makes Sets suitable for implementing randomized features like selecting winners for a giveaway or shuffling a deck of cards.'
        ],
        whyItMatters: 'Sets are crucial for tracking uniqueness, establishing relationships via tags, and performing fast membership checks without fetching data to the application layer.',
        realWorldExample: 'An article publishing platform uses Sets to implement a "tags" feature. Each article has a Set of tag IDs, and each tag has a Set of article IDs. Finding all articles tagged with both "Redis" and "Node.js" is a simple, blazing-fast SINTER operation.',
        code: `import Redis from 'ioredis';
const redis = new Redis();

async function setOperations() {
  const tagsPost1 = 'post:1:tags';
  const tagsPost2 = 'post:2:tags';

  // Add elements
  await redis.sadd(tagsPost1, 'database', 'redis', 'nosql');
  await redis.sadd(tagsPost2, 'nodejs', 'redis', 'backend');

  // Check membership
  const hasRedis = await redis.sismember(tagsPost1, 'redis');
  console.log('Post 1 has redis tag?', hasRedis === 1);

  // Set Intersections (Common tags)
  const commonTags = await redis.sinter(tagsPost1, tagsPost2);
  console.log('Common tags:', commonTags); // [ 'redis' ]
  
  // Cardinality (Count)
  const tagCount = await redis.scard(tagsPost1);
  console.log('Total tags for Post 1:', tagCount); // 3

  redis.quit();
}
setOperations();`,
        commonMistakes: [
          'Using SMEMBERS on very large sets in production, which can cause severe blocking. Use SSCAN instead.',
          'Trying to maintain order in a Set. Sets are intrinsically unordered.'
        ],
        bestPractices: [
          'Use sets for implementing real-time tracking of unique metrics (e.g., unique visitors today).',
          'Leverage SINTERSTORE, SUNIONSTORE, and SDIFFSTORE to save the results of set operations directly to a new key.'
        ],
        interviewQuestion: 'How would you use Redis Sets to find the mutual friends between two users?',
        practiceQuestion: 'What is the time complexity of checking if an item exists in a Redis Set?'
      }
    ]
  },
  {
    id: 'sorted-sets',
    slug: 'sorted-sets',
    technology: 'redis',
    title: 'Sorted Sets',
    category: 'Redis',
    description: 'Master Sorted Sets for leaderboards, priority queues, and time-series data.',
    section: '15. Redis',
    level: 7,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Ranked Data with Sorted Sets'],
    references,
    sections: [
      {
        heading: 'Ranked Data with Sorted Sets',
        explanation: [
          'Sorted Sets are one of Redis\'s most powerful and advanced data structures. Like regular Sets, they are collections of unique, non-repeating strings. However, every element in a Sorted Set is associated with a floating-point value called a "score." Redis uses this score to automatically and continuously keep the elements ordered from the smallest score to the largest score.',
          'Internally, Sorted Sets are implemented using a dual data structure: a hash table mapping elements to scores (for O(1) lookups), and a skip list that maintains the ordered elements (for O(log N) inserts, deletions, and range queries). This makes operations like finding the rank of an item, retrieving the top 10 items, or fetching elements within a specific score range incredibly fast and efficient.',
          'Sorted Sets are uniquely suited for several common application features. They are the standard way to build real-time leaderboards (ZADD, ZREVRANGE). By using a timestamp as the score, they can be used to build priority queues, rate limiters, or simple time-series data storage (ZRANGEBYSCORE). The ZINCRBY command allows you to atomically update an element\'s score, and the ranking adjusts automatically.'
        ],
        whyItMatters: 'Sorted Sets solve complex ranking and ordering problems natively in the database, avoiding expensive sorting operations in the application layer or SQL database.',
        realWorldExample: 'A multiplayer online game uses a Redis Sorted Set for its global leaderboard. Player IDs are the members, and their scores are the sorted set scores. The game can fetch the top 100 players in milliseconds, and atomically update scores as matches end.',
        code: `import Redis from 'ioredis';
const redis = new Redis();

async function leaderboard() {
  const lbKey = 'leaderboard:global';

  // Add players with scores
  await redis.zadd(lbKey, 1500, 'player_alice');
  await redis.zadd(lbKey, 2100, 'player_bob');
  await redis.zadd(lbKey, 1850, 'player_charlie');

  // Update a score
  await redis.zincrby(lbKey, 50, 'player_alice'); // Alice is now 1550

  // Get Top 3 players (descending order)
  const topPlayers = await redis.zrevrange(lbKey, 0, 2, 'WITHSCORES');
  console.log('Top Players:', topPlayers); 
  // [ 'player_bob', '2100', 'player_charlie', '1850', 'player_alice', '1550' ]

  // Get rank of a specific player (0-indexed)
  const rank = await redis.zrevrank(lbKey, 'player_alice');
  console.log('Alice rank:', rank + 1); // Rank 3

  redis.quit();
}
leaderboard();`,
        commonMistakes: [
          'Using large integer values for scores that exceed the precision of IEEE 754 double-precision floats, leading to rounding errors.',
          'Forgetting that members must be unique; adding a member again updates its score rather than creating a duplicate entry.'
        ],
        bestPractices: [
          'Use timestamps as scores to create time-based indexes or expiration queues.',
          'Use ZREMRANGEBYRANK or ZREMRANGEBYSCORE to periodically prune old or low-ranked data and keep the sorted set size manageable.'
        ],
        interviewQuestion: 'How would you implement a rate limiter based on a sliding time window using Redis Sorted Sets?',
        practiceQuestion: 'What internal data structure does Redis use to keep Sorted Sets ordered efficiently?'
      }
    ]
  },
  {
    id: 'hashes',
    slug: 'hashes',
    technology: 'redis',
    title: 'Hashes',
    category: 'Redis',
    description: 'Use Redis Hashes to efficiently store objects and mappings of fields to values.',
    section: '15. Redis',
    level: 8,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Object Storage with Hashes'],
    references,
    sections: [
      {
        heading: 'Object Storage with Hashes',
        explanation: [
          'Redis Hashes are maps between string fields and string values, making them the perfect data type for representing objects. For example, a user object with a name, email, and age can be stored directly as a single Redis Hash. This structure closely mirrors a JSON object or a row in a relational database table.',
          'One of the main advantages of using Hashes over storing serialized JSON strings is the ability to read or update individual fields without fetching the entire object. Commands like HSET, HGET, and HDEL operate on specific fields within the hash. This is highly efficient for large objects where you frequently update only a subset of properties (like incrementing a user\'s login count via HINCRBY) while keeping the rest of the object untouched.',
          'Redis is highly optimized for storing small hashes. When a hash contains a small number of fields (configurable via hash-max-ziplist-entries), Redis uses a highly memory-efficient internal encoding (ziplist or listpack). Storing 100,000 users as separate Hashes often uses significantly less memory than storing 100,000 serialized JSON strings, making Hashes an excellent choice for massive datasets.'
        ],
        whyItMatters: 'Hashes provide a memory-efficient and structurally logical way to store and manipulate flat objects, reducing network overhead for partial updates.',
        realWorldExample: 'A user profile service caches user data in Redis Hashes. When a user updates their display name, the backend issues an HSET command to update just that field, rather than downloading the entire profile, modifying it, and saving a massive JSON payload back to the cache.',
        code: `import Redis from 'ioredis';
const redis = new Redis();

async function hashOperations() {
  const userKey = 'user:1001';

  // Set multiple fields
  await redis.hmset(userKey, {
    username: 'johndoe',
    email: 'john@example.com',
    logins: 5
  });

  // Get specific field
  const email = await redis.hget(userKey, 'email');
  console.log('Email:', email);

  // Increment a numeric field
  await redis.hincrby(userKey, 'logins', 1);

  // Get all fields and values
  const profile = await redis.hgetall(userKey);
  console.log('Profile:', profile);
  // { username: 'johndoe', email: 'john@example.com', logins: '6' }

  redis.quit();
}
hashOperations();`,
        commonMistakes: [
          'Attempting to store deeply nested objects in a Redis Hash. Hashes are flat; nested data must be serialized (e.g., as JSON) within a field.',
          'Using HGETALL on hashes containing hundreds or thousands of large fields, potentially blocking the event loop.'
        ],
        bestPractices: [
          'Use Hashes to group related data to avoid polluting the global key space with too many top-level keys.',
          'For nested JSON data, consider using Redis Stack (RedisJSON) instead of basic Hashes.'
        ],
        interviewQuestion: 'When would you choose to store an object as a Redis Hash versus a serialized JSON string?',
        practiceQuestion: 'How can you atomically increment a specific counter within a user object stored in Redis?'
      }
    ]
  },
  {
    id: 'ttl-and-expiration',
    slug: 'ttl-and-expiration',
    technology: 'redis',
    title: 'TTL & Expiration',
    category: 'Redis',
    description: 'Learn how to manage data lifecycle using Time To Live (TTL) and expiration semantics.',
    section: '15. Redis',
    level: 9,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Managing Data Lifecycle'],
    references,
    sections: [
      {
        heading: 'Managing Data Lifecycle',
        explanation: [
          'Redis allows you to set a timeout on a key, referred to as its Time To Live (TTL). Once the TTL expires, the key is automatically deleted. This feature is fundamental for using Redis as a cache, managing session timeouts, and storing ephemeral data like One-Time Passwords (OTPs) or temporary locks. Commands like EXPIRE set the timeout in seconds, while PEXPIRE uses milliseconds.',
          'The TTL of a key can be checked using the TTL or PTTL commands, which return the remaining time before deletion. If you need to remove the expiration and make the key permanent, the PERSIST command is used. It is important to note that most commands that modify a key\'s value (like SET or GETSET) will clear its TTL unless specific arguments (like SET ... KEEPTTL) are provided, whereas commands that modify data structures (like HSET or LPUSH) preserve the key\'s TTL.',
          'Redis handles expiration internally using two strategies: passive and active deletion. Passive deletion occurs when a client attempts to access an expired key; Redis notices it is expired and deletes it on the spot. Active deletion is a background process that periodically samples keys with an associated TTL and evicts those that have expired. This dual approach ensures expired keys don\'t consume memory indefinitely, even if they are never accessed again.'
        ],
        whyItMatters: 'TTL ensures that stale data is automatically purged, preventing memory leaks in caching layers and enforcing security constraints like expiring sessions.',
        realWorldExample: 'An SMS verification service stores OTPs in Redis using the SET command with an EX (expire) argument of 300 seconds (5 minutes). This automatically invalidates the code without requiring any cleanup cron jobs in the backend.',
        code: `import Redis from 'ioredis';
const redis = new Redis();

async function ttlOperations() {
  const tokenKey = 'auth:token:abcxyz';

  // Set with Expiry (10 seconds)
  await redis.set(tokenKey, 'valid_token', 'EX', 10);

  // Check TTL
  const ttl = await redis.ttl(tokenKey);
  console.log(\`Token expires in \${ttl} seconds\`);

  // Update expiry to 1 hour (3600 seconds)
  await redis.expire(tokenKey, 3600);

  // Make permanent
  await redis.persist(tokenKey);
  const newTtl = await redis.ttl(tokenKey);
  console.log(\`New TTL (-1 means persistent): \${newTtl}\`);

  redis.quit();
}
ttlOperations();`,
        commonMistakes: [
          'Assuming that updating a string value via SET preserves its TTL. By default, SET clears the TTL.',
          'Relying on Redis TTL for millisecond-precise timing events. Expiry execution can have slight delays.'
        ],
        bestPractices: [
          'Use the `KEEPTTL` option with the `SET` command if you want to update a value without resetting its expiration.',
          'Add jitter (randomization) to cache TTLs to prevent cache stampedes where many keys expire at the exact same millisecond.'
        ],
        interviewQuestion: 'Explain the difference between passive and active expiration in Redis.',
        practiceQuestion: 'What does the TTL command return if a key exists but has no expiration set?'
      }
    ]
  },
  {
    id: 'cache-patterns',
    slug: 'cache-patterns',
    technology: 'redis',
    title: 'Cache Patterns',
    category: 'Redis',
    description: 'Explore various caching strategies and patterns for building scalable applications.',
    section: '15. Redis',
    level: 10,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Common Caching Strategies'],
    references,
    sections: [
      {
        heading: 'Common Caching Strategies',
        explanation: [
          'Caching is a technique used to store copies of frequently accessed data in a fast, temporary storage location (like Redis) to reduce the load on the primary database and improve response times. However, integrating a cache introduces complexity regarding data consistency. Several established caching patterns dictate how the application interacts with the cache and the database, each with different trade-offs.',
          'The Cache-Aside (or Lazy Loading) pattern is the most common. In this pattern, the application is responsible for reading from the cache, and if there\'s a "miss," it reads from the database and updates the cache. Other patterns include Write-Through (data is written to the cache and the database simultaneously) and Write-Behind (data is written to the cache, and asynchronously synced to the database later).',
          'Implementing caching requires handling specific edge cases. A "Cache Stampede" (or thundering herd) occurs when a heavily requested cached item expires, causing multiple concurrent requests to simultaneously hit the database to fetch the data and update the cache. This can overwhelm the database. Mitigation strategies include implementing application-level locks (so only one request fetches the data) or returning slightly stale data while updating the cache asynchronously.'
        ],
        whyItMatters: 'Choosing the right caching pattern dictates the performance, resilience, and data consistency of a distributed system.',
        realWorldExample: 'A high-traffic blog uses the Cache-Aside pattern. When an article is requested, it tries Redis first. If the cache expires, a mutex lock is used to ensure only the first user\'s request queries the SQL database to repopulate the cache, preventing a thundering herd on popular articles.',
        code: `// Conceptual example of mitigating a cache stampede
import Redis from 'ioredis';
const redis = new Redis();

async function getArticleData(id) {
  const cacheKey = \`article:\${id}\`;
  const lockKey = \`lock:article:\${id}\`;

  // 1. Try Cache
  let data = await redis.get(cacheKey);
  if (data) return JSON.parse(data);

  // 2. Cache Miss - Try to acquire lock
  const lockAcquired = await redis.set(lockKey, 'locked', 'NX', 'EX', 5);
  
  if (lockAcquired) {
    try {
      // 3. We got the lock! Fetch from slow DB
      console.log('Fetching from database...');
      data = await fetchFromDatabase(id); 
      // 4. Update cache with data and TTL
      await redis.set(cacheKey, JSON.stringify(data), 'EX', 3600);
      return data;
    } finally {
      // 5. Release lock
      await redis.del(lockKey);
    }
  } else {
    // 6. Someone else is fetching, wait and retry (simplified)
    await new Promise(resolve => setTimeout(resolve, 50));
    return getArticleData(id);
  }
}
async function fetchFromDatabase(id) { return { title: 'Hello World' }; }`,
        commonMistakes: [
          'Implementing caching without an expiration strategy (TTL), leading to permanently stale data.',
          'Caching overly granular data, resulting in too many network calls to reconstruct an object.'
        ],
        bestPractices: [
          'Identify read-heavy, slow-changing data as the prime candidates for caching.',
          'Always plan for cache failure; your application should gracefully degrade and query the primary database if Redis is down.'
        ],
        interviewQuestion: 'What is a cache stampede, and how can you prevent it when using Redis?',
        practiceQuestion: 'Compare the Cache-Aside pattern with the Write-Through pattern.'
      }
    ]
  },
  {
    id: 'cache-aside-pattern',
    slug: 'cache-aside-pattern',
    technology: 'redis',
    title: 'Cache-Aside Pattern',
    category: 'Redis',
    description: 'Detailed implementation and invalidation strategies for the Cache-Aside pattern.',
    section: '15. Redis',
    level: 11,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Implementing Cache-Aside'],
    references,
    sections: [
      {
        heading: 'Implementing Cache-Aside',
        explanation: [
          'The Cache-Aside pattern places the application in charge of managing the flow of data between the cache (Redis) and the primary system of record (e.g., PostgreSQL). When the application needs data, it first queries Redis. If the data is found (a cache hit), it is returned immediately. If not found (a cache miss), the application queries the database, writes the result to Redis, and then returns the data. This "lazy loading" ensures that only requested data is cached.',
          'While reading is straightforward, updating data introduces the challenge of cache invalidation. When data in the primary database is modified, the cached version becomes stale. The standard approach in Cache-Aside is to invalidate (delete) the cache entry whenever the underlying data changes, rather than attempting to update the cache directly. The next read request will experience a cache miss and fetch the fresh data.',
          'Cache-Aside is resilient. If the Redis server goes down, the application can bypass it and communicate directly with the database (though performance will suffer). However, consistency is eventual, not strong. There is a small window of time between the database update and the cache invalidation where a concurrent read might fetch stale data from the cache.'
        ],
        whyItMatters: 'Cache-Aside is the industry standard caching pattern because of its simplicity, resilience, and efficiency in memory usage.',
        realWorldExample: 'An API for user profiles uses Cache-Aside. A GET `/users/123` request checks Redis, then MySQL. A PUT `/users/123` updates MySQL, and then issues a `DEL user:123` command to Redis. The next GET request pulls the fresh data.',
        code: `import Redis from 'ioredis';
const redis = new Redis();

class UserRepository {
  // Read operation - Cache Aside logic
  async getUser(userId) {
    const cacheKey = \`user:\${userId}\`;
    
    // 1. Try Cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached); // Cache Hit
    }

    // 2. Cache Miss - Fetch from DB
    const user = await this.dbSelectUser(userId);
    
    if (user) {
      // 3. Populate Cache with TTL
      await redis.set(cacheKey, JSON.stringify(user), 'EX', 600); // 10 min
    }
    
    return user;
  }

  // Update operation - Cache Invalidation
  async updateUser(userId, data) {
    // 1. Update Database First
    await this.dbUpdateUser(userId, data);
    
    // 2. Invalidate (Delete) Cache
    const cacheKey = \`user:\${userId}\`;
    await redis.del(cacheKey);
  }

  async dbSelectUser(id) { return { id, name: 'Alice' }; }
  async dbUpdateUser(id, data) { return true; }
}`,
        commonMistakes: [
          'Updating the cache directly on write instead of invalidating it. This can lead to complex race conditions and inconsistent data.',
          'Deleting the cache *before* updating the database. If the DB update fails, the cache miss will reload the old data, missing the failure.'
        ],
        bestPractices: [
          'Always use a TTL for cached data as a fallback mechanism to eventually correct any consistency issues caused by failed invalidations.',
          'Update the database first, then delete the cache.'
        ],
        interviewQuestion: 'Why is it generally better to delete a cache key on update rather than trying to overwrite it with the new data?',
        practiceQuestion: 'What happens in a Cache-Aside system if the Redis instance crashes?'
      }
    ]
  },
  {
    id: 'sessions-with-redis',
    slug: 'sessions-with-redis',
    technology: 'redis',
    title: 'Sessions with Redis',
    category: 'Redis',
    description: 'Use Redis as a robust, scalable backend for managing user sessions in web applications.',
    section: '15. Redis',
    level: 12,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Managing Sessions'],
    references,
    sections: [
      {
        heading: 'Managing Sessions',
        explanation: [
          'In stateless protocols like HTTP, managing user sessions requires storing session state on the server. Traditionally, this is done in memory or in a relational database. However, storing sessions in application memory prevents horizontal scaling (users get tied to a specific server), and relational databases can be too slow for the high volume of reads and writes that sessions generate. Redis is the perfect middle ground: it provides the speed of in-memory storage while being accessible to all application servers.',
          'A typical session flow involves generating a unique session ID (stored in a user cookie), which serves as the key in Redis. The value is a serialized object containing user data (like user ID, roles, and preferences). Because Redis Strings support TTLs natively, expiring sessions becomes trivial. You simply set the Redis key to expire at the same time the session is supposed to time out.',
          'In the Node.js ecosystem, using Redis for sessions is streamlined by libraries like `express-session` combined with `connect-redis`. These libraries handle the serialization, reading, writing, and TTL extension of session data automatically, allowing developers to interact with the standard `req.session` object without manually writing Redis commands.'
        ],
        whyItMatters: 'Using Redis for sessions allows your backend to be stateless, enabling horizontal scaling across multiple servers without sticky sessions.',
        realWorldExample: 'A load-balanced Node.js backend runs on 5 servers. User A logs in and hits Server 1, creating a session in Redis. On their next request, they hit Server 3. Server 3 retrieves their session from the centralized Redis cluster, keeping them logged in seamlessly.',
        code: `import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';

const app = express();

// Initialize client
const redisClient = new Redis();

// Initialize store
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'webapp:sess:',
});

app.use(
  session({
    store: redisStore,
    secret: 'my-super-secret-key', // Used to sign the cookie
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, // Set to true in prod with HTTPS
      maxAge: 1000 * 60 * 60 * 24 // 24 hours
    },
  })
);

app.get('/login', (req, res) => {
  // Setting data saves it to Redis automatically
  req.session.userId = 12345;
  req.session.role = 'admin';
  res.send('Logged in');
});

app.get('/profile', (req, res) => {
  // Reading data fetches it from Redis
  if (req.session.userId) {
    res.send(\`Welcome user \${req.session.userId}\`);
  } else {
    res.send('Please login');
  }
});`,
        commonMistakes: [
          'Storing large amounts of data in the session payload. Keep it minimal (user ID, roles) and fetch details from the DB.',
          'Not setting a TTL or expiration on sessions, eventually running the Redis server out of memory.'
        ],
        bestPractices: [
          'Use a specific key prefix (e.g., `session:`) to separate session keys from other cached data.',
          'Ensure secure cookie flags (Secure, HttpOnly, SameSite) are configured correctly to protect session IDs.'
        ],
        interviewQuestion: 'Why is Redis preferred over a SQL database or in-memory storage (like memory-cache) for managing sessions in a microservices architecture?',
        practiceQuestion: 'How does Redis automatically clean up old, inactive sessions?'
      }
    ]
  },
  {
    id: 'rate-limiting-with-redis',
    slug: 'rate-limiting-with-redis',
    technology: 'redis',
    title: 'Rate Limiting with Redis',
    category: 'Redis',
    description: 'Implement distributed rate limiting algorithms to protect APIs using Redis.',
    section: '15. Redis',
    level: 13,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Building Rate Limiters'],
    references,
    sections: [
      {
        heading: 'Building Rate Limiters',
        explanation: [
          'Rate limiting is essential for protecting APIs from abuse, preventing DoS attacks, and enforcing usage tiers. Implementing this in a distributed system requires a centralized store to track request counts across all servers. Redis is ideal for this due to its speed and atomic operations. The simplest approach is the Fixed Window algorithm, which counts requests within a discrete time block (e.g., requests per minute).',
          'A basic Fixed Window rate limiter uses the Redis INCR command combined with EXPIRE. The key is typically a combination of the user\'s IP address or API key and the current time window (e.g., `rate:192.168.1.1:minute_23`). When a request comes in, the application increments the key. If the count exceeds the limit, the request is blocked. An expiration is set to ensure the counters clean themselves up automatically.',
          'While the Fixed Window is easy to implement, it suffers from boundary conditions (bursts of traffic at the edge of the window). More advanced algorithms like Sliding Window or Token Bucket provide smoother limiting. These often require multiple Redis commands executed atomically. To ensure atomicity and avoid race conditions when checking and updating limits simultaneously, developers frequently use Redis Lua scripting or Multi/Exec transactions.'
        ],
        whyItMatters: 'Rate limiting protects your infrastructure from being overwhelmed. Using Redis ensures the limits are enforced accurately across multiple load-balanced servers.',
        realWorldExample: 'A public weather API uses Redis to limit free tier users to 60 requests per minute. They use Lua scripting to atomically check the current count, increment it, and set the TTL, ensuring that even parallel concurrent requests are counted accurately.',
        code: `import Redis from 'ioredis';
const redis = new Redis();

// Simple Fixed Window Rate Limiter using MULTI/EXEC
async function checkRateLimit(ipAddress, maxRequests = 10, windowSeconds = 60) {
  const currentMinute = Math.floor(Date.now() / 1000 / windowSeconds);
  const key = \`ratelimit:\${ipAddress}:\${currentMinute}\`;

  // We use a pipeline/multi to ensure we get the count AND set expiry efficiently
  const multi = redis.multi();
  multi.incr(key);
  multi.expire(key, windowSeconds * 2); // Expiry slightly longer than window
  
  const results = await multi.exec();
  const requestCount = results[0][1];

  if (requestCount > maxRequests) {
    return { allowed: false, count: requestCount };
  }
  return { allowed: true, count: requestCount };
}

async function testLimiter() {
  const ip = '203.0.113.5';
  for (let i = 1; i <= 12; i++) {
    const result = await checkRateLimit(ip, 10, 60);
    console.log(\`Request \${i}: Allowed? \${result.allowed}\`);
  }
  redis.quit();
}
testLimiter();`,
        commonMistakes: [
          'Performing non-atomic check-then-act operations (GET followed by INCR), allowing race conditions to bypass the limit.',
          'Not setting an expiration on rate limit keys, resulting in unbounded memory growth.'
        ],
        bestPractices: [
          'Use Lua scripts for more complex algorithms (like Token Bucket) to ensure atomicity and reduce network round-trips.',
          'Include rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining) in your HTTP responses.'
        ],
        interviewQuestion: 'Explain the flaw in a Fixed Window rate limiter and how a Sliding Window approach solves it.',
        practiceQuestion: 'Why is it important to use atomic operations when implementing a rate limiter?'
      }
    ]
  },
  {
    id: 'distributed-locks',
    slug: 'distributed-locks',
    technology: 'redis',
    title: 'Distributed Locks',
    category: 'Redis',
    description: 'Implement distributed mutex locks to synchronize operations across multiple workers.',
    section: '15. Redis',
    level: 14,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Synchronizing with Locks'],
    references,
    sections: [
      {
        heading: 'Synchronizing with Locks',
        explanation: [
          'In distributed systems, multiple worker nodes might attempt to process the same task or modify the same resource simultaneously. To prevent race conditions and ensure only one node performs the action, a distributed lock is required. Redis is widely used for this purpose. The foundation of a Redis lock is the SET command with the NX (Not eXists) option. This guarantees that only the first client to attempt setting the lock key will succeed.',
          'A critical component of a distributed lock is the expiration (TTL). If a worker acquires a lock and then crashes before releasing it, the lock would be held forever, causing a deadlock. To prevent this, locks must be set with an automatic expiration using the EX or PX options. The client sets the lock atomically using a command like `SET resource_name my_random_value NX PX 30000`.',
          'Releasing the lock must also be handled carefully. A client should only release a lock it actually holds. If process A takes too long and its lock expires, process B might acquire it. If process A then finishes and blindly deletes the lock key, it will accidentally delete process B\'s lock. To solve this, the value stored in the lock key must be a unique identifier (like a UUID) generated by the client. The client uses a Lua script to atomically check if the value matches its identifier before deleting the key.'
        ],
        whyItMatters: 'Distributed locks are essential for coordinating background jobs, cron tasks, and ensuring data consistency when interacting with external APIs or shared resources.',
        realWorldExample: 'A billing system needs to process monthly invoices. Multiple cron instances trigger simultaneously. They all attempt to acquire a Redis lock named `lock:invoice_processing`. Only one instance succeeds and processes the invoices, while the others gracefully exit.',
        code: `import Redis from 'ioredis';
import { randomUUID } from 'crypto';
const redis = new Redis();

async function acquireLock(lockKey, identifier, ttlSeconds) {
  // SET NX guarantees atomic "set if not exists"
  // EX adds the timeout to prevent deadlocks
  const result = await redis.set(lockKey, identifier, 'NX', 'EX', ttlSeconds);
  return result === 'OK';
}

async function releaseLock(lockKey, identifier) {
  // Lua script to ensure we only delete the lock if we own it
  const luaScript = \`
    if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
    else
        return 0
    end
  \`;
  const result = await redis.eval(luaScript, 1, lockKey, identifier);
  return result === 1;
}

async function doWork() {
  const resource = 'lock:process-payments';
  const myId = randomUUID();
  
  if (await acquireLock(resource, myId, 30)) {
    console.log('Lock acquired! Processing...');
    try {
      // Do critical work here
      await new Promise(res => setTimeout(res, 2000));
    } finally {
      const released = await releaseLock(resource, myId);
      console.log('Lock released?', released);
    }
  } else {
    console.log('Could not acquire lock, resource busy.');
  }
  redis.quit();
}
doWork();`,
        commonMistakes: [
          'Using separate SETNX and EXPIRE commands. The client could crash between the two, leaving a lock without an expiration (deadlock).',
          'Blindly deleting the lock key without verifying ownership, potentially deleting a lock acquired by a different process.'
        ],
        bestPractices: [
          'Use established libraries (like Redlock) if you require high availability across multiple Redis master nodes.',
          'Always use a `finally` block in your code to ensure the lock is released even if the critical section throws an error.'
        ],
        interviewQuestion: 'Explain the purpose of storing a unique identifier (like a UUID) as the lock value instead of a simple boolean.',
        practiceQuestion: 'What is the Redlock algorithm and what problem does it solve compared to a single-node Redis lock?'
      }
    ]
  },
  {
    id: 'pub-sub',
    slug: 'pub-sub',
    technology: 'redis',
    title: 'Pub/Sub',
    category: 'Redis',
    description: 'Use Redis Publish/Subscribe for real-time messaging and event broadcasting.',
    section: '15. Redis',
    level: 15,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Real-time Messaging'],
    references,
    sections: [
      {
        heading: 'Real-time Messaging',
        explanation: [
          'Redis provides a Publish/Subscribe (Pub/Sub) messaging paradigm. It allows publishers to send messages to named "channels" without knowing who (if anyone) is listening. Conversely, subscribers listen to one or more channels and receive messages as they are published. This decouples the senders and receivers, making it an excellent pattern for building real-time event-driven architectures and chat applications.',
          'The core commands are straightforward: PUBLISH sends a message to a channel, and SUBSCRIBE listens to a channel. Redis also supports pattern matching using PSUBSCRIBE. For example, subscribing to `news.*` will receive messages published to `news.sports` and `news.tech`. When a client issues a subscribe command, its connection is put into "subscriber mode" and it can generally no longer execute normal commands (like GET or SET) on that connection.',
          'A critical limitation of Redis Pub/Sub is its "fire-and-forget" nature. Messages are not stored. If a subscriber is offline or temporarily disconnected when a message is published, it will miss that message forever. There is no queueing, persistence, or acknowledgment mechanism. For use cases requiring guaranteed delivery, Redis Streams or Lists are more appropriate data structures.'
        ],
        whyItMatters: 'Pub/Sub is incredibly fast and lightweight, perfect for broadcasting transient real-time events across multiple application instances.',
        realWorldExample: 'A live sports website uses Redis Pub/Sub. When a goal is scored, the backend PUBLISHes the score update to the `match:123` channel. Multiple websocket servers SUBSCRIBE to this channel and immediately forward the update to thousands of connected web browsers.',
        code: `// Note: Requires two separate terminal windows/scripts to test properly
import Redis from 'ioredis';

async function pubSubDemo() {
  // You need separate connections for publishing and subscribing
  const subscriber = new Redis();
  const publisher = new Redis();

  // 1. Subscribe to a channel
  subscriber.subscribe('notifications', (err, count) => {
    if (err) console.error(err);
    console.log(\`Subscribed to \${count} channel(s).\`);
  });

  // 2. Listen for messages
  subscriber.on('message', (channel, message) => {
    console.log(\`Received message from \${channel}: \${message}\`);
  });

  // 3. Publish a message (usually happens elsewhere)
  setTimeout(() => {
    publisher.publish('notifications', 'Hello, World!');
  }, 1000);

  // Cleanup for demo purposes
  setTimeout(() => {
    subscriber.quit();
    publisher.quit();
  }, 2000);
}
pubSubDemo();`,
        commonMistakes: [
          'Assuming Pub/Sub messages are persistent and can be processed later. They are ephemeral.',
          'Trying to use a single Redis connection to both subscribe to channels and execute standard commands like SET/GET.'
        ],
        bestPractices: [
          'Use separate Redis client instances/connections in your application: one dedicated to subscribing, and another for publishing and general commands.',
          'Use Redis Streams instead of Pub/Sub if you need message history or guaranteed delivery.'
        ],
        interviewQuestion: 'What happens to a message published to a Redis Pub/Sub channel if there are currently no active subscribers?',
        practiceQuestion: 'How does PSUBSCRIBE differ from SUBSCRIBE?'
      }
    ]
  },
  {
    id: 'streams',
    slug: 'streams',
    technology: 'redis',
    title: 'Streams',
    category: 'Redis',
    description: 'Master Redis Streams for persistent, append-only event logging and message brokering.',
    section: '15. Redis',
    level: 16,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Persistent Message Brokering'],
    references,
    sections: [
      {
        heading: 'Persistent Message Brokering',
        explanation: [
          'Introduced in Redis 5.0, Streams act as an append-only log data structure, designed specifically for event sourcing and messaging. Unlike Pub/Sub, Streams are persistent. Messages (entries) appended to a stream remain there until explicitly deleted or truncated via a length limit. This makes Streams ideal for scenarios where consumers might be offline, processing is slow, or you need to retain a history of events.',
          'Adding data is done via XADD, which automatically generates a unique, time-based ID for each entry. Reading can be done via XRANGE (for historical data) or XREAD (to listen for new data). XREAD can block, waiting for new entries to arrive, similar to BLPOP on a list. This allows consumers to process events reliably as they occur without aggressive polling.',
          'The most powerful feature of Streams is Consumer Groups. Using XREADGROUP, you can scale processing across multiple worker processes. A consumer group tracks the last message delivered to it and ensures that each message in the stream is delivered to only one consumer within that group. Furthermore, consumers must explicitly acknowledge (XACK) when they have successfully processed a message. If a consumer crashes before acknowledging, other consumers can inspect and claim pending messages, ensuring guaranteed, exactly-once (or at-least-once) processing semantics.'
        ],
        whyItMatters: 'Streams provide a robust, Kafka-like message broker built directly into Redis, offering persistence, consumer tracking, and delivery guarantees that Pub/Sub and Lists lack.',
        realWorldExample: 'An order processing system uses Redis Streams. The web server uses XADD to append "order_created" events. A pool of worker microservices acts as a Consumer Group, ensuring every order is processed exactly once, even if a worker crashes mid-processing.',
        code: `import Redis from 'ioredis';
const redis = new Redis();

async function streamsDemo() {
  const streamKey = 'mystream';
  
  // 1. Producer: Add an event to the stream
  // '*' tells Redis to auto-generate the ID
  const id = await redis.xadd(streamKey, '*', 'sensor', 'temp', 'value', '22.5');
  console.log('Added entry with ID:', id);

  // 2. Consumer: Read the latest events (blocking for up to 2 seconds)
  // '$' means "give me only new messages that arrive after I started listening"
  console.log('Waiting for new messages...');
  const result = await redis.xread('BLOCK', 2000, 'STREAMS', streamKey, '$');
  
  if (result) {
    const messages = result[0][1];
    messages.forEach(msg => {
      const [msgId, fields] = msg;
      console.log(\`Processed \${msgId}: \`, fields);
    });
  } else {
    console.log('No new messages arrived.');
  }

  redis.quit();
}
streamsDemo();`,
        commonMistakes: [
          'Forgetting to acknowledge messages (XACK) when using consumer groups, leading to a massive buildup of pending messages and memory bloat.',
          'Not capping the stream length using MAXLEN, causing the stream to consume all available server memory over time.'
        ],
        bestPractices: [
          'Always use XADD with the MAXLEN argument (e.g., `XADD mystream MAXLEN ~ 1000 ...`) to automatically trim old entries and prevent OOM issues.',
          'Implement a mechanism to regularly inspect the Pending Entries List (PEL) and claim messages from dead consumers using XAUTOCLAIM.'
        ],
        interviewQuestion: 'Compare Redis Streams with Redis Pub/Sub and outline when you would choose one over the other.',
        practiceQuestion: 'What role does XACK play in Redis Streams Consumer Groups?'
      }
    ]
  },
  {
    id: 'queues',
    slug: 'queues',
    technology: 'redis',
    title: 'Queues',
    category: 'Redis',
    description: 'Implement reliable task queues and background job processing using Redis primitives.',
    section: '15. Redis',
    level: 17,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Building Reliable Task Queues'],
    references,
    sections: [
      {
        heading: 'Building Reliable Task Queues',
        explanation: [
          'Background job processing is a common requirement for tasks that are too slow to execute synchronously within an HTTP request, such as sending emails or generating PDFs. Redis Lists are the traditional primitive used to build these queues. Producers push tasks onto the list (RPUSH), and consumers pop them off (BLPOP). BLPOP is crucial as it blocks the connection, waiting for data rather than spinning in a CPU-intensive polling loop.',
          'While a basic List queue is simple, it is not inherently reliable. If a consumer pops a task (LPOP) and then crashes before completing it, the task is lost forever. To build a reliable queue, the "Reliable Queue Pattern" uses the RPOPLPUSH (or the newer LMOVE) command. This command atomically pops an item from the main queue and pushes it onto a "processing" queue. If the worker crashes, the task remains safely in the processing queue.',
          'A robust queue system must also handle failures. When a worker completes a task, it explicitly removes it from the processing queue. A separate background process monitors the processing queue for tasks that have been sitting there too long (indicating a crashed worker) and moves them back to the main queue for retry, or moves them to a "Dead Letter Queue" (DLQ) if they fail repeatedly. Modern libraries like BullMQ implement these patterns on top of Redis automatically.'
        ],
        whyItMatters: 'Proper queue implementation ensures that background tasks are processed reliably and are not lost during application crashes or deployments.',
        realWorldExample: 'An application sends a welcome email upon registration. The web server pushes the user ID to a Redis List. A separate worker process uses BLPOP to grab the ID, formats the email, and sends it via an external API without slowing down the user\'s registration flow.',
        code: `import Redis from 'ioredis';
const redis = new Redis();

async function reliableQueueDemo() {
  const mainQueue = 'queue:jobs';
  const processingQueue = 'queue:processing';

  // Producer adds a job
  await redis.rpush(mainQueue, 'job_data_123');

  // Consumer takes a job securely
  // Atomically moves from main to processing queue and waits if empty
  const job = await redis.brpoplpush(mainQueue, processingQueue, 5);
  
  if (job) {
    try {
      console.log('Processing job:', job);
      // Simulate work
      await new Promise(r => setTimeout(r, 1000));
      
      // Success! Remove from processing queue
      await redis.lrem(processingQueue, 1, job);
      console.log('Job completed and cleared');
    } catch (err) {
      console.error('Job failed', err);
      // Logic to retry or move to dead letter queue would go here
    }
  }

  redis.quit();
}
reliableQueueDemo();`,
        commonMistakes: [
          'Using non-blocking LPOP/RPOP with a `setTimeout` loop to poll the queue, which wastes CPU and adds latency.',
          'Failing to implement a cleanup mechanism for tasks stuck in the processing queue when workers die unexpectedly.'
        ],
        bestPractices: [
          'For complex queuing needs in Node.js, use battle-tested abstractions like BullMQ instead of writing raw Redis queue logic.',
          'Always serialize task data (e.g., using JSON) before pushing it to the queue.'
        ],
        interviewQuestion: 'How does the BRPOPLPUSH command help prevent data loss in a queue system compared to a standard BRPOP?',
        practiceQuestion: 'What is a Dead Letter Queue (DLQ) and why is it necessary?'
      }
    ]
  },
  {
    id: 'redis-persistence',
    slug: 'redis-persistence',
    technology: 'redis',
    title: 'Redis Persistence',
    category: 'Redis',
    description: 'Understand RDB and AOF persistence mechanisms to ensure data durability.',
    section: '15. Redis',
    level: 18,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Ensuring Data Durability'],
    references,
    sections: [
      {
        heading: 'Ensuring Data Durability',
        explanation: [
          'While Redis operates in-memory, it offers persistence options to save data to disk, allowing it to survive server restarts or crashes. The first mechanism is RDB (Redis Database) snapshots. RDB creates a point-in-time compact binary representation of the entire dataset at specified intervals. Redis uses a `BGSAVE` command, which forks the main process so that a child process handles the disk I/O, ensuring the main thread remains unblocked and responsive to clients.',
          'The second mechanism is AOF (Append-Only File). Unlike snapshots, AOF logs every single write operation received by the server to a file. When Redis restarts, it replays this log to reconstruct the dataset. AOF provides much higher durability than RDB. You can configure Redis to `fsync` the log to disk every second, balancing performance with data safety (meaning at most one second of data could be lost). As the AOF file grows, Redis can automatically rewrite it in the background to keep the file size manageable.',
          'In production environments acting as a primary database, the recommended approach is a hybrid model. Redis can be configured to use both RDB and AOF simultaneously. Upon restart, Redis will prioritize the AOF file because it guarantees the most complete data set. This setup provides the fast restart times of RDB (via AOF preamble features) combined with the granular data safety of the AOF log.'
        ],
        whyItMatters: 'Persistence configuration dictates the balance between extreme performance and data safety. Misconfiguration can lead to catastrophic data loss on restart.',
        realWorldExample: 'A company uses Redis as their primary session store. They configure AOF with `appendfsync everysec`. When the server unexpectedly loses power, they lose at most one second of user logins, and the AOF file successfully restores all other active sessions upon reboot.',
        code: `# Common redis.conf persistence settings

# RDB Settings
# Save snapshot if 1 key changed in 3600 sec, 100 in 300 sec, etc.
save 3600 1
save 300 100
save 60 10000

# AOF Settings
appendonly yes
appendfilename "appendonly.aof"

# Fsync policies (choose one)
# appendfsync always   # Slowest, safest
appendfsync everysec   # Good compromise (default)
# appendfsync no       # Fastest, relies on OS buffer`,
        commonMistakes: [
          'Assuming Redis is purely ephemeral and not configuring persistence when using it as a primary datastore.',
          'Using `appendfsync always` in high-throughput environments, which bottlenecks Redis to the speed of the disk drive.'
        ],
        bestPractices: [
          'Ensure the server has enough memory to support the fork operation during a `BGSAVE`. The OS needs enough RAM to duplicate page tables.',
          'Regularly back up your RDB files to external storage (like S3) for disaster recovery.'
        ],
        interviewQuestion: 'Explain how the `BGSAVE` command works in Redis without blocking the main event loop.',
        practiceQuestion: 'What are the trade-offs between RDB and AOF persistence in terms of recovery speed and data loss?'
      }
    ]
  },
  {
    id: 'redis-replication',
    slug: 'redis-replication',
    technology: 'redis',
    title: 'Redis Replication',
    category: 'Redis',
    description: 'Scale read operations and improve fault tolerance using Master-Replica replication.',
    section: '15. Redis',
    level: 19,
    difficulty: 'advanced',
    progress: 0,
    toc: ['High Availability with Replication'],
    references,
    sections: [
      {
        heading: 'High Availability with Replication',
        explanation: [
          'Redis Replication allows you to create exact copies of a master Redis instance. These copies, known as replicas, stay synchronized with the master automatically. The primary purpose of replication is two-fold: data redundancy (fault tolerance) and scaling read throughput. You can configure multiple replicas, and even chain them (replicas of replicas) to distribute the synchronization load.',
          'Replication in Redis is asynchronous. When a client writes data to the master, the master acknowledges the write to the client immediately and then asynchronously sends the command to its replicas in the background. This means there is a slight replication lag. If the master crashes before transmitting the latest writes to the replica, and a failover occurs, a small amount of data may be lost. The `REPLICAOF` command (or configuration directive) is used to attach a replica to a master.',
          'When a replica connects to a master, it first attempts a partial resynchronization, grabbing only the commands it missed while disconnected using the master\'s replication backlog buffer. If the backlog is insufficient (e.g., a long disconnection), it falls back to a full resynchronization. The master performs a `BGSAVE` to create an RDB snapshot, sends it to the replica, and then streams the subsequent commands. This process can be resource-intensive for the master.'
        ],
        whyItMatters: 'Replication is the foundation for scaling Redis beyond a single server and is essential for setting up high-availability topologies like Redis Sentinel.',
        realWorldExample: 'A heavy read-traffic application has one Redis master node for writes (user updates, session creation) and three replica nodes. All `GET` requests are load-balanced across the three replicas, quadrupling the read capacity of the system.',
        code: `# Configuring replication in redis.conf

# On the Replica instance, instruct it to follow the Master
# Syntax: replicaof <masterip> <masterport>
replicaof 192.168.1.100 6379

# Replicas are read-only by default (highly recommended)
replica-read-only yes

# Authentication if master requires a password
masterauth "super_secret_password"

# Example CLI command to dynamically change replication
# 127.0.0.1:6380> REPLICAOF 192.168.1.100 6379
# To stop replicating and promote to master:
# 127.0.0.1:6380> REPLICAOF NO ONE`,
        commonMistakes: [
          'Allowing writes to replica nodes. By default, replicas are read-only, and changing this often leads to out-of-sync data since master nodes do not replicate from replicas.',
          'Deploying a master without persistence, crashing it, and having it restart empty. The replicas will quickly sync the "empty" state, wiping out all data.'
        ],
        bestPractices: [
          'Always enable persistence on the master node when using replication to avoid the "empty restart" data wipe scenario.',
          'Use Redis Sentinel in conjunction with replication to provide automatic failover if the master node goes down.'
        ],
        interviewQuestion: 'Is Redis replication synchronous or asynchronous? What are the implications for data consistency during a master crash?',
        practiceQuestion: 'Describe the process of a full synchronization when a new replica attaches to a master.'
      }
    ]
  },
  {
    id: 'redis-cluster',
    slug: 'redis-cluster',
    technology: 'redis',
    title: 'Redis Cluster',
    category: 'Redis',
    description: 'Scale Redis horizontally and manage automatic sharding with Redis Cluster.',
    section: '15. Redis',
    level: 20,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Horizontal Scaling with Cluster'],
    references,
    sections: [
      {
        heading: 'Horizontal Scaling with Cluster',
        explanation: [
          'When data volume or write throughput exceeds the capacity of a single server, horizontal scaling is required. Redis Cluster provides a way to automatically shard data across multiple master nodes. It eliminates the single point of failure and bottleneck of a traditional single-master setup. A cluster automatically partitions data and provides high availability through integrated replica nodes and failover mechanisms.',
          'Redis Cluster does not use consistent hashing. Instead, it uses the concept of Hash Slots. The entire key space is divided into 16,384 hash slots. When you set a key, Redis calculates the CRC16 of the key modulo 16384 to determine its slot. Every master node in the cluster is assigned a subset of these 16,384 slots. If you want to add a new node, you reshard the cluster by moving some hash slots (and their associated data) from existing nodes to the new node, without any downtime.',
          'Clients interacting with a Redis Cluster must be "cluster-aware." If a client sends a command to Node A, but the key belongs to a hash slot on Node B, Node A will not forward the request. Instead, it replies with a `MOVED` error, telling the client the correct IP and port of Node B. The client must then connect to Node B and reissue the command. Modern Redis client libraries handle these MOVED (and ASK, during resharding) redirections automatically and cache the cluster routing map for efficiency.'
        ],
        whyItMatters: 'Redis Cluster is the native solution for massive scale, allowing you to handle terabytes of data and millions of writes per second across a fleet of machines.',
        realWorldExample: 'A global analytics platform ingests thousands of events per second. They use a 6-node Redis Cluster (3 masters, 3 replicas). The load is distributed evenly across the masters via hash slots, ensuring no single machine is overwhelmed by the write throughput.',
        code: `// Connecting to a Redis Cluster using ioredis
import Redis from 'ioredis';

// Pass an array of startup nodes. The client will connect to one
// and use the CLUSTER NODES command to discover the full topology.
const cluster = new Redis.Cluster([
  { host: '127.0.0.1', port: 7000 },
  { host: '127.0.0.1', port: 7001 },
  { host: '127.0.0.1', port: 7002 }
]);

async function clusterOps() {
  // The client automatically routes the command to the correct node
  // based on the hash slot of the key 'user:999'
  await cluster.set('user:999', 'data');
  const val = await cluster.get('user:999');
  console.log('Value:', val);

  cluster.quit();
}
clusterOps();`,
        commonMistakes: [
          'Attempting to perform multi-key operations (like MSET or SUNION) where the keys hash to different slots. This will result in a CROSSSLOT error.',
          'Placing Redis Cluster behind an L4 load balancer (like HAProxy). Clients must connect directly to the individual nodes to respect MOVED redirections.'
        ],
        bestPractices: [
          'Use "hash tags" to force multiple keys into the same hash slot by wrapping part of the key in curly braces, e.g., `{user:100}:profile` and `{user:100}:settings`.',
          'Deploy master and replica nodes on separate physical hardware or availability zones to ensure fault tolerance.'
        ],
        interviewQuestion: 'How does Redis Cluster map a key to a specific node, and how many hash slots exist in a cluster?',
        practiceQuestion: 'What is a CROSSSLOT error, and how do hash tags solve it?'
      }
    ]
  },
  {
    id: 'lab-api-caching',
    slug: 'lab-api-caching',
    technology: 'redis',
    title: 'Lab: API Caching',
    category: 'Redis',
    description: 'Implement a Cache-Aside pattern middleware in Express.js.',
    section: '15. Redis',
    level: 21,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Lab Instructions'],
    sections: [
      {
        heading: 'Lab Instructions',
        explanation: [
          'In this lab, you will build an Express middleware that implements the Cache-Aside pattern for an API endpoint. The goal is to dramatically speed up responses for frequently requested data while reducing the load on a simulated slow database.',
          'You will use `ioredis` to connect to the local Redis instance. The middleware should check if a cached response exists for the incoming request URL. If it does, return the cached data immediately. If it doesn\'t, allow the request to proceed to the route handler, but intercept the response so you can save it to Redis with a 60-second TTL before sending it to the client.',
          'Pay close attention to error handling. If the Redis server is unavailable, your application should not crash; the middleware should gracefully bypass the cache and fetch the data directly from the primary database, ensuring high availability.'
        ],
        whyItMatters: 'API caching is one of the most common and impactful uses of Redis. Mastering this pattern is essential for any backend developer.',
        realWorldExample: 'GitHub caches repository readmes and metadata. When you view a popular repository, you are almost certainly viewing a Redis-cached version of the data, which is invalidated only when someone pushes a new commit.'
      }
    ],
    lab: {
      title: 'Implement API Caching',
      objective: 'Create an Express middleware that caches JSON responses in Redis using the request URL as the key.',
      starterCode: `import express from 'express';
import Redis from 'ioredis';

const app = express();
const redis = new Redis();

// Simulated slow database call
const fetchUser = async (id) => {
  await new Promise(r => setTimeout(r, 1000));
  return { id, name: 'Alice', role: 'Admin' };
};

// TODO: Implement cache middleware
const cacheMiddleware = async (req, res, next) => {
  // Your code here
  next();
};

app.get('/api/users/:id', cacheMiddleware, async (req, res) => {
  const user = await fetchUser(req.params.id);
  res.json(user);
});`,
      expectedOutput: 'First request takes >1000ms. Subsequent requests within 60s take <10ms.',
      solution: `const cacheMiddleware = async (req, res, next) => {
  const key = \`api_cache:\${req.originalUrl}\`;
  
  try {
    const cachedData = await redis.get(key);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
  } catch (err) {
    console.error('Redis read error', err);
    // Proceed to database if Redis fails
  }

  // Intercept res.json
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    // Fire and forget cache update with 60s TTL
    redis.set(key, JSON.stringify(body), 'EX', 60).catch(console.error);
    return originalJson(body);
  };
  
  next();
};`,
      hints: [
        'Use `req.originalUrl` to generate a unique Redis key for each endpoint.',
        'You will need to override `res.json` temporarily to capture the output of the route handler.',
        'Don\'t forget to use `JSON.parse` and `JSON.stringify` as Redis stores strings.'
      ]
    }
  },
  {
    id: 'lab-rate-limiter',
    slug: 'lab-rate-limiter',
    technology: 'redis',
    title: 'Lab: Rate Limiter',
    category: 'Redis',
    description: 'Build a sliding window rate limiter to protect your application endpoints.',
    section: '15. Redis',
    level: 22,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Lab Instructions'],
    sections: [
      {
        heading: 'Lab Instructions',
        explanation: [
          'In this lab, you will implement a rate limiting middleware for an Express application to prevent abuse. Unlike a simple fixed-window limiter, you will use a basic sliding window approximation or rely on atomic increment operations with precise TTLs to enforce limits based on the user\'s IP address.',
          'The requirements are strict: a single IP address may only make 5 requests every 10 seconds. If they exceed this limit, the server must respond with an HTTP 429 Too Many Requests status code and prevent the underlying route handler from executing.',
          'You will utilize the `MULTI`/`EXEC` transaction pipeline in `ioredis` to ensure that incrementing the request count and setting the expiration timeout happen atomically. This prevents race conditions where a key might be incremented but never given a TTL.'
        ],
        whyItMatters: 'Without rate limiting, public APIs are vulnerable to scraping, brute-force attacks, and distributed denial-of-service (DDoS).',
        realWorldExample: 'Stripe limits API requests to 100 read operations per second per account. If you exceed this, you receive a 429 response, forcing your application to back off and retry.'
      }
    ],
    lab: {
      title: 'Implement an IP-based Rate Limiter',
      objective: 'Create middleware that limits an IP to 5 requests per 10-second window.',
      starterCode: `import express from 'express';
import Redis from 'ioredis';

const app = express();
const redis = new Redis();

const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const limit = 5;
  const windowSecs = 10;
  
  // TODO: Implement rate limiting logic using Redis
  // If limit exceeded, return res.status(429).send('Too many requests')
  
  next();
};

app.get('/api/data', rateLimiter, (req, res) => {
  res.send('Success!');
});`,
      expectedOutput: 'First 5 requests succeed. The 6th request within 10 seconds returns 429 status.',
      solution: `const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const limit = 5;
  const windowSecs = 10;
  
  // Use current window timestamp for a basic fixed window
  const currentWindow = Math.floor(Date.now() / 1000 / windowSecs);
  const key = \`rate:\${ip}:\${currentWindow}\`;

  try {
    const multi = redis.multi();
    multi.incr(key);
    multi.expire(key, windowSecs * 2); // Ensure cleanup
    
    const results = await multi.exec();
    const count = results[0][1];

    if (count > limit) {
      return res.status(429).send('Too many requests');
    }
    
    // Optional: Add headers
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - count));
    
    next();
  } catch (error) {
    console.error('Rate limiter error', error);
    next(); // Fail open if Redis crashes
  }
};`,
      hints: [
        'Calculate a time bucket based on `Math.floor(Date.now() / 1000 / windowSecs)`.',
        'Use `redis.multi()` to queue `incr` and `expire` commands, then execute them together.',
        'Consider failing open (calling `next()`) if Redis throws an error so your app doesn\'t go completely down.'
      ]
    }
  },
  {
    id: 'lab-session-store',
    slug: 'lab-session-store',
    technology: 'redis',
    title: 'Lab: Session Store',
    category: 'Redis',
    description: 'Configure Express to use Redis for stateless session management.',
    section: '15. Redis',
    level: 23,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Lab Instructions'],
    sections: [
      {
        heading: 'Lab Instructions',
        explanation: [
          'In this lab, you will transition a Node.js application from using insecure, unscalable memory-based sessions to a robust Redis-backed session store. This is a critical step in making any stateful web application ready for production and horizontal scaling.',
          'You will integrate the `express-session` and `connect-redis` packages. Your task is to initialize the Redis client, configure the Redis store, and plug it into the session middleware. You will configure the sessions to expire automatically after 24 hours.',
          'Once configured, you will create two routes: a login route that sets a user ID in the session, and a profile route that retrieves it. You will then inspect the Redis database using the CLI to see exactly how the session data is stored and serialized.'
        ],
        whyItMatters: 'Memory sessions leak memory and fail completely if you run multiple instances of your server behind a load balancer. Redis provides the centralized state needed for modern deployments.',
        realWorldExample: 'When you log into Netflix, your session ID is stored in a massive Redis cluster. This allows any of their thousands of backend servers to instantly verify you are logged in on subsequent requests.'
      }
    ],
    lab: {
      title: 'Configure Redis Sessions',
      objective: 'Set up express-session with connect-redis and verify data persistence.',
      starterCode: `import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';

const app = express();
// TODO: Initialize Redis Client
// TODO: Initialize Redis Store

app.use(
  session({
    // TODO: Add store configuration
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 } // 24 hours
  })
);

app.get('/login', (req, res) => {
  req.session.user = { id: 1, name: 'Admin' };
  res.send('Logged in');
});

app.get('/me', (req, res) => {
  if (req.session.user) res.json(req.session.user);
  else res.status(401).send('Unauthorized');
});`,
      expectedOutput: 'After visiting /login, /me returns the user object. Data survives a server restart.',
      solution: `import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';

const app = express();

// Initialize client
const redisClient = new Redis();

// Initialize store
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'app:session:',
});

app.use(
  session({
    store: redisStore, // Inject Redis store
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 }
  })
);

app.get('/login', (req, res) => {
  req.session.user = { id: 1, name: 'Admin' };
  res.send('Logged in');
});

app.get('/me', (req, res) => {
  if (req.session.user) res.json(req.session.user);
  else res.status(401).send('Unauthorized');
});`,
      hints: [
        'Make sure you import RedisStore correctly based on the connect-redis documentation (usually a named or default export depending on the version).',
        'Pass the `redisClient` instance into the `RedisStore` constructor.',
        'Test persistence by logging in, killing the node server, restarting it, and checking `/me`.'
      ]
    }
  },
  {
    id: 'lab-otp-expiry',
    slug: 'lab-otp-expiry',
    technology: 'redis',
    title: 'Lab: OTP Expiry',
    category: 'Redis',
    description: 'Implement a self-expiring One Time Password system using SETEX.',
    section: '15. Redis',
    level: 24,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Lab Instructions'],
    sections: [
      {
        heading: 'Lab Instructions',
        explanation: [
          'In this lab, you will build the backend logic for an SMS/Email verification system using One Time Passwords (OTPs). A crucial requirement for OTPs is that they must expire quickly to prevent brute-force attacks and replay attacks.',
          'You will create two functions: one to generate and store the OTP, and another to verify it. When storing the OTP, you must use Redis to ensure it automatically deletes itself after exactly 300 seconds (5 minutes). This shifts the burden of cleanup from your application logic to the database.',
          'For the verification step, you will read the OTP from Redis. If it matches, you must immediately delete the key so that the same OTP cannot be used twice. If it doesn\'t match, or if it has expired (returns null), the verification fails.'
        ],
        whyItMatters: 'Relying on Redis TTL is much more robust than storing timestamps in a SQL database and writing cron jobs to clean up expired tokens.',
        realWorldExample: 'When logging into a bank app on a new device, it texts you a 6-digit code. That code is stored in Redis mapped to your user ID with a 5-minute TTL.'
      }
    ],
    lab: {
      title: 'Build an OTP Verification System',
      objective: 'Generate an OTP, store it with a TTL, and verify/consume it correctly.',
      starterCode: `import Redis from 'ioredis';
const redis = new Redis();

async function generateAndStoreOTP(email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // TODO: Store OTP in Redis tied to the email, expiring in 5 minutes
  
  return otp;
}

async function verifyOTP(email, inputOtp) {
  // TODO: Retrieve OTP from Redis
  // TODO: Check if it matches. If so, delete it to prevent reuse.
  // Return true if valid, false otherwise.
  return false;
}`,
      expectedOutput: 'OTP verifies successfully once. Second verification fails. Verification after 5 minutes fails.',
      solution: `async function generateAndStoreOTP(email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const key = \`otp:\${email}\`;
  
  // SETEX key seconds value
  await redis.setex(key, 300, otp);
  
  return otp;
}

async function verifyOTP(email, inputOtp) {
  const key = \`otp:\${email}\`;
  
  const storedOtp = await redis.get(key);
  
  if (!storedOtp) {
    return false; // Expired or doesn't exist
  }
  
  if (storedOtp === inputOtp) {
    // Crucial: Delete OTP after successful use
    await redis.del(key);
    return true;
  }
  
  return false;
}`,
      hints: [
        'The `setex` method in ioredis is a shortcut for `SET key value EX seconds`.',
        'Always prefix your keys (e.g., `otp:user@example.com`) to avoid naming collisions.',
        'Don\'t forget to use `redis.del()` upon successful verification.'
      ]
    }
  },
  {
    id: 'lab-distributed-lock',
    slug: 'lab-distributed-lock',
    technology: 'redis',
    title: 'Lab: Distributed Lock',
    category: 'Redis',
    description: 'Build a safe distributed mutex using the SETNX pattern.',
    section: '15. Redis',
    level: 25,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Lab Instructions'],
    sections: [
      {
        heading: 'Lab Instructions',
        explanation: [
          'In this advanced lab, you will implement a distributed lock mechanism. Imagine a scenario where a user can trigger an expensive report generation process. If they click the "Generate" button multiple times quickly, multiple servers might start generating the same report, wasting resources.',
          'You will write an `acquireLock` and a `releaseLock` function. The acquisition must use the `SET ... NX EX ...` pattern to ensure atomicity and prevent deadlocks if the process crashes. The value you store must be a unique identifier for the specific process acquiring the lock.',
          'The release mechanism is the trickiest part. You cannot simply use `DEL key`. You must read the key, check if the value matches your unique identifier, and only delete it if it matches. Because this requires two steps (GET then DEL), it must be executed as an atomic Lua script to prevent race conditions during the release.'
        ],
        whyItMatters: 'Distributed locks are critical for preventing race conditions and duplicate processing in microservice architectures.',
        realWorldExample: 'A cron job runs on 3 separate servers to process monthly subscription billing. They all attempt to acquire a `billing_run_lock`. Only one succeeds, preventing customers from being charged three times.'
      }
    ],
    lab: {
      title: 'Implement a Safe Distributed Lock',
      objective: 'Write acquire and release functions using NX, EX, and a Lua script for safe deletion.',
      starterCode: `import Redis from 'ioredis';
import { randomUUID } from 'crypto';
const redis = new Redis();

async function acquireLock(resourceName, uniqueId, ttlSeconds) {
  // TODO: Implement atomic SET NotExists with Expiry
  return false;
}

async function releaseLock(resourceName, uniqueId) {
  // TODO: Implement safe release using a Lua script
  return false;
}

// Test harness
async function run() {
  const resource = 'report_gen';
  const myId = randomUUID();
  
  const acquired = await acquireLock(resource, myId, 10);
  if (acquired) {
    console.log('Doing work...');
    await releaseLock(resource, myId);
  }
}`,
      expectedOutput: 'First process acquires the lock. Second process fails to acquire it until the first process releases it.',
      solution: `async function acquireLock(resourceName, uniqueId, ttlSeconds) {
  const key = \`lock:\${resourceName}\`;
  
  // 'NX' = Only set if it doesn't exist
  // 'EX' = Expire in N seconds
  const result = await redis.set(key, uniqueId, 'NX', 'EX', ttlSeconds);
  
  return result === 'OK';
}

async function releaseLock(resourceName, uniqueId) {
  const key = \`lock:\${resourceName}\`;
  
  // Lua script ensures atomic check-and-delete
  const script = \`
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  \`;
  
  // ioredis eval: script, num_keys, keys..., args...
  const result = await redis.eval(script, 1, key, uniqueId);
  return result === 1;
}`,
      hints: [
        'Use `redis.set(key, value, "NX", "EX", ttl)` to acquire.',
        'The Lua script uses `KEYS[1]` for the key name and `ARGV[1]` for your unique ID.',
        'Use `redis.eval(script, numberOfKeys, key1, arg1)` to execute the script.'
      ]
    }
  },
  {
    id: 'lab-real-time-notifications',
    slug: 'lab-real-time-notifications',
    technology: 'redis',
    title: 'Lab: Real-time Notifications',
    category: 'Redis',
    description: 'Use Pub/Sub to broadcast real-time events between Node.js processes.',
    section: '15. Redis',
    level: 26,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Lab Instructions'],
    sections: [
      {
        heading: 'Lab Instructions',
        explanation: [
          'In this lab, you will build a cross-process communication system using Redis Pub/Sub. Imagine an architecture with a REST API backend and a separate WebSocket server. When the API updates a user\'s profile, it needs to tell the WebSocket server to push the update to the user\'s browser in real-time.',
          'You will create two separate Redis client instances. One will act as the subscriber (the simulated WebSocket server) listening on a `user_updates` channel. The other will act as the publisher (the simulated API). Note that a single Redis connection cannot effectively publish and subscribe simultaneously.',
          'You will format the notification data as JSON before publishing it, and parse it upon receipt. This demonstrates how to send complex structured events through Redis Pub/Sub channels.'
        ],
        whyItMatters: 'Pub/Sub allows independent microservices to react to events asynchronously, enabling decoupled and scalable architectures.',
        realWorldExample: 'A chat application like Slack uses Pub/Sub extensively. When you send a message, the API server publishes it to a channel. The specific gateway server holding your recipient\'s websocket connection receives the event and forwards it.'
      }
    ],
    lab: {
      title: 'Build a Pub/Sub Notification System',
      objective: 'Create a publisher and subscriber to broadcast JSON events across processes.',
      starterCode: `import Redis from 'ioredis';

// Note: You need separate connections!
const publisher = new Redis();
const subscriber = new Redis();

async function setupSubscriber() {
  // TODO: Subscribe to 'notifications' channel
  // TODO: Listen for 'message' events and parse the JSON payload
}

async function simulateApiEvent() {
  const eventData = { userId: 42, action: 'profile_updated' };
  // TODO: Publish eventData as a JSON string to 'notifications' channel
}

async function run() {
  await setupSubscriber();
  setTimeout(simulateApiEvent, 1000);
}
run();`,
      expectedOutput: 'The subscriber logs the parsed JSON object when the publisher fires the event.',
      solution: `async function setupSubscriber() {
  const channel = 'notifications';
  
  await subscriber.subscribe(channel);
  
  subscriber.on('message', (receivedChannel, message) => {
    if (receivedChannel === channel) {
      try {
        const data = JSON.parse(message);
        console.log('Received real-time event:', data);
      } catch (err) {
        console.error('Failed to parse message:', message);
      }
    }
  });
}

async function simulateApiEvent() {
  const channel = 'notifications';
  const eventData = { userId: 42, action: 'profile_updated' };
  
  // Publish stringified JSON
  await publisher.publish(channel, JSON.stringify(eventData));
}`,
      hints: [
        'Use `subscriber.subscribe(channelName)` first.',
        'Use the event emitter pattern: `subscriber.on("message", callback)`.',
        'Always serialize objects to strings using `JSON.stringify` before publishing.'
      ]
    }
  }
];
