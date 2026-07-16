# Chroma Garcia Artist Group — Public Site (Phase 1)

This is the **public-facing** half of the site described in
`chroma-garcia-artist-group-plan.md`. It's a working Next.js app with all
seven public pages built, styled, and wired to mock data — no database or
admin dashboard yet (that's phase 2).

## What's here

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 (CSS-only config,
  matching your portfolio setup)
- Self-hosted fonts via `@fontsource` (Fraunces, Work Sans, IBM Plex Mono) —
  no calls to Google Fonts, works offline/behind restricted networks
- All 7 public pages, fully responsive:
  - `/` — Home
  - `/artists` and `/artists/[slug]`
  - `/gallery` — client-side search + filter by artist/medium/category
  - `/outreach` and `/outreach/[slug]`
  - `/events` and `/events/[slug]`
  - `/about`
  - `/contact` — form is wired to POST `/api/contact`, which doesn't exist
    yet (that's the next build step)
- Mock data in `src/lib/data.ts`, shaped to match the Mongoose schemas in
  the plan doc — swapping this for real DB calls later is a drop-in
  replacement, not a rewrite
- Placeholder artwork: since there's no real artwork or Cloudinary hookup
  yet, each piece renders as a deterministic generated abstract "painting"
  (`src/components/AbstractArt.tsx`), seeded by artwork ID so it's stable
  across reloads. Swap this for a Cloudinary `<Image>` once real art exists.

## Design direction

Palette: warm gesso (`#F3EEE3`) and ink (`#211D1A`) with four rotating
pigment accents — coral, ochre, teal, violet — used as a shared "swatch"
system across artist tags, event categories, and the palette-dot mark in
the nav/footer. This ties directly to the "Chroma" name instead of leaning
on a single accent color.

Type: Fraunces (display serif) + Work Sans (body) + IBM Plex Mono (uppercase
labels/metadata, styled like museum wall-label captions under each artwork).

Tokens live in `src/app/globals.css` if you want to adjust colors or type.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Next steps (not built yet)

1. **MongoDB models + API routes** — replace `src/lib/data.ts` reads with
   real Mongoose queries (schemas already sketched in the plan doc)
2. **Cloudinary** — swap `AbstractArt` placeholders for real uploaded images
3. **`/api/contact`** — wire the contact form to an email service (Resend
   recommended) so it actually sends
4. **Auth.js** — needed before building the Admin Dashboard
5. **Admin Dashboard** (`/admin/*`) — CRUD UI for artists, artworks,
   outreach posts, events, announcements
