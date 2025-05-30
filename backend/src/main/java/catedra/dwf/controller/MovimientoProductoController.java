package catedra.dwf.controller;

import catedra.dwf.controller.request.MovimientoProductoRequest;
import catedra.dwf.controller.response.MovimientoProductoResponse;
import catedra.dwf.service.MovimientoProductoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/movimientos")
@CrossOrigin(origins = "*")
public class MovimientoProductoController {

    private final MovimientoProductoService movimientoProductoService;

    @Autowired
    public MovimientoProductoController(MovimientoProductoService movimientoProductoService) {
        this.movimientoProductoService = movimientoProductoService;
    }

    @PostMapping
    public ResponseEntity<MovimientoProductoResponse> createMovimiento(@Valid @RequestBody MovimientoProductoRequest request) {
        MovimientoProductoResponse response = movimientoProductoService.createMovimiento(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovimientoProductoResponse> getMovimientoById(@PathVariable Long id) {
        MovimientoProductoResponse response = movimientoProductoService.getMovimientoById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<MovimientoProductoResponse>> getAllMovimientos() {
        List<MovimientoProductoResponse> movimientos = movimientoProductoService.getAllMovimientos();
        return ResponseEntity.ok(movimientos);
    }

    @GetMapping("/producto/{idProducto}")
    public ResponseEntity<List<MovimientoProductoResponse>> getMovimientosByProducto(@PathVariable Integer idProducto) {
        List<MovimientoProductoResponse> movimientos = movimientoProductoService.getMovimientosByProducto(idProducto);
        return ResponseEntity.ok(movimientos);
    }

    @GetMapping("/stock/{idProducto}")
    public ResponseEntity<Integer> getStockProducto(@PathVariable Integer idProducto) {
        int stock = movimientoProductoService.calcularStockProducto(idProducto);
        return ResponseEntity.ok(stock);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovimientoProductoResponse> updateMovimiento(
            @PathVariable Long id,
            @Valid @RequestBody MovimientoProductoRequest request) {
        MovimientoProductoResponse response = movimientoProductoService.updateMovimiento(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovimiento(@PathVariable Long id) {
        movimientoProductoService.deleteMovimiento(id);
        return ResponseEntity.noContent().build();
    }
}