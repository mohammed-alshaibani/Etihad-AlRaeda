import { getPayload } from 'payload'
import config from './payload.config'

async function sync() {
    console.log('🔄 Synchronizing database schema...')
    try {
        const payload = await getPayload({ config })
        console.log('✅ Database schema synchronized successfully.')
        process.exit(0)
    } catch (err) {
        console.error('❌ Database synchronization failed:', err)
        process.exit(1)
    }
}

sync()
