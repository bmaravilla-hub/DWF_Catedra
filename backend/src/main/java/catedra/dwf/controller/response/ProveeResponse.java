package catedra.dwf.controller.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProveeResponse {
    private Long idProveedor;
    private String nombreProveedor;
    private String contacto;
    private Integer telefono;
    private String direccion;
    private String correo;
    private String frecuenciaEntrega;
    private String tipoPago;
}