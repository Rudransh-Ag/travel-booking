package com.travelbooking.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Admin-only endpoints — accessible only to users with ROLE_ADMIN.
 * Users with ROLE_USER will receive 403 Forbidden.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(Authentication auth) {
        return ResponseEntity.ok(Map.of(
            "message", "Welcome, admin! Here is the admin dashboard.",
            "requestedBy", auth.getName(),
            "totalBookings", 42,
            "totalRevenue", "$84,200",
            "activeUsers", 18,
            "topDestination", "Maldives",
            "pendingApprovals", 3,
            "status", "SUCCESS"
        ));
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(Authentication auth) {
        List<Map<String, Object>> users = List.of(
            Map.of("id", 1, "username", "user@travel.com",  "role", "ROLE_USER",  "bookings", 2),
            Map.of("id", 2, "username", "admin@travel.com", "role", "ROLE_ADMIN", "bookings", 0)
        );
        return ResponseEntity.ok(Map.of(
            "message", "All users retrieved successfully",
            "requestedBy", auth.getName(),
            "totalUsers", users.size(),
            "users", users,
            "status", "SUCCESS"
        ));
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats(Authentication auth) {
        return ResponseEntity.ok(Map.of(
            "message", "System statistics retrieved successfully",
            "requestedBy", auth.getName(),
            "dailySignups", 5,
            "monthlyRevenue", "$12,400",
            "systemHealth", "OK",
            "serverUptime", "99.9%",
            "status", "SUCCESS"
        ));
    }
}
