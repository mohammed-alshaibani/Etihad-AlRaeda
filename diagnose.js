// diagnose.js - Run via "Run JS Script" in cPanel to check server config
// Add "diagnose": "node diagnose.js" to package.json scripts to run it

console.log('='.repeat(50))
console.log('🔍 SERVER ENVIRONMENT DIAGNOSTIC')
console.log('='.repeat(50))

// Check critical env vars
const checks = [
  { key: 'SERVER_URL',             expected: 'https://etihad.sa' },
  { key: 'NEXT_PUBLIC_SERVER_URL', expected: 'https://etihad.sa' },
  { key: 'NODE_ENV',               expected: 'production' },
  { key: 'DATABASE_URL',           expected: 'postgresql://...' },
  { key: 'PAYLOAD_SECRET',         expected: '(long secret key)' },
]

console.log('\n📋 Environment Variables:')
checks.forEach(({ key, expected }) => {
  const value = process.env[key]
  const status = value ? '✅' : '❌ MISSING'
  const display = value
    ? key === 'DATABASE_URL' || key === 'PAYLOAD_SECRET'
      ? value.substring(0, 30) + '...'
      : value
    : 'NOT SET'
  console.log(`  ${status} ${key}: ${display}`)
  if (value && key === 'SERVER_URL' && value !== expected) {
    console.log(`     ⚠️  WARNING: Expected "${expected}" but got "${value}"`)
    console.log(`     ⚠️  This will cause CSRF errors on admin panel!`)
  }
})

// Check CSRF
console.log('\n🔐 CSRF Check:')
const serverUrl = process.env.SERVER_URL || 'http://localhost:3000'
console.log(`  Payload CSRF will allow requests from: ${serverUrl}`)
if (serverUrl.includes('localhost')) {
  console.log('  ❌ PROBLEM: CSRF is set to localhost - browser requests from etihad.sa will be BLOCKED!')
  console.log('  Fix: Update SERVER_URL in your .env file to https://etihad.sa')
} else {
  console.log('  ✅ CSRF looks correct!')
}

// Check database connection
console.log('\n🗄️  Database Check:')
const dbUrl = process.env.DATABASE_URL
if (!dbUrl) {
  console.log('  ❌ DATABASE_URL is not set!')
} else if (dbUrl.startsWith('file:') || dbUrl.startsWith('file:.')) {
  console.log('  ❌ PROBLEM: Using SQLite! Should be PostgreSQL on production.')
  console.log('  Fix: Update DATABASE_URL in your .env file')
} else if (dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://')) {
  console.log('  ✅ PostgreSQL connection configured!')

  // Test the connection
  import('pg').then(({ default: pg }) => {
    const client = new pg.Client({ connectionString: dbUrl })
    client.connect()
      .then(() => {
        console.log('  ✅ Database connected successfully!')
        return client.query(`SELECT COUNT(*) as user_count FROM users`)
      })
      .then(result => {
        const count = result.rows[0].user_count
        console.log(`  👤 Users in database: ${count}`)
        if (count === '0' || count === 0) {
          console.log('  ℹ️  No users yet - /admin/create-first-user should work')
        } else {
          console.log('  ℹ️  Users exist - use /admin/login instead')
        }
        return client.end()
      })
      .catch(err => {
        console.log(`  ❌ Database error: ${err.message}`)
        client.end()
      })
  }).catch(() => {
    console.log('  ⚠️  Could not import pg module to test connection')
  })
} else {
  console.log(`  ⚠️  Unknown database URL format: ${dbUrl.substring(0, 20)}...`)
}

console.log('\n' + '='.repeat(50))
