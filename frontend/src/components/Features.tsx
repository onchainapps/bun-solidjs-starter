const features = [
  {
    icon: '⚡',
    title: 'Bun Runtime',
    desc: 'Blazing fast JavaScript runtime. Native TypeScript, bundler, test runner — all in one.',
  },
  {
    icon: '🔌',
    title: 'Elysia Backend',
    desc: 'Type-safe HTTP framework with built-in WebSocket support. Routes, validation, streaming.',
  },
  {
    icon: '🎨',
    title: 'SolidJS Frontend',
    desc: 'Fine-grained reactivity without a virtual DOM. Fast, small, and truly reactive components.',
  },
  {
    icon: '💎',
    title: 'Tailwind CSS',
    desc: 'Utility-first styling with a custom design system. Glass panels, gradients, animations.',
  },
  {
    icon: '🔒',
    title: 'TypeScript End-to-End',
    desc: 'Full type safety from database to UI. Shared types, strict mode, zero `any`.',
  },
  {
    icon: '🚀',
    title: 'PM2 Deploy Ready',
    desc: 'Ecosystem config included. One command to production with auto-restart and log management.',
  },
];

export default function Features() {
  return (
    <section class="max-w-6xl mx-auto px-6 py-20">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Everything you need,{' '}
          <span class="gradient-text">nothing you don't</span>
        </h2>
        <p class="text-text-secondary text-lg max-w-xl mx-auto">
          A carefully curated stack that's fast, modern, and boringly reliable.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div class="glass glass-hover rounded-xl p-6 group animate-fade-in">
            <div class="text-2xl mb-4">{f.icon}</div>
            <h3 class="font-semibold text-lg mb-2 group-hover:text-brand-cyan transition-colors">
              {f.title}
            </h3>
            <p class="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
