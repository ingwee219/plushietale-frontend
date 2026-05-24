# Plushie Tale — Frontend

React frontend for **Plushie Tale**, an AI-powered web app that generates personalised bedtime stories based on a child's plushie.

**Live demo:** http://56.228.67.183  
**Backend repo:** https://github.com/ingwee219/plushietale-backend

---

## Features

- **Landing page** — Conversion-focused design with story preview
- **Plushie management** — Upload, edit, and delete plushies with image preview
- **AI story creation** — Select plushies, set target age, add an optional prompt
- **Story library** — Browse and read all generated stories
- **Community board** — Share stories publicly, comment, and like posts
- **Profile page** — Edit nickname/password, view own posts and comments
- **Authentication** — Email/password sign-up and Google OAuth2 login

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| HTTP | Axios |
| Fonts | Lora + DM Sans (Google Fonts) |
| Server | Nginx (production) |
| Infra | Docker, AWS EC2 |

## Local Setup

### Prerequisites
- Node.js 18+
- Backend running on `http://localhost:8080`

### Run

```bash
npm install
npm run dev
```

App runs on `http://localhost:5173`

### Environment

`.env.development` is included — no extra setup needed for local development.  
For production, the API base URL is empty (Nginx proxies `/api/*` to the backend).
