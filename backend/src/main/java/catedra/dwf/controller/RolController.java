package catedra.dwf.controller;

import catedra.dwf.controller.response.MessageResponse;
import catedra.dwf.repository.RolRepository;
import catedra.dwf.repository.domain.Rol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RolController {

    @Autowired
    private RolRepository rolRepository;

    @GetMapping
    public List<Rol> getAllRoles() {
        return rolRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRolById(@PathVariable Long id) {
        return rolRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createRol(@RequestBody Rol rol) {
        if (rolRepository.findByNombreRol(rol.getNombreRol()) != null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: El rol ya existe"));
        }
        return ResponseEntity.ok(rolRepository.save(rol));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRol(@PathVariable Long id, @RequestBody Rol rolDetails) {
        return rolRepository.findById(id)
                .map(rol -> {
                    rol.setNombreRol(rolDetails.getNombreRol());
                    return ResponseEntity.ok(rolRepository.save(rol));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRol(@PathVariable Long id) {
        return rolRepository.findById(id)
                .map(rol -> {
                    rolRepository.delete(rol);
                    return ResponseEntity.ok(new MessageResponse("Rol eliminado correctamente"));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}