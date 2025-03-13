import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Eccs_clasificacion_producto_servicioDto } from 'src/Aries/controlapp/dtos/eccs_clasificacion_producto_servicio.dto';
import { ProductoservicioClasificacionesService } from 'src/Aries/controlapp/services/productoservicio/clasificaciones/clasificaciones.service';
import { Auth, GetUser } from 'src/auth/decorators';

@ApiTags('OrionWS - AriesERP - Modulo App.')
@Controller('arieserp/productoservicio/clasificaciones')
@Auth()
export class ProductoservicioClasificacionesController {
  constructor(private readonly Service: ProductoservicioClasificacionesService ) {}

  @Get('catalogo/:id')
  @ApiParam({
    name: 'id',
    description: 'Filtro: id hace referencia al estatus del producto.',
    required: true,
    type: Number, // Especificamos que el tipo es un número
  })
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Producto servicio - clasificaciones Catalogo.',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Producto servicio - clasificaciones Catalogo.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Producto servicio - clasificaciones Catalogo.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {},
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Producto servicio - clasificaciones Catalogo.',
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
    description: 'Filtro: id hace referencia a la clasificación.',
    required: true,
    type: Number, // Especificamos que el tipo es un número
  })
  @ApiOperation({
    summary:
      'AriesERP - Modulo App - Producto servicio - Obtner la clasificación - Producto Servicio.',
  })
  @ApiResponse({
    status: 200,
    description:
      'AriesERP - Modulo App - Producto servicio - Obtner la clasificación - Producto Servicio.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo:
            'AriesERP - Modulo App - Producto servicio - Obtner la clasificación - Producto Servicio.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {},
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description:
      'AriesERP - Modulo App - Producto servicio - Obtner la clasificación - Producto Servicio.',
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
    summary: 'AriesERP - Modulo App - Producto servicio - clasificación - Agregar',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Producto servicio - clasificación - Agregar',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Producto servicio - clasificación - Agregar',
          Mensaje: 'Operación Realizada con exito.',
          Response: 'Se agrego correctamente!!',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Producto servicio - clasificación - Agregar',
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
    @Body() Eccs_clasificacion_producto_servicioDto: Eccs_clasificacion_producto_servicioDto,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Agregar(idUser, Eccs_clasificacion_producto_servicioDto);
  }

  @Post('actualizar')
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Producto servicio - Clasificación  - Actualizar.',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Producto servicio - Clasificación  - Actualizar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Producto servicio - Clasificación  - Actualizar.',
          Mensaje: 'Operación Realizada con exito.',
          Response: 'Se agrego correctamente!!',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Producto servicio - Clasificación  - Actualizar.',
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
    @Body() Eccs_clasificacion_producto_servicioDto: Eccs_clasificacion_producto_servicioDto,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Actualizar(idUser, Eccs_clasificacion_producto_servicioDto);
  }



  @Post('eliminar/:id')
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Producto servicio - clasificación   - Eliminar.',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Producto servicio - clasificación  - Eliminar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Producto servicio - clasificación  - Eliminar.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: 'Registro eliminado.',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Producto servicio - clasificación  - Eliminar.',
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
  public eliminar(@GetUser('id') idUser: number, @Param('id') id: number) {
    return this.Service.Eliminar(idUser, id);
  }




}
