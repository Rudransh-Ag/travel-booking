package com.travelbooking.auth.model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public User() {}

    public User(Long id, String username, String password, Role role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Builder
    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String username;
        private String password;
        private Role role;

        public Builder id(Long id)             { this.id = id; return this; }
        public Builder username(String u)      { this.username = u; return this; }
        public Builder password(String p)      { this.password = p; return this; }
        public Builder role(Role r)            { this.role = r; return this; }
        public User build() { return new User(id, username, password, role); }
    }

    // Getters & Setters
    public Long getId()                  { return id; }
    public void setId(Long id)           { this.id = id; }
    public void setUsername(String u)    { this.username = u; }
    public void setPassword(String p)    { this.password = p; }
    public Role getRole()                { return role; }
    public void setRole(Role r)          { this.role = r; }

    // UserDetails
    @Override public String getUsername()  { return username; }
    @Override public String getPassword()  { return password; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override public boolean isAccountNonExpired()     { return true; }
    @Override public boolean isAccountNonLocked()      { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled()               { return true; }
}