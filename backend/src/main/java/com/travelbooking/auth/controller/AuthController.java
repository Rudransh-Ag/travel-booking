package com.travelbooking.auth.controller;

import com.travelbooking.auth.dto.AuthResponse;
import com.travelbooking.auth.dto.LoginRequest;
import com.travelbooking.auth.dto.RegisterRequest;
import com.travelbooking.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Public authentication endpoints — no token required.
 *
 *  POST /api/auth/register  → create account + receive JWT
 *  POST /api/auth/login     → authenticate + receive JWT
 *  POST /api/auth/logout    → client-side token discard (informational)
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    /**
     * Logout endpoint.
     *
     * JWTs are stateless — the server cannot truly invalidate them without a
     * token blacklist or short expiry. The recommended approach is:
     *   1. Client deletes the token from storage (localStorage / cookie).
     *   2. Optionally, implement a server-side token blacklist (Redis, DB).
     *
     * This endpoint returns an informational message confirming the logout
     * instruction was received.
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(
            java.util.Map.of(
                "message", "Logged out successfully. Please delete your token on the client side.",
                "status",  "SUCCESS"
            )
        );
    }
}
