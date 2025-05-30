package catedra.dwf.repository;

import catedra.dwf.repository.domain.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolRepository extends JpaRepository<Rol, Long> {
    Rol findByNombreRol(String nombreRol);
}