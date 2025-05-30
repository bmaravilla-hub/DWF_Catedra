package catedra.dwf.repository.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUsuario;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String contrasena;

    @Column(nullable = false)
    private String correo;

    @ManyToOne
    @JoinColumn(name = "Rol")
    private Rol rol;
}