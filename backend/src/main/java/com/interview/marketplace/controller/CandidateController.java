package com.interview.marketplace.controller;

import com.interview.marketplace.model.Candidate;
import com.interview.marketplace.model.User;
import com.interview.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Candidate> getProfile(@PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user instanceof Candidate) {
            return ResponseEntity.ok((Candidate) user);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Candidate> updateProfile(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        User user = userRepository.findById(id).orElse(null);
        if (user instanceof Candidate) {
            Candidate candidate = (Candidate) user;
            if (updates.containsKey("name"))
                candidate.setName((String) updates.get("name"));
            if (updates.containsKey("email"))
                candidate.setEmail((String) updates.get("email"));
            if (updates.containsKey("resumeUrl"))
                candidate.setResumeUrl((String) updates.get("resumeUrl"));
            if (updates.containsKey("skills"))
                candidate.setSkills((String) updates.get("skills"));
            // ... strict validation needed in production
            return ResponseEntity.ok((Candidate) userRepository.save(candidate));
        }
        return ResponseEntity.notFound().build();
    }
}
