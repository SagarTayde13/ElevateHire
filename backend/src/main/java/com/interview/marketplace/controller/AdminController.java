package com.interview.marketplace.controller;

import com.interview.marketplace.model.Interviewer;
import com.interview.marketplace.model.User;
import com.interview.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @PutMapping("/verify/{interviewerId}")
    public ResponseEntity<Interviewer> verifyInterviewer(@PathVariable Long interviewerId) {
        User user = userRepository.findById(interviewerId).orElse(null);
        if (user instanceof Interviewer) {
            Interviewer interviewer = (Interviewer) user;
            interviewer.setVerified(true);
            return ResponseEntity.ok((Interviewer) userRepository.save(interviewer));
        }
        return ResponseEntity.notFound().build();
    }
}
