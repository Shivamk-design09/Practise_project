import type { Lesson } from '../types'

const references = [
  { label: 'PostgreSQL Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html' },
  { label: 'SQL Commands', url: 'https://www.postgresql.org/docs/current/sql.html' },
  { label: 'Indexes', url: 'https://www.postgresql.org/docs/current/indexes.html' },
  { label: 'Transactions', url: 'https://www.postgresql.org/docs/current/tutorial-transactions.html' },
  { label: 'EXPLAIN', url: 'https://www.postgresql.org/docs/current/sql-explain.html' },
]

export const postgresqlLessons: Lesson[] = [
  {
    id: 'postgresql-relational-database-concepts',
    slug: 'relational-database-concepts',
    technology: 'postgresql',
    title: 'Relational Database Concepts',
    category: 'PostgreSQL',
    description: 'Understand the core concepts of relational databases, the relational model, and SQL.',
    section: '14. PostgreSQL',
    level: 1,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Relational Model', 'RDBMS vs NoSQL', 'Data Integrity'],
    references,
    sections: [
      {
        heading: 'Relational Model',
        explanation: [
          'A relational database organizes data into tables (relations) which can be linked—or related—based on data common to each. This model was proposed by Edgar F. Codd in 1970 and has become the standard for data storage in most enterprise applications.',
          'Each table consists of rows (tuples) and columns (attributes). The columns define the structure of the data, specifying the data type and constraints for each attribute. The rows contain the actual data, with each row representing a unique record in the database.',
          'SQL (Structured Query Language) is the standard language used to interact with relational databases. It allows you to define the schema (DDL), manipulate data (DML), and control access (DCL). PostgreSQL is a powerful, open-source object-relational database system that uses and extends the SQL language.'
        ],
        whyItMatters: 'Understanding the relational model is crucial for designing efficient, scalable, and maintainable databases. It forms the foundation of data architecture in most modern software systems.',
        realWorldExample: 'An e-commerce platform uses a relational database to store users, products, and orders. The relational model ensures that when a user places an order, the order is correctly linked to both the user and the products purchased.',
        interviewQuestion: 'What is a Relational Database Management System (RDBMS) and how does it differ from a NoSQL database?',
        commonMistakes: [
          'Treating a relational database like a simple spreadsheet.',
          'Ignoring the importance of schema design and data normalization.'
        ],
        bestPractices: [
          'Design schemas carefully before writing code.',
          'Understand the relationships between your data entities.'
        ]
      },
      {
        heading: 'Data Integrity',
        explanation: [
          'Data integrity refers to the accuracy, consistency, and reliability of data stored in a database. In a relational database, data integrity is enforced through rules and constraints applied to tables and columns.',
          'Entity integrity ensures that each row in a table is uniquely identifiable, typically enforced using a primary key. Referential integrity ensures that relationships between tables are valid, meaning that a foreign key must match an existing primary key or be null.',
          'Domain integrity ensures that the data in a column meets specific criteria, such as data type, format, or range of values. This is enforced using constraints like NOT NULL, UNIQUE, CHECK, and DEFAULT.'
        ],
        interviewQuestion: 'How do you ensure data integrity in a relational database?',
        commonMistakes: [
          'Relying solely on application logic to enforce data integrity instead of database constraints.'
        ],
        bestPractices: [
          'Use database constraints (foreign keys, check constraints) to guarantee data integrity at the storage layer.'
        ]
      }
    ]
  },
  {
    id: 'postgresql-tables-rows-columns',
    slug: 'tables-rows-columns',
    technology: 'postgresql',
    title: 'Tables, Rows & Columns',
    category: 'PostgreSQL',
    description: 'Learn how to create and modify tables, and understand PostgreSQL data types.',
    section: '14. PostgreSQL',
    level: 2,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Creating Tables', 'Data Types', 'Altering Tables'],
    references,
    sections: [
      {
        heading: 'Creating Tables and Data Types',
        explanation: [
          'The `CREATE TABLE` statement is used to define a new table in PostgreSQL. When creating a table, you must specify the name of the table and the columns it will contain, along with their respective data types and any constraints.',
          'PostgreSQL offers a rich set of built-in data types. Common types include `integer` for whole numbers, `text` or `varchar` for strings, `timestamp` or `timestamptz` for dates and times, `boolean` for true/false values, and `numeric` for exact decimal numbers.',
          'Choosing the right data type is essential for performance and data integrity. For example, using `numeric` instead of `float` is critical for financial applications where precision is required. PostgreSQL also supports advanced types like `uuid`, `jsonb`, and arrays.'
        ],
        code: `CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  username VARCHAR(50) NOT NULL,\n  email TEXT UNIQUE NOT NULL,\n  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,\n  is_active BOOLEAN DEFAULT true\n);`,
        whyItMatters: 'Table design dictates how data is stored, validated, and queried. Proper column definitions prevent bad data from entering your system.',
        commonMistakes: [
          'Using VARCHAR(255) for everything instead of TEXT or appropriate limits.',
          'Not using TIMESTAMPTZ (with timezone) for dates, leading to timezone bugs.'
        ],
        bestPractices: [
          'Use TEXT instead of VARCHAR unless you need strict length limits (in Postgres they perform identically).',
          'Always use TIMESTAMPTZ for timestamps to handle timezones correctly.'
        ],
        interviewQuestion: 'What is the difference between TIMESTAMP and TIMESTAMPTZ in PostgreSQL?'
      },
      {
        heading: 'Altering Tables',
        explanation: [
          'The `ALTER TABLE` statement allows you to modify the structure of an existing table without dropping and recreating it. This is crucial for evolving database schemas as application requirements change.',
          'You can add new columns, drop existing columns, change column data types, or add/remove constraints. For example, `ALTER TABLE users ADD COLUMN last_login TIMESTAMPTZ;` adds a new column to the `users` table.',
          'When altering a table on a production database, you must be careful as some operations can require an exclusive lock on the table, blocking read and write queries until the operation completes. Operations like adding a column with a default value have been optimized in recent PostgreSQL versions to avoid full table rewrites.'
        ],
        code: `ALTER TABLE users ADD COLUMN phone_number VARCHAR(20);\nALTER TABLE users ALTER COLUMN phone_number TYPE TEXT;\nALTER TABLE users RENAME COLUMN phone_number TO contact_number;\nALTER TABLE users DROP COLUMN contact_number;`,
        commonMistakes: [
          'Running locking ALTER TABLE statements during peak traffic hours.'
        ],
        bestPractices: [
          'Test schema migrations on a staging database before applying them to production.'
        ]
      }
    ]
  },
  {
    id: 'postgresql-primary-foreign-keys',
    slug: 'primary-foreign-keys',
    technology: 'postgresql',
    title: 'Primary & Foreign Keys',
    category: 'PostgreSQL',
    description: 'Establish relationships between tables using primary and foreign keys.',
    section: '14. PostgreSQL',
    level: 3,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Primary Keys', 'Foreign Keys', 'Cascading Actions'],
    references,
    sections: [
      {
        heading: 'Primary Keys',
        explanation: [
          'A PRIMARY KEY constraint uniquely identifies each record in a table. It is a combination of NOT NULL and UNIQUE constraints. Every table should generally have a primary key to ensure that individual rows can be uniquely addressed.',
          'A primary key can consist of a single column (e.g., an auto-incrementing ID or a UUID) or multiple columns (a composite key). Composite keys are often used in join tables that represent many-to-many relationships.',
          'In PostgreSQL, defining a primary key automatically creates a unique B-tree index on the column(s). This index makes lookups by the primary key extremely fast, which is critical for query performance.'
        ],
        code: `CREATE TABLE products (\n  product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  name TEXT NOT NULL,\n  price NUMERIC(10, 2) NOT NULL\n);\n\n-- Composite Key Example\nCREATE TABLE order_items (\n  order_id INT,\n  product_id UUID,\n  quantity INT NOT NULL,\n  PRIMARY KEY (order_id, product_id)\n);`,
        whyItMatters: 'Primary keys are the foundation of row identification and are essential for updating or deleting specific records safely.',
        interviewQuestion: 'What is a composite primary key and when would you use one?'
      },
      {
        heading: 'Foreign Keys and Referential Integrity',
        explanation: [
          'A FOREIGN KEY constraint specifies that the values in a column (or a group of columns) must match the values appearing in a row of another table. This establishes a link between the data in the two tables and enforces referential integrity.',
          'When you define a foreign key, you use the `REFERENCES` keyword. If you try to insert a value into the foreign key column that does not exist in the referenced table, PostgreSQL will raise an error. Similarly, you cannot delete a record from the parent table if it is referenced by a child table, unless you specify cascading actions.',
          'Foreign keys maintain consistency across your database. Without them, you could have "orphan" records—for example, an order belonging to a user ID that has been deleted. By default, attempting to delete a referenced row results in an error (RESTRICT).'
        ],
        code: `CREATE TABLE orders (\n  order_id SERIAL PRIMARY KEY,\n  user_id INT REFERENCES users(id) ON DELETE CASCADE,\n  order_date TIMESTAMPTZ DEFAULT now()\n);`,
        commonMistakes: [
          'Forgetting to add an index on the foreign key column, which can slow down JOINs and cascading deletes.'
        ],
        bestPractices: [
          'Always explicitly index your foreign key columns.'
        ],
        interviewQuestion: 'Explain the difference between ON DELETE CASCADE, SET NULL, and RESTRICT.'
      }
    ]
  },
  {
    id: 'postgresql-constraints',
    slug: 'constraints',
    technology: 'postgresql',
    title: 'Constraints',
    category: 'PostgreSQL',
    description: 'Enforce data rules using NOT NULL, UNIQUE, CHECK, and other constraints.',
    section: '14. PostgreSQL',
    level: 4,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Basic Constraints', 'Check Constraints', 'Identity & Exclusion'],
    references,
    sections: [
      {
        heading: 'Basic and Check Constraints',
        explanation: [
          'Constraints are rules applied to columns to prevent invalid data from being entered into the database. The `NOT NULL` constraint ensures a column cannot have a NULL value, while `UNIQUE` ensures all values in a column are different.',
          'The `CHECK` constraint allows you to specify a boolean expression that must evaluate to true for every row. This is incredibly useful for enforcing domain-specific rules, such as ensuring a price is always positive or an email contains an "@" symbol.',
          'Constraints act as a strict bouncer for your database. While application-level validation is important for user experience, database constraints provide the ultimate guarantee that corrupt or invalid data will not be saved.'
        ],
        code: `CREATE TABLE employees (\n  id SERIAL PRIMARY KEY,\n  email TEXT UNIQUE NOT NULL,\n  salary NUMERIC(10, 2) CHECK (salary > 0),\n  age INT CHECK (age >= 18)\n);`,
        whyItMatters: 'Constraints provide a rock-solid guarantee of data correctness, independent of the application code interacting with the database.',
        interviewQuestion: 'Why should you use database constraints when you already have validations in your application code?',
        commonMistakes: [
          'Omitting NOT NULL constraints on required fields.'
        ],
        bestPractices: [
          'Push data validation rules as close to the data as possible using constraints.'
        ]
      },
      {
        heading: 'Generated Columns and Exclusion Constraints',
        explanation: [
          'PostgreSQL 10 introduced `GENERATED ALWAYS AS IDENTITY`, which is the SQL-standard way to create auto-incrementing columns, superseding the older `SERIAL` pseudo-type. It prevents accidental inserts of explicit values unless explicitly overridden.',
          'Exclusion constraints ensure that if any two rows are compared on the specified columns or expressions using the specified operators, at least one of these operator comparisons will return false or null. They are often used with ranges, such as ensuring no overlapping bookings for a hotel room.',
          'Exclusion constraints are more generalized than UNIQUE constraints. While UNIQUE ensures values are completely different, exclusion constraints can ensure ranges do not overlap, making them powerful for scheduling and spatial applications.'
        ],
        code: `CREATE EXTENSION btree_gist;\n\nCREATE TABLE room_reservations (\n  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  room_number INT NOT NULL,\n  reservation_period DATERANGE NOT NULL,\n  EXCLUDE USING GIST (room_number WITH =, reservation_period WITH &&)\n);`,
        realWorldExample: 'A calendar application uses an exclusion constraint to ensure a user cannot have two overlapping meetings booked at the same time.',
        interviewQuestion: 'What is an exclusion constraint in PostgreSQL and how is it used?'
      }
    ]
  },
  {
    id: 'postgresql-select-queries',
    slug: 'select-queries',
    technology: 'postgresql',
    title: 'SELECT Queries',
    category: 'PostgreSQL',
    description: 'Retrieve data using SELECT, WHERE, ORDER BY, and LIMIT clauses.',
    section: '14. PostgreSQL',
    level: 5,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Basic Selection', 'Filtering Data', 'Sorting and Paging'],
    references,
    sections: [
      {
        heading: 'Selecting and Filtering Data',
        explanation: [
          'The `SELECT` statement is the fundamental tool for retrieving data from a database. You specify the columns you want to retrieve, or use `*` for all columns. Aliases (`AS`) can be used to rename columns in the output or simplify complex expressions.',
          'The `WHERE` clause is used to filter records, returning only those that fulfill specified conditions. You can use standard comparison operators (`=`, `<`, `>`, `!=`), logical operators (`AND`, `OR`, `NOT`), and pattern matching (`LIKE`, `ILIKE`).',
          'Using functions and expressions in the SELECT or WHERE clause is common. For instance, concatenating strings, performing math, or formatting dates. Keep in mind that applying a function to a column in a WHERE clause might prevent the database from using an index on that column.'
        ],
        code: `SELECT \n  first_name || ' ' || last_name AS full_name,\n  email\nFROM users\nWHERE is_active = true AND created_at >= '2023-01-01';`,
        whyItMatters: 'Mastering SELECT is essential for data analysis, reporting, and building any application that reads from a database.',
        interviewQuestion: 'What is the difference between LIKE and ILIKE in PostgreSQL?',
        commonMistakes: [
          'Using SELECT * in production code, which can cause performance issues and break applications if the schema changes.'
        ],
        bestPractices: [
          'Always explicitly list the columns you need to retrieve.'
        ]
      },
      {
        heading: 'Sorting, Limiting, and Pagination',
        explanation: [
          'The `ORDER BY` clause sorts the result set by one or more columns in ascending (`ASC`) or descending (`DESC`) order. You can also specify how NULL values should be sorted using `NULLS FIRST` or `NULLS LAST`.',
          'The `LIMIT` clause restricts the number of rows returned, while `OFFSET` skips a specified number of rows before beginning to return data. Together, they are commonly used to implement pagination in web applications.',
          'While `LIMIT`/`OFFSET` is easy to implement, `OFFSET` can become slow for large datasets because the database still has to compute and skip the offset rows. For deep pagination, keyset pagination (cursor-based pagination) using `WHERE column > last_value ORDER BY column LIMIT n` is significantly more efficient.'
        ],
        code: `-- Offset Pagination\nSELECT id, title FROM posts\nORDER BY created_at DESC\nLIMIT 10 OFFSET 20;\n\n-- Keyset Pagination (More Efficient)\nSELECT id, title FROM posts\nWHERE created_at < '2023-10-01 12:00:00'\nORDER BY created_at DESC\nLIMIT 10;`,
        realWorldExample: 'An infinite scroll feed on a social media app uses keyset pagination to quickly load older posts without the performance penalty of deep OFFSETS.',
        interviewQuestion: 'Why does OFFSET pagination become slow on large datasets, and what is a better alternative?'
      }
    ]
  },
  {
    id: 'postgresql-insert-update-delete',
    slug: 'insert-update-delete',
    technology: 'postgresql',
    title: 'INSERT, UPDATE, DELETE',
    category: 'PostgreSQL',
    description: 'Modify data and handle conflicts using UPSERT.',
    section: '14. PostgreSQL',
    level: 6,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Inserting Data', 'Updating and Deleting', 'UPSERT'],
    references,
    sections: [
      {
        heading: 'Modifying Data and the RETURNING Clause',
        explanation: [
          'The `INSERT`, `UPDATE`, and `DELETE` statements manipulate data in tables. `INSERT` adds new rows, `UPDATE` modifies existing rows based on a `WHERE` clause, and `DELETE` removes rows based on a `WHERE` clause.',
          'A very powerful feature in PostgreSQL is the `RETURNING` clause. It can be appended to any DML statement to return the values of the rows that were inserted, updated, or deleted. This avoids the need for a subsequent SELECT query to fetch auto-generated IDs or default values.',
          'Always be extremely cautious with `UPDATE` and `DELETE` statements. Forgetting the `WHERE` clause will result in updating or deleting every single row in the table, which can be disastrous.'
        ],
        code: `-- Insert and return the generated ID\nINSERT INTO users (username, email) \nVALUES ('alice', 'alice@example.com')\nRETURNING id, created_at;\n\n-- Update and return new values\nUPDATE users SET is_active = false \nWHERE last_login < '2022-01-01'\nRETURNING id;`,
        whyItMatters: 'Data manipulation is how applications maintain state. The RETURNING clause specifically optimizes application performance by reducing network round trips.',
        interviewQuestion: 'What does the RETURNING clause do in PostgreSQL?',
        commonMistakes: [
          'Running UPDATE or DELETE without a WHERE clause.'
        ],
        bestPractices: [
          'Test UPDATE/DELETE queries as SELECT queries first to verify the WHERE clause filters the correct rows.'
        ]
      },
      {
        heading: 'UPSERT (ON CONFLICT)',
        explanation: [
          'An UPSERT operation attempts to insert a row, but if a unique constraint violation occurs (e.g., a duplicate primary key or unique email), it performs an update instead (or does nothing).',
          'In PostgreSQL, this is implemented using the `ON CONFLICT` clause on an `INSERT` statement. You specify the target (the column with the unique constraint) and the action (`DO UPDATE SET ...` or `DO NOTHING`).',
          'The special `EXCLUDED` table is used within the `DO UPDATE` clause to reference the row proposed for insertion. This allows you to update the existing row with the new values that were attempted to be inserted.'
        ],
        code: `INSERT INTO daily_stats (date, page_views)\nVALUES ('2023-10-25', 1)\nON CONFLICT (date) \nDO UPDATE SET page_views = daily_stats.page_views + EXCLUDED.page_views;`,
        realWorldExample: 'An analytics system processes page views continuously. It uses UPSERT to insert a new record for a day if it doesn\'t exist, or increment the counter if the day already exists.',
        interviewQuestion: 'How do you perform an UPSERT in PostgreSQL?'
      }
    ]
  },
  {
    id: 'postgresql-joins',
    slug: 'joins',
    technology: 'postgresql',
    title: 'JOINs',
    category: 'PostgreSQL',
    description: 'Combine data from multiple tables using various JOIN types.',
    section: '14. PostgreSQL',
    level: 7,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Inner and Outer Joins', 'Cross and Self Joins'],
    references,
    sections: [
      {
        heading: 'INNER and OUTER JOINs',
        explanation: [
          'JOINs are used to combine rows from two or more tables based on a related column between them. The `INNER JOIN` is the most common; it returns records that have matching values in both tables. If there is no match, the row is excluded from the result.',
          'Outer joins return matched rows plus unmatched rows from one or both tables. A `LEFT JOIN` (or LEFT OUTER JOIN) returns all rows from the left table, and the matched rows from the right table; unmatched rows on the right will contain NULLs.',
          'Similarly, `RIGHT JOIN` returns all rows from the right table. A `FULL OUTER JOIN` returns all rows when there is a match in either left or right table, filling in NULLs for missing matches on either side.'
        ],
        code: `-- INNER JOIN\nSELECT users.username, orders.order_date\nFROM users\nINNER JOIN orders ON users.id = orders.user_id;\n\n-- LEFT JOIN (Finds users with AND without orders)\nSELECT users.username, orders.order_id\nFROM users\nLEFT JOIN orders ON users.id = orders.user_id;`,
        whyItMatters: 'Relational databases normalize data into separate tables. JOINs are the mechanism to reconstruct that data into meaningful, combined views.',
        interviewQuestion: 'What is the difference between an INNER JOIN and a LEFT JOIN?',
        commonMistakes: [
          'Using INNER JOIN when you need to include records that might not have a relation (e.g., showing all users and their orders, even if they have zero orders).'
        ],
        bestPractices: [
          'Use table aliases to make multi-table queries readable.'
        ]
      },
      {
        heading: 'CROSS JOIN and Self Joins',
        explanation: [
          'A `CROSS JOIN` produces a Cartesian product of the two tables—every row in the first table is paired with every row in the second table. This is rarely used on large tables as it can generate an enormous number of rows, but it\'s useful for generating combinations.',
          'A Self Join is a regular join, but the table is joined with itself. This requires using table aliases to differentiate the instances of the table. It is commonly used for hierarchical data stored in a single table, like employees and managers.',
          'When joining tables, ensure the columns used in the `ON` condition are indexed, especially for large tables, to avoid slow sequential scans.'
        ],
        code: `-- Self Join to find employees and their managers\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;`,
        realWorldExample: 'A category table where a category can have a parent category stored in the same table uses a self join to resolve the category hierarchy.',
        interviewQuestion: 'When would you use a self join?'
      }
    ]
  },
  {
    id: 'postgresql-group-by-having',
    slug: 'group-by-having',
    technology: 'postgresql',
    title: 'GROUP BY & HAVING',
    category: 'PostgreSQL',
    description: 'Aggregate data using grouping and filtering aggregate results.',
    section: '14. PostgreSQL',
    level: 8,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Aggregations', 'Filtering with HAVING'],
    references,
    sections: [
      {
        heading: 'Aggregations and GROUP BY',
        explanation: [
          'Aggregate functions perform a calculation on a set of values and return a single value. Common functions include `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX`. By themselves, they aggregate the entire result set.',
          'The `GROUP BY` clause groups rows that have the same values in specified columns into summary rows. When you use `GROUP BY`, the database computes the aggregate functions for each group rather than the whole dataset.',
          'In PostgreSQL, the `FILTER` clause can be appended to an aggregate function to conditionally aggregate data. This is often cleaner and faster than using `CASE` statements inside the aggregate.'
        ],
        code: `SELECT \n  department,\n  COUNT(*) AS total_employees,\n  AVG(salary) AS avg_salary,\n  COUNT(*) FILTER (WHERE salary > 100000) AS high_earners\nFROM employees\nGROUP BY department;`,
        whyItMatters: 'Aggregation is the core of data reporting and analytics, transforming raw data into actionable insights.',
        interviewQuestion: 'How does the FILTER clause work with aggregate functions in PostgreSQL?',
        commonMistakes: [
          'Selecting a column that is not in the GROUP BY clause and is not wrapped in an aggregate function (PostgreSQL will throw an error).'
        ]
      },
      {
        heading: 'The HAVING Clause',
        explanation: [
          'The `WHERE` clause filters rows before they are grouped and aggregated. However, if you need to filter the results based on the aggregated values, you must use the `HAVING` clause.',
          '`HAVING` applies conditions to the groups created by `GROUP BY`. For example, you can group by department and then use `HAVING COUNT(*) > 5` to only show departments with more than 5 employees.',
          'Order of execution is important: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.'
        ],
        code: `SELECT department, COUNT(*) AS employee_count\nFROM employees\nGROUP BY department\nHAVING COUNT(*) >= 10;`,
        realWorldExample: 'Finding users who have made more than 5 purchases requires grouping by user_id and filtering with HAVING COUNT(order_id) > 5.',
        interviewQuestion: 'What is the difference between WHERE and HAVING?'
      }
    ]
  },
  {
    id: 'postgresql-subqueries',
    slug: 'subqueries',
    technology: 'postgresql',
    title: 'Subqueries',
    category: 'PostgreSQL',
    description: 'Nest queries within queries for complex data retrieval.',
    section: '14. PostgreSQL',
    level: 9,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Scalar and IN Subqueries', 'Correlated Subqueries and EXISTS'],
    references,
    sections: [
      {
        heading: 'Scalar and IN Subqueries',
        explanation: [
          'A subquery is a query nested inside another query. A scalar subquery returns exactly one row and one column, allowing it to be used where a single value is expected, like in a SELECT list or a WHERE comparison.',
          'Subqueries returning multiple rows can be used with operators like `IN`, `ANY`, or `ALL`. For instance, `WHERE id IN (SELECT user_id FROM orders)` finds all users who have placed an order.',
          'While useful, large `IN` subqueries can sometimes be inefficient. The query planner will attempt to optimize them, often by converting them into joins under the hood.'
        ],
        code: `-- Scalar subquery\nSELECT name, salary, \n  (SELECT AVG(salary) FROM employees) as company_avg\nFROM employees;\n\n-- IN subquery\nSELECT name FROM products\nWHERE category_id IN (SELECT id FROM categories WHERE is_active = true);`,
        whyItMatters: 'Subqueries allow you to break down complex logic into manageable, nested steps, making it possible to write powerful dynamic queries.',
        interviewQuestion: 'Can a subquery return multiple columns? If so, how is it used?'
      },
      {
        heading: 'Correlated Subqueries and EXISTS',
        explanation: [
          'A correlated subquery is a subquery that references columns from the outer query. It is evaluated once for each row processed by the outer query. This row-by-row execution can be slow for large datasets but is extremely expressive.',
          'The `EXISTS` operator tests for the existence of rows returned by a subquery. It stops processing as soon as it finds the first match (short-circuiting), making it highly efficient for checking existence compared to `IN` or `COUNT(*) > 0`.',
          '`EXISTS` is commonly used with correlated subqueries. For example, finding users who have at least one active subscription.'
        ],
        code: `-- Correlated subquery with EXISTS\nSELECT u.username\nFROM users u\nWHERE EXISTS (\n  SELECT 1 FROM orders o \n  WHERE o.user_id = u.id AND o.status = 'pending'\n);`,
        realWorldExample: 'Determining if a customer should receive a promotional email by checking EXISTS in their purchase history.',
        interviewQuestion: 'Why is EXISTS generally faster than using IN or COUNT for checking if records exist?',
        commonMistakes: [
          'Using a correlated subquery in the SELECT list for a large dataset, causing an N+1 query problem inside the database.'
        ],
        bestPractices: [
          'Prefer EXISTS over IN when checking against a subquery that returns a large number of rows.'
        ]
      }
    ]
  },
  {
    id: 'postgresql-common-table-expressions',
    slug: 'common-table-expressions',
    technology: 'postgresql',
    title: 'Common Table Expressions',
    category: 'PostgreSQL',
    description: 'Structure complex queries and perform recursive operations using WITH.',
    section: '14. PostgreSQL',
    level: 10,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Basic CTEs', 'Recursive CTEs'],
    references,
    sections: [
      {
        heading: 'Basic CTEs (WITH Clause)',
        explanation: [
          'A Common Table Expression (CTE) allows you to define a temporary, named result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement. CTEs are defined using the `WITH` keyword.',
          'CTEs improve the readability of complex SQL by breaking it down into logical, modular blocks, much like defining variables in programming. You can define multiple CTEs in a single query by separating them with commas.',
          'In PostgreSQL 12+, CTEs are evaluated inline by default if they are side-effect free and referenced only once. You can force them to be materialized (calculated once and stored in memory) using the `AS MATERIALIZED` keyword.'
        ],
        code: `WITH active_users AS (\n  SELECT id FROM users WHERE status = 'active'\n),\nhigh_value_orders AS (\n  SELECT user_id, total \n  FROM orders \n  WHERE total > 1000\n)\nSELECT u.id, o.total\nFROM active_users u\nJOIN high_value_orders o ON u.id = o.user_id;`,
        whyItMatters: 'CTEs transform massive, unreadable nested subqueries into clean, sequential, and maintainable SQL code.',
        interviewQuestion: 'What is a CTE and how does it improve query readability compared to subqueries?',
        bestPractices: [
          'Use CTEs to break down complex reporting queries into understandable steps.'
        ]
      },
      {
        heading: 'Recursive CTEs',
        explanation: [
          'The `RECURSIVE` modifier allows a CTE to reference itself. This is incredibly powerful for querying hierarchical data, such as organizational charts, bill of materials, or traversing graphs and trees.',
          'A recursive CTE consists of two parts: a non-recursive base term (the anchor) and a recursive term, combined using `UNION` or `UNION ALL`. The recursion continues until the recursive term returns no new rows.',
          'When writing recursive CTEs, it is crucial to ensure there is a termination condition to prevent infinite loops, especially if the data might contain circular references.'
        ],
        code: `WITH RECURSIVE subordinates AS (\n  -- Base term: start with the CEO (no manager)\n  SELECT id, name, manager_id, 1 AS depth\n  FROM employees\n  WHERE manager_id IS NULL\n  \n  UNION ALL\n  \n  -- Recursive term: find employees reporting to the current set\n  SELECT e.id, e.name, e.manager_id, s.depth + 1\n  FROM employees e\n  INNER JOIN subordinates s ON s.id = e.manager_id\n)\nSELECT * FROM subordinates ORDER BY depth;`,
        realWorldExample: 'Generating a navigation menu tree where items can have sub-items infinitely deep.',
        interviewQuestion: 'Explain the structure of a recursive CTE and provide a use case.',
        commonMistakes: [
          'Creating an infinite loop in a recursive CTE by missing a termination condition on cyclic data.'
        ]
      }
    ]
  },
  {
    id: 'postgresql-window-functions',
    slug: 'window-functions',
    technology: 'postgresql',
    title: 'Window Functions',
    category: 'PostgreSQL',
    description: 'Perform advanced analytics across sets of rows related to the current row.',
    section: '14. PostgreSQL',
    level: 11,
    difficulty: 'advanced',
    progress: 0,
    toc: ['OVER and PARTITION BY', 'Ranking and Offsets'],
    references,
    sections: [
      {
        heading: 'OVER and PARTITION BY',
        explanation: [
          'Window functions perform calculations across a set of table rows that are somehow related to the current row. Unlike aggregate functions with GROUP BY, window functions do not cause rows to become grouped into a single output row; the rows retain their separate identities.',
          'The `OVER` clause defines the window. `PARTITION BY` divides the result set into partitions (like groups) where the function is applied independently. `ORDER BY` defines the logical order of rows within each partition.',
          'You can use standard aggregates (SUM, AVG) as window functions. For example, calculating a running total or a moving average by defining a window frame.'
        ],
        code: `SELECT \n  department,\n  salary,\n  AVG(salary) OVER (PARTITION BY department) AS dept_avg,\n  salary - AVG(salary) OVER (PARTITION BY department) AS diff_from_avg\nFROM employees;`,
        whyItMatters: 'Window functions unlock powerful data analytics directly in the database, reducing the need to pull raw data into application code for processing.',
        interviewQuestion: 'How does a window function differ from a GROUP BY aggregate?',
        commonMistakes: [
          'Trying to use a window function inside a WHERE clause (they are evaluated after WHERE, so they must be used in a CTE or subquery first).'
        ]
      },
      {
        heading: 'Ranking and Offset Functions',
        explanation: [
          'PostgreSQL provides specific window functions for ranking. `ROW_NUMBER()` assigns a unique sequential integer to rows. `RANK()` and `DENSE_RANK()` handle ties differently; `RANK` leaves gaps in ranking for ties, while `DENSE_RANK` does not.',
          'Offset functions like `LAG()` and `LEAD()` allow you to access data from previous or subsequent rows in the same result set without using a self-join. This is extremely useful for calculating day-over-day changes or time-series analysis.',
          'Frames can be explicitly defined within the OVER clause (e.g., `ROWS BETWEEN 1 PRECEDING AND CURRENT ROW`) to calculate moving averages or rolling sums.'
        ],
        code: `-- Find the top 3 highest paid employees per department\nWITH RankedSalaries AS (\n  SELECT name, department, salary,\n         DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank\n  FROM employees\n)\nSELECT * FROM RankedSalaries WHERE rank <= 3;\n\n-- Calculate day-over-day revenue difference\nSELECT date, revenue,\n       revenue - LAG(revenue) OVER (ORDER BY date) as daily_growth\nFROM daily_sales;`,
        realWorldExample: 'Calculating financial metrics like a 30-day moving average or identifying the month-over-month growth rate.',
        interviewQuestion: 'Explain the difference between ROW_NUMBER, RANK, and DENSE_RANK.'
      }
    ]
  },
  {
    id: 'postgresql-indexes',
    slug: 'indexes',
    technology: 'postgresql',
    title: 'Indexes',
    category: 'PostgreSQL',
    description: 'Optimize query performance using different index types and strategies.',
    section: '14. PostgreSQL',
    level: 12,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Index Types', 'Advanced Indexing'],
    references,
    sections: [
      {
        heading: 'B-tree, Hash, GIN, and GiST Indexes',
        explanation: [
          'Indexes are specialized data structures that improve the speed of data retrieval operations. PostgreSQL supports several index types. The default is B-tree, which handles equality and range queries (`<`, `<=`, `=`, `>=`, `>`).',
          'Hash indexes only handle simple equality checks but can be slightly smaller and faster than B-trees for that specific use case. GIN (Generalized Inverted Index) is ideal for indexing data types that contain multiple values, like arrays, full-text search vectors, and JSONB.',
          'GiST (Generalized Search Tree) is a framework that allows building custom index strategies, commonly used for geometric data types (PostGIS) and full-text search. BRIN (Block Range Index) is extremely efficient for very large tables where data has a natural sort order.'
        ],
        code: `-- Default B-tree index\nCREATE INDEX idx_users_email ON users(email);\n\n-- GIN index for JSONB queries\nCREATE INDEX idx_users_metadata ON users USING GIN (metadata);`,
        whyItMatters: 'Without indexes, databases must perform full sequential scans for every query. Proper indexing is the most critical factor in database performance.',
        interviewQuestion: 'When would you use a GIN index instead of a standard B-tree index?',
        commonMistakes: [
          'Over-indexing: creating too many indexes slows down INSERT, UPDATE, and DELETE operations.',
          'Indexing columns with low cardinality (e.g., a boolean "is_active" column on a table with a 50/50 split).'
        ]
      },
      {
        heading: 'Partial, Expression, and Index-Only Scans',
        explanation: [
          'A partial index covers only a subset of a table, defined by a WHERE clause. It is smaller and faster. For example, indexing only "unprocessed" orders is efficient if you frequently query for them but they make up a small fraction of the table.',
          'Expression indexes are created on the result of a function or scalar expression, rather than a column. If you always query `WHERE LOWER(email) = ...`, a standard index on `email` won\'t be used, but an index on `LOWER(email)` will.',
          'An Index-Only Scan occurs when the query requests only columns that are part of the index. The database can retrieve the data directly from the index without visiting the actual table heap, significantly speeding up the query.'
        ],
        code: `-- Partial Index\nCREATE INDEX idx_pending_orders ON orders(created_at) WHERE status = 'pending';\n\n-- Expression Index\nCREATE INDEX idx_lower_email ON users(LOWER(email));`,
        realWorldExample: 'A system that soft-deletes records creates a partial index `WHERE deleted_at IS NULL` to speed up all queries for active records while keeping the index small.',
        interviewQuestion: 'What is a partial index and what are its benefits?'
      }
    ]
  },
  {
    id: 'postgresql-transactions-acid',
    slug: 'transactions-acid',
    technology: 'postgresql',
    title: 'Transactions & ACID',
    category: 'PostgreSQL',
    description: 'Ensure data consistency using transactions and understand ACID properties.',
    section: '14. PostgreSQL',
    level: 13,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['ACID Properties', 'Transaction Control'],
    references,
    sections: [
      {
        heading: 'ACID Properties',
        explanation: [
          'Transactions bundle multiple SQL operations into a single, all-or-nothing unit of work. Relational databases like PostgreSQL guarantee transactions follow ACID properties: Atomicity, Consistency, Isolation, and Durability.',
          'Atomicity guarantees that all operations in a transaction succeed, or none do. Consistency ensures the database transitions from one valid state to another, enforcing all constraints. Isolation ensures concurrent transactions do not interfere with each other.',
          'Durability guarantees that once a transaction is committed, it remains committed even in the event of a system failure (usually via a Write-Ahead Log, WAL).'
        ],
        whyItMatters: 'ACID properties are the bedrock of database reliability. They allow developers to trust the database with critical data like financial transactions.',
        interviewQuestion: 'Explain the ACID properties of a database.',
        commonMistakes: [
          'Performing long-running tasks (like API calls) while holding open a database transaction, which blocks other operations and exhausts connection pools.'
        ]
      },
      {
        heading: 'Transaction Control Commands',
        explanation: [
          'Transactions are started with `BEGIN`. The changes made are visible only to the current transaction. To make them permanent and visible to others, use `COMMIT`. To discard the changes, use `ROLLBACK`.',
          'PostgreSQL automatically wraps single statements in a transaction if not explicitly started. If an error occurs during a transaction block, PostgreSQL aborts the transaction, and any further statements will fail until a ROLLBACK is issued.',
          'Savepoints (`SAVEPOINT name`) allow you to create intermediate markers within a transaction. You can rollback to a savepoint without aborting the entire transaction, which is useful for handling partial failures gracefully.'
        ],
        code: `BEGIN;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- If all is well\nCOMMIT;\n\n-- If an error occurred or logic failed\n-- ROLLBACK;`,
        realWorldExample: 'A bank transfer must deduct money from Account A and add it to Account B. If adding to B fails, the deduction from A must be rolled back to prevent money from disappearing.',
        bestPractices: [
          'Keep transactions as short and fast as possible to minimize lock contention.'
        ]
      }
    ]
  },
  {
    id: 'postgresql-isolation-levels',
    slug: 'isolation-levels',
    technology: 'postgresql',
    title: 'Isolation Levels',
    category: 'PostgreSQL',
    description: 'Manage concurrent data access and prevent read phenomena.',
    section: '14. PostgreSQL',
    level: 14,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Read Phenomena', 'Isolation Levels'],
    references,
    sections: [
      {
        heading: 'Read Phenomena',
        explanation: [
          'When multiple transactions run concurrently, isolation levels define what data they can see. Inadequate isolation can lead to anomalies. A "Dirty Read" occurs when a transaction reads uncommitted changes from another transaction (PostgreSQL never allows this).',
          'A "Non-repeatable Read" happens when a transaction reads a row, another transaction updates that row and commits, and the first transaction reads the row again, seeing the new data.',
          'A "Phantom Read" occurs when a transaction executes a query returning a set of rows, another transaction inserts or deletes rows matching the query, and the first transaction repeats the query, seeing a different set of rows.'
        ],
        whyItMatters: 'Understanding read phenomena is critical for writing correct concurrent software, such as inventory management or ticketing systems.',
        interviewQuestion: 'Describe dirty reads, non-repeatable reads, and phantom reads.'
      },
      {
        heading: 'PostgreSQL Isolation Levels',
        explanation: [
          'The SQL standard defines four isolation levels. `READ UNCOMMITTED` allows dirty reads, but in PostgreSQL, this is treated exactly the same as `READ COMMITTED`.',
          '`READ COMMITTED` is the default in PostgreSQL. A query only sees data committed before the query started. However, successive queries within the same transaction can see different data if concurrent transactions commit updates (Non-repeatable reads).',
          '`REPEATABLE READ` guarantees a transaction sees a snapshot of the database from the moment the transaction began, preventing non-repeatable reads. `SERIALIZABLE` provides the strictest isolation, executing transactions as if they were strictly sequential, preventing all anomalies including phantom reads and serialization anomalies, but aborting transactions if conflicts occur.'
        ],
        code: `BEGIN ISOLATION LEVEL SERIALIZABLE;\n\n-- Operations here\n\nCOMMIT;`,
        realWorldExample: 'A financial reporting job that requires absolute consistency across multiple large queries runs in a REPEATABLE READ transaction to ensure it doesn\'t see half-finished data updates.',
        interviewQuestion: 'What is the default isolation level in PostgreSQL and what anomalies does it prevent?',
        commonMistakes: [
          'Using SERIALIZABLE isolation without implementing retry logic in the application code, as serializable transactions will fail if the database detects a conflict.'
        ]
      }
    ]
  },
  {
    id: 'postgresql-locks',
    slug: 'locks',
    technology: 'postgresql',
    title: 'Locks',
    category: 'PostgreSQL',
    description: 'Control concurrency using row locks, table locks, and advisory locks.',
    section: '14. PostgreSQL',
    level: 15,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Explicit Row Locking', 'Advisory Locks and Deadlocks'],
    references,
    sections: [
      {
        heading: 'Explicit Row Locking (SELECT FOR UPDATE)',
        explanation: [
          'While PostgreSQL handles locking automatically for most operations via MVCC (Multi-Version Concurrency Control), sometimes you need explicit row-level locks. `SELECT ... FOR UPDATE` locks the selected rows, preventing other transactions from updating or deleting them until the current transaction completes.',
          '`SELECT ... FOR SHARE` is a weaker lock that prevents concurrent updates but allows other transactions to also acquire a SHARE lock.',
          'The `SKIP LOCKED` clause is extremely useful for implementing job queues. It skips rows that are already locked by other transactions, allowing concurrent workers to safely grab different jobs from the same table without blocking.'
        ],
        code: `-- Worker 1 grabs a job and locks it\nBEGIN;\nSELECT * FROM jobs \nWHERE status = 'pending' \nORDER BY created_at \nLIMIT 1 \nFOR UPDATE SKIP LOCKED;\n\n-- Update job status to processing\n-- COMMIT;`,
        whyItMatters: 'Explicit locking is required when application logic must read a value, perform complex application-side logic, and update it safely in a concurrent environment.',
        interviewQuestion: 'How would you implement a robust job queue using PostgreSQL?'
      },
      {
        heading: 'Advisory Locks and Deadlocks',
        explanation: [
          'Advisory locks are application-defined locks managed by PostgreSQL. They don\'t lock actual rows or tables; they lock an abstract 64-bit number. They are useful for distributed locking across application servers (e.g., ensuring a cron job only runs on one server).',
          'A deadlock occurs when two transactions wait for locks held by each other, creating an infinite standoff. PostgreSQL automatically detects deadlocks, aborts one of the transactions, and raises an error.',
          'To avoid deadlocks, applications should always acquire locks (e.g., update rows) in a consistent, predictable order.'
        ],
        code: `-- Acquire a transaction-level advisory lock\nSELECT pg_try_advisory_xact_lock(12345);\n-- Returns true if lock was acquired, false if held by another session`,
        realWorldExample: 'Using an advisory lock to prevent a daily summary report generation script from running concurrently on multiple containers.',
        interviewQuestion: 'What is a deadlock and how can you prevent it?',
        bestPractices: [
          'Always update tables and rows in the same alphabetical or ID-based order across all application transactions to prevent deadlocks.'
        ]
      }
    ]
  },
  {
    id: 'postgresql-normalization',
    slug: 'normalization',
    technology: 'postgresql',
    title: 'Normalization',
    category: 'PostgreSQL',
    description: 'Design efficient schemas by eliminating data redundancy.',
    section: '14. PostgreSQL',
    level: 16,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['First and Second Normal Forms', 'Third Normal Form and BCNF'],
    references,
    sections: [
      {
        heading: 'First (1NF) and Second (2NF) Normal Forms',
        explanation: [
          'Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. The First Normal Form (1NF) requires that all columns contain atomic (indivisible) values and that each record is unique. You shouldn\'t have a comma-separated list of tags in a single column.',
          'Second Normal Form (2NF) builds on 1NF. It requires that the table is in 1NF and all non-key attributes are fully functionally dependent on the primary key. This is mostly relevant for tables with composite primary keys; a column shouldn\'t depend on only half of the primary key.',
          'Violating these forms leads to update anomalies. For instance, if you store the customer\'s address on every order row, a change of address requires updating multiple rows, risking inconsistencies.'
        ],
        whyItMatters: 'Normalization prevents data anomalies (insert, update, delete) and reduces storage space by ensuring a fact is recorded in only one place.',
        interviewQuestion: 'What is database normalization and what are its primary goals?',
        commonMistakes: [
          'Storing multiple values in a single column (e.g., a CSV string) instead of creating a junction table.'
        ]
      },
      {
        heading: 'Third Normal Form (3NF) and Beyond',
        explanation: [
          'Third Normal Form (3NF) dictates that a table must be in 2NF and all non-primary-key attributes must be mutually independent. In short: "Every non-key attribute must provide a fact about the key, the whole key, and nothing but the key."',
          'If a `books` table contains `publisher_id`, `publisher_name`, and `publisher_address`, it violates 3NF because the address depends on the publisher, not the book. The publisher details should be moved to a separate table.',
          'Boyce-Codd Normal Form (BCNF) is a slightly stronger version of 3NF that handles edge cases involving overlapping composite candidate keys. In most practical business applications, reaching 3NF is the standard goal.'
        ],
        realWorldExample: 'Separating user profiles, addresses, and orders into distinct tables linked by foreign keys, rather than a giant flat spreadsheet.',
        interviewQuestion: 'Explain Third Normal Form (3NF) in simple terms.'
      }
    ]
  },
  {
    id: 'postgresql-denormalization',
    slug: 'denormalization',
    technology: 'postgresql',
    title: 'Denormalization',
    category: 'PostgreSQL',
    description: 'Strategically introduce redundancy to optimize read performance.',
    section: '14. PostgreSQL',
    level: 17,
    difficulty: 'advanced',
    progress: 0,
    toc: ['When to Denormalize', 'Materialized Views'],
    references,
    sections: [
      {
        heading: 'When and Why to Denormalize',
        explanation: [
          'While normalization is the theoretical ideal, strictly normalized schemas can require expensive, multi-table JOINs for common read operations. Denormalization is the deliberate introduction of redundancy to optimize read performance at the expense of write performance and complexity.',
          'Denormalization is appropriate in read-heavy systems (like analytical databases or high-traffic web apps) where the cost of JOINs outweighs the cost of maintaining duplicate data. Common techniques include caching aggregate counts (e.g., a `comment_count` on a post table) or copying frequently accessed joined data.',
          'The tradeoff is that application logic or database triggers must now ensure data consistency across multiple places whenever data is updated, re-introducing the risk of update anomalies.'
        ],
        whyItMatters: 'At massive scale, CPU and memory costs of complex JOINs become prohibitive. Denormalization is a pragmatic scaling technique.',
        interviewQuestion: 'When would you choose to denormalize a database schema?',
        commonMistakes: [
          'Denormalizing too early as a premature optimization before proven performance bottlenecks exist.'
        ]
      },
      {
        heading: 'Materialized Views',
        explanation: [
          'A Materialized View is a powerful denormalization feature in PostgreSQL. Unlike a standard View (which is essentially a saved query that executes on the fly), a Materialized View physically stores the result of the query on disk.',
          'Because the data is pre-computed and stored, reading from a materialized view is as fast as reading from a regular table. You can even add indexes to it. The catch is that the data becomes stale as the underlying tables change.',
          'You must periodically update the data using `REFRESH MATERIALIZED VIEW`. By using `REFRESH MATERIALIZED VIEW CONCURRENTLY` (which requires a unique index on the view), you can refresh the data in the background without locking out concurrent read queries.'
        ],
        code: `CREATE MATERIALIZED VIEW daily_sales_summary AS\nSELECT date_trunc('day', order_date) as day, SUM(total) as revenue\nFROM orders\nGROUP BY 1;\n\nCREATE UNIQUE INDEX idx_mv_daily_sales ON daily_sales_summary(day);\n\n-- Run this on a cron schedule\nREFRESH MATERIALIZED VIEW CONCURRENTLY daily_sales_summary;`,
        realWorldExample: 'A complex dashboard calculating analytics over millions of rows uses a materialized view refreshed every hour to load instantly.',
        interviewQuestion: 'What is the difference between a View and a Materialized View?'
      }
    ]
  },
  {
    id: 'postgresql-query-optimization',
    slug: 'query-optimization',
    technology: 'postgresql',
    title: 'Query Optimization',
    category: 'PostgreSQL',
    description: 'Understand the query planner and optimize slow queries.',
    section: '14. PostgreSQL',
    level: 18,
    difficulty: 'advanced',
    progress: 0,
    toc: ['The Query Planner', 'Join Strategies'],
    references,
    sections: [
      {
        heading: 'The Query Planner and Statistics',
        explanation: [
          'When you submit an SQL query, PostgreSQL parses it and hands it to the Query Planner/Optimizer. The planner generates multiple possible execution plans and estimates their cost based on CPU and I/O. It then executes the plan with the lowest estimated cost.',
          'The planner relies heavily on table statistics, which describe data distribution, common values, and row counts. These statistics are gathered automatically by the `ANALYZE` command, which is usually run by the autovacuum daemon.',
          'If statistics are severely outdated, the planner might choose a terrible execution plan (e.g., doing a sequential scan on a massive table because it incorrectly thinks the table only has 10 rows). Running `ANALYZE table_name` manually updates these stats.'
        ],
        whyItMatters: 'Understanding how the planner makes decisions is the key to fixing performance issues that indexes alone cannot solve.',
        interviewQuestion: 'How does PostgreSQL decide whether to use an index or perform a sequential scan?',
        commonMistakes: [
          'Assuming an index will always be used. The planner will ignore an index if it estimates that scanning the index and then fetching the rows is more expensive than simply scanning the whole table sequentially.'
        ]
      },
      {
        heading: 'Join Strategies',
        explanation: [
          'PostgreSQL uses three primary strategies to execute JOINs. A Nested Loop Join iterates through rows in the outer table and looks up matching rows in the inner table. It is efficient for small datasets or when the inner table is well-indexed.',
          'A Hash Join hashes the smaller table into memory, then scans the larger table, probing the hash table for matches. It is very fast for joining large, unindexed data sets but requires sufficient `work_mem`.',
          'A Merge Join sorts both tables on the join keys and then merges them. It is highly efficient if the inputs are already sorted (e.g., via an index scan) or if the data sets are extremely large.'
        ],
        realWorldExample: 'Increasing the `work_mem` configuration allows PostgreSQL to perform faster Hash Joins in memory rather than spilling to temporary disk files.',
        interviewQuestion: 'Describe the three main join strategies used by PostgreSQL (Nested Loop, Hash, Merge).'
      }
    ]
  },
  {
    id: 'postgresql-explain-analyze',
    slug: 'explain-analyze',
    technology: 'postgresql',
    title: 'EXPLAIN & EXPLAIN ANALYZE',
    category: 'PostgreSQL',
    description: 'Profile queries to identify bottlenecks using EXPLAIN.',
    section: '14. PostgreSQL',
    level: 19,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Reading Execution Plans', 'EXPLAIN ANALYZE and BUFFERS'],
    references,
    sections: [
      {
        heading: 'Reading Execution Plans',
        explanation: [
          'The `EXPLAIN` command shows the execution plan the query planner has generated for a statement. It details the tree of nodes (Seq Scan, Index Scan, Hash Join, etc.) and provides estimated startup costs, total costs, rows, and width for each node.',
          'Costs are arbitrary units (usually tied to disk page fetches). The plan is read from the inside out / bottom up. The most indented nodes are executed first, passing their output up to the parent nodes.',
          'Using `EXPLAIN` without `ANALYZE` does not actually execute the query; it only plans it. This is safe to run on large UPDATE or DELETE queries to see how they will perform without altering data.'
        ],
        code: `EXPLAIN \nSELECT * FROM users u \nJOIN orders o ON u.id = o.user_id \nWHERE u.status = 'active';`,
        whyItMatters: 'EXPLAIN is the ultimate diagnostic tool. Without it, tuning queries is just guessing.',
        interviewQuestion: 'How do you read a PostgreSQL EXPLAIN plan?',
        bestPractices: [
          'Use graphical explain tools (like explain.depesz.com or pgMustard) to visualize complex query plans.'
        ]
      },
      {
        heading: 'EXPLAIN ANALYZE and BUFFERS',
        explanation: [
          '`EXPLAIN ANALYZE` actually executes the query and compares the planner\'s estimates with the actual execution times and row counts. This immediately reveals if outdated statistics caused bad estimates.',
          'Adding the `BUFFERS` option (`EXPLAIN (ANALYZE, BUFFERS)`) is critical for deep optimization. It shows how many data blocks (buffers) were read from cache (shared hit) versus read from disk (read). High disk reads indicate an I/O bottleneck.',
          'Warning: Because `EXPLAIN ANALYZE` executes the query, running `EXPLAIN ANALYZE DELETE ...` will actually delete your data. Wrap it in a transaction and rollback if you only want to profile it.'
        ],
        code: `BEGIN;\nEXPLAIN (ANALYZE, BUFFERS)\nUPDATE accounts SET balance = balance + 1;\nROLLBACK;`,
        realWorldExample: 'A slow API endpoint was debugged using EXPLAIN ANALYZE, revealing a "Seq Scan" that took 2 seconds, which was fixed instantly by adding a missing index.',
        interviewQuestion: 'What is the difference between EXPLAIN and EXPLAIN ANALYZE?'
      }
    ]
  },
  {
    id: 'postgresql-lab-user-database',
    slug: 'lab-user-database',
    technology: 'postgresql',
    title: 'Lab: User Database',
    category: 'PostgreSQL',
    description: 'Design a user table with constraints and write basic CRUD queries.',
    section: '14. PostgreSQL',
    level: 20,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Objective', 'Setup', 'Tasks'],
    sections: [
      {
        heading: 'Introduction',
        explanation: [
          'In this lab, you will put your foundational PostgreSQL knowledge to the test. You will design a schema for a user management system from scratch, ensuring data integrity through strict constraints.',
          'Once the schema is built, you will write the necessary Data Manipulation Language (DML) queries to insert, update, and query the data safely.',
          'Focus on using the correct data types, particularly for timestamps and text fields, and applying constraints to prevent bad data.'
        ],
        whyItMatters: 'Building a rock-solid user table is usually the very first step in creating any web application.'
      }
    ],
    lab: {
      title: 'Design a User Table',
      objective: 'Create a `users` table with specific constraints and perform CRUD operations.',
      starterCode: `-- Write your CREATE TABLE statement here\n\n\n-- Write your INSERT statements here\n\n\n-- Write your SELECT statement here`,
      expectedOutput: 'A successfully created table with data inserted, and a query returning active users.',
      solution: `CREATE TABLE users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  username VARCHAR(50) UNIQUE NOT NULL,\n  email TEXT UNIQUE NOT NULL CHECK (email LIKE '%@%'),\n  age INT CHECK (age >= 18),\n  is_active BOOLEAN DEFAULT true,\n  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP\n);\n\nINSERT INTO users (username, email, age) \nVALUES ('alice123', 'alice@example.com', 25),\n       ('bob_builder', 'bob@example.com', 30);\n\nSELECT id, username, email \nFROM users \nWHERE is_active = true;`,
      hints: [
        'Use UUID for the primary key.',
        'Ensure the email has a CHECK constraint looking for the @ symbol.',
        'Remember to use TIMESTAMPTZ for the created_at column.'
      ]
    }
  },
  {
    id: 'postgresql-lab-e-commerce-database',
    slug: 'lab-e-commerce-database',
    technology: 'postgresql',
    title: 'Lab: E-Commerce Database',
    category: 'PostgreSQL',
    description: 'Build a multi-table schema for products, orders, and order_items with JOINs.',
    section: '14. PostgreSQL',
    level: 21,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Objective', 'Schema Design', 'Queries'],
    sections: [
      {
        heading: 'Introduction',
        explanation: [
          'This lab focuses on relational design. You will build a normalized schema for an e-commerce platform consisting of customers, products, orders, and a junction table for order items.',
          'You must correctly configure Primary Keys and Foreign Keys to enforce referential integrity. Ensure that deleting a user handles their associated orders appropriately.',
          'After establishing the schema, you will write complex JOIN queries to generate receipts and sales reports.'
        ]
      }
    ],
    lab: {
      title: 'E-Commerce Relational Queries',
      objective: 'Create a multi-table schema and query order totals using JOINs and aggregations.',
      starterCode: `-- Create customers, products, orders, and order_items tables\n\n\n-- Write a query to find the total revenue per customer`,
      expectedOutput: 'A list of customers and their total spent, sorted by highest spender.',
      solution: `CREATE TABLE customers (id SERIAL PRIMARY KEY, name TEXT);\nCREATE TABLE products (id SERIAL PRIMARY KEY, price NUMERIC);\nCREATE TABLE orders (id SERIAL PRIMARY KEY, customer_id INT REFERENCES customers(id));\nCREATE TABLE order_items (\n  order_id INT REFERENCES orders(id),\n  product_id INT REFERENCES products(id),\n  quantity INT,\n  PRIMARY KEY (order_id, product_id)\n);\n\n-- Total revenue per customer\nSELECT c.name, SUM(p.price * oi.quantity) AS total_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id\nGROUP BY c.id, c.name\nORDER BY total_spent DESC;`,
      hints: [
        'order_items needs a composite primary key.',
        'You will need to join 4 tables to calculate the total spent by a customer.'
      ]
    }
  },
  {
    id: 'postgresql-lab-booking-system',
    slug: 'lab-booking-system',
    technology: 'postgresql',
    title: 'Lab: Booking System',
    category: 'PostgreSQL',
    description: 'Create a reservation system with conflict detection using exclusion constraints.',
    section: '14. PostgreSQL',
    level: 22,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Objective', 'Setup', 'Tasks'],
    sections: [
      {
        heading: 'Introduction',
        explanation: [
          'Scheduling and booking systems are notoriously difficult to build safely due to race conditions. In this lab, you will push the conflict detection logic down to the database using PostgreSQL\'s range types and exclusion constraints.',
          'You will create a system for booking meeting rooms. The database must fundamentally reject any INSERT that attempts to book a room that overlaps with an existing booking.',
          'You will need to enable the `btree_gist` extension to create the exclusion constraint on the room ID and time range.'
        ],
        realWorldExample: 'Airbnb and hotel booking engines rely heavily on constraints and transaction isolation to prevent double-booking.'
      }
    ],
    lab: {
      title: 'Conflict-Free Booking System',
      objective: 'Use TSTZRANGE and EXCLUDE to prevent overlapping bookings in the same room.',
      starterCode: `CREATE EXTENSION IF NOT EXISTS btree_gist;\n\n-- Create the bookings table with an exclusion constraint\n\n\n-- Attempt to insert overlapping records`,
      expectedOutput: 'The first insert succeeds, and the second overlapping insert fails with a constraint violation error.',
      solution: `CREATE EXTENSION IF NOT EXISTS btree_gist;\n\nCREATE TABLE bookings (\n  id SERIAL PRIMARY KEY,\n  room_id INT NOT NULL,\n  booking_period TSTZRANGE NOT NULL,\n  EXCLUDE USING GIST (\n    room_id WITH =,\n    booking_period WITH &&\n  )\n);\n\n-- Succeeds\nINSERT INTO bookings (room_id, booking_period) \nVALUES (1, '[2023-11-01 10:00, 2023-11-01 12:00)');\n\n-- Fails: Overlaps by 1 hour\nINSERT INTO bookings (room_id, booking_period) \nVALUES (1, '[2023-11-01 11:00, 2023-11-01 13:00)');`,
      hints: [
        'Use TSTZRANGE for the time period.',
        'The exclusion operator for overlap is &&.'
      ]
    }
  },
  {
    id: 'postgresql-lab-banking-transactions',
    slug: 'lab-banking-transactions',
    technology: 'postgresql',
    title: 'Lab: Banking Transactions',
    category: 'PostgreSQL',
    description: 'Implement a safe money transfer system using transactions and locking.',
    section: '14. PostgreSQL',
    level: 23,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Objective', 'Setup', 'Tasks'],
    sections: [
      {
        heading: 'Introduction',
        explanation: [
          'Financial systems require strict guarantees. In this lab, you will simulate a money transfer between two bank accounts. The operation must be atomic—either both the debit and credit succeed, or neither does.',
          'Furthermore, you must prevent race conditions where two concurrent transactions try to transfer money out of the same account simultaneously, potentially driving the balance below zero.',
          'You will use explicit transactions, `CHECK` constraints, and `SELECT FOR UPDATE` to guarantee absolute correctness.'
        ]
      }
    ],
    lab: {
      title: 'Atomic Money Transfer',
      objective: 'Write a transaction block that transfers funds safely using row locks.',
      starterCode: `CREATE TABLE accounts (id INT PRIMARY KEY, balance NUMERIC CHECK (balance >= 0));\nINSERT INTO accounts VALUES (1, 1000), (2, 500);\n\n-- Write a transaction block to transfer 200 from account 1 to account 2\nBEGIN;\n\n\n\nCOMMIT;`,
      expectedOutput: 'Account 1 balance is 800, Account 2 balance is 700. Concurrent attempts to overdraft fail.',
      solution: `BEGIN;\n\n-- Lock the rows first to prevent concurrent modification\n-- Ordering by ID prevents deadlocks if another tx locks them in reverse order\nSELECT * FROM accounts WHERE id IN (1, 2) ORDER BY id FOR UPDATE;\n\n-- Perform the updates\nUPDATE accounts SET balance = balance - 200 WHERE id = 1;\nUPDATE accounts SET balance = balance + 200 WHERE id = 2;\n\nCOMMIT;`,
      hints: [
        'Lock the rows you intend to update first using FOR UPDATE.',
        'Order your locks by ID to avoid deadlocks.'
      ]
    }
  },
  {
    id: 'postgresql-lab-analytics-queries',
    slug: 'lab-analytics-queries',
    technology: 'postgresql',
    title: 'Lab: Analytics Queries',
    category: 'PostgreSQL',
    description: 'Write complex reporting queries using window functions and CTEs.',
    section: '14. PostgreSQL',
    level: 24,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Objective', 'Setup', 'Tasks'],
    sections: [
      {
        heading: 'Introduction',
        explanation: [
          'Modern applications often require complex in-database analytics. In this final lab, you will combine CTEs, Window Functions, and Aggregations to generate a comprehensive sales report.',
          'You are tasked with finding the top-selling product in each category, calculating the running total of sales for the current month, and comparing each day\'s revenue to the previous day.',
          'Break the problem down into manageable steps using multiple CTEs chained together.'
        ]
      }
    ],
    lab: {
      title: 'Advanced Sales Analytics',
      objective: 'Use window functions to calculate running totals and month-over-month growth.',
      starterCode: `-- Assume a daily_sales table exists with (date, category_id, revenue)\n\n-- Write a query using CTEs and Window Functions to find:\n-- 1. A running total of revenue ordered by date\n-- 2. The difference in revenue from the previous day`,
      expectedOutput: 'A dataset showing daily revenue, cumulative revenue, and day-over-day changes.',
      solution: `WITH SalesStats AS (\n  SELECT \n    date,\n    revenue,\n    SUM(revenue) OVER (ORDER BY date) as running_total,\n    LAG(revenue) OVER (ORDER BY date) as prev_day_revenue\n  FROM daily_sales\n)\nSELECT \n  date,\n  revenue,\n  running_total,\n  revenue - prev_day_revenue AS daily_difference\nFROM SalesStats;`,
      hints: [
        'Use SUM() OVER() for the running total.',
        'Use LAG() OVER() to get the previous row\'s value.'
      ]
    }
  }
];
