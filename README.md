# Sarkar Packers & Movers — Frontend

Customer-facing website and admin dashboard for **Sarkar Packers and Movers Pvt. Ltd.** Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS 3 + shadcn/ui (Radix UI) |
| Animations | Framer Motion 12 |
| Forms | React Hook Form 7 + Zod |
| Auth | Firebase Phone Auth + Google OAuth + JWT |
| HTTP | Axios with auto token-refresh interceptor |
| Icons | Lucide React |
| Maps | Google Maps (`@vis.gl/react-google-maps`) |
| Node | ≥ 20.0.0 |

---

## Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── page.tsx           # Home (landing page)
│   ├── login/             # Login — phone OTP + email/password tabs
│   ├── signup/            # Registration
│   ├── verify-otp/        # Firebase phone OTP verification
│   ├── forgot-password/   # Password reset request
│   ├── admin-login/       # Admin portal login
│   └── admin/             # Admin dashboard (leads, blogs, testimonials…)
├── components/
│   ├── sections/          # Landing page sections (Hero, Services, FAQ…)
│   ├── layout/            # Navbar, Footer, TopHeader
│   ├── admin/             # Admin sidebar, header, stats cards
│   └── ui/                # Shared UI primitives (shadcn/ui)
├── context/
│   └── AuthContext.tsx    # Global auth state + Firebase phone auth methods
├── hooks/
│   └── useAuth.ts         # Re-export of useAuth for convenience
├── lib/
│   ├── api.ts             # Axios instance + all API calls
│   ├── auth.ts            # Session helpers (localStorage / cookie)
│   ├── firebase.ts        # Firebase app init + phone auth exports
│   ├── constants.ts       # Company info, services, FAQs, cities
│   └── utils.ts           # cn() class merge helper
├── types/
│   ├── auth.ts            # User, AuthTokens, form types
│   └── admin.ts           # Lead, Blog, Testimonial types
└── proxy.ts               # Next.js middleware — route protection
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example below into `.env.local` and fill in your values:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Firebase — Web app config (Project Settings → General → Your apps)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
NEXT_PUBLIC_GOOGLE_MAP_ID=your-map-id
```

### 3. Run the dev server

```bash
npm run dev
# → http://localhost:3000
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript check without emit |

---

## Authentication Flow

### Phone OTP (Firebase)
```
Login page → enter mobile number
→ Firebase sends SMS OTP (requires Blaze plan or test numbers)
→ /verify-otp → enter 6-digit code
→ Firebase confirms → ID token sent to backend
→ Backend returns JWT access + refresh token
→ User logged in
```

### Email / Password
```
Login page (Email tab) → email + password
→ POST /api/auth/login
→ JWT access + refresh token returned
→ User logged in
```

### Google OAuth
```
"Continue with Google" button
→ Redirected to backend /api/auth/google
→ Passport Google OAuth flow
→ Redirect back to /auth/callback with tokens
→ User logged in
```

### Admin
```
/admin-login → email + password
→ POST /api/admin/login
→ Admin JWT returned
→ Redirect to /admin dashboard
```

---

## Firebase Setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. **Authentication → Sign-in method** → enable **Phone** and **Google**
3. **Authentication → Settings → Authorized domains** → add `localhost`
4. **Authentication → Settings → SMS region policy** → allow India (IN) or all regions
5. For testing without billing: **Authentication → Sign-in method → Phone → Test phone numbers** → add a fake number + fixed OTP code
6. Copy your web app config into `.env.local`

---

## Route Protection

`src/proxy.ts` (Next.js Middleware) guards:

| Route | Rule |
|---|---|
| `/admin`, `/admin/*` | Redirects to `/admin-login` if not admin-authenticated |
| `/admin-login` | Redirects to `/admin` if already admin-authenticated |
| `/login`, `/signup` | Redirects to `/` if already user-authenticated |

Session state is tracked via `sarkar_admin_auth` and `sarkar_user_auth` cookies.

---

## Deployment

The project includes `vercel.json` — deploy directly to Vercel:

```bash
vercel --prod
```

Set all `NEXT_PUBLIC_*` environment variables in the Vercel project settings before deploying.
