// CommonJS script to avoid ESM hoisting issues
// This ensures environment variables are set BEFORE Payload loads its internal modules

process.env.PAYLOAD_SKIP_LOAD_ENV = 'true';

// Workaround for 'Illegal constructor' error in Node 20/undici
if (typeof globalThis.caches !== 'undefined' && globalThis.caches !== null) {
    try {
        delete globalThis.caches;
    } catch (e) {
        // Ignore if not deletable
    }
}

const { getPayload } = require('payload');
// We need to import the config. Since it's a .ts file, we rely on tsx/register
const config = require('../payload.config.ts').default || require('../payload.config.ts');

async function sync() {
    console.log('Starting Payload database sync (CJS)...');
    try {
        // Set a dummy secret if not present for build time
        if (!process.env.PAYLOAD_SECRET) process.env.PAYLOAD_SECRET = 'temp-build-secret';

        // Explicitly set push to true for this sync
        const payload = await getPayload({ config });
        console.log('Payload initialized. Database should be synced.');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

sync();
