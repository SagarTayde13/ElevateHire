package com.interview.marketplace.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final Random random = new Random();

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, String>> analyzeResume(@RequestBody Map<String, String> body) {
        String mode = body.get("mode");
        String text = body.get("text");
        String result = "";

        if ("ROAST".equalsIgnoreCase(mode)) {
            result = generateRoast(text);
        } else {
            result = generateImprovement(text);
        }

        return ResponseEntity.ok(Map.of("message", result));
    }

    private String generateRoast(String text) {
        String[] roasts = {
                "I've seen ransom notes with better formatting than this.",
                "Using 'Microsoft Word' as a skill in 2025? Bold strategy.",
                "This resume says 'Hire me', but the font choice screams 'I still use Internet Explorer'.",
                "Is this a resume or a CVS receipt? It's way too long and full of nothing.",
                "You listed 'Team Player' three times. We get it, you don't do any work yourself.",
                "Wow, I didn't know it was possible to use that many buzzwords in one sentence without saying anything.",
                "Your experience section looks like generated lorem ipsum text.",
                "This resume has less personality than a cardboard box."
        };
        return roasts[random.nextInt(roasts.length)];
    }

    private String generateImprovement(String text) {
        String[] tips = {
                "Try using stronger action verbs like 'Spearheaded', 'Architected', or 'Optimized'.",
                "Quantify your achievements! instead of 'Improved performance', say 'Improved latency by 200ms'.",
                "Keep your formatting consistent. Your dates are all over the place.",
                "Focus on the impact of your work, not just the technologies used.",
                "Tailor your skills section to the job description. Remove outdated tools.",
                "Your summary is a bit generic. Highlight what makes you unique in one sentence."
        };
        return tips[random.nextInt(tips.length)];
    }
}
