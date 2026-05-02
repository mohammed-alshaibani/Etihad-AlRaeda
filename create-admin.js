// create-admin.js
// Creates the first admin user directly in PostgreSQL.
// Run via "Run JS Script" in cPanel after adding "create-admin": "node create-admin.js" to package.json
//
// Change these values before running:
const ADMIN_EMAIL    = 'admin@etihad.sa'   // ← Your admin email
const ADMIN_PASSWORD = 'Admin2030!'        // ← Your admin password (min 8 chars)

import pg from 'pg'
import crypto from 'crypto'

const { Client } = pg

// ── Payload v3 password hashing (same algorithm Payload uses internally) ──
function hashPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 25000, 512, 'sha256')
    .toString('hex')
  return { hash, salt }
}

async function createAdmin() {
  const client = new Client({ connectionString: process.env.DATABASE_URL })

  try {
    await client.connect()
    console.log('✅ Connected to database!')

    // Check if users already exist
    const { rows } = await client.query('SELECT COUNT(*) as count FROM users')
    const count = parseInt(rows[0].count)
    if (count > 0) {
      console.log(`⚠️  ${count} user(s) already exist. Use /admin/login instead.`)
      console.log('   If you forgot your password, run this script to create a new user with a different email.')
      await client.end()
      return
    }

    // Hash the password
    const { hash, salt } = hashPassword(ADMIN_PASSWORD)
    const now = new Date().toISOString()
    const id = crypto.randomUUID()

    // Insert the user
    await client.query(
      `INSERT INTO users (id, email, hash, salt, login_attempts, updated_at, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, ADMIN_EMAIL, hash, salt, 0, now, now]
    )

    console.log('🎉 Admin user created successfully!')
    console.log(`   Email:    ${ADMIN_EMAIL}`)
    console.log(`   Password: ${ADMIN_PASSWORD}`)
    console.log('')
    console.log('👉 Now go to https://etihad.sa/admin/login to sign in.')

  } catch (err) {
    console.error('❌ Error:', err.message)
    if (err.message.includes('does not exist')) {
      console.error('   The "users" table does not exist yet.')
      console.error('   Make sure the app has started at least once to create tables.')
    }
  } finally {
    await client.end()
  }
}

createAdmin()
