/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.14-MariaDB 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `almacenes` (
	`idunico` bigint (11),
	`nombre` varchar (30),
	`codigo` varchar (150),
	`descripcion` text ,
	`nivel` int (10),
	`idPadre` int (11),
	`permiso_cargo` tinyint (1),
	`permiso_descargo` tinyint (1),
	`esLogico` tinyint (1),
	`aceptaPuesto` tinyint (1)
); 
