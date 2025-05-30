package catedra.dwf.repository;

import catedra.dwf.repository.domain.Proveedores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProveeRepository extends JpaRepository<Proveedores, Long> {
}