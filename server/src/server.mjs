import http from 'node:http'
import { executeRoute } from './routes/execute.mjs'

const port = Number(process.env.API_PORT || 4000)

const server = http.createServer(async (request, response) => {
    if (request.url === '/health') {
        response.writeHead(200, { 'content-type': 'application/json' })
        response.end(JSON.stringify({ ok: true, service: 'node-playground-api' }))
        return
    }

    const handled = await executeRoute(request, response)
    if (!handled && !response.writableEnded) {
        response.writeHead(404, { 'content-type': 'application/json' })
        response.end(JSON.stringify({ error: 'Not found.' }))
    }
})

server.listen(port, () => {
    console.log(`Node playground API listening on http://localhost:${port}`)
})
