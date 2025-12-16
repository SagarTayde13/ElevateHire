package com.interview.marketplace.config;

import com.interview.marketplace.model.Candidate;
import com.interview.marketplace.model.Interviewer;
import com.interview.marketplace.model.User;
import com.interview.marketplace.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            System.out.println("Seeding data...");

            // Create Candidates
            for (int i = 1; i <= 10; i++) {
                Candidate candidate = new Candidate();
                candidate.setName("Candidate " + i);
                candidate.setEmail("candidate" + i + "@example.com");
                candidate.setPassword("password");
                candidate.setRole(User.Role.CANDIDATE);
                candidate.setResumeUrl("https://example.com/resume" + i + ".pdf");
                candidate.setSkills("Java, Spring Boot, React");
                userRepository.save(candidate);
            }

            // Create Interviewers
            for (int i = 1; i <= 10; i++) {
                Interviewer interviewer = new Interviewer();
                interviewer.setName("Interviewer " + i);
                interviewer.setEmail("interviewer" + i + "@example.com");
                interviewer.setPassword("password");
                interviewer.setRole(User.Role.INTERVIEWER);
                interviewer.setExpertise("System Design, Backend");
                interviewer.setHourlyRate(100.0 + (i * 10));
                userRepository.save(interviewer);
            }

            System.out.println("Data seeding completed.");
        }
    }
}
