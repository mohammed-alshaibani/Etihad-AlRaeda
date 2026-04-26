const Database = require('libsql'); // or whatever sqlite driver is in node_modules, payload uses @libsql/client
// Wait, Payload uses @libsql/client or better-sqlite3 ? Let's check node_modules.

const fs = require('fs');
if (fs.existsSync('./node_modules/better-sqlite3')) {
    const db = require('better-sqlite3')('payload.db');
    console.log("Users before:", db.prepare('SELECT * FROM users').all());
    db.prepare('DELETE FROM users').run();
    console.log("Users cleared. You can now register.");
} else if (fs.existsSync('./node_modules/@libsql/client')) {
    const { createClient } = require('@libsql/client');
    const client = createClient({ url: 'file:payload.db' });
    client.execute('SELECT * FROM users').then(res => {
        console.log("Users before:", res.rows);
        return client.execute('DELETE FROM users');
    }).then(() => console.log("Cleared users!")).catch(console.error);
} else {
    console.log("sqlite drivers not found");
}
