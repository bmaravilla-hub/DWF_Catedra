package catedra.dwf.repository.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "MovimientoProductos")
public class MovimientoProducto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMovimiento;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdProducto")
    private Producto producto;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdUsuario")
    private Usuario usuario;

    private Integer cantidad;
    private String tipoMovimiento; // "Entrada" o "Salida"
    private LocalDate fechaVencimiento;
    private LocalDateTime fecha;
    private String lote;
}