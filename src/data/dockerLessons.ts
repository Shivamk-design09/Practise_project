import type { Lesson } from '../types'

const references = [
  { label: 'Docker Get Started', url: 'https://docs.docker.com/get-started/introduction/' },
  { label: 'Dockerfile', url: 'https://docs.docker.com/build/concepts/dockerfile/' },
  { label: 'Docker Compose', url: 'https://docs.docker.com/compose/' },
  { label: 'Networking', url: 'https://docs.docker.com/engine/network/' }
]

export const dockerLessons: Lesson[] = [
  {
    id: 'containers-and-images',
    slug: 'containers-and-images',
    technology: 'docker',
    title: 'Containers & Images',
    category: 'Docker',
    description: 'Learn the fundamental difference between Docker containers and images.',
    section: '16. Docker',
    level: 1,
    difficulty: 'beginner',
    progress: 0,
    toc: ['What is an Image?', 'What is a Container?'],
    references,
    sections: [
      {
        heading: 'What is an Image?',
        explanation: [
          'A Docker image is a read-only template that contains a set of instructions for creating a container that can run on the Docker platform. It provides a convenient way to package up applications and preconfigured server environments, which you can use for your own private use or share publicly with other Docker users.',
          'Images are often based on other images, with some additional customization. For example, you may build an image which is based on the ubuntu image, but installs the Apache web server and your application, as well as the configuration details needed to make your application run.',
          'You might create your own images or you might only use those created by others and published in a registry. To build an own image, you create a Dockerfile with a simple syntax for defining the steps needed to create the image and run it. Each instruction in a Dockerfile creates a layer in the image. When you change the Dockerfile and rebuild the image, only those layers which have changed are rebuilt. This is part of what makes images so lightweight, small, and fast, when compared to other virtualization technologies.'
        ],
        whyItMatters: 'Images are the building blocks of Docker containers, allowing you to package and distribute your application and its dependencies in a standardized format.',
        interviewQuestion: 'Explain the difference between a Docker image and a Docker container.'
      },
      {
        heading: 'What is a Container?',
        explanation: [
          'A container is a runnable instance of an image. You can create, start, stop, move, or delete a container using the Docker API or CLI. You can connect a container to one or more networks, attach storage to it, or even create a new image based on its current state.',
          'By default, a container is relatively well isolated from other containers and its host machine. You can control how isolated a container\'s network, storage, or other underlying subsystems are from other containers or from the host machine.',
          'A container is defined by its image as well as any configuration options you provide to it when you create or start it. When a container is removed, any changes to its state that are not stored in persistent storage disappear.'
        ],
        whyItMatters: 'Containers provide a consistent runtime environment for your applications, ensuring they run the same way across different environments.',
        interviewQuestion: 'How does a container differ from a virtual machine?'
      }
    ]
  },
  {
    id: 'dockerfile',
    slug: 'dockerfile',
    technology: 'docker',
    title: 'Dockerfile',
    category: 'Docker',
    description: 'Understand how to write a Dockerfile to build custom images.',
    section: '16. Docker',
    level: 2,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Introduction to Dockerfile', 'Key Instructions'],
    references,
    sections: [
      {
        heading: 'Introduction to Dockerfile',
        explanation: [
          'A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Using docker build users can create an automated build that executes several command-line instructions in succession.',
          'Docker can build images automatically by reading the instructions from a Dockerfile. A Dockerfile adheres to a specific format and set of instructions which you can find at Dockerfile reference.',
          'A Docker image consists of read-only layers each of which represents a Dockerfile instruction. The layers are stacked and each one is a delta of the changes from the previous layer.'
        ],
        code: `FROM node:18-alpine\nWORKDIR /app\nCOPY package.json .\nRUN npm install\nCOPY . .\nCMD ["npm", "start"]`,
        whyItMatters: 'Dockerfiles allow you to automate the image building process and version control your infrastructure.',
        interviewQuestion: 'What is a Dockerfile?'
      },
      {
        heading: 'Key Instructions',
        explanation: [
          'The FROM instruction initializes a new build stage and sets the Base Image for subsequent instructions. As such, a valid Dockerfile must start with a FROM instruction.',
          'The RUN instruction will execute any commands in a new layer on top of the current image and commit the results. The resulting committed image will be used for the next step in the Dockerfile.',
          'The COPY instruction copies new files or directories from <src> and adds them to the filesystem of the container at the path <dest>.'
        ],
        interviewQuestion: 'Explain the difference between COPY and ADD in a Dockerfile.'
      }
    ]
  },
  {
    id: 'docker-commands',
    slug: 'docker-commands',
    technology: 'docker',
    title: 'Docker Commands',
    category: 'Docker',
    description: 'Learn the most common Docker CLI commands.',
    section: '16. Docker',
    level: 3,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Image Commands', 'Container Commands'],
    references,
    sections: [
      {
        heading: 'Image Commands',
        explanation: [
          'The docker build command builds Docker images from a Dockerfile and a "context". A build\'s context is the set of files at a specified location PATH or URL.',
          'The docker pull command fetches an image or a repository from a registry. If you don\'t specify a tag, Docker fetches the image with the latest tag by default.',
          'The docker push command pushes an image or a repository to a registry. You need to be logged into a registry (like Docker Hub) to push an image.'
        ],
        code: `docker build -t my-app .\ndocker pull nginx:latest\ndocker push my-repo/my-app:1.0`,
        interviewQuestion: 'How do you build a Docker image from a Dockerfile?'
      },
      {
        heading: 'Container Commands',
        explanation: [
          'The docker run command first creates a writeable container layer over the specified image, and then starts it using the specified command.',
          'The docker ps command lists running containers. Adding the -a flag lists all containers (both running and stopped).',
          'The docker stop command gracefully stops one or more running containers. It sends SIGTERM, and after a grace period, SIGKILL.'
        ],
        code: `docker run -d -p 8080:80 nginx\ndocker ps -a\ndocker stop container_id`,
        interviewQuestion: 'What is the difference between docker run and docker start?'
      }
    ]
  },
  {
    id: 'volumes',
    slug: 'volumes',
    technology: 'docker',
    title: 'Volumes',
    category: 'Docker',
    description: 'Persist data in Docker using volumes.',
    section: '16. Docker',
    level: 4,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Understanding Volumes', 'Using Volumes'],
    references,
    sections: [
      {
        heading: 'Understanding Volumes',
        explanation: [
          'Volumes are the preferred mechanism for persisting data generated by and used by Docker containers. While bind mounts are dependent on the directory structure and OS of the host machine, volumes are completely managed by Docker.',
          'Volumes have several advantages over bind mounts, such as being easier to back up or migrate, and they can be managed using Docker CLI commands or the Docker API.',
          'Volumes work on both Linux and Windows containers. They are also safer to share among multiple containers.'
        ],
        whyItMatters: 'Volumes are essential for databases and stateful applications running in containers.',
        interviewQuestion: 'What are Docker volumes and why are they preferred over bind mounts?'
      },
      {
        heading: 'Using Volumes',
        explanation: [
          'You can create a volume explicitly using the docker volume create command, or Docker can create a volume during container creation.',
          'When you start a container with a volume that does not yet exist, Docker creates the volume for you.',
          'To mount a volume into a container, you use the -v or --mount flag with the docker run command.'
        ],
        code: `docker volume create my-vol\ndocker run -d -v my-vol:/app/data nginx`,
        interviewQuestion: 'How do you mount a volume in a Docker container?'
      }
    ]
  },
  {
    id: 'networks',
    slug: 'networks',
    technology: 'docker',
    title: 'Networks',
    category: 'Docker',
    description: 'Connect containers to each other and the outside world.',
    section: '16. Docker',
    level: 5,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Network Drivers', 'Bridge Networks'],
    references,
    sections: [
      {
        heading: 'Network Drivers',
        explanation: [
          'Docker\'s networking subsystem is pluggable, using drivers. Several drivers exist by default, and provide core networking functionality.',
          'The bridge network driver is the default network driver. If you don\'t specify a driver, this is the type of network you are creating. Bridge networks are usually used when your applications run in standalone containers that need to communicate.',
          'The host network driver removes network isolation between the container and the Docker host, and uses the host\'s networking directly.'
        ],
        whyItMatters: 'Docker networks allow containers to securely communicate with each other and the outside world.',
        interviewQuestion: 'What are the default Docker network drivers?'
      },
      {
        heading: 'Bridge Networks',
        explanation: [
          'In terms of Docker, a bridge network uses a software bridge which allows containers connected to the same bridge network to communicate, while providing isolation from containers which are not connected to that bridge network.',
          'The Docker daemon automatically creates a default bridge network (called bridge). Newly-started containers connect to it unless otherwise specified.',
          'User-defined bridge networks provide better isolation and DNS resolution between containers compared to the default bridge network.'
        ],
        code: `docker network create my-net\ndocker run -d --network my-net --name web nginx`,
        interviewQuestion: 'Why is a user-defined bridge network preferred over the default bridge network?'
      }
    ]
  },
  {
    id: 'environment-variables-and-port-mapping',
    slug: 'environment-variables-port-mapping',
    technology: 'docker',
    title: 'Environment Variables & Port Mapping',
    category: 'Docker',
    description: 'Configure container runtime environments.',
    section: '16. Docker',
    level: 6,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Environment Variables', 'Port Mapping'],
    references,
    sections: [
      {
        heading: 'Environment Variables',
        explanation: [
          'Environment variables are an important configuration mechanism for modern software applications. They allow you to separate configuration from code, adhering to the 12-factor app methodology.',
          'In Docker, you can pass environment variables to a container at runtime using the -e or --env flag with the docker run command.',
          'You can also define default environment variables in a Dockerfile using the ENV instruction. These defaults can be overridden at runtime.'
        ],
        code: `docker run -e NODE_ENV=production -e DB_URL=postgres://... node-app`,
        whyItMatters: 'Environment variables allow you to configure your application for different environments (dev, test, prod) without changing the code or the image.',
        interviewQuestion: 'How do you pass environment variables to a Docker container?'
      },
      {
        heading: 'Port Mapping',
        explanation: [
          'By default, when you create or run a container using docker run, it does not publish any of its ports to the outside world. To make a port available to services outside of Docker, or to Docker containers which are not connected to the container\'s network, use the --publish or -p flag.',
          'The -p flag takes a mapping in the format host_port:container_port. For example, -p 8080:80 maps port 80 in the container to port 8080 on the Docker host.',
          'You can map multiple ports by providing multiple -p flags. You can also specify the IP address on the host to bind to, for example, -p 127.0.0.1:8080:80.'
        ],
        code: `docker run -p 8080:80 nginx`,
        interviewQuestion: 'What does the -p flag do in the docker run command?'
      }
    ]
  },
  {
    id: 'docker-compose',
    slug: 'docker-compose',
    technology: 'docker',
    title: 'Docker Compose',
    category: 'Docker',
    description: 'Define and run multi-container Docker applications.',
    section: '16. Docker',
    level: 7,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Introduction to Compose', 'Compose File Structure'],
    references,
    sections: [
      {
        heading: 'Introduction to Compose',
        explanation: [
          'Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application\'s services, networks, and volumes.',
          'Then, with a single command, you create and start all the services from your configuration. This simplifies the process of managing complex applications with multiple interacting components.',
          'Compose works in all environments: production, staging, development, testing, as well as CI workflows. It allows you to declare your infrastructure as code.'
        ],
        whyItMatters: 'Docker Compose makes it easy to orchestrate multiple containers that make up an application, simplifying development and deployment workflows.',
        interviewQuestion: 'What is Docker Compose and what problem does it solve?'
      },
      {
        heading: 'Compose File Structure',
        explanation: [
          'A docker-compose.yml file defines services, networks, and volumes. A service definition contains configuration that is applied to each container started for that service.',
          'You specify the image to use, the ports to expose, the environment variables to set, and the volumes to mount for each service.',
          'Services can depend on other services, ensuring they start in the correct order. You can also define custom networks for services to communicate on.'
        ],
        code: `version: '3.8'\nservices:\n  web:\n    image: nginx\n    ports:\n      - "8080:80"\n  db:\n    image: postgres\n    environment:\n      POSTGRES_PASSWORD: secret`,
        interviewQuestion: 'What is the purpose of the docker-compose.yml file?'
      }
    ]
  },
  {
    id: 'multi-stage-builds',
    slug: 'multi-stage-builds',
    technology: 'docker',
    title: 'Multi-Stage Builds',
    category: 'Docker',
    description: 'Optimize Docker images using multi-stage builds.',
    section: '16. Docker',
    level: 8,
    difficulty: 'advanced',
    progress: 0,
    toc: ['The Problem with Large Images', 'How Multi-Stage Builds Work'],
    references,
    sections: [
      {
        heading: 'The Problem with Large Images',
        explanation: [
          'When building Docker images, it\'s common to need tools and dependencies during the build process that are not required at runtime. For example, a Go application requires the Go compiler to build, but only the compiled binary to run.',
          'If you include the build tools in the final image, the image size becomes bloated. This increases deployment time, consumes more storage space, and increases the attack surface of the image.',
          'Historically, developers used the "builder pattern," maintaining two Dockerfiles: one for development (containing all build tools) and one for production (containing only the compiled artifacts). This was cumbersome and difficult to maintain.'
        ],
        whyItMatters: 'Multi-stage builds allow you to create smaller, more secure, and faster-deploying Docker images.',
        interviewQuestion: 'Why are large Docker images problematic?'
      },
      {
        heading: 'How Multi-Stage Builds Work',
        explanation: [
          'With multi-stage builds, you use multiple FROM statements in your Dockerfile. Each FROM instruction can use a different base, and each of them begins a new stage of the build.',
          'You can selectively copy artifacts from one stage to another, leaving behind everything you don\'t want in the final image.',
          'This allows you to use a heavy base image with all the build tools in the first stage, compile your application, and then copy only the compiled binary into a lightweight base image (like alpine or scratch) for the final stage.'
        ],
        code: `FROM golang:1.16 AS builder\nWORKDIR /app\nCOPY . .\nRUN go build -o myapp\n\nFROM alpine:latest\nWORKDIR /app\nCOPY --from=builder /app/myapp .\nCMD ["./myapp"]`,
        interviewQuestion: 'Explain how multi-stage builds work in Docker.'
      }
    ]
  },
  {
    id: 'dockerizing-nodejs',
    slug: 'dockerizing-nodejs',
    technology: 'docker',
    title: 'Dockerizing Node.js',
    category: 'Docker',
    description: 'Best practices for running Node.js applications in Docker.',
    section: '16. Docker',
    level: 9,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Choosing a Base Image', 'Optimizing Node.js Dockerfiles'],
    references,
    sections: [
      {
        heading: 'Choosing a Base Image',
        explanation: [
          'When dockerizing a Node.js application, selecting the right base image is crucial for security and performance. The official node image on Docker Hub provides several variants.',
          'The node:<version> image is based on Debian and is quite large, but includes many common tools. The node:<version>-alpine image is based on Alpine Linux and is much smaller and more secure, but might lack some C++ compilation tools needed by certain native modules.',
          'Using the alpine variant is generally recommended for production to minimize image size and attack surface, unless your application explicitly requires tools found only in the full Debian image.'
        ],
        whyItMatters: 'Choosing the right base image impacts the size, security, and build speed of your Node.js Docker containers.',
        interviewQuestion: 'What are the trade-offs between using node:latest and node:alpine as a base image?'
      },
      {
        heading: 'Optimizing Node.js Dockerfiles',
        explanation: [
          'To optimize the build caching in Docker, you should copy the package.json and package-lock.json files and run npm install before copying the rest of your application code.',
          'This ensures that the npm install step is cached as long as the package files don\'t change, significantly speeding up subsequent builds when only application code is modified.',
          'It\'s also important to use a .dockerignore file to exclude the local node_modules directory, .git directory, and other unnecessary files from being copied into the image context.'
        ],
        code: `FROM node:18-alpine\nWORKDIR /usr/src/app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]`,
        interviewQuestion: 'Why should you copy package.json and run npm install before copying the rest of your application code in a Dockerfile?'
      }
    ]
  },
  {
    id: 'dockerizing-react',
    slug: 'dockerizing-react',
    technology: 'docker',
    title: 'Dockerizing React',
    category: 'Docker',
    description: 'Serve a built React application using Docker and Nginx.',
    section: '16. Docker',
    level: 10,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Building the React App', 'Serving with Nginx'],
    references,
    sections: [
      {
        heading: 'Building the React App',
        explanation: [
          'Dockerizing a React application for production involves a multi-stage build. The first stage is responsible for installing dependencies and building the static assets (HTML, CSS, JS).',
          'We use a Node.js base image for this build stage. We copy the package files, install dependencies, copy the source code, and run the build script (usually npm run build).',
          'This process generates a build directory containing the optimized static files. We only need these static files in the final image, not the Node.js runtime or the source code.'
        ],
        whyItMatters: 'Using multi-stage builds for React applications ensures that the final production image contains only the necessary static files, keeping it small and secure.',
        interviewQuestion: 'Why is a Node.js runtime not needed in the final production Docker image of a React application?'
      },
      {
        heading: 'Serving with Nginx',
        explanation: [
          'In the second stage of the multi-stage build, we use a lightweight web server like Nginx to serve the static files generated in the first stage.',
          'We start with an Nginx base image and copy the contents of the build directory from the build stage into the appropriate Nginx web root directory (usually /usr/share/nginx/html).',
          'We can also provide a custom Nginx configuration file if we need to handle routing for client-side routing (like React Router), proxy API requests, or set custom headers.'
        ],
        code: `FROM node:18-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=build /app/build /usr/share/nginx/html\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]`,
        interviewQuestion: 'How do you handle client-side routing (like React Router) when serving a React app with Nginx in a Docker container?'
      }
    ]
  },
  {
    id: 'postgresql-with-docker',
    slug: 'postgresql-with-docker',
    technology: 'docker',
    title: 'PostgreSQL with Docker',
    category: 'Docker',
    description: 'Run and manage PostgreSQL databases in Docker containers.',
    section: '16. Docker',
    level: 11,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Running PostgreSQL', 'Persisting Data'],
    references,
    sections: [
      {
        heading: 'Running PostgreSQL',
        explanation: [
          'Running PostgreSQL in a Docker container is convenient for local development and testing. You can quickly spin up a database instance without installing PostgreSQL directly on your host machine.',
          'To start a PostgreSQL container, you use the official postgres image. You must provide a password for the default postgres user using the POSTGRES_PASSWORD environment variable.',
          'You can also configure the default database name and user using the POSTGRES_DB and POSTGRES_USER environment variables.'
        ],
        code: `docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres`,
        whyItMatters: 'Dockerizing PostgreSQL ensures consistent database environments across different development machines and CI/CD pipelines.',
        interviewQuestion: 'What environment variable is mandatory when running the official PostgreSQL Docker image?'
      },
      {
        heading: 'Persisting Data',
        explanation: [
          'By default, data stored in a Docker container is ephemeral. If the container is removed, the data is lost. This is unacceptable for a database.',
          'To persist PostgreSQL data, you must mount a Docker volume to the directory where PostgreSQL stores its data inside the container, which is /var/lib/postgresql/data by default.',
          'Using a named volume ensures that the database data persists even if the PostgreSQL container is stopped, removed, or recreated.'
        ],
        code: `docker run -d --name db -e POSTGRES_PASSWORD=secret -v pgdata:/var/lib/postgresql/data postgres`,
        interviewQuestion: 'How do you ensure data persistence when running a database like PostgreSQL in a Docker container?'
      }
    ]
  },
  {
    id: 'redis-with-docker',
    slug: 'redis-with-docker',
    technology: 'docker',
    title: 'Redis with Docker',
    category: 'Docker',
    description: 'Integrate Redis caching into your Dockerized applications.',
    section: '16. Docker',
    level: 12,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Running Redis', 'Custom Configuration'],
    references,
    sections: [
      {
        heading: 'Running Redis',
        explanation: [
          'Redis is an in-memory data structure store, used as a database, cache, and message broker. Running Redis in Docker is extremely simple as it requires very little configuration by default.',
          'You can start a Redis instance using the official redis image. Exposing port 6379 allows other applications to connect to it.',
          'In a multi-container setup using Docker Compose, a Redis service can easily be added and made accessible to other services on the internal network.'
        ],
        code: `docker run --name some-redis -d redis`,
        whyItMatters: 'Running Redis in Docker simplifies adding caching or message queuing to your application stack.',
        interviewQuestion: 'What is the default port used by Redis?'
      },
      {
        heading: 'Custom Configuration',
        explanation: [
          'While the default Redis configuration is suitable for development, production environments often require custom settings, such as enabling persistence (AOF or RDB) or setting a password.',
          'You can provide a custom redis.conf file to the container by mounting it as a volume and passing the file path as a command-line argument to the redis-server command.',
          'Alternatively, you can pass configuration options directly as command-line arguments when starting the container.'
        ],
        code: `docker run -v /myredis/conf/redis.conf:/usr/local/etc/redis/redis.conf --name myredis redis redis-server /usr/local/etc/redis/redis.conf`,
        interviewQuestion: 'How can you apply a custom configuration file to a Redis Docker container?'
      }
    ]
  },
  {
    id: 'container-networking',
    slug: 'container-networking',
    technology: 'docker',
    title: 'Container Networking',
    category: 'Docker',
    description: 'Deep dive into advanced Docker networking concepts.',
    section: '16. Docker',
    level: 13,
    difficulty: 'advanced',
    progress: 0,
    toc: ['DNS Resolution', 'Overlay Networks'],
    references,
    sections: [
      {
        heading: 'DNS Resolution',
        explanation: [
          'In user-defined bridge networks, Docker provides embedded DNS resolution. Containers can communicate with each other using their container names or service names as hostnames.',
          'The Docker daemon runs an embedded DNS server that resolves these names to the internal IP addresses of the respective containers. This makes service discovery simple and robust.',
          'This feature is not available on the default bridge network, which is a major reason why user-defined networks are recommended for multi-container applications.'
        ],
        whyItMatters: 'Embedded DNS resolution simplifies service discovery in multi-container applications, allowing services to connect using names rather than hardcoded IP addresses.',
        interviewQuestion: 'How does DNS resolution work differently in the default bridge network versus a user-defined bridge network?'
      },
      {
        heading: 'Overlay Networks',
        explanation: [
          'Overlay networks are used in Docker Swarm mode to connect multiple Docker daemons together and enable swarm services to communicate with each other.',
          'An overlay network creates a distributed network among multiple Docker daemon hosts. This network sits on top of (overlays) the host-specific networks, allowing containers connected to it to communicate securely.',
          'While primarily used in Swarm, overlay networks provide the foundation for multi-host container networking, which is a key concept in container orchestration systems like Kubernetes.'
        ],
        interviewQuestion: 'What is a Docker overlay network and when is it used?'
      }
    ]
  },
  {
    id: 'production-optimization',
    slug: 'production-optimization',
    technology: 'docker',
    title: 'Production Optimization',
    category: 'Docker',
    description: 'Optimize Docker images and containers for production environments.',
    section: '16. Docker',
    level: 14,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Security Best Practices', 'Resource Limits'],
    references,
    sections: [
      {
        heading: 'Security Best Practices',
        explanation: [
          'Running containers securely in production requires following several best practices. One of the most important is to run processes as a non-root user inside the container.',
          'By default, processes in a container run as root, which poses a security risk if the container is compromised. You should create a dedicated user in the Dockerfile and use the USER instruction to switch to it.',
          'Other best practices include using minimal base images (like Alpine or distroless), keeping images updated to patch vulnerabilities, and using read-only filesystems where possible.'
        ],
        whyItMatters: 'Applying security best practices minimizes the attack surface of your containers and protects your infrastructure from potential breaches.',
        interviewQuestion: 'Why should you avoid running container processes as the root user in production?'
      },
      {
        heading: 'Resource Limits',
        explanation: [
          'By default, a container has no resource constraints and can use as much of a given resource (CPU, memory) as the host\'s kernel scheduler allows.',
          'In a production environment, it\'s crucial to set resource limits to prevent a single container from consuming all host resources and causing a denial of service for other containers (the "noisy neighbor" problem).',
          'Docker provides options to constrain memory usage (--memory) and CPU usage (--cpus) when starting a container or defining a service in Docker Compose.'
        ],
        code: `docker run -d --name my-app --memory="512m" --cpus="1.0" my-image`,
        interviewQuestion: 'What is the "noisy neighbor" problem and how do you prevent it in Docker?'
      }
    ]
  },
  {
    id: 'lab-dockerize-node-api',
    slug: 'lab-dockerize-node-api',
    technology: 'docker',
    title: 'Lab: Dockerize Node API',
    category: 'Docker',
    description: 'Write a Dockerfile for a basic Node.js Express API.',
    section: '16. Docker',
    level: 15,
    difficulty: 'beginner',
    progress: 0,
    toc: ['Lab Instructions'],
    sections: [
      {
        heading: 'Lab Instructions',
        explanation: [
          'In this lab, you will write a Dockerfile to containerize a simple Node.js Express API. The API consists of a package.json file and an index.js file.',
          'Your task is to create a Dockerfile that uses the node:18-alpine base image, sets the working directory, installs the dependencies, copies the source code, exposes the correct port, and starts the application.',
          'Ensure you optimize the build process by leveraging Docker\'s layer caching mechanism for the npm install step.'
        ],
        whyItMatters: 'Dockerizing a Node.js API is a fundamental skill for modern backend development and deployment.'
      }
    ],
    lab: {
      title: 'Dockerize a Node.js API',
      objective: 'Create an optimized Dockerfile for a Node.js application.',
      starterCode: `# Write your Dockerfile here\n\n`,
      expectedOutput: `Step 1/7 : FROM node:18-alpine\n...\nSuccessfully built <image-id>`,
      solution: `FROM node:18-alpine\nWORKDIR /usr/src/app\nCOPY package*.json ./\nRUN npm install --production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "index.js"]`,
      hints: [
        'Use the node:18-alpine base image.',
        'Copy package.json and package-lock.json first to utilize caching.',
        'Run npm install before copying the rest of the application code.'
      ]
    }
  },
  {
    id: 'lab-node-postgresql',
    slug: 'lab-node-postgresql',
    technology: 'docker',
    title: 'Lab: Node + PostgreSQL',
    category: 'Docker',
    description: 'Use Docker Compose to run a Node.js app alongside a PostgreSQL database.',
    section: '16. Docker',
    level: 16,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Lab Instructions'],
    sections: [
      {
        heading: 'Lab Instructions',
        explanation: [
          'In this lab, you will use Docker Compose to define a multi-container application consisting of a Node.js API and a PostgreSQL database.',
          'You need to write a docker-compose.yml file that defines two services: "api" (building from a local Dockerfile) and "db" (using the official postgres image).',
          'Configure the database service with the necessary environment variables for user, password, and database name. Ensure the API service depends on the database and has the correct connection string via environment variables.'
        ],
        whyItMatters: 'Docker Compose simplifies running multi-container applications locally, mirroring complex production setups.'
      }
    ],
    lab: {
      title: 'Docker Compose with Node and Postgres',
      objective: 'Write a docker-compose.yml file to orchestrate a Node API and a PostgreSQL database.',
      starterCode: `version: '3.8'\nservices:\n  # Add your services here\n`,
      expectedOutput: `Creating network "lab_default" with the default driver\nCreating lab_db_1 ... done\nCreating lab_api_1 ... done`,
      solution: `version: '3.8'\nservices:\n  api:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - DB_HOST=db\n      - DB_USER=postgres\n      - DB_PASSWORD=secret\n      - DB_NAME=myapp\n    depends_on:\n      - db\n  db:\n    image: postgres:14-alpine\n    environment:\n      - POSTGRES_USER=postgres\n      - POSTGRES_PASSWORD=secret\n      - POSTGRES_DB=myapp\n    volumes:\n      - pgdata:/var/lib/postgresql/data\nvolumes:\n  pgdata:`,
      hints: [
        'Use the `depends_on` property in the api service.',
        'Ensure the DB_HOST environment variable matches the database service name.',
        'Define a named volume to persist database data.'
      ]
    }
  },
  {
    id: 'lab-node-redis',
    slug: 'lab-node-redis',
    technology: 'docker',
    title: 'Lab: Node + Redis',
    category: 'Docker',
    description: 'Integrate Redis caching into a Node.js app using Docker Compose.',
    section: '16. Docker',
    level: 17,
    difficulty: 'intermediate',
    progress: 0,
    toc: ['Lab Instructions'],
    sections: [
      {
        heading: 'Lab Instructions',
        explanation: [
          'This lab involves configuring a Docker Compose setup that runs a Node.js application alongside a Redis instance for caching.',
          'Your task is to define the docker-compose.yml file with an "api" service and a "cache" service using the official Redis image.',
          'Ensure the Node.js application is configured to connect to the Redis service using the internal Docker network hostname (which defaults to the service name).'
        ],
        whyItMatters: 'Integrating caching services like Redis is a common pattern in backend development, and Docker Compose makes setting this up locally effortless.'
      }
    ],
    lab: {
      title: 'Docker Compose with Node and Redis',
      objective: 'Set up a Node.js API with a Redis cache using Docker Compose.',
      starterCode: `version: '3.8'\nservices:\n  # Add your services here\n`,
      expectedOutput: `Creating network "lab_default" with the default driver\nCreating lab_cache_1 ... done\nCreating lab_api_1 ... done`,
      solution: `version: '3.8'\nservices:\n  api:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - REDIS_URL=redis://cache:6379\n    depends_on:\n      - cache\n  cache:\n    image: redis:alpine\n    ports:\n      - "6379:6379"`,
      hints: [
        'The Redis service image should be `redis:alpine`.',
        'Set the REDIS_URL environment variable in the API service to point to the Redis service.',
        'Use `depends_on` to ensure the cache starts before the API.'
      ]
    }
  },
  {
    id: 'lab-full-stack-docker-compose',
    slug: 'lab-full-stack-docker-compose',
    technology: 'docker',
    title: 'Lab: Full-Stack Docker Compose',
    category: 'Docker',
    description: 'Orchestrate a React frontend, Node backend, and database.',
    section: '16. Docker',
    level: 18,
    difficulty: 'advanced',
    progress: 0,
    toc: ['Lab Instructions'],
    sections: [
      {
        heading: 'Lab Instructions',
        explanation: [
          'In this final lab, you will orchestrate a complete full-stack application using Docker Compose. The stack consists of a React frontend, a Node.js backend API, and a PostgreSQL database.',
          'You need to write a comprehensive docker-compose.yml file that defines three services: "frontend", "backend", and "database".',
          'Configure the frontend to proxy API requests to the backend, the backend to connect to the database, and define persistent volumes for the database data.'
        ],
        whyItMatters: 'Orchestrating a full-stack application with Docker Compose demonstrates a solid understanding of container networking, volumes, and service configuration.'
      }
    ],
    lab: {
      title: 'Full-Stack Application Orchestration',
      objective: 'Create a docker-compose.yml for a frontend, backend, and database.',
      starterCode: `version: '3.8'\nservices:\n  # Define frontend, backend, and database services\n`,
      expectedOutput: `Creating network "lab_default" with the default driver\nCreating lab_database_1 ... done\nCreating lab_backend_1 ... done\nCreating lab_frontend_1 ... done`,
      solution: `version: '3.8'\nservices:\n  frontend:\n    build: ./client\n    ports:\n      - "80:80"\n    depends_on:\n      - backend\n  backend:\n    build: ./server\n    ports:\n      - "3000:3000"\n    environment:\n      - DB_HOST=database\n      - DB_USER=postgres\n      - DB_PASSWORD=secret\n      - DB_NAME=fullstack\n    depends_on:\n      - database\n  database:\n    image: postgres:14-alpine\n    environment:\n      - POSTGRES_USER=postgres\n      - POSTGRES_PASSWORD=secret\n      - POSTGRES_DB=fullstack\n    volumes:\n      - db-data:/var/lib/postgresql/data\nvolumes:\n  db-data:`,
      hints: [
        'Use context paths like `./client` and `./server` for the build properties.',
        'Ensure proper networking and environment variables are set for the backend to communicate with the database.',
        'Don\'t forget to define the named volume at the bottom of the file.'
      ]
    }
  }
]
