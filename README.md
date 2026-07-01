# Intervo — AI Interview Coach

An AI-powered placement preparation platform designed to help students become interview-ready through personalized learning, mock interviews, coding practice, and performance analytics.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS, Framer Motion, Chart.js |
| Backend | Node.js, Express.js |
| Database | PostgreSQL, Redis |
| Auth | JWT, Google OAuth, OTP |
| AI | LLM API, Speech-to-Text |
| Storage | Cloudinary |
| Deployment | Vercel (Frontend), Railway (Backend), Neon (PostgreSQL) |

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL 15+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/intervo.git
cd intervo

# Install all dependencies
npm run install:all

# Set up environment variables
cp client/.env.example client/.env
cp server/.env.example server/.env
# Edit .env files with your values

# Run database migrations
psql -d intervo -f server/database/migrations/001_initial_schema.sql

# Start development servers
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

## Project Structure

```
intervo/
├── client/          # React frontend
├── server/          # Node.js backend
├── package.json     # Root workspace scripts
└── README.md
```

