-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 30-05-2025 a las 21:19:52
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.1.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `catedra_dwf`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimiento_productos`
--

DROP TABLE IF EXISTS `movimiento_productos`;
CREATE TABLE IF NOT EXISTS `movimiento_productos` (
  `id_movimiento` bigint NOT NULL AUTO_INCREMENT,
  `cantidad` int DEFAULT NULL,
  `fecha` datetime(6) DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `lote` varchar(255) DEFAULT NULL,
  `tipo_movimiento` varchar(255) DEFAULT NULL,
  `id_producto` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id_movimiento`),
  KEY `FK33ltjnxg5g1e1slgswb2rtr23` (`id_producto`),
  KEY `FK30iprtg5dc47ipsdom7tbu6u4` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `movimiento_productos`
--

INSERT INTO `movimiento_productos` (`id_movimiento`, `cantidad`, `fecha`, `fecha_vencimiento`, `lote`, `tipo_movimiento`, `id_producto`, `id_usuario`) VALUES
(1, 21, NULL, '2025-05-30', '22s12', 'Entrada', 3, 2),
(2, 21, NULL, '2025-05-30', 'asca', 'Entrada', 3, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `costo` double DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `id_proveedor` bigint DEFAULT NULL,
  `stock` int DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `FK146wfsn2op2nvbfuxae33xbim` (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `costo`, `descripcion`, `nombre`, `precio`, `id_proveedor`, `stock`) VALUES
(3, 212, 'asd', 'mami', 1111, 6, NULL),
(4, 1212, 'as', 'as', 12, 5, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
CREATE TABLE IF NOT EXISTS `proveedores` (
  `id_proveedor` bigint NOT NULL AUTO_INCREMENT,
  `contacto` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `frecuencia_entrega` varchar(255) DEFAULT NULL,
  `nombre_proveedor` varchar(255) NOT NULL,
  `telefono` int DEFAULT NULL,
  `tipo_pago` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id_proveedor`, `contacto`, `correo`, `direccion`, `frecuencia_entrega`, `nombre_proveedor`, `telefono`, `tipo_pago`) VALUES
(5, 'mi mami', 'asd@gmail.com', 'aa', 'Mensual', 'asd612', 61525599, 'Transferencia'),
(6, 'mi mami', 'elmer@gmail.com', 'Calle Principal #1, San Salvadoraaaaaaaaaaaaaaaaaaaaaaaaa', 'Quincenal', 'adsdas', 123123123, 'Transferencia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` bigint NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(255) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`) VALUES
(1, 'Administrador'),
(2, 'Empleado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `contrasena` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `correo` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `rol` bigint DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `FKdx3q9geysrtun4ybgi1rptbkx` (`rol`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `contrasena`, `correo`, `nombre`, `rol`) VALUES
(1, 'admin123', 'elmer@gmail.com', 'Elmer Cruz', 1),
(2, '$2a$10$XcJD3WrG9gB5gnEISViE3.w2ElVNB8wtNUPlbdKLiQC.DtjidYTwG', 'usuario@ejemplo.com', 'elmer', 1),
(3, '$2a$10$X9qVmYzqhKu0GtVQfUBzkuQoX0JbJwIPj2hwD.GtdoIseXQgY8Boi', 'elmercruz@gmail.com', 'elmer', 1),
(4, '$2a$10$OIPgPi.RQBQtXlP0f1GIA.R3mHgT9gmexerUyRdNWlzHv6wtdyJAm', 'pedro@gmai.com', 'elmer', 1),
(5, '$2a$10$/BUaCYxZus/w.g0E/zhXAelWb45Zfqhl0VfPz6n2gmB8wnPoyqzkG', 'elmer2@gmail.com', 'elmer2', 2),
(6, '$2a$10$LXzPuza5Q3IBXFP6rc9fnOJCZ63e.t0lnv3q/6h1VIlNW.n0Km8w6', 'waza@gmail.com', 'waza', 2);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `movimiento_productos`
--
ALTER TABLE `movimiento_productos`
  ADD CONSTRAINT `FK30iprtg5dc47ipsdom7tbu6u4` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `FK33ltjnxg5g1e1slgswb2rtr23` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `FK146wfsn2op2nvbfuxae33xbim` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id_proveedor`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FKdx3q9geysrtun4ybgi1rptbkx` FOREIGN KEY (`rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
