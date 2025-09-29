// UserController.java
package com.arenalyx.controllers;

import com.arenalyx.models.User;
import com.arenalyx.services.UserService;
import com.arenalyx.credentials.UserCredentials;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) { this.userService = userService; }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserCredentials creds) {
        var result = userService.authenticateUser(creds.getEmail(), creds.getPassword());

        if ("Authentication success".equals(result.get("message"))) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody User user) {
        var result = userService.registerUser(user);

        if ("Registration success".equals(result.get("message"))) {
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        }
    }
}
