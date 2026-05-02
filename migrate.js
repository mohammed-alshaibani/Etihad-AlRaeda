// migrate.js - Run once to fix database schema
// Upload this file to /home/modsxcqd/Etihad/ and run via "Run JS Script" in cPanel

import pg from 'pg'

const { Client } = pg

const client = new Client({
  connectionString: process.env.DATABASE_URL
})

const migrations = [
  {
    name: 'Add text column to products_features',
    sql: `ALTER TABLE products_features ADD COLUMN IF NOT EXISTS text varchar`
  },
  {
    name: 'Create media_locales table',
    sql: `CREATE TABLE IF NOT EXISTS media_locales (
      id serial PRIMARY KEY,
      alt varchar NOT NULL,
      caption varchar,
      _locale varchar(30) NOT NULL,
      _parent_id integer NOT NULL REFERENCES media(id) ON DELETE CASCADE,
      CONSTRAINT media_locales_parent_id_locale_unique UNIQUE (_parent_id, _locale)
    )`
  },
  {
    name: 'Create workflow table',
    sql: `CREATE TABLE IF NOT EXISTS workflow (
      id serial PRIMARY KEY,
      icon varchar DEFAULT 'Briefcase',
      "order" integer NOT NULL,
      updated_at timestamptz DEFAULT now() NOT NULL,
      created_at timestamptz DEFAULT now() NOT NULL
    )`
  },
  {
    name: 'Create workflow_locales table',
    sql: `CREATE TABLE IF NOT EXISTS workflow_locales (
      id serial PRIMARY KEY,
      title varchar NOT NULL,
      description varchar,
      _locale varchar(30) NOT NULL,
      _parent_id integer NOT NULL REFERENCES workflow(id) ON DELETE CASCADE,
      CONSTRAINT workflow_locales_parent_id_locale_unique UNIQUE (_parent_id, _locale)
    )`
  }
]

async function runMigrations() {
  console.log('Connecting to database...')
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Found ✓' : 'MISSING ✗')

  try {
    await client.connect()
    console.log('Connected successfully!\n')

    for (const migration of migrations) {
      try {
        console.log(`Running: ${migration.name}...`)
        await client.query(migration.sql)
        console.log(`  ✓ Done!\n`)
      } catch (err) {
        console.error(`  ✗ Error: ${err.message}\n`)
      }
    }

    console.log('All migrations completed!')
  } catch (err) {
    console.error('Failed to connect to database:', err.message)
  } finally {
    await client.end()
    console.log('Database connection closed.')
  }
}

runMigrations()
