import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
//Service
import { agregarReporteService } from 'src/Aries/controlapp/services/controlreportes/agregarReportes/agregarReportes.service';
//Dto
import { eccs_reportes_vistaDto } from 'src/Aries/controlapp/dtos/eccs_reportes_vista.dto';


@ApiTags('OrionWS - AriesERP - Modulo App - Reportes PDF - Agregar')
@Controller('arieserp/reportedatos/agregar')
@Auth()
export class AgregarReportesController {
  constructor(private readonly Service: agregarReporteService) {}

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
    summary: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Catalogo.',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Catalogo.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Catalogo.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {},
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Catalogo.',
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
      'OrionWS - AriesERP - Modulo App - Reportes PDF - Obtener.',
  })
  @ApiResponse({
    status: 200,
    description:
      'OrionWS - AriesERP - Modulo App - Reportes PDF - Obtener.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo:
            'OrionWS - AriesERP - Modulo App - Reportes PDF - Obtener.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: {},
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description:
      'OrionWS - AriesERP - Modulo App - Reportes PDF - Obtener.',
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
    summary: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Agregar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Agregar',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Agregar',
          Mensaje: 'Operación Realizada con exito.',
          Response: 'Se agrego correctamente!!',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Agregar',
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
    @Body() eccs_reportes_vistaDto: eccs_reportes_vistaDto,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Agregar(idUser, eccs_reportes_vistaDto);
  }

  @Post('actualizar')
  @ApiOperation({
    summary: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Actualizar.',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Actualizar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Actualizar.',
          Mensaje: 'Operación Realizada con exito.',
          Response: 'Se agrego correctamente!!',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Actualizar.',
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
    @Body() eccs_reportes_vistaDto: eccs_reportes_vistaDto,
    @GetUser('id') idUser: number,
  ) {
    return this.Service.Actualizar(idUser, eccs_reportes_vistaDto);
  }



  @Post('eliminar/:id')
  @ApiOperation({
    summary: 'OrionWS - AriesERP - Modulo App - Reportes PDF  - Eliminar.',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Eliminar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Eliminar.',
          Mensaje: 'Operacion Realizada con exito.',
          Response: 'Registro eliminado.',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Eliminar.',
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
