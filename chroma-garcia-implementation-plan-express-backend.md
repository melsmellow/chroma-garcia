# Chroma Garcia Artist Group — Implementation Plan (Decoupled Architecture)

This replaces the "Next.js full-stack" architecture from the previous plan
with a **separate Node.js + Express API** talking to MongoDB, and a
Next.js app that's frontend-only (no API routes, no direct DB access).
The design system, page list, and Mongoose data shapes are unchanged —
only *where* the data layer lives and *how* the frontend gets to it.

## 1. Why this changes, concretely

| | Next.js full-stack (previous plan) | Decoupled (this plan) |
|---|---|---|
| Data access | `src/app/api/*` route handlers, Mongoose called directly | Next.js never touches MongoDB — it calls a REST API |
| Auth | Auth.js inside Next.js | Express issues/verifies JWTs; Next.js just attaches the token |
| Hosting | One Vercel deployment | Two deployments: Next.js (Vercel) + Express (Railway/Render/Fly — needs a long-running Node process, not serverless functions) |
| Admin dashboard | Server Actions / route handlers | Next.js admin UI calls the Express API like any other client |
| Reuse | Tied to Next.js | The same API can later serve a mobile app, and the two run/scale/deploy independently |

---

## 2. Two Projects

```
chroma-garcia-web/      → Next.js 16 (App Router) — frontend only, already built
chroma-garcia-api/      → Node.js + Express + Mongoose — new
```

They are separate repos/deployments. The frontend never imports Mongoose
or connects to MongoDB — it only calls `chroma-garcia-api` over HTTP.

---

## 3. Tech Stack (updated)

| Layer | Choice | Notes |
|---|---|---|
| Frontend framework | Next.js 16 (App Router) | Same as before — Home, Artists, Gallery, Outreach, Events, About, Contact, Admin UI |
| Backend framework | **Node.js + Express** | New — REST API, its own `package.json`/deploy |
| Database | MongoDB + Mongoose | Schemas now live in `chroma-garcia-api`, not the frontend |
| Auth | **JWT**, issued by Express | httpOnly cookie (`Set-Cookie` from the API) so Next.js doesn't have to manage tokens manually |
| Validation | Zod (or Joi) — **on the Express side now**, since that's where mutations happen | Frontend forms can still do light client-side validation, but the API is the source of truth |
| Media | Cloudinary | Signed-upload signature generation moves to an Express endpoint (`POST /api/uploads/sign`) |
| Email | Resend or Nodemailer | Called from Express's `POST /api/contact`, not a Next.js route |
| CORS | `cors` npm package on Express | Required now — frontend and backend are different origins |
| Frontend↔backend contract | Plain REST + JSON | GraphQL is an option but adds complexity not justified at this scale |

---

## 4. `chroma-garcia-api` — Folder Structure

```
/src
  /config
    db.ts               → Mongoose connection (connect once, reused across requests)
    env.ts               → Validates required env vars on boot (fail fast)
  /models
    Artist.ts
    Artwork.ts
    OutreachPost.ts
    Event.ts
    Officer.ts
    Announcement.ts
    User.ts
    ContactSubmission.ts
  /routes
    artists.routes.ts
    artworks.routes.ts
    outreach.routes.ts
    events.routes.ts
    officers.routes.ts
    contact.routes.ts
    auth.routes.ts
    uploads.routes.ts
    admin/                → mounted behind `requireAuth` + `requireRole("admin")`
      artists.admin.routes.ts
      artworks.admin.routes.ts
      outreach.admin.routes.ts
      events.admin.routes.ts
      announcements.admin.routes.ts
  /controllers
    artists.controller.ts
    artworks.controller.ts
    ... (one per resource, matches routes)
  /middleware
    requireAuth.ts        → verifies JWT from cookie, attaches req.user
    requireRole.ts
    errorHandler.ts        → centralized error → JSON response
    validate.ts             → wraps Zod schemas around req.body
  /lib
    jwt.ts                  → sign/verify helpers
    cloudinary.ts
    email.ts
  server.ts                  → Express app setup, CORS, JSON body parsing, mounts routes
  index.ts                    → connects DB, starts server.listen()
.env.example
```

---

## 5. `chroma-garcia-web` — What Changes

The pages, components, and design system already built stay as-is. What
changes is **only the data layer**:

