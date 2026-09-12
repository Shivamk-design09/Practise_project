import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

const EXECUTION_TIMEOUT_MS = Number(process.env.EXECUTION_TIMEOUT_MS || 5000)
const DOCKER_IMAGE = process.env.NODE_RUNNER_IMAGE || 'node-playground:latest'
const MAX_CODE_BYTES = Number(process.env.MAX_CODE_BYTES || 100 * 1024)

function dockerIsAvailable() {
    const result = spawnSync('docker', ['info', '--format', '{{.ServerVersion}}'], {
        encoding: 'utf8',
        timeout: 3000,
        windowsHide: true,
    })
    return result.status === 0
}

function killContainer(containerName) {
    spawnSync('docker', ['rm', '--force', containerName], {
        stdio: 'ignore',
        timeout: 3000,
        windowsHide: true,
    })
}

function terminateLocalProcess(child) {
    if (!child?.pid) return
    if (process.platform === 'win32') {
        spawnSync('taskkill', ['/pid', String(child.pid), '/t', '/f'], {
            stdio: 'ignore',
            windowsHide: true,
        })
    } else {
        child.kill('SIGTERM')
    }
}

async function removeTemporaryDirectory(directory) {
    for (let attempt = 0; attempt < 5; attempt += 1) {
        try {
            await rm(directory, { recursive: true, force: true })
            return
        } catch (error) {
            if (attempt === 4) throw error
            await new Promise((resolve) => setTimeout(resolve, 50))
        }
    }
}

async function runNodeLocally(code, options = {}) {
    const directory = await mkdtemp(path.join(os.tmpdir(), 'node-playground-dev-'))
    const mainFile = path.join(directory, 'main.js')
    const startedAt = Date.now()
    let child
    let timer

    try {
        await writeFile(mainFile, code, { encoding: 'utf8', mode: 0o600 })

        const result = await new Promise((resolve, reject) => {
            const stdoutChunks = []
            const stderrChunks = []
            let settled = false
            const finish = (value) => {
                if (settled) return
                settled = true
                clearTimeout(timer)
                resolve(value)
            }

            child = spawn(process.execPath, ['--no-warnings', mainFile], {
                cwd: directory,
                env: { PATH: process.env.PATH || '', NODE_ENV: 'playground' },
                windowsHide: true,
            })
            child.stdout.on('data', (chunk) => stdoutChunks.push(chunk))
            child.stderr.on('data', (chunk) => stderrChunks.push(chunk))
            child.on('error', reject)
            child.on('close', (exitCode) => {
                finish({
                    stdout: Buffer.concat(stdoutChunks).toString(),
                    stderr: Buffer.concat(stderrChunks).toString(),
                    exitCode,
                    timedOut: false,
                    executionMode: 'local-development',
                })
            })

            timer = setTimeout(() => {
                terminateLocalProcess(child)
                finish({
                    stdout: Buffer.concat(stdoutChunks).toString(),
                    stderr: 'Execution timed out.\n',
                    exitCode: null,
                    timedOut: true,
                    executionMode: 'local-development',
                })
            }, EXECUTION_TIMEOUT_MS)

            if (options.signal) {
                const abort = () => {
                    terminateLocalProcess(child)
                    finish({
                        stdout: Buffer.concat(stdoutChunks).toString(),
                        stderr: 'Execution stopped by the user.\n',
                        exitCode: null,
                        timedOut: false,
                        executionMode: 'local-development',
                    })
                }
                if (options.signal.aborted) abort()
                else options.signal.addEventListener('abort', abort, { once: true })
            }
        })

        return { ...result, executionTime: Date.now() - startedAt }
    } finally {
        clearTimeout(timer)
        await removeTemporaryDirectory(directory)
    }
}

/** @param {string} code @param {{ signal?: AbortSignal }} [options] */
export async function runNodeInDocker(code, options = {}) {
    const sourceSize = Buffer.byteLength(code, 'utf8')
    if (sourceSize > MAX_CODE_BYTES) {
        throw new Error(`Code exceeds the ${MAX_CODE_BYTES} byte limit.`)
    }

    if (!dockerIsAvailable()) {
        if (process.env.NODE_ENV !== 'production') {
            return runNodeLocally(code, options)
        }
        throw new Error(
            'Docker is unavailable. Start Docker Desktop before using the production execution API.',
        )
    }

    const directory = await mkdtemp(path.join(os.tmpdir(), 'node-playground-'))
    const mainFile = path.join(directory, 'main.js')
    const containerName = `node-playground-${randomUUID()}`
    const startedAt = Date.now()
    let child
    let timer
    let timedOut = false

    try {
        await writeFile(mainFile, code, { encoding: 'utf8', mode: 0o444 })

        const args = [
            'run',
            '--rm',
            '--name',
            containerName,
            '--network',
            'none',
            '--memory',
            process.env.NODE_MEMORY_LIMIT || '128m',
            '--cpus',
            process.env.NODE_CPU_LIMIT || '0.5',
            '--pids-limit',
            process.env.NODE_PIDS_LIMIT || '64',
            '--read-only',
            '--tmpfs',
            '/tmp:rw,noexec,nosuid,size=16m',
            '--cap-drop',
            'ALL',
            '--security-opt',
            'no-new-privileges:true',
            '--env',
            'NODE_ENV=playground',
            '--mount',
            `type=bind,src=${directory},dst=/app,readonly`,
            DOCKER_IMAGE,
            '--no-warnings',
            '/app/main.js',
        ]

        child = spawn('docker', args, { windowsHide: true })
        const stdoutChunks = []
        const stderrChunks = []

        child.stdout.on('data', (chunk) => stdoutChunks.push(chunk))
        child.stderr.on('data', (chunk) => stderrChunks.push(chunk))

        const result = await new Promise((resolve, reject) => {
            let settled = false
            const finish = (value) => {
                if (settled) return
                settled = true
                clearTimeout(timer)
                resolve(value)
            }

            timer = setTimeout(() => {
                timedOut = true
                killContainer(containerName)
                child.kill('SIGTERM')
                finish({
                    stdout: Buffer.concat(stdoutChunks).toString(),
                    stderr: 'Execution timed out.\n',
                    exitCode: null,
                })
            }, EXECUTION_TIMEOUT_MS)

            child.on('error', reject)
            child.on('close', (exitCode) => {
                finish({
                    stdout: Buffer.concat(stdoutChunks).toString(),
                    stderr: Buffer.concat(stderrChunks).toString(),
                    exitCode,
                })
            })

            if (options.signal) {
                const abort = () => {
                    killContainer(containerName)
                    child.kill('SIGTERM')
                    finish({
                        stdout: Buffer.concat(stdoutChunks).toString(),
                        stderr: 'Execution stopped by the user.\n',
                        exitCode: null,
                    })
                }
                if (options.signal.aborted) abort()
                else options.signal.addEventListener('abort', abort, { once: true })
            }
        })

        return {
            ...result,
            executionTime: Date.now() - startedAt,
            timedOut,
            executionMode: 'docker',
        }
    } finally {
        clearTimeout(timer)
        await removeTemporaryDirectory(directory)
    }
}
