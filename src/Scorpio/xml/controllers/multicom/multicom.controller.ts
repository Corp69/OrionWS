import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MulticomService } from '../../services/multicom/multicom.service';

import { 
    MultiSolicitaDto,
    MultiVerificaDto
 } from '../../dtos/multicomp';



@ApiTags('OrionWS - Scorpio XL - XML Multi-Comprobantes')
@Controller('scorpio/multicomp')
//@Auth()
export class MulticomController {
  constructor(private readonly Service: MulticomService) {}

  @Post('solicita')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - [Multi] Solicitar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - [Multi] Solicitar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - [Multi] Solicitar',
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
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public XML_MultComprobante_Solicitar(@Body() MultiSolicitaDto: MultiSolicitaDto) {
    return this.Service.XML_MultComprobante_Solicitar(MultiSolicitaDto);
  }

  @Post('verificar')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - [Multi]Verificar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - [Multi]Verificar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - [Multi]Verificar',
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
  @ApiResponse({ status: 404, description: 'Ruta no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public XML_MultComprobante_Verificar(@Body() MultiVerificaDto: MultiVerificaDto ) {
    return this.Service.XML_MultComprobante_Verificar(MultiVerificaDto);
  }
}
