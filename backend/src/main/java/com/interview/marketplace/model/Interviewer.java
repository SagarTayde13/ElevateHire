package com.interview.marketplace.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "interviewers")
public class Interviewer extends User {
    private String expertise; // Tech stack, etc.
    private Double hourlyRate;
    private boolean isVerified = false;
    private String availability; // JSON string
}
