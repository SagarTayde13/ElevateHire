package com.interview.marketplace.controller;

import com.interview.marketplace.model.Interviewer;
import com.interview.marketplace.model.User;
import com.interview.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/interviewers")
public class InterviewerController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Interviewer> getAllInterviewers() {
        return userRepository.findAll().stream()
                .filter(user -> user instanceof Interviewer)
                .map(user -> (Interviewer) user)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Interviewer getInterviewer(@PathVariable Long id) {
        return (Interviewer) userRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Interviewer> updateProfile(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        User user = userRepository.findById(id).orElse(null);
        if (user instanceof Interviewer) {
            Interviewer interviewer = (Interviewer) user;
            if (updates.containsKey("name"))
                interviewer.setName((String) updates.get("name"));
            if (updates.containsKey("email"))
                interviewer.setEmail((String) updates.get("email"));
            if (updates.containsKey("expertise"))
                interviewer.setExpertise((String) updates.get("expertise"));
            if (updates.containsKey("hourlyRate"))
                interviewer.setHourlyRate(Double.valueOf(updates.get("hourlyRate").toString()));

            return ResponseEntity.ok((Interviewer) userRepository.save(interviewer));
        }
        return ResponseEntity.notFound().build();
    }
}
