# Solace CRM — Full-Stack Web Application

A CRM system with Login, Register, and Agent Management (CRUD).

## Tech Stack
- Frontend: React JS, Bootstrap 5, Vite
- Backend: Node.js, Express JS
- Database: MySQL
- Auth: JWT + bcryptjs

## Setup Instructions

### 1. Database
```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend
```bash
cd backend
cp .env.example .env   # Fill in your credentials
npm install
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login, returns JWT |
| POST | /api/auth/logout | No | Logout |
| GET | /api/agents | Yes | Get all agents |
| POST | /api/agents | Yes | Create agent |
| PUT | /api/agents/:id | Yes | Update agent |
| DELETE | /api/agents/:id | Yes | Delete agent |

## Environment Variables
See `.env.example` in the backend folder.
