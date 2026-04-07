package com.travelbooking.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Public endpoints — accessible to everyone without authentication.
 */
@RestController
@RequestMapping("/api/public")
public class PublicController {

    @GetMapping("/hello")
    public ResponseEntity<?> hello() {
        return ResponseEntity.ok(Map.of(
            "message", "This is a public endpoint. No authentication required!",
            "status", "SUCCESS"
        ));
    }

    @GetMapping("/info")
    public ResponseEntity<?> info() {
        return ResponseEntity.ok(Map.of(
            "application", "Travel Booking RBAC Demo",
            "version", "1.0.0",
            "description", "Role-Based Access Control demonstration using Spring Boot and JWT",
            "roles", new String[]{"ROLE_USER", "ROLE_ADMIN"},
            "status", "SUCCESS"
        ));
    }
}
