package catedra.dwf.service.mapper;

import catedra.dwf.controller.request.ProveeRequest;
import catedra.dwf.controller.response.ProveeResponse;
import catedra.dwf.repository.domain.Proveedores;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProveeMapper {
    Proveedores requestToEntity(ProveeRequest request);
    ProveeResponse entityToResponse(Proveedores proveedores);
    List<ProveeResponse> entityListToResponseList(List<Proveedores> proveedoresList);
}