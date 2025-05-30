package catedra.dwf.service;

import catedra.dwf.controller.request.MovimientoProductoRequest;
import catedra.dwf.controller.response.MovimientoProductoResponse;
import catedra.dwf.repository.MovimientoProductoRepository;
import catedra.dwf.repository.ProductoRepository;
import catedra.dwf.repository.UsuarioRepository;
import catedra.dwf.repository.domain.MovimientoProducto;
import catedra.dwf.repository.domain.Producto;
import catedra.dwf.repository.domain.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovimientoProductoService {

    private final MovimientoProductoRepository movimientoProductoRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    private static final String TIPO_ENTRADA = "ENTRADA";
    private static final String TIPO_SALIDA = "SALIDA";
    private static final List<String> TIPOS_MOVIMIENTO_VALIDOS = Arrays.asList(TIPO_ENTRADA, TIPO_SALIDA);

    @Autowired
    public MovimientoProductoService(MovimientoProductoRepository movimientoProductoRepository,
                                     ProductoRepository productoRepository,
                                     UsuarioRepository usuarioRepository) {
        this.movimientoProductoRepository = movimientoProductoRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public int calcularStockProducto(Integer idProducto) {
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Producto no encontrado con ID: " + idProducto));

        List<MovimientoProducto> movimientos = movimientoProductoRepository.findByProductoIdProducto(idProducto);
        int stock = 0;

        for (MovimientoProducto movimiento : movimientos) {
            if (TIPO_ENTRADA.equals(movimiento.getTipoMovimiento())) {
                stock += movimiento.getCantidad();
            } else if (TIPO_SALIDA.equals(movimiento.getTipoMovimiento())) {
                stock -= movimiento.getCantidad();
            }
        }

        return stock;
    }

    public List<MovimientoProductoResponse> getMovimientosByProducto(Integer idProducto) {
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Producto no encontrado con ID: " + idProducto));

        List<MovimientoProducto> movimientos = movimientoProductoRepository.findByProductoIdProducto(idProducto);
        return movimientos.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public MovimientoProductoResponse createMovimiento(MovimientoProductoRequest request) {
        validarTipoMovimiento(request.getTipoMovimiento());
        validarCantidad(request.getCantidad());

        Producto producto = productoRepository.findById(request.getIdProducto())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Producto no encontrado con ID: " + request.getIdProducto()));

        Usuario usuario = usuarioRepository.findById(request.getIdUsuario())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Usuario no encontrado con ID: " + request.getIdUsuario()));

        // Verificar si hay stock suficiente para una salida
        if (TIPO_SALIDA.equals(request.getTipoMovimiento())) {
            int stockActual = calcularStockProducto(producto.getIdProducto());
            if (stockActual < request.getCantidad()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Stock insuficiente para realizar la salida. Stock actual: " + stockActual);
            }
        }

        MovimientoProducto movimiento = new MovimientoProducto();
        movimiento.setProducto(producto);
        movimiento.setUsuario(usuario);
        movimiento.setCantidad(request.getCantidad());
        movimiento.setTipoMovimiento(request.getTipoMovimiento());
        movimiento.setFechaVencimiento(request.getFechaVencimiento());
        movimiento.setFecha(request.getFecha());
        movimiento.setLote(request.getLote());

        // Actualizar el stock del producto
        actualizarStockProducto(producto, request.getTipoMovimiento(), request.getCantidad(), true);

        MovimientoProducto guardado = movimientoProductoRepository.save(movimiento);
        return mapToResponse(guardado);
    }

    @Transactional
    public MovimientoProductoResponse updateMovimiento(Long id, MovimientoProductoRequest request) {
        validarTipoMovimiento(request.getTipoMovimiento());
        validarCantidad(request.getCantidad());

        MovimientoProducto movimientoOriginal = movimientoProductoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Movimiento no encontrado con ID: " + id));

        Producto producto = productoRepository.findById(request.getIdProducto())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Producto no encontrado con ID: " + request.getIdProducto()));

        Usuario usuario = usuarioRepository.findById(request.getIdUsuario())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Usuario no encontrado con ID: " + request.getIdUsuario()));

        // Revertir el efecto del movimiento original en el stock
        actualizarStockProducto(producto, movimientoOriginal.getTipoMovimiento(), movimientoOriginal.getCantidad(), false);

        // Verificar si hay stock suficiente para la nueva operación si es una salida
        if (TIPO_SALIDA.equals(request.getTipoMovimiento())) {
            int stockActual = calcularStockProducto(producto.getIdProducto());
            if (stockActual < request.getCantidad()) {
                // Restaurar el stock a su estado anterior antes de lanzar la excepción
                actualizarStockProducto(producto, movimientoOriginal.getTipoMovimiento(), movimientoOriginal.getCantidad(), true);
                productoRepository.save(producto);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Stock insuficiente para realizar la salida. Stock actual: " + stockActual);
            }
        }

        // Aplicar el nuevo movimiento al stock
        actualizarStockProducto(producto, request.getTipoMovimiento(), request.getCantidad(), true);

        // Actualizar el movimiento
        movimientoOriginal.setProducto(producto);
        movimientoOriginal.setUsuario(usuario);
        movimientoOriginal.setCantidad(request.getCantidad());
        movimientoOriginal.setTipoMovimiento(request.getTipoMovimiento());
        movimientoOriginal.setFechaVencimiento(request.getFechaVencimiento());
        movimientoOriginal.setFecha(request.getFecha());
        movimientoOriginal.setLote(request.getLote());

        productoRepository.save(producto);
        MovimientoProducto guardado = movimientoProductoRepository.save(movimientoOriginal);
        return mapToResponse(guardado);
    }

    @Transactional
    public void deleteMovimiento(Long id) {
        MovimientoProducto movimiento = movimientoProductoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Movimiento no encontrado con ID: " + id));

        Producto producto = movimiento.getProducto();

        // Revertir el efecto del movimiento en el stock
        if (TIPO_ENTRADA.equals(movimiento.getTipoMovimiento())) {
            int stockActual = calcularStockProducto(producto.getIdProducto());
            if (stockActual < movimiento.getCantidad()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "No se puede eliminar: causaría stock negativo. Stock actual: " + stockActual);
            }
            producto.setStock(producto.getStock() - movimiento.getCantidad());
        } else if (TIPO_SALIDA.equals(movimiento.getTipoMovimiento())) {
            producto.setStock(producto.getStock() + movimiento.getCantidad());
        }

        productoRepository.save(producto);
        movimientoProductoRepository.delete(movimiento);
    }

    private void actualizarStockProducto(Producto producto, String tipoMovimiento, int cantidad, boolean aplicar) {
        if (TIPO_ENTRADA.equals(tipoMovimiento)) {
            if (aplicar) {
                producto.setStock(producto.getStock() + cantidad);
            } else {
                producto.setStock(producto.getStock() - cantidad);
            }
        } else if (TIPO_SALIDA.equals(tipoMovimiento)) {
            if (aplicar) {
                producto.setStock(producto.getStock() - cantidad);
            } else {
                producto.setStock(producto.getStock() + cantidad);
            }
        }
    }

    private void validarTipoMovimiento(String tipoMovimiento) {
        if (tipoMovimiento == null || !TIPOS_MOVIMIENTO_VALIDOS.contains(tipoMovimiento)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Tipo de movimiento no válido. Los valores permitidos son: " + TIPOS_MOVIMIENTO_VALIDOS);
        }
    }

    private void validarCantidad(Integer cantidad) {
        if (cantidad == null || cantidad <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "La cantidad debe ser un valor positivo mayor que cero.");
        }
    }

    private MovimientoProductoResponse mapToResponse(MovimientoProducto movimiento) {
        MovimientoProductoResponse response = new MovimientoProductoResponse();
        response.setId(movimiento.getIdMovimiento());
        response.setIdProducto(movimiento.getProducto().getIdProducto());
        response.setNombreProducto(movimiento.getProducto().getNombre());
        response.setIdUsuario(movimiento.getUsuario().getIdUsuario());
        response.setNombreUsuario(movimiento.getUsuario().getNombre());
        response.setCantidad(movimiento.getCantidad());
        response.setTipoMovimiento(movimiento.getTipoMovimiento());
        response.setFechaVencimiento(movimiento.getFechaVencimiento());
        response.setFecha(movimiento.getFecha());
        response.setLote(movimiento.getLote());
        return response;
    }

    public MovimientoProductoResponse getMovimientoById(Long id) {
        MovimientoProducto movimiento = movimientoProductoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Movimiento no encontrado con ID: " + id));
        return mapToResponse(movimiento);
    }

    public List<MovimientoProductoResponse> getAllMovimientos() {
        List<MovimientoProducto> movimientos = movimientoProductoRepository.findAll();
        return movimientos.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
}