package catedra.dwf.controller.response;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class MovimientoProductoResponse {
    private Long id;
    private Integer idProducto;
    private String nombreProducto;
    private Integer idUsuario;
    private String nombreUsuario;
    private Integer cantidad;
    private String tipoMovimiento;
    private LocalDate fechaVencimiento;
    private LocalDateTime fecha;
    private String lote;
}