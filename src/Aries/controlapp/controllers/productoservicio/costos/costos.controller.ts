import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Eccs_producto_servicio_costosDto } from 'src/Aries/controlapp/dtos/eccs_producto_servicio_costos.dto';
import { ProductoservicioCostoService } from 'src/Aries/controlapp/services/productoservicio/costos/costos.service';

import { Auth, GetUser } from 'src/auth/decorators';

@ApiTags('OrionWS - AriesERP - Modulo App.')
@Controller('arieserp/productoservicio/costo')
@Auth()
export class ProductoservicioCostoController {
  constructor(private readonly Service: ProductoservicioCostoService ) {}

  @Get('catalogo/:id')
  @ApiParam({
    name: 'id',
    description: 'Filtro: id hace referencia al estatus del producto.',
    required: true,
    type: Number, // Especificamos que el tipo es un número
  })
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Producto servicio - costos Catalogo.',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Producto servicio - costos Catalogo.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Producto servicio - costos Catalogo.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {},
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Producto servicio - costos Catalogo.',
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
    description: 'Filtro: id hace referencia a los costos.',
    required: true,
    type: Number, // Especificamos que el tipo es un número
  })
  @ApiOperation({
    summary:
      'AriesERP - Modulo App - Producto servicio - Obtner los costos - Producto Servicio.',
  })
  @ApiResponse({
    status: 200,
    description:
      'AriesERP - Modulo App - Producto servicio - Obtner los costos - Producto Servicio.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo:
            'AriesERP - Modulo App - Producto servicio - Obtner los costos - Producto Servicio.',
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
    summary: 'AriesERP - Modulo App - Producto servicio - costos - Agregar',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Producto servicio - costos - Agregar',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Producto servicio - costos - Agregar',
          Mensaje: 'Operación Realizada con exito.',
          Response: 'Se agrego correctamente!!',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Producto servicio - costos - Agregar',
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
    @Body() Eccs_producto_servicio_costosDto: Eccs_producto_servicio_costosDto,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Agregar(idUser, Eccs_producto_servicio_costosDto);
  }

  @Post('actualizar')
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Producto servicio - costos  - Actualizar.',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Producto servicio - costos  - Actualizar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Producto servicio - costos  - Actualizar.',
          Mensaje: 'Operación Realizada con exito.',
          Response: 'Se agrego correctamente!!',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Producto servicio - costos  - Actualizar.',
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
    @Body() Eccs_producto_servicio_costosDto: Eccs_producto_servicio_costosDto,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Actualizar(idUser, Eccs_producto_servicio_costosDto);
  }



  @Post('eliminar/:id')
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Producto servicio - costos   - Eliminar.',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Producto servicio - costos  - Eliminar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Producto servicio - costos  - Eliminar.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: 'Registro eliminado.',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Producto servicio - costos  - Eliminar.',
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
