package com.farmacia.backend.config;

import com.farmacia.backend.model.Usuario;
import com.farmacia.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initUsers(UsuarioRepository repo, PasswordEncoder encoder) {
        return args -> {
            if (repo.findAll().isEmpty()) {
                repo.save(new Usuario(null, "Admin", "admin", encoder.encode("admin123"), "ADMIN"));
                repo.save(new Usuario(null, "Empleado", "empleado", encoder.encode("empleado123"), "EMPLEADO"));
            }
        };
    }
}

