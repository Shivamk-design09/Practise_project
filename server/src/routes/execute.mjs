import { executeCode } from '../services/codeRunner.mjs'

const MAX_BODY_BYTES = Number(process.env.MAX_BODY_BYTES || 110 * 1024)
const MAX_REQUESTS_PER_MINUTE = Number(process.env.MAX_REQUESTS_PER_MINUTE || 30)
const requestWindows = new Map()

function clientKey(request) {
    return request.headers['x-forwarded-for']?.split(',')[0]?.trim() || request.socket.remoteAddress || 'unknown'
}

function isRateLimited(key) {
    const now = Date.now()
    const current = requestWindows.get(key) || { startedAt: now, count: 0 }
    if (now - current.startedAt >= 60_000) {
        current.startedAt = now
        current.count = 0
    }
    current.count += 1
    requestWindows.set(key, current)
    return current.count > MAX_REQUESTS_PER_MINUTE
}

function readJson(request) {
    return new Promise((resolve, reject) => {
        let size = 0
        const chunks = []
        request.on('data', (chunk) => {
            size += chunk.length
            if (size > MAX_BODY_BYTES) {
                reject(Object.assign(new Error('Request body is too large.'), { statusCode: 413 }))
                request.destroy()
                return
            }
            chunks.push(chunk)
        })
        request.on('end', () => {
            try {
                resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
            } catch {
                reject(Object.assign(new Error('Request body must be valid JSON.'), { statusCode: 400 }))
            }
        })
        request.on('error', reject)
    })
}

function sendJson(response, statusCode, payload) {
    response.writeHead(statusCode, {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
    })
    response.end(JSON.stringify(payload))
}

export async function executeRoute(request, response) {
    if (request.method !== 'POST' || request.url !== '/api/execute') return false

    if (isRateLimited(clientKey(request))) {
        sendJson(response, 429, { error: 'Rate limit exceeded. Try again in a minute.' })
        return true
    }

    try {
        const body = await readJson(request)
        if (!body || typeof body.code !== 'string' || body.code.trim() === '') {
            sendJson(response, 400, { error: 'code must be a non-empty string.' })
            return true
        }

        const executionController = new AbortController()
        request.on('aborted', () => executionController.abort())
        response.on('close', () => {
            if (!response.writableEnded) executionController.abort()
        })

        const result = await executeCode(
            { code: body.code, language: body.language },
            { signal: executionController.signal },
        )
        sendJson(response, 200, result)
    } catch (error) {
        const statusCode = error.statusCode || (error.message.includes('Docker') ? 503 : 500)
        sendJson(response, statusCode, { error: error.message || 'Execution failed.' })
    }

    return true
}
