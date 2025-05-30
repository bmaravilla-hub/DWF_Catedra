package catedra.dwf.controller.request;

import lombok.Data;

@Data
public class ProductoRequest {
    private String nombre;
    private Double costo;
    private Double precio;
    private String descripcion;
    private Long idProveedor;
}