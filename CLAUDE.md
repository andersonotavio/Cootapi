# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Website for **COOTAPI**, a Brazilian agricultural cooperative in Teresina-PI. The UI and domain language are **Portuguese** (notícias, eventos, cooperados, inscrições) — keep user-facing strings and new schema/route names in Portuguese to match. `todo.md` is the feature spec/checklist.

Generated from a **Manus WebDev template**: a single Express process serves both the tRPC API and the Vite-built React SPA. `references/*.md` document the built-in Manus platform integrations (OAuth, file storage, LLM, maps, image generation, voice transcription, owner notifications, data API).

## Commands

Package manager is **pnpm** (`pnpm@10.x`).

- `pnpm dev` — run the dev server (`tsx watch` + Vite middleware, hot reload) on port 3000 (auto-bumps if busy, scanning up to +20).
- `pnpm build` — Vite builds the client, esbuild bundles the server to `dist/`.
- `pnpm start` — run the production build (`NODE_ENV=production`, serves static client).
- `pnpm check` — `tsc --noEmit` typecheck.
- `pnpm format` — Prettier write.
- `pnpm test` — Vitest (`vitest run`). Run one file: `pnpm vitest run server/cootapi.test.ts`. Watch: `pnpm vitest`. Tests live next to source as `*.test.ts` and only run under `server/` (see `vitest.config.ts`).
- `pnpm db:push` — `drizzle-kit generate && drizzle-kit migrate` (MySQL).

## Architecture

End-to-end typesafe stack, no REST hand-written:

- **`drizzle/schema.ts`** — single source of truth for all MySQL tables and inferred `Insert*`/`Select*` types. Migrations in `drizzle/migrations/`.
- **`server/routers.ts`** — the entire tRPC `appRouter` (news, events, documents, informes, memberApplications, contact, gallery, upload, admin). This is where you add API endpoints. `AppRouter` type is imported directly by the client.
- **`client/src/lib/trpc.ts`** — imports `AppRouter` from `server/routers.ts` for full type inference. Client calls via `trpc.<router>.<proc>.useQuery/useMutation`.
- **`server/db.ts`** — lazy Drizzle singleton via `getDb()`. **It returns `null` when `DATABASE_URL` is unset** (so tooling/tests run without a DB); every router handler must null-check `db` and return an empty/error result — follow the existing pattern when adding handlers.
- **`client/src/App.tsx`** — `wouter` routes mapping each page in `client/src/pages/` (Home, QuemSomos, Contrate, Atuacao, Noticias, Inscricao, AreaCooperado, Admin) inside the shared `Layout`.

### Auth & authorization

- Login is **Manus OAuth** (no passwords). Flow: client builds login URL in `client/src/const.ts` → `/api/oauth/callback` (`server/_core/oauth.ts`) exchanges code, upserts the user, sets the `app_session_id` JWT cookie. Context (`server/_core/context.ts`) authenticates every request via `sdk.authenticateRequest` and exposes `ctx.user` (or `null`).
- Three procedure tiers in `server/_core/trpc.ts`: `publicProcedure`, `protectedProcedure` (requires login), and an admin guard. **Note:** `server/routers.ts` defines its own `adminProcedure` (Portuguese error message) layered on `protectedProcedure` — that's the one used by the app; `_core/trpc.ts` also exports an `adminProcedure`. Use the router's local `adminProcedure` for admin-only endpoints.
- Roles are `"user" | "admin"`. The user whose openId matches `OWNER_OPEN_ID` is auto-promoted to `admin` on upsert (`server/db.ts`).

### `_core` directories are template boilerplate

`server/_core/`, `shared/_core/`, and `client/src/_core/` hold the Manus platform runtime (OAuth SDK, storage proxy, env, vite glue, LLM/maps/notification helpers). **Treat these as vendored — avoid editing them** unless specifically changing platform integration. Put application code in `server/routers.ts`, `drizzle/schema.ts`, `client/src/pages|components`, and `shared/`.

### File storage

Uploads go through `server/storage.ts` (`storagePut`/`storageGet`) → Manus Forge presigned S3 URLs, served back via the `/manus-storage/{key}` proxy (`server/_core/storageProxy.ts`). Two upload patterns exist in `routers.ts`: presigned-URL (`getUploadUrl`) and base64 body (`documents.upload`, capped by the 50mb express body limit).

## Conventions

- **Path aliases:** `@/*` → `client/src/*`, `@shared/*` → `shared/*` (also `@assets` in vitest). Shared constants/errors live in `shared/`.
- tRPC uses the **superjson** transformer on both ends (so `Date`/etc. survive the wire) — keep it configured on any new client link.
- UI is **shadcn/ui** (`client/src/components/ui/`, config in `components.json`) + Tailwind v4 + Radix. `pnpm` patches `wouter` (`patches/`) — don't bump it past the patched version without re-checking.
- Prettier: double quotes, semicolons, `arrowParens: avoid`, width 80.

## Environment

Required env vars (`.env`, loaded via dotenv): `DATABASE_URL` (MySQL), `JWT_SECRET`, `OAUTH_SERVER_URL`, `VITE_APP_ID`, `VITE_OAUTH_PORTAL_URL`, `OWNER_OPEN_ID`, `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY`. See `server/_core/env.ts` for the server set and `client/src/const.ts` for the `VITE_*` client set.
