package catedra.dwf.repository;

import catedra.dwf.repository.domain.MovimientoProducto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MovimientoProductoRepository extends JpaRepository<MovimientoProducto, Long> {
    List<MovimientoProducto> findByProductoIdProducto(Integer idProducto);

    @Query("SELECT m FROM MovimientoProducto m WHERE m.producto.idProducto = :idProducto AND m.tipoMovimiento = :tipo")
    List<MovimientoProducto> findByProductoIdProductoAndTipoMovimiento(
            @Param("idProducto") Integer idProducto,
            @Param("tipo") String tipoMovimiento);

    @Query("SELECT m FROM MovimientoProducto m WHERE m.fechaVencimiento BETWEEN :fechaInicio AND :fechaFin")
    List<MovimientoProducto> findByFechaVencimientoBetween(
            @Param("fechaInicio") LocalDate fechaInicio,
            @Param("fechaFin") LocalDate fechaFin);
}