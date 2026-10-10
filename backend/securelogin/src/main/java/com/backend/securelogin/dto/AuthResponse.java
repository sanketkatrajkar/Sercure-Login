package com.backend.securelogin.dto;


public record AuthResponse(
        String token,
        UserResponse user
) {
}
