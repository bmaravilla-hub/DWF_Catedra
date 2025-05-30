package catedra.dwf.repository.domain;

    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    @Entity
    @Table(name = "Proveedores")
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Proveedores {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long idProveedor;

        @Column(nullable = false)
        private String nombreProveedor;

        private String contacto;
        private Integer telefono;
        private String direccion;
        private String correo;
        private String frecuenciaEntrega;
        private String tipoPago;
    }