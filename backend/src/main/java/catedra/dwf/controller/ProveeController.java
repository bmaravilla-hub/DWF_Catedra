package catedra.dwf.controller;

import catedra.dwf.controller.request.ProveeRequest;
import catedra.dwf.controller.response.ProveeResponse;
import catedra.dwf.service.ProveeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proveedores")
public class ProveeController {

    private final ProveeService proveeService;

    @Autowired
    public ProveeController(ProveeService proveeService) {
        this.proveeService = proveeService;
    }

    @PostMapping
    public ResponseEntity<ProveeResponse> createProveedor(@RequestBody ProveeRequest request) {
        ProveeResponse response = proveeService.createProveedor(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProveeResponse> getProveedorById(@PathVariable Long id) {
        ProveeResponse response = proveeService.getProveedorById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ProveeResponse>> getAllProveedores() {
        List<ProveeResponse> proveedores = proveeService.getAllProveedores();
        return ResponseEntity.ok(proveedores);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProveeResponse> updateProveedor(@PathVariable Long id, @RequestBody ProveeRequest request) {
        ProveeResponse response = proveeService.updateProveedor(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProveedor(@PathVariable Long id) {
        proveeService.deleteProveedor(id);
        return ResponseEntity.noContent().build();
    }
}