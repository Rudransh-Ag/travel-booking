package com.travelbooking.auth.model;

/**
 * Available user roles.
 * Spring Security expects the "ROLE_" prefix when using hasRole() checks.
 */
public enum Role {
    ROLE_USER,
    ROLE_ADMIN
}
