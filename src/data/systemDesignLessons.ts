import type { Lesson } from '../types'

const references = [
  { label: 'Google SRE Book', url: 'https://sre.google/sre-book/table-of-contents/' },
  { label: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' }
]

export const systemDesignLessons: Lesson[] = [
  {
    id: 'what-is-system-design',
    slug: 'what-is-system-design',
    technology: 'system-design',
    title: 'What is System Design?',
    category: 'System Design',
    description: 'An introduction to system design and why it matters in modern software engineering.',
    section: '17. System Design',
    level: 1,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Introduction', 'Core Objectives'],
    references,
    sections: [
      {
        heading: 'Introduction',
        explanation: [
          'System design is the process of defining the architecture, modules, interfaces, and data for a system to satisfy specified requirements. It represents the phase where theoretical requirements are translated into a concrete technical blueprint.',
          'In modern software engineering, system design is crucial because applications are no longer simple monoliths running on a single server. They are complex, distributed systems that must handle massive scale, remain available during failures, and perform efficiently.',
          'Mastering system design requires understanding the trade-offs between different architectural choices. There is rarely a single "correct" answer; instead, there are multiple viable solutions, each with its own pros and cons regarding scalability, cost, and complexity.'
        ],
        whyItMatters: 'System design is essential for building scalable, robust applications and is a critical component of senior engineering interviews.',
        interviewQuestion: 'What are the primary goals of the system design process?'
      },
      {
        heading: 'Core Objectives',
        explanation: [
          'The primary objectives of system design include ensuring scalability, reliability, and maintainability. A well-designed system can gracefully handle increases in load without degrading performance.',
          'Reliability implies that the system continues to operate correctly even in the face of hardware or software failures. This often involves introducing redundancy and implementing automated failover mechanisms.',
          'Maintainability focuses on making the system easy to understand, modify, and extend over time. This is achieved through modularity, clear interfaces, and comprehensive documentation.'
        ],
        interviewQuestion: 'How do scalability, reliability, and maintainability interact in system design?'
      }
    ]
  },
  {
    id: 'scalability',
    slug: 'scalability',
    technology: 'system-design',
    title: 'Scalability',
    category: 'System Design',
    description: 'Understand the difference between vertical and horizontal scaling.',
    section: '17. System Design',
    level: 2,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Vertical Scaling', 'Horizontal Scaling'],
    references,
    sections: [
      {
        heading: 'Vertical Scaling',
        explanation: [
          'Vertical scaling, or "scaling up," involves adding more power (CPU, RAM, Storage) to an existing server. It is the simplest approach to handling increased load because it typically requires no changes to the application architecture.',
          'However, vertical scaling has significant limitations. There is a hard physical limit to how much a single machine can be upgraded. Furthermore, high-end hardware becomes exponentially more expensive as you reach the upper tiers of performance.',
          'Another major drawback of vertical scaling is the lack of redundancy. If the single powerful server goes down, the entire application goes offline, creating a single point of failure.'
        ],
        whyItMatters: 'Understanding when to scale vertically vs horizontally is a fundamental architectural decision.',
        interviewQuestion: 'What are the main limitations of vertical scaling?'
      },
      {
        heading: 'Horizontal Scaling',
        explanation: [
          'Horizontal scaling, or "scaling out," involves adding more servers to a resource pool to distribute the load. This approach is favored in modern distributed systems because it offers theoretically infinite scalability.',
          'Unlike vertical scaling, horizontal scaling relies on commodity hardware, making it more cost-effective. It also inherently provides redundancy; if one server fails, others can take over the load, improving overall availability.',
          'The trade-off is increased complexity. Horizontal scaling requires load balancers to distribute traffic, distributed data storage strategies, and stateless application design to function correctly.'
        ],
        interviewQuestion: 'Why is statelessness important for horizontal scaling?'
      }
    ]
  },
  {
    id: 'availability-and-reliability',
    slug: 'availability-reliability',
    technology: 'system-design',
    title: 'Availability & Reliability',
    category: 'System Design',
    description: 'Learn how to measure and design for high availability.',
    section: '17. System Design',
    level: 3,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Defining Availability', 'Achieving Reliability'],
    references,
    sections: [
      {
        heading: 'Defining Availability',
        explanation: [
          'Availability is the percentage of time a system remains operational and accessible to users. It is typically measured in "nines," such as 99.9% (three nines) or 99.999% (five nines) uptime over a given period (usually a year).',
          'Achieving high availability (HA) requires minimizing downtime, which can be caused by hardware failures, software bugs, or network issues. The higher the required availability, the more expensive and complex the system design becomes.',
          'It is important to define a Service Level Agreement (SLA) that outlines the expected availability target. Not every system requires five nines; understanding the business impact of downtime helps determine the appropriate target.'
        ],
        interviewQuestion: 'What does "five nines" of availability mean in practical terms?'
      },
      {
        heading: 'Achieving Reliability',
        explanation: [
          'Reliability is the probability that a system will perform its intended function without failure for a specified time. A highly available system is usually reliable, but reliability focuses more on correctness and consistency of operation.',
          'To design for reliability, engineers employ techniques like redundancy (having multiple components perform the same task) and replication (copying data across multiple nodes). If one component fails, a backup can seamlessly take its place.',
          'Fault tolerance is a key aspect of reliability. Systems should be designed to handle component failures gracefully, perhaps by degrading non-essential features while keeping the core functionality operational.'
        ],
        interviewQuestion: 'How does redundancy contribute to system reliability?'
      }
    ]
  },
  {
    id: 'latency-and-throughput',
    slug: 'latency-throughput',
    technology: 'system-design',
    title: 'Latency & Throughput',
    category: 'System Design',
    description: 'Analyze system performance using latency and throughput metrics.',
    section: '17. System Design',
    level: 4,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Latency', 'Throughput'],
    references,
    sections: [
      {
        heading: 'Latency',
        explanation: [
          'Latency is the time it takes for a single request to travel from the client, be processed by the server, and have the response returned. It is a measure of delay and is typically measured in milliseconds (ms).',
          'Minimizing latency is crucial for user experience. High latency can make an application feel sluggish and unresponsive. Latency can be caused by network distance, processing time, database queries, and disk I/O.',
          'Techniques to reduce latency include caching frequently accessed data, using Content Delivery Networks (CDNs) to serve static assets closer to users, and optimizing database queries with indexes.'
        ],
        interviewQuestion: 'What are common strategies to reduce latency in a web application?'
      },
      {
        heading: 'Throughput',
        explanation: [
          'Throughput is the number of requests a system can handle over a specific time period. It is a measure of capacity and is often measured in Requests Per Second (RPS) or queries per second (QPS).',
          'While latency and throughput are related, they are not the same. You can have a system with high latency but also high throughput (like a batch processing system). Ideally, an interactive application aims for low latency and high throughput.',
          'Improving throughput usually involves horizontal scaling, load balancing, using asynchronous processing (like message queues) to decouple heavy tasks, and optimizing resource utilization.'
        ],
        interviewQuestion: 'Can a system have both high latency and high throughput? Provide an example.'
      }
    ]
  },
  {
    id: 'cap-theorem',
    slug: 'cap-theorem',
    technology: 'system-design',
    title: 'CAP Theorem',
    category: 'System Design',
    description: 'Understand the fundamental trade-offs in distributed data stores.',
    section: '17. System Design',
    level: 5,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['The Three Properties', 'Making Trade-offs'],
    references,
    sections: [
      {
        heading: 'The Three Properties',
        explanation: [
          'The CAP theorem states that a distributed data store can only guarantee two out of three properties simultaneously: Consistency, Availability, and Partition Tolerance.',
          'Consistency implies that every read receives the most recent write or an error. Availability means that every request receives a non-error response, without the guarantee that it contains the most recent write.',
          'Partition Tolerance means the system continues to operate despite an arbitrary number of messages being dropped or delayed by the network between nodes.'
        ],
        whyItMatters: 'The CAP theorem helps engineers understand the inherent limitations of distributed databases and choose the right technology based on business requirements.',
        interviewQuestion: 'Explain the CAP theorem.'
      },
      {
        heading: 'Making Trade-offs',
        explanation: [
          'Because network partitions (P) are an unavoidable reality in distributed systems, engineers must generally choose between Consistency (C) and Availability (A) when a partition occurs.',
          'A CP system (like HBase or MongoDB in certain configurations) chooses consistency over availability. If a node becomes isolated, the system will return an error or time out rather than serve potentially stale data.',
          'An AP system (like Cassandra or DynamoDB) chooses availability over consistency. It will return the most recent version of the data it has, even if that data is stale, prioritizing keeping the system operational.'
        ],
        interviewQuestion: 'When would you choose an AP system over a CP system?'
      }
    ]
  },
  {
    id: 'consistency-patterns',
    slug: 'consistency-patterns',
    technology: 'system-design',
    title: 'Consistency Patterns',
    category: 'System Design',
    description: 'Explore strong vs. eventual consistency models.',
    section: '17. System Design',
    level: 6,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Strong Consistency', 'Eventual Consistency'],
    references,
    sections: [
      {
        heading: 'Strong Consistency',
        explanation: [
          'Strong consistency guarantees that once a write operation completes successfully, any subsequent read operation, regardless of the node it hits, will return that updated value.',
          'This is the model most developers are familiar with from single-node relational databases. It simplifies application logic because developers don\'t have to worry about stale data.',
          'However, strong consistency in a distributed environment requires complex coordination (like two-phase commits) and often incurs high latency. It can also reduce availability during network partitions, as nodes must block reads until they are synchronized.'
        ],
        interviewQuestion: 'What are the performance implications of strong consistency in a distributed database?'
      },
      {
        heading: 'Eventual Consistency',
        explanation: [
          'Eventual consistency is a weaker model which guarantees that, given enough time without new updates, all replicas of the data will eventually converge to the same value.',
          'This model allows for high availability and low latency, as writes can be acknowledged quickly without waiting for all replicas to be updated. It is widely used in systems where temporary staleness is acceptable, like social media feeds or comment sections.',
          'The trade-off is increased complexity at the application level. Developers must handle the possibility of reading stale data and resolve conflicts if concurrent updates occur on different nodes.'
        ],
        interviewQuestion: 'Provide an example of an application feature where eventual consistency is acceptable.'
      }
    ]
  },
  {
    id: 'load-balancing',
    slug: 'load-balancing',
    technology: 'system-design',
    title: 'Load Balancing',
    category: 'System Design',
    description: 'Distribute incoming traffic across multiple backend servers.',
    section: '17. System Design',
    level: 7,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Purpose and Placement', 'Algorithms'],
    references,
    sections: [
      {
        heading: 'Purpose and Placement',
        explanation: [
          'A load balancer acts as a "traffic cop" sitting in front of your servers and routing client requests across all servers capable of fulfilling those requests in a manner that maximizes speed and capacity utilization.',
          'Load balancers ensure that no single server bears too much demand, mitigating the risk of a single point of failure and improving overall application responsiveness.',
          'They can be placed at various layers: between the user and the web servers, between web servers and an internal application tier, or between the application tier and the database tier.'
        ],
        whyItMatters: 'Load balancing is the foundational component for scaling applications horizontally and achieving high availability.',
        interviewQuestion: 'Where in an application\'s architecture can a load balancer be placed?'
      },
      {
        heading: 'Algorithms',
        explanation: [
          'Load balancers use different algorithms to determine which server should receive a request. Round Robin simply distributes requests sequentially across the server pool.',
          'Least Connections routing sends the request to the server with the fewest active connections, which is useful when requests have varying processing times.',
          'IP Hash routing uses a hash of the client\'s IP address to determine the server. This ensures that a specific client always reaches the same server, which is useful for maintaining session state.'
        ],
        interviewQuestion: 'Explain the difference between Round Robin and Least Connections load balancing algorithms.'
      }
    ]
  },
  {
    id: 'reverse-proxy',
    slug: 'reverse-proxy',
    technology: 'system-design',
    title: 'Reverse Proxy',
    category: 'System Design',
    description: 'Understand the role of reverse proxies in web architecture.',
    section: '17. System Design',
    level: 8,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['What is a Reverse Proxy?', 'Benefits'],
    references,
    sections: [
      {
        heading: 'What is a Reverse Proxy?',
        explanation: [
          'A reverse proxy is a server that sits in front of web servers and forwards client (e.g. web browser) requests to those web servers. Unlike a forward proxy, which acts on behalf of clients, a reverse proxy acts on behalf of servers.',
          'When a client makes a request, it connects to the reverse proxy, which then decides where to route the request based on its configuration. The client never communicates directly with the backend servers.',
          'Popular reverse proxy solutions include Nginx, HAProxy, and Apache. They are a standard component in almost all production web architectures.'
        ],
        interviewQuestion: 'What is the difference between a forward proxy and a reverse proxy?'
      },
      {
        heading: 'Benefits',
        explanation: [
          'Reverse proxies provide significant security benefits. By hiding the IP addresses and topology of the backend servers, they make it harder for attackers to target specific machines.',
          'They also offer performance improvements through features like SSL termination (handling HTTPS decryption to reduce load on backend servers) and caching of static content.',
          'Furthermore, reverse proxies often function as load balancers and provide a centralized point for logging and monitoring traffic.'
        ],
        interviewQuestion: 'How does SSL termination on a reverse proxy improve backend performance?'
      }
    ]
  },
  {
    id: 'api-gateway',
    slug: 'api-gateway',
    technology: 'system-design',
    title: 'API Gateway',
    category: 'System Design',
    description: 'Manage and route API requests in microservice architectures.',
    section: '17. System Design',
    level: 9,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Role in Microservices', 'Core Functionalities'],
    references,
    sections: [
      {
        heading: 'Role in Microservices',
        explanation: [
          'In a microservices architecture, a client might need to interact with dozens of different services to render a single screen. Having the client call each service directly creates tight coupling and excessive network chatter.',
          'An API Gateway solves this by providing a single entry point for all client requests. It encapsulates the internal system architecture and provides an API that is tailored to each client.',
          'The gateway handles request routing, composition, and protocol translation, simplifying the client-side implementation and allowing the internal microservices to evolve independently.'
        ],
        whyItMatters: 'API Gateways are essential for managing complexity, security, and traffic routing in microservice-based systems.',
        interviewQuestion: 'Why is it a bad practice for client applications to call microservices directly?'
      },
      {
        heading: 'Core Functionalities',
        explanation: [
          'Beyond simple routing, an API Gateway handles cross-cutting concerns that apply to all services. This includes authentication and authorization, ensuring only valid users access the backend.',
          'It is also responsible for rate limiting and throttling, protecting backend services from being overwhelmed by too many requests.',
          'Other common functionalities include request/response transformation, logging, monitoring, and providing a unified caching layer for API responses.'
        ],
        interviewQuestion: 'What are some cross-cutting concerns that an API Gateway typically handles?'
      }
    ]
  },
  {
    id: 'cdn',
    slug: 'cdn',
    technology: 'system-design',
    title: 'CDN',
    category: 'System Design',
    description: 'Deliver static content globally with low latency.',
    section: '17. System Design',
    level: 10,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['How CDNs Work', 'Benefits and Push vs Pull'],
    references,
    sections: [
      {
        heading: 'How CDNs Work',
        explanation: [
          'A Content Delivery Network (CDN) is a geographically distributed group of servers that work together to provide fast delivery of Internet content. A CDN allows for the quick transfer of assets needed for loading Internet content including HTML pages, javascript files, stylesheets, images, and videos.',
          'When a user requests content, the CDN routes the request to the Edge Server physically closest to the user. If the edge server has the content cached, it delivers it immediately.',
          'If the content is not cached (a cache miss), the edge server fetches it from the origin server, caches it for future requests, and then delivers it to the user.'
        ],
        whyItMatters: 'CDNs are crucial for reducing latency for a global user base and offloading traffic from origin servers.',
        interviewQuestion: 'Explain the concept of an Edge Server in a CDN.'
      },
      {
        heading: 'Benefits and Push vs Pull',
        explanation: [
          'CDNs drastically improve load times for global users. They also reduce bandwidth costs for the origin server and provide protection against DDoS attacks by absorbing massive amounts of traffic.',
          'There are two main CDN models: Push and Pull. In a Push CDN, you manually upload content to the CDN servers. This is good for large files that change infrequently.',
          'In a Pull CDN, the CDN automatically pulls content from your origin server upon the first user request. This requires less manual management and is ideal for sites with frequently changing content.'
        ],
        interviewQuestion: 'What is the difference between a Push CDN and a Pull CDN?'
      }
    ]
  },
  {
    id: 'caching-strategies',
    slug: 'caching-strategies',
    technology: 'system-design',
    title: 'Caching Strategies',
    category: 'System Design',
    description: 'Improve system performance by caching frequently accessed data.',
    section: '17. System Design',
    level: 11,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Cache Policies', 'Eviction Policies'],
    references,
    sections: [
      {
        heading: 'Cache Policies',
        explanation: [
          'Caching is the practice of storing copies of data in a temporary storage location so they can be accessed more quickly. Several strategies dictate how data is written to the cache and the database.',
          'Cache-Aside (Lazy Loading) is the most common. The application first checks the cache; if the data is missing (cache miss), it reads from the database, writes the data to the cache, and returns it. It is simple but can cause latency spikes on misses.',
          'Write-Through caching writes data to the cache and the database simultaneously. This ensures data consistency but adds latency to write operations. Write-Behind (Write-Back) writes data to the cache immediately and asynchronously updates the database later, offering fast writes but risking data loss if the cache fails.'
        ],
        whyItMatters: 'Proper caching strategies dramatically reduce database load and improve application response times.',
        interviewQuestion: 'Describe the Write-Through caching strategy and its trade-offs.'
      },
      {
        heading: 'Eviction Policies',
        explanation: [
          'Caches have limited memory, so they need a strategy to remove old data when they become full. These are called eviction policies.',
          'Least Recently Used (LRU) is a common policy that evicts the items that haven\'t been accessed for the longest time, assuming recently accessed items will likely be needed again.',
          'Other policies include Least Frequently Used (LFU), which tracks how often items are accessed, and First In First Out (FIFO), which evicts the oldest items in the cache regardless of access patterns.'
        ],
        interviewQuestion: 'Explain the difference between LRU and LFU cache eviction policies.'
      }
    ]
  },
  {
    id: 'database-scaling',
    slug: 'database-scaling',
    technology: 'system-design',
    title: 'Database Scaling',
    category: 'System Design',
    description: 'Techniques for scaling relational databases.',
    section: '17. System Design',
    level: 12,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Scaling Up vs Scaling Out', 'Indexes and Denormalization'],
    references,
    sections: [
      {
        heading: 'Scaling Up vs Scaling Out',
        explanation: [
          'Scaling a relational database is notoriously difficult compared to scaling stateless application servers. The first step is usually vertical scaling (scaling up)—adding more CPU, RAM, and faster disks to the single database server.',
          'When vertical scaling hits its limit, you must scale horizontally (scale out). This is complex because data must remain consistent. Techniques include replication (master-slave) for read-heavy workloads.',
          'For write-heavy workloads, you may need more advanced techniques like federation (splitting databases by function) or sharding (partitioning data across multiple servers).'
        ],
        whyItMatters: 'The database is often the most significant bottleneck in a system; knowing how to scale it is a critical senior engineering skill.',
        interviewQuestion: 'Why is it harder to scale a relational database horizontally compared to an application server?'
      },
      {
        heading: 'Indexes and Denormalization',
        explanation: [
          'Before implementing complex distributed database architectures, optimize the single instance. Proper indexing can drastically reduce query times by preventing full table scans.',
          'Denormalization is another technique where you intentionally introduce redundancy into the database design. By storing related data together in a single table, you can avoid complex, resource-intensive joins.',
          'However, denormalization increases the complexity of write operations, as you must ensure the redundant data remains consistent across multiple tables during updates.'
        ],
        interviewQuestion: 'What are the trade-offs of denormalizing a database schema?'
      }
    ]
  },
  {
    id: 'replication',
    slug: 'replication',
    technology: 'system-design',
    title: 'Replication',
    category: 'System Design',
    description: 'Scale read-heavy workloads and provide data redundancy.',
    section: '17. System Design',
    level: 13,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Master-Slave Replication', 'Synchronous vs Asynchronous'],
    references,
    sections: [
      {
        heading: 'Master-Slave Replication',
        explanation: [
          'Master-slave (or primary-replica) replication is a common architecture for read-heavy databases. In this setup, one node (the master) is authoritative and handles all write operations.',
          'The master node then replicates the data changes to one or more slave nodes. Application read requests are distributed across the slave nodes, significantly increasing read capacity.',
          'If the master node fails, a slave node can be promoted to become the new master, providing failover capabilities and improving reliability.'
        ],
        interviewQuestion: 'How does master-slave replication improve database performance?'
      },
      {
        heading: 'Synchronous vs Asynchronous',
        explanation: [
          'Replication can occur synchronously or asynchronously. In synchronous replication, the master waits for confirmation from slaves that they have written the data before acknowledging success to the client. This guarantees consistency but increases write latency.',
          'In asynchronous replication, the master acknowledges the write immediately and replicates the data in the background. This provides low write latency but introduces a window of eventual consistency, where a slave might briefly serve stale data.',
          'Asynchronous replication also carries a risk of data loss if the master crashes before it can replicate the latest changes to the slaves.'
        ],
        interviewQuestion: 'What is the risk of using asynchronous database replication?'
      }
    ]
  },
  {
    id: 'sharding',
    slug: 'sharding',
    technology: 'system-design',
    title: 'Sharding',
    category: 'System Design',
    description: 'Partition databases to handle massive scale.',
    section: '17. System Design',
    level: 14,
    difficulty: 'advanced',
    progress: 0,
    toc: ['What is Sharding?', 'Sharding Strategies'],
    references,
    sections: [
      {
        heading: 'What is Sharding?',
        explanation: [
          'Sharding (horizontal partitioning) is the process of splitting a single large database into smaller, more manageable pieces called shards. Each shard is an independent database that holds a subset of the total data.',
          'Unlike replication where every node has a full copy of the data, sharding distributes the data across multiple machines. This allows the system to handle datasets and write volumes that exceed the capacity of a single server.',
          'Sharding is complex. It requires application logic or an intermediate routing layer to determine which shard holds the specific data needed for a query.'
        ],
        whyItMatters: 'Sharding is the ultimate scaling technique for massive relational databases, but it introduces significant architectural complexity.',
        interviewQuestion: 'What is the difference between database replication and database sharding?'
      },
      {
        heading: 'Sharding Strategies',
        explanation: [
          'Choosing a shard key (the column used to determine data distribution) is critical. Range-based sharding partitions data based on contiguous ranges of the shard key (e.g., users A-M in one shard, N-Z in another). This can lead to uneven data distribution (hotspots).',
          'Hash-based sharding applies a hash function to the shard key to determine the shard. This generally provides a more even distribution of data but makes range queries inefficient.',
          'Directory-based sharding uses a lookup table to map shard keys to specific shards, offering flexibility but introducing a potential single point of failure (the lookup service).'
        ],
        interviewQuestion: 'What is a database hotspot in the context of sharding?'
      }
    ]
  },
  {
    id: 'message-queues',
    slug: 'message-queues',
    technology: 'system-design',
    title: 'Message Queues',
    category: 'System Design',
    description: 'Decouple services and handle asynchronous processing.',
    section: '17. System Design',
    level: 15,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Asynchronous Processing', 'Decoupling'],
    references,
    sections: [
      {
        heading: 'Asynchronous Processing',
        explanation: [
          'Message queues provide an asynchronous communication protocol. Instead of a service calling another service directly and waiting for a response, it places a message on a queue and immediately continues its work.',
          'A consumer service periodically pulls messages from the queue and processes them in the background. This is ideal for long-running or resource-intensive tasks (like image processing or sending emails).',
          'This pattern drastically improves the responsiveness of user-facing applications, as they don\'t block while heavy tasks are executing.'
        ],
        whyItMatters: 'Message queues are critical for building resilient, responsive, and decoupled distributed systems.',
        interviewQuestion: 'When would you use a message queue instead of a direct synchronous API call?'
      },
      {
        heading: 'Decoupling',
        explanation: [
          'Message queues act as a buffer between producers and consumers, effectively decoupling them. Producers don\'t need to know anything about the consumers, or even if they are currently online.',
          'If a consumer service crashes or experiences a sudden spike in traffic, the producer is unaffected. The messages simply accumulate in the queue until the consumer recovers and processes the backlog.',
          'Popular message queue technologies include RabbitMQ, Amazon SQS, and Apache Kafka (though Kafka is often categorized more broadly as an event streaming platform).'
        ],
        interviewQuestion: 'How does a message queue improve fault tolerance in a microservices architecture?'
      }
    ]
  },
  {
    id: 'pubsub-architecture',
    slug: 'pubsub-architecture',
    technology: 'system-design',
    title: 'Pub/Sub Architecture',
    category: 'System Design',
    description: 'Understand the Publish/Subscribe messaging pattern.',
    section: '17. System Design',
    level: 16,
    difficulty: 'advanced',
    progress: 0,
    toc: ['The Pub/Sub Model', 'Use Cases'],
    references,
    sections: [
      {
        heading: 'The Pub/Sub Model',
        explanation: [
          'Publish/Subscribe (Pub/Sub) is a messaging pattern where senders (publishers) do not send messages directly to specific receivers (subscribers). Instead, publishers categorize published messages into topics without knowledge of which subscribers, if any, there may be.',
          'Similarly, subscribers express interest in one or more topics and only receive messages that are of interest, without knowledge of which publishers, if any, there are.',
          'This model provides immense scalability and loose coupling, as it allows dynamic network topology where publishers and subscribers can be added or removed without disrupting the system.'
        ],
        interviewQuestion: 'How does Pub/Sub differ from a traditional Message Queue?'
      },
      {
        heading: 'Use Cases',
        explanation: [
          'Pub/Sub is ideal for event-driven architectures where an action in one service needs to trigger reactions in multiple other independent services.',
          'For example, in an e-commerce system, when an order is placed, a "OrderCreated" event is published. The inventory service, shipping service, and notification service can all subscribe to this event and act on it independently.',
          'Apache Kafka, Google Cloud Pub/Sub, and Redis Pub/Sub are common technologies used to implement this pattern.'
        ],
        interviewQuestion: 'Describe an e-commerce scenario where Pub/Sub is advantageous.'
      }
    ]
  },
  {
    id: 'websockets',
    slug: 'websockets',
    technology: 'system-design',
    title: 'WebSockets',
    category: 'System Design',
    description: 'Enable real-time, bi-directional communication.',
    section: '17. System Design',
    level: 17,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Bi-directional Communication', 'Scaling WebSockets'],
    references,
    sections: [
      {
        heading: 'Bi-directional Communication',
        explanation: [
          'HTTP is a unidirectional, stateless protocol where the client must always initiate the request. To simulate real-time updates, clients had to use techniques like long-polling, which is resource-intensive.',
          'WebSockets provide a persistent, full-duplex communication channel over a single TCP connection. Once the connection is established, both the client and the server can send data to each other at any time.',
          'This makes WebSockets perfect for real-time applications like chat applications, collaborative editing tools, live sports updates, and multiplayer games.'
        ],
        whyItMatters: 'WebSockets are the standard for building low-latency, real-time web applications.',
        interviewQuestion: 'Why are WebSockets preferred over HTTP long-polling for real-time applications?'
      },
      {
        heading: 'Scaling WebSockets',
        explanation: [
          'Scaling WebSockets is challenging because connections are persistent and stateful. Traditional load balancers designed for stateless HTTP requests must be configured specifically to handle long-lived WebSocket connections.',
          'Furthermore, in a distributed system, a message intended for a specific user might arrive at a server that does not hold that user\'s WebSocket connection.',
          'To solve this, a Pub/Sub mechanism (like Redis) is often used on the backend. When a message is sent to a user, it is published to Redis. All WebSocket servers subscribe to this channel and the server holding the connection forwards the message.'
        ],
        interviewQuestion: 'How do you route a message to a specific user\'s WebSocket connection in a distributed multi-server setup?'
      }
    ]
  },
  {
    id: 'rate-limiting-at-scale',
    slug: 'rate-limiting-at-scale',
    technology: 'system-design',
    title: 'Rate Limiting at Scale',
    category: 'System Design',
    description: 'Protect APIs from abuse and manage resource allocation.',
    section: '17. System Design',
    level: 18,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Algorithms', 'Distributed Rate Limiting'],
    references,
    sections: [
      {
        heading: 'Algorithms',
        explanation: [
          'Rate limiting controls the rate of traffic sent or received by a network. It is used to prevent abuse (like brute-force attacks), manage resource usage, and enforce API pricing tiers.',
          'Common algorithms include the Token Bucket, where requests consume tokens from a bucket that refills at a constant rate; and the Leaky Bucket, which processes requests at a constant rate, discarding overflow.',
          'Other algorithms include Fixed Window counters (which reset at specific time intervals but suffer from edge-case bursts) and Sliding Window logs (which track timestamps but use more memory).'
        ],
        whyItMatters: 'Rate limiting is a critical defense mechanism for public-facing APIs to ensure stability and fair usage.',
        interviewQuestion: 'Explain how the Token Bucket algorithm works for rate limiting.'
      },
      {
        heading: 'Distributed Rate Limiting',
        explanation: [
          'Implementing rate limiting on a single server is straightforward using in-memory data structures. However, in a distributed system with multiple load-balanced servers, in-memory limits do not work correctly.',
          'To enforce a global limit, the state must be shared across all servers. This is typically done using a fast, centralized in-memory datastore like Redis.',
          'Because reading and writing to Redis for every request adds latency and potential race conditions, sophisticated implementations use Redis Lua scripts to execute rate limit checks atomically.'
        ],
        interviewQuestion: 'Why is implementing rate limiting challenging in a distributed architecture?'
      }
    ]
  },
  {
    id: 'distributed-systems',
    slug: 'distributed-systems',
    technology: 'system-design',
    title: 'Distributed Systems',
    category: 'System Design',
    description: 'Core concepts of computing across multiple machines.',
    section: '17. System Design',
    level: 19,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Fallacies of Distributed Computing', 'Consensus'],
    references,
    sections: [
      {
        heading: 'Fallacies of Distributed Computing',
        explanation: [
          'A distributed system is a collection of independent computers that appear to its users as a single coherent system. Transitioning from single-machine to distributed architectures introduces new, complex failure modes.',
          'Engineers often make false assumptions, known as the "fallacies of distributed computing." These include assuming the network is reliable, latency is zero, bandwidth is infinite, and the network is secure.',
          'Designing robust distributed systems requires constantly assuming that components will fail, networks will partition, and delays will occur, and building in mechanisms to handle these realities gracefully.'
        ],
        whyItMatters: 'Understanding these core fallacies prevents engineers from designing fragile systems that fail unexpectedly in production.',
        interviewQuestion: 'What are some of the fallacies of distributed computing?'
      },
      {
        heading: 'Consensus',
        explanation: [
          'A fundamental problem in distributed systems is consensus: getting multiple independent nodes to agree on a single data value or a sequence of actions, even in the presence of failures.',
          'Consensus algorithms like Paxos and Raft are used to ensure that a cluster of nodes can maintain a consistent state. They are the backbone of distributed databases, coordination services (like ZooKeeper), and container orchestration (like Kubernetes).',
          'These algorithms work by electing a leader that proposes changes, which must be acknowledged by a quorum (majority) of nodes before being committed.'
        ],
        interviewQuestion: 'What role do consensus algorithms like Raft play in distributed systems?'
      }
    ]
  },
  {
    id: 'microservices',
    slug: 'microservices',
    technology: 'system-design',
    title: 'Microservices',
    category: 'System Design',
    description: 'Design systems composed of small, independent services.',
    section: '17. System Design',
    level: 20,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Architecture Principles', 'Challenges'],
    references,
    sections: [
      {
        heading: 'Architecture Principles',
        explanation: [
          'Microservices architecture is an approach to developing a single application as a suite of small services, each running in its own process and communicating with lightweight mechanisms, often an HTTP resource API.',
          'These services are built around business capabilities and are independently deployable by fully automated deployment machinery. There is a bare minimum of centralized management of these services.',
          'Crucially, each microservice must manage its own database (Database-per-service pattern). Sharing a database creates tight coupling and defeats the purpose of independent deployability and scalability.'
        ],
        whyItMatters: 'Microservices enable large organizations to scale development efforts by allowing autonomous teams to build, deploy, and scale services independently.',
        interviewQuestion: 'Why should microservices not share a common database?'
      },
      {
        heading: 'Challenges',
        explanation: [
          'While microservices offer organizational scalability, they introduce massive technical complexity. They turn local function calls into network calls, introducing latency and the possibility of network failures.',
          'Data consistency becomes a major challenge. Distributed transactions (two-phase commits) are generally avoided due to performance issues; instead, architectures rely on eventual consistency and patterns like the Saga pattern.',
          'Debugging and tracing requests across dozens of microservices requires sophisticated distributed tracing tools and centralized logging infrastructure.'
        ],
        interviewQuestion: 'What is the Saga pattern and how does it relate to microservices?'
      }
    ]
  },
  {
    id: 'monolith-vs-microservices',
    slug: 'monolith-vs-microservices',
    technology: 'system-design',
    title: 'Monolith vs Microservices',
    category: 'System Design',
    description: 'Analyze when to choose which architectural pattern.',
    section: '17. System Design',
    level: 21,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['The Monolithic Approach', 'Making the Choice'],
    references,
    sections: [
      {
        heading: 'The Monolithic Approach',
        explanation: [
          'A monolithic application has all its code in a single unified codebase. It is deployed as a single unit and scales by replicating the entire application on multiple servers.',
          'Monoliths are easier to develop initially, simpler to test, and straightforward to deploy. For many startups and small applications, a monolith is the correct architectural choice.',
          'However, as a monolith grows over years with multiple teams contributing, the codebase can become a "big ball of mud." Deployments become risky, and scaling specific bottlenecks requires scaling the entire application.'
        ],
        interviewQuestion: 'What are the main advantages of starting with a monolithic architecture?'
      },
      {
        heading: 'Making the Choice',
        explanation: [
          'The decision between monolith and microservices is primarily driven by organizational scale, not technical scale. If you have a small engineering team, microservices introduce unnecessary operational overhead.',
          'Martin Fowler recommends a "MonolithFirst" strategy: start with a well-structured monolith. As the system and the organization grow, identify boundaries and gradually extract components into microservices.',
          'Transitioning prematurely to microservices often leads to a "distributed monolith," which combines the worst aspects of both architectures: tight coupling with network latency.'
        ],
        whyItMatters: 'Choosing the wrong architectural pattern early on can lead to crippling operational overhead or unmanageable technical debt.',
        interviewQuestion: 'What is a "distributed monolith" and why is it problematic?'
      }
    ]
  },
  {
    id: 'design-url-shortener',
    slug: 'design-url-shortener',
    technology: 'system-design',
    title: 'Design: URL Shortener',
    category: 'System Design',
    description: 'System design case study: Designing a URL shortening service like TinyURL.',
    section: '17. System Design',
    level: 22,
    difficulty: 'interview',
    progress: 0,
    toc: ['Requirements', 'API Design', 'Database Design', 'Architecture and Caching', 'Scaling and Trade-offs'],
    references,
    sections: [
      {
        heading: 'Requirements',
        explanation: [
          'Functional Requirements: The system should take a long URL and generate a short, unique alias. When users access the short URL, they should be redirected to the original long URL. Users should optionally be able to specify a custom alias.',
          'Non-Functional Requirements: The system must be highly available; if the service goes down, URL redirection fails. URL redirection should happen with minimal latency. Shortened URLs should not be predictable.',
          'Traffic Estimation: Assuming 100M new URLs per month and a 100:1 read/write ratio, we have 10B redirections per month. This means ~40 URL creations per second and ~4,000 redirections per second.'
        ],
        interviewQuestion: 'How would you calculate the required storage for 5 years of URL data in a URL shortener?'
      },
      {
        heading: 'API Design',
        explanation: [
          'The API will primarily consist of two endpoints. The first is a POST endpoint to create a short URL. It accepts the original URL and an optional custom alias, returning the shortened URL.',
          'The second is a GET endpoint that takes the short URL alias. Instead of returning JSON, this endpoint returns an HTTP 301 (Moved Permanently) or 302 (Found) redirect status code with the long URL in the Location header.',
          'A 301 redirect allows browsers to cache the response, reducing load on our servers but preventing us from tracking analytics. A 302 redirect forces the browser to hit our server every time, allowing analytics but increasing server load.'
        ],
        code: `POST /api/v1/data/shorten\n{\n  "longUrl": "https://example.com/very/long/url",\n  "customAlias": "my-alias"\n}\n\nGET /{shortAlias}`,
        interviewQuestion: 'What is the difference between a 301 and 302 redirect, and which would you use for a URL shortener?'
      },
      {
        heading: 'Database Design',
        explanation: [
          'Since there are billions of records and the data model is simple (mapping an alias to a URL), a NoSQL database like DynamoDB or Cassandra is a good choice for high scalability and read performance.',
          'However, a relational database like PostgreSQL can also work well if appropriately indexed and sharded, especially if we need relational features for user management later.',
          'The core table will store the short URL alias (Primary Key), the original URL, creation date, and optionally the user ID of the creator.'
        ],
        code: `Table: url_mappings\n- id (varchar, PK): The short alias\n- original_url (varchar)\n- created_at (timestamp)\n- user_id (int, optional)`,
        interviewQuestion: 'Why might a NoSQL database be preferred over an RDBMS for a URL shortener?'
      },
      {
        heading: 'Architecture and Caching',
        explanation: [
          'The core architecture involves a load balancer directing traffic to a cluster of stateless web servers. These servers execute the business logic, interacting with the database and cache.',
          'To generate unique short URLs, we can use a distributed ID generator (like Snowflake) and convert the ID to a Base62 string (a-z, A-Z, 0-9). This provides a short, URL-safe alias.',
          'Caching is critical due to the 100:1 read/write ratio. We should place an in-memory cache (like Redis or Memcached) between the web servers and the database. The cache will store mappings of frequently accessed short URLs to their long URLs.'
        ],
        interviewQuestion: 'How does Base62 encoding help in generating short URLs?'
      },
      {
        heading: 'Scaling and Trade-offs',
        explanation: [
          'As the database grows, we will need to shard it. Sharding based on the first character of the short alias is simple but can lead to uneven distribution. Hashing the alias and sharding based on the hash provides a more even distribution.',
          'A trade-off to consider is cache eviction. We should use an LRU (Least Recently Used) policy since a small percentage of URLs likely generate the majority of traffic.',
          'For extreme scale, a CDN can be utilized to handle the redirects at the edge, dramatically reducing the load on our backend infrastructure.'
        ],
        interviewQuestion: 'How would you handle a malicious user trying to create millions of short URLs rapidly?'
      }
    ]
  },
  {
    id: 'design-chat-application',
    slug: 'design-chat-application',
    technology: 'system-design',
    title: 'Design: Chat Application',
    category: 'System Design',
    description: 'System design case study: Designing a chat application like WhatsApp or Discord.',
    section: '17. System Design',
    level: 23,
    difficulty: 'interview',
    progress: 0,
    toc: ['Requirements', 'API Design', 'Database Design', 'Architecture and Real-time', 'Scaling and Trade-offs'],
    references,
    sections: [
      {
        heading: 'Requirements',
        explanation: [
          'Functional Requirements: Users should be able to send 1-on-1 messages and participate in group chats. The system must support online presence indicators (who is online). Messages should be stored and accessible across devices.',
          'Non-Functional Requirements: The system needs extremely low latency for message delivery. It must be highly available and handle massive concurrent connections.',
          'Traffic Estimation: Assuming 500 million Daily Active Users (DAU), with each user sending 40 messages a day. That equates to 20 billion messages daily, requiring significant storage and throughput.'
        ],
        interviewQuestion: 'How do you handle message delivery guarantees (e.g., exactly-once, at-least-once) in a chat application?'
      },
      {
        heading: 'API Design',
        explanation: [
          'Traditional HTTP is insufficient for real-time chat because it requires clients to constantly poll for new messages. Instead, we use WebSockets for a persistent, bi-directional connection between the client and the server.',
          'The API over WebSockets will handle events like "sendMessage", "receiveMessage", "typingIndicator", and "presenceUpdate".',
          'Standard HTTP APIs can still be used for non-real-time actions, such as user authentication, uploading media files, and fetching historical message logs.'
        ],
        code: `// WebSocket Event Payload\n{\n  "action": "sendMessage",\n  "data": {\n    "chatId": "user_123",\n    "content": "Hello!"\n  }\n}`,
        interviewQuestion: 'Why use WebSockets instead of HTTP Long Polling for a chat application?'
      },
      {
        heading: 'Database Design',
        explanation: [
          'Chat applications generate massive volumes of time-series data. A NoSQL database like Cassandra or HBase is often preferred because they excel at high write throughput and sequential reads (fetching chat history).',
          'Key-Value stores like Redis are essential for maintaining user sessions (which WebSocket server a user is connected to) and online presence status.',
          'The primary data model centers around messages, indexed by the conversation ID and sorted by timestamp to quickly load chat histories.'
        ],
        code: `Table: messages\n- message_id (uuid, PK)\n- conversation_id (uuid, Partition Key)\n- sender_id (uuid)\n- created_at (timestamp, Sort Key)\n- content (text)`,
        interviewQuestion: 'How would you model the database schema to efficiently retrieve the latest messages in a conversation?'
      },
      {
        heading: 'Architecture and Real-time',
        explanation: [
          'When User A connects, a load balancer routes them to a specific WebSocket Server. The server registers this connection in Redis (User A -> Server 1).',
          'When User A sends a message to User B, Server 1 receives it. It checks Redis to see where User B is connected. If User B is on Server 2, Server 1 publishes the message to a message broker (like Pub/Sub or Kafka).',
          'Server 2, subscribed to the broker, receives the message and pushes it through the open WebSocket connection to User B. If User B is offline, the message is only saved to the database and delivered via push notification.'
        ],
        interviewQuestion: 'Describe the flow of a message from Sender A to Receiver B when they are connected to different WebSocket servers.'
      },
      {
        heading: 'Scaling and Trade-offs',
        explanation: [
          'Handling millions of concurrent WebSocket connections is a primary challenge. Servers must be tuned to handle many open file descriptors, and load balancers must support sticky sessions or intelligent routing.',
          'Online presence is notoriously difficult to scale. Broadcasting every status change to everyone causes a massive fan-out problem. A trade-off is to only broadcast presence changes to active conversations or fetch presence lazily.',
          'Group chats amplify the fan-out problem. Sending a message in a 10,000-user group requires delivering 10,000 messages. Background workers and message queues are vital to handle this asynchronously.'
        ],
        interviewQuestion: 'How do you handle the "fan-out" problem in large group chats?'
      }
    ]
  },
  {
    id: 'design-video-streaming',
    slug: 'design-video-streaming',
    technology: 'system-design',
    title: 'Design: Video Streaming',
    category: 'System Design',
    description: 'System design case study: Designing a video streaming platform like Netflix or YouTube.',
    section: '17. System Design',
    level: 24,
    difficulty: 'interview',
    progress: 0,
    toc: ['Requirements', 'API Design', 'Database Design', 'Architecture and Transcoding', 'Scaling and CDNs'],
    references,
    sections: [
      {
        heading: 'Requirements',
        explanation: [
          'Functional Requirements: Users can upload videos, search for videos, and stream videos smoothly across different devices and network conditions. The system should track view counts.',
          'Non-Functional Requirements: High availability is critical. Video streaming must be reliable with minimal buffering. The system must handle massive amounts of storage and outbound bandwidth.',
          'Traffic Estimation: If 1 million users upload 1 minute of video daily (assuming 50MB per minute), that is 50TB of new storage per day, not accounting for multiple quality formats.'
        ],
        interviewQuestion: 'What are the primary bottlenecks in a video streaming service compared to a text-based service?'
      },
      {
        heading: 'API Design',
        explanation: [
          'The API will involve endpoints for uploading metadata, a separate flow for uploading the heavy video files, and endpoints for streaming.',
          'Video upload is typically done via pre-signed URLs directly to cloud storage (like S3) to avoid bottlenecking the application servers.',
          'Streaming doesn\'t use a single API call. Instead, the client requests a manifest file (like HLS or DASH), which points to small chunks of the video that the client downloads sequentially.'
        ],
        code: `POST /api/v1/videos/upload-url (Returns Pre-signed S3 URL)\nGET /api/v1/videos/{id}/manifest.m3u8 (Returns HLS Manifest)`,
        interviewQuestion: 'Why is it better to upload large files directly to object storage rather than through your application API servers?'
      },
      {
        heading: 'Database Design',
        explanation: [
          'Relational databases (like MySQL) are often used to store video metadata (title, description, uploader) and user data, as this data requires complex querying and relationships.',
          'The actual video files are never stored in a database. They are stored in Object Storage (like Amazon S3 or Google Cloud Storage) designed for massive unstructured data.',
          'A separate NoSQL database or in-memory cache (Redis) might be used to track rapidly changing metrics like view counts or real-time analytics.'
        ],
        code: `Table: video_metadata\n- id (uuid, PK)\n- title (varchar)\n- user_id (uuid)\n- object_storage_path (varchar)\n- processing_status (enum)`,
        interviewQuestion: 'Where are the actual video files stored in a system like YouTube?'
      },
      {
        heading: 'Architecture and Transcoding',
        explanation: [
          'When a video is uploaded to object storage, an event triggers an asynchronous background process via a message queue (e.g., Kafka).',
          'This triggers a Transcoding Pipeline. Workers pull the raw video and convert it into various formats (mp4, webm) and resolutions (360p, 720p, 1080p, 4k).',
          'The video is also split into small chunks (e.g., 5-second segments). This allows the client video player to dynamically switch resolutions based on the user\'s current network speed (Adaptive Bitrate Streaming).'
        ],
        interviewQuestion: 'Explain the purpose of video transcoding and adaptive bitrate streaming.'
      },
      {
        heading: 'Scaling and CDNs',
        explanation: [
          'The most critical component for scaling video delivery is the Content Delivery Network (CDN). Serving massive video files directly from origin servers would saturate outbound bandwidth immediately.',
          'All video chunks are cached and served from edge nodes around the world. The origin server only handles upload, transcoding, and cache misses.',
          'Trade-offs involve CDN costs vs origin costs. Extremely popular videos are kept in edge caches, while long-tail (rarely watched) videos might only reside in cheaper, central object storage.'
        ],
        interviewQuestion: 'How does a CDN prevent the origin servers of a video streaming platform from crashing under heavy load?'
      }
    ]
  },
  {
    id: 'design-social-media-feed',
    slug: 'design-social-media-feed',
    technology: 'system-design',
    title: 'Design: Social Media Feed',
    category: 'System Design',
    description: 'System design case study: Designing a news feed like Twitter or Instagram.',
    section: '17. System Design',
    level: 25,
    difficulty: 'interview',
    progress: 0,
    toc: ['Requirements', 'Database Design', 'Feed Generation (Push vs Pull)', 'Architecture', 'Scaling and Trade-offs'],
    references,
    sections: [
      {
        heading: 'Requirements',
        explanation: [
          'Functional Requirements: Users can publish text/image posts, follow other users, and view a feed consisting of posts from users they follow, sorted chronologically.',
          'Non-Functional Requirements: Feed generation must be fast (low latency). The system must handle high read (viewing feeds) and moderate write (publishing posts) loads. Eventual consistency for feed updates is acceptable.',
          'Traffic Estimation: Assume 300M DAU, each viewing their feed 5 times a day and posting once. This implies 1.5B feed reads and 300M writes per day.'
        ],
        interviewQuestion: 'Why is eventual consistency acceptable for a social media news feed?'
      },
      {
        heading: 'Database Design',
        explanation: [
          'We need tables for Users, Follows (mapping followers to followees), and Posts. A relational database works for Users and Follows, but Posts might require NoSQL for scaling massive writes.',
          'The most complex data is the generated feed itself. Computing a feed on the fly for every read involves querying all followees\' posts, merging, and sorting them—this is computationally expensive.',
          'Therefore, we use a hybrid approach where the database stores the raw data, but in-memory caches (like Redis) store pre-computed feeds for active users.'
        ],
        code: `Table: follows\n- follower_id (uuid)\n- followee_id (uuid)\n(Index on follower_id for feed generation)`,
        interviewQuestion: 'Why is generating a timeline on-the-fly via SQL JOINs inefficient at scale?'
      },
      {
        heading: 'Feed Generation (Push vs Pull)',
        explanation: [
          'There are two primary architectures for feed generation. The "Pull" (or Fan-out on Load) model generates the feed when the user requests it. It pulls recent posts from all followed users. This slows down read times for users following many people.',
          'The "Push" (or Fan-out on Write) model pre-computes feeds. When User A posts, the system actively pushes that post into the in-memory feed caches of all User A\'s followers. This makes reads extremely fast.',
          'However, the Push model struggles with users who have millions of followers (celebrities), as one post requires millions of cache updates.'
        ],
        interviewQuestion: 'Explain the "Fan-out on Write" approach to feed generation.'
      },
      {
        heading: 'Architecture',
        explanation: [
          'A hybrid architecture is usually best. For standard users, we use the Push model to pre-compute feeds into Redis caches.',
          'For celebrities (users with millions of followers), we use the Pull model. We don\'t push their posts to millions of caches.',
          'When a user views their feed, the system pulls their pre-computed cache and merges it in real-time with recent posts fetched from any celebrities they follow.'
        ],
        interviewQuestion: 'How does a hybrid Push/Pull architecture solve the celebrity problem in social media feeds?'
      },
      {
        heading: 'Scaling and Trade-offs',
        explanation: [
          'Redis is heavily utilized for caching feeds. The cache must be sharded across many machines. We use an LRU eviction policy, keeping only active users\' feeds in memory to save costs.',
          'Images and media are stored in object storage and served via CDNs. Post writes are handled asynchronously via message queues to ensure the publishing endpoint responds immediately.',
          'A trade-off is the delay in feed updates. If the background workers processing the Push fan-out get backed up, users might experience a delay before seeing a new post from someone they follow.'
        ],
        interviewQuestion: 'What caching strategies would you use to store pre-computed timelines?'
      }
    ]
  },
  {
    id: 'design-food-delivery',
    slug: 'design-food-delivery',
    technology: 'system-design',
    title: 'Design: Food Delivery',
    category: 'System Design',
    description: 'System design case study: Designing a food delivery app like UberEats or DoorDash.',
    section: '17. System Design',
    level: 26,
    difficulty: 'interview',
    progress: 0,
    toc: ['Requirements', 'Architecture', 'Location Tracking'],
    sections: [
      {
        heading: 'Requirements',
        explanation: [
          'Functional: Users browse restaurants, place orders, and track delivery drivers. Restaurants accept/prepare orders. Drivers accept and deliver orders.',
          'Non-Functional: High availability, low latency for search and location updates, data consistency for transactions (payments/orders).',
          'This requires a complex, multi-sided marketplace architecture.'
        ],
        whyItMatters: 'Requires balancing transactional integrity with high-volume real-time location updates.'
      },
      {
        heading: 'Architecture',
        explanation: [
          'Uses a microservices architecture. Key services: Order Service, Restaurant Service, Delivery Service, and Location Service.',
          'Order Service handles transactional state using a relational database with ACID guarantees.',
          'Search requires a dedicated search engine (like Elasticsearch) indexed with restaurant menus and locations.'
        ]
      },
      {
        heading: 'Location Tracking',
        explanation: [
          'Drivers constantly broadcast their GPS coordinates. This high-throughput write workload is handled by the Location Service.',
          'We use WebSockets to push real-time location updates to the customer tracking the order.',
          'Geospatial databases or Redis (using GeoHashes) are used to find nearby drivers when an order needs assignment.'
        ]
      }
    ]
  },
  {
    id: 'design-ride-booking',
    slug: 'design-ride-booking',
    technology: 'system-design',
    title: 'Design: Ride Booking',
    category: 'System Design',
    description: 'System design case study: Designing a ride-sharing service like Uber or Lyft.',
    section: '17. System Design',
    level: 27,
    difficulty: 'interview',
    progress: 0,
    toc: ['Requirements', 'Geospatial Indexing', 'Matching Engine'],
    sections: [
      {
        heading: 'Requirements',
        explanation: [
          'Functional: Riders request rides, drivers accept them. Real-time location tracking. Fare calculation.',
          'Non-Functional: Extreme low latency for location updates and matching. High availability.',
          'Similar to food delivery but with stricter latency requirements for the matching process.'
        ],
        whyItMatters: 'Focuses heavily on geospatial data structures and real-time dispatch systems.'
      },
      {
        heading: 'Geospatial Indexing',
        explanation: [
          'To quickly find nearby drivers, the world is divided into grids using systems like GeoHash, S2 geometry, or H3 (hexagons).',
          'Driver locations are constantly updated in an in-memory datastore (like Redis) indexed by these grid IDs.',
          'When a rider requests a ride, the system queries the grids immediately surrounding the rider\'s location.'
        ]
      },
      {
        heading: 'Matching Engine',
        explanation: [
          'The Matching Service is the core. It receives requests, queries the Location Service for nearby drivers, and runs algorithms to select the optimal driver.',
          'It handles concurrency control to ensure the same driver isn\'t assigned to two different riders simultaneously.',
          'WebSockets are used to maintain persistent connections with both drivers and riders for instant dispatch and tracking.'
        ]
      }
    ]
  },
  {
    id: 'design-notification-system',
    slug: 'design-notification-system',
    technology: 'system-design',
    title: 'Design: Notification System',
    category: 'System Design',
    description: 'System design case study: Designing a scalable notification system.',
    section: '17. System Design',
    level: 28,
    difficulty: 'interview',
    progress: 0,
    toc: ['Requirements', 'Architecture', 'Handling Scale'],
    sections: [
      {
        heading: 'Requirements',
        explanation: [
          'Functional: Send push notifications, SMS, and emails to users. Allow users to configure preferences.',
          'Non-Functional: High throughput, fault tolerance (no dropped notifications), rate limiting.',
          'The system must integrate with various third-party providers (APNs, FCM, Twilio, SendGrid).'
        ]
      },
      {
        heading: 'Architecture',
        explanation: [
          'A microservice architecture centered around a message broker (Kafka or RabbitMQ).',
          'Other internal services publish "Notification Events" to the broker. The Notification Service consumes these events.',
          'It checks user preferences (DB), constructs the payload, and places it into specific queues for Push, SMS, or Email workers.'
        ]
      },
      {
        heading: 'Handling Scale',
        explanation: [
          'Workers pull from the queues and call third-party APIs. If a third-party API is down, messages remain in the queue for retry.',
          'Rate limiting and deduplication logic must be implemented to avoid spamming users or overwhelming third-party services.',
          'Analytics services consume data to track delivery and open rates.'
        ]
      }
    ]
  },
  {
    id: 'design-file-storage',
    slug: 'design-file-storage',
    technology: 'system-design',
    title: 'Design: File Storage',
    category: 'System Design',
    description: 'System design case study: Designing a cloud file storage service like Google Drive or Dropbox.',
    section: '17. System Design',
    level: 29,
    difficulty: 'interview',
    progress: 0,
    toc: ['Requirements', 'Block Storage', 'Synchronization'],
    sections: [
      {
        heading: 'Requirements',
        explanation: [
          'Functional: Upload/download files, sync across devices, share files. File versioning.',
          'Non-Functional: High reliability (no data loss), low latency for sync, efficient bandwidth usage.',
          'The system must handle massive amounts of blob data and complex metadata.'
        ]
      },
      {
        heading: 'Block Storage',
        explanation: [
          'Files are not uploaded as single huge blobs. They are divided into smaller chunks (e.g., 4MB blocks).',
          'If a user modifies a 1GB file, only the modified 4MB block is uploaded, saving massive amounts of bandwidth.',
          'A metadata database tracks which blocks construct a specific version of a file.'
        ]
      },
      {
        heading: 'Synchronization',
        explanation: [
          'Clients maintain persistent connections (WebSockets or long-polling) with a Notification Service.',
          'When a file changes, the system notifies connected clients. Clients then request only the changed blocks.',
          'Offline changes result in conflicts that must be resolved upon reconnection.'
        ]
      }
    ]
  },
  {
    id: 'design-job-portal',
    slug: 'design-job-portal',
    technology: 'system-design',
    title: 'Design: Job Portal',
    category: 'System Design',
    description: 'System design case study: Designing a job board like LinkedIn Jobs or Indeed.',
    section: '17. System Design',
    level: 30,
    difficulty: 'interview',
    progress: 0,
    toc: ['Requirements', 'Search Architecture', 'Data Pipeline'],
    sections: [
      {
        heading: 'Requirements',
        explanation: [
          'Functional: Employers post jobs. Job seekers search, filter, and apply for jobs.',
          'Non-Functional: High availability, extremely fast search and filtering capabilities.',
          'Read-heavy system with complex querying requirements.'
        ]
      },
      {
        heading: 'Search Architecture',
        explanation: [
          'A relational database is used for transactional data (user profiles, applications, billing).',
          'However, RDBMS are too slow for complex full-text search. Job postings are synced to a Search Engine like Elasticsearch.',
          'Elasticsearch handles complex queries, location filtering, and relevance ranking.'
        ]
      },
      {
        heading: 'Data Pipeline',
        explanation: [
          'When an employer posts a job, it writes to the main DB and publishes an event to a Message Queue.',
          'A worker consumes the event and indexes the job in Elasticsearch, ensuring the search index remains updated (Eventual Consistency).',
          'Caching (Redis) is used for common queries and static metadata.'
        ]
      }
    ]
  },
  {
    id: 'design-e-commerce-system',
    slug: 'design-e-commerce-system',
    technology: 'system-design',
    title: 'Design: E-Commerce System',
    category: 'System Design',
    description: 'System design case study: Designing an e-commerce platform like Amazon.',
    section: '17. System Design',
    level: 31,
    difficulty: 'interview',
    progress: 0,
    toc: ['Requirements', 'Services', 'Checkout and Inventory'],
    sections: [
      {
        heading: 'Requirements',
        explanation: [
          'Functional: Product catalog search, shopping cart, checkout process, payment integration.',
          'Non-Functional: High availability (downtime costs money), strict consistency for inventory and payments, scalable for flash sales.',
          'Requires a mix of eventual consistency for browsing and strong consistency for purchasing.'
        ]
      },
      {
        heading: 'Services',
        explanation: [
          'Microservices are essential: Product Catalog Service (read-heavy, Elasticsearch), Cart Service (high write, Redis), Order Service (RDBMS for ACID).',
          'A CDN caches product images and static assets heavily.',
          'API Gateway routes requests and handles authentication.'
        ]
      },
      {
        heading: 'Checkout and Inventory',
        explanation: [
          'The checkout process requires distributed transactions or Saga patterns to orchestrate payment, inventory reservation, and order creation.',
          'Inventory is critical. We cannot oversell. Relational databases with row-level locking or distributed locks (Redis) are used during the reservation phase.',
          'Message queues handle post-checkout tasks like sending confirmation emails and notifying fulfillment centers.'
        ]
      }
    ]
  }
]
