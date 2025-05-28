package com.farmacia.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private String nombre;
    private String rol;
    private String token;
}
