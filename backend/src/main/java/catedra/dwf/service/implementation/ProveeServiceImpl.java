package catedra.dwf.service.implementation;

import catedra.dwf.controller.request.ProveeRequest;
import catedra.dwf.controller.response.ProveeResponse;
import catedra.dwf.repository.ProveeRepository;
import catedra.dwf.repository.domain.Proveedores;
import catedra.dwf.service.ProveeService;
import catedra.dwf.service.mapper.ProveeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProveeServiceImpl implements ProveeService {

    private final ProveeRepository proveedorRepository;
    private final ProveeMapper proveeMapper;

    @Autowired
    public ProveeServiceImpl(ProveeRepository proveedorRepository, ProveeMapper proveeMapper) {
        this.proveedorRepository = proveedorRepository;
        this.proveeMapper = proveeMapper;
    }

    @Override
    public ProveeResponse createProveedor(ProveeRequest request) {
        Proveedores proveedor = proveeMapper.requestToEntity(request);
        Proveedores savedProveedor = proveedorRepository.save(proveedor);
        return proveeMapper.entityToResponse(savedProveedor);
    }

    @Override
    public ProveeResponse getProveedorById(Long id) {
        Proveedores proveedor = proveedorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado con ID: " + id));
        return proveeMapper.entityToResponse(proveedor);
    }

    @Override
    public List<ProveeResponse> getAllProveedores() {
        List<Proveedores> proveedores = proveedorRepository.findAll();
        return proveeMapper.entityListToResponseList(proveedores);
    }

    @Override
    public ProveeResponse updateProveedor(Long id, ProveeRequest request) {
        if (!proveedorRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado con ID: " + id);
        }

        Proveedores proveedor = proveeMapper.requestToEntity(request);
        proveedor.setIdProveedor(id);
        Proveedores updatedProveedor = proveedorRepository.save(proveedor);
        return proveeMapper.entityToResponse(updatedProveedor);
    }

    @Override
    public void deleteProveedor(Long id) {
        if (!proveedorRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado con ID: " + id);
        }

        proveedorRepository.deleteById(id);
    }
}