```
/src
  /lib
    api.ts     → NEW: fetch wrapper + one function per resource
                 (getArtists(), getArtist(slug), getArtworks(filters),
                 getOutreachPosts(), getEvent(slug), submitContact(data), ...)
    data.ts    → DELETED once every page is migrated off mock data
```

`src/lib/api.ts` becomes the single place that knows the API's base URL
and shape — pages import from here instead of `data.ts`, so every page
component (`page.tsx`, `gallery-client.tsx`, etc.) needs only an import
swap, not a rewrite:

```ts
// before
import { getArtist } from "@/lib/data";

// after
import { getArtist } from "@/lib/api";
```

`getArtist()` etc. keep the same function signatures and return shapes —
they just do a `fetch()` against `process.env.NEXT_PUBLIC_API_URL` instead
of reading the in-memory array. Use Next.js's `fetch` caching
(`next: { revalidate: 60 }` or tag-based `next: { tags: ["artists"] }`) so
pages stay fast without needing to reinvent caching.

The Contact form (`contact-form.tsx`) already POSTs to a `/api/contact`
path — that becomes `` `${process.env.NEXT_PUBLIC_API_URL}/contact` ``,
no other change needed.

---

## 6. Data Model — unchanged, just relocated

The Mongoose schemas are identical to what was planned before; they now
live in `chroma-garcia-api/src/models/` instead of a Next.js `src/models/`
folder. Shape (from the current mock data in `data.ts`, which maps
directly onto these):

```ts
Artist {
  slug (unique, indexed), name, artStyle, medium, bio, palette,
  social: { instagram?, facebook?, website? },
  portraitUrl?  // Cloudinary URL after upload + bg-removal step
}

Artwork {
  slug (unique, indexed), title, artist: ObjectId ref Artist,
  imageUrl, medium, category, tags[], description,
  year, dimensions, palette,
  status: "Available" | "Reserved" | "Sold" | "Not for Sale",
  price?, currency?, isFeatured?, timestamps: true
}

OutreachPost {
  slug (unique, indexed), title,
  type: "Outreach" | "Workshop" | "Exhibition" | "Donation" | "Community",
  date, excerpt, body, palette, author: ObjectId ref User
}

Event {
  slug (unique, indexed), title, date, time, location, description,
  status: "Upcoming" | "Past", palette
}

Officer { name, role, photoUrl, order, palette }
Announcement { title, body, isFeatured, timestamps: true }
User { name, email (unique), passwordHash, role: "admin" | "officer" }
ContactSubmission { name, email, message, submittedAt }
```

Note: `artistSlug` (a plain string on `Artwork` in the current mock data)
becomes `artist: ObjectId ref Artist` in real Mongoose — keep `slug` on
`Artist` as a unique indexed field so the frontend can still route by slug,
but populate/join via the ref for actual queries.

---

## 7. REST API — Route List

```
GET    /api/artists
GET    /api/artists/:slug
GET    /api/artworks              (?artist=&medium=&category=&status=&q=)
GET    /api/artworks/:slug
GET    /api/outreach
GET    /api/outreach/:slug
GET    /api/events                (?status=upcoming|past)
GET    /api/events/:slug
GET    /api/officers
GET    /api/partners
POST   /api/contact

POST   /api/auth/login             → sets httpOnly JWT cookie
POST   /api/auth/logout
GET    /api/auth/me                → current user, for the admin UI to check session

POST   /api/uploads/sign            → returns a signed Cloudinary upload payload

# Admin-only (requireAuth + requireRole("admin"))
POST   /api/admin/artists
PATCH  /api/admin/artists/:id
DELETE /api/admin/artists/:id
POST   /api/admin/artworks
PATCH  /api/admin/artworks/:id
DELETE /api/admin/artworks/:id
POST   /api/admin/outreach
PATCH  /api/admin/outreach/:id
DELETE /api/admin/outreach/:id
POST   /api/admin/events
PATCH  /api/admin/events/:id
DELETE /api/admin/events/:id
POST   /api/admin/announcements
PATCH  /api/admin/announcements/:id
DELETE /api/admin/announcements/:id
```

Public `GET` routes stay unauthenticated. Everything under `/api/admin/*`
requires a valid session.

---

