// Workaround for 'Illegal constructor' error in Node 20/undici
if (typeof globalThis.caches !== 'undefined' && globalThis.caches !== null) {
    try {
        delete globalThis.caches
    } catch (e) {
        // Ignore if not deletable
    }
}

// Skip Payload's internal Next.js environment loading to avoid CJS/ESM conflicts
process.env.PAYLOAD_SKIP_LOAD_ENV = 'true'

import { getPayload } from 'payload'
// Use the .ts configuration directly
import config from '../payload.config.ts'

async function sync() {
    console.log('Starting Payload database sync...')
    try {
        // Set a dummy secret if not present for build time
        if (!process.env.PAYLOAD_SECRET) process.env.PAYLOAD_SECRET = 'temp-build-secret'

        // Ensure we use the production config settings but force push
        const payload = await getPayload({ config })

        console.log('Payload initialized. Database should be synced.')
        process.exit(0)
    } catch (err) {
        console.error('Migration failed:', err)
        process.exit(1)
    }
}

sync()
