package catedra.dwf.controller.response;

import lombok.Data;

@Data
public class ProductoResponse {
    private Integer id;
    private String nombre;
    private Double costo;
    private Double precio;
    private String descripcion;
    private Integer idProveedor;
    private String nombreProveedor;
    private Integer stock;
}