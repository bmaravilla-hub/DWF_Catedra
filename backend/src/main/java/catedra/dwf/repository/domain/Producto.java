package catedra.dwf.repository.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProducto;

    private String nombre;
    private Double costo;
    private Double precio;
    private String descripcion;
    private Integer stock = 0;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdProveedor")
    private Proveedores proveedor;
}