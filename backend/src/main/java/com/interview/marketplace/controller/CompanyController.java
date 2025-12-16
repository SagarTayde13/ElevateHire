package com.interview.marketplace.controller;

import com.interview.marketplace.model.Booking;
import com.interview.marketplace.model.Candidate;
import com.interview.marketplace.model.Interviewer;
import com.interview.marketplace.repository.BookingRepository;
import com.interview.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping("/assign")
    public ResponseEntity<Booking> assignInterviewer(@RequestBody Map<String, Object> data) {
        // Log "Company X assigned Interviewer Y to Candidate Z"
        // In this MVP, we will create a BOOKING between them, paid by Company.

        Long candidateId = Long.valueOf((Integer) data.get("candidateId"));
        Long interviewerId = Long.valueOf((Integer) data.get("interviewerId"));

        Candidate candidate = (Candidate) userRepository.findById(candidateId).orElseThrow();
        Interviewer interviewer = (Interviewer) userRepository.findById(interviewerId).orElseThrow();

        Booking booking = new Booking();
        booking.setCandidate(candidate);
        booking.setInterviewer(interviewer);
        booking.setStartTime(LocalDateTime.now().plusDays(1)); // Auto-schedule for tomorrow
        booking.setEndTime(LocalDateTime.now().plusDays(1).plusHours(1));
        booking.setStatus(Booking.Status.CONFIRMED); // Auto confirm

        return ResponseEntity.ok(bookingRepository.save(booking));
    }
}
