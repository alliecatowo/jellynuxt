# JellyNuxt 🎬

A clean, fast Nuxt 4 frontend for your [Jellyfin](https://jellyfin.org) media server.

Built with Nuxt 4, `@nuxt/ui`, and Tailwind CSS. API key is handled server-side — never exposed to the browser.

---

## Features

- **Library browser** — shows all your Jellyfin libraries with cover art
- **Movie grid** — browse movies with posters, ratings, and search
- **Server-side API proxy** — your Jellyfin API key stays on the server
- **Dark UI** — minimal, media-forward design

---

## Setup

### Prerequisites

- Node.js 20+
- pnpm 9+
- A running Jellyfin server

### 1. Clone and install

```bash
git clone https://github.com/alliecatowo/jellynuxt.git
cd jellynuxt
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
JELLYFIN_URL=http://your-server:8096
JELLYFIN_API_KEY=your-api-key-here
```

**Getting your API key:**
1. Open Jellyfin Dashboard → **Advanced** → **API Keys**
2. Click **+** to generate a new key
3. Copy it to your `.env`

### 3. Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

### Docker / Self-hosted

```bash
pnpm build
node .output/server/index.mjs
```

With environment variables:

```bash
JELLYFIN_URL=http://your-server:8096 \
JELLYFIN_API_KEY=your-key \
node .output/server/index.mjs
```

### Vercel / Netlify

1. Fork the repo and connect to your hosting provider
2. Add environment variables in the dashboard:
   - `JELLYFIN_URL`
   - `JELLYFIN_API_KEY`
3. Deploy

> ⚠️ **Note:** Your Jellyfin server must be accessible from the hosting provider's servers for the proxy to work. If it's on a local network, consider Cloudflare Tunnel or a VPN.

---

## Project Structure

```
jellynuxt/
├── app.vue                      # Root layout + nav
├── pages/
│   ├── index.vue                # Library browser
│   └── movies.vue               # Movie grid with search
├── server/api/jellyfin/
│   └── [...path].ts             # Server-side proxy to Jellyfin API
├── assets/css/main.css
├── nuxt.config.ts
└── .env.example
```

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Nuxt 4 |
| UI | @nuxt/ui + Tailwind CSS |
| Runtime | Node.js 20 |
| Package manager | pnpm |

---

## License

MIT
