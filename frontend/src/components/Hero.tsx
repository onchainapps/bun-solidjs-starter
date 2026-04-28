export default function Hero() {
  return (
    <section class="relative overflow-hidden">
      {/* Background grid */}
      <div
        class="absolute inset-0 opacity-[0.03]"
        style={{
          'background-image':
            'linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)',
          'background-size': '60px 60px',
        }}
      />

      <div class="max-w-6xl mx-auto px-6 py-24 md:py-32 relative">
        <div class="max-w-3xl animate-slide-up">
          {/* Badge */}
          <div class="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm mb-8">
            <span class="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span class="text-text-secondary">Bun · Elysia · SolidJS · Tailwind · PM2</span>
          </div>

          <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Build <span class="gradient-text">beautiful</span> web apps
            <br />
            at <span class="gradient-text">Bun speed</span>
          </h1>

          <p class="text-lg md:text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed">
            A production-ready full-stack starter. Elysia backend, SolidJS frontend,
            WebSocket live reload, Tailwind styling, and PM2 deployment — all in TypeScript.
            Clone and start building in 30 seconds.
          </p>

          <div class="flex flex-wrap gap-4">
            <button
              class="btn-primary"
              onClick={() => {
                const el = document.getElementById('live-stats');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See Live Stats
            </button>
            <button
              class="btn-ghost"
              onClick={() => window.open('/api/health', '_blank')}
            >
              API Health →
            </button>
          </div>

          {/* Code snippet */}
          <div class="mt-12 glass rounded-xl p-5 font-mono text-sm overflow-x-auto max-w-xl">
            <div class="text-text-dim mb-1"># Clone and run</div>
            <div class="text-brand-green">$</div>
            <span class="text-text-primary"> git clone &lt;url&gt; my-project</span>
            <br />
            <div class="text-brand-green">$</div>
            <span class="text-text-primary"> cd my-project && bun run setup</span>
            <br />
            <div class="text-brand-green">$</div>
            <span class="text-text-primary"> bun run dev</span>
            <br />
            <div class="text-text-dim mt-3">→ http://localhost:3020</div>
          </div>
        </div>
      </div>
    </section>
  );
}
