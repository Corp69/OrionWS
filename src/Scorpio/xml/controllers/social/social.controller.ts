import {
  Controller,
  Get,
  Param,
  Post
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SocialService } from '../../services/social/social.service';
import { Auth, GetUser } from 'src/auth/decorators';

@ApiTags('OrionWS - Scorpio XL - XML - Empresas')
@Controller('scorpio/social')
@Auth()
export class SocialController {
  
  constructor(private readonly Service: SocialService) {}

  @Get('lst/:id')
  @ApiParam({
          name: 'id',
          description: 'Filtro: ID Scorpio XL - ID para obtener los datos con el proveedor ',
          required: true,
          type: Number, // Especificamos que el tipo es un número
        })
  @ApiOperation({
    summary: 'Scorpio XL - Modulo XML - Lista Razon Social',
  })
  @ApiResponse({
    status: 200,
    description: 'Scorpio XL - Modulo XML - Lista Razon Social.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'Scorpio XL - Modulo XML - Lista Razon Social',
          Mensaje: 'Operación Realizada con exito.',
          Response: {
            "razonesSociales": [
              {
                  "fecha_inicio_sync": "2025-01-01",
                  "fecha_ult_sync": "2025-01-16",
                  "habilitado": 1,
                  "id_csd": "",
                  "id_razon_social": 545,
                  "maxComprobantesMensual": 100,
                  "numero_certificado": "00001000000508406949",
                  "razon_social": "JUAN ARAIZA HERRERA",
                  "rfc": "AAHJ800303EH9",
                  "sync": "fiel"
              }
          ]
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Scorpio XL - Modulo XML - Lista Razon Social',
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
  public lst( 
    @GetUser('id') idUser: number,
    @Param('id')   id:     number ) {
    return this.Service.XML_Social_Lst(idUser, id);
  }

  @Post('agregar/:id')
  @ApiParam({
    name: 'id',
    description: 'Filtro: ID Scorpio XL - ID para agregar los datos con el proveedor ',
    required: true,
    type: Number, // Especificamos que el tipo es un número
  })
  @ApiOperation({
    summary: 'Scorpio XL - Modulo XML - Razon Social Agregar',
  })
  @ApiResponse({
    status: 200,
    description: 'Scorpio XL - Modulo XML - Razon Social Agregar.',
    content: {
      'application/json': {
        example: {
          Success:  true,
          Titulo:   "Scorpio XL - Modulo XML - Razon Social Agregar",
          Mensaje:  "Operación Realizada con exito.",
          Response: "Se Agrego la empresa syncronizando con el SAT.",
        },
      },
    },
  })  
  @ApiResponse({
    status: 401,
    description: 'Scorpio XL - Modulo XML - Razon Social Agregar',
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
  public Create( 
    @GetUser('id') idUser: number,
    @Param('id')   id:     number ) {
    return this.Service.XML_Social_Create(idUser, id);
  }

  @Post('actualizar/:id')
  @ApiParam({
    name: 'id',
    description: 'Filtro: ID Scorpio XL - ID para actualizar los datos con el proveedor ',
    required: true,
    type: Number, // Especificamos que el tipo es un número
  })
  @ApiOperation({
    summary: 'Scorpio XL - Modulo XML - Razon Social Actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'Scorpio XL - Modulo XML - Razon Social Actualizar.',
    content: {
      'application/json': {
          example: {
            "Success": true,
            "Titulo":  "Scorpio XL - Modulo XML - Razon Social Actualizar",
            "Mensaje": "Operación realizada con éxito.",
            "Response": "Se Actualizó Correctamente"
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Scorpio XL - Modulo XML - Razon Social Actualizar',
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
  public Update(
    @GetUser('id') idUser: number,
    @Param('id')   id:     number
  ) {
    return this.Service.XML_Social_Update(idUser, id);
  }

  @Post('eliminar/:id')
  @ApiParam({
    name: 'id',
    description: 'Filtro: ID Scorpio XL - ID para eliminar los datos con el proveedor ',
    required: true,
    type: Number, // Especificamos que el tipo es un número
  })
  @ApiOperation({
    summary: 'Scorpio XL - Modulo XML - Razon Social Eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'Scorpio XL - Modulo XML - Razon Social Eliminar.',
    content: {
      'application/json': {
        example: {
          Success: true,
          Titulo: 'Scorpio XL - Modulo XML - Razon Social Eliminar',
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
  public Delete(
    @GetUser('id') idUser: number,
    @Param('id')   id:     number
  ) {
    return this.Service.XML_Social_Delete(idUser, id);
  }
}
