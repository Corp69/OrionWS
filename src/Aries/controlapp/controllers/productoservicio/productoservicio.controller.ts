import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { ProductoservicioService } from '../../services/productoservicio/sucursales.service';
import { Eccs_producto_servicioDto } from '../../dtos/eccs_producto_servicio.dto';

@ApiTags('OrionWS - AriesERP - Modulo App.')
@Controller('arieserp/productoservicio')
@Auth()
export class ProductoservicioController {
  constructor(private readonly Service: ProductoservicioService) {}

  @Get('catalogo/:id')
  @ApiParam({
    name: 'id',
    description: 'Filtro: id hace referencia al estatus del producto.',
    required: true,
    type: Number, // Especificamos que el tipo es un número
  })
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Producto servicio - Catalogo.',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Producto servicio - Catalogo.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Producto servicio - Catalogo.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {},
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Producto servicio - Catalogo.',
    content: {
      'application/json': {
        example: {
          message: 'No tienes Autorizacion.',
          statusCode: 401,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 401, description: 'Token Invalido' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public getCatalogo(@GetUser('id') idUser: number, @Param('id') id: number) {
    return this.Service.Catalogo(idUser, id);
  }

  @Get('obtener/:id')
  @ApiParam({
    name: 'id',
    description: 'Filtro: id hace referencia al producto.',
    required: true,
    type: Number, // Especificamos que el tipo es un número
  })
  @ApiOperation({
    summary:
      'AriesERP - Modulo App - Producto servicio - Obtner Producto Servicio.',
  })
  @ApiResponse({
    status: 200,
    description:
      'AriesERP - Modulo App - Producto servicio - Obtner Producto Servicio.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo:
            'AriesERP - Modulo App - Producto servicio - Obtner Producto Servicio.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {},
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description:
      'AriesERP - Modulo App - Producto servicio - Obtner Producto Servicio.',
    content: {
      'application/json': {
        example: {
          message: 'No tienes Autorizacion.',
          statusCode: 401,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 401, description: 'Token Invalido' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public getProducto(@GetUser('id') idUser: number, @Param('id') id: number) {
    return this.Service.getProducto(idUser, id);
  }

  @Post('agregar')
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Producto servicio - Agregar',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Producto servicio - Agregar',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Producto servicio - Agregar',
          Mensaje: 'Operación Realizada con exito.',
          Response: 'Se agrego correctamente!!',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Producto servicio - Agregar',
    content: {
      'application/json': {
        example: {
          message: 'No tienes Autorizacion.',
          statusCode: 401,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 401, description: 'Token Invalido' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public Crear(
    @Body() Eccs_producto_servicioDto: Eccs_producto_servicioDto,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Agregar(idUser, Eccs_producto_servicioDto);
  }

  @Post('actualizar')
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Producto servicio - Actualizar.',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Producto servicio - Actualizar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Producto servicio - Actualizar.',
          Mensaje: 'Operación Realizada con exito.',
          Response: 'Se agrego correctamente!!',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Producto servicio - Actualizar.',
    content: {
      'application/json': {
        example: {
          message: 'No tienes Autorizacion.',
          statusCode: 401,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 401, description: 'Token Invalido' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public actualizar(
    @Body() Eccs_producto_servicioDto: Eccs_producto_servicioDto,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Actualizar(idUser, Eccs_producto_servicioDto);
  }
}
