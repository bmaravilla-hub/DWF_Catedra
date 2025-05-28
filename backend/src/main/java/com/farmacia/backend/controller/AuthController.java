
package com.farmacia.backend.controller;

import com.farmacia.backend.model.Usuario;
import com.farmacia.backend.repository.UsuarioRepository;
import com.farmacia.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        try {
            String username = loginData.get("username");
            String password = loginData.get("password");

            authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            Usuario user = usuarioRepo.findByUsername(username).orElseThrow();
            String token = jwtService.generateToken(username, user.getRol());

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "rol", user.getRol(),
                    "nombre", user.getNombre()
            ));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }
}
