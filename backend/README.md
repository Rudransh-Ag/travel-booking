# Travel Booking App — JWT Authentication

## Project Structure
- `frontend/` — React (Vite) travel booking UI
- `backend/` — Spring Boot JWT authentication server
- `screenshots/` — Postman screenshots showing JWT auth flow

## How to Run

### Backend
cd backend
mvn spring-boot:run
Server starts at http://localhost:8080

### Frontend
cd frontend
npm install
npm run dev
App starts at http://localhost:5173

## Demo Users
| Email | Password | Role |
|---|---|---|
| user@travel.com | user123 | USER |
| admin@travel.com | admin123 | ADMIN |

## API Endpoints
| Method | URL | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| POST | /api/auth/logout | Authenticated |
| GET | /api/destinations | Authenticated |
| GET | /api/bookings/my | Authenticated |
| GET | /api/admin/dashboard | Admin only |