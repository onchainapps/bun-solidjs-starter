import { Elysia, t } from 'elysia';
import { join } from 'path';

const PORT = parseInt(process.env.PORT || '3030');
const HOST = process.env.HOST || '0.0.0.0';
const DIST = join(import.meta.dir, '..', 'dist-frontend');

// ─── WebSocket Hub ────────────────────────────────────────
const clients = new Set<any>();
let serverStats = { uptime: 0, connections: 0, requests: 0 };
let requestCount = 0;

function broadcast(data: object) {
  const msg = JSON.stringify(data);
  for (const ws of clients) {
    try { ws.send(msg); } catch {}
  }
}

// ─── Server ──────────────────────────────────────────────
const app = new Elysia()
  // Request counter middleware
  .onRequest(() => { requestCount++; })

  // ⚠️ WebSocket MUST come before static routes
  .ws('/ws', {
    open(ws) {
      clients.add(ws);
      serverStats.connections = clients.size;
      ws.send(JSON.stringify({
        type: 'connected',
        stats: { ...serverStats, uptime: process.uptime(), requests: requestCount }
      }));
      broadcast({ type: 'stats', stats: { ...serverStats, uptime: process.uptime(), requests: requestCount } });
    },
    close(ws) {
      clients.delete(ws);
      serverStats.connections = clients.size;
      broadcast({ type: 'stats', stats: { ...serverStats, uptime: process.uptime(), requests: requestCount } });
    },
    message(ws, msg) {
      try {
        const data = JSON.parse(msg as string);
        if (data.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong', time: Date.now() }));
        }
      } catch {}
    }
  })

  // ─── API Routes ───────────────────────────────────────
  .get('/api/health', () => ({
    status: 'ok',
    uptime: process.uptime(),
    connections: clients.size,
    requests: requestCount,
    node: Bun.version,
    time: new Date().toISOString()
  }))

  .get('/api/stats', () => ({
    connections: clients.size,
    requests: requestCount,
    uptime: process.uptime(),
    memory: process.memoryUsage()
  }))

  // ─── Static Assets ────────────────────────────────────
  .get('/assets/*', ({ params }) => {
    const file = Bun.file(join(DIST, 'assets', params['*']));
    return new Response(file);
  })

  // ─── SPA Fallback ─────────────────────────────────────
  .get('*', () => {
    return new Response(Bun.file(join(DIST, 'index.html')), {
      headers: { 'Content-Type': 'text/html' }
    });
  })

  .listen({ port: PORT, hostname: HOST });

console.log(`\n  🚀 Server running at http://${HOST}:${PORT}`);
console.log(`  📡 WebSocket: ws://${HOST}:${PORT}/ws`);
console.log(`  🔧 API:       http://${HOST}:${PORT}/api/health\n`);

export type App = typeof app;
