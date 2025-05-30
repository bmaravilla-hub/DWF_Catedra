package catedra.dwf.service.implementation;

import catedra.dwf.controller.request.ProductoRequest;
import catedra.dwf.controller.response.ProductoResponse;
import catedra.dwf.service.mapper.ProductoMapper;
import catedra.dwf.repository.ProductoRepository;
import catedra.dwf.repository.ProveeRepository;
import catedra.dwf.repository.domain.Producto;
import catedra.dwf.repository.domain.Proveedores;
import catedra.dwf.service.MovimientoProductoService;
import catedra.dwf.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final ProveeRepository proveeRepository;
    private final ProductoMapper productoMapper;
    private final MovimientoProductoService movimientoProductoService;

    @Autowired
    public ProductoServiceImpl(
            ProductoRepository productoRepository,
            ProveeRepository proveeRepository,
            ProductoMapper productoMapper,
            MovimientoProductoService movimientoProductoService) {
        this.productoRepository = productoRepository;
        this.proveeRepository = proveeRepository;
        this.productoMapper = productoMapper;
        this.movimientoProductoService = movimientoProductoService;
    }

    @Override
    public ProductoResponse createProducto(ProductoRequest request) {
        Producto producto = new Producto();
        producto.setNombre(request.getNombre());
        producto.setCosto(request.getCosto());
        producto.setPrecio(request.getPrecio());
        producto.setDescripcion(request.getDescripcion());

        if (request.getIdProveedor() != null) {
            Proveedores proveedor = proveeRepository.findById(request.getIdProveedor())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Proveedor no encontrado con ID: " + request.getIdProveedor()));
            producto.setProveedor(proveedor);
        }

        Producto savedProducto = productoRepository.save(producto);
        ProductoResponse response = productoMapper.entityToResponse(savedProducto);

        // El stock es 0 para un producto nuevo
        response.setStock(0);

        return response;
    }

    @Override
    public ProductoResponse getProductoById(Integer id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Producto no encontrado con ID: " + id));

        ProductoResponse response = productoMapper.entityToResponse(producto);
        response.setStock(movimientoProductoService.calcularStockProducto(id));

        return response;
    }

    @Override
    public List<ProductoResponse> getAllProductos() {
        List<Producto> productos = productoRepository.findAll();
        List<ProductoResponse> responses = productoMapper.entityListToResponseList(productos);

        // Añadir el stock calculado a cada respuesta
        for (ProductoResponse response : responses) {
            response.setStock(movimientoProductoService.calcularStockProducto(response.getId()));
        }

        return responses;
    }

    @Override
    public ProductoResponse updateProducto(Integer id, ProductoRequest request) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Producto no encontrado con ID: " + id));

        producto.setNombre(request.getNombre());
        producto.setCosto(request.getCosto());
        producto.setPrecio(request.getPrecio());
        producto.setDescripcion(request.getDescripcion());

        if (request.getIdProveedor() != null) {
            Proveedores proveedor = proveeRepository.findById(request.getIdProveedor())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Proveedor no encontrado con ID: " + request.getIdProveedor()));
            producto.setProveedor(proveedor);
        }

        Producto updatedProducto = productoRepository.save(producto);
        ProductoResponse response = productoMapper.entityToResponse(updatedProducto);
        response.setStock(movimientoProductoService.calcularStockProducto(id));

        return response;
    }

    @Override
    public void deleteProducto(Integer id) {
        if (!productoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Producto no encontrado con ID: " + id);
        }
        productoRepository.deleteById(id);
    }
}