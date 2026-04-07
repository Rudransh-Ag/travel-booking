package com.travelbooking.auth.config;

import com.travelbooking.auth.security.JwtAuthenticationFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Spring Security configuration — Role-Based Access Control (RBAC).
 *
 * Access rules:
 *   /api/public/**  → accessible to everyone (no auth required)
 *   /api/auth/**    → accessible to everyone (login, register)
 *   /h2-console/**  → accessible to everyone (dev database console)
 *   /api/user/**    → accessible to USER and ADMIN roles
 *   /api/admin/**   → accessible to ADMIN only
 *   All other       → requires authentication
 *
 * Returns proper JSON responses:
 *   401 Unauthorized → when no valid authentication is provided
 *   403 Forbidden    → when authentication is valid but role is insufficient
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity          // allows @PreAuthorize on individual methods
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider  authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF — not needed for stateless JWT APIs
            .csrf(AbstractHttpConfigurer::disable)

            // Allow same-origin frames for H2 console
            .headers(headers -> headers.frameOptions(fo -> fo.sameOrigin()))

            // CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // ── Route permissions (RBAC rules) ──────────────────────────────
            .authorizeHttpRequests(auth -> auth
                // Public: no authentication required
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()

                // User endpoints: accessible to USER and ADMIN
                .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")

                // Admin endpoints: accessible to ADMIN only
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // Everything else requires authentication
                .anyRequest().authenticated()
            )

            // ── Custom 401 Unauthorized response ────────────────────────────
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setContentType("application/json");
                    response.setStatus(401);
                    ObjectMapper mapper = new ObjectMapper();
                    String body = mapper.writeValueAsString(Map.of(
                        "timestamp", LocalDateTime.now().toString(),
                        "status", 401,
                        "error", "Unauthorized",
                        "message", "Authentication required. Please provide a valid JWT token.",
                        "path", request.getRequestURI()
                    ));
                    response.getWriter().write(body);
                })

                // ── Custom 403 Forbidden response ───────────────────────────
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    response.setContentType("application/json");
                    response.setStatus(403);
                    ObjectMapper mapper = new ObjectMapper();
                    String body = mapper.writeValueAsString(Map.of(
                        "timestamp", LocalDateTime.now().toString(),
                        "status", 403,
                        "error", "Forbidden",
                        "message", "Access denied: you do not have the required role to access this resource.",
                        "path", request.getRequestURI()
                    ));
                    response.getWriter().write(body);
                })
            )

            // Stateless session — no HTTP session cookies
            .sessionManagement(sm -> sm
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // Plug in our custom AuthenticationProvider
            .authenticationProvider(authenticationProvider)

            // Add JWT filter BEFORE Spring's default username/password filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
