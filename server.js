const path = require('path');
const fs = require('fs');
const http = require('http');

// official server.js for Next.js production
const configPath = path.join(__dirname, '.next', 'required-server-files.json');
const config = fs.existsSync(configPath) 
  ? JSON.parse(fs.readFileSync(configPath, 'utf8'))
  : { config: { distDir: '.next' } };

const NextServer = require('next/dist/server/next-server').default;

const nextServer = new NextServer({
  hostname: 'localhost',
  port: process.env.PORT || 3000,
  dir: __dirname,
  dev: false,
  customServer: false,
  conf: config.config,
});

const handler = nextServer.getRequestHandler();

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    // 🛠️ FIX: Strip /admin/ from static asset requests
    if (url.pathname.includes('/admin/_next/static/')) {
        req.url = url.pathname.replace('/admin/_next/static/', '/_next/static/');
    }

    await handler(req, res);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end('internal server error');
  }
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server ready');
});
