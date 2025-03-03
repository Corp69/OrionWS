import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
//services
import { SucursalesService } from '../../services/sucursales/sucursales.service';
//dtos
import { SucursalDTO } from '../../dtos/arieserp_sucursal.dto';

@ApiTags('OrionWS - AriesERP - Modulo App - Sucursales.')
@Controller('arieserp/sucursales')
@Auth()
export class SucursalesController {

  constructor(private readonly Service: SucursalesService) {}

  @Post('obtener/:id')
  @ApiParam({
    name: 'id',
    description: 'Filtro: id hace referencia a la sucursal, agrega un id de una sucursal.',
    required: true,
    type: Number, // Especificamos que el tipo es un número
  })
  @ApiOperation({
    summary: 'OrionWS - AriesERP - Modulo App - Sucursales - Obtener.',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS - AriesERP - Modulo App - Sucursales - Obtener.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS - AriesERP - Modulo App - Sucursales - Obtener.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {},
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'OrionWS - AriesERP - Modulo App - Sucursales - Obtener.',
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
  public getConf(@GetUser('id') idUser: number, @Param('id') id: number) {
    return this.Service.getSucursal(idUser, id);
  }

  @Get('catalogo/:id')
  @ApiParam({
        name: 'id',
        description: 'Filtro: id hace referencia a la empresa para filtrar las sucursales. ',
        required: true,
        type: Number, // Especificamos que el tipo es un número
  })
  @ApiOperation({
    summary: 'OrionWS - AriesERP - Modulo App - Sucursales - Catalogo.',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS - AriesERP - Modulo App - Sucursales - Catalogo.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS - AriesERP - Modulo App - Sucursales - Catalogo.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {},
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'OrionWS - AriesERP - Modulo App - Sucursales - Catalogo.',
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

  @Post('agregar')
  @ApiOperation({
    summary: 'OrionWS - AriesERP - Modulo App - Sucursales - Agregar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS - AriesERP - Modulo App - Sucursales - Agregar',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Sucursales - Agregar',
          Mensaje: 'Operación Realizada con exito.',
          Response: 'Se agrego correctamente!!',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'OrionWS - AriesERP - Modulo App - Sucursales - Agregar',
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
    @Body() SucursalDTO: SucursalDTO,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Agregar(idUser, SucursalDTO);
  }

  @Post('actualizar')
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Sucursales - Actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Sucursales - Actualizar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Sucursales - Actualizar',
          Mensaje: 'Operacion Realizada con exito.',
          Response: 'Se actualizo correctamente!!',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Sucursales - Actualizar.',
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
  public Actualizar(
    @Body() SucursalDTO: SucursalDTO,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Actualizar(idUser, SucursalDTO);
  }

  @Post('eliminar/:id')
  @ApiOperation({
    summary: 'AriesERP - Modulo Compras - Sucursales - Eliminar.',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo Compras - Sucursales - Eliminar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo Compras - Sucursales - Eliminar.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: 'Registro eliminado.',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo Compras - Sucursales - Eliminar.',
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
