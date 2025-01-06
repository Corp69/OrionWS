import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SocialService } from '../../services/social/social.service';

import { SocialCreateDto,
  SocialUpdateDto,
  SocialDeleteDto,
  SocialLstDto
} from '../../dtos/social';


@ApiTags('OrionWS - Scorpio XL - XML - Empresas')
@Controller('scorpio/social')
//@Auth()
export class SocialController {
  constructor(private readonly Service: SocialService) {}

  @Post('lst')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - Lista Razon Social',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - Lista Razon Social.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Lista Razon Social',
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
  public lst(   @Body() SocialLstDto: SocialLstDto, ) {
    return this.Service.XML_Social_Lst( SocialLstDto );
  }

  @Post('agregar')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Agregar',
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
  public Create(   @Body() SocialCreateDto: SocialCreateDto, ) {
    return this.Service.XML_Social_Create( SocialCreateDto );
  }

  @Post('actualizar')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Actualizar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Actualizar',
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
  public Update(   @Body() SocialUpdateDto: SocialUpdateDto, ) {
    return this.Service.XML_Social_Update( SocialUpdateDto );
  }


  @Post('eliminar')
  @ApiOperation({
    summary: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Eliminar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'OrionWS: Scorpio XL - Modulo XML - Razon Social Eliminar',
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
  public Delete(   @Body() SocialDeleteDto: SocialDeleteDto, ) {
    return this.Service.XML_Social_Delete( SocialDeleteDto );
  }


}
