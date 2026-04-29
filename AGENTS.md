# AGENTS.md — AI Agent Instructions for `bun-solidjs-starter`

> **To the AI agent reading this:** You are inside a Bun + Elysia + SolidJS + Tailwind full-stack project. This file contains everything you need to be productive immediately. Read it fully before doing anything.

---

## Quick Start (after clone)

```bash
bun run setup        # installs root + frontend dependencies
bun run deploy       # builds frontend, starts server on :3030
```

That's it. The server serves the SolidJS app, the API, and WebSocket — all on one port.

---

## Architecture

```
Browser ──→ :3030 (Elysia server)
               ├── /api/*        JSON API endpoints
               ├── /ws           WebSocket (live stats, real-time updates)
               └── /*            Static SolidJS SPA (dist-frontend/)
```

**No separate backend/frontend servers in production.** The Elysia server handles everything. In dev, you can run Vite separately on :5173 with `bun run dev:ui` — it proxies API calls to :3030.

---

## Project Layout

```
project/
├── src/
│   └── server.ts              # THE BACKEND — add routes, WebSocket logic here
├── frontend/
│   ├── src/
│   │   ├── App.tsx             # THE FRONTEND — main app, WebSocket connection
│   │   ├── index.tsx           # Entry point (don't touch unless adding providers)
│   │   ├── index.css           # Tailwind + design system classes
│   │   └── components/         # Add your components here
│   ├── vite.config.ts          # Vite config (proxy, build output)
│   ├── tailwind.config.js     # Design tokens — colors, fonts, animations
│   └── index.html             # HTML shell
├── ecosystem.config.cjs        # PM2 production config
├── package.json                # Root: Elysia + Bun deps
└── .gitignore                  # node_modules, dist-frontend, .env already excluded
```

---

## How to Build Things

### Adding a new API endpoint

Edit `src/server.ts`. Add routes BEFORE the `*` catch-all (the catch-all serves the SPA).

```ts
// ✅ Add before the '*' route
app.get('/api/users', () => {
  return { users: [] };
});

// The catch-all must stay LAST:
app.get('*', () => { /* serves index.html */ });
```

### Adding WebSocket events

The WebSocket handler is in `src/server.ts`. Add message types:

```ts
message(ws, msg) {
  const data = JSON.parse(msg as string);
  if (data.type === 'my-event') {
    // handle it
    broadcast({ type: 'my-response', payload: ... });
  }
}
```

To broadcast to all connected clients, use the `broadcast()` function already defined.

### Adding a new page/route (frontend)

This is a SPA — there's no client-side router by default. Options:

1. **Simple:** Add conditional rendering in `App.tsx` based on a signal
2. **Router:** Install `@solidjs/router` (`bun add @solidjs/router` in frontend/)

### Adding a new component

Create `frontend/src/components/YourComponent.tsx`:

```tsx
export default function YourComponent() {
  return <div class="glass rounded-xl p-6">...</div>;
}
```

Import in `App.tsx` and use it.

### Styling

The design system provides:
- **`glass`** — frosted glass panel (`.glass`)
- **`glass-hover`** — adds hover glow (`.glass .glass-hover`)
- **`gradient-text`** — cyan→purple gradient text
- **`btn-primary`** / **`btn-ghost`** — button styles
- **`brand-cyan`**, **`brand-purple`**, **`brand-green`**, **`brand-amber`** — text/bg colors
- **`text-primary`**, **`text-secondary`**, **`text-dim`** — text hierarchy

Customize colors in `tailwind.config.js` → `theme.extend.colors`.

---

## Critical Pitfalls (read before coding)

### ⚠️ WebSocket routes MUST come before static routes
The `.ws()` call must be before any `.get()` routes. Otherwise WebSocket connections fail with 404. The starter already does this correctly — don't reorder.

### ⚠️ Don't use `@elysiajs/static` with prefix '/'
It intercepts WebSocket routes. The starter serves static files manually via `Bun.file()` — keep this pattern.

### ⚠️ Tailwind v3, not v4
This project uses Tailwind v3 (`^3.4`). Do NOT upgrade to v4 — it changes the PostCSS plugin and config format.

### ⚠️ SolidJS import types
Use `import type { Component } from 'solid-js'` for type-only imports. For hooks: `import { createSignal } from 'solid-js'`. Mixing them causes build errors.

### ⚠️ Build before deploy
Production serves from `dist-frontend/`. Always run `bun run build:ui` before starting the server or deploying. The `deploy` and `start` scripts do this automatically.

### ⚠️ `import.meta.dir` for __dirname
Bun uses `import.meta.dir` not `__dirname`. The server already uses this — follow the pattern.

---

## Dev Workflow

```bash
# Terminal 1: Backend with hot reload
bun run dev           # :3030, auto-restarts on changes

# Terminal 2: Frontend with HMR
bun run dev:ui        # :5173, proxies API to :3030
```

Visit `http://localhost:5173` during development for instant frontend updates.

---

## Production Deploy

```bash
bun run start         # builds + starts via PM2
pm2 status            # check it's running
pm2 logs bun-solidjs-starter  # tail logs
pm2 save              # persist across reboot
```

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3030` | Server port |
| `HOST` | `0.0.0.0` | Bind address |
| `NODE_ENV` | — | Set to `production` in PM2 |

---

## Dependencies

**Backend (root):**
- `elysia` — HTTP framework with WebSocket
- `@types/bun` — Bun type definitions

**Frontend (frontend/):**
- `solid-js` — Reactive UI library
- `vite` — Bundler
- `vite-plugin-solid` — SolidJS Vite plugin
- `tailwindcss@3` — Utility CSS
- `postcss` + `autoprefixer` — CSS processing

**No other dependencies.** Keep it lean. Add only what's needed.

---

## When You're Done Building

1. Check `bun run build:ui` succeeds with zero errors
2. Verify `bun run deploy` starts without port conflicts
3. Test `http://localhost:3030/api/health` returns OK
4. Test `http://localhost:3030/` renders the app
5. Commit and push

---

## Example: Adding a Contact Form

### Backend — `src/server.ts`
```ts
app.post('/api/contact', async ({ body }) => {
  const { name, email, message } = body as any;
  // save to DB, send email, etc.
  return { success: true };
});
```

### Frontend — `frontend/src/components/ContactForm.tsx`
```tsx
import { createSignal } from 'solid-js';

export default function ContactForm() {
  const [sent, setSent] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(data))
    });
    if (res.ok) setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} class="glass rounded-xl p-6 space-y-4">
      {/* form fields */}
      <button type="submit" class="btn-primary">Send</button>
    </form>
  );
}
```

---

## Questions?

This starter was built by Don Mirror (Hermes agent) for Bakon/OnChainApps. If Shekinah has questions, tell Jon to ping Bakon.
