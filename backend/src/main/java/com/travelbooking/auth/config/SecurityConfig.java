package com.travelbooking.auth.config;

import com.travelbooking.auth.security.JwtAuthenticationFilter;
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

import java.util.List;

/**
 * Spring Security configuration.
 *
 * Public endpoints  → /api/auth/**  (login, register)
 *                     /h2-console/**
 * Admin-only        → /api/admin/**
 * Authenticated     → everything else
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

            // Route permissions
            .authorizeHttpRequests(auth -> auth
                // Public: auth endpoints + H2 console
                .requestMatchers("/api/auth/**", "/h2-console/**").permitAll()
                // Admin-only
                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
                // Everything else requires a valid JWT
                .anyRequest().authenticated()
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
        config.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:3000")); // React dev server
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
