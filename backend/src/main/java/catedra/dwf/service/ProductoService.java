package catedra.dwf.service;

import catedra.dwf.controller.request.ProductoRequest;
import catedra.dwf.controller.response.ProductoResponse;

import java.util.List;

public interface ProductoService {
    ProductoResponse createProducto(ProductoRequest request);
    ProductoResponse getProductoById(Integer id);
    List<ProductoResponse> getAllProductos();
    ProductoResponse updateProducto(Integer id, ProductoRequest request);
    void deleteProducto(Integer id);
}