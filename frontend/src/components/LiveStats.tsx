import { createSignal, onCleanup, onMount } from 'solid-js';
import type { ServerStats } from '../App';

interface LiveStatsProps {
  stats: ServerStats;
  connected: boolean;
}

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const parts: string[] = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function LiveStats(props: LiveStatsProps) {
  const [time, setTime] = createSignal(new Date().toLocaleTimeString());
  let timer: ReturnType<typeof setInterval>;

  onMount(() => {
    timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    onCleanup(() => clearInterval(timer));
  });

  const statCards = [
    {
      label: 'Server Uptime',
      value: formatUptime(props.stats.uptime),
      color: 'text-brand-cyan',
    },
    {
      label: 'WebSocket Clients',
      value: String(props.stats.connections),
      color: 'text-brand-green',
    },
    {
      label: 'Total Requests',
      value: props.stats.requests.toLocaleString(),
      color: 'text-brand-purple',
    },
    {
      label: 'Server Memory',
      value: props.stats.memory ? formatBytes(props.stats.memory.heapUsed) : '—',
      color: 'text-brand-amber',
    },
    {
      label: 'Local Time',
      value: time(),
      color: 'text-text-secondary',
    },
    {
      label: 'Status',
      value: props.connected ? 'Connected' : 'Reconnecting...',
      color: props.connected ? 'text-brand-green' : 'text-brand-amber',
    },
  ];

  return (
    <section id="live-stats" class="max-w-6xl mx-auto px-6 py-20">
      <div class="glass rounded-2xl p-8 md:p-12">
        <div class="flex items-center gap-3 mb-8">
          <div
            class="w-3 h-3 rounded-full animate-pulse-glow"
            classList={{
              'bg-brand-green': props.connected,
              'bg-brand-amber': !props.connected,
            }}
          />
          <h2 class="text-2xl font-bold">Live Server Stats</h2>
          <span class="text-xs text-text-dim font-mono bg-brand-border/30 px-2 py-0.5 rounded">
            ws://localhost:3020/ws
          </span>
        </div>

        <p class="text-text-secondary mb-8">
          Real-time metrics streamed via WebSocket from the Elysia backend.
          Open another browser tab and watch the connection count update live.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((stat) => (
            <div class="glass rounded-xl p-4 text-center hover:border-brand-cyan/30 transition-all duration-300">
              <div class={`text-2xl font-bold font-mono mb-1 ${stat.color}`}>
                {stat.value}
              </div>
              <div class="text-xs text-text-dim uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
