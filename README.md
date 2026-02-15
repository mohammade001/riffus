# Riffus

Riffus is a cafe music app where:
- Customers search and request songs.
- Cafe owners manage the queue and control what is playing.

This repository is a Next.js monolith:
- Frontend pages and backend APIs are in one app.
- MongoDB is used for persistent data.
- Deezer and iTunes are used as external search providers.

## Tech Stack
- Next.js App Router
- TypeScript
- MongoDB + Mongoose
- Tailwind CSS v4 (PostCSS plugin)
- Framer Motion
- Zod

## Monolith Architecture
- `app/` contains pages and API route handlers.
- `src/modules/` contains domain logic (songs, orders, users).
- `src/lib/` contains shared infrastructure (db, env, http, providers).
- `models/` contains Mongoose schemas/models.
- Route handlers call services.
- Services call repositories/providers.
- UI components never access MongoDB directly.

## Project Structure
- `app/(customer)/page.tsx`: customer app page.
- `app/(owner)/owner/page.tsx`: owner dashboard page.
- `app/api/**/route.ts`: server API routes.
- `src/components/customer-app.tsx`: customer UI.
- `src/components/owner-dashboard.tsx`: owner UI.
- `src/modules/songs/*`: song DTOs, repository, service.
- `src/modules/orders/*`: order DTOs, repository, service.
- `src/modules/users/*`: user DTOs and service.
- `src/lib/db.ts`: Mongoose connection singleton.
- `src/lib/env.ts`: environment parsing/validation.
- `src/lib/providers/*`: Deezer and iTunes adapters.
- `middleware.ts`: simple role cookie/query guard for owner route.

## Getting Started
1. Install dependencies:
   - `npm install`
2. Create `.env` from `.env.example`.
3. Set at least:
   - `MONGO_URI`
4. Start development server:
   - `npm run dev`
5. Open:
   - Customer app: `http://localhost:3000`
   - Owner dashboard: `http://localhost:3000/owner?role=owner`

## Environment Variables
- `MONGO_URI`: MongoDB connection string.
- `DEEZER_API_URL`: defaults to `https://api.deezer.com`.
- `ITUNES_API_URL`: defaults to `https://itunes.apple.com`.

Example file: `.env.example`.

## Scripts
- `npm run dev`: start local development server.
- `npm run build`: production build.
- `npm run start`: run production server.
- `npm run typecheck`: TypeScript validation.
- `npm run lint`: Next.js lint.

## API Contract
All API routes return JSON with this envelope:
- Success: `{ "success": true, "data": ... }`
- Failure: `{ "success": false, "message": "...", "details"?: ... }`

### Song APIs
- `GET /api/songs/recent?limit=10`
- `GET /api/songs/recommended?limit=10`
- `GET /api/songs/search?q=one&limit=25`
- `POST /api/songs/:id/play`

### Order APIs
- `GET /api/orders?status=queued|playing|completed`
- `POST /api/orders`
- Body: `{ "userId": "...", "songId": "..." }`
- `PATCH /api/orders/:id/status`
- Body: `{ "status": "queued" | "playing" | "completed" }`
- `POST /api/orders/reorder`
- Body: `{ "orderedIds": ["id1", "id2"] }`

### User API
- `GET /api/users/demo?role=customer|owner`

## Data Model Summary
### Song
- Core: `title`, `artist`, `album`, `coverImage`, `previewUrl`
- Analytics: `playCount`, `lastPlayed`
- Source: `source` (`local|deezer|itunes`), optional provider IDs

### Order
- Relations: `user`, `song`
- Queue state: `status` (`queued|playing|completed`)
- Positioning: `queuePosition`

### User
- Profile: `name`, `membershipType`, `avatar`
- Access role: `role` (`customer|owner`)

## Role Handling
- Owner route requires role intent via query or cookie.
- Open owner UI with `?role=owner`.
- Middleware stores role in cookie for subsequent requests.

## Reliability Notes
- If MongoDB is unavailable, non-critical endpoints degrade gracefully:
- Demo user can fallback to a temporary in-memory shape.
- Song recent/recommended may return empty lists.
- Search can still return external provider results when possible.
- Order creation and queue updates still require a working MongoDB connection.

## Troubleshooting
- Symptom: API `500` on most endpoints.
- Common cause: invalid or unreachable `MONGO_URI`.
- Check DNS/network access for Mongo host.
- Validate with a local Mongo instance to isolate cloud connectivity.

- Symptom: Tailwind utilities not working.
- Ensure `postcss.config.mjs` contains `@tailwindcss/postcss`.
- Ensure `app/globals.css` includes `@import "tailwindcss";`.

## Legacy Folders
- `frontend/` and `backend/` exist as legacy migration artifacts.
- Active runtime is the root Next.js app.
- New features should be added only to monolith paths.

## Documentation for AI Agents
- See `AGENTS.md` for agent-focused repository rules, contracts, and edit workflow.
