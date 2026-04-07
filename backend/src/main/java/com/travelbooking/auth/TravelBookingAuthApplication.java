package com.travelbooking.auth;

import com.travelbooking.auth.model.Role;
import com.travelbooking.auth.model.User;
import com.travelbooking.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class TravelBookingAuthApplication {

    public static void main(String[] args) {
        SpringApplication.run(TravelBookingAuthApplication.class, args);
    }

    /**
     * Seed two demo users on startup so you can test immediately via Postman
     * without needing to register first.
     *
     *  USER  → username: user@travel.com   password: user123
     *  ADMIN → username: admin@travel.com  password: admin123
     */
    @Bean
    CommandLineRunner seedUsers(UserRepository userRepo, PasswordEncoder encoder) {
        return args -> {
            if (userRepo.findByUsername("user@travel.com").isEmpty()) {
                User regularUser = User.builder()
                        .username("user@travel.com")
                        .password(encoder.encode("user123"))
                        .role(Role.ROLE_USER)
                        .build();
                userRepo.save(regularUser);
            }

            if (userRepo.findByUsername("admin@travel.com").isEmpty()) {
                User adminUser = User.builder()
                        .username("admin@travel.com")
                        .password(encoder.encode("admin123"))
                        .role(Role.ROLE_ADMIN)
                        .build();
                userRepo.save(adminUser);
            }

            System.out.println("=======================================================");
            System.out.println("  Travel Booking JWT Auth Server started on port 8080  ");
            System.out.println("  Demo users seeded:                                   ");
            System.out.println("    USER  → user@travel.com  / user123                 ");
            System.out.println("    ADMIN → admin@travel.com / admin123                ");
            System.out.println("=======================================================");
        };
    }
}
