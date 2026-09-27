import type { Lesson } from '../types'

const references = [
  { label: 'MongoDB Manual', url: 'https://www.mongodb.com/docs/manual/introduction/' },
  { label: 'CRUD Operations', url: 'https://www.mongodb.com/docs/manual/crud/' },
  { label: 'Indexes', url: 'https://www.mongodb.com/docs/manual/indexes/' },
  { label: 'Aggregation', url: 'https://www.mongodb.com/docs/manual/aggregation/' },
  { label: 'Mongoose', url: 'https://mongoosejs.com/docs/guide.html' }
]

export const mongodbLessons: Lesson[] = [
  {
    id: 'documents-collections',
    slug: 'documents-collections',
    technology: 'mongodb',
    title: 'Documents & Collections',
    category: 'MongoDB',
    description: 'What documents are, BSON format, collections, _id field, document structure, flexible schema.',
    section: '13. MongoDB',
    level: 1,
    difficulty: 'beginner',
    prerequisites: ['basic-json'],
    concepts: ['Document', 'Collection', 'BSON', '_id', 'Schema Flexibility'],
    progress: 0,
    toc: ['Understanding Documents', 'Collections and Schemas'],
    references,
    sections: [
      {
        heading: 'Understanding Documents',
        explanation: [
          'MongoDB stores data records as BSON documents. BSON is a binary representation of JSON documents, though it contains more data types than JSON. At its core, a document is a set of key-value pairs, closely resembling JSON objects, dictionaries in Python, or hash maps in other languages. This structure allows you to represent complex hierarchical relationships with a single record.',
          'Every document requires a unique _id field that acts as a primary key. If an inserted document omits the _id field, the MongoDB driver automatically generates an ObjectId for the _id field. This ensures uniqueness across the collection. Documents in MongoDB are flexible, meaning that documents in the same collection do not need to have the same set of fields or structure.',
          'The maximum BSON document size is 16 megabytes. This limit helps ensure that a single document cannot use excessive amount of RAM or, during transmission, excessive bandwidth. To store documents larger than the maximum size, MongoDB provides the GridFS API.'
        ],
        whyItMatters: 'Understanding documents is the foundation of working with MongoDB, as they replace rows in relational databases with a more intuitive and flexible data model.',
        realWorldExample: 'Storing user profiles where some users have complex nested preferences and social links, while others only have a basic email and password. MongoDB handles this naturally.',
        code: `const userDocument = {
  _id: ObjectId("5099803df3f4948bd2f98391"),
  username: "johndoe",
  contact: {
    email: "john@example.com",
    phone: "123-456-7890"
  },
  accessPrivileges: ["user", "admin"],
  lastLogin: new Date("2023-01-01T12:00:00Z")
};`,
        output: 'Successfully structured BSON document.',
        commonMistakes: ['Exceeding the 16MB document size limit by nesting unbounded arrays.', 'Using non-string keys, which are not supported.', 'Assuming documents must have identical schemas.'],
        bestPractices: ['Keep related data in a single document when possible to avoid joins.', 'Use camelCase for field names consistently.', 'Avoid deep nesting (more than 100 levels is the hard limit, but practically keep it shallow).'],
        interviewQuestion: 'What is BSON and how does it differ from JSON in MongoDB?',
        practiceQuestion: 'Create a JSON representation of a document that could be stored in MongoDB containing nested fields.'
      },
      {
        heading: 'Collections and Schemas',
        explanation: [
          'A collection in MongoDB is a grouping of MongoDB documents. It is the equivalent of an RDBMS table. A collection exists within a single database. Collections do not enforce a schema. Documents within a collection can have different fields. Typically, all documents in a collection have a similar or related purpose.',
          'Although collections have flexible schemas by default, you can enforce validation rules using JSON Schema. This allows you to guarantee that certain fields exist, have specific types, or match particular patterns. It provides a balance between the strictness of SQL tables and the complete freedom of basic MongoDB.',
          'Collections are created implicitly when you first insert data into them. There is no need to run a "CREATE TABLE" equivalent unless you need to specify specific options like a maximum size for a capped collection or define strict schema validation rules upfront.'
        ],
        whyItMatters: 'Collections group related data without forcing every record to look identical, speeding up development and easing migrations.',
        realWorldExample: 'An IoT system storing sensor readings in a collection, where different sensors report different metrics (temperature vs humidity).',
        code: `// Implicit creation
db.sensors.insertOne({ type: "temperature", value: 22 });

// Explicit creation with validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: { bsonType: "string" },
        email: { bsonType: "string" }
      }
    }
  }
});`,
        output: 'Collection created successfully with or without validation rules.',
        commonMistakes: ['Putting completely unrelated documents in the same collection.', 'Overusing schema validation and losing the benefits of schema flexibility.', 'Not planning collection strategies for massive data scaling.'],
        bestPractices: ['Group documents of the same entity type in a collection.', 'Use schema validation for critical fields (like IDs or status flags).', 'Prefer plural names for collections (e.g., users, posts).'],
        interviewQuestion: 'Can a MongoDB collection have strict schema enforcement?',
        practiceQuestion: 'Write a command to explicitly create a collection named "logs" as a capped collection.'
      }
    ]
  },
  {
    id: 'bson-data-types',
    slug: 'bson-data-types',
    technology: 'mongodb',
    title: 'BSON Data Types',
    category: 'MongoDB',
    description: 'BSON vs JSON, ObjectId, Date, NumberDecimal, Binary, supported types, type coercion.',
    section: '13. MongoDB',
    level: 2,
    difficulty: 'beginner',
    prerequisites: ['documents-collections'],
    concepts: ['BSON Types', 'ObjectId', 'ISODate', 'NumberDecimal'],
    progress: 0,
    toc: ['Understanding BSON', 'ObjectId and Dates'],
    references,
    sections: [
      {
        heading: 'Understanding BSON',
        explanation: [
          'BSON, short for Binary JSON, is the binary-encoded serialization format used by MongoDB. While JSON is text-based and easy for humans to read, BSON is designed to be highly efficient in storage and traversal. BSON extends the JSON model to provide additional data types, string encoding, and strict typings that JSON lacks.',
          'Key BSON types include NumberInt (32-bit integer), NumberLong (64-bit integer), and NumberDecimal (128-bit decimal-based floating-point). NumberDecimal is particularly critical for financial data where precision is paramount, as standard JSON floats can introduce rounding errors.',
          'BSON also supports a Binary data type, which is used to store arbitrary byte arrays. This is useful for storing small images, hashes, or encrypted payloads directly in the document, keeping the data together with its metadata.'
        ],
        whyItMatters: 'Using the correct BSON type ensures data integrity, avoids floating-point precision issues, and optimizes storage space.',
        realWorldExample: 'Storing user balances in a banking app requires NumberDecimal to prevent rounding errors that occur with standard IEEE 754 floats.',
        code: `db.accounts.insertOne({
  accountId: "12345",
  balance: NumberDecimal("1000.50"), // Precise financial value
  metadata: BinData(0, "eHl6...")     // Binary data
});`,
        output: 'Document inserted with explicit BSON types.',
        commonMistakes: ['Using standard JavaScript numbers (floats) for currency.', 'Storing large binaries in documents (exceeding 16MB).', 'Assuming BSON types map 1:1 with JSON types.'],
        bestPractices: ['Always use NumberDecimal for exact precision decimal numbers.', 'Limit the use of Binary data; prefer object storage with URLs for large files.', 'Understand type coercion in your driver/ODM.'],
        interviewQuestion: 'Why should you use NumberDecimal instead of a standard Number in MongoDB for financial data?',
        practiceQuestion: 'Insert a document with a 64-bit integer type.'
      },
      {
        heading: 'ObjectId and Dates',
        explanation: [
          'The ObjectId is a 12-byte BSON type widely used as the default value for the _id field. It consists of a 4-byte timestamp, a 5-byte random value, and a 3-byte incrementing counter. This structure ensures that ObjectIds are unique across different machines and processes, enabling decentralized generation without coordination.',
          'Because the ObjectId contains a timestamp in its first 4 bytes, you can extract the creation time of a document directly from its _id field. This often eliminates the need to store a separate "createdAt" timestamp, saving space and reducing schema complexity.',
          'Dates in MongoDB are stored as BSON Date, which is a 64-bit integer representing milliseconds since the Unix epoch. Unlike JSON, which relies on string representations like ISO-8601, BSON Dates natively support chronological sorting and time-based queries.'
        ],
        whyItMatters: 'ObjectIds provide distributed unique keys, and BSON dates allow for efficient time-series queries.',
        realWorldExample: 'Extracting the creation date of thousands of log entries without needing a separate timestamp field, optimizing both index size and storage.',
        code: `const docId = ObjectId();
const creationTime = docId.getTimestamp(); // Extracts JS Date object

db.events.insertOne({
  _id: docId,
  eventTime: new Date(), // Stored as BSON Date
  type: "login"
});`,
        output: 'Creation time can be reliably derived from docId.',
        commonMistakes: ['Storing dates as strings ("2023-01-01") which breaks chronological sorting and aggregation.', 'Generating ObjectIds manually using weak randomizers.', 'Assuming ObjectId is strictly sequential.'],
        bestPractices: ['Use native Date objects in your application to ensure they are saved as BSON Dates.', 'Leverage the timestamp embedded in ObjectId when you only need insertion time.', 'Use consistent time zones (usually UTC) when inserting dates.'],
        interviewQuestion: 'How does MongoDB guarantee the uniqueness of an ObjectId across a distributed cluster?',
        practiceQuestion: 'Write a script to extract the timestamp from an ObjectId.'
      }
    ]
  },
  {
    id: 'crud-operations',
    slug: 'crud-operations',
    technology: 'mongodb',
    title: 'CRUD Operations',
    category: 'MongoDB',
    description: 'insertOne/Many, find, updateOne/Many, deleteOne/Many, upserts, write results.',
    section: '13. MongoDB',
    level: 3,
    difficulty: 'beginner',
    prerequisites: ['bson-data-types'],
    concepts: ['Insert', 'Find', 'Update', 'Delete', 'Upsert'],
    progress: 0,
    toc: ['Create and Read', 'Update and Delete'],
    references,
    sections: [
      {
        heading: 'Create and Read',
        explanation: [
          'Create operations in MongoDB add new documents to a collection. The primary methods are insertOne() and insertMany(). insertMany() is highly optimized for bulk operations and allows passing an array of documents, executing them in batches to reduce network round-trips.',
          'Read operations retrieve documents. The find() method queries the collection, returning a cursor. A cursor is an iterable object that fetches documents in batches. You can chain methods like sort(), limit(), and skip() to the cursor to refine the result set before documents are returned to the client.',
          'When querying, you pass a filter document that specifies the conditions. An empty document `{}` matches all records. You can also specify a projection document as the second argument to find() to include or exclude specific fields, reducing the data transferred over the network.'
        ],
        whyItMatters: 'Efficiently creating and querying data is the core interaction with any database. Bulk operations and cursors are crucial for performance.',
        realWorldExample: 'A background job reading millions of records using a cursor without loading them all into memory, then bulk inserting processed results.',
        code: `// Insert Many
db.users.insertMany([
  { name: "Alice", age: 30, status: "active" },
  { name: "Bob", age: 25, status: "pending" }
]);

// Read with projection and sorting
db.users.find(
  { status: "active" },
  { name: 1, age: 1, _id: 0 } // Projection
).sort({ age: -1 }).limit(10);`,
        output: 'Returns top 10 active users sorted by age descending, omitting the _id field.',
        commonMistakes: ['Calling find() without limit() on large collections and converting the entire cursor to an array in memory.', 'Inserting documents one by one in a loop instead of using insertMany.', 'Fetching all fields when only one or two are needed.'],
        bestPractices: ['Always use projections to limit returned data size.', 'Use insertMany for bulk imports.', 'Understand that cursors timeout by default after 10 minutes of inactivity.'],
        interviewQuestion: 'What does find() return in MongoDB, and how does it manage memory?',
        practiceQuestion: 'Write a query to find all users older than 25 and return only their names.'
      },
      {
        heading: 'Update and Delete',
        explanation: [
          'Update operations modify existing documents. updateOne() modifies the first document matching the filter, while updateMany() modifies all matches. Updates require update operators (like $set, $inc, $unset) to define the exact modification. Without operators, the older replaceOne() method replaces the entire document.',
          'An upsert is an option passed to update operations. If upsert: true is set and no document matches the query filter, MongoDB will create a new document combining the query criteria and the update operators. This prevents race conditions when checking if a record exists before updating it.',
          'Delete operations remove documents. deleteOne() removes the first match, and deleteMany() removes all matches. Operations return write results (WriteResult or BulkWriteResult), which provide metrics like matchedCount, modifiedCount, and deletedCount to verify the operation\'s impact.'
        ],
        whyItMatters: 'Atomic updates and upserts prevent race conditions in distributed applications and ensure data consistency.',
        realWorldExample: 'Incrementing a page view counter. Using an upsert ensures the counter is initialized at 1 if the page has never been viewed, or incremented if it has, in a single atomic operation.',
        code: `// Update with Upsert
db.pageViews.updateOne(
  { url: "/home" },
  { $inc: { views: 1 }, $setOnInsert: { firstViewed: new Date() } },
  { upsert: true }
);

// Delete Many
db.sessions.deleteMany({ expiresAt: { $lt: new Date() } });`,
        output: 'Updates the counter or creates the document. Deletes expired sessions.',
        commonMistakes: ['Forgetting the $set operator and accidentally replacing the whole document (in older driver versions).', 'Not checking the modifiedCount to verify an update was actually applied.', 'Running deleteMany({}) on production by accident.'],
        bestPractices: ['Use $set and other operators to mutate only necessary fields.', 'Leverage upserts to combine check-and-create logic into one atomic operation.', 'Use $setOnInsert for fields that should only be written on creation during an upsert.'],
        interviewQuestion: 'Explain the difference between updateOne with upsert:true and a standard insert operation.',
        practiceQuestion: 'Write an update query to add a new tag "mongodb" to a user\'s tags array.'
      }
    ]
  },
  {
    id: 'query-operators',
    slug: 'query-operators',
    technology: 'mongodb',
    title: 'Query Operators',
    category: 'MongoDB',
    description: '$eq, $gt, $lt, $in, $and, $or, $not, $exists, $regex, dot notation for nested fields.',
    section: '13. MongoDB',
    level: 4,
    difficulty: 'beginner',
    prerequisites: ['crud-operations'],
    concepts: ['Comparison Operators', 'Logical Operators', 'Element Operators', 'Dot Notation'],
    progress: 0,
    toc: ['Comparison and Logical Operators', 'Element, Evaluation, and Dot Notation'],
    references,
    sections: [
      {
        heading: 'Comparison and Logical Operators',
        explanation: [
          'Comparison operators compare document field values against specified values. The most common are $eq (equal), $ne (not equal), $gt (greater than), $gte (greater than or equal), $lt (less than), and $lte (less than or equal). The $in operator matches any value in a specified array, making it perfect for matching against multiple potential values.',
          'Logical operators allow you to combine multiple query conditions. $and joins conditions with a logical AND, $or joins with a logical OR, $nor returns documents that fail all conditions, and $not inverts the effect of a query expression.',
          'While MongoDB implicitly applies an AND operation when you specify multiple fields in a query document, you must use the explicit $and operator when applying multiple conditions to the same field or when combining multiple $or expressions.'
        ],
        whyItMatters: 'Operators transform simple exact-match queries into powerful, expressive data retrieval operations suitable for complex business logic.',
        realWorldExample: 'An e-commerce store filtering products where price is between $50 and $100, and the category is either "electronics" or "books".',
        code: `db.products.find({
  price: { $gte: 50, $lte: 100 },
  $or: [
    { category: "electronics" },
    { category: "books" }
  ]
});`,
        output: 'Returns matching product documents.',
        commonMistakes: ['Using $or when $in would be more efficient and readable.', 'Forgetting that query conditions on the same field in the same document overwrite each other unless wrapped in an explicit $and.', 'Misunderstanding that $not also matches documents where the field does not exist.'],
        bestPractices: ['Prefer $in over $or for single-field multiple-value checks.', 'Order $or conditions with the most restrictive/likely condition first to fail fast.', 'Ensure indexes support your comparison operators.'],
        interviewQuestion: 'When is it strictly necessary to use the explicit $and operator in a MongoDB query?',
        practiceQuestion: 'Write a query to find documents where the status is not "archived" and the priority is either "high" or "urgent".'
      },
      {
        heading: 'Element, Evaluation, and Dot Notation',
        explanation: [
          'Element operators like $exists and $type check for the presence or BSON type of a field. $exists: true matches documents that contain the field, even if the value is null. This is essential for heterogeneous schemas where fields might be absent.',
          'Evaluation operators like $regex allow for pattern matching using regular expressions. While powerful, regex queries can be slow if they are not anchored to the start of the string (e.g., /^prefix/), as unanchored regex cannot efficiently use B-tree indexes.',
          'Dot notation is a fundamental MongoDB feature used to access fields of embedded documents and elements of arrays. When querying nested fields, the field path must be enclosed in quotes (e.g., "address.city"). It allows seamless traversal of deeply nested JSON structures.'
        ],
        whyItMatters: 'Dot notation and element operators allow developers to effectively query unstructured or deeply nested data, fulfilling the promise of schema flexibility.',
        realWorldExample: 'Finding all users who have an "address" subdocument containing a "zipCode" field, regardless of the other address properties.',
        code: `db.users.find({
  "address.zipCode": { $exists: true },
  "profile.username": { $regex: /^admin/i }
});`,
        output: 'Returns users with a zip code who have a username starting with admin.',
        commonMistakes: ['Forgetting quotes around dot notation fields, causing syntax errors.', 'Using unanchored $regex expressions on large collections without text indexes.', 'Confusing $exists: false with querying for null values.'],
        bestPractices: ['Always use quotes for dot notation.', 'Use anchored regex or text indexes for string searches.', 'Combine $exists with type checks if the schema is highly inconsistent.'],
        interviewQuestion: 'How do you query a specific field inside a nested object in MongoDB?',
        practiceQuestion: 'Write a query to find documents where the nested "settings.notifications" field exists and is of type boolean.'
      }
    ]
  },
  {
    id: 'indexes',
    slug: 'indexes',
    technology: 'mongodb',
    title: 'Indexes',
    category: 'MongoDB',
    description: 'B-tree indexes, createIndex, single field, multikey, text indexes, TTL indexes, explain().',
    section: '13. MongoDB',
    level: 5,
    difficulty: 'intermediate',
    prerequisites: ['query-operators'],
    concepts: ['B-tree', 'Multikey', 'Text', 'TTL', 'explain'],
    progress: 0,
    toc: ['Index Fundamentals', 'Specialized Indexes and Explain'],
    references,
    sections: [
      {
        heading: 'Index Fundamentals',
        explanation: [
          'Indexes in MongoDB are specialized data structures (B-trees) that store a small portion of the collection\'s data in an easy-to-traverse form. Without an index, MongoDB must perform a collection scan, examining every document to find matches. Indexes store the value of a specific field or set of fields, ordered by the value of the field.',
          'You create an index using createIndex(). Single-field indexes are the most basic, indexing one field in either ascending (1) or descending (-1) order. For single-field indexes, the direction does not matter as MongoDB can traverse the index in either direction.',
          'When indexing an array field, MongoDB automatically creates a Multikey index. It creates a separate index entry for every element in the array. This makes querying against arrays highly efficient, but multikey indexes can consume significant storage space and memory if arrays are large.'
        ],
        whyItMatters: 'Indexes are the primary mechanism for optimizing database read performance. Without them, applications will grind to a halt as data grows.',
        realWorldExample: 'Searching for a user by email address in a collection of 10 million users. An index reduces the search from examining 10 million documents to a few B-tree traversals.',
        code: `// Single field index
db.users.createIndex({ email: 1 }, { unique: true });

// Multikey index (assuming tags is an array)
db.articles.createIndex({ tags: 1 });`,
        output: 'Indexes are created, enforcing uniqueness on emails and indexing array elements for tags.',
        commonMistakes: ['Over-indexing, which slows down write operations (every index must be updated on insert/update).', 'Creating multiple single-field indexes when a compound index is needed.', 'Indexing fields with very low cardinality (e.g., a boolean field).'],
        bestPractices: ['Create indexes based on your most frequent and most critical queries.', 'Monitor index size; indexes must fit in RAM for optimal performance.', 'Drop unused indexes.'],
        interviewQuestion: 'What is a multikey index and when does MongoDB create one?',
        practiceQuestion: 'Create a unique, descending index on the "username" field.'
      },
      {
        heading: 'Specialized Indexes and Explain',
        explanation: [
          'MongoDB offers specialized index types. Text indexes support text search operations on string content, providing tokenization, stemming, and stop-word filtering. TTL (Time-To-Live) indexes are special single-field indexes that automatically remove documents from a collection after a certain amount of time or at a specific clock time.',
          'To verify if a query uses an index, you append the explain() method to a cursor. The explain plan provides execution statistics, detailing whether a collection scan (COLLSCAN) or index scan (IXSCAN) occurred, how many documents were examined, and how much time the query took.',
          'Analyzing explain output is a core competency for database tuning. The "executionStats" mode of explain() is particularly useful, as it actually runs the query and returns metrics like totalKeysExamined and totalDocsExamined. If totalDocsExamined heavily outweighs the number of returned documents, the index is inefficient.'
        ],
        whyItMatters: 'Understanding execution plans proves that your queries are optimized, and TTL indexes automate data lifecycle management without external cron jobs.',
        realWorldExample: 'Using a TTL index to automatically delete user session tokens 24 hours after creation, keeping the sessions collection small and fast.',
        code: `// TTL Index (expires after 3600 seconds)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });

// Explain a query
db.users.find({ age: { $gt: 30 } }).explain("executionStats");`,
        output: 'TTL index automates cleanup. Explain outputs a JSON document detailing the IXSCAN or COLLSCAN process.',
        commonMistakes: ['Misinterpreting explain() output and ignoring totalKeysExamined.', 'Creating a TTL index on a field that doesn\'t contain date objects.', 'Expecting text indexes to be as feature-rich as dedicated search engines like Elasticsearch.'],
        bestPractices: ['Always use explain("executionStats") when tuning queries.', 'Use TTL indexes for logs, sessions, and temporary data.', 'Remember a collection can only have one text index.'],
        interviewQuestion: 'How does a TTL index work, and what are its limitations?',
        practiceQuestion: 'Write the command to explain the execution stats of a query filtering by status.'
      }
    ]
  },
  {
    id: 'compound-indexes',
    slug: 'compound-indexes',
    technology: 'mongodb',
    title: 'Compound Indexes',
    category: 'MongoDB',
    description: 'Multi-field indexes, index intersection, ESR rule (Equality Sort Range), covered queries.',
    section: '13. MongoDB',
    level: 6,
    difficulty: 'intermediate',
    prerequisites: ['indexes'],
    concepts: ['Compound Indexes', 'ESR Rule', 'Covered Queries', 'Index Prefix'],
    progress: 0,
    toc: ['Compound Indexes and ESR', 'Covered Queries and Prefix'],
    references,
    sections: [
      {
        heading: 'Compound Indexes and ESR',
        explanation: [
          'Compound indexes contain references to multiple fields within a document. The order of the fields in a compound index is extremely important. MongoDB stores compound index keys in the specified order, meaning an index on { a: 1, b: 1 } sorts by "a" first, and then by "b".',
          'The ESR (Equality, Sort, Range) rule is the golden rule for designing compound indexes. First, add fields queried for Equality (e.g., a exact match). Second, add fields used for Sorting. Third, add fields queried using Range operators (e.g., $gt, $lt). This structure allows MongoDB to use the index to locate exact matches, return them in the correct sort order without an in-memory sort, and efficiently scan the range.',
          'Index intersection occurs when MongoDB uses multiple single-field indexes to fulfill a query. While helpful, it is almost always less efficient than using a properly designed compound index, because intersection requires computing the intersection of two separate index scans.'
        ],
        whyItMatters: 'Mastering the ESR rule allows developers to create highly optimized indexes that prevent expensive in-memory sorts and reduce examined documents.',
        realWorldExample: 'A dashboard displaying user orders, filtered by a specific tenantId (Equality), sorted by createdAt (Sort), and showing only orders worth more than $100 (Range).',
        code: `// Creating a compound index following ESR
// Equality: tenantId
// Sort: createdAt
// Range: totalAmount
db.orders.createIndex({
  tenantId: 1,
  createdAt: -1,
  totalAmount: 1
});`,
        output: 'Index created to perfectly satisfy complex tenant-based filtering and sorting.',
        commonMistakes: ['Putting range fields before sort fields in the index, forcing MongoDB to do an in-memory sort (SORT stage in explain).', 'Creating compound indexes with array fields (can only have one multikey field per compound index).', 'Creating { a: 1, b: 1 } and also { a: 1 }; the latter is redundant.'],
        bestPractices: ['Strictly apply the ESR rule when evaluating slow queries.', 'Analyze queries requiring sorts to ensure they are covered by an index.', 'Check the explain() output for the presence of a "SORT" stage, which indicates the index didn\'t support the sort.'],
        interviewQuestion: 'Explain the ESR rule for MongoDB compound indexes.',
        practiceQuestion: 'Design an index for a query that filters by "status" (exact), sorts by "priority" (descending), and filters "score" > 50.'
      },
      {
        heading: 'Covered Queries and Prefix',
        explanation: [
          'A covered query is a query that can be entirely satisfied using only an index, without ever inspecting the underlying documents. This happens when all the fields in the query filter and the projection are part of the same index. Because index keys are in RAM, covered queries are extremely fast.',
          'To achieve a covered query, you must explicitly exclude the _id field in the projection (unless it is part of the index), because MongoDB includes it by default, forcing a document lookup to retrieve it.',
          'Index prefixes refer to the beginning subsets of indexed fields. If you have an index on { a: 1, b: 1, c: 1 }, it supports queries on { a: 1 }, { a: 1, b: 1 }, and the full index. It does NOT efficiently support queries on just { b: 1 } or { c: 1 }. Therefore, ordering matters for reusability.'
        ],
        whyItMatters: 'Covered queries are the holy grail of read performance in MongoDB, bypassing disk reads entirely.',
        realWorldExample: 'An autocomplete API fetching just the usernames starting with a specific prefix. An index on { username: 1 } and a query projecting { username: 1, _id: 0 } will cover the query instantly.',
        code: `// Index supports prefix: { category: 1 } and { category: 1, price: 1 }
db.products.createIndex({ category: 1, price: 1 });

// Covered query: filter and projection use only indexed fields
db.products.find(
  { category: "books", price: { $lt: 20 } },
  { category: 1, price: 1, _id: 0 }
).explain("executionStats");`,
        output: 'Explain plan shows totalDocsExamined is 0, confirming a covered query.',
        commonMistakes: ['Forgetting to project away the _id field, silently breaking the covered query.', 'Assuming an index on { a: 1, b: 1 } will make queries filtering only by "b" fast.', 'Creating redundant indexes that are prefixes of existing compound indexes.'],
        bestPractices: ['Design compound indexes that can serve as prefixes for multiple query shapes.', 'Use projections to try and achieve covered queries on hot data paths.', 'Verify covered queries by checking that totalDocsExamined is 0 in executionStats.'],
        interviewQuestion: 'What is a covered query and why is the _id field important in achieving it?',
        practiceQuestion: 'Write a covered query for a collection with an index on { brand: 1, model: 1 }.'
      }
    ]
  },
  {
    id: 'aggregation-framework',
    slug: 'aggregation-framework',
    technology: 'mongodb',
    title: 'Aggregation Framework',
    category: 'MongoDB',
    description: 'Pipeline concept, $match, $group, $project, $sort, $limit, $unwind, accumulator expressions.',
    section: '13. MongoDB',
    level: 7,
    difficulty: 'intermediate',
    prerequisites: ['crud-operations'],
    concepts: ['Pipeline', '$match', '$group', '$project', '$unwind'],
    progress: 0,
    toc: ['Pipeline Fundamentals', 'Grouping and Shaping Data'],
    references,
    sections: [
      {
        heading: 'Pipeline Fundamentals',
        explanation: [
          'The Aggregation Framework is MongoDB\'s advanced tool for analyzing and transforming data. It operates on the concept of a pipeline, analogous to Unix pipes. Documents enter the pipeline, pass through various stages which filter, transform, or aggregate them, and exit as computed results.',
          'The $match stage filters documents. It behaves exactly like standard query filters in find(). Placing $match as early as possible in the pipeline is crucial, as it reduces the number of documents passed to subsequent stages and can utilize indexes.',
          'Stages like $sort, $skip, and $limit control the order and number of documents flowing through. Like $match, if $sort is at the beginning of the pipeline (before any data modification), it can utilize B-tree indexes.'
        ],
        whyItMatters: 'Aggregation allows performing complex data processing inside the database, reducing data transfer and leveraging database-level optimizations.',
        realWorldExample: 'Filtering for active orders, sorting them by date, and limiting to the top 100 before passing them to a computationally heavy grouping stage.',
        code: `db.orders.aggregate([
  // Match uses indexes if placed first
  { $match: { status: "completed", date: { $gte: new ISODate("2023-01-01") } } },
  { $sort: { date: -1 } },
  { $limit: 100 }
]);`,
        output: 'Returns the 100 most recent completed orders efficiently.',
        commonMistakes: ['Placing $match after a $group stage when the filter could have been applied before grouping (wasting compute).', 'Performing data transformations in application code that could be done natively in the aggregation pipeline.', 'Not utilizing indexes due to bad stage ordering.'],
        bestPractices: ['Always put $match and $sort stages at the very beginning of the pipeline if possible.', 'Use explain on aggregates to verify index usage.', 'Keep pipelines readable by commenting individual stages.'],
        interviewQuestion: 'Why is the placement of the $match stage critical in an aggregation pipeline?',
        practiceQuestion: 'Write a pipeline that matches documents with type "A", sorts by "value" descending, and limits to 5.'
      },
      {
        heading: 'Grouping and Shaping Data',
        explanation: [
          'The $group stage is the heart of data aggregation. It groups documents by a specified _id expression and computes accumulated values for each group. You use accumulators like $sum, $avg, $max, $min, and $push within the $group stage to perform calculations across the grouped documents.',
          'The $unwind stage deconstructs an array field from the input documents, outputting one document for each element of the array. If a document has an array with 5 elements, $unwind will output 5 documents. This is essential for grouping or filtering based on elements inside arrays.',
          'The $project stage reshapes documents. It can include, exclude, or rename fields, and compute new fields using expression operators. It is similar to a SELECT statement in SQL but much more powerful, allowing for complex string manipulation, arithmetic, and conditional logic ($cond).'
        ],
        whyItMatters: 'These stages enable complex analytics, reporting, and data reshaping without needing an external ETL tool.',
        realWorldExample: 'Unwinding an array of purchased items inside an order document, grouping by the item ID, and summing the quantities to find the top-selling products.',
        code: `db.orders.aggregate([
  { $match: { status: "completed" } },
  { $unwind: "$items" },
  { $group: {
      _id: "$items.productId",
      totalSold: { $sum: "$items.quantity" },
      revenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }
  }},
  { $sort: { totalSold: -1 } },
  { $project: {
      productId: "$_id",
      totalSold: 1,
      revenue: 1,
      _id: 0
  }}
]);`,
        output: 'Returns top-selling products, their total sold count, and revenue generated.',
        commonMistakes: ['Forgetting the "$" prefix when referencing fields in expressions (e.g., writing "items" instead of "$items").', 'Unwinding very large arrays without a preceding $match, causing memory exhaustion.', 'Grouping by a field that has low cardinality and high document counts without sufficient memory limits.'],
        bestPractices: ['Filter data with $match before using $unwind.', 'Use $project to clean up the output document structure before returning to the client.', 'Use $sum: 1 to count documents in a group.'],
        interviewQuestion: 'Explain what the $unwind stage does and why it is commonly used before $group.',
        practiceQuestion: 'Write a group stage that groups by "department" and calculates the average "salary".'
      }
    ]
  },
  {
    id: 'aggregation-pipeline-stages',
    slug: 'aggregation-pipeline-stages',
    technology: 'mongodb',
    title: 'Aggregation Pipeline Stages',
    category: 'MongoDB',
    description: '$addFields, $bucket, $facet, $replaceRoot, $merge, $out, pipeline optimization.',
    section: '13. MongoDB',
    level: 8,
    difficulty: 'intermediate',
    prerequisites: ['aggregation-framework'],
    concepts: ['Advanced Pipelines', '$facet', '$bucket', '$merge'],
    progress: 0,
    toc: ['Data Transformation', 'Faceted Search and Output'],
    references,
    sections: [
      {
        heading: 'Data Transformation Stages',
        explanation: [
          '$addFields (or $set) adds new fields to documents or replaces existing ones. Unlike $project, which requires you to explicitly include all existing fields you want to keep, $addFields simply appends the new fields to the existing document structure. This is much cleaner when you just want to compute one new field.',
          '$replaceRoot replaces the input document with a specified embedded document. This promotes a subdocument to the top level, completely replacing all other fields. It is incredibly useful after a $lookup or $group stage where the data you want is nested inside an array or object.',
          'Pipeline optimization is handled automatically by MongoDB. The query optimizer evaluates the pipeline and often reshuffles stages for performance. For example, it might push a $match stage ahead of a $project stage, or combine a $sort and $limit into a Top-K operation to save memory.'
        ],
        whyItMatters: 'Advanced transformation stages simplify pipeline code and make manipulating nested data structures effortless.',
        realWorldExample: 'Calculating a total price dynamically by adding shipping costs, then replacing the root with a newly formatted order object for a downstream API.',
        code: `db.orders.aggregate([
  { $addFields: { 
      totalWithTax: { $multiply: ["$total", 1.15] } 
  }},
  { $replaceRoot: { 
      newRoot: { 
        orderId: "$_id", 
        amount: "$totalWithTax",
        customerInfo: "$customer" 
      } 
  }}
]);`,
        output: 'Documents are transformed, adding computed fields and flattening the structure.',
        commonMistakes: ['Using $project to add a single field and forgetting to include all other necessary fields (use $addFields instead).', 'Failing to realize that $replaceRoot requires the newRoot to be an object.', 'Assuming pipeline stages execute strictly in the order written, ignoring optimizer rewrites.'],
        bestPractices: ['Use $addFields instead of $project when keeping most original fields.', 'Leverage the explain plan for aggregations to see how the optimizer rewrote your pipeline.', 'Handle null or missing fields gracefully when using $replaceRoot.'],
        interviewQuestion: 'What is the difference between $addFields and $project?',
        practiceQuestion: 'Write a pipeline that adds a boolean field "isExpensive" if the price is over 100.'
      },
      {
        heading: 'Faceted Search and Output',
        explanation: [
          'The $bucket stage categorizes incoming documents into groups, called buckets, based on a specified expression and bucket boundaries. This is highly useful for creating histograms or range-based aggregations (e.g., grouping users by age ranges).',
          'The $facet stage processes multiple aggregation pipelines within a single stage on the same set of input documents. It outputs a single document containing arrays of results for each pipeline. This is the cornerstone of building e-commerce style faceted searches (e.g., getting counts for categories, price ranges, and brands in one query).',
          'The $out and $merge stages write the results of an aggregation pipeline to a collection. $out replaces an existing collection completely or creates a new one. $merge is more powerful, allowing you to merge results into an existing collection (upsert, update, or insert), enabling materialized views and incremental data aggregation.'
        ],
        whyItMatters: 'Faceted search powers modern UIs, and $merge enables materialized views to pre-calculate heavy analytical queries.',
        realWorldExample: 'An e-commerce sidebar that shows product counts by price ranges and brands simultaneously, powered by a single $facet query to reduce database round-trips.',
        code: `db.products.aggregate([
  { $facet: {
      "priceRanges": [
        { $bucket: {
            groupBy: "$price",
            boundaries: [0, 50, 100, 500],
            default: "500+",
            output: { count: { $sum: 1 } }
        }}
      ],
      "byCategory": [
        { $group: { _id: "$category", count: { $sum: 1 } } }
      ]
  }}
]);`,
        output: 'Returns a single document with multiple arrays representing different analytical views.',
        commonMistakes: ['Overusing $facet for extremely large datasets without pre-filtering, causing excessive memory consumption.', 'Using $out on a production collection and accidentally overwriting all existing data.', 'Creating overlapping boundaries in $bucket, which is invalid.'],
        bestPractices: ['Filter data as much as possible before it enters a $facet stage.', 'Use $merge for creating updating materialized views on a schedule.', 'Ensure $bucket boundaries encompass all expected values or provide a default.'],
        interviewQuestion: 'How does the $facet stage improve performance for complex UI dashboard queries?',
        practiceQuestion: 'Write a $bucket stage grouping users by age ranges: 0-18, 18-35, 35-65.'
      }
    ]
  },
  {
    id: 'lookup-joins',
    slug: 'lookup-joins',
    technology: 'mongodb',
    title: 'Lookup & Joins',
    category: 'MongoDB',
    description: '$lookup syntax, pipeline $lookup, correlated subqueries, performance considerations.',
    section: '13. MongoDB',
    level: 9,
    difficulty: 'intermediate',
    prerequisites: ['aggregation-framework'],
    concepts: ['$lookup', 'Joins', 'Correlated Subqueries', 'Performance'],
    progress: 0,
    toc: ['Basic and Pipeline Lookups', 'Performance and Best Practices'],
    references,
    sections: [
      {
        heading: 'Basic and Pipeline Lookups',
        explanation: [
          'The $lookup stage performs a left outer join to a collection in the same database to filter in documents from the "joined" collection for processing. The basic syntax uses localField and foreignField to match documents. It returns an array of matched documents appended to the input document.',
          'MongoDB 3.6 introduced the pipeline syntax for $lookup, which is much more powerful. Instead of simple field matching, you can define variables (let) from the local document and run a full nested aggregation pipeline on the foreign collection. This allows you to filter, sort, limit, or aggregate the joined documents before they are attached to the main document.',
          'Correlated subqueries refer to these pipeline lookups where the inner pipeline references fields from the outer pipeline using the variables defined in the "let" block. This allows for complex joins, like joining only the top 3 most recent reviews for a product.'
        ],
        whyItMatters: '$lookup bridges the gap between MongoDB\'s document model and relational needs, handling cases where data cannot be reasonably embedded.',
        realWorldExample: 'Fetching a list of blog posts and joining only the 5 most recent comments for each post, avoiding pulling thousands of comments per post.',
        code: `// Pipeline $lookup
db.posts.aggregate([
  {
    $lookup: {
      from: "comments",
      let: { postId: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$post_id", "$$postId"] } } },
        { $sort: { createdAt: -1 } },
        { $limit: 5 } // Only get top 5 comments
      ],
      as: "recentComments"
    }
  }
]);`,
        output: 'Returns posts, each containing a recentComments array with up to 5 joined comment documents.',
        commonMistakes: ['Forgetting that $lookup always outputs an array, even if joining a 1:1 relationship.', 'Not indexing the foreign field in the target collection, leading to massive performance degradation.', 'Using $lookup instead of schema redesign (embedding) when relationships are inherently tight.'],
        bestPractices: ['Always index the foreignField in the target collection.', 'Use $unwind after a 1:1 $lookup to flatten the array back into an object.', 'Use the pipeline syntax to limit and project joined documents to reduce memory usage.'],
        interviewQuestion: 'When would you use the pipeline syntax for $lookup over the basic localField/foreignField syntax?',
        practiceQuestion: 'Write a basic $lookup joining a "users" collection based on an "authorId" field.'
      },
      {
        heading: 'Performance and Considerations',
        explanation: [
          'While powerful, $lookup is a computationally expensive operation. Because it is a left outer join, for every document in the local collection, MongoDB must execute a query against the foreign collection. If the foreign collection is large and lacks an index on the join key, the query will perform a collection scan for every input document, resulting in a Cartesian explosion of work.',
          'Memory limits are a critical consideration. The result of a $lookup is stored in memory as an array in the output document. If a single document joins hundreds of thousands of related documents, it will exceed the 16MB BSON limit or the 100MB aggregation memory limit, causing the pipeline to fail.',
          'To optimize lookups, always ensure the foreign collection has an index on the join field. Furthermore, filter the local collection as much as possible using a $match stage before the $lookup stage to minimize the number of joins executed.'
        ],
        whyItMatters: 'Misusing $lookup can bring a MongoDB cluster to a halt. Understanding its performance characteristics is vital for scalable applications.',
        realWorldExample: 'A system failing in production because a $lookup on an unindexed foreign key of 1 million records caused the database CPU to spike to 100%.',
        code: `// Ensure index on the foreign collection before running lookup!
db.comments.createIndex({ post_id: 1 });

db.posts.aggregate([
  { $match: { status: "published" } }, // Filter FIRST to reduce lookups
  {
    $lookup: {
      from: "comments",
      localField: "_id",
      foreignField: "post_id",
      as: "comments"
    }
  }
]);`,
        output: 'Efficient join execution utilizing indexes.',
        commonMistakes: ['Joining large collections without filtering the primary collection first.', 'Joining huge 1-to-N relationships that exceed the 16MB document limit.', 'Relying heavily on joins for read-heavy operations instead of denormalizing data.'],
        bestPractices: ['Denormalize data to avoid $lookup on highly read, performance-critical paths.', 'Monitor slow queries to identify unindexed lookups.', 'Use $lookup primarily for reporting, analytics, or administrative dashboards.'],
        interviewQuestion: 'What is the most common reason a $lookup stage causes severe performance degradation, and how do you fix it?',
        practiceQuestion: 'Explain how you would optimize a pipeline that joins all users to all their activity logs.'
      }
    ]
  },
  {
    id: 'transactions',
    slug: 'transactions',
    technology: 'mongodb',
    title: 'Transactions',
    category: 'MongoDB',
    description: 'Multi-document transactions, session, startTransaction, commitTransaction, abortTransaction.',
    section: '13. MongoDB',
    level: 10,
    difficulty: 'advanced',
    prerequisites: ['replica-sets'],
    concepts: ['ACID', 'Sessions', 'Write Concern', 'Read Concern'],
    progress: 0,
    toc: ['Multi-Document Transactions', 'Concerns and Limitations'],
    references,
    sections: [
      {
        heading: 'Multi-Document Transactions',
        explanation: [
          'In MongoDB, operations on a single document are always atomic. However, operations spanning multiple documents, collections, or databases require multi-document transactions to guarantee ACID (Atomicity, Consistency, Isolation, Durability) properties. Transactions ensure that either all operations succeed, or none are applied, preventing partial updates.',
          'Transactions are tied to a logical Session. You start a session, initiate a transaction on that session, pass the session object to all database operations involved in the transaction, and finally commit or abort the transaction. If an error occurs, the transaction is aborted, and changes are rolled back.',
          'MongoDB transactions are distributed and work across replica sets and sharded clusters. However, they incur a performance penalty due to lock acquisition and coordination overhead. They should not be used as a replacement for good schema design (e.g., embedding related data in a single document).'
        ],
        whyItMatters: 'Transactions are essential for critical workflows where data consistency across multiple records is non-negotiable, such as financial transfers.',
        realWorldExample: 'Transferring funds between two bank accounts. Deducting from Account A and adding to Account B must occur transactionally; otherwise, a crash midway creates or destroys money.',
        code: `const session = client.startSession();
session.startTransaction({
  readConcern: { level: 'snapshot' },
  writeConcern: { w: 'majority' }
});

try {
  await accounts.updateOne({ _id: accountA }, { $inc: { balance: -100 } }, { session });
  await accounts.updateOne({ _id: accountB }, { $inc: { balance: 100 } }, { session });
  
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
} finally {
  session.endSession();
}`,
        output: 'Transaction ensures both updates succeed or both fail.',
        commonMistakes: ['Forgetting to pass the session object to the CRUD operations, causing them to execute outside the transaction.', 'Using transactions for everything, ignoring MongoDB\'s document model strengths.', 'Leaving transactions open too long, causing massive lock contention.'],
        bestPractices: ['Keep transactions as short as possible to minimize locks.', 'Handle transient transaction errors (like network issues) by implementing retry logic.', 'Only use transactions when single-document updates cannot model the logic.'],
        interviewQuestion: 'Why should you prefer single-document modeling over multi-document transactions in MongoDB whenever possible?',
        practiceQuestion: 'Write pseudo-code to start a session and transaction.'
      },
      {
        heading: 'Concerns and Limitations',
        explanation: [
          'When starting a transaction, you can configure Read and Write Concerns. A write concern of "majority" ensures the transaction is committed to a majority of replica set members before acknowledging success. A read concern of "snapshot" provides a consistent snapshot of the data, ensuring the transaction reads data isolated from concurrent writes.',
          'Transactions cannot create collections or indexes. If you attempt a write operation in a transaction against a collection that does not exist, the transaction will fail. You must explicitly create collections before accessing them within a transaction.',
          'Transactions have a default execution time limit (usually 60 seconds). If a transaction exceeds this limit, the database automatically aborts it to prevent holding locks indefinitely. This enforces the best practice of keeping transactional work quick and strictly bounded.'
        ],
        whyItMatters: 'Understanding read/write concerns in transactions guarantees data durability and prevents dirty reads in distributed systems.',
        realWorldExample: 'An inventory system where a "snapshot" read concern ensures that reading stock levels during a complex checkout transaction isn\'t affected by concurrent restock operations.',
        code: `// Configuring concerns
const transactionOptions = {
  readPreference: 'primary',
  readConcern: { level: 'local' },
  writeConcern: { w: 'majority' }
};

session.startTransaction(transactionOptions);`,
        output: 'Transaction started with specific distributed constraints.',
        commonMistakes: ['Attempting DDL operations (like createIndex) inside a transaction.', 'Using write concern w: 1 for financial transactions, risking data rollback in a primary failover.', 'Processing heavy application logic (e.g., API calls, image processing) while a transaction is open.'],
        bestPractices: ['Always use w: majority for transactions to ensure durability.', 'Prepare all necessary data and calculations before starting the transaction.', 'Pre-create necessary collections before using transactions.'],
        interviewQuestion: 'What happens if a MongoDB transaction runs for longer than the configured max transaction duration?',
        practiceQuestion: 'What write concern ensures data is written to most nodes before returning success?'
      }
    ]
  },
  // To keep payload size reasonable while meeting all requirements, I will output the remaining requested lessons with full details.
  {
    id: 'replication',
    slug: 'replication',
    technology: 'mongodb',
    title: 'Replication',
    category: 'MongoDB',
    description: 'Replica sets, primary/secondary, elections, oplog, read preferences, write concerns.',
    section: '13. MongoDB',
    level: 11,
    difficulty: 'advanced',
    prerequisites: ['transactions'],
    concepts: ['Replica Set', 'Oplog', 'Elections', 'Read Preference'],
    progress: 0,
    toc: ['Replica Sets and High Availability', 'Oplog and Consistency'],
    references,
    sections: [
      {
        heading: 'Replica Sets and High Availability',
        explanation: [
          'A replica set is a group of mongod instances that maintain the same data set. Replica sets provide redundancy and high availability. The set consists of a Primary node and multiple Secondary nodes. The primary receives all write operations. Secondaries replicate the primary\'s operations to maintain an identical dataset.',
          'If the primary becomes unavailable, an election mechanism automatically triggers. The remaining members hold a vote, and a secondary is elected as the new primary based on priority and up-to-date data. This automatic failover ensures the database remains online without manual intervention.',
          'Clients can configure read preferences to direct read operations to specific members. "primary" (default) reads strictly from the primary. "secondary" reads only from secondaries, useful for distributing read-heavy analytical workloads, though it introduces the risk of stale reads due to replication lag.'
        ],
        whyItMatters: 'Replication is the backbone of production MongoDB deployments, ensuring data survives hardware failures and data center outages.',
        realWorldExample: 'A production app with a 3-node replica set. When the primary server crashes due to a hardware fault, a secondary is elected primary within seconds, and the app continues with minimal disruption.',
        code: `// Client connection with read preference
const uri = "mongodb://node1,node2,node3/db?replicaSet=rs0&readPreference=secondaryPreferred";
const client = new MongoClient(uri);`,
        output: 'Client connects to the replica set and prefers reading from secondaries.',
        commonMistakes: ['Deploying an even number of nodes, leading to split-brain scenarios or failed elections (always use a tiebreaker/arbiter if needed).', 'Running analytical queries on the primary, starving production writes of CPU.', 'Ignoring replication lag monitoring.'],
        bestPractices: ['Deploy at least a 3-node replica set (Primary, Secondary, Secondary).', 'Use "secondaryPreferred" for non-critical reads to offload the primary.', 'Monitor replica lag alerts.'],
        interviewQuestion: 'What happens during a MongoDB election, and why is an odd number of voting nodes required?',
        practiceQuestion: 'What read preference guarantees you will read the most recently written data?'
      },
      {
        heading: 'Oplog and Consistency',
        explanation: [
          'The oplog (operations log) is a special capped collection that keeps a rolling record of all operations that modify data on the primary. Secondaries continuously query the primary\'s oplog and apply those operations to their own data sets in an idempotent manner.',
          'Because the oplog is capped, it has a maximum size. If a secondary goes offline for longer than the oplog window (the time it takes for new operations to overwrite the old ones), it becomes "stale" and must perform a full initial sync to catch up, which is resource-intensive.',
          'Write concerns govern data durability guarantees. A write concern of {w: 1} acknowledges the write once the primary writes it to memory. {w: "majority"} acknowledges only after the write is persisted to the journal of a majority of the replica set members, preventing rollbacks during failovers.'
        ],
        whyItMatters: 'Understanding the oplog is critical for operational monitoring, and write concerns allow tuning the tradeoff between write speed and data durability.',
        realWorldExample: 'Configuring a large oplog size for a cluster undergoing massive batch imports, ensuring secondaries don\'t fall out of sync during the high-write period.',
        code: `// Write concern majority guarantees replication
db.users.insertOne(
  { username: "secureUser" },
  { writeConcern: { w: "majority", j: true } }
);`,
        output: 'Write is acknowledged only after being securely replicated and journaled.',
        commonMistakes: ['Setting the oplog size too small for the cluster\'s write volume.', 'Using {w: 1} for critical financial data, risking a rollback if the primary crashes before replicating.', 'Assuming replication is completely instantaneous.'],
        bestPractices: ['Ensure the oplog window covers at least 24 hours of normal write volume.', 'Always use {w: "majority"} for critical data.', 'Monitor the "replication lag" metric closely.'],
        interviewQuestion: 'Explain the role of the oplog in MongoDB replication.',
        practiceQuestion: 'What happens if a secondary node is offline for a period longer than the oplog window?'
      }
    ]
  },
  {
    id: 'sharding',
    slug: 'sharding',
    technology: 'mongodb',
    title: 'Sharding',
    category: 'MongoDB',
    description: 'Shard keys, chunks, balancer, hashed vs ranged sharding, mongos router.',
    section: '13. MongoDB',
    level: 12,
    difficulty: 'advanced',
    prerequisites: ['replication'],
    concepts: ['Sharding', 'Shard Key', 'mongos', 'Balancer'],
    progress: 0,
    toc: ['Architecture and Shard Keys', 'Routing and Balancing'],
    references,
    sections: [
      {
        heading: 'Architecture and Shard Keys',
        explanation: [
          'Sharding is MongoDB\'s method for meeting the demands of data growth by horizontally scaling across multiple machines. A sharded cluster consists of shards (replica sets storing subset of data), config servers (storing metadata and routing info), and mongos query routers (entry points for clients).',
          'Data is partitioned across shards based on a Shard Key, which consists of one or more fields from the document. Choosing the right shard key is the most critical design decision. A bad shard key leads to uneven data distribution (jumbo chunks) or hot spots, bottlenecking the entire cluster.',
          'There are two main sharding strategies: Ranged and Hashed. Ranged sharding divides data into contiguous ranges based on the shard key values, which is great for range queries but can cause hot spots on monotonic keys (like timestamps). Hashed sharding computes a hash of the shard key value, distributing data randomly and evenly, preventing hot spots but making range queries inefficient.'
        ],
        whyItMatters: 'Sharding allows MongoDB to scale to petabytes of data and massive throughput, but poor shard key selection can ruin performance permanently.',
        realWorldExample: 'A global logging system using hashed sharding on the `tenantId` to ensure writes from active tenants are spread evenly across all servers, preventing one server from being overwhelmed.',
        code: `// Enable sharding on database
sh.enableSharding("myDatabase");

// Shard collection using a hashed key for even distribution
sh.shardCollection("myDatabase.logs", { tenantId: "hashed" });`,
        output: 'Collection is distributed across available shards.',
        commonMistakes: ['Choosing a monotonically increasing field (like ObjectIds or timestamps) for a ranged shard key, sending all writes to a single shard.', 'Sharding too early before data volume or throughput requires it, adding unnecessary operational complexity.', 'Changing a shard key later (historically impossible, now very difficult).'],
        bestPractices: ['Choose a shard key with high cardinality and even write distribution.', 'Ensure the shard key is present in all documents in the collection.', 'Avoid sharding until vertical scaling is no longer cost-effective.'],
        interviewQuestion: 'What is a "hot shard", and how does hashed sharding prevent it?',
        practiceQuestion: 'What type of sharding strategy would you use for a time-series collection where you frequently run queries like $gt: startDate?'
      },
      {
        heading: 'Routing and Balancing',
        explanation: [
          'The mongos instance acts as a query router, providing an interface between client applications and the sharded cluster. When a client sends a query, the mongos inspects the config servers, determines which shards contain the data, routes the query, and merges the results back to the client. This is entirely transparent to the application.',
          'To maintain even data distribution, MongoDB uses a background process called the Balancer. It monitors the number of "chunks" (logical groupings of data) on each shard. If one shard has significantly more chunks than others, the balancer automatically migrates chunks from overloaded shards to underloaded ones.',
          'Queries that include the shard key in their filter can be routed directly to the specific shard holding that data (Targeted Query). Queries without the shard key must be broadcast to all shards (Scatter-Gather Query), which is less efficient. Therefore, your most common queries should include the shard key.'
        ],
        whyItMatters: 'Understanding how mongos routes queries helps developers write applications that utilize the distributed nature of the cluster efficiently.',
        realWorldExample: 'In a multi-tenant SaaS application sharded by `tenantId`, all queries include `tenantId`. The mongos routes each request precisely to one shard, keeping response times low.',
        code: `// Targeted query (efficient)
db.users.find({ tenantId: "tenant_123", status: "active" });

// Scatter-gather query (inefficient on large clusters)
db.users.find({ status: "active" });`,
        output: 'Targeted query hits 1 shard. Scatter-gather hits all shards.',
        commonMistakes: ['Writing applications that frequently execute scatter-gather queries.', 'Turning off the balancer and forgetting to turn it back on.', 'Deploying mongos instances on undersized machines, bottlenecking network traffic.'],
        bestPractices: ['Always include the shard key in your primary application queries.', 'Deploy mongos routers close to your application servers to reduce latency.', 'Monitor chunk migrations and balancer locks.'],
        interviewQuestion: 'Explain the difference between a Targeted query and a Scatter-Gather query in a sharded cluster.',
        practiceQuestion: 'What component in a sharded cluster stores the mapping of chunks to shards?'
      }
    ]
  },
  {
    id: 'schema-design-patterns',
    slug: 'schema-design-patterns',
    technology: 'mongodb',
    title: 'Schema Design Patterns',
    category: 'MongoDB',
    description: 'Attribute pattern, bucket pattern, computed pattern, subset pattern, outlier pattern, tree structures.',
    section: '13. MongoDB',
    level: 13,
    difficulty: 'intermediate',
    prerequisites: ['documents-collections'],
    concepts: ['Design Patterns', 'Bucketing', 'Computed Pattern', 'Subset Pattern'],
    progress: 0,
    toc: ['Common Structural Patterns', 'Optimization Patterns'],
    references,
    sections: [
      {
        heading: 'Common Structural Patterns',
        explanation: [
          'MongoDB schema design focuses on application access patterns rather than normalized data storage. The Attribute Pattern is used when documents have many similar fields but only a subset are present in any given document, or when you need to sort/query on multiple disparate fields. It involves moving these fields into an array of key-value objects.',
          'The Bucket Pattern is essential for IoT and time-series data. Instead of storing one document per sensor reading, readings are grouped (bucketed) by time (e.g., one document per hour containing an array of 60 minute-readings). This drastically reduces the number of documents, index size, and storage overhead.',
          'Tree structures can be modeled in several ways. The Materialized Paths pattern stores the full lineage of a node as a string (e.g., ",Books,Programming,Databases,"), making it easy to query subtrees using regular expressions. The Parent Reference pattern stores just the immediate parent, which is simpler but requires recursive queries or $graphLookup to traverse.'
        ],
        whyItMatters: 'Applying the right pattern resolves structural limitations, reduces index size, and optimizes for the specific way the application queries data.',
        realWorldExample: 'An e-commerce product catalog using the Attribute Pattern to store product specifications (size, color, material) so they can be indexed with a single multikey index.',
        code: `// Attribute Pattern
{
  name: "Laptop",
  specs: [
    { k: "RAM", v: "16GB" },
    { k: "Storage", v: "512GB SSD" }
  ]
}
// Index: { "specs.k": 1, "specs.v": 1 }

// Bucket Pattern
{
  sensorId: 1,
  start_date: ISODate("2023-10-01T00:00:00Z"),
  end_date: ISODate("2023-10-01T23:59:59Z"),
  measurements: [ { time: ..., temp: 22 }, { time: ..., temp: 23 } ]
}`,
        output: 'Schemas optimized for indexing and reduced storage overhead.',
        commonMistakes: ['Creating hundreds of sparse indexes instead of using the Attribute Pattern.', 'Storing millions of tiny time-series documents without bucketing.', 'Using complex graph lookups for simple hierarchical data that could use materialized paths.'],
        bestPractices: ['Use the Attribute pattern when fields share common characteristics.', 'Use Bucketing for data streams and sensor telemetry.', 'Choose tree structures based on read-vs-write frequency.'],
        interviewQuestion: 'How does the Bucket pattern improve performance for time-series data in MongoDB?',
        practiceQuestion: 'Model a file system directory structure using the Materialized Paths pattern.'
      },
      {
        heading: 'Optimization Patterns',
        explanation: [
          'The Computed Pattern is used when data access patterns are read-heavy, and calculations (like sums or averages) are repeatedly executed on the fly. Instead of computing on read, you compute on write. For example, maintaining a `totalRevenue` field on a user document that increments whenever an order is placed.',
          'The Subset Pattern addresses the working set size. If a document is large, but the application only frequently accesses a small portion of it, split the document. Keep the frequently accessed fields (the subset) in the main collection, and move the rarely accessed fields to a secondary collection linked by ID.',
          'The Outlier Pattern handles anomalies in data distribution. If 99% of users have < 100 friends (embedded array), but celebrities have millions, embedding breaks the 16MB limit. The Outlier pattern flags the celebrity document (e.g., `hasExtraFriends: true`) and overflows their friends into a separate collection, keeping the schema optimized for the 99%.'
        ],
        whyItMatters: 'Optimization patterns ensure databases scale gracefully, keeping memory usage low and read latency minimal.',
        realWorldExample: 'A movie database where a movie document embeds the top 5 most recent reviews (Subset pattern) to render the page quickly, while the full thousands of reviews are stored in a separate collection.',
        code: `// Subset Pattern: Main Document
{
  _id: 1,
  title: "Inception",
  recentReviews: [ { rating: 5, text: "Great!" } ], // Subset of data
  hasMoreReviews: true
}

// Outlier Pattern
{
  _id: "celeb_user",
  friends: [ ... 1000 friends ... ],
  hasOutlierFriends: true // Flag to check secondary collection
}`,
        output: 'Optimizes RAM usage by keeping working set small.',
        commonMistakes: ['Ignoring the 16MB document limit until production crashes on a celebrity profile.', 'Computing heavy aggregations on every page load instead of pre-computing.', 'Loading huge documents into memory when only 2 fields are needed.'],
        bestPractices: ['Pre-compute data if the read-to-write ratio is high (e.g., 1000 reads per 1 write).', 'Keep documents small and focused on the immediate UI requirement.', 'Design for the common case, but handle the outliers explicitly.'],
        interviewQuestion: 'Explain the Outlier pattern and when you would use it.',
        practiceQuestion: 'How would you apply the Computed Pattern to a blog post to track the number of views?'
      }
    ]
  },
  {
    id: 'embedding-vs-referencing',
    slug: 'embedding-vs-referencing',
    technology: 'mongodb',
    title: 'Embedding vs Referencing',
    category: 'MongoDB',
    description: 'When to embed vs reference, one-to-one, one-to-many, many-to-many, denormalization trade-offs.',
    section: '13. MongoDB',
    level: 14,
    difficulty: 'intermediate',
    prerequisites: ['schema-design-patterns'],
    concepts: ['Embedding', 'Referencing', 'Denormalization', 'Data Modeling'],
    progress: 0,
    toc: ['Embedding Data', 'Referencing Data and Trade-offs'],
    references,
    sections: [
      {
        heading: 'Embedding Data',
        explanation: [
          'Embedding data stores related information in a single document. This aligns with MongoDB\'s document-oriented philosophy. Embedding is ideal for "contains" relationships and one-to-one or one-to-few relationships. Because data is grouped together, retrieving a document and its embedded data requires only a single disk read.',
          'Embedding is highly performant for read operations. It also allows you to update related data in a single atomic write operation. If you have an Order document, embedding the shipping address directly makes sense because the address is intrinsically tied to that specific order.',
          'However, embedding has limitations. The primary constraint is the 16MB document size limit. If an embedded array grows unboundedly (an anti-pattern known as a massive array), it will eventually crash the application and cause severe memory and performance degradation as the document constantly moves on disk to accommodate growth.'
        ],
        whyItMatters: 'Embedding maximizes MongoDB\'s performance advantages by minimizing database round-trips.',
        realWorldExample: 'A user profile containing an array of the user\'s multiple email addresses or phone numbers. The data is small, bounded, and always retrieved together.',
        code: `// Good Use of Embedding
{
  _id: "user123",
  name: "Jane Doe",
  contact: {
    primaryEmail: "jane@example.com",
    phones: [
      { type: "work", number: "555-1234" },
      { type: "home", number: "555-5678" }
    ]
  }
}`,
        output: 'Atomic updates and single-read retrieval.',
        commonMistakes: ['Embedding unbounded one-to-many relationships (e.g., embedding all log events inside a user document).', 'Embedding data that is frequently updated independently from the parent document.', 'Deeply nesting data (more than 3-4 levels) making queries complex.'],
        bestPractices: ['Embed data that is queried together.', 'Ensure embedded arrays will not grow indefinitely.', 'Use embedding to guarantee atomic updates across related entities.'],
        interviewQuestion: 'What is the main physical limitation that prevents you from embedding all related data in MongoDB?',
        practiceQuestion: 'Design a document structure for a blog post with embedded tags.'
      },
      {
        heading: 'Referencing Data and Trade-offs',
        explanation: [
          'Referencing data (normalization) involves storing relationships by including links or references (usually ObjectIds) from one document to another. This is similar to foreign keys in SQL. Referencing is essential for one-to-many (where the "many" is large) and many-to-many relationships.',
          'When you reference data, retrieving the combined data requires multiple queries or the use of the $lookup aggregation stage. This introduces latency and consumes more database resources compared to embedding. However, referencing provides flexibility, prevents document bloat, and avoids data duplication.',
          'Denormalization is the strategic duplication of data to improve read performance. For example, instead of just storing the `authorId` in a post, you might store `{ authorId: ObjectId, authorName: "John" }`. This allows you to render the post UI without an extra lookup. The trade-off is that if John changes his name, you must execute a multi-document update to fix all his posts.'
        ],
        whyItMatters: 'Balancing normalization and denormalization is the core challenge of NoSQL data modeling.',
        realWorldExample: 'A social network where Users are in one collection and Posts in another. The Post contains a reference to the User `authorId`. Because a user might author thousands of posts, embedding them would break the 16MB limit.',
        code: `// Referencing Pattern
// users collection
{ _id: ObjectId("U1"), name: "Alice" }

// posts collection (with denormalized author name)
{ 
  _id: ObjectId("P1"), 
  title: "MongoDB Modeling",
  author: {
    id: ObjectId("U1"),
    name: "Alice" // Denormalized for fast reads
  }
}`,
        output: 'Flexible schema with fast reads but complex updates.',
        commonMistakes: ['Normalizing everything like a relational database, causing excessive use of $lookup.', 'Denormalizing fields that change very frequently, causing write bottlenecks.', 'Creating circular references that are hard to manage.'],
        bestPractices: ['Reference data for one-to-squillions relationships.', 'Denormalize read-heavy, rarely changed fields (like a username or category name).', 'Use embedding for "part-of" relationships and referencing for "related-to" relationships.'],
        interviewQuestion: 'When would you choose to denormalize data by copying a field from one collection to another?',
        practiceQuestion: 'Model a many-to-many relationship between Students and Courses using references.'
      }
    ]
  },
  {
    id: 'mongodb-performance',
    slug: 'mongodb-performance',
    technology: 'mongodb',
    title: 'MongoDB Performance',
    category: 'MongoDB',
    description: 'Profiler, slow query log, connection pooling, WiredTiger, memory usage.',
    section: '13. MongoDB',
    level: 15,
    difficulty: 'advanced',
    prerequisites: ['indexes'],
    concepts: ['Profiler', 'WiredTiger', 'Connection Pools', 'Memory'],
    progress: 0,
    toc: ['Monitoring and Profiling', 'Engine and Architecture'],
    references,
    sections: [
      {
        heading: 'Monitoring and Profiling',
        explanation: [
          'The MongoDB Database Profiler collects detailed information about database commands. You can configure it to log all operations, or more commonly, only operations that take longer than a specified threshold (e.g., > 100ms). The profiler writes this data to the `system.profile` capped collection, which you can query to identify bottlenecks.',
          'In production, relying on the slow query log is standard practice. Monitoring tools analyze these logs to find queries missing indexes, performing large in-memory sorts, or returning massive datasets. Tools like MongoDB Atlas provide visual query profilers that highlight exact problem areas.',
          'Connection pooling is critical for application performance. Opening a new TCP connection to MongoDB is expensive. Drivers maintain a pool of reusable connections. If an application sets the pool size too low, requests will queue up waiting for connections. If set too high, the database server wastes memory managing idle connections.'
        ],
        whyItMatters: 'Proactive profiling and connection management prevent application downtime and ensure consistent latency.',
        realWorldExample: 'A sudden spike in API latency is traced back using the database profiler, revealing that a recent code deployment introduced a query that performs a full collection scan instead of using an index.',
        code: `// Enable profiling for operations taking longer than 100ms
db.setProfilingLevel(1, { slowms: 100 });

// Query the profile log for the slowest queries
db.system.profile.find(
  { op: { $in: ["query", "command"] } }
).sort({ millis: -1 }).limit(5);`,
        output: 'Configures profiler and retrieves the top 5 slowest queries.',
        commonMistakes: ['Leaving profiling level 2 (log all operations) on in production, causing massive disk I/O and performance degradation.', 'Creating a new MongoClient instance for every web request instead of reusing a global connection pool.', 'Ignoring the slow query log until the database crashes.'],
        bestPractices: ['Set profiling level 1 with a reasonable slowms threshold (e.g., 50-200ms) in production.', 'Maintain a singleton database connection in Node.js applications.', 'Regularly review slow queries and add indexes as needed.'],
        interviewQuestion: 'How does connection pooling improve MongoDB performance in a Node.js application?',
        practiceQuestion: 'Write the command to turn off the database profiler.'
      },
      {
        heading: 'Engine and Architecture',
        explanation: [
          'WiredTiger is the default storage engine for MongoDB. It dictates how data is saved to disk and memory. WiredTiger heavily utilizes the filesystem cache and its own internal cache. By default, it reserves 50% of (RAM - 1GB) for its internal cache. It uses document-level concurrency control, meaning multiple clients can update different documents in the same collection simultaneously without locking each other out.',
          'Memory management is crucial. For optimal performance, the "working set" (the data and indexes most frequently accessed) must fit entirely in RAM. If the working set exceeds RAM, MongoDB must constantly read from disk (page faults), slowing performance by orders of magnitude.',
          'Read and Write Concerns directly impact performance. Higher durability (w: majority) increases write latency because it requires network roundtrips to replica nodes. Read concern "linearizable" provides strict consistency but introduces significant read latency. You must tune these per operation based on business requirements.'
        ],
        whyItMatters: 'Understanding WiredTiger and memory architecture helps developers provision correct hardware and optimize deployment configurations.',
        realWorldExample: 'A system experiencing high disk I/O is diagnosed with a working set size exceeding available RAM. The fix involves either vertically scaling RAM or archiving old data to reduce the index size.',
        code: `// Getting server status to check WiredTiger cache usage
const status = db.serverStatus();
print("Cache used:", status.wiredTiger.cache["bytes currently in the cache"]);
print("Page faults:", status.extra_info.page_faults);`,
        output: 'Outputs metrics crucial for tuning hardware and cache limits.',
        commonMistakes: ['Running other memory-intensive applications on the same server as MongoDB, starving WiredTiger of cache.', 'Assuming MongoDB automatically frees RAM back to the OS immediately (it caches aggressively).', 'Using w: majority for non-critical logging data, slowing down ingestion.'],
        bestPractices: ['Ensure indexes fit entirely in RAM.', 'Dedicate servers exclusively to the MongoDB process.', 'Monitor page fault metrics as a primary indicator of memory starvation.'],
        interviewQuestion: 'What is the WiredTiger working set, and what happens when it exceeds available RAM?',
        practiceQuestion: 'What level of concurrency control does WiredTiger use?'
      }
    ]
  },
  {
    id: 'mongoose-odm',
    slug: 'mongoose-odm',
    technology: 'mongodb',
    title: 'Mongoose ODM',
    category: 'MongoDB',
    description: 'Connecting, connection events, mongoose.model(), CRUD with Mongoose, lean(), exec().',
    section: '13. MongoDB',
    level: 16,
    difficulty: 'beginner',
    prerequisites: ['crud-operations'],
    concepts: ['Mongoose', 'Schemas', 'Models', 'lean()'],
    progress: 0,
    toc: ['Connection and Models', 'Queries and Performance'],
    references,
    sections: [
      {
        heading: 'Connection and Models',
        explanation: [
          'Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straight-forward, schema-based solution to model application data. While MongoDB is schema-less, Mongoose enforces strict schemas at the application level, providing type casting, validation, and query building.',
          'Connecting to MongoDB using Mongoose involves `mongoose.connect()`. Mongoose maintains a default global connection pool. You can listen to connection events (connected, error, disconnected) to monitor the database state and handle reconnect logic.',
          'Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database. The first argument to `mongoose.model()` is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name.'
        ],
        whyItMatters: 'Mongoose brings structure, predictability, and powerful features to MongoDB in a Node.js environment, bridging the gap between objects and documents.',
        realWorldExample: 'Defining a strict User schema in Mongoose ensures that every user saved to the database has a correctly formatted email and a hashed password, rejecting invalid data before it reaches the database.',
        code: `import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/myapp');

mongoose.connection.on('error', err => console.error(err));
mongoose.connection.once('open', () => console.log('Connected!'));

const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', userSchema); // Maps to 'users' collection`,
        output: 'Successfully connected and defined a model mapped to the "users" collection.',
        commonMistakes: ['Opening a new connection on every request instead of reusing the global connection.', 'Naming the model plural (e.g., `mongoose.model("Users")`) which creates a collection named "userss".', 'Failing to handle connection errors.'],
        bestPractices: ['Establish the database connection once when the application starts.', 'Attach event listeners to monitor connection health.', 'Use uppercase singular names for Model variables (e.g., `User`, not `user`).'],
        interviewQuestion: 'What is the primary difference between using the native MongoDB driver and Mongoose in a Node.js application?',
        practiceQuestion: 'Write the code to create a model named "Product" from a given productSchema.'
      },
      {
        heading: 'Queries and Performance',
        explanation: [
          'Mongoose provides helper functions for CRUD operations, like `User.find()`, `User.create()`, and `User.updateOne()`. These methods do not immediately execute if you do not await them or pass a callback; they return a Mongoose Query object. Calling `.exec()` on the query explicitly returns a full Promise and is good practice for better stack traces.',
          'By default, Mongoose queries return instances of Mongoose Document classes. These documents are heavy objects containing internal state, change tracking, and methods like `.save()`. This overhead is unnecessary if you are only reading data to send it as a JSON API response.',
          'To optimize read-only queries, use the `.lean()` method. `User.find().lean()` bypasses the instantiation of Mongoose Documents and returns plain JavaScript objects (POJOs). This dramatically reduces memory consumption and query execution time.'
        ],
        whyItMatters: 'Understanding how Mongoose queries work and utilizing `.lean()` is the single most impactful optimization for Node.js API performance.',
        realWorldExample: 'Fetching 1,000 product documents to render a catalog page. Using `.lean()` reduces the response time from 300ms to 50ms and prevents memory spikes.',
        code: `// Heavy Mongoose documents
const users = await User.find({ status: 'active' }).exec();

// Lightweight POJOs (optimized for read-only)
const plainUsers = await User.find({ status: 'active' }).lean().exec();

// You cannot call Mongoose methods on lean results:
// plainUsers[0].save() // Error!`,
        output: 'Retrieves data significantly faster using lean().',
        commonMistakes: ['Forgetting `.exec()` leading to confusing error stack traces.', 'Returning massive arrays of Mongoose documents over an API without using `.lean()`, causing memory leaks.', 'Attempting to use `.save()` on a document retrieved with `.lean()`.'],
        bestPractices: ['Use `.lean()` for all GET endpoints where data is just being sent to the client.', 'Use `.exec()` to explicitly execute queries and get better errors.', 'Use standard Mongoose documents only when you intend to modify and `.save()` them.'],
        interviewQuestion: 'Why should you use the .lean() method in Mongoose, and when should you avoid it?',
        practiceQuestion: 'Write a Mongoose query to find one user by email and return a plain JavaScript object.'
      }
    ]
  },
  {
    id: 'mongoose-schemas-models',
    slug: 'mongoose-schemas-models',
    technology: 'mongodb',
    title: 'Mongoose Schemas & Models',
    category: 'MongoDB',
    description: 'Schema types, required, default, enum, validate, virtuals, methods, statics.',
    section: '13. MongoDB',
    level: 17,
    difficulty: 'intermediate',
    prerequisites: ['mongoose-odm'],
    concepts: ['Schema Validation', 'Virtuals', 'Instance Methods', 'Static Methods'],
    progress: 0,
    toc: ['Validation and Types', 'Virtuals and Methods'],
    references,
    sections: [
      {
        heading: 'Validation and Types',
        explanation: [
          'Mongoose Schemas define the structure of documents. You specify SchemaTypes (String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map) for each field. Mongoose automatically casts incoming data to these types (e.g., casting the string "25" to a Number).',
          'Schemas provide robust built-in validation. You can set fields as `required`, provide `default` values, and use `enum` to restrict strings to a specific set of values. For numbers, you have `min` and `max`; for strings, `match` (regex), `minLength`, and `maxLength`.',
          'Custom validation allows you to define synchronous or asynchronous functions to validate data against complex business rules. If a validation rule fails, Mongoose throws a ValidationError before saving to the database.'
        ],
        whyItMatters: 'Schema validation is the first line of defense against corrupted or malicious data entering your database.',
        realWorldExample: 'A user schema that strictly enforces roles to be one of ["admin", "user"], sets the default role to "user", and uses a custom validator to ensure the email format is correct.',
        code: `const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) { return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); },
      message: props => \`\${props.value} is not a valid email!\`
    }
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});`,
        output: 'Schema enforces data integrity before saving.',
        commonMistakes: ['Trusting client-side validation and skipping schema validation.', 'Using arrow functions in custom validators and losing the `this` context binding to the document.', 'Forgetting that update operations (like `updateOne`) do not run validators by default (must pass `{ runValidators: true }`).'],
        bestPractices: ['Define strict types and required fields for all crucial data.', 'Use enums for fields with predefined states.', 'Enable `runValidators: true` on update queries.'],
        interviewQuestion: 'Do Mongoose validators run when you execute an updateOne() query?',
        practiceQuestion: 'Add a validator to a schema field "age" ensuring it is greater than 18.'
      },
      {
        heading: 'Virtuals and Methods',
        explanation: [
          'Virtuals are document properties that you can get and set but that do not get persisted to MongoDB. They are computed on the fly. A common use case is a `fullName` virtual that concatenates `firstName` and `lastName`. Virtuals save space in the database while keeping application logic clean.',
          'Instance methods are custom functions attached to document instances. They are useful for actions specific to a single document, such as comparing a password hash or generating a JWT token for that user. Inside an instance method, `this` refers to the document.',
          'Static methods are custom functions attached to the Model itself. They are used for operations that affect the entire collection or query multiple documents, such as a custom search function `User.findByRole("admin")`. Inside a static method, `this` refers to the Model.'
        ],
        whyItMatters: 'Virtuals, methods, and statics allow you to encapsulate business logic directly within your data models, adhering to the principles of Object-Oriented Programming (Fat Models, Skinny Controllers).',
        realWorldExample: 'A User model with an instance method to `generateAuthToken()`, a static method to `findByEmail()`, and a virtual `domain` computed from their email address.',
        code: `// Virtual
userSchema.virtual('fullName').get(function() {
  return \`\${this.firstName} \${this.lastName}\`;
});

// Instance Method
userSchema.methods.checkPassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

// Static Method
userSchema.statics.findAdmins = function() {
  return this.find({ role: 'admin' });
};`,
        output: 'Business logic is encapsulated in the schema.',
        commonMistakes: ['Using arrow functions for virtuals, methods, or statics, which breaks the `this` binding.', 'Forgetting to include `{ virtuals: true }` in `toJSON` options, causing virtuals to disappear when sending API responses.', 'Putting complex database queries in virtual getters.'],
        bestPractices: ['Use standard `function()` syntax for methods to preserve `this`.', 'Use virtuals for data formatting.', 'Keep controllers thin by moving data-centric logic into model methods.'],
        interviewQuestion: 'What is a Mongoose virtual and how does it differ from a standard schema field?',
        practiceQuestion: 'Define a virtual property "url" that returns "/users/" + the document _id.'
      }
    ]
  },
  {
    id: 'mongoose-middleware',
    slug: 'mongoose-middleware',
    technology: 'mongodb',
    title: 'Mongoose Middleware',
    category: 'MongoDB',
    description: 'pre/post hooks, save, validate, remove, aggregate middleware.',
    section: '13. MongoDB',
    level: 18,
    difficulty: 'intermediate',
    prerequisites: ['mongoose-schemas-models'],
    concepts: ['Hooks', 'Pre', 'Post', 'Query Middleware', 'Document Middleware'],
    progress: 0,
    toc: ['Document and Query Middleware', 'Post Hooks and Error Handling'],
    references,
    sections: [
      {
        heading: 'Document and Query Middleware',
        explanation: [
          'Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions. Document middleware executes on specific document operations like `save`, `validate`, and `remove`. In document middleware, `this` refers to the document being processed.',
          'A classic use case for a `pre("save")` hook is hashing a user\'s password before saving it to the database. The hook intercepts the save operation, performs the hashing, and then calls `next()` to continue the save process.',
          'Query middleware executes on query operations like `find`, `updateOne`, and `deleteMany`. In query middleware, `this` refers to the query object, not a document. This is useful for automatically appending filters, such as excluding soft-deleted documents from all `find` queries.'
        ],
        whyItMatters: 'Middleware intercepts operations to enforce global logic, ensuring data consistency (like password hashing) without duplicating code in every controller.',
        realWorldExample: 'Hashing a password on `pre("save")` only if the password field was modified, preventing re-hashing when updating unrelated fields like username.',
        code: `// Document Middleware (pre-save)
userSchema.pre('save', async function(next) {
  // 'this' is the document
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Query Middleware (pre-find)
userSchema.pre('find', function() {
  // 'this' is the query
  this.where({ isDeleted: false });
});`,
        output: 'Passwords hash automatically; deleted users are hidden automatically.',
        commonMistakes: ['Confusing `this` context: assuming `this` is a document in query middleware.', 'Forgetting to call `next()` or return a Promise, causing the operation to hang indefinitely.', 'Using arrow functions in hooks, losing the `this` binding.'],
        bestPractices: ['Always check `this.isModified("field")` in `pre("save")` hooks before applying transformations.', 'Keep middleware fast and synchronous if possible.', 'Use query middleware for tenant isolation or soft deletes.'],
        interviewQuestion: 'What is the difference between Document middleware and Query middleware in Mongoose?',
        practiceQuestion: 'Write a pre-save hook that updates an "updatedAt" timestamp.'
      },
      {
        heading: 'Post Hooks and Error Handling',
        explanation: [
          'Post hooks execute after a method is completed. Unlike pre hooks, post hooks receive the finished document (or result) as the first parameter. They are typically used for logging, dispatching events, or triggering background jobs after a successful database operation.',
          'Post middleware can also be used for error handling. A special type of post hook catches errors thrown during execution. For example, you can use a post hook on `save` to catch MongoDB uniqueness constraint errors (code 11000) and throw a more user-friendly validation error.',
          'Aggregate middleware allows you to intercept aggregation pipelines. You can use a `pre("aggregate")` hook to inject stages at the beginning of a pipeline, such as a `$match` stage to filter out soft-deleted records before heavy processing begins.'
        ],
        whyItMatters: 'Post hooks enable decoupled event-driven architectures, and error-handling middleware standardizes API error responses.',
        realWorldExample: 'Sending a welcome email to a user using an asynchronous job queue inside a `post("save")` hook, ensuring it only sends after the user is successfully committed to the database.',
        code: `// Post Hook
userSchema.post('save', function(doc, next) {
  console.log(\`User \${doc.email} was saved.\`);
  next();
});

// Error Handling Middleware
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Email must be unique'));
  } else {
    next(error);
  }
});`,
        output: 'Logs actions and formats cryptic MongoDB duplicate key errors.',
        commonMistakes: ['Putting heavy synchronous operations in post hooks, blocking the Node event loop.', 'Forgetting that `next` must be called with an error argument in error-handling middleware to pass the error along.', 'Modifying the document in a post hook (it won\'t be saved).'],
        bestPractices: ['Use post hooks to trigger non-blocking side effects.', 'Use error-handling middleware to translate MongoDB specific error codes into application-level errors.', 'Keep side effects idempotent if possible.'],
        interviewQuestion: 'How can you catch and format a MongoDB duplicate key error globally in a Mongoose schema?',
        practiceQuestion: 'Write a post-remove hook that logs the ID of the deleted document.'
      }
    ]
  },
  {
    id: 'population-references',
    slug: 'population-references',
    technology: 'mongodb',
    title: 'Population & References',
    category: 'MongoDB',
    description: 'ref, populate(), deep populate, virtual populate, populate with select.',
    section: '13. MongoDB',
    level: 19,
    difficulty: 'intermediate',
    prerequisites: ['mongoose-schemas-models'],
    concepts: ['Population', 'References', 'Virtual Population', 'Deep Population'],
    progress: 0,
    toc: ['Basic Population', 'Advanced Population Techniques'],
    references,
    sections: [
      {
        heading: 'Basic Population',
        explanation: [
          'Population is Mongoose\'s process of automatically replacing specified paths in a document with document(s) from other collections. It is an abstraction over MongoDB\'s `$lookup` and subsequent array flattening. You define a relationship by setting a schema path to type `ObjectId` and adding a `ref` property pointing to the target Model name.',
          'To populate a field, you chain the `.populate()` method to your query. Mongoose executes the primary query, collects all the ObjectIds, performs a secondary query on the referenced collection using an `$in` operator, and stitches the results back into the original documents.',
          'You can control what fields are returned from the populated document by passing a second argument (select string) to `.populate()`. This is crucial for performance and security, preventing sensitive data like password hashes from being pulled into the populated result.'
        ],
        whyItMatters: 'Population makes working with normalized data in MongoDB feel almost like working with a relational ORM, simplifying data retrieval code.',
        realWorldExample: 'Fetching a blog post and populating the `author` field, but selecting only the author\'s `name` and `avatar`, hiding their email and password hash.',
        code: `// Schema Definition
const postSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

// Query with Population and Selection
const posts = await Post.find()
  .populate('author', 'name avatar -_id')
  .exec();`,
        output: 'Returns posts where author is an object with just name and avatar.',
        commonMistakes: ['Populating massive arrays of references, causing out-of-memory errors.', 'Forgetting to specify the `ref` in the schema.', 'Not selecting specific fields in `.populate()`, accidentally exposing sensitive data.'],
        bestPractices: ['Always use field selection when populating user objects to avoid leaking secrets.', 'Use `.lean()` in conjunction with `.populate()` for maximum read performance.', 'Be mindful of the N+1 problem; Mongoose optimizes this internally but large result sets still require heavy memory.'],
        interviewQuestion: 'How does Mongoose execute a populate() call under the hood? Does it use joins?',
        practiceQuestion: 'Write a query to populate a "category" field, selecting only the "name" field.'
      },
      {
        heading: 'Advanced Population Techniques',
        explanation: [
          'Deep population allows you to populate fields within populated documents across multiple levels. For example, populating a Post\'s Comments, and then populating the Author of each Comment. You achieve this by passing an object with `path` and `populate` properties to the `.populate()` method.',
          'Virtual population is used for 1-to-Many relationships where the parent document doesn\'t store an array of children (to avoid the 16MB limit). Instead, the children store a reference to the parent. You define a virtual field on the parent schema linking the `localField` (_id) to the `foreignField` on the child model. You can then `.populate()` this virtual field.',
          'Match conditions and limits can be applied to population. You can populate an array of references but only return elements that match a specific criteria (e.g., only active users) and limit the number returned. This is essential for preventing memory spikes on large relationships.'
        ],
        whyItMatters: 'Virtual and deep population allow handling complex, massive relational graphs without breaking document size limits.',
        realWorldExample: 'Using virtual population on a User model to retrieve their posts without storing an unbounded array of post IDs inside the user document.',
        code: `// Virtual Population Setup
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author'
});

// Deep Population with Match and Limit
const users = await User.find().populate({
  path: 'posts',
  match: { status: 'published' },
  options: { limit: 5 },
  populate: { path: 'comments', select: 'text' }
}).exec();`,
        output: 'Returns users, their top 5 published posts, and the comments on those posts.',
        commonMistakes: ['Deeply populating many levels (e.g., >3 levels) causing severe performance degradation.', 'Trying to save a populated virtual field (virtuals cannot be saved).', 'Not using pagination/limits when populating 1-to-Many virtuals.'],
        bestPractices: ['Prefer virtual population over storing arrays of ObjectIds for unbounded relationships.', 'Use match and limit options heavily on array populations.', 'Consider denormalization if you need to deep populate frequently on hot paths.'],
        interviewQuestion: 'What is virtual population and how does it solve the unbounded array problem?',
        practiceQuestion: 'Write a populate configuration object to populate a "friends" array, but limit the result to 10 friends.'
      }
    ]
  },
  {
    id: 'lab-user-system',
    slug: 'lab-user-system',
    technology: 'mongodb',
    title: 'Lab: User System',
    category: 'MongoDB',
    description: 'Build a user CRUD system with Mongoose schema, validation, and password hashing.',
    section: '13. MongoDB',
    level: 20,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Lab Exercise'],
    sections: [
      {
        heading: 'Lab Details',
        explanation: [
          'In this lab, you will build a robust User model using Mongoose. This represents the foundation of authentication in a Node.js application. You will define strict schema types, implement regex-based email validation, and utilize Mongoose middleware to securely hash passwords before they are stored.',
          'You will also create an instance method to verify passwords during login. This encapsulates the security logic within the model itself. By the end of this lab, you will understand how to orchestrate schema design, validation, and hooks to create production-ready data models.',
          'Pay close attention to handling the `this` context within the pre-save hook, and ensure you use the `isModified` check to prevent re-hashing an already hashed password when other fields are updated.'
        ],
        whyItMatters: 'Secure user modeling is the most critical component of any backend application.',
        realWorldExample: 'Implementing the registration and login backend for a web application.',
        commonMistakes: ['Using arrow functions in middleware.', 'Saving passwords in plain text.'],
        bestPractices: ['Always hash passwords with bcrypt.', 'Keep model logic inside the schema.'],
        interviewQuestion: 'Why must you check this.isModified("password") in a pre-save hook?',
        practiceQuestion: 'What bcrypt method is used to compare a plain text password with a hash?'
      }
    ],
    lab: {
      title: 'User System Implementation',
      objective: 'Create a secure Mongoose User model with validation, a pre-save password hashing hook, and a password comparison instance method.',
      starterCode: `const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    // Add type String, required, unique
  },
  email: {
    // Add type String, required, unique, regex validation
  },
  password: {
    // Add type String, required
  }
});

// Add pre-save hook here to hash password

// Add instance method comparePassword here

module.exports = mongoose.model('User', userSchema);`,
      expectedOutput: 'Model should reject invalid emails, hash passwords on save, and correctly compare passwords.',
      solution: `const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);`,
      hints: [
        'Use the `match` property with a regex for email validation.',
        'Remember `this.isModified("password")`.',
        'Use `bcrypt.hash()` and `bcrypt.compare()`.'
      ]
    }
  },
  {
    id: 'lab-product-system',
    slug: 'lab-product-system',
    technology: 'mongodb',
    title: 'Lab: Product System',
    category: 'MongoDB',
    description: 'Product catalog with categories, pricing, inventory tracking.',
    section: '13. MongoDB',
    level: 21,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Lab Exercise'],
    sections: [
      {
        heading: 'Lab Details',
        explanation: [
          'This lab focuses on modeling a product catalog using Mongoose. You will design a schema that handles complex types like Decimal128 for precise pricing and implements inventory tracking. You will also use references to link products to categories.',
          'You will practice creating a compound index to optimize searches by category and price, demonstrating how schema design directly impacts database performance. You will also write a static method to find products that are out of stock.',
          'Focus on using the correct Mongoose types (like `Schema.Types.Decimal128` for currency) and ensuring your indexes follow the ESR rule.'
        ],
        whyItMatters: 'E-commerce systems require precise financial data types and optimized querying for categories and price ranges.',
        realWorldExample: 'Building the backend catalog for an online store.',
        commonMistakes: ['Using standard Numbers for price.', 'Forgetting to index the category field.'],
        bestPractices: ['Use Decimal128 for money.', 'Create compound indexes for common filter combinations.'],
        interviewQuestion: 'How does Mongoose handle Decimal128 types?',
        practiceQuestion: 'Create a compound index on category and price.'
      }
    ],
    lab: {
      title: 'Product Catalog Model',
      objective: 'Create a Product model with precise pricing, references to Category, inventory tracking, and static helper methods.',
      starterCode: `const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: {
    // Add Decimal128 type and required
  },
  category: {
    // Add reference to 'Category'
  },
  inStock: {
    // Add boolean with default true
  },
  quantity: Number
});

// Add compound index on category and price here

// Add static method findOutOfStock here

module.exports = mongoose.model('Product', productSchema);`,
      expectedOutput: 'Product model supports decimal prices, references categories, and has an index on {category: 1, price: 1}.',
      solution: `const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  }
});

productSchema.index({ category: 1, price: 1 });

productSchema.statics.findOutOfStock = function() {
  return this.find({ quantity: 0, inStock: false });
};

// Pre-save to auto-update inStock based on quantity
productSchema.pre('save', function(next) {
  if (this.quantity === 0) {
    this.inStock = false;
  } else {
    this.inStock = true;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);`,
      hints: [
        'Use `mongoose.Schema.Types.Decimal128`.',
        'Use `productSchema.index()` to define the compound index.',
        'Use `statics` to attach the helper method.'
      ]
    }
  },
  {
    id: 'lab-order-system',
    slug: 'lab-order-system',
    technology: 'mongodb',
    title: 'Lab: Order System',
    category: 'MongoDB',
    description: 'Order processing with product references, status tracking, total calculation.',
    section: '13. MongoDB',
    level: 22,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Lab Exercise'],
    sections: [
      {
        heading: 'Lab Details',
        explanation: [
          'In this lab, you will model a complex Order system. An order contains an array of items, each referencing a Product and containing a quantity and locked-in price. This demonstrates the concept of historical data modeling: you must store the price at the time of purchase, not just reference the live product price.',
          'You will implement a pre-save hook that automatically calculates the `totalAmount` of the order based on the items array. This is an application of the Computed Pattern.',
          'Finally, you will use an enum to manage the order status lifecycle (pending, paid, shipped, delivered) ensuring state consistency.'
        ],
        whyItMatters: 'Transactional systems require robust state management and historical data accuracy (prices change over time).',
        realWorldExample: 'Processing checkout data in a shopping application.',
        commonMistakes: ['Only storing the product ID and not the historical price.', 'Calculating totals on the client side.'],
        bestPractices: ['Compute totals on the server/database layer.', 'Use enums for status fields.'],
        interviewQuestion: 'Why must you store the price inside the order document instead of just referencing the Product?',
        practiceQuestion: 'Write a validation rule for an array ensuring it has at least one item.'
      }
    ],
    lab: {
      title: 'Order Processing System',
      objective: 'Model an Order with line items, status enums, and a pre-save hook to calculate total costs automatically.',
      starterCode: `const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    priceAtPurchase: { type: Number, required: true }
  }],
  status: {
    // Add enum: ['pending', 'paid', 'shipped', 'delivered'], default: 'pending'
  },
  totalAmount: { type: Number, default: 0 }
});

// Add pre-save hook to calculate totalAmount

module.exports = mongoose.model('Order', orderSchema);`,
      expectedOutput: 'Saving an order automatically populates totalAmount. Status is restricted to valid strings.',
      solution: `const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    priceAtPurchase: { type: Number, required: true, min: 0 }
  }],
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered'],
    default: 'pending'
  },
  totalAmount: { type: Number, default: 0 }
});

orderSchema.pre('save', function(next) {
  if (this.isModified('items')) {
    this.totalAmount = this.items.reduce((total, item) => {
      return total + (item.quantity * item.priceAtPurchase);
    }, 0);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);`,
      hints: [
        'Use JavaScript `.reduce()` inside the pre-save hook.',
        'Check `isModified("items")` to avoid recalculating unnecessarily.',
        'Define the enum as an array of strings in the schema.'
      ]
    }
  },
  {
    id: 'lab-search-implementation',
    slug: 'lab-search-implementation',
    technology: 'mongodb',
    title: 'Lab: Search Implementation',
    category: 'MongoDB',
    description: 'Text search with indexes, regex search, autocomplete.',
    section: '13. MongoDB',
    level: 23,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Lab Exercise'],
    sections: [
      {
        heading: 'Lab Details',
        explanation: [
          'Search is a critical feature. In this lab, you will implement search functionality over an Articles collection. You will configure a MongoDB Text Index across multiple fields (title, content) and assign them different weights (e.g., title matches are more relevant than content matches).',
          'You will write a function utilizing the `$text` query operator and sort the results by `$meta: "textScore"` to return the most relevant documents first.',
          'Additionally, you will implement a fast autocomplete search using anchored regular expressions, understanding why regex without text indexes is slow, and how anchoring it allows B-tree index usage.'
        ],
        whyItMatters: 'Efficient search capabilities differentiate good applications from poor ones. Text indexes provide native full-text search without external dependencies.',
        realWorldExample: 'A blog search bar that finds articles by keywords and sorts by relevance, alongside a typeahead autocomplete.',
        commonMistakes: ['Not sorting text searches by textScore.', 'Using unanchored regex for autocomplete.'],
        bestPractices: ['Assign higher weights to title/heading fields in text indexes.', 'Use $text for full words, regex for prefixes.'],
        interviewQuestion: 'How do you sort MongoDB text search results by relevance?',
        practiceQuestion: 'Create a text index on "description".'
      }
    ],
    lab: {
      title: 'Full-Text and Prefix Search',
      objective: 'Create a text index with weights, implement a relevance-sorted search function, and an autocomplete prefix search function.',
      starterCode: `const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String]
});

// 1. Add a text index on title and content, giving title weight 10 and content weight 1

// 2. Add static method searchArticles(query) to use $text and sort by textScore

// 3. Add static method autocompleteTitle(prefix) using anchored regex

module.exports = mongoose.model('Article', articleSchema);`,
      expectedOutput: 'searchArticles returns results sorted by relevance. autocompleteTitle performs fast prefix matching.',
      solution: `const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String]
});

// 1. Text Index with weights
articleSchema.index(
  { title: 'text', content: 'text' },
  { weights: { title: 10, content: 1 } }
);

// Regular index for autocomplete
articleSchema.index({ title: 1 });

// 2. Full-text search with relevance scoring
articleSchema.statics.searchArticles = function(searchString) {
  return this.find(
    { $text: { $search: searchString } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

// 3. Autocomplete prefix search (anchored regex uses B-tree index)
articleSchema.statics.autocompleteTitle = function(prefix) {
  // Anchored to the start of the string using ^
  const regex = new RegExp('^' + prefix, 'i');
  return this.find({ title: regex }).limit(10).select('title');
};

module.exports = mongoose.model('Article', articleSchema);`,
      hints: [
        'Use `articleSchema.index({ field: "text" }, { weights: { field: 10 } })`.',
        'Project the score using `{ score: { $meta: "textScore" } }`.',
        'Anchored regex format: `new RegExp("^" + string, "i")`.'
      ]
    }
  },
  {
    id: 'lab-pagination-system',
    slug: 'lab-pagination-system',
    technology: 'mongodb',
    title: 'Lab: Pagination System',
    category: 'MongoDB',
    description: 'Cursor-based and offset-based pagination with sorting.',
    section: '13. MongoDB',
    level: 24,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Lab Exercise'],
    sections: [
      {
        heading: 'Lab Details',
        explanation: [
          'Fetching large datasets requires pagination. In this lab, you will implement two pagination strategies. First, the standard Offset-based pagination using `.skip()` and `.limit()`. This is easy to implement but suffers from performance degradation on deep pages as MongoDB still scans skipped documents.',
          'Second, you will implement Cursor-based pagination. This technique uses a field (like `_id` or a timestamp) to filter results (`$gt` or `$lt`) instead of skipping. This is highly performant and resilient to data inserts/deletes occurring during pagination.',
          'You will write Mongoose static methods for both, analyzing the trade-offs and ensuring indexes support the sorting required.'
        ],
        whyItMatters: 'Scalable APIs require efficient pagination; skip/limit fails at scale, necessitating cursor-based approaches.',
        realWorldExample: 'Scrolling an infinite feed on a social network (cursor) vs navigating a data table with explicit page numbers (offset).',
        commonMistakes: ['Using skip() for millions of records.', 'Not indexing the field used for cursor pagination.'],
        bestPractices: ['Prefer cursor pagination for infinite scroll or large datasets.', 'Ensure the sort field in cursor pagination is unique.'],
        interviewQuestion: 'Why does skip() and limit() pagination become slow on large collections?',
        practiceQuestion: 'Write a cursor query fetching items older than a given ObjectId.'
      }
    ],
    lab: {
      title: 'API Pagination Strategies',
      objective: 'Implement both skip/limit pagination and high-performance cursor pagination.',
      starterCode: `const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  createdAt: { type: Date, default: Date.now }
});

// Ensure index on createdAt
postSchema.index({ createdAt: -1 });

// 1. Implement offset pagination
postSchema.statics.getPostsOffset = function(page, limit) {
  // return results using skip and limit, sorted by createdAt desc
};

// 2. Implement cursor pagination
postSchema.statics.getPostsCursor = function(lastDate, limit) {
  // return results using lastDate to fetch older posts, sorted by createdAt desc
};

module.exports = mongoose.model('Post', postSchema);`,
      expectedOutput: 'Both methods return limited sets. Cursor method performs much faster on deep queries.',
      solution: `const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  createdAt: { type: Date, default: Date.now }
});

postSchema.index({ createdAt: -1 });

postSchema.statics.getPostsOffset = async function(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  
  const [data, total] = await Promise.all([
    this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    this.countDocuments()
  ]);
  
  return { data, total, page, totalPages: Math.ceil(total / limit) };
};

postSchema.statics.getPostsCursor = async function(lastDate, limit = 10) {
  const query = lastDate ? { createdAt: { $lt: new Date(lastDate) } } : {};
  
  const data = await this.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
    
  const nextCursor = data.length > 0 ? data[data.length - 1].createdAt : null;
  
  return { data, nextCursor };
};

module.exports = mongoose.model('Post', postSchema);`,
      hints: [
        'For offset, calculate skip as `(page - 1) * limit`.',
        'For cursor, query `{ createdAt: { $lt: lastDate } }`.',
        'Return the next cursor (the date of the last item in the result array).'
      ]
    }
  },
  {
    id: 'lab-aggregation-analytics',
    slug: 'lab-aggregation-analytics',
    technology: 'mongodb',
    title: 'Lab: Aggregation Analytics',
    category: 'MongoDB',
    description: 'Sales analytics dashboard with $group, $bucket, $facet.',
    section: '13. MongoDB',
    level: 25,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Lab Exercise'],
    sections: [
      {
        heading: 'Lab Details',
        explanation: [
          'In this final lab, you will build a complex aggregation pipeline to power a sales analytics dashboard. You will write a single MongoDB query using the Aggregation Framework to extract multiple analytical metrics simultaneously using the `$facet` stage.',
          'Your pipeline will calculate total revenue, group sales by product categories, and use `$bucket` to distribute orders into size ranges (e.g., small orders, large orders).',
          'This exercise combines everything learned about pipeline optimization, data transformation, and faceted search, demonstrating how MongoDB handles complex analytical workloads.'
        ],
        whyItMatters: 'Analytics pipelines reduce backend processing by moving calculations to the database, powering dashboards efficiently.',
        realWorldExample: 'A business intelligence dashboard showing daily revenue, category breakdowns, and order volume distributions.',
        commonMistakes: ['Executing three separate queries instead of using $facet.', 'Forgetting to filter data with $match before heavy grouping.'],
        bestPractices: ['Filter early with $match.', 'Use $facet to return multiple shapes of aggregated data in one call.'],
        interviewQuestion: 'How does the $facet stage improve efficiency when building a dashboard UI?',
        practiceQuestion: 'Write a pipeline stage to calculate the total sum of an "amount" field.'
      }
    ],
    lab: {
      title: 'Sales Dashboard Aggregation',
      objective: 'Write an aggregation pipeline using $match, $facet, $group, and $bucket to return comprehensive sales metrics.',
      starterCode: `const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  date: Date,
  category: String,
  totalAmount: Number,
  status: String
});

orderSchema.statics.getDashboardMetrics = function(startDate, endDate) {
  // Write aggregation pipeline returning:
  // 1. Total revenue
  // 2. Sales by category
  // 3. Order size distribution ($bucket boundaries: 0, 50, 100, 500)
  return this.aggregate([
    // Add stages here
  ]);
};

module.exports = mongoose.model('Order', orderSchema);`,
      expectedOutput: 'Returns a single document containing arrays for totalRevenue, byCategory, and orderSizes.',
      solution: `const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  date: Date,
  category: String,
  totalAmount: Number,
  status: String
});

orderSchema.statics.getDashboardMetrics = function(startDate, endDate) {
  return this.aggregate([
    // 1. Filter early to optimize pipeline
    {
      $match: {
        status: 'completed',
        date: { $gte: new Date(startDate), $lte: new Date(endDate) }
      }
    },
    // 2. Use $facet to run multiple aggregations simultaneously
    {
      $facet: {
        totalRevenue: [
          { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } },
          { $project: { _id: 0 } }
        ],
        byCategory: [
          { $group: { _id: '$category', revenue: { $sum: '$totalAmount' } } },
          { $sort: { revenue: -1 } }
        ],
        orderSizes: [
          {
            $bucket: {
              groupBy: '$totalAmount',
              boundaries: [0, 50, 100, 500],
              default: '500+',
              output: { count: { $sum: 1 }, totalValue: { $sum: '$totalAmount' } }
            }
          }
        ]
      }
    }
  ]);
};

module.exports = mongoose.model('Order', orderSchema);`,
      hints: [
        'Start with a `$match` on status and date.',
        'Use `$facet` with three sub-pipelines.',
        'For `totalRevenue`, group by `null` to sum all matched documents.'
      ]
    }
  }
];
