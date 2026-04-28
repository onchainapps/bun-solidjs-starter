import type { ServerStats } from '../App';

interface FooterProps {
  stats: ServerStats;
}

export default function Footer(props: FooterProps) {
  return (
    <footer class="border-t border-brand-border/30 mt-auto">
      <div class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-dim">
        <div>
          Built with{' '}
          <a href="https://bun.sh" class="text-brand-cyan hover:underline">Bun</a>
          {' '}·{' '}
          <a href="https://elysiajs.com" class="text-brand-cyan hover:underline">Elysia</a>
          {' '}·{' '}
          <a href="https://solidjs.com" class="text-brand-cyan hover:underline">SolidJS</a>
          {' '}·{' '}
          <a href="https://tailwindcss.com" class="text-brand-cyan hover:underline">Tailwind</a>
        </div>
        <div class="flex items-center gap-6 font-mono">
          <span>Node {Bun.version}</span>
          <span class="text-brand-border">|</span>
          <span>Uptime {Math.floor(props.stats.uptime)}s</span>
        </div>
      </div>
    </footer>
  );
}
