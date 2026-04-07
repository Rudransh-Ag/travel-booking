# Experiment 7: Role-Based Authorization (RBAC) in Spring Boot

## 📋 Overview

This project demonstrates **Role-Based Access Control (RBAC)** implementation using **Spring Boot**, **Spring Security**, **JWT authentication**, **Spring Data JPA**, and **H2 in-memory database**.

The application supports:
- ✅ User authentication using Spring Security with JWT tokens
- ✅ Role-based access control with `ROLE_USER` and `ROLE_ADMIN`
- ✅ Protected APIs accessible only based on assigned roles
- ✅ Proper HTTP responses: `401 Unauthorized` and `403 Forbidden`
- ✅ Demonstration and testing via Postman

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **Spring Boot 3.4.4** | Application framework |
| **Spring Security** | Authentication & Authorization |
| **Spring Data JPA** | Database access (ORM) |
| **H2 Database** | In-memory database for demo |
| **JWT (JJWT 0.11.5)** | Token-based authentication |
| **Lombok** | Boilerplate reduction |
| **Maven** | Build tool |

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/travelbooking/auth/
│   │   │   ├── config/
│   │   │   │   ├── SecurityConfig.java          # RBAC security rules
│   │   │   │   ├── ApplicationConfig.java       # Beans: UserDetailsService, PasswordEncoder
│   │   │   │   └── GlobalExceptionHandler.java  # Global error handling
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java          # POST /api/auth/login, /register
│   │   │   │   ├── PublicController.java        # GET /api/public/** (no auth)
│   │   │   │   ├── UserController.java          # GET /api/user/** (USER, ADMIN)
│   │   │   │   └── AdminController.java         # GET /api/admin/** (ADMIN only)
│   │   │   ├── dto/
│   │   │   │   ├── LoginRequest.java            # Login request DTO
│   │   │   │   ├── RegisterRequest.java         # Register request DTO
│   │   │   │   └── AuthResponse.java            # JWT auth response DTO
│   │   │   ├── model/
│   │   │   │   ├── User.java                    # User entity (implements UserDetails)
│   │   │   │   └── Role.java                    # Role enum: ROLE_USER, ROLE_ADMIN
│   │   │   ├── repository/
│   │   │   │   └── UserRepository.java          # JPA repository for User
│   │   │   ├── security/
│   │   │   │   ├── JwtService.java              # JWT token utility
│   │   │   │   └── JwtAuthenticationFilter.java # JWT request filter
│   │   │   ├── service/
│   │   │   │   └── AuthService.java             # Login & registration logic
│   │   │   └── TravelBookingAuthApplication.java # Main app + demo user seeder
│   │   └── resources/
│   │       └── application.properties           # App configuration
├── screenshots/                                  # Postman test screenshots
│   ├── 01-login-success.png
│   ├── 02-user-endpoint-success.png
│   ├── 03-admin-endpoint-success.png
│   ├── 04-access-denied.png
│   ├── 05-public-endpoint.png
│   ├── 06-invalid-login.png
│   └── 07-no-token-401.png
└── pom.xml                                       # Maven dependencies
```

---

## 🔐 Role-Based Access Control Design

### Roles
| Role | Description |
|---|---|
| `ROLE_USER` | Regular user with access to user endpoints |
| `ROLE_ADMIN` | Administrator with access to all endpoints |

### Access Rules
| Endpoint | Access | Auth Required |
|---|---|---|
| `GET /api/public/hello` | Everyone | ❌ No |
| `GET /api/public/info` | Everyone | ❌ No |
| `POST /api/auth/login` | Everyone | ❌ No |
| `POST /api/auth/register` | Everyone | ❌ No |
| `GET /api/user/profile` | USER, ADMIN | ✅ Yes |
| `GET /api/user/bookings` | USER, ADMIN | ✅ Yes |
| `GET /api/user/destinations` | USER, ADMIN | ✅ Yes |
| `GET /api/admin/dashboard` | ADMIN only | ✅ Yes |
| `GET /api/admin/users` | ADMIN only | ✅ Yes |
| `GET /api/admin/stats` | ADMIN only | ✅ Yes |

### HTTP Error Responses
| Status Code | Meaning | When |
|---|---|---|
| `401 Unauthorized` | No valid authentication | No token or invalid token provided |
| `403 Forbidden` | Insufficient permissions | Valid token but wrong role |

---

## 👤 Demo Users

| Username | Password | Role |
|---|---|---|
| `user1` | `user123` | `ROLE_USER` |
| `admin1` | `admin123` | `ROLE_ADMIN` |

> Passwords are BCrypt-encoded and stored in the H2 database. Users are seeded automatically on server startup.

---

## 🚀 How to Run

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Steps

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Build the project:**
   ```bash
   mvn clean install -DskipTests
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

4. **Server starts on:** `http://localhost:8080`

5. **H2 Console (optional):** `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:traveldb`
   - Username: `sa`
   - Password: *(empty)*

---

## 🧪 Postman Testing Guide

### Case 1: Access Public Endpoint (No Auth Required)
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/public/hello`
- **Auth:** None
- **Expected:** `200 OK`

```json
{
  "message": "This is a public endpoint. No authentication required!",
  "status": "SUCCESS"
}
```

---

### Case 2: Login with Valid Credentials
- **Method:** `POST`
- **URL:** `http://localhost:8080/api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "username": "user1",
  "password": "user123"
}
```
- **Expected:** `200 OK` with JWT token

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "tokenType": "Bearer",
  "username": "user1",
  "role": "ROLE_USER",
  "expiresIn": 86400000
}
```

