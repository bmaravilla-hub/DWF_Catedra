package catedra.dwf.service.mapper;

import catedra.dwf.controller.request.ProductoRequest;
import catedra.dwf.controller.response.ProductoResponse;
import catedra.dwf.repository.domain.Producto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductoMapper {

    Producto requestToEntity(ProductoRequest request);

    @Mapping(source = "proveedor.idProveedor", target = "idProveedor")
    @Mapping(source = "proveedor.nombreProveedor", target = "nombreProveedor")
    ProductoResponse entityToResponse(Producto producto);

    List<ProductoResponse> entityListToResponseList(List<Producto> productos);
}