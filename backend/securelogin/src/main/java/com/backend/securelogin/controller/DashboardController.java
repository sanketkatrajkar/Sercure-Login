package com.backend.securelogin.controller;


import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping
    public Map<String, String> dashboard(
            Authentication authentication) {

        return Map.of(
                "message", "Welcome to SecureLogin Dashboard!",
                "email", authentication.getName()
        );
    }
}
