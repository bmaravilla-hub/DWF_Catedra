package catedra.dwf.controller.response;

import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String correo;
    private String rol;
    private Long idUsuario;

    public JwtResponse(String token, String correo, String rol, Long idUsuario) {
        this.token = token;
        this.correo = correo;
        this.rol = rol;
        this.idUsuario = idUsuario;
    }
}