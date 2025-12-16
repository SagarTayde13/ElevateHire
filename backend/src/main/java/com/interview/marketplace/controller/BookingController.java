package com.interview.marketplace.controller;

import com.interview.marketplace.model.Booking;
import com.interview.marketplace.model.Candidate;
import com.interview.marketplace.model.Interviewer;
import com.interview.marketplace.model.User;
import com.interview.marketplace.repository.BookingRepository;
import com.interview.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public Booking createBooking(@RequestBody Map<String, Object> data) {
        Long candidateId = ((Number) data.get("candidateId")).longValue();
        Long interviewerId = ((Number) data.get("interviewerId")).longValue();
        String startStr = (String) data.get("startTime"); // ISO format ending in Z

        User candidateUser = userRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
        if (!(candidateUser instanceof Candidate)) {
            throw new RuntimeException("User with ID " + candidateId + " is not a candidate");
        }
        Candidate candidate = (Candidate) candidateUser;

        User interviewerUser = userRepository.findById(interviewerId)
                .orElseThrow(() -> new RuntimeException("Interviewer not found"));
        if (!(interviewerUser instanceof Interviewer)) {
            throw new RuntimeException("User with ID " + interviewerId + " is not an interviewer");
        }
        Interviewer interviewer = (Interviewer) interviewerUser;

        Booking booking = new Booking();
        booking.setCandidate(candidate);
        booking.setInterviewer(interviewer);

        // Parse ISO Zoned date time string
        java.time.ZonedDateTime zdt = java.time.ZonedDateTime.parse(startStr);
        booking.setStartTime(zdt.toLocalDateTime());

        booking.setEndTime(booking.getStartTime().plusHours(1)); // Default 1 hour
        booking.setStatus(Booking.Status.PENDING);

        return bookingRepository.save(booking);
    }

    @GetMapping("/candidate/{id}")
    public List<Booking> getCandidateBookings(@PathVariable Long id) {
        return bookingRepository.findByCandidateId(id);
    }

    @GetMapping("/interviewer/{id}")
    public List<Booking> getInterviewerBookings(@PathVariable Long id) {
        return bookingRepository.findByInterviewerId(id);
    }

    @PutMapping("/{id}/status")
    public Booking updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        Booking.Status newStatus = Booking.Status.valueOf(body.get("status"));
        booking.setStatus(newStatus);
        return bookingRepository.save(booking);
    }
}