## 8. Auth Flow (Express-issued JWT, cross-origin)

1. Admin logs in via a Next.js form → `POST` to
   `${NEXT_PUBLIC_API_URL}/auth/login` with `credentials: "include"`
2. Express verifies the password, signs a JWT, sets it as an **httpOnly,
   `SameSite=None; Secure`** cookie (required for cross-origin cookies in
   production)
3. Every subsequent request from the Next.js admin UI includes
   `credentials: "include"` so the cookie is sent automatically
4. Express's `requireAuth` middleware verifies the JWT on protected routes
5. Next.js middleware can optionally call `GET /api/auth/me` to gate
   `/admin/*` pages before render, redirecting to `/admin/login` if it 401s

This replaces the Auth.js-in-Next.js plan — Auth.js is designed around
Next.js owning the session, which doesn't fit once the API is a separate
origin.

---

## 9. CORS & Environment Variables

**Express (`chroma-garcia-api`)**
```
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
CORS_ORIGIN=https://chromagarcia.art   (the deployed Next.js origin)
```

**Next.js (`chroma-garcia-web`)**
```
NEXT_PUBLIC_API_URL=https://api.chromagarcia.art/api
```

Express's `cors` middleware should allow only `CORS_ORIGIN`, with
`credentials: true` (required for the auth cookie to be sent/received
cross-origin).

---

## 10. Deployment

| Service | Where | Why |
|---|---|---|
| `chroma-garcia-web` | Vercel | Unchanged — still the best fit for Next.js |
| `chroma-garcia-api` | Railway, Render, or Fly.io | Express needs a persistent process (or at least a platform that keeps a Node server warm) — not a fit for Vercel's serverless functions at this scale/shape |
| MongoDB | Atlas | Unchanged |
| Cloudinary | Cloudinary | Unchanged |

---

## 11. Phased Build Order

### Phase A — API skeleton
- [ ] `npm init` new Express + TypeScript project, `chroma-garcia-api`
- [ ] Mongoose connection (`config/db.ts`), MongoDB Atlas cluster
- [ ] Define all models per Section 6
- [ ] `errorHandler` middleware, basic `server.ts` with `cors`, `express.json()`
- [ ] Seed script to load the current mock data (`data.ts` content) into MongoDB, so the frontend has real data to point at immediately

### Phase B — Public read endpoints
- [ ] All `GET` routes from Section 7
- [ ] Deploy `chroma-garcia-api` (Railway/Render), confirm it's reachable

### Phase C — Frontend cutover
- [ ] Build `src/lib/api.ts` in `chroma-garcia-web`
- [ ] Swap each page's `data.ts` import for `api.ts`, one page at a time (Gallery and Artists first — most data-heavy)
- [ ] Delete `data.ts` once nothing imports it

### Phase D — Auth + Contact
- [ ] `POST /api/contact` (Resend/Nodemailer)
- [ ] `POST /api/auth/login`, `/logout`, `/me`, JWT + cookie plumbing
- [ ] Update `contact-form.tsx`'s fetch target

### Phase E — Uploads + Admin
- [ ] `POST /api/uploads/sign` (Cloudinary signed upload)
- [ ] Admin CRUD routes (Section 7)
- [ ] Admin UI in `chroma-garcia-web` (`/admin/*`), calling the API with `credentials: "include"`

### Phase F — Polish
- [ ] Rate limiting on `/api/contact` and `/api/auth/login` (e.g. `express-rate-limit`)
- [ ] Request logging (`morgan` or `pino`)
- [ ] SEO/OpenGraph on the frontend (unchanged from before)
- [ ] Final deploy + domain wiring for both services

---

## 12. Open Questions (carried over + new)
1. Same as before: artist self-management logins, newsletter signup, e-commerce/checkout flow (now more relevant since `Artwork.status/price` already exist), multi-language.
2. **New**: REST is assumed here — any interest in GraphQL instead, given there'll eventually be a handful of related resources (artist → artworks, outreach → events)? REST is recommended for this scale unless there's a specific reason to add GraphQL's complexity.
3. **New**: should the Admin UI stay inside `chroma-garcia-web` under `/admin`, or become its own third small app? Keeping it inside the existing Next.js app (as planned here) is simpler and avoids a third deployment — worth revisiting only if admin and public traffic need to scale/deploy independently.
