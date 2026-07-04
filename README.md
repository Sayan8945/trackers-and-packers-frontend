# Sarkar Packers & Movers — Monorepo

```
om-packers/
├── frontend/   ← Next.js 16 app (React 19, TypeScript, Tailwind, Firebase Auth)
├── backend/    ← Express API (TypeScript, MongoDB, Firebase Admin, JWT)
├── .gitignore
├── package.json  (monorepo root — convenience scripts)
└── README.md
```

## Quick Start

### Frontend
```bash
cd frontend
npm install
# copy frontend/.env.local.example → frontend/.env.local and fill in values
npm run dev       # http://localhost:3000
```

### Backend
```bash
cd backend
npm install
# copy backend/.env.example → backend/.env and fill in values
npm run dev       # http://localhost:5000
```

### Run both from root (convenience)
```bash
npm run dev:frontend   # starts Next.js dev server
npm run dev:backend    # starts Express dev server
```

## Environment Variables

### `frontend/.env.local`
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend base URL e.g. `http://localhost:5000/api` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase web app API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key |
| `NEXT_PUBLIC_GOOGLE_MAP_ID` | Google Maps map ID |

### `backend/.env`
| Variable | Description |
|---|---|
| `PORT` | Server port (default `5000`) |
| `NODE_ENV` | `development` or `production` |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `CLIENT_URL` | Frontend URL for CORS & OAuth redirect |
| `JWT_ACCESS_SECRET` | JWT access token secret |
| `JWT_REFRESH_SECRET` | JWT refresh token secret |
| `JWT_ACCESS_EXPIRES_IN` | Access token TTL (e.g. `15m`) |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token TTL (e.g. `30d`) |
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | SMTP port |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `SMTP_FROM` | From address |
| `FIREBASE_PROJECT_ID` | Firebase Admin project ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase Admin service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase Admin private key (with `\n`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_CALLBACK_URL` | Google OAuth callback URL |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
