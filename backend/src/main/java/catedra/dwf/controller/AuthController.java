package catedra.dwf.controller;

import catedra.dwf.controller.request.LoginRequest;
import catedra.dwf.controller.request.SignupRequest;
import catedra.dwf.controller.response.JwtResponse;
import catedra.dwf.controller.response.MessageResponse;
import catedra.dwf.repository.RolRepository;
import catedra.dwf.repository.UsuarioRepository;
import catedra.dwf.repository.domain.Rol;
import catedra.dwf.repository.domain.Usuario;
import catedra.dwf.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.GrantedAuthority;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getCorreo(), loginRequest.getContrasena()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtils.generateJwtToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String correo = userDetails.getUsername();

        // Extraer el rol - suponiendo que solo tiene uno
        String rol = userDetails.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("ROLE_USER");

        // Si el rol viene con formato "ROLE_XXX", quitar el prefijo
        if (rol.startsWith("ROLE_")) {
            rol = rol.substring(5);
        }

        // Obtener el ID del usuario desde la base de datos
        Usuario usuario = usuarioRepository.findByCorreo(correo).orElse(null);
        Long idUsuario = usuario != null ? usuario.getIdUsuario().longValue() : null;

        return ResponseEntity.ok(new JwtResponse(token, correo, rol, idUsuario));
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        if (usuarioRepository.existsByCorreo(signupRequest.getCorreo())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: El correo ya está en uso"));
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(signupRequest.getNombre());
        usuario.setCorreo(signupRequest.getCorreo());
        usuario.setContrasena(passwordEncoder.encode(signupRequest.getContrasena()));

        // Usar "Empleado" como rol predeterminado
        String rolStr = signupRequest.getRol() != null ? signupRequest.getRol() : "Empleado";

        // Validar que el rol sea uno de los permitidos
        if (!rolStr.equals("Administrador") && !rolStr.equals("Empleado")) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Rol no válido. Debe ser 'Administrador' o 'Empleado'"));
        }

        Rol rol = rolRepository.findByNombreRol(rolStr);

        // Verificar si el rol existe en la base de datos
        if (rol == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: El rol " + rolStr + " no existe en el sistema"));
        }

        usuario.setRol(rol);

        usuarioRepository.save(usuario);

        return ResponseEntity.ok(new MessageResponse("Usuario registrado exitosamente"));
    }
}