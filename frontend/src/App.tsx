import { createSignal, onCleanup, onMount } from 'solid-js';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import LiveStats from './components/LiveStats';
import Footer from './components/Footer';

export interface ServerStats {
  connections: number;
  requests: number;
  uptime: number;
  memory?: { rss: number; heapTotal: number; heapUsed: number };
}

export default function App() {
  const [connected, setConnected] = createSignal(false);
  const [stats, setStats] = createSignal<ServerStats>({
    connections: 0, requests: 0, uptime: 0
  });

  let ws: WebSocket | null = null;

  function connect() {
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    ws = new WebSocket(`${proto}//${location.host}/ws`);

    ws.onopen = () => setConnected(true);
    ws.onclose = () => {
      setConnected(false);
      setTimeout(connect, 3000); // reconnect
    };
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.stats) setStats(msg.stats);
        if (msg.type === 'connected' && msg.stats) setStats(msg.stats);
      } catch {}
    };
  }

  onMount(() => {
    connect();
    // heartbeat
    const interval = setInterval(() => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000);

    onCleanup(() => {
      clearInterval(interval);
      ws?.close();
    });
  });

  return (
    <div class="min-h-screen flex flex-col">
      <Navbar connected={connected()} />
      <main class="flex-1">
        <Hero />
        <Features />
        <LiveStats stats={stats()} connected={connected()} />
      </main>
      <Footer stats={stats()} />
    </div>
  );
}
