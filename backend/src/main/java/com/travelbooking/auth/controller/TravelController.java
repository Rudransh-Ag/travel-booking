package com.travelbooking.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class TravelController {
    // rest of file stays exactly the same...

    // ── User-accessible protected routes ─────────────────────────────────────

    @GetMapping("/api/destinations")
    public ResponseEntity<?> getDestinations(Authentication auth) {
        List<Map<String, Object>> destinations = List.of(
            Map.of("id", 1, "name", "Bali, Indonesia",   "price", 1200, "rating", 4.8),
            Map.of("id", 2, "name", "Paris, France",     "price", 1800, "rating", 4.9),
            Map.of("id", 3, "name", "Tokyo, Japan",      "price", 2100, "rating", 4.7),
            Map.of("id", 4, "name", "New York, USA",     "price", 900,  "rating", 4.6),
            Map.of("id", 5, "name", "Maldives",          "price", 3200, "rating", 5.0)
        );
        return ResponseEntity.ok(Map.of(
            "user",         auth.getName(),
            "destinations", destinations
        ));
    }

    @GetMapping("/api/bookings/my")
    public ResponseEntity<?> getMyBookings(Authentication auth) {
        List<Map<String, Object>> bookings = List.of(
            Map.of("id", "BK-001", "destination", "Bali, Indonesia",
                   "date", "2025-06-15", "status", "CONFIRMED", "amount", 1200),
            Map.of("id", "BK-002", "destination", "Tokyo, Japan",
                   "date", "2025-09-20", "status", "PENDING",   "amount", 2100)
        );
        return ResponseEntity.ok(Map.of(
            "user",     auth.getName(),
            "bookings", bookings
        ));
    }

    // ── Admin-only protected routes ───────────────────────────────────────────

    @GetMapping("/api/admin/users")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getAllUsers(Authentication auth) {
        List<Map<String, Object>> users = List.of(
            Map.of("id", 1, "username", "user@travel.com",  "role", "ROLE_USER",  "bookings", 2),
            Map.of("id", 2, "username", "admin@travel.com", "role", "ROLE_ADMIN", "bookings", 0)
        );
        return ResponseEntity.ok(Map.of(
            "requestedBy", auth.getName(),
            "totalUsers",  users.size(),
            "users",       users
        ));
    }

    @GetMapping("/api/admin/dashboard")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getDashboard(Authentication auth) {
        return ResponseEntity.ok(Map.of(
            "requestedBy",       auth.getName(),
            "totalBookings",     42,
            "totalRevenue",      "$84,200",
            "activeUsers",       18,
            "topDestination",    "Maldives",
            "pendingApprovals",  3
        ));
    }
}
