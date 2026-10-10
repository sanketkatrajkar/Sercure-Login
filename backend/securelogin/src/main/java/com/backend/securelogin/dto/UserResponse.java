package com.backend.securelogin.dto;


public record UserResponse(
        Long id,
        String name,
        String email
) {
}
