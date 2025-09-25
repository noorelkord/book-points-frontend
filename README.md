## BookPoints Frontend

React + Vite + TypeScript app with React Router, TanStack Query, Zustand, Axios, Tailwind, React Hook Form, and Zod.

### Setup
1. Ensure Node.js 18+ and npm are installed.
2. Install deps:
```bash
npm install
```
3. Copy env and update API base URL if needed:
```bash
cp .env.example .env
```
4. Run dev server:
```bash
npm run dev
```
5. Build and preview:
```bash
npm run build
npm run preview
```

### Environment
`VITE_API_BASE_URL` should point to your backend, e.g. `http://localhost:8000/api`.

### Features
- Auth with login/register, token stored in Zustand, `/me` fetched to populate user
- Items listing with filters, search page, protected item creation, and reserve action
- Strong typing and hooks for data fetching


