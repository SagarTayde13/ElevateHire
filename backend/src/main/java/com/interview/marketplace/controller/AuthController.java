package com.interview.marketplace.controller;

import com.interview.marketplace.model.User;
import com.interview.marketplace.model.Candidate;
import com.interview.marketplace.model.Interviewer;
import com.interview.marketplace.model.Company;
import com.interview.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        // In real app: check password hash
        return userRepository.findByEmail(email);
    }

    @PostMapping("/register")
    public User register(@RequestBody Map<String, Object> data) {
        String roleStr = (String) data.get("role");
        User.Role role = User.Role.valueOf(roleStr);

        User user;
        if (role == User.Role.INTERVIEWER) {
            user = new Interviewer();
        } else if (role == User.Role.COMPANY) {
            Company company = new Company();
            company.setCompanyName((String) data.get("companyName"));
            user = company;
        } else {
            user = new Candidate();
        }

        user.setName((String) data.get("name"));
        user.setEmail((String) data.get("email"));
        user.setPassword((String) data.get("password")); // No hash for mock
        user.setRole(role);

        return userRepository.save(user);
    }
}
