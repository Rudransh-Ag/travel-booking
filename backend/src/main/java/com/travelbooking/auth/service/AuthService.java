package com.travelbooking.auth.service;

import com.travelbooking.auth.dto.AuthResponse;
import com.travelbooking.auth.dto.LoginRequest;
import com.travelbooking.auth.dto.RegisterRequest;
import com.travelbooking.auth.model.Role;
import com.travelbooking.auth.model.User;
import com.travelbooking.auth.repository.UserRepository;
import com.travelbooking.auth.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Handles user registration and login, returning a JWT on success.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository        userRepository;
    private final PasswordEncoder       passwordEncoder;
    private final JwtService            jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Register a brand-new user, store in DB, and return a JWT.
     */
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already in use: " + request.getUsername());
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getUsername(), user.getRole().name(),
                jwtService.getExpirationMs());
    }

    /**
     * Authenticate an existing user and return a fresh JWT.
     * Spring's AuthenticationManager handles bad credentials
     * by throwing BadCredentialsException automatically.
     */
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getUsername(), user.getRole().name(),
                jwtService.getExpirationMs());
    }
}
