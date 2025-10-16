# Vercel Performance Playground Add-on

This package adds SSG, SSR, ISR, and Edge rendering demo pages to your existing Next.js project (e.g., `nextjs-boilerplate`).

## Instructions

1. Unzip into your Next.js project root.
2. The following directories will be added:
   - `app/ssg`, `app/ssr`, `app/isr`, `app/edge`
   - `lib/fetchData.ts`
   - `components/DataCard.tsx`
   - `app/api/data/route.ts`
   - `middleware.ts`
3. Run your dev server:
   ```bash
   npm run dev
   ```
4. Deploy via Git → Vercel.

You’ll then have live demo routes for each Next.js rendering strategy.
