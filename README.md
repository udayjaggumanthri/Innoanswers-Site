# Innoanswers — Marketing Website

A marketing website for **Innoanswers**, an AI solutions company. Built with Next.js (App Router) + React 19 + TypeScript + Tailwind CSS.

Fully static, zero-runtime API dependencies, editable copy in typed content files, accessible WCAG AA compliance, and responsive down to 320px viewport widths.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Build for static production export
npm run build
```

---

## Sitemap & Route Structure

- `/` — Home (Signature Hero, About Us, Our Services, Industries We Serve, Clients, Testimonials, Closing CTA)
- `/about` — About Us (How We Work 4-step workflow, What We Believe 4 values, Mission, Team)
- `/services` — Services (Outcome Strip, Anchored practice areas: `#technology`, `#business`, `#consulting`, Process Strip, Accessible FAQ)
- `/blogs` — Blog Index (Category filter chips, Featured latest post, Responsive card grid with CSS gradient covers)
- `/blogs/[slug]` — Blog Article (Static params, 68ch reading column, structured block renderer without markdown parser)
- `/contact` — Contact Us (Accessible form with inline error validation, honeypot spam guard, What Happens Next list, Direct channels)
- `not-found` — Accessible 404 handler with return home action
- `sitemap.xml` / `app/sitemap.ts` — Full index of all static routes and blog post slugs
- `robots.txt` / `app/robots.ts` — Crawl permissions for search engines

---

## Design System Tokens

All design tokens are defined as CSS variables in `app/globals.css` and mapped into Tailwind:

- **Background:** `#01061a` (Default body background)
- **Alternate Background:** `#02081f` (Alternating section contrast)
- **Surface (Cards):** `rgba(255, 255, 255, 0.035)`, Hover: `rgba(255, 255, 255, 0.06)`
- **Ink / Headings:** `#ffffff`
- **Nav text:** `rgba(238, 242, 255, 0.9)`, Hover: `#ffffff`
- **Body text:** `rgba(226, 233, 255, 0.74)`
- **Muted text:** `rgba(226, 233, 255, 0.55)`
- **Link:** `rgba(212, 236, 255, 0.77)`
- **Hairlines:** `rgba(255, 255, 255, 0.19)`
- **Border subtle:** `rgba(255, 255, 255, 0.10)`
- **Accent:** `#7fd4ff`
- **Accent ring:** `rgba(120, 200, 255, 0.12)`
- **Button primary:** Background `#ffffff`, text `#0a0a0a`, hover `#e8eef7` with 4px accent ring
- **Focus visible:** 2px solid `#7fd4ff` with 4px offset (3px offset on buttons)
- **Motion:** Single easing curve `cubic-bezier(0.22, 1, 0.36, 1)`. Under `prefers-reduced-motion: reduce`, all animations and transitions are automatically disabled.

---

## Signature Hero (§3 Specification)

The signature hero section in `components/hero/Hero.tsx` and `app/hero.css`:
- Exactly `100dvh` (with `100vh` fallback).
- Dynamic layout scale `--u` computed from `min(100dvh/800, max(100vw/1280, min(100vw/640, 0.75px)))`.
- Background video positioned with horizon line at 50.463% sitting exactly 36.4u above the field edge.
- Smooth Web Animations API entrance sequence with pre-hydration anti-flicker script in root `<head>`.
- Sticky header hidden on home until hero scrolls past viewport top + 96px, with no collision with hero nav.

---

## Placeholders Inventory (How to Replace)

All copy and assets are separated from UI components in `content/*.ts`. The following placeholders are marked in code:

### 1. Site Configuration & Contact (`content/site.ts`)
- `siteConfig.url`: Replace `"https://innoanswers.com"` with your canonical production domain.
- `siteConfig.contact.email`: Replace `"hello@innoanswers.com"` with your inbound contact address.
- `siteConfig.contact.phone`: Replace `"+1 (555) 019-2834"` with your company phone number.
- `siteConfig.contact.address`: Replace `"San Francisco, CA"` with your official office location.
- `siteConfig.contact.hours`: Replace `"Monday – Friday, 9am – 6pm PT"` with your operating hours.

### 2. Wordmark & Official Logo (`components/hero/Wordmark.tsx`)
- The default wordmark renders the inline SVG spark mark specified in §3.3.
- To use the stylized Innoanswers vector logo based on the official brand upload, pass `useOfficialLogo={true}` to `<Wordmark />`.
- To swap with a custom SVG or image file, edit `components/hero/Wordmark.tsx`.

### 3. Font Files (`public/fonts/`)
Drop your licensed WOFF2 font files into `public/fonts/`:
- `public/fonts/google-sans-400.woff2`
- `public/fonts/google-sans-500.woff2`
If omitted, the site gracefully falls back to system fonts without layout shift.

### 4. About & Team (`content/about.ts`)
- `aboutContent.mission`: Replace `"To make AI useful for the businesses that need it most."` with your approved mission statement.
- `aboutContent.showTeam`: Set to `true` when ready to display leadership.
- `aboutContent.teamPlaceholders`: Replace placeholder bios and names with verified team members.

### 5. Client Partners (`content/clients.ts`)
- `clientsContent.clients`: Replace generic items (`"Client 01"` through `"Client 06"`) with client names and optional `logoSrc` vector image paths.

### 6. Testimonials (`content/testimonials.ts`)
- `testimonialsContent.items`: Replace the 3 placeholder quotes, author names, and company titles with authorized client endorsements.

### 7. Blog Posts (`content/blog.ts`)
- `blogPosts`: Replace the 6 placeholder posts with published editorial articles. Structured blocks (`paragraph`, `heading`, `list`) allow rich formatting without external markdown parsers.

### 8. Contact Form Handler (`lib/contact.ts`)
- `submitContact()` currently validates client-side and returns a confirmed submission.
- To connect to a live backend or third-party service:
  - **Formspree:** POST data to `https://formspree.io/f/{your_form_id}`.
  - **Resend:** Send a transactional email via Resend API or serverless route.
  - **Webhook / CRM:** Dispatch a POST request to your HubSpot/Salesforce webhook.

---

## Deployment

The project is compatible with static export (`output: 'export'`):

```bash
npm run build
```

This generates an optimized static export ready for deployment on Vercel, Netlify, Cloudflare Pages, AWS S3 / CloudFront, or Google Cloud Storage.
