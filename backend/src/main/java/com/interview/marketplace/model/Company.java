package com.interview.marketplace.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "companies")
public class Company extends User {
    private String companyName;
    private String industry;
    private String website;
}
