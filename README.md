# ProProfile — Professional Profile Platform

A clean, fast MVP where a user creates one professional profile and shares one public link containing their bio, skills, experience, education, projects, social links and resume.

## Stack
- Frontend: React + Vite + React Router
- Backend: Node.js + Express + TypeScript
- Database: MongoDB Atlas + Mongoose
- Auth: JWT stored in secure HttpOnly cookie
- Deployment: Vercel (frontend) + Render/Railway/AWS (backend)

## Monorepo
```text
pro-profile-platform/
├── backend/
│   ├── src/
│   │   ├── config/db.ts
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── .env.example
│   └── package.json
└── README.md
```

## Run locally
1. Install Node.js 20+ and MongoDB Atlas/local MongoDB.
2. `npm install`
3. `npm run install:all`
4. Copy `backend/.env.example` → `backend/.env` and fill values.
5. Copy `frontend/.env.example` → `frontend/.env`.
6. `npm run dev`
7. Frontend: http://localhost:5173
8. Backend: http://localhost:5000

## API
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/profile/me`
- `PUT /api/profile/me`
- `GET /api/profile/public/:username`
- `GET /api/projects`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

## Production optimization already included
- HttpOnly auth cookie instead of localStorage JWT
- Password hashing with bcrypt
- Request validation with Zod
- Helmet security headers
- CORS allow-list
- Rate limiting on auth routes
- MongoDB indexes for email/username/public slug
- Lean public profile query
- Centralized API client and error handling
- Responsive UI with accessible forms
- Public profile exposes only intended fields

## Next production additions
- Email verification + forgot/reset password
- S3/Cloudflare R2 for resume/avatar uploads
- Google OAuth
- Profile analytics
- Custom domains
- QR code generation
- Project drag-and-drop ordering
- Redis caching if public profile traffic grows
