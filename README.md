# Bun + SolidJS Starter

**Production-ready full-stack boilerplate.** Clone and start building in 30 seconds.

```
Bun · Elysia · SolidJS · Tailwind · TypeScript · PM2
```

> **🤖 For AI agents (Shekinah, Claude, etc.):** Read `AGENTS.md` before starting.
> It contains architecture, patterns, pitfalls, and examples tailored for AI coding agents.

## Quick Start

```bash
# 1. Clone
git clone <repo-url> my-project
cd my-project

# 2. Install everything
bun run setup

# 3. Build frontend + start server
bun run deploy
# → http://localhost:3030

# Or dev mode (hot reload for backend + Vite HMR for frontend)
bun run dev        # Backend on :3030
bun run dev:ui     # Frontend on :5173 (proxied to backend)
```

## What You Get

| | |
|---|---|
| **Backend** | Elysia server with WebSocket, static file serving, and API routes |
| **Frontend** | SolidJS + Vite + Tailwind with a polished dark-themed demo page |
| **WebSocket** | Live stats dashboard — open multiple tabs and watch them sync |
| **Styling** | Custom design system: glass panels, gradients, animations, dark theme |
| **TypeScript** | End-to-end type safety, strict mode, no `any` |
| **PM2** | Ecosystem config included — one command to production |
| **Bun** | All-in-one runtime — no Node.js required |

## Project Structure

```
my-project/
├── src/
│   └── server.ts              # Elysia backend (API + WebSocket + static)
├── frontend/
│   ├── src/
│   │   ├── App.tsx             # Main app with WebSocket connection
│   │   ├── index.tsx           # Entry point
│   │   ├── index.css           # Tailwind + custom design system
│   │   └── components/
│   │       ├── Navbar.tsx      # Sticky nav with connection status
│   │       ├── Hero.tsx        # Landing hero with code snippet
│   │       ├── Features.tsx    # Feature cards grid
│   │       ├── LiveStats.tsx   # Real-time server metrics via WebSocket
│   │       └── Footer.tsx      # Tech stack footer
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
├── package.json                # Root: Elysia + Bun deps
├── ecosystem.config.cjs        # PM2 production config
├── tsconfig.json
└── .gitignore
```

## Scripts

| Command | Description |
|---|---|
| `bun run setup` | Install all dependencies (root + frontend) |
| `bun run dev` | Backend in watch mode on :3030 |
| `bun run dev:ui` | Vite dev server on :5173 (proxies API to :3030) |
| `bun run build:ui` | Build frontend to `dist-frontend/` |
| `bun run deploy` | Build frontend + start production server |
| `bun run start` | Build + start via PM2 |
| `bun run stop` | Stop PM2 process |
| `bun run logs` | Tail PM2 logs |

## API

| Endpoint | Description |
|---|---|
| `GET /api/health` | Server health, uptime, connections |
| `GET /api/stats` | Detailed server stats |
| `WS /ws` | Live WebSocket (stats broadcast) |

## Production Deploy

```bash
bun run build:ui          # Build frontend once
pm2 start ecosystem.config.cjs   # Start with PM2
pm2 save                  # Persist across reboots
```

## Design System

The frontend includes a custom Tailwind design system:

- **Colors** — `brand-cyan`, `brand-purple`, `brand-green`, `brand-amber`
- **Glass panels** — `glass` and `glass-hover` classes for frosted glass effect
- **Gradients** — `gradient-text` for cyan→purple text gradients
- **Animations** — `animate-slide-up`, `animate-fade-in`, `animate-pulse-glow`
- **Buttons** — `btn-primary` (gradient) and `btn-ghost` (outline)

Tweak `tailwind.config.js` to match your brand colors.

## Requirements

- [Bun](https://bun.sh) ≥ 1.2
- [PM2](https://pm2.io) (optional, for production)

## License

MIT — use it for anything.
