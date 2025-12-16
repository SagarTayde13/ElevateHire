package com.interview.marketplace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MarketplaceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MarketplaceApplication.class, args);
	}

	@org.springframework.context.annotation.Bean
	public org.springframework.boot.CommandLineRunner demo(
			com.interview.marketplace.repository.UserRepository repository) {
		return (args) -> {
			// Create a Candidate (ID 1)
			com.interview.marketplace.model.Candidate candidate = new com.interview.marketplace.model.Candidate();
			candidate.setName("John Candidate");
			candidate.setEmail("john@test.com");
			candidate.setPassword("password");
			candidate.setRole(com.interview.marketplace.model.User.Role.CANDIDATE);
			candidate.setResumeUrl("http://resume.com/john");
			repository.save(candidate);

			// Create Interviewers
			createInterviewer(repository, "Sarah Connor", "System Design", 150.0);
			createInterviewer(repository, "Kyle Reese", "Frontend", 120.0);
			createInterviewer(repository, "T-800", "Security", 200.0);
		};
	}

	private void createInterviewer(com.interview.marketplace.repository.UserRepository repo, String name, String exp,
			Double price) {
		com.interview.marketplace.model.Interviewer i = new com.interview.marketplace.model.Interviewer();
		i.setName(name);
		i.setEmail(name.toLowerCase().replace(" ", "") + "@test.com");
		i.setRole(com.interview.marketplace.model.User.Role.INTERVIEWER);
		i.setExpertise(exp);
		i.setHourlyRate(price);
		i.setVerified(true);
		i.setPassword("password");
		repo.save(i);
	}

}
