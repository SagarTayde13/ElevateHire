package com.interview.marketplace.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "candidates")
public class Candidate extends User {
    private String resumeUrl;
    private String skills; // JSON or CSV string
}
