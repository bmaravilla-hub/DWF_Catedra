package catedra.dwf.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProveeRequest {
    private String nombreProveedor;
    private String contacto;
    private Integer telefono;
    private String direccion;
    private String correo;
    private String frecuenciaEntrega;
    private String tipoPago;
}