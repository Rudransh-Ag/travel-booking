package com.travelbooking.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * User endpoints — accessible to users with ROLE_USER or ROLE_ADMIN.
 * These are protected endpoints requiring valid authentication.
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication auth) {
        return ResponseEntity.ok(Map.of(
            "message", "Welcome, authenticated user!",
            "username", auth.getName(),
            "role", auth.getAuthorities().stream()
                    .findFirst()
                    .map(Object::toString)
                    .orElse("UNKNOWN"),
            "status", "SUCCESS"
        ));
    }

    @GetMapping("/bookings")
    public ResponseEntity<?> getMyBookings(Authentication auth) {
        List<Map<String, Object>> bookings = List.of(
            Map.of("id", "BK-001", "destination", "Bali, Indonesia",
                   "date", "2025-06-15", "status", "CONFIRMED", "amount", 1200),
            Map.of("id", "BK-002", "destination", "Tokyo, Japan",
                   "date", "2025-09-20", "status", "PENDING", "amount", 2100)
        );
        return ResponseEntity.ok(Map.of(
            "message", "Your bookings retrieved successfully",
            "user", auth.getName(),
            "bookings", bookings,
            "status", "SUCCESS"
        ));
    }

    @GetMapping("/destinations")
    public ResponseEntity<?> getDestinations(Authentication auth) {
        List<Map<String, Object>> destinations = List.of(
            Map.of("id", 1, "name", "Bali, Indonesia",   "price", 1200, "rating", 4.8),
            Map.of("id", 2, "name", "Paris, France",     "price", 1800, "rating", 4.9),
            Map.of("id", 3, "name", "Tokyo, Japan",      "price", 2100, "rating", 4.7),
            Map.of("id", 4, "name", "New York, USA",     "price", 900,  "rating", 4.6),
            Map.of("id", 5, "name", "Maldives",          "price", 3200, "rating", 5.0)
        );
        return ResponseEntity.ok(Map.of(
            "message", "Destinations retrieved successfully",
            "user", auth.getName(),
            "destinations", destinations,
            "status", "SUCCESS"
        ));
    }
}
