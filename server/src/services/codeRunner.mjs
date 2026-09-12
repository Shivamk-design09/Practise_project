import { runNodeInDocker } from './dockerRunner.mjs'

/** @typedef {{ code: string, language?: string }} ExecutionRequest */
/** @typedef {{ stdout: string, stderr: string, exitCode: number | null, executionTime: number, timedOut: boolean, executionMode: string }} ExecutionResult */

/**
 * The runner boundary keeps future languages independent from the HTTP layer.
 * @param {ExecutionRequest} request
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<ExecutionResult>}
 */
export function executeCode(request, options = {}) {
    if (request.language && request.language !== 'node') {
        throw new Error('Only Node.js execution is supported currently.')
    }

    return runNodeInDocker(request.code, options)
}