---

### Case 3: USER Accessing User Endpoint (SUCCESS)
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/user/profile`
- **Auth:** Bearer Token (use token from login as `user1`)
- **Headers:** `Authorization: Bearer <token>`
- **Expected:** `200 OK`

```json
{
  "message": "Welcome, authenticated user!",
  "username": "user1",
  "role": "ROLE_USER",
  "status": "SUCCESS"
}
```

---

### Case 4: USER Accessing Admin Endpoint (403 FORBIDDEN)
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/admin/dashboard`
- **Auth:** Bearer Token (use token from login as `user1`)
- **Expected:** `403 Forbidden`

```json
{
  "timestamp": "2025-04-07T...",
  "status": 403,
  "error": "Forbidden",
  "message": "Access denied: you do not have the required role to access this resource.",
  "path": "/api/admin/dashboard"
}
```

---

### Case 5: ADMIN Accessing Admin Endpoint (SUCCESS)
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/admin/dashboard`
- **Auth:** Bearer Token (use token from login as `admin1`)
- **Expected:** `200 OK`

```json
{
  "message": "Welcome, admin! Here is the admin dashboard.",
  "requestedBy": "admin1",
  "totalBookings": 42,
  "totalRevenue": "$84,200",
  "activeUsers": 18,
  "topDestination": "Maldives",
  "pendingApprovals": 3,
  "status": "SUCCESS"
}
```

---

### Case 6: No Authentication (401 UNAUTHORIZED)
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/user/profile`
- **Auth:** None
- **Expected:** `401 Unauthorized`

```json
{
  "timestamp": "2025-04-07T...",
  "status": 401,
  "error": "Unauthorized",
  "message": "Authentication required. Please provide a valid JWT token.",
  "path": "/api/user/profile"
}
```

---

### Case 7: Invalid Login Attempt
- **Method:** `POST`
- **URL:** `http://localhost:8080/api/auth/login`
- **Body:**
```json
{
  "username": "user1",
  "password": "wrongpassword"
}
```
- **Expected:** `401 Unauthorized`

```json
{
  "timestamp": "2025-04-07T...",
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid username or password"
}
```

---

## 🏗️ Key Implementation Details

### 1. Security Configuration (`SecurityConfig.java`)
The `SecurityFilterChain` defines RBAC rules using URL-based access control:

```java
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/public/**").permitAll()
    .requestMatchers("/api/auth/**").permitAll()
    .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")
    .requestMatchers("/api/admin/**").hasRole("ADMIN")
    .anyRequest().authenticated()
)
```

### 2. JWT Authentication
- Tokens are issued upon successful login via `POST /api/auth/login`
- Each request is validated by `JwtAuthenticationFilter`
- Tokens contain the user's role in the claims payload
- Token expiry: 24 hours

### 3. Password Encoding
All passwords are stored using **BCrypt** encryption:
```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

### 4. Custom Error Responses
- **401 Unauthorized:** Returned via a custom `AuthenticationEntryPoint`
- **403 Forbidden:** Returned via a custom `AccessDeniedHandler`
- Both return structured JSON with timestamp, status, error type, message, and request path

### 5. User Entity
Users implement `UserDetails` from Spring Security, providing:
- Username & encoded password
- Granted authorities derived from the `Role` enum
- Account status flags (non-expired, non-locked, enabled)

---

## 📸 Screenshots

See the `screenshots/` folder for Postman testing screenshots:

1. **01-login-success.png** - Successful login with valid credentials
2. **02-user-endpoint-success.png** - USER role accessing `/api/user/profile`
3. **03-admin-endpoint-success.png** - ADMIN role accessing `/api/admin/dashboard`
4. **04-access-denied.png** - USER role denied access to `/api/admin/dashboard` (403)
5. **05-public-endpoint.png** - Public endpoint accessible without auth
6. **06-invalid-login.png** - Invalid login attempt response
7. **07-no-token-401.png** - Request without token returning 401

---

## 📝 Dependencies (pom.xml)

```xml
<dependencies>
    <dependency>spring-boot-starter-web</dependency>
    <dependency>spring-boot-starter-security</dependency>
    <dependency>spring-boot-starter-data-jpa</dependency>
    <dependency>h2 (runtime)</dependency>
    <dependency>spring-boot-starter-validation</dependency>
    <dependency>jjwt-api, jjwt-impl, jjwt-jackson (0.11.5)</dependency>
    <dependency>lombok (optional)</dependency>
    <dependency>spring-boot-starter-test (test)</dependency>
    <dependency>spring-security-test (test)</dependency>
</dependencies>
```

---

## 🎯 Learning Outcomes

By completing this experiment, we learned how to:
1. ✅ Implement authentication and authorization in Spring Boot
2. ✅ Restrict API access using roles (`ROLE_USER`, `ROLE_ADMIN`)
3. ✅ Configure Spring Security with `SecurityFilterChain` for secured endpoints
4. ✅ Test protected APIs using Postman with JWT Bearer tokens
5. ✅ Understand the difference between `401 Unauthorized` and `403 Forbidden`
6. ✅ Use BCrypt password encoding for secure credential storage
7. ✅ Implement JWT-based stateless authentication