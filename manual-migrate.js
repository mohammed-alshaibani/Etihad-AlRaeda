const { createClient } = require('@libsql/client');
const path = require('path');

async function run() {
    const dbPath = path.join(__dirname, 'payload.db');
    console.log('Connecting to:', dbPath);

    const client = createClient({
        url: `file:${dbPath}`,
    });

    try {
        console.log('Creating media_locales table...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS media_locales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        parent_id INTEGER NOT NULL,
        locale TEXT NOT NULL,
        alt TEXT,
        caption TEXT,
        FOREIGN KEY (parent_id) REFERENCES media(id) ON DELETE CASCADE
      )
    `);

        console.log('Success! Table created.');
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        client.close();
    }
}

run();
