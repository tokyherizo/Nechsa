# Necha — Global B2B Partnership Platform

> Connect, collaborate, and grow your business with the right partners worldwide.

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://postgresql.org)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## Overview

**Necha** is a global B2B digital platform that enables businesses to:

- 🤝 **Find partners** via AI-powered matching across 150+ countries
- 🚀 **Launch projects** and invite partner companies to collaborate
- 💬 **Communicate securely** with real-time messaging
- 📄 **Sign digital contracts** with built-in lifecycle tracking
- 🛒 **Access a marketplace** of integrations, APIs, and consulting services
- 📊 **Track partnerships** with analytics dashboards

---

## Project Structure

```
Necha/
├── nechsa_site/          # React frontend (website)
├── backend/              # Node.js/Express REST API
└── frontend/             # Flutter mobile app (coming soon)
```

---

## Tech Stack

### Frontend (`nechsa_site/`)
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI Framework |
| Vite | 5 | Build Tool |
| Tailwind CSS | 3 | Styling |
| Framer Motion | 10 | Animations |
| React Router | 6 | Routing |
| Zustand | 4 | State Management |
| Tanstack Query | 5 | Data Fetching |
| Recharts | 2 | Charts |
| Socket.io-client | 4 | Real-time |

### Backend (`backend/`)
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20 | Runtime |
| Express | 4 | HTTP Framework |
| PostgreSQL | 16 | Database |
| Sequelize | 6 | ORM |
| JWT | — | Authentication |
| Socket.io | 4 | Real-time Messaging |
| Bcrypt.js | — | Password Hashing |
| Zod | 3 | Validation |

---

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- npm 9+

### 1. Clone the repository
```bash
git clone https://github.com/Toky-Herizo/necha.git
cd necha
```

### 2. Setup the backend
```bash
cd backend
cp .env.example .env
# Edit .env with your PostgreSQL credentials

npm install
npm run dev
# API running at http://localhost:5000
```

### 3. Setup the frontend
```bash
cd nechsa_site
npm install
npm run dev
# Site running at http://localhost:3000
```

### 4. Build for production
```bash
# Frontend
cd nechsa_site && npm run build

# Backend
cd backend && npm start
```

---

## Environment Variables

### `backend/.env`
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=necha_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key_min_32_chars
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

---

## API Reference

Base URL: `http://localhost:5000/api`

All protected routes require: `Authorization: Bearer <token>`

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register company + owner |
| POST | `/auth/login` | Login and receive JWT |
| GET | `/auth/me` | Get current user |
| PUT | `/auth/password` | Change password |

### Companies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/companies` | List & search companies |
| GET | `/companies/:id` | Get company profile |
| PUT | `/companies/:id` | Update company |
| GET | `/companies/matching/suggestions` | AI match suggestions |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/projects` | List projects |
| POST | `/projects` | Create project |
| GET | `/projects/:id` | Get project detail |
| PUT | `/projects/:id` | Update project |
| DELETE | `/projects/:id` | Delete project |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/messages/conversations` | List conversations |
| GET | `/messages/:userId` | Get chat history |
| POST | `/messages` | Send message |

### Contracts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/contracts` | List contracts |
| POST | `/contracts` | Create contract |
| PUT | `/contracts/:id/sign` | Sign contract |

### Marketplace
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/marketplace` | Browse services |
| POST | `/marketplace` | List a service |

---

## Real-time Events (Socket.io)

| Event | Direction | Description |
|-------|-----------|-------------|
| `join` | Client → Server | Register user ID |
| `send_message` | Client → Server | Send a message |
| `new_message` | Server → Client | Receive a message |
| `typing` | Client ↔ Server | Typing indicator |
| `user_online` | Server → Client | User presence |

---

## Demo Login

The frontend includes a demo mode (no backend required):

- **Email**: `demo@necha.com`
- **Password**: `demo1234`

---

## Author

**Toky Herizo** — [@Toky-Herizo](https://github.com/Toky-Herizo)

---

## License

MIT © 2025 Toky Herizo
