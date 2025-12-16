# Interview Marketplace & Job Readiness Platform

## Project Structure
- **`/frontend`**: Next.js 14 Application (App Router, Tailwind CSS)
- **`/backend`**: Spring Boot Application (Java 17, H2 Database)

## Prerequisites
- **Node.js** (Installed)
- **Java 17** (Installed)
- **Maven**: Required for the backend. Use `brew install maven` if on macOS and it is missing.

## Getting Started

### 1. Start the Backend (Spring Boot)
The backend runs on `http://localhost:8080`.
It uses an in-memory H2 database (data resets on restart).

```bash
cd backend
mvn spring-boot:run
```

**API Endpoints:**
- Login: `POST /api/auth/login`
- Candidates: `/api/candidates`
- Interviewers: `/api/interviewers`
- Bookings: `/api/bookings`

**H2 Console:** `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:interviewdb`
- User: `sa`
- Password: `password`

### 2. Start the Frontend (Next.js)
The frontend runs on `http://localhost:3000`.

```bash
cd frontend
npm run dev
```

## Features Implemented So Far
- **Backend Architecture**: Layered Spring Boot app (Controller, Service, Repository).
- **Entities**: User, Candidate, Interviewer, Booking.
- **API**: Authentication (Mock), Profile management, Search, and Booking flows.
- **Frontend**: Scaffolding complete.
