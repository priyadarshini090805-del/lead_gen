# Hanexis — AI Lead Generation Suite

AI-driven social media lead generation system. Built per the developer plan: Next.js + NestJS + Prisma + Postgres + Redis + OpenAI, with full LinkedIn and Instagram integration scaffolding.

## Stack

| Layer | Tech |
|------|------|
| Frontend | Next.js 14 (App Router), Tailwind CSS, Zustand, Framer Motion, Recharts |
| Backend | NestJS 10, Prisma 5, PostgreSQL 16, Redis 7, BullMQ |
| Auth | JWT + OAuth 2.0 (Google, LinkedIn) |
| AI | OpenAI SDK (configurable model) |
| DevOps | Docker + docker-compose, GitHub Actions CI/CD |

## Architecture

```
hanexis-lead-gen/
├── apps/
│   ├── web/          Next.js 14 frontend (glassmorphism UI, animations)
│   └── api/          NestJS backend (9 modules)
├── packages/
│   └── shared/       Shared TypeScript types
├── docker-compose.yml
├── .github/workflows/ci.yml
└── .env.example
```

## Modules (per the developer plan)

| # | Module | Path |
|---|--------|------|
| 1 | Auth & User Management | `apps/api/src/modules/auth`, `users` |
| 2 | Lead Management | `apps/api/src/modules/leads` |
| 3 | AI Personalization Engine | `apps/api/src/modules/ai` |
| 4 | Outreach Workflow Engine | `apps/api/src/modules/outreach` |
| 5 | Content Creation | `apps/api/src/modules/content` |
| 6 | Content Scheduling | `apps/api/src/modules/scheduling` |
| 7 | Conversation Assistant | `apps/api/src/modules/conversations` |
| 8 | Integration Layer | `apps/api/src/modules/integrations` |
| 9 | CRM & Analytics | `apps/api/src/modules/analytics` |

## Frontend pages

| Route | Purpose |
|-------|---------|
| `/` | Marketing landing |
| `/dashboard` | KPIs, charts, activity feed |
| `/dashboard/leads` | Lead table with filters, status, scoring |
| `/dashboard/ai` | AI message generator (Studio) |
| `/dashboard/outreach` | Approval queue, scheduled, sent |
| `/dashboard/content` | Content creator (post / poster / video / job) |
| `/dashboard/scheduling` | Monthly calendar view |
| `/dashboard/conversations` | Inbox with AI reply suggestions |
| `/dashboard/integrations` | LinkedIn / Instagram connectors |
| `/dashboard/analytics` | Conversion analytics |
| `/dashboard/settings` | Profile, security, billing |

## UI & animations

- **Palette**: white/grey base with amber accent. All surfaces use the `.glass` and `.glass-strong` utilities (backdrop blur + saturation).
- **Page transitions**: blur + fade + slide on route change (`components/layout/page-transition.tsx`).
- **Micro-interactions**: hover lift, tap scale, animated active indicators (Framer Motion `layoutId`).
- **Loading**: shimmer skeletons, animated spinners.
- **Charts**: Recharts area/bar/pie/radial with built-in animation; numbers count up via `AnimatedCounter`.
- **Ambient backdrop**: radial gradient orbs behind frosted-glass panels.

## Getting started

### 1. Install

```bash
npm install --legacy-peer-deps
cp .env.example .env
```

### 2. Boot infrastructure

```bash
npm run docker:up        # postgres + redis
```

### 3. Run migrations & seed

```bash
npm run db:migrate
npm run db:seed
```

Seed user: `admin@hanexis.com` / `Password123!`

### 4. Develop

In two terminals:

```bash
npm run dev:api          # http://localhost:4000/api, Swagger at /api/docs
npm run dev:web          # http://localhost:3000
```

Or run everything in Docker:

```bash
docker-compose up --build
```

## API surface (sample)

| Method | Path | Purpose |
|-------|------|---------|
| POST | `/api/auth/register` | Email signup |
| POST | `/api/auth/login` | Email login (returns JWT) |
| GET | `/api/auth/google` | Google OAuth |
| GET | `/api/auth/linkedin` | LinkedIn OAuth |
| GET | `/api/leads` | List leads (paginated, filterable) |
| POST | `/api/leads` | Create lead |
| POST | `/api/leads/import` | Bulk import |
| POST | `/api/ai/generate-message` | AI connection / follow-up / pitch |
| POST | `/api/ai/generate-content` | AI post / poster / video script |
| POST | `/api/ai/suggest-reply` | Suggest reply for a conversation |
| GET | `/api/outreach/history` | Past messages |
| POST | `/api/outreach/send` | Send / schedule a message |
| GET | `/api/scheduling/calendar` | Calendar view |
| GET | `/api/analytics/kpis` | Dashboard KPIs |
| GET | `/api/analytics/funnel` | Pipeline funnel |
| GET | `/api/analytics/timeseries` | 30-day series |

Full schema at `/api/docs` (Swagger UI).

## Queues

BullMQ on Redis. See `src/common/queue/queue.service.ts`. Queues:

- `outreach` — sends approved messages, processed by `OutreachProcessor`
- `content` — publishes scheduled content
- `notifications` — fan-out notifications

`SchedulingService` has a `@Cron` job that sweeps overdue items every 5 minutes.

## Database

PostgreSQL via Prisma. Tables match the developer plan:

`users`, `leads`, `campaigns`, `messages`, `content`, `conversations`, `conversation_turns`, `activities`, `integrations`

Schema lives at `apps/api/prisma/schema.prisma`.

## Security

- JWT with refresh tokens
- Argon2 password hashing
- Helmet middleware
- Global rate limiting (Throttler)
- CORS allowlist
- OAuth 2.0 via Passport strategies

## Testing

```bash
npm test                 # Jest in apps/api
npm run test:e2e -w apps/api
```

## Deployment

CI in `.github/workflows/ci.yml`: lint → type-check → test → build → Docker build (on `main`).

To deploy:

1. Push images to your registry
2. Apply migrations: `npx prisma migrate deploy`
3. Run `web` and `api` containers behind a load balancer
4. Point `NEXT_PUBLIC_API_URL` at your API domain

## Sprint plan reference

| Sprint | Status | Module |
|--------|--------|--------|
| 1–2 | Scaffolded | Auth + DB schema |
| 3–4 | Scaffolded | Lead management |
| 5–6 | Scaffolded | AI integration |
| 7–8 | Scaffolded | Outreach + scheduler |
| 9–10 | Scaffolded | Content + scheduling |
| 11–12 | Scaffolded | Integrations + analytics |

The scaffolding is real but the LinkedIn/Instagram integrations are stubbed (they log + simulate) — wire them up against the real APIs once your apps are approved by the platforms.

## License

MIT
