# Backend Lab

Backend Lab is a React and Vite Node.js learning platform with a real Node.js playground.

## Architecture

The browser sends source code to `POST /api/execute`. The API writes that source to a temporary `main.js`, starts a dedicated Docker execution image, and returns `stdout`, `stderr`, `exitCode`, `executionTime`, and timeout status. The frontend never executes submitted code.

The runner has a small `executeCode` abstraction so future Python, Java, C++, or Go runners can implement the same API without changing the HTTP or editor layers.

## Requirements

- Node.js 22 or newer
- npm
- Docker Desktop running

## Run locally

Install dependencies and build the sandbox image:

```bash
npm install
npm run build:runner
```

Start both the API and frontend together:

```bash
npm run dev
```

The separate commands are still available when needed:

```bash
npm run api
npm run dev:frontend
```

Open the Vite URL and select Practice > JavaScript or Practice > Node.js.

The Vite development server proxies `/api` to `http://localhost:4000`. In a deployment, place the API behind the same origin or configure the frontend API URL and CORS policy explicitly.

## API

`POST /api/execute`

Request:

```json
{ "code": "console.log(10 + 20)", "language": "node" }
```

Response:

```json
{
  "stdout": "30\n",
  "stderr": "",
  "exitCode": 0,
  "executionTime": 35,
  "timedOut": false
}
```

The API rejects empty code, requests over 110 KB, and clients over the configurable request rate. Docker unavailability returns an explicit error; the API never silently runs arbitrary code in the backend process.

## Security limits

Each execution runs in a temporary read-only bind mount inside Docker with:

- no network access
- 128 MB memory by default
- 0.5 CPU by default
- 64 process limit by default
- dropped Linux capabilities
- `no-new-privileges`
- a 5 second execution timeout
- only `NODE_ENV=playground` passed into the container

Configure limits with environment variables:

```text
EXECUTION_TIMEOUT_MS=5000
NODE_MEMORY_LIMIT=128m
NODE_CPU_LIMIT=0.5
NODE_PIDS_LIMIT=64
MAX_CODE_BYTES=102400
MAX_BODY_BYTES=112640
MAX_REQUESTS_PER_MINUTE=30
NODE_RUNNER_IMAGE=node-playground:latest
API_PORT=4000
```

Do not mount the Docker socket into the API or execution container. Do not pass application secrets into the execution environment. Docker is a required production boundary; a local unsandboxed fallback is intentionally not enabled.

## Output and history

The playground displays real stdout and stderr separately, preserves Node's event-loop behavior, reports exit code and execution time, and stores the last ten source snippets in browser localStorage. Stop aborts the API request and asks the runner to remove the container.

## Future languages

Add a language-specific implementation behind `server/src/services/codeRunner.mjs`, then keep the request contract stable. Each implementation should use its own minimal image and the same resource, filesystem, network, and timeout restrictions.
