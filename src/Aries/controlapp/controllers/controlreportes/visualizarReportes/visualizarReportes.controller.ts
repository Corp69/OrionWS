import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { querydto } from 'src/Aries/controlapp/dtos/query.dto';
import { visualizarReportesService } from 'src/Aries/controlapp/services/controlreportes/visualizarReportes/visualizarReportes.service';

import { Auth, GetUser } from "src/auth/decorators";

@ApiTags('OrionWS - AriesERP - Modulo App - Reportes PDF - Visualizar')
@Controller('arieserp/reportedatos/visualizar')
@Auth()
export class VisualizarReportesController {

    constructor(private readonly Service: visualizarReportesService) {}

  @Post('datacenter')
  @ApiOperation({
    summary: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Visualizar - query',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Visualizar - query',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Visualizar - query',
          Mensaje: 'Operación Realizada con exito.',
          Response: 'Se agrego correctamente!!',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'OrionWS - AriesERP - Modulo App - Reportes PDF - Visualizar - query',
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
  public Creardata(
    @Body() querydto: querydto,
    @GetUser('id') clientId: number
  ) {
    return this.Service.ExcuteQuery(clientId, querydto );
  }










}
