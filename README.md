# OM Packers & Movers 

A premium, production-ready logistics and relocation website built with Next.js 15, inspired by modern SaaS landing pages.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?logo=framer)

---

## Overview

A high-converting homepage for **OM Packers & Movers** — an IBA approved relocation company based in Kolkata. The design intentionally avoids the typical "local business" aesthetic in favour of startup-level polish: glassmorphism, smooth animations, large typography, and micro-interactions throughout.

**Live dev server:** `http://localhost:3000`

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 (App Router) | Framework, routing, SSG |
| TypeScript | Type safety |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion 11 | Page & scroll animations |
| React Hook Form + Zod | Quote form with validation |
| Radix UI (shadcn/ui) | Accessible UI primitives |
| Lucide React | Icons |
| Next/Image | Optimised image delivery |
| react-countup | Animated stat counters |
| react-intersection-observer | Scroll-triggered animations |

---

## Brand

| Token | Value |
|---|---|
| Primary Red | `#E11D48` |
| Navy (dark bg) | `#0F172A` |
| Navy Light | `#1E293B` |
| Font | Inter (Google Fonts) |

---

## Project Structure

```
om-packers/
├── src/
│   ├── app/
│   │   ├── globals.css          # Brand tokens, glass utilities, scrollbar
│   │   ├── layout.tsx           # Root layout, SEO metadata, font setup
│   │   └── page.tsx             # Homepage — composes all sections
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopHeader.tsx    # IBA badge, email, social icons, phone
│   │   │   ├── Navbar.tsx       # Sticky navbar, mega menu, mobile drawer
│   │   │   └── Footer.tsx       # 4-column footer, newsletter signup
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      # Parallax bg, animated headline, trust badges
│   │   │   ├── QuoteForm.tsx        # React Hook Form + Zod, glassmorphism card
│   │   │   ├── TrustStats.tsx       # CountUp animated stats on scroll entry
│   │   │   ├── ServicesSection.tsx  # Image cards with hover zoom & tilt
│   │   │   ├── WhyChooseUs.tsx      # Split layout, floating stat cards
│   │   │   ├── Testimonials.tsx     # Auto-sliding carousel, pause on hover
│   │   │   ├── ProcessTimeline.tsx  # 5-step animated process timeline
│   │   │   ├── CitySection.tsx      # Interactive India map with city markers
│   │   │   ├── FAQSection.tsx       # Radix Accordion with brand styling
│   │   │   └── CTABanner.tsx        # Full-width conversion section
│   │   │
│   │   └── ui/
│   │       ├── button.tsx           # CVA button variants
│   │       ├── input.tsx            # Glassmorphism input
│   │       ├── label.tsx            # Radix Label
│   │       ├── select.tsx           # Radix Select, dark theme
│   │       ├── accordion.tsx        # Radix Accordion
│   │       └── WhatsAppButton.tsx   # Floating, pulsing WhatsApp CTA
│   │
│   └── lib/
│       ├── utils.ts             # cn() Tailwind merge helper
│       └── constants.ts         # All site content (stats, services, FAQs, cities)
│
├── tailwind.config.ts           # Brand colors, custom shadows, keyframes
├── next.config.ts               # Image remote domains
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Type-check for Production

```bash
npm run type-check   # TypeScript check (no emit)
npm run build        # Production build
npm run start        # Serve production build locally
```

---

## Deploying to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual deploy steps

1. Push the repository to GitHub/GitLab
2. Import the project in [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — no config needed beyond `vercel.json`
4. Set the region to `bom1` (Mumbai) for India-based traffic (already in `vercel.json`)
5. Click **Deploy**

### Environment variables

No environment variables are required for the base deployment. If you add a backend or analytics later, add them in **Vercel Dashboard → Project → Settings → Environment Variables**.

### Vercel deployment checklist

- [x] `vercel.json` with framework, build/install commands, region, and cache headers
- [x] `next.config.ts` with security headers, image optimisation, and compression
- [x] All images use `next/image` with `priority` on LCP images
- [x] No `.env` files committed (covered by `.gitignore`)
- [x] `engines.node` set to `>=20.0.0` in `package.json`
- [x] Static export — homepage prerendered as static HTML
- [x] No build warnings or TypeScript errors
- [x] ESLint passes with zero errors

---

## Homepage Sections

| # | Section | Key Features |
|---|---|---|
| 1 | **Top Header** | IBA badge, email, social icons, phone number |
| 2 | **Navbar** | Sticky on scroll, services mega menu, mobile slide drawer |
| 3 | **Hero** | Parallax background, animated headline, glassmorphism quote form, floating truck |
| 4 | **Quote Form** | 6-field form, Zod validation, loading state, animated success screen |
| 5 | **Trust Stats** | CountUp counters — 5000+ customers, 10000+ moves, 100+ cities, 17+ years |
| 6 | **Services** | 6 service cards with image zoom, hover lift, feature lists |
| 7 | **Why Choose Us** | Split layout, animated checklist, floating rating & experience badges |
| 8 | **Testimonials** | Auto-sliding carousel, pause on hover, star ratings, customer photos |
| 9 | **Process Timeline** | 5-step animated timeline with icons |
| 10 | **City Coverage** | Stylised India map with 15 pulsing city markers and tooltips |
| 11 | **FAQ** | Radix Accordion with smooth open/close transitions |
| 12 | **CTA Banner** | Full-width dark conversion section with floating truck animation |
| 13 | **Footer** | Company info, services, cities, newsletter, social links |
| — | **WhatsApp Button** | Fixed floating button with ping animation and expandable chat widget |

---

## Animations

All animations are powered by **Framer Motion** and respect the user's `prefers-reduced-motion` setting via Framer's built-in support.

- `whileInView` — scroll-triggered reveals with stagger delays
- `useScroll` + `useTransform` — parallax hero background
- `AnimatePresence` — route/state transitions (mobile drawer, testimonials, form success)
- `animate` with infinite repeat — floating cards, truck drive, WhatsApp ping
- CountUp — number counter animation triggered by `IntersectionObserver`

---

## Customisation

All site content is centralised in **`src/lib/constants.ts`**:

```ts
COMPANY      // name, phone, email, address, WhatsApp number
STATS        // animated counter values and labels
SERVICES     // service cards (title, description, image, features)
WHY_CHOOSE_US // benefit list items
TESTIMONIALS // customer reviews
PROCESS_STEPS // how-it-works timeline
CITIES       // map markers with x/y coordinates
FAQS         // accordion questions and answers
```

Brand colors live in `tailwind.config.ts` under `theme.extend.colors.brand`.

---

## SEO

- `<title>` and `<meta description>` set in `src/app/layout.tsx`
- Open Graph and Twitter Card tags included
- Semantic HTML throughout (`<section>`, `<nav>`, `<header>`, `<footer>`, `<h1>`–`<h3>`)
- `alt` text on all images
- `aria-label` on all icon-only buttons

---

## License

Private project — all rights reserved by OM Packers & Movers.
