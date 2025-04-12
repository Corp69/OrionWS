import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { centroDatosAgregarService } from 'src/Aries/controlapp/services/controldatos/agregar/agregar.service';
import { eccs_centro_datosDto } from 'src/Aries/controlapp/dtos/eccs_centro_datos.dto';

@ApiTags('OrionWS - AriesERP - Modulo App - Control datos')
@Controller('arieserp/controldatos/agregar')
@Auth()
export class centroDatosAgregarController {
  constructor(private readonly Service: centroDatosAgregarService) {}

  @Get('catalogo/:idaplicacion/:idmodulo')
  @ApiParam({
    name: 'idaplicacion',
    description: 'Filtro: id hace referencia a la aplicación.',
    required: true,
    type: Number, // Especificamos que el tipo es un número
  })
  @ApiParam({
    name: 'idmodulo',
    description: 'Filtro: id hace referencia al modulo.',
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
  public getCatalogo(
    @GetUser('id') idUser: number,
    @Param('idaplicacion')  idaplicacion:   number,
    @Param('idmodulo') idmodulo:  number
  ) {
    return this.Service.Catalogo(idUser, idaplicacion, idmodulo);
  }

  @Get('obtener/:id')
  @ApiParam({
    name: 'id',
    description: 'Filtro: id hace referencia el modulo.',
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
    return this.Service.getDatos(idUser, id);
  }

  @Post('crear')
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
    @Body() eccs_centro_datosDto: eccs_centro_datosDto,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Agregar(idUser, eccs_centro_datosDto);
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
    @Body() eccs_centro_datosDto: eccs_centro_datosDto,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Actualizar(idUser, eccs_centro_datosDto);
  }



  @Post('eliminar/:id')
  @ApiOperation({
    summary: 'AriesERP - Modulo App - Producto servicio  - Eliminar.',
  })
  @ApiResponse({
    status: 200,
    description: 'AriesERP - Modulo App - Producto servicio - Eliminar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'AriesERP - Modulo App - Producto servicio - Eliminar.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: 'Registro eliminado.',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'AriesERP - Modulo App - Producto servicio - Eliminar.',
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
