import fs from 'fs';
import path from 'path';

const collectionsDir = path.join(process.cwd(), 'payload', 'collections');
const globalsDir = path.join(process.cwd(), 'payload', 'globals');

const accessBlock = `  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },`;

const globalAccessBlock = `  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },`;

function processFiles(dir: string, block: string) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.ts')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf-8');

            // Skip if it's Users or Customers, they have custom logic
            if (file === 'Users.ts' || file === 'Customers.ts') continue;

            if (content.includes('access: {') && content.includes('read: () => true')) {
                // Attempt to replace simple access block
                const regex = /access:\s*\{\s*read:\s*\(\)\s*=>\s*true,?\s*\},?/g;
                content = content.replace(regex, block);
                fs.writeFileSync(filePath, content);
                console.log(`✅ Patched ${file}`);
            } else if (!content.includes('access:')) {
                // Inject before fields: [
                content = content.replace('fields: [', block + '\n  fields: [');
                fs.writeFileSync(filePath, content);
                console.log(`✅ Injected ${file}`);
            }
        }
    }
}

// Process Collections
processFiles(collectionsDir, accessBlock);
// Process Globals (Globals lack create/delete)
processFiles(globalsDir, globalAccessBlock);

// Remove map from payload.config.ts
const configPath = path.join(process.cwd(), 'payload.config.ts');
let configContent = fs.readFileSync(configPath, 'utf-8');

// Quick replace to remove the map
configContent = configContent.replace(/\].map\(\(c: any\) => \(\{[^]+?\bdelete\:.*?\}\n  \}\)\),/m, '],');
configContent = configContent.replace(/\].map\(\(g: any\) => \(\{[^]+?\bupdate\:.*?\}\n  \}\)\),/m, '],');

fs.writeFileSync(configPath, configContent);
console.log('✅ Reverted payload.config.ts map overrides');
