import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ComprobantesService } from '../../services/comprobantes/comprobantes.service';
import { Auth, GetUser } from 'src/auth/decorators';

@ApiTags('OrionWS - Scorpio XL - XML Comprobante.')
@Controller('scorpio/comprobante')
@Auth()
export class ComprobantesController {

  constructor(private readonly Service: ComprobantesService) { }

  @Get('consulta/:id')
  @ApiOperation({
    summary: 'Scorpio XL - Modulo XML - Consulta la metdata',
  })
  @ApiResponse({
    status: 200,
    description: 'Scorpio XL - Modulo XML - Consulta la metdata.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'Scorpio XL - Modulo XML - Consulta la metdata',
          Mensaje: 'Operación Realizada con exito.',
          Response: {
            codigo: 0,
            mensaje: 'No se encontró el parámetro userPade, favor de verificar',
            respuesta: '',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Scorpio XL - Modulo XML - Consulta la metdata.',
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
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public XML_Comprobante(
    @GetUser('id') idUser: number,
    @Param('id') id: number
  ) {
    return this.Service.XML_Comprobante(idUser, id);
  }

  @Post('generar/:id')
  @ApiOperation({
    summary: 'Scorpio XL - Modulo XML - Generar Solicitud Metadata.',
  })
  @ApiResponse({
    status: 200,
    description: 'Scorpio XL - Modulo XML - Generar Solicitud Metadata.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'Scorpio XL - Modulo XML - Generar Solicitud Metadata',
          Mensaje: 'Operación Realizada con exito.',
          Response: {
            codigo: 0,
            mensaje: 'No se encontró el parámetro userPade, favor de verificar',
            respuesta: '',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Scorpio XL - Modulo XML - Generar Solicitud Metadata.',
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
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public XML_Comprobante_Solicitar(
    @GetUser('id') idUser: number,
    @Param('id') id: number
  ) {
    return this.Service.XML_Comprobante_Solicitar(idUser, id);
  }

  @Post('verificar/:id')
  @ApiOperation({
    summary: 'Scorpio XL - Modulo XML - Verificar Solicitud Metadata',
  })
  @ApiResponse({
    status: 200,
    description: 'Scorpio XL - Modulo XML - Verificar Solicitud Metadata.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'Scorpio XL - Modulo XML - Verificar Solicitud Metadata',
          Mensaje: 'Operación Realizada con exito.',
          Response: {
            codigo: 0,
            mensaje: 'No se encontró el parámetro userPade, favor de Verificar Solicitud Metadata',
            respuesta: '',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Scorpio XL - Modulo XML - Verificar Solicitud Metadata.',
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
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public XML_Comprobante_Verificar(
    @GetUser('id') idUser: number,
    @Param('id') id: number

  ) {
    return this.Service.XML_Comprobante_Verificar(idUser, id);
  }

}
