package catedra.dwf.service;

import catedra.dwf.controller.request.ProveeRequest;
import catedra.dwf.controller.response.ProveeResponse;

import java.util.List;

public interface ProveeService {
    ProveeResponse createProveedor(ProveeRequest request);
    ProveeResponse getProveedorById(Long id);
    List<ProveeResponse> getAllProveedores();
    ProveeResponse updateProveedor(Long id, ProveeRequest request);
    void deleteProveedor(Long id);
}