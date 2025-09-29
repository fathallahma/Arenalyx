// UserService.java
package com.arenalyx.services;

import com.arenalyx.models.User;
import com.arenalyx.repositories.ApplicationRepository;
import com.arenalyx.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository, ApplicationRepository applicationRepository) {
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
    }

    public Map<String, Object> authenticateUser(String email, String password) {
        Map<String, Object> response = new HashMap<>();
        var user = userRepository.findByEmail(email).orElse(null);

        if (user != null && encoder.matches(password, user.getPassword())) {
            response.put("message", "Authentication success");
            response.put("id", user.getId());
            response.put("firstName", user.getFirstName());
            response.put("darkMode", user.getDarkMode());
            response.put("applications", applicationRepository.findByUserId(user.getId()));
        } else {
            response.put("message", "Authentication failed");
        }

        return response;
    }

    public Map<String, Object> registerUser(User input) {
        Map<String, Object> resp = new HashMap<>();

        // Email + Password check
        if (input.getEmail() == null || input.getPassword() == null) {
            resp.put("message", "Registration failed");
            resp.put("reason", "Email or password missing");
            return resp;
        }

        if (userRepository.findByEmail(input.getEmail()).isPresent()) {
            resp.put("message", "Registration failed");
            resp.put("reason", "Email already exists");
            return resp;
        }

        // 🔒 ignore input.getId() ! Ne le copie pas dans le User qu’on sauvegarde
        User user = User.builder()
                .firstName(input.getFirstName())
                .lastName(input.getLastName())
                .email(input.getEmail())
                .password(encoder.encode(input.getPassword()))
                .role("PATIENT")
                .creationDate(LocalDate.now())
                .updateDate(LocalDate.now())
                .darkMode(false)
                .build();

        user = userRepository.save(user); // auto-id correct ici

        resp.put("message", "Registration success");
        resp.put("id", user.getId());
        resp.put("firstName", user.getFirstName());
        resp.put("darkMode", user.getDarkMode());
        resp.put("applications", applicationRepository.findByUserId(user.getId()));
        return resp;
    }
}
