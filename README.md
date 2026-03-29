# Connect+ (Phase 1 Scaffold)

Professional networking platform scaffold built for Next.js App Router + Prisma.

## Quick Start

1. Install Node.js 20+.
2. Start PostgreSQL (Docker):
   - `npm run db:up`
3. Install dependencies:
   - `npm install`
4. Copy environment template:
   - `copy .env.example .env`
5. Generate Prisma client:
   - `npm run prisma:generate`
6. Run migrations:
   - `npm run prisma:migrate`
7. Start development server:
   - `npm run dev`
8. Check API health:
   - `http://localhost:3000/api/health`

## Generated Structure

```text
connect+/
  app/
    api/health/route.ts
    globals.css
    layout.tsx
    page.tsx
    jobs/page.tsx
    network/page.tsx
    profile/[username]/page.tsx
  components/
    layout/top-nav.tsx
    ui/button.tsx
    ui/input.tsx
  lib/
    utils.ts
  prisma/
    schema.prisma
  docker-compose.yml
  types/
  components.json
  next-env.d.ts
  postcss.config.js
  tailwind.config.ts
  tsconfig.json
```
