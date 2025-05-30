package catedra.dwf.controller;

import catedra.dwf.controller.request.ProductoRequest;
import catedra.dwf.controller.response.ProductoResponse;
import catedra.dwf.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*")
@PreAuthorize("hasAnyRole('Administrador', 'Empleado')")
public class ProductoController {

    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @PostMapping
    @PreAuthorize("hasRole('Administrador')")
    public ResponseEntity<ProductoResponse> createProducto(@RequestBody ProductoRequest request) {
        ProductoResponse response = productoService.createProducto(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoResponse> getProductoById(@PathVariable Integer id) {
        ProductoResponse response = productoService.getProductoById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ProductoResponse>> getAllProductos() {
        List<ProductoResponse> productos = productoService.getAllProductos();
        return ResponseEntity.ok(productos);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('Administrador')")
    public ResponseEntity<ProductoResponse> updateProducto(@PathVariable Integer id, @RequestBody ProductoRequest request) {
        ProductoResponse response = productoService.updateProducto(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('Administrador')")
    public ResponseEntity<Void> deleteProducto(@PathVariable Integer id) {
        productoService.deleteProducto(id);
        return ResponseEntity.noContent().build();
    }
}