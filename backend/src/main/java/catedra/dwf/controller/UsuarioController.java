package catedra.dwf.controller;

import catedra.dwf.controller.response.MessageResponse;
import catedra.dwf.repository.RolRepository;
import catedra.dwf.repository.UsuarioRepository;
import catedra.dwf.repository.domain.Rol;
import catedra.dwf.repository.domain.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@PreAuthorize("hasRole('Administrador')")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUsuarioById(@PathVariable Integer id) {
        return usuarioRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createUsuario(@RequestBody Usuario usuario) {
        if (usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: El correo ya está en uso"));
        }

        // Codificar contraseña
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));

        // Validar que el rol existe
        if (usuario.getRol() != null && usuario.getRol().getIdRol() != null) {
            Rol rol = rolRepository.findById(usuario.getRol().getIdRol())
                    .orElse(null);
            if (rol == null) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: El rol no existe"));
            }
            usuario.setRol(rol);
        }

        return ResponseEntity.ok(usuarioRepository.save(usuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUsuario(@PathVariable Integer id, @RequestBody Usuario usuarioDetails) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setNombre(usuarioDetails.getNombre());

                    // Verificar si se actualiza el correo
                    if (!usuario.getCorreo().equals(usuarioDetails.getCorreo())) {
                        if (usuarioRepository.existsByCorreo(usuarioDetails.getCorreo())) {
                            return ResponseEntity.badRequest().body(new MessageResponse("Error: El correo ya está en uso"));
                        }
                        usuario.setCorreo(usuarioDetails.getCorreo());
                    }

                    // Actualizar contraseña si se proporciona una nueva
                    if (usuarioDetails.getContrasena() != null && !usuarioDetails.getContrasena().isEmpty()) {
                        usuario.setContrasena(passwordEncoder.encode(usuarioDetails.getContrasena()));
                    }

                    // Actualizar rol si se proporciona
                    if (usuarioDetails.getRol() != null && usuarioDetails.getRol().getIdRol() != null) {
                        Rol rol = rolRepository.findById(usuarioDetails.getRol().getIdRol())
                                .orElse(null);
                        if (rol == null) {
                            return ResponseEntity.badRequest().body(new MessageResponse("Error: El rol no existe"));
                        }
                        usuario.setRol(rol);
                    }

                    return ResponseEntity.ok(usuarioRepository.save(usuario));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable Integer id) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuarioRepository.delete(usuario);
                    return ResponseEntity.ok(new MessageResponse("Usuario eliminado correctamente"));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}