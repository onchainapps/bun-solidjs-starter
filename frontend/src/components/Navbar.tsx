interface NavbarProps {
  connected: boolean;
}

export default function Navbar(props: NavbarProps) {
  return (
    <nav class="glass sticky top-0 z-50 border-b border-brand-border/30">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center font-bold text-brand-bg text-sm">
            B
          </div>
          <span class="font-semibold text-lg">Bun + SolidJS</span>
          <span class="text-xs text-text-dim bg-brand-border/30 px-2 py-0.5 rounded font-mono">
            starter
          </span>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 text-sm text-text-secondary">
            <div
              class="w-2 h-2 rounded-full"
              classList={{
                'bg-brand-green shadow-[0_0_6px_#22c55e]': props.connected,
                'bg-brand-amber': !props.connected,
              }}
            />
            {props.connected ? 'Live' : 'Reconnecting...'}
          </div>
          <a
            href="/api/health"
            target="_blank"
            class="text-sm text-text-dim hover:text-brand-cyan transition-colors font-mono"
          >
            /api/health
          </a>
        </div>
      </div>
    </nav>
  );
}
