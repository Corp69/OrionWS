import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ComprobantesService } from '../../services/comprobantes/comprobantes.service';
import { 
    ComprobanteDto,
    SolicitaDto,
    VerificaDto
 } from '../../dtos/comprobantes';
import { GetUser } from 'src/auth/decorators';


@ApiTags('OrionWS - Scorpio XL - XML Comprobante.')
@Controller('scorpio/comprobante')
//@Auth()
export class ComprobantesController {

  constructor(private readonly Service: ComprobantesService ) {}

  @Post('doc')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - Validar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - Validar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Validar',
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
  public XML_Comprobante(@Body() ComprobanteDto: ComprobanteDto) {
    return this.Service.XML_Comprobante(ComprobanteDto);
  }  

  @Post('solicita')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - Solicitar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - Solicitar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Solicitar',
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
  public XML_Comprobante_Solicitar(
    @GetUser('id') idUser: number,
    @Body() SolicitaDto: SolicitaDto,) {
    return this.Service.XML_Comprobante_Solicitar(idUser,SolicitaDto);
  }  

  @Post('verificar')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - Verificar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - Verificar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Verificar',
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
  public XML_Comprobante_Verificar(@Body() VerificaDto: VerificaDto) {
    return this.Service.XML_Comprobante_Verificar(VerificaDto);
  }  
}
