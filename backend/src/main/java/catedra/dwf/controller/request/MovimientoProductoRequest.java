package catedra.dwf.controller.request;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class MovimientoProductoRequest {
    private Integer idProducto;
    private Integer idUsuario;
    private Integer cantidad;
    private String tipoMovimiento; // "ENTRADA" o "SALIDA"
    private LocalDate fechaVencimiento;
    private LocalDateTime fecha;
    private String lote;
}