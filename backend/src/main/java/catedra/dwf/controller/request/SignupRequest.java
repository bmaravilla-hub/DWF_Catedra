package catedra.dwf.controller.request;

import lombok.Data;

@Data
public class SignupRequest {
    private String nombre;
    private String correo;
    private String contrasena;
    private String rol;
}