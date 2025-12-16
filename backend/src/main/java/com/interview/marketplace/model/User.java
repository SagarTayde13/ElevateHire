package com.interview.marketplace.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String email;
    private String password; // In real app, this would be hashed

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        CANDIDATE, INTERVIEWER, COMPANY, ADMIN
    }
}
