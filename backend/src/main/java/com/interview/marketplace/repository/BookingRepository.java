package com.interview.marketplace.repository;

import com.interview.marketplace.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCandidateId(Long candidateId);

    List<Booking> findByInterviewerId(Long interviewerId);
}